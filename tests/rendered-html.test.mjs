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

test("shows live Google reviews when the Places API is configured", async () => {
  const realFetch = globalThis.fetch;
  process.env.GOOGLE_PLACES_API_KEY = "test-key";
  process.env.GOOGLE_PLACE_ID = "test-place";
  globalThis.fetch = async (input, init) => {
    const url = String(input instanceof Request ? input.url : input);
    if (!url.startsWith("https://places.googleapis.com/")) return realFetch(input, init);
    return Response.json({
      rating: 4.9,
      userRatingCount: 137,
      googleMapsUri: "https://maps.google.com/?cid=123",
      reviews: [
        {
          rating: 5,
          relativePublishTimeDescription: "2 weeks ago",
          text: { text: "Test review from Google about my scleral lenses." },
          authorAttribution: { displayName: "Test Patient", uri: "https://www.google.com/maps/contrib/1" },
        },
      ],
    });
  };
  try {
    const html = await (await render("/testimonials")).text();
    assert.match(html, /Test review from Google about my scleral lenses\./);
    assert.match(html, /Read all 137 Google reviews/);
    assert.match(html, /4\.9/);
    assert.match(html, /Reviews and rating provided by Google/);
  } finally {
    globalThis.fetch = realFetch;
    delete process.env.GOOGLE_PLACES_API_KEY;
    delete process.env.GOOGLE_PLACE_ID;
  }
});

test("falls back to curated testimonials without a Places API key", async () => {
  const html = await (await render("/testimonials")).text();
  assert.match(html, /Shawoun L\./);
  assert.doesNotMatch(html, /Reviews and rating provided by Google/);
});

test("shows every review from the Google Business Profile API when configured", async () => {
  const realFetch = globalThis.fetch;
  const env = {
    GBP_CLIENT_ID: "client",
    GBP_CLIENT_SECRET: "secret",
    GBP_REFRESH_TOKEN: "refresh",
    GBP_ACCOUNT_ID: "accounts/111",
    GBP_LOCATION_ID: "locations/222",
    GOOGLE_PLACES_API_KEY: "places-key-should-not-be-used",
  };
  Object.assign(process.env, env);
  const calls = [];
  const review = (n, extra = {}) => ({
    reviewer: { displayName: `Reviewer ${n}` },
    starRating: "FIVE",
    comment: `Business Profile review number ${n}.`,
    createTime: new Date(Date.now() - n * 86_400_000).toISOString(),
    ...extra,
  });
  globalThis.fetch = async (input, init) => {
    const url = String(input instanceof Request ? input.url : input);
    if (url.startsWith("https://oauth2.googleapis.com/token")) {
      calls.push("token");
      return Response.json({ access_token: "access", expires_in: 3599 });
    }
    if (url.startsWith("https://mybusiness.googleapis.com/v4/accounts/111/locations/222/reviews")) {
      calls.push(url.includes("pageToken=") ? "page2" : "page1");
      assert.equal(new Headers(init?.headers).get("authorization"), "Bearer access");
      if (!url.includes("pageToken=")) {
        return Response.json({
          averageRating: 4.9,
          totalReviewCount: 15,
          nextPageToken: "next",
          reviews: [
            review(1, { reviewReply: { comment: "Thank you for trusting us with your care!" } }),
            ...Array.from({ length: 11 }, (_, i) => review(i + 2)),
            { reviewer: { displayName: "Stars only" }, starRating: "FIVE" },
          ],
        });
      }
      return Response.json({ reviews: [review(13), review(14)] });
    }
    if (url.startsWith("https://places.googleapis.com/")) calls.push("places");
    return realFetch(input, init);
  };
  try {
    const html = await (await render("/testimonials")).text();
    assert.deepEqual(calls.filter((c) => c !== "token"), ["page1", "page2"], "pages through every review, never calls Places");
    assert.match(html, /Read all 15 Google reviews/);
    assert.match(html, /Every written review patients have left on Google/);
    assert.match(html, /Business Profile review number 14\./);
    assert.match(html, /Show all 14 reviews/);
    assert.match(html, /Reply from Precision Vision Institute/);
    assert.match(html, /Thank you for trusting us with your care!/);
    assert.doesNotMatch(html, /Stars only/);
  } finally {
    globalThis.fetch = realFetch;
    for (const key of Object.keys(env)) delete process.env[key];
  }
});

test("header groups contact lenses, specialty care, and puts Contact under About", async () => {
  const html = await (await render()).text();
  const navStart = html.indexOf(">", html.indexOf('aria-label="Main navigation"')) + 1;
  const nav = html.slice(navStart, html.indexOf("</nav>", navStart));
  const text = nav.replace(/<[^>]+>/g, "|").split("|").map((part) => part.trim()).filter(Boolean);
  assert.deepEqual(text, [
    "Contact Lenses", "Scleral lenses", "Ortho-K/CRT lenses",
    "Specialty care", "Keratoconus", "Post-surgical vision", "Dry eye evaluation", "Envision dry eye package",
    "Resources", "Patients", "Insurance &amp; financing", "Testimonials", "FAQ",
    "About", "Meet Dr. Nim", "Our office", "Contact",
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
