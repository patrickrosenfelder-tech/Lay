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
  assert.match(html, /Thurs \/ Sun/);
  assert.match(html, />Closed</);
  assert.match(html, /Request Appointment|Book appointment|Book online/i);
  assert.match(html, /Live appointment availability/i);
  assert.match(html, /Synced with EyeCloud/i);
  assert.match(html, /currently available appointments/i);
  assert.match(html, /web\.eyecloudpro\.com\/site\/!appt_req/i);
  assert.match(html, /precision-vision-wordmark\.png/i);
  assert.match(html, /facebook\.com\/people\/Precision-Vision-Institute/i);
  assert.match(html, /instagram\.com\/dr\.laynim/i);
  assert.match(html, /Pause rotating stories/i);
  assert.match(html, /Shawanda M\./i);
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
    assert.match(html, /View live availability/i);
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
    assert.match(html, />Dry eye evaluation</);
    assert.match(html, />Envision dry eye package</);
    assert.doesNotMatch(html, /Dry eye solutions|PK\/PRK/);
  }

  const faq = await (await render("/faq")).text();
  assert.doesNotMatch(faq, /Absolutely\./);
  const sclerals = await (await render("/sclerals")).text();
  assert.doesNotMatch(sclerals, /Absolutely\.|halos\?<\/summary><p>Yes\./);
  const testimonials = await (await render("/testimonials")).text();
  assert.doesNotMatch(testimonials, /I waited until I received my glasses/);
});
