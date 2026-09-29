"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type Ref } from "react";
import { ArrowIcon } from "./ArrowIcon";

type NavLink = readonly [label: string, href: string];
// A nested group inside a dropdown (e.g. "Dry eye"), expanded on click.
type NavGroup = { label: string; links: readonly NavLink[] };
type NavEntry = NavLink | NavGroup;

type NavigationItem =
  | { label: string; href: string }
  | { label: string; links: readonly NavEntry[] };

const navigation: readonly NavigationItem[] = [
  { label: "Specialty care", links: [["Keratoconus", "/keratoconus"], ["Post-surgical vision", "/post-surgical-vision"], { label: "Dry Eye", links: [["Dry Eye Evaluation", "/dry-eye"], ["Envision Dry Eye Package", "/envision-dry-eye"]] }] },
  { label: "Contact Lenses", links: [["Scleral lenses", "/sclerals"], ["Ortho-K/CRT lenses", "/ortho-k-crt-lenses"]] },
  { label: "Resources", links: [["Patients", "/patients"], ["Insurance & financing", "/insurances"], ["Testimonials", "/testimonials"], ["FAQ", "/faq"]] },
  { label: "About", links: [["Meet Dr. Nim", "/dr-nim"], ["Our office", "/our-office"], ["Contact Us", "/contact"]] },
  { label: "For doctors", href: "/doctor-referral" },
];

// Labels contain spaces ("Contact Lenses"); ids must not, or aria-controls
// would point at two ids that do not exist.
const menuId = (label: string) => `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-menu`;

const isGroup = (entry: NavEntry): entry is NavGroup => "links" in entry;

type EntryListProps = {
  entries: readonly NavEntry[];
  /** Keeps desktop and mobile submenu ids distinct. */
  idPrefix: string;
  openGroup: string | null;
  onToggleGroup: (label: string | null) => void;
  onNavigate: () => void;
  firstLinkRef?: Ref<HTMLAnchorElement>;
};

function EntryList({ entries, idPrefix, openGroup, onToggleGroup, onNavigate, firstLinkRef }: EntryListProps) {
  return entries.map((entry, index) => {
    if (!isGroup(entry)) {
      const [label, href] = entry;
      return <Link ref={index === 0 ? firstLinkRef : undefined} key={href} href={href} onClick={onNavigate}>{label}</Link>;
    }
    const isOpen = openGroup === entry.label;
    const id = `${idPrefix}-${menuId(entry.label)}`;
    return (
      <div className={`nav-submenu${isOpen ? " is-open" : ""}`} key={entry.label}>
        <button type="button" className="nav-submenu-toggle" aria-expanded={isOpen} aria-controls={id} onClick={() => onToggleGroup(isOpen ? null : entry.label)}>
          {entry.label}
        </button>
        {/* Always rendered so the links stay crawlable; `hidden` until opened. */}
        <div id={id} className="nav-submenu-links" hidden={!isOpen}>
          {entry.links.map(([label, href]) => <Link key={href} href={href} onClick={onNavigate}>{label}</Link>)}
        </div>
      </div>
    );
  });
}

export function SiteHeader() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileMenuButton = useRef<HTMLButtonElement>(null);
  const mobileMenuFirstLink = useRef<HTMLAnchorElement>(null);

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
      setOpenGroup(null);
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

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focusing the scrollable container itself causes iOS Safari to repeatedly
    // restore that container to its initial scroll position during touch scroll.
    // Move focus to the first actionable item instead without moving the page.
    mobileMenuFirstLink.current?.focus({ preventScroll: true });

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    window.setTimeout(() => mobileMenuButton.current?.focus(), 0);
  };

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <Link className="brand" href="/" aria-label="Precision Vision Institute home">
        <Image className="brand-logo" src="/precision-vision-wordmark.png" alt="Precision Vision Institute" width={1028} height={212} sizes="190px" priority fetchPriority="high" />
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
            <button type="button" aria-expanded={activeDropdown === item.label} aria-controls={menuId(item.label)}>
              {item.label}
            </button>
            {/* Rendered on the server in every state so the links are crawlable;
                visibility is CSS-driven and `inert` keeps closed menus out of
                the focus order. */}
            <div
              id={menuId(item.label)}
              className={`nav-dropdown-menu${activeDropdown === item.label ? " is-open" : ""}`}
              inert={activeDropdown !== item.label}
            >
              <EntryList
                entries={item.links}
                idPrefix="desktop"
                openGroup={openGroup}
                onToggleGroup={setOpenGroup}
                onNavigate={() => { cancelScheduledClose(); setActiveDropdown(null); setOpenGroup(null); }}
              />
            </div>
          </div>
        ))}
        <span className="header-socials" aria-label="Social media">
          <a className="social-icon social-facebook" href="https://www.facebook.com/people/Precision-Vision-Institute/100063539512239/" target="_blank" rel="noopener noreferrer" aria-label="Precision Vision Institute on Facebook" />
          <a className="social-icon social-instagram" href="https://www.instagram.com/dr.laynim/" target="_blank" rel="noopener noreferrer" aria-label="Dr. Lay Nim on Instagram" />
        </span>
      </nav>

      <div className="header-actions">
        <a className="header-phone" href="tel:+14704404099" aria-label="Call Precision Vision Institute at (470) 440-4099">(470) 440-4099</a>
        <Link className="header-cta" href="/book">Book an evaluation <ArrowIcon /></Link>
      </div>

      <div className="mobile-menu">
        <button
          ref={mobileMenuButton}
          className="mobile-menu-toggle"
          type="button"
          aria-label="Menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          Menu
        </button>
        {isMobileMenuOpen && <button className="mobile-menu-backdrop" type="button" aria-label="Close menu" onClick={closeMobileMenu} />}
        <nav
          id="mobile-navigation"
          className={`mobile-menu-panel${isMobileMenuOpen ? " is-open" : ""}`}
          aria-label="Mobile navigation"
          inert={!isMobileMenuOpen}
        >
          {navigation.map((item) => "href" in item ? (
            <Link key={item.label} href={item.href} onClick={closeMobileMenu}>{item.label}</Link>
          ) : (
            <div className="mobile-nav-group" key={item.label}>
              <span>{item.label}</span>
              <EntryList
                entries={item.links}
                idPrefix="mobile"
                openGroup={openMobileGroup}
                onToggleGroup={setOpenMobileGroup}
                onNavigate={closeMobileMenu}
                firstLinkRef={item.label === navigation[0].label ? mobileMenuFirstLink : undefined}
              />
            </div>
          ))}
          <Link href="/book" onClick={closeMobileMenu}>Book an evaluation <ArrowIcon /></Link>
          <span className="mobile-menu-socials" aria-label="Social media">
            <a className="social-icon social-facebook" href="https://www.facebook.com/people/Precision-Vision-Institute/100063539512239/" target="_blank" rel="noopener noreferrer" aria-label="Precision Vision Institute on Facebook" onClick={closeMobileMenu} />
            <a className="social-icon social-instagram" href="https://www.instagram.com/dr.laynim/" target="_blank" rel="noopener noreferrer" aria-label="Dr. Lay Nim on Instagram" onClick={closeMobileMenu} />
          </span>
        </nav>
      </div>
    </header>
  );
}
