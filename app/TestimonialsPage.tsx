import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { getGoogleReviews } from "./google-reviews";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL, patientReviews } from "./reviews";
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

export async function TestimonialsPage() {
  const google = await getGoogleReviews();
  const reviews = google?.reviews ?? patientReviews;
  const reviewsUrl = google?.reviewsUrl || GOOGLE_REVIEWS_URL;

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
              ? "These are the most relevant recent reviews patients have left on Google, shown exactly as they were written."
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
        {reviews.map((review, index) => (
          <blockquote className="patient-review-card" key={`${review.author}-${index}`}>
            <div className="review-card-top">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {review.condition && <span className="story-condition">{review.condition}</span>}
              {google && <Stars rating={review.rating ?? 5} />}
            </div>
            <p>“{review.text}”</p>
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
        ))}
      </section>

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
