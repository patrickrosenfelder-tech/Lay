import { NextResponse } from "next/server";
import { CLINIC } from "../../site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InquiryKind = "contact" | "referral";

type InquiryPayload = {
  kind?: string;
  name?: string;
  practice?: string;
  email?: string;
  phone?: string;
  message?: string;
  // Honeypot. Real people never see this field, so a filled value means a bot.
  company?: string;
};

const MAX_FIELD_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

// Best-effort, per-instance throttle. It is not a substitute for a real WAF,
// but it makes casual form-spamming meaningfully more expensive.
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const hits = (recentSubmissions.get(key) ?? []).filter(
    (at) => now - at < RATE_LIMIT_WINDOW_MS,
  );
  hits.push(now);
  recentSubmissions.set(key, hits);
  if (recentSubmissions.size > 5000) recentSubmissions.clear();
  return hits.length > RATE_LIMIT_MAX;
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: InquiryPayload;
  try {
    body = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Silently accept honeypot hits so bots do not learn they were caught.
  if (clean(body.company)) return NextResponse.json({ ok: true });

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please call the clinic instead." },
      { status: 429 },
    );
  }

  const kind: InquiryKind = body.kind === "referral" ? "referral" : "contact";
  const name = clean(body.name);
  const practice = clean(body.practice);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const message = clean(body.message);

  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!isValidEmail(email)) missing.push("email");
  if (!phone) missing.push("phone");
  if (kind === "referral" && !practice) missing.push("practice");
  if (kind === "contact" && !message) missing.push("message");

  if (missing.length) {
    return NextResponse.json(
      { error: "Please complete every field with a valid email address." },
      { status: 422 },
    );
  }

  const apiKey = process.env.INQUIRY_RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL ?? CLINIC.email;
  const from = process.env.INQUIRY_FROM_EMAIL;

  if (!apiKey || !from) {
    // Fail loudly rather than showing a success state for a message that was
    // never delivered. The UI turns this into a "please call us" fallback.
    console.error("[inquiry] delivery not configured; submission not sent");
    return NextResponse.json(
      {
        error:
          "Our message service is temporarily unavailable. Please call the clinic and we will help right away.",
      },
      { status: 503 },
    );
  }

  const subject =
    kind === "referral"
      ? `Referral coordination request — ${name}`
      : `Website inquiry — ${name}`;

  const rows: [string, string][] = [
    ["Name", name],
    ...(kind === "referral" ? ([["Practice", practice]] as [string, string][]) : []),
    ["Email", email],
    ["Phone", phone],
    ...(kind === "contact" ? ([["Question", message]] as [string, string][]) : []),
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<h2>${escapeHtml(subject)}</h2><table>${rows
    .map(
      ([label, value]) =>
        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text, html }),
    });

    if (!response.ok) {
      // Never log the body: it contains the visitor's contact details.
      console.error(`[inquiry] delivery failed with status ${response.status}`);
      return NextResponse.json(
        {
          error:
            "We could not send your message. Please call the clinic and we will help right away.",
        },
        { status: 502 },
      );
    }
  } catch {
    console.error("[inquiry] delivery threw while contacting the mail provider");
    return NextResponse.json(
      {
        error:
          "We could not send your message. Please call the clinic and we will help right away.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
