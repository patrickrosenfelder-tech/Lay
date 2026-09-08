import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL, patientReviews } from "./reviews";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import {
  breadcrumbStructuredData,
  JsonLd,
  medicalWebPageStructuredData,
} from "./structured-data";

export function TestimonialsPage() {
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
            <strong>{GOOGLE_RATING.value}</strong>
          </div>
          <span
            className="google-stars"
            aria-label={`${GOOGLE_RATING.value} out of 5 stars`}
          >
            ★★★★★
          </span>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            Read current Google reviews <ArrowIcon />
          </a>
          <span className="review-checked-on">
            Verified {GOOGLE_RATING.checkedOn}. Ratings change over time — see
            Google for the current figure.
          </span>
        </div>
        <div className="original-review-source">
          <p>
            Hear straight from the people we care for. These are real,
            unaltered experiences shared by our amazing patients across Google,
            Yelp, and testimonials sent directly to the clinic.
          </p>
        </div>
      </section>

      <section className="patient-review-grid" aria-label="Patient testimonials">
        {patientReviews.map((review, index) => (
          <blockquote className="patient-review-card" key={review.author}>
            <div className="review-card-top">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {"condition" in review && review.condition && (
                <span className="story-condition">{review.condition}</span>
              )}
            </div>
            <p>“{review.text}”</p>
            <footer>
              <strong>{review.author}</strong>
              <span className="review-source">{review.source}</span>
            </footer>
          </blockquote>
        ))}
      </section>

      <section className="reviews-cta">
        <p className="section-label">Patient experiences</p>
        <h2>See what patients have shared about their care.</h2>
        <Link className="button button-primary" href="/book">
          View live availability <ArrowIcon />
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
