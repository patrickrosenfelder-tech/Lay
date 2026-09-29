import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import type { GoogleReviewData } from "./google-reviews";
import { ReviewItem, ReviewStars } from "./ReviewList";
import { GOOGLE_RATING, patientReviews, type Review } from "./reviews";

const FEATURED = 3;
// Short enough to read in a three-column card without expanding.
const FEATURED_MAX_LENGTH = 320;

/** The newest five-star reviews that fit a homepage card (reviews arrive newest first). */
function featured(reviews: Review[]) {
  const picks = reviews.filter((review) => (review.rating ?? 5) === 5 && review.text.length <= FEATURED_MAX_LENGTH);
  return (picks.length >= FEATURED ? picks : reviews).slice(0, FEATURED);
}

export function HomeReviews({ google }: { google: GoogleReviewData | null }) {
  const reviews = featured(google?.reviews ?? patientReviews);
  const rating = google ? google.rating : Number(GOOGLE_RATING.value);

  return (
    <section className="home-reviews" aria-labelledby="home-reviews-heading">
      <div className="home-reviews-heading">
        <div>
          <p className="section-label">Patient reviews</p>
          <h2 id="home-reviews-heading">In their words.</h2>
        </div>
        <div className="home-reviews-score">
          <strong>{rating.toFixed(1)}</strong>
          <div>
            <ReviewStars rating={rating} />
            <span>{google ? `${google.reviewCount} Google reviews` : "Google rating"}</span>
          </div>
        </div>
      </div>

      <div className="home-reviews-grid">
        {reviews.map((review, index) => (
          <ReviewItem review={review} showStars key={`${review.author}-${review.date ?? index}`} />
        ))}
      </div>

      <Link className="button button-dark home-reviews-link" href="/testimonials">
        Read all reviews <ArrowIcon />
      </Link>
    </section>
  );
}
