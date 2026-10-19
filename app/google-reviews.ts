import type { Review } from "./reviews";
import snapshot from "./google-reviews.json";

// Google reviews are a snapshot stored in google-reviews.json, not fetched
// live: the practice gets new reviews slowly, so a static copy means zero API
// calls on builds and visits, no quotas, and nothing that can fail.
//
// To update: add a review to google-reviews.json by hand (newest first), or
// regenerate the whole file with scripts/refresh-google-reviews.mjs.

export type GoogleReviewData = {
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
  reviews: Review[];
  /** Count of reviews per star across the whole listing. */
  distribution?: Record<1 | 2 | 3 | 4 | 5, number>;
  /** Opens Google's "write a review" dialog for the practice. */
  writeReviewUrl?: string;
  /** When the snapshot was taken (ISO date). */
  snapshotDate: string;
};

type SnapshotReview = {
  author: string;
  rating: number;
  date: string;
  text: string;
  reply?: string;
  authorUrl?: string;
  photoUrl?: string;
};

// A frozen copy can't say "3 days ago", so reviews show their real date.
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" });
}

const data: GoogleReviewData = {
  rating: snapshot.rating,
  reviewCount: snapshot.reviewCount,
  reviewsUrl: "",
  snapshotDate: snapshot.snapshotDate,
  distribution: {
    5: snapshot.distribution["5"],
    4: snapshot.distribution["4"],
    3: snapshot.distribution["3"],
    2: snapshot.distribution["2"],
    1: snapshot.distribution["1"],
  },
  writeReviewUrl: `https://search.google.com/local/writereview?placeid=${snapshot.placeId}`,
  reviews: (snapshot.reviews as SnapshotReview[]).map((review) => ({
    ...review,
    source: "Google review",
    when: formatDate(review.date),
  })),
};

export async function getGoogleReviews(): Promise<GoogleReviewData> {
  return data;
}
