import type { Review } from "./reviews";

// Google reviews, fetched on the server so no third-party script runs in the
// browser and no key ever reaches it. Sources, in order of preference:
//
// 1. SerpApi Google Maps Reviews: the latest 50 reviews, newest first, plus
//    the star breakdown. Google declined Business Profile API access, so this
//    service retrieves the public Maps data for us. Needs, in Vercel:
//      SERPAPI_API_KEY (+ optional GOOGLE_MAPS_DATA_ID to override the default)
//    Budget: ~6 requests per daily refresh ≈ 180/month (free plan: 250).
// 2. Places API (New): public data, capped by Google at 5 reviews. Needs:
//      GOOGLE_PLACES_API_KEY (+ optional GOOGLE_PLACE_ID)
// 3. Neither configured or both failing → `null`, and callers fall back to
//    the curated testimonials in reviews.ts, so builds never break.

const DAY_SECONDS = 60 * 60 * 24;
const LATEST_REVIEWS = 50;
const SERPAPI = "https://serpapi.com/search.json";
// The practice's Google Maps listing id (the "1s0x…:0x…" part of its Maps URL).
const DEFAULT_MAPS_DATA_ID = "0x88f5a31f1f5f00c9:0x21ed856629aca207";
const PLACES_BASE = "https://places.googleapis.com/v1";
const PLACE_QUERY = "Precision Vision Institute, 3940 Buford Hwy Ste A104, Duluth, GA 30096";

export type GoogleReviewData = {
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
  reviews: Review[];
  /** Count of reviews per star (index 1–5) across the whole listing.
      Absent when only a sample is known: five reviews make a misleading chart. */
  distribution?: Record<1 | 2 | 3 | 4 | 5, number>;
  /** Opens Google's "write a review" dialog for the practice, when known. */
  writeReviewUrl?: string;
};

