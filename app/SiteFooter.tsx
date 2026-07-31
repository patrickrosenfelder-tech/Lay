import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <Link className="footer-brand" href="/">
          <Image
            className="footer-logo"
            src="/precision-vision-logo-transparent.png"
            alt=""
            aria-hidden="true"
            width={960}
            height={490}
            sizes="118px"
          />
          <p>
            Precision Vision Institute
            <small>Specialty eye care in Duluth, Georgia.</small>
          </p>
        </Link>
        <div className="footer-links">
          <Link href="/patients">Patients</Link>
          <Link href="/doctor-referral">Referring doctors</Link>
          <Link href="/insurances">Insurance</Link>
          <Link href="/testimonials">Patient stories</Link>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Precision Vision Institute
        </p>
      </footer>

      <nav className="mobile-bar" aria-label="Quick actions">
        <a href="tel:+14704404099">Call</a>
        <Link href="/#book">
          Book online <ArrowIcon />
        </Link>
      </nav>
    </>
  );
}
