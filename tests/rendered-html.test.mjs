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
    assert.match(html, /Read all 137 reviews on Google/);
    assert.match(html, /137 Google reviews/);
    assert.match(html, /4\.9/);
    assert.match(html, /Reviews and rating provided by Google/);
    assert.doesNotMatch(html, /class="rating-bars"/, "five reviews are not enough for a star chart");
    assert.match(html, /class="write-review" href="https:\/\/search\.google\.com\/local\/writereview\?placeid=test-place"/);
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

test("shows the latest 50 Google reviews via SerpApi when configured", async () => {
  const realFetch = globalThis.fetch;
  const env = { SERPAPI_API_KEY: "serp-key", GOOGLE_PLACE_ID: "place-123", GOOGLE_PLACES_API_KEY: "places-key-should-not-be-used" };
  Object.assign(process.env, env);
  const calls = [];
  let n = 0;
  const review = (extra = {}) => {
    n += 1;
    return {
      rating: n === 3 ? 2 : 5,
      date: `${n} days ago`,
      iso_date: new Date(Date.now() - n * 86_400_000).toISOString(),
      snippet: `SerpApi review number ${n}.`,
      user: { name: `Reviewer ${n}`, link: `https://www.google.com/maps/contrib/${n}` },
      ...extra,
    };
  };
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input instanceof Request ? input.url : input));
    if (url.hostname === "serpapi.com") {
      const engine = url.searchParams.get("engine");
      assert.equal(url.searchParams.get("api_key"), "serp-key");
      if (engine === "google_maps") {
        calls.push("summary");
        assert.equal(url.searchParams.get("place_id"), "place-123");
        return Response.json({ place_results: { rating_summary: [5, 4, 3, 2, 1].map((stars) => ({ stars, amount: { 5: 164, 4: 3, 3: 0, 2: 1, 1: 1 }[stars] })) } });
      }
      assert.equal(engine, "google_maps_reviews");
      assert.equal(url.searchParams.get("data_id"), "0x88f5a31f1f5f00c9:0x21ed856629aca207");
      assert.equal(url.searchParams.get("sort_by"), "newestFirst");
      const token = url.searchParams.get("next_page_token");
      calls.push(token ?? "first");
      const size = token ? 20 : 8;
      const reviews = Array.from({ length: size }, (_, i) =>
        !token && i === 0
          ? review({ response: { snippet: "Thank you for trusting us with your care!" } })
          : !token && i === 1
            ? { ...review(), snippet: "", extracted_snippet: undefined }
            : review(),
      );
      return Response.json({
        place_info: { rating: 4.9, reviews: 173 },
        reviews,
        serpapi_pagination: { next_page_token: `page-${calls.length + 1}` },
      });
    }
    if (url.hostname === "places.googleapis.com") calls.push("places");
    return realFetch(input, init);
  };
  try {
    const html = await (await render("/testimonials")).text();
    const pages = calls.filter((call) => call !== "summary");
    assert.equal(pages[0], "first");
    assert.equal(pages.length, 4, "8 + 20 + 20 + 20 reviews covers the latest 50");
    assert.ok(!calls.includes("places"), "never falls through to Places when SerpApi works");
    assert.match(html, /173 Google reviews/);
    assert.match(html, /<span class="rating-bar-count">164<span class="visually-hidden"> 5-star reviews<\/span>/);
    assert.match(html, /Highest rated review/);
    assert.match(html, /Most recent review/);
    assert.match(html, /writereview\?placeid=place-123/);
    assert.equal(html.match(/<article class="review-item">/g)?.length, 10, "first page of ten");
    assert.match(html, /Show more reviews \(39 left\)/, "49 written reviews of the latest 50 (one was stars-only)");
    assert.match(html, /Reply from Precision Vision Institute/);
    assert.match(html, /Thank you for trusting us with your care!/);
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
