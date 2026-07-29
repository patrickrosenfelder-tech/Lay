import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete Precision Vision Institute homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Precision Vision Institute \| Specialty Eye Care in Duluth, GA<\/title>/i,
  );
  assert.match(html, /See what/);
  assert.match(html, /others/);
  assert.match(html, /Keratoconus \+ irregular corneas/);
  assert.match(html, /Quite literally the most thorough/);
  assert.match(html, /\(470\) 440-4099/);
  assert.match(html, /Request Appointment|Book appointment|Book online/i);
  assert.match(html, /Live appointment availability/i);
  assert.match(html, /Synced with EyeCloud/i);
  assert.match(html, /currently available appointments/i);
  assert.match(html, /web\.eyecloudpro\.com\/site\/!appt_req/i);
  assert.match(html, /precision-vision-logo\.png/i);
  assert.match(html, /href="\/sclerals"/i);
  assert.match(html, /href="\/dry-eye"/i);
  assert.match(html, /href="\/post-laser-vision"/i);
  assert.match(html, /href="\/ortho-k-crt-lenses"/i);
  assert.doesNotMatch(html, /href="https:\/\/precisionvisioninstitute\.com/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("includes accessible structure and social metadata", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /<html lang="en">/i);
  assert.match(html, /aria-label="Main navigation"/i);
  assert.match(html, /aria-label="Quick actions"/i);
  assert.match(html, /property="og:image"/i);
  assert.match(html, /name="twitter:card" content="summary_large_image"/i);
  assert.match(html, /class="mobile-bar"/i);
});

test("renders the rebuilt linked pages with the shared branded header", async () => {
  const routes = [
    ["/sclerals", /A smoother surface for clearer vision/i],
    ["/dry-eye", /Dry eye is a clue/i],
    ["/post-laser-vision", /When surgery changed the shape/i],
    ["/ortho-k-crt-lenses", /Clearer days begin overnight/i],
    ["/dr-nim", /Precision in the details/i],
    ["/doctor-referral", /Collaborative care/i],
    ["/testimonials", /The difference is in how care feels/i],
    ["/patients", /Arrive prepared/i],
    ["/insurances", /Know your benefits/i],
    ["/comprehensive-exams", /More than a glasses check/i],
  ];

  for (const [path, heading] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} should render`);
    const html = await response.text();
    assert.match(html, heading);
    assert.match(html, /precision-vision-logo\.png/i);
    assert.match(html, /View live availability/i);
  }
});
