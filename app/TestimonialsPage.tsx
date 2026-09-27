import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { getGoogleReviews } from "./google-reviews";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL, patientReviews, type Review } from "./reviews";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import {
  breadcrumbStructuredData,
  JsonLd,
  medicalWebPageStructuredData,
} from "./structured-data";

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span className="google-stars" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rounded)}
      <span className="google-stars-empty" aria-hidden="true">{"★".repeat(5 - rounded)}</span>
    </span>
  );
}

const INITIAL_REVIEWS = 12;

function ReviewCard({ review, index, showStars }: { review: Review; index: number; showStars: boolean }) {
  return (
    <blockquote className="patient-review-card">
      <div className="review-card-top">
        <span>{String(index + 1).padStart(2, "0")}</span>
        {review.condition && <span className="story-condition">{review.condition}</span>}
        {showStars && <Stars rating={review.rating ?? 5} />}
      </div>
      <p>“{review.text}”</p>
      {review.reply && (
        <div className="review-reply">
          <span>Reply from Precision Vision Institute</span>
          <p>{review.reply}</p>
        </div>
      )}
      <footer>
        {review.photoUrl && (
          // Google-hosted avatar; next/image would need a remote-pattern allowlist for it.
          // eslint-disable-next-line @next/next/no-img-element
          <img className="review-avatar" src={review.photoUrl} alt="" width={36} height={36} loading="lazy" referrerPolicy="no-referrer" />
        )}
        {review.authorUrl ? (
          <a href={review.authorUrl} target="_blank" rel="noopener noreferrer">
            <strong>{review.author}</strong>
          </a>
        ) : (
          <strong>{review.author}</strong>
        )}
        <span className="review-source">
          {review.source}
          {review.when ? ` · ${review.when}` : ""}
        </span>
      </footer>
    </blockquote>
  );
}

export async function TestimonialsPage() {
  const google = await getGoogleReviews();
  const reviews = google?.reviews ?? patientReviews;
  const reviewsUrl = google?.reviewsUrl || GOOGLE_REVIEWS_URL;
  const visible = reviews.slice(0, INITIAL_REVIEWS);
  const more = reviews.slice(INITIAL_REVIEWS);

  return (
    <main id="main-content" className="testimonials-page">
      <JsonLd
        data={[
          medicalWebPageStructuredData({
            path: "/testimonials",
            name: "Patient testimonials",
            description:
              "Experiences patients have shared about specialty lens care at Precision Vision Institute in Duluth, Georgia.",
          }),
          breadcrumbStructuredData([
            { name: "Home", path: "/" },
            { name: "Testimonials", path: "/testimonials" },
          ]),
        ]}
      />
      <SiteHeader />

      <section className="reviews-hero">
        <p className="section-label">Patient experiences</p>
        <h1>
          Their words.
          <br />
          {" "}<em>Not ours.</em>
        </h1>
        <p>
          Read the experiences patients have shared about their care at
          Precision Vision Institute.
        </p>
      </section>

      <section className="reviews-proof" aria-label="Review sources">
        <div className="google-review-summary">
          <div>
            <span className="review-source-label">Google rating</span>
            <strong>{google ? google.rating.toFixed(1) : GOOGLE_RATING.value}</strong>
          </div>
          <Stars rating={google ? google.rating : Number(GOOGLE_RATING.value)} />
          <a href={reviewsUrl} target="_blank" rel="noopener noreferrer">
            {google
              ? `Read all ${google.reviewCount} Google reviews`
              : "Read current Google reviews"}{" "}
            <ArrowIcon />
          </a>
          <span className="review-checked-on">
            {google
              ? "Live from Google. Updated daily."
              : `Verified ${GOOGLE_RATING.checkedOn}. Ratings change over time — see Google for the current figure.`}
          </span>
        </div>
        <div className="original-review-source">
          <p>
            {google
              ? google.complete
                ? "Every written review patients have left on Google, newest first, shown exactly as they were written."
                : "These are the most relevant recent reviews patients have left on Google, shown exactly as they were written."
              : "Hear straight from the people we care for. These are real, unaltered experiences shared by our amazing patients across Google, Yelp, and testimonials sent directly to the clinic."}
          </p>
          {google && (
            <a href={reviewsUrl} target="_blank" rel="noopener noreferrer">
              Leave a review on Google <ArrowIcon />
            </a>
          )}
        </div>
      </section>

      <section className="patient-review-grid" aria-label={google ? "Google reviews" : "Patient testimonials"}>
        {visible.map((review, index) => (
          <ReviewCard review={review} index={index} showStars={Boolean(google)} key={`${review.author}-${index}`} />
        ))}
      </section>

      {more.length > 0 && (
        <details className="more-reviews">
          <summary>{`Show all ${reviews.length} reviews`}</summary>
          <section className="patient-review-grid" aria-label="More reviews">
            {more.map((review, index) => (
              <ReviewCard review={review} index={index + INITIAL_REVIEWS} showStars={Boolean(google)} key={`${review.author}-${index + INITIAL_REVIEWS}`} />
            ))}
          </section>
        </details>
      )}

      {google && (
        <p className="google-attribution">
          Reviews and rating provided by Google.
        </p>
      )}

      <section className="reviews-cta">
        <p className="section-label">Patient experiences</p>
        <h2>See what patients have shared about their care.</h2>
        <Link className="button button-primary" href="/book">
          Book an evaluation <ArrowIcon />
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
