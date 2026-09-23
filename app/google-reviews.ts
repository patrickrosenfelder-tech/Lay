import type { Review } from "./reviews";

// Live Google reviews via the Places API (New), fetched on the server so no
// third-party script runs in the browser and the API key never leaves it.
//
// Configure in Vercel → Project → Settings → Environment Variables:
//   GOOGLE_PLACES_API_KEY  (required; restrict it to the Places API (New))
//   GOOGLE_PLACE_ID        (optional; looked up by name + address if absent)
//
// Without a key every caller gets `null` and falls back to the curated
// testimonials in reviews.ts, so builds and previews never break.

const REVALIDATE_SECONDS = 60 * 60 * 24;
const PLACES_BASE = "https://places.googleapis.com/v1";
const PLACE_QUERY = "Precision Vision Institute, 3940 Buford Hwy Ste A104, Duluth, GA 30096";

export type GoogleReviewData = {
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
  reviews: Review[];
};

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

// `next.revalidate` is honoured by Next.js on Vercel and ignored elsewhere.
const cached = { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit;

async function findPlaceId(apiKey: string): Promise<string | null> {
  const response = await fetch(`${PLACES_BASE}/places:searchText`, {
    ...cached,
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

export async function getGoogleReviews(): Promise<GoogleReviewData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  try {
    const placeId = process.env.GOOGLE_PLACE_ID || (await findPlaceId(apiKey));
    if (!placeId) return null;

    const response = await fetch(`${PLACES_BASE}/places/${encodeURIComponent(placeId)}?languageCode=en`, {
      ...cached,
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
    };
  } catch (error) {
    console.warn("Google Places request failed", error);
    return null;
  }
}
