"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { patientReviews as stories } from "./reviews";

export function PatientStories() {
  const [activeStory, setActiveStory] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActiveStory((current) => (current + 1) % stories.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const story = stories[activeStory];

  function showStory(index: number) {
    setActiveStory((index + stories.length) % stories.length);
  }

  return (
    <section className="review-section" aria-label="Patient stories">
      <div className="review-mark" aria-hidden="true">
        “
      </div>

      <blockquote key={story.author} aria-live="off">
        <p>{story.text}</p>
        <footer>
          <div>
            <span>{story.author}</span>
            {"condition" in story && story.condition && (
              <span className="story-condition">{story.condition}</span>
            )}
          </div>
          <span className="stars" aria-label="5 out of 5 stars">
            ★ ★ ★ ★ ★
          </span>
        </footer>
      </blockquote>

      <div className="story-navigation">
        <div className="story-buttons">
          <button
            type="button"
            onClick={() => showStory(activeStory - 1)}
            aria-label="Previous patient story"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            aria-label={paused ? "Resume rotating stories" : "Pause rotating stories"}
          >
            {paused ? "Play" : "Pause"}
          </button>
          <button
            type="button"
            onClick={() => showStory(activeStory + 1)}
            aria-label="Next patient story"
          >
            →
          </button>
        </div>

        <div className="story-dots" aria-label="Choose a patient story">
          {stories.map((item, index) => (
            <button
              type="button"
              className={index === activeStory ? "active" : ""}
              onClick={() => showStory(index)}
              aria-label={`Show story from ${item.author}`}
              aria-current={index === activeStory ? "true" : undefined}
              key={item.author}
            />
          ))}
        </div>

        <Link href="/testimonials">
          More patient stories <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
