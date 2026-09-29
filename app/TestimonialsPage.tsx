import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { getGoogleReviews } from "./google-reviews";
import { ReviewList, ReviewStars } from "./ReviewList";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL, patientReviews, type Review } from "./reviews";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import {
  breadcrumbStructuredData,
  JsonLd,
  medicalWebPageStructuredData,
} from "./structured-data";

const HIGHLIGHT_LENGTH = 180;

function formatDate(iso?: string) {
  if (!iso) return undefined;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" });
}

function excerpt(text: string) {
  if (text.length <= HIGHLIGHT_LENGTH) return text;
  return `${text.slice(0, text.lastIndexOf(" ", HIGHLIGHT_LENGTH)).trimEnd()}…`;
}

/** The newest review, plus the highest-rated of the rest (newest among ties),
    so both labels stay literally true and the cards never repeat. */
function pickHighlights(reviews: Review[]) {
  const dated = reviews.filter((review) => review.date);
  if (dated.length < 2) return [];
  const newest = (a: Review, b: Review) => (b.date ?? "").localeCompare(a.date ?? "");
  const [recent, ...rest] = [...dated].sort(newest);
  const highest = [...rest].sort((a, b) => (b.rating ?? 5) - (a.rating ?? 5) || newest(a, b))[0];
  return [
    { label: "Highest rated review", review: highest },
    { label: "Most recent review", review: recent },
  ];
}

export async function TestimonialsPage() {
  const google = await getGoogleReviews();
  const reviews = google?.reviews ?? patientReviews;
  const reviewsUrl = google?.reviewsUrl || GOOGLE_REVIEWS_URL;
  const writeReviewUrl = google?.writeReviewUrl ?? reviewsUrl;
  const rating = google ? google.rating : Number(GOOGLE_RATING.value);
  const distribution = google?.distribution;
  const distributionMax = distribution ? Math.max(...Object.values(distribution), 1) : 1;
  const highlights = google ? pickHighlights(reviews) : [];

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

      <div className="reviews-board">
        <section className={`rating-summary${distribution ? " has-distribution" : ""}`} aria-label="Google rating summary">
          <div className="rating-score">
            <strong>
              {rating.toFixed(1)}
              <span aria-hidden="true">★</span>
            </strong>
            <ReviewStars rating={rating} />
            <span>
              {google
                ? `${google.reviewCount} Google reviews`
                : `Google rating, verified ${GOOGLE_RATING.checkedOn}`}
            </span>
          </div>

          {distribution ? (
            <ol className="rating-bars" aria-label="Reviews by star rating">
              {([5, 4, 3, 2, 1] as const).map((stars) => (
                <li key={stars}>
                  <span className="rating-bar-label">{stars} ★</span>
                  <span className="rating-bar-track" aria-hidden="true">
                    <span className="rating-bar-fill" style={{ width: `${(distribution[stars] / distributionMax) * 100}%` }} />
                  </span>
                  <span className="rating-bar-count">
                    {distribution[stars]}
                    <span className="visually-hidden">{` ${stars}-star reviews`}</span>
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <div className="rating-summary-note">
              <p>
                {google
                  ? "The latest reviews patients have left on Google, shown exactly as they were written."
                  : "Real, unaltered experiences shared by our patients across Google, Yelp, and testimonials sent directly to the clinic."}
              </p>
              <a href={reviewsUrl} target="_blank" rel="noopener noreferrer">
                {google ? `Read all ${google.reviewCount} reviews on Google` : "Read current Google reviews"} <ArrowIcon />
              </a>
            </div>
          )}
        </section>

        {highlights.length > 0 && (
          <section className="review-highlights" aria-label="Highlighted reviews">
            {highlights.map(({ label, review }) => (
              <article key={label}>
                <header>
                  <h2>{label}</h2>
                  {formatDate(review.date) && <span>on {formatDate(review.date)}</span>}
                </header>
                <strong className="review-highlight-score">
                  {review.rating ?? 5}
                  <span aria-hidden="true">★</span>
                  <span className="visually-hidden"> out of 5 stars</span>
                </strong>
                <p>“{excerpt(review.text)}”</p>
                <footer>{review.author} on Google</footer>
              </article>
            ))}
          </section>
        )}

        {google && (
          <a className="write-review" href={writeReviewUrl} target="_blank" rel="noopener noreferrer">
            <span className="write-review-label">Write a review</span>
            <span className="write-review-stars" aria-hidden="true">★★★★★</span>
            <span className="write-review-hint">Share your experience on Google</span>
          </a>
        )}

        <ReviewList reviews={reviews} showStars={Boolean(google)} />

        {google && (
          <p className="google-attribution">
            Reviews and rating provided by Google. Updated daily.
          </p>
        )}
      </div>

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