const writeReviewUrl = (placeId?: string) =>
  placeId ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}` : undefined;

// `next.revalidate` is honoured by Next.js on Vercel and ignored elsewhere.
const cacheFor = (seconds: number) => ({ next: { revalidate: seconds } }) as RequestInit;

/* ---------------- SerpApi: latest 50 reviews ---------------- */

type SerpReview = {
  rating?: number;
  date?: string;
  iso_date?: string;
  snippet?: string;
  extracted_snippet?: { original?: string };
  user?: { name?: string; link?: string; thumbnail?: string };
  response?: { snippet?: string; extracted_snippet?: { original?: string } };
};

type SerpReviewsPage = {
  error?: string;
  place_info?: { rating?: number; reviews?: number };
  reviews?: SerpReview[];
  serpapi_pagination?: { next_page_token?: string };
};

type SerpPlace = {
  place_results?: { rating_summary?: { stars?: number; amount?: number }[] };
};

async function serpApi<T>(params: Record<string, string>): Promise<T | null> {
  const response = await fetch(`${SERPAPI}?${new URLSearchParams(params)}`, cacheFor(DAY_SECONDS));
  if (!response.ok) {
    console.warn(`SerpApi ${params.engine} request failed: ${response.status}`);
    return null;
  }
  return (await response.json()) as T;
}

async function getStarBreakdown(apiKey: string, placeId?: string) {
  if (!placeId) return undefined;
  const data = await serpApi<SerpPlace>({ engine: "google_maps", place_id: placeId, hl: "en", api_key: apiKey });
  const summary = data?.place_results?.rating_summary;
  if (!summary?.length) return undefined;
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const row of summary) {
    if (row.stars && row.stars >= 1 && row.stars <= 5) distribution[row.stars as 1 | 2 | 3 | 4 | 5] = row.amount ?? 0;
  }
  return distribution;
}

async function getSerpApiReviews(): Promise<GoogleReviewData | null> {
  const apiKey = process.env.SERPAPI_API_KEY;
  if (!apiKey) return null;
  const dataId = process.env.GOOGLE_MAPS_DATA_ID || DEFAULT_MAPS_DATA_ID;
  const placeId = process.env.GOOGLE_PLACE_ID;

  const collected: SerpReview[] = [];
  let info: SerpReviewsPage["place_info"];
  let pageToken: string | undefined;

  // The first page holds 8 reviews; follow-up pages take up to 20 (`num`).
  while (collected.length < LATEST_REVIEWS) {
    const page = await serpApi<SerpReviewsPage>({
      engine: "google_maps_reviews",
      data_id: dataId,
      sort_by: "newestFirst",
      hl: "en",
      api_key: apiKey,
      ...(pageToken ? { next_page_token: pageToken, num: "20" } : {}),
    });
    if (!page || page.error) {
      if (page?.error) console.warn(`SerpApi reviews error: ${page.error}`);
      if (collected.length === 0) return null;
      break;
    }
    info ??= page.place_info;
    collected.push(...(page.reviews ?? []));
    pageToken = page.serpapi_pagination?.next_page_token;
    if (!pageToken) break;
  }

  const reviews: Review[] = collected
    .slice(0, LATEST_REVIEWS)
    .map((review) => ({
      author: review.user?.name ?? "Google user",
      text: (review.extracted_snippet?.original ?? review.snippet ?? "").trim(),
      source: "Google review",
      rating: review.rating ?? 5,
      authorUrl: review.user?.link,
      photoUrl: review.user?.thumbnail,
      when: review.date,
      date: review.iso_date,
      reply: (review.response?.extracted_snippet?.original ?? review.response?.snippet)?.trim() || undefined,
    }))
    .filter((review) => review.text.length > 0);

  if (!info?.rating || !info.reviews || reviews.length === 0) return null;

  return {
    rating: info.rating,
    reviewCount: info.reviews,
    reviewsUrl: "",
    reviews,
    distribution: await getStarBreakdown(apiKey, placeId).catch(() => undefined),
    writeReviewUrl: writeReviewUrl(placeId),
  };
}

/* ---------------- Places API (New), capped at 5 reviews ---------------- */

type PlaceReview = {
  rating?: number;
  publishTime?: string;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

type PlaceDetails = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlaceReview[];
};

async function findPlaceId(apiKey: string): Promise<string | null> {
  const response = await fetch(`${PLACES_BASE}/places:searchText`, {
    ...cacheFor(DAY_SECONDS),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: PLACE_QUERY }),
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { places?: { id?: string }[] };
  return data.places?.[0]?.id ?? null;
}

async function getPlacesReviews(): Promise<GoogleReviewData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  const placeId = process.env.GOOGLE_PLACE_ID || (await findPlaceId(apiKey));
  if (!placeId) return null;

  const response = await fetch(`${PLACES_BASE}/places/${encodeURIComponent(placeId)}?languageCode=en`, {
    ...cacheFor(DAY_SECONDS),
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
    },
  });
  if (!response.ok) {
    console.warn(`Google Places request failed: ${response.status}`);
    return null;
  }

  const place = (await response.json()) as PlaceDetails;
  const reviews: Review[] = (place.reviews ?? [])
    .map((review) => ({
      author: review.authorAttribution?.displayName ?? "Google user",
      text: (review.text?.text ?? review.originalText?.text ?? "").trim(),
      source: "Google review",
      rating: review.rating ?? 5,
      authorUrl: review.authorAttribution?.uri,
      photoUrl: review.authorAttribution?.photoUri,
      when: review.relativePublishTimeDescription,
      date: review.publishTime,
    }))
    .filter((review) => review.text.length > 0);

  if (!place.rating || !place.userRatingCount || reviews.length === 0) return null;

  return {
    rating: place.rating,
    reviewCount: place.userRatingCount,
    reviewsUrl: place.googleMapsUri ?? "",
    reviews,
    writeReviewUrl: writeReviewUrl(placeId),
  };
}

/* ---------------- Public entry point ---------------- */

export async function getGoogleReviews(): Promise<GoogleReviewData | null> {
  try {
    const latest = await getSerpApiReviews();
    if (latest) return latest;
  } catch (error) {
    console.warn("SerpApi request failed", error);
  }

  try {
    return await getPlacesReviews();
  } catch (error) {
    console.warn("Google Places request failed", error);
    return null;
  }
}
