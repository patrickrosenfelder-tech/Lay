import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { GOOGLE_REVIEWS_URL, patientReviews } from "./reviews";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function TestimonialsPage() {
  return (
    <main className="testimonials-page">
      <SiteHeader />

      <section className="reviews-hero">
        <p className="section-label">Patient experiences</p>
        <h1>
          Their words.
          <br />
          {" "}<em>Not ours.</em>
        </h1>
        <p>
          Real, attributed patient testimonials reproduced from Precision
          Vision Institute&apos;s original testimonials page—without AI
          summaries or rewritten claims.
        </p>
      </section>

      <section className="reviews-proof" aria-label="Review sources">
        <div className="google-review-summary">
          <div>
            <span className="review-source-label">Google rating</span>
            <strong>5.0</strong>
          </div>
          <span className="google-stars" aria-label="5 out of 5 stars">
            ★★★★★
          </span>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            Read current Google reviews <ArrowIcon />
          </a>
        </div>
        <div className="original-review-source">
          <p>
            Hear straight from the people we care for. These are real,
            unaltered experiences shared by our amazing patients.
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
            </footer>
          </blockquote>
        ))}
      </section>

      <section className="reviews-cta">
        <p className="section-label">Your experience starts here</p>
        <h2>See the difference for yourself.</h2>
        <Link className="button button-primary" href="/#book">
          View live availability <ArrowIcon />
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
