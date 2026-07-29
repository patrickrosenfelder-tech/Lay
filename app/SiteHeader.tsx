import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Precision Vision Institute home">
        {/* TODO(client): Replace with the original vector logo when an SVG source is supplied. */}
        <Image
          className="brand-logo"
          src="/precision-vision-logo-transparent.png"
          alt="Precision Vision Institute"
          width={960}
          height={490}
          sizes="190px"
        />
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/#specialties">Specialties</Link>
        <Link href="/#process">Our approach</Link>
        <Link href="/dr-nim">Dr. Nim</Link>
        <Link href="/#visit">Visit</Link>
        <span className="header-socials" aria-label="Social media">
          <span
            className="social-icon social-facebook"
            aria-label="Facebook link coming soon"
          >
            f
          </span>
          <a
            className="social-icon social-instagram"
            href="https://www.instagram.com/dr.laynim/"
            target="_blank"
            rel="noreferrer"
            aria-label="Dr. Lay Nim on Instagram"
          />
        </span>
      </nav>

      <Link className="header-cta" href="/#book">
        Book appointment <span aria-hidden="true">↗</span>
      </Link>

      <details className="mobile-menu">
        <summary aria-label="Open menu">Menu</summary>
        <nav aria-label="Mobile navigation">
            <Link href="/#specialties">Specialties</Link>
            <Link href="/#process">Our approach</Link>
            <Link href="/dr-nim">Dr. Nim</Link>
            <Link href="/#visit">Visit</Link>
            <Link href="/patients">Patient resources</Link>
            <Link href="/#book">Book appointment ↗</Link>
        </nav>
      </details>
    </header>
  );
}
