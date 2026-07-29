export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Precision Vision Institute home">
        <img
          className="brand-logo"
          src="/precision-vision-logo-transparent.png"
          alt="Precision Vision Institute"
        />
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="/#specialties">Specialties</a>
        <a href="/#process">Our approach</a>
        <a href="/dr-nim">Dr. Nim</a>
        <a href="/#visit">Visit</a>
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

      <a className="header-cta" href="/#book">
        Book appointment <span aria-hidden="true">↗</span>
      </a>

      <details className="mobile-menu">
        <summary aria-label="Open menu">Menu</summary>
        <nav aria-label="Mobile navigation">
          <a href="/#specialties">Specialties</a>
          <a href="/#process">Our approach</a>
          <a href="/dr-nim">Dr. Nim</a>
          <a href="/#visit">Visit</a>
          <a href="/patients">Patient resources</a>
          <a href="/#book">Book appointment ↗</a>
        </nav>
      </details>
    </header>
  );
}
