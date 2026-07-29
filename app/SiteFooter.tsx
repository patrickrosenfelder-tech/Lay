export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <a className="footer-brand" href="/">
          <img
            className="footer-logo"
            src="/precision-vision-logo-transparent.png"
            alt=""
            aria-hidden="true"
          />
          <p>
            Precision Vision Institute
            <small>Specialty eye care in Duluth, Georgia.</small>
          </p>
        </a>
        <div className="footer-links">
          <a href="/patients">Patients</a>
          <a href="/doctor-referral">Referring doctors</a>
          <a href="/insurances">Insurance</a>
          <a href="/testimonials">Patient stories</a>
          <a href="/#book">Book online</a>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Precision Vision Institute
        </p>
      </footer>

      <nav className="mobile-bar" aria-label="Quick actions">
        <a href="tel:+14704404099">Call</a>
        <a href="/#book">Book online ↗</a>
      </nav>
    </>
  );
}
