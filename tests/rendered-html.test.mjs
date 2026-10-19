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
  assert.match(html, /\(470\) 440-4099/);
  assert.match(html, /Mon \/ Tue \/ Wed/);
  assert.match(html, /Fri/);
  assert.match(html, /Mon \/ Tue \/ Wed \/ Thurs/);
  assert.match(html, /9:30 AM–1:00 PM<\/span><span class="hours-period">,<br\/>2:00 PM–5:30 PM/);
  assert.match(html, /Fri \/ Sun/);
  assert.match(html, />Closed</);
  assert.doesNotMatch(html, /4:30 PM/, "old Friday hours are gone");
  assert.match(html, /"dayOfWeek":\["Monday","Tuesday","Wednesday","Thursday"\],"opens":"14:00","closes":"17:30"/);
  assert.match(html, /Request Appointment|Book appointment|Book online/i);
  assert.match(html, /Live appointment availability/i);
  assert.match(html, /Synced with EyeCloud/i);
  assert.match(html, /currently available appointments/i);
  assert.match(html, /web\.eyecloudpro\.com\/site\/!appt_req/i);
  assert.match(html, /precision-vision-wordmark\.png/i);
  assert.match(html, /facebook\.com\/people\/Precision-Vision-Institute/i);
  assert.match(html, /instagram\.com\/dr\.laynim/i);
  assert.match(html, /<section class="home-reviews"/);
  assert.equal(html.match(/<article class="review-item">/g)?.length, 3, "three featured review cards");
  assert.match(html, /href="\/testimonials"[^>]*>Read all reviews/);
  assert.match(html, /href="\/sclerals"/i);
  assert.match(html, /href="\/dry-eye"/i);
  assert.match(html, /href="\/post-surgical-vision"/i);
  assert.match(html, /href="\/keratoconus"/i);
  assert.doesNotMatch(html, /PK\/PRK|href="\/lasik-pk-prk"/i);
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
    ["/post-surgical-vision", /When surgery changed the shape/i],
    ["/keratoconus", /When your cornea changes shape/i],
    ["/ortho-k-crt-lenses", /Clearer days begin overnight/i],
    ["/dr-nim", /Dr\. Lay Nim, OD/i],
    ["/doctor-referral", /Collaborative care/i],
    ["/testimonials", /Their words\./i],
    ["/patients", /Arrive prepared/i],
    ["/insurances", /Know your benefits/i],
    ["/comprehensive-exams", /More than a glasses check/i],
  ];

  for (const [path, heading] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} should render`);
    const html = await response.text();
    assert.match(html, heading);
    assert.match(html, /precision-vision-wordmark\.png/i);
    assert.match(html, /Book an evaluation/i);
  }
});

test("redirects legacy post-surgical URLs to the canonical page", async () => {
  for (const path of ["/lasik-pk-prk", "/post-laser-vision"]) {
    const response = await render(path);
    assert.ok([301, 307, 308].includes(response.status), `${path} should redirect`);
    assert.match(response.headers.get("location") ?? "", /\/post-surgical-vision$/);
  }
});

test("uses search-friendly titles and clear labels on the audited pages", async () => {
  const titles = [
    ["/keratoconus", /<title>Keratoconus Care &amp; Scleral Lenses \| Duluth, GA<\/title>/],
    ["/post-surgical-vision", /<title>Vision After LASIK, PRK, RK &amp; Corneal Transplant \| Duluth, GA<\/title>/],
    ["/dry-eye", /<title>Dry Eye Evaluation &amp; Treatment \| Duluth, GA<\/title>/],
    ["/envision-dry-eye", /<title>Envision Dry Eye Package \| Duluth, GA<\/title>/],
  ];
  for (const [path, title] of titles) {
    const html = await (await render(path)).text();
    assert.match(html, title);
    assert.match(html, />Dry Eye Evaluation</);
    assert.match(html, />Envision Dry Eye Package</);
    assert.doesNotMatch(html, /Dry eye solutions|PK\/PRK/);
  }

  const faq = await (await render("/faq")).text();
  assert.doesNotMatch(faq, /Absolutely\./);
  const sclerals = await (await render("/sclerals")).text();
  assert.doesNotMatch(sclerals, /Absolutely\.|halos\?<\/summary><p>Yes\./);
  const testimonials = await (await render("/testimonials")).text();
  assert.doesNotMatch(testimonials, /I waited until I received my glasses/);
});

test("applies the audit batch 2 copy, contact, and FAQ fixes", async () => {
  const home = await (await render()).text();
  assert.match(home, /class="header-phone" href="tel:\+14704404099"/);
  assert.doesNotMatch(home, /Complete the secure verification|Start with a consultation|33\.978° N/);
  assert.match(home, /about two minutes/);
  assert.match(home, /serving Johns Creek, Suwanee, Norcross, Alpharetta, and Gwinnett County/);
  assert.match(home, /class="hero-meta"><a href="\/keratoconus">Keratoconus<\/a>/);

  const faq = await (await render("/faq")).text();
  const orthoK = await (await render("/ortho-k-crt-lenses")).text();
  const faqAnswer = /<summary>Is Ortho-K safe\?<\/summary><p>([^<]+)<\/p>/;
  assert.ok(faq.match(faqAnswer)?.[1]);
  assert.equal(faq.match(faqAnswer)?.[1], orthoK.match(faqAnswer)?.[1], "FAQ copy comes from one source");
  assert.match(orthoK, /considered off-label use/);
  assert.doesNotMatch(faq, /surprisingly comfortable|excellent option|safe to wear after corneal surgery\?<\/summary><p>Yes\./);
});

test("header groups contact lenses, specialty care, and puts Contact under About", async () => {
  const html = await (await render()).text();
  const navStart = html.indexOf(">", html.indexOf('aria-label="Main navigation"')) + 1;
  const nav = html.slice(navStart, html.indexOf("</nav>", navStart));
  const text = nav.replace(/<[^>]+>/g, "|").split("|").map((part) => part.trim()).filter(Boolean);
  assert.deepEqual(text, [
    "Specialty Care", "Keratoconus", "Post-surgical vision", "Dry Eye", "Dry Eye Evaluation", "Envision Dry Eye Package",
    "Contact Lenses", "Scleral lenses", "Ortho-K/CRT lenses",
    "Resources", "Patients", "Insurance &amp; financing", "Testimonials", "FAQ",
    "About", "Meet Dr. Nim", "Our office", "Contact Us",
    "For doctors",
  ]);
  assert.match(nav, /aria-controls="contact-lenses-menu"/);
  assert.match(nav, /id="contact-lenses-menu"/);
});

test("mobile menu panel becomes visible when opened", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.mobile-menu-panel\.is-open \{\s*opacity: 1;[^}]*pointer-events: auto;/);
  assert.doesNotMatch(css, /details\[open\] \.mobile-menu nav/);
});

test("Dry eye is a collapsed group inside Specialty care", async () => {
  const html = await (await render()).text();
  assert.match(html, /<button type="button" class="nav-submenu-toggle" aria-expanded="false" aria-controls="desktop-dry-eye-menu">Dry Eye<\/button>/);
  assert.match(html, /<div id="desktop-dry-eye-menu" class="nav-submenu-links" hidden="">/);
  assert.match(html, /id="mobile-dry-eye-menu"/);
});

test("referral page offers the fax number and a fillable referral form", async () => {
  const html = await (await render("/doctor-referral")).text();
  assert.match(html, /\(470\) 588-8894/);
  assert.equal(html.match(/href="\/precision-vision-referral-form\.pdf"/g)?.length, 2, "hero + closing call to action");
  assert.doesNotMatch(html, /Start with a call from your practice/);

  const home = await (await render()).text();
  assert.match(home, /"faxNumber":"\+1-470-588-8894"/);

  const { readFile } = await import("node:fs/promises");
  const pdf = await readFile(new URL("../public/precision-vision-referral-form.pdf", import.meta.url));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.ok(pdf.includes("/AcroForm"), "form fields are fillable");
  assert.ok(pdf.includes("(470) 588-8894") || pdf.includes("588-8894"), "fax number printed on the form");
});

test("referral page embeds the Google Form only when it is configured", async () => {
  const off = await (await render("/doctor-referral")).text();
  assert.doesNotMatch(off, /id="refer-online"/);
  assert.match(off, /Download referral form \(PDF\)/);

  process.env.REFERRAL_GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/TESTFORM/viewform?usp=sf_link";
  try {
    const on = await (await render("/doctor-referral")).text();
    assert.match(on, /<section class="referral-online" id="refer-online"/);
    assert.match(on, /src="https:\/\/docs\.google\.com\/forms\/d\/e\/TESTFORM\/viewform\?usp=sf_link&amp;embedded=true"/);
    assert.match(on, /href="#refer-online">Refer online/);
  } finally {
    delete process.env.REFERRAL_GOOGLE_FORM_URL;
  }

  process.env.REFERRAL_GOOGLE_FORM_URL = "https://evil.example.com/forms/x";
  try {
    const rejected = await (await render("/doctor-referral")).text();
    assert.doesNotMatch(rejected, /id="refer-online"/, "only docs.google.com forms are embedded");
  } finally {
    delete process.env.REFERRAL_GOOGLE_FORM_URL;
  }
});

test("Google reviews come from the stored snapshot with no API calls", async () => {
  const realFetch = globalThis.fetch;
  const external = [];
  globalThis.fetch = async (input, init) => {
    const url = String(input instanceof Request ? input.url : input);
    if (!url.startsWith("http://localhost")) external.push(url);
    return realFetch(input, init);
  };
  try {
    const html = await (await render("/testimonials")).text();
    const home = await (await render("/")).text();
    assert.deepEqual(external, [], "reviews must not call Google, SerpApi, or any other service");

    assert.match(html, /146 Google reviews/);
    assert.match(html, /<span class="rating-bar-count">145<span class="visually-hidden"> 5-star reviews<\/span>/);
    assert.match(html, /Show more reviews \(28 left\)/, "38 written reviews, 10 shown first");
    assert.match(html, /Oct 18, 2026/, "real dates instead of 'x days ago'");
    assert.doesNotMatch(html, /days? ago|weeks? ago|months? ago/);
    assert.match(html, /as of October 19, 2026/);
    assert.match(html, /writereview\?placeid=ChIJyQBfHx-j9YgRB6KsKWaF7SE/);
    const { readFile } = await import("node:fs/promises");
    const snapshot = await readFile(new URL("../app/google-reviews.json", import.meta.url), "utf8");
    assert.doesNotMatch(snapshot, /\$undefined/, "snapshot holds clean values only");
    assert.equal(home.match(/<article class="review-item">/g)?.length, 3);
  } finally {
    globalThis.fetch = realFetch;
  }
});

