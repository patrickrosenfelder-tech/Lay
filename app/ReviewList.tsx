"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Review } from "./reviews";

const PAGE_SIZE = 10;
// Longer reviews are clamped to three lines with a "More" toggle.
const LONG_REVIEW = 220;

type Sort = "latest" | "highest" | "lowest";

export function ReviewStars({ rating, className = "" }: { rating: number; className?: string }) {
  const rounded = Math.round(rating);
  return (
    <span className={`review-stars ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rounded)}
      <span className="review-stars-empty">{"★".repeat(5 - rounded)}</span>
    </span>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function ReviewItem({ review, showStars }: { review: Review; showStars: boolean }) {
  const [expanded, setExpanded] = useState(false);
  // Server render guesses from length; after mount, measure whether the
  // three-line clamp actually cuts text at the current width.
  const [isLong, setIsLong] = useState(review.text.length > LONG_REVIEW);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text || expanded) return;
    const measure = () => {
      text.classList.add("is-clamped");
      setIsLong(text.scrollHeight > text.clientHeight + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(text);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <article className="review-item">
      <header>
        {review.photoUrl ? (
          // Google-hosted avatar; next/image would need a remote-pattern allowlist for it.
          // eslint-disable-next-line @next/next/no-img-element
          <img className="review-avatar" src={review.photoUrl} alt="" width={48} height={48} loading="lazy" referrerPolicy="no-referrer" />
        ) : (
          <span className="review-avatar review-avatar-initials" aria-hidden="true">{initials(review.author)}</span>
        )}
        <div className="review-item-meta">
          {review.authorUrl ? (
            <a href={review.authorUrl} target="_blank" rel="noopener noreferrer">{review.author}</a>
          ) : (
            <strong>{review.author}</strong>
          )}
          <span>{review.when ?? review.condition ?? review.source}</span>
        </div>
        {showStars && <ReviewStars rating={review.rating ?? 5} />}
      </header>
      <p ref={textRef} className={isLong && !expanded ? "is-clamped" : undefined}>{review.text}</p>
      {isLong && (
        <button type="button" className="review-more" aria-expanded={expanded} onClick={() => setExpanded((open) => !open)}>
          {expanded ? "Less" : "More"}
        </button>
      )}
      {review.reply && (
        <div className="review-reply">
          <span>Reply from Precision Vision Institute</span>
          <p>{review.reply}</p>
        </div>
      )}
    </article>
  );
}

export function ReviewList({ reviews, showStars }: { reviews: Review[]; showStars: boolean }) {
  const [sort, setSort] = useState<Sort>("latest");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sortable = reviews.some((review) => review.date);

  const sorted = useMemo(() => {
    const byDate = (a: Review, b: Review) => (b.date ?? "").localeCompare(a.date ?? "");
    const copy = [...reviews];
    if (sort === "latest" && sortable) copy.sort(byDate);
    if (sort === "highest") copy.sort((a, b) => (b.rating ?? 5) - (a.rating ?? 5) || byDate(a, b));
    if (sort === "lowest") copy.sort((a, b) => (a.rating ?? 5) - (b.rating ?? 5) || byDate(a, b));
    return copy;
  }, [reviews, sort, sortable]);

  return (
    <section className="review-list" aria-label="Patient reviews">
      {sortable && showStars && (
        <div className="review-list-toolbar">
          <label>
            <span className="visually-hidden">Sort reviews</span>
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as Sort);
                setVisible(PAGE_SIZE);
              }}
            >
              <option value="latest">Latest reviews</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </label>
        </div>
      )}

      {sorted.slice(0, visible).map((review, index) => (
        <ReviewItem review={review} showStars={showStars} key={`${review.author}-${review.date ?? index}`} />
      ))}

      {visible < sorted.length && (
        <button type="button" className="review-load-more" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
          {`Show more reviews (${sorted.length - visible} left)`}
        </button>
      )}
    </section>
  );
}
