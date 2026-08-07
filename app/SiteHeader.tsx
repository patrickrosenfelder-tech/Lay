"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";

type NavigationItem =
  | { label: string; href: string }
  | { label: string; links: readonly (readonly [string, string])[] };

const navigation: readonly NavigationItem[] = [
  { label: "Dry eye", links: [["Envision package", "/envision-dry-eye"], ["Dry eye treatment", "/dry-eye"]] },
  { label: "Specialty care", links: [["Scleral lenses", "/sclerals"], ["Post-laser vision care", "/post-laser-vision"], ["Ortho-K/CRT lenses", "/ortho-k-crt-lenses"]] },
  { label: "Resources", links: [["New patient info", "/patients"], ["Insurance & financing", "/insurances"], ["Testimonials", "/testimonials"], ["FAQ", "/faq"]] },
  { label: "About", links: [["Meet Dr. Nim", "/dr-nim"], ["Our office", "/our-office"]] },
  { label: "For doctors", href: "/doctor-referral" },
];

export function SiteHeader() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelScheduledClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openDropdown = (label: string) => {
    cancelScheduledClose();
    setActiveDropdown(label);
  };

  const scheduleDropdownClose = (label: string) => {
    cancelScheduledClose();
    closeTimer.current = setTimeout(() => {
      setActiveDropdown((current) => (current === label ? null : current));
      closeTimer.current = null;
    }, 140);
  };

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 8);
    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrolledState);
      cancelScheduledClose();
    };
  }, []);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <Link className="brand" href="/" aria-label="Precision Vision Institute home">
        <Image className="brand-logo" src="/precision-vision-wordmark.png" alt="Precision Vision Institute" width={1028} height={212} sizes="190px" />
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => "href" in item ? (
          <Link key={item.label} href={item.href}>{item.label}</Link>
        ) : (
          <div
            className="nav-dropdown"
            key={item.label}
            onMouseEnter={() => openDropdown(item.label)}
            onMouseLeave={() => scheduleDropdownClose(item.label)}
            onFocus={() => openDropdown(item.label)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) scheduleDropdownClose(item.label);
            }}
          >
            <button type="button" aria-expanded={activeDropdown === item.label} aria-controls={`${item.label}-menu`}>
              {item.label}
            </button>
            {activeDropdown === item.label && (
              <div id={`${item.label}-menu`}>
                {item.links.map(([label, href]) => <Link key={href} href={href} onClick={() => { cancelScheduledClose(); setActiveDropdown(null); }}>{label}</Link>)}
              </div>
            )}
          </div>
        ))}
        <span className="header-socials" aria-label="Social media">
          <a className="social-icon social-facebook" href="https://www.facebook.com/people/Precision-Vision-Institute/100063539512239/" target="_blank" rel="noreferrer" aria-label="Precision Vision Institute on Facebook">f</a>
          <a className="social-icon social-instagram" href="https://www.instagram.com/dr.laynim/" target="_blank" rel="noreferrer" aria-label="Dr. Lay Nim on Instagram" />
        </span>
      </nav>

      <Link className="header-cta" href="/#book">Book appointment <ArrowIcon /></Link>

      <details className="mobile-menu">
        <summary aria-label="Open menu">Menu</summary>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => "href" in item ? (
            <Link key={item.label} href={item.href}>{item.label}</Link>
          ) : (
            <div className="mobile-nav-group" key={item.label}>
              <span>{item.label}</span>
              {item.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            </div>
          ))}
          <Link href="/#book">Book appointment <ArrowIcon /></Link>
        </nav>
      </details>
    </header>
  );
}
