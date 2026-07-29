export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Precision Vision Institute home">
        <img
          className="brand-logo"
          src="/precision-vision-logo.png"
          alt="Precision Vision Institute"
        />
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="/#specialties">Specialties</a>
        <a href="/#process">Our approach</a>
        <a href="/dr-nim">Dr. Nim</a>
        <a href="/#visit">Visit</a>
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
