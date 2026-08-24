"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function MobileQuickActions() {
  const [isSchedulerVisible, setIsSchedulerVisible] = useState(false);

  useEffect(() => {
    const scheduler = document.querySelector("[data-booking-widget]");
    if (!scheduler) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSchedulerVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );

    observer.observe(scheduler);
    return () => observer.disconnect();
  }, []);

  const hiddenProps = isSchedulerVisible ? { tabIndex: -1 } : {};

  return (
    <nav
      className={`mobile-bar${isSchedulerVisible ? " is-hidden" : ""}`}
      aria-label="Quick actions"
      aria-hidden={isSchedulerVisible || undefined}
    >
      <a href="tel:+14704404099" {...hiddenProps}>Call</a>
      <Link href="/book" {...hiddenProps}>Book online</Link>
    </nav>
  );
}
