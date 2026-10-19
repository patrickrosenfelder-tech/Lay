// Refresh app/google-reviews.json from Google Maps via SerpApi.
// Run only when you want new reviews on the site (~6 SerpApi searches per run):
//
//   SERPAPI_API_KEY=your-key node scripts/refresh-google-reviews.mjs
//
// Then review the diff, commit, and deploy. Adding a single review by hand to
// the JSON file works just as well and needs no key.

import { readFile, writeFile } from "node:fs/promises";

const FILE = new URL("../app/google-reviews.json", import.meta.url);
const DATA_ID = "0x88f5a31f1f5f00c9:0x21ed856629aca207"; // the practice's Google Maps listing
const LATEST = 50;
const apiKey = process.env.SERPAPI_API_KEY;
if (!apiKey) throw new Error("Set SERPAPI_API_KEY to run this script.");

const existing = JSON.parse(await readFile(FILE, "utf8"));

async function serp(params) {
  const response = await fetch(`https://serpapi.com/search.json?${new URLSearchParams({ ...params, hl: "en", api_key: apiKey })}`);
  const body = await response.json();
  if (!response.ok || body.error) throw new Error(`SerpApi ${params.engine}: ${body.error ?? response.status}`);
  return body;
}

// Latest reviews, newest first: 8 on the first page, then up to 20 per page.
const collected = [];
let info;
let token;
while (collected.length < LATEST) {
  const page = await serp({ engine: "google_maps_reviews", data_id: DATA_ID, sort_by: "newestFirst", ...(token ? { next_page_token: token, num: "20" } : {}) });
  info ??= page.place_info;
  collected.push(...(page.reviews ?? []));
  token = page.serpapi_pagination?.next_page_token;
  if (!token) break;
}

// Star breakdown for the rating bars.
const place = await serp({ engine: "google_maps", place_id: existing.placeId });
const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
for (const row of place.place_results?.rating_summary ?? []) distribution[row.stars] = row.amount ?? 0;

const clean = (value) => (typeof value === "string" && value.trim() ? value.trim() : undefined);
const reviews = collected
  .slice(0, LATEST)
  .map((review) => ({
    author: review.user?.name ?? "Google user",
    rating: review.rating ?? 5,
    date: review.iso_date,
    text: clean(review.extracted_snippet?.original ?? review.snippet),
    reply: clean(review.response?.extracted_snippet?.original ?? review.response?.snippet),
    authorUrl: review.user?.link,
    photoUrl: review.user?.thumbnail,
  }))
  .filter((review) => review.text && review.date);

const next = {
  ...existing,
  snapshotDate: new Date().toISOString().slice(0, 10),
  rating: info?.rating ?? existing.rating,
  reviewCount: info?.reviews ?? existing.reviewCount,
  distribution: Object.fromEntries([5, 4, 3, 2, 1].map((stars) => [String(stars), distribution[stars]])),
  reviews,
};
await writeFile(FILE, `${JSON.stringify(next, null, 2)}\n`);
console.log(`Saved ${reviews.length} written reviews (${next.reviewCount} total, rating ${next.rating}).`);
