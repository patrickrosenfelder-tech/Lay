import type { Review } from "./reviews";

// Google reviews, fetched on the server so no third-party script runs in the
// browser and no credential ever reaches it. Sources, in order of preference:
//
// 1. Google Business Profile API: every review, because the practice owns
//    the listing. Needs, in Vercel → Settings → Environment Variables:
//      GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN,
//      GBP_ACCOUNT_ID, GBP_LOCATION_ID
// 2. Places API (New): public data, capped by Google at 5 reviews. Needs:
//      GOOGLE_PLACES_API_KEY (+ optional GOOGLE_PLACE_ID)
// 3. Neither configured or both failing → `null`, and callers fall back to
//    the curated testimonials in reviews.ts, so builds never break.

const DAY_SECONDS = 60 * 60 * 24;
// Google access tokens live for one hour; reuse one for at most 50 minutes.
const TOKEN_SECONDS = 50 * 60;
const MAX_GBP_PAGES = 10; // 10 × 50 = up to 500 reviews
const PLACES_BASE = "https://places.googleapis.com/v1";
const PLACE_QUERY = "Precision Vision Institute, 3940 Buford Hwy Ste A104, Duluth, GA 30096";

export type GoogleReviewData = {
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
  reviews: Review[];
  /** True when every review is included, not just Google's top five. */
  complete: boolean;
};

// `next.revalidate` is honoured by Next.js on Vercel and ignored elsewhere.
const cacheFor = (seconds: number) => ({ next: { revalidate: seconds } }) as RequestInit;

/* ---------------- Google Business Profile API ---------------- */

type GbpReview = {
  reviewer?: { displayName?: string; profilePhotoUrl?: string; isAnonymous?: boolean };
  starRating?: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE" | "STAR_RATING_UNSPECIFIED";
  comment?: string;
  createTime?: string;
  reviewReply?: { comment?: string };
};

type GbpReviewPage = {
  reviews?: GbpReview[];
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
};

const STARS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 } as const;

// Google appends "(Translated by Google) …" / "(Original) …" blocks to
// reviews written in another language; show the text as the reviewer wrote it.
function originalText(comment: string) {
  const original = comment.split("(Original)");
  return (original.length > 1 ? original[1] : comment.split("(Translated by Google)")[0]).trim();
}

function relativeTime(iso?: string) {
  if (!iso) return undefined;
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (Number.isNaN(days)) return undefined;
  if (days < 1) return "today";
  if (days < 30) return days === 1 ? "a day ago" : `${days} days ago`;
  const months = Math.floor(days / 30.4);
  if (months < 12) return months <= 1 ? "a month ago" : `${months} months ago`;
  const years = Math.floor(days / 365);
  return years <= 1 ? "a year ago" : `${years} years ago`;
}

async function getAccessToken(): Promise<string | null> {
  const { GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN } = process.env;
  if (!GBP_CLIENT_ID || !GBP_CLIENT_SECRET || !GBP_REFRESH_TOKEN) return null;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    ...cacheFor(TOKEN_SECONDS),
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GBP_CLIENT_ID,
      client_secret: GBP_CLIENT_SECRET,
      refresh_token: GBP_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  if (!response.ok) {
    console.warn(`Google OAuth token request failed: ${response.status}`);
    return null;
  }
  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

async function getBusinessProfileReviews(): Promise<GoogleReviewData | null> {
  const accountId = process.env.GBP_ACCOUNT_ID?.replace(/^accounts\//, "");
  const locationId = process.env.GBP_LOCATION_ID?.replace(/^.*locations\//, "");
  if (!accountId || !locationId) return null;

  const token = await getAccessToken();
  if (!token) return null;

  const base = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`;
  const collected: GbpReview[] = [];
  let rating = 0;
  let reviewCount = 0;
  let pageToken: string | undefined;

  for (let page = 0; page < MAX_GBP_PAGES; page += 1) {
    const url = `${base}?pageSize=50&orderBy=updateTime%20desc${pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ""}`;
    const response = await fetch(url, {
      ...cacheFor(TOKEN_SECONDS),
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      console.warn(`Google Business Profile reviews request failed: ${response.status}`);
      return null;
    }
    const data = (await response.json()) as GbpReviewPage;
    collected.push(...(data.reviews ?? []));
    rating = data.averageRating ?? rating;
    reviewCount = data.totalReviewCount ?? reviewCount;
    pageToken = data.nextPageToken;
    if (!pageToken) break;
  }

  const reviews: Review[] = collected
    .filter((review) => review.comment?.trim())
    .map((review) => ({
      author: review.reviewer?.isAnonymous ? "Google user" : review.reviewer?.displayName ?? "Google user",
      text: originalText(review.comment ?? ""),
      source: "Google review",
      rating: STARS[review.starRating as keyof typeof STARS] ?? 5,
      photoUrl: review.reviewer?.profilePhotoUrl,
      when: relativeTime(review.createTime),
      reply: review.reviewReply?.comment?.trim() || undefined,
    }));

  if (!rating || !reviewCount || reviews.length === 0) return null;

  return {
    rating,
    reviewCount,
    reviewsUrl: "",
    reviews,
    complete: !pageToken,
  };
}

/* ---------------- Places API (New), capped at 5 reviews ---------------- */

type PlaceReview = {
  rating?: number;
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
    }))
    .filter((review) => review.text.length > 0);

  if (!place.rating || !place.userRatingCount || reviews.length === 0) return null;

  return {
    rating: place.rating,
    reviewCount: place.userRatingCount,
    reviewsUrl: place.googleMapsUri ?? "",
    reviews,
    complete: false,
  };
}

/* ---------------- Public entry point ---------------- */

export async function getGoogleReviews(): Promise<GoogleReviewData | null> {
  try {
    const profile = await getBusinessProfileReviews();
    if (profile) return profile;
  } catch (error) {
    console.warn("Google Business Profile request failed", error);
  }

  try {
    return await getPlacesReviews();
  } catch (error) {
    console.warn("Google Places request failed", error);
    return null;
  }
}
