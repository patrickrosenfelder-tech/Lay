"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 8);
    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <Link className="brand" href="/" aria-label="Precision Vision Institute home">
        <Image className="brand-logo" src="/precision-vision-logo-transparent.png" alt="Precision Vision Institute" width={960} height={490} sizes="190px" />
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => "href" in item ? (
          <Link key={item.label} href={item.href}>{item.label}</Link>
        ) : (
          <div
            className="nav-dropdown"
            key={item.label}
            onMouseEnter={() => setActiveDropdown(item.label)}
            onMouseLeave={() => setActiveDropdown(null)}
            onFocus={() => setActiveDropdown(item.label)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setActiveDropdown(null);
            }}
          >
            <button type="button" aria-expanded={activeDropdown === item.label} aria-controls={`${item.label}-menu`}>
              {item.label}
            </button>
            {activeDropdown === item.label && (
              <div id={`${item.label}-menu`}>
                {item.links.map(([label, href]) => <Link key={href} href={href} onClick={() => setActiveDropdown(null)}>{label}</Link>)}
              </div>
            )}
          </div>
        ))}
        <span className="header-socials" aria-label="Social media">
          <span className="social-icon social-facebook" aria-label="Facebook link coming soon">f</span>
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
