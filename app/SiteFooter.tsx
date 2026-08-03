import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <Link className="footer-brand" href="/">
          <Image className="footer-logo" src="/precision-vision-logo-transparent.png" alt="" aria-hidden="true" width={960} height={490} sizes="118px" />
          <p>Precision Vision Institute<small>Specialty eye care in Duluth, Georgia.</small></p>
        </Link>
        <div className="footer-navigation">
          <div><span>Care</span><Link href="/envision-dry-eye">Dry eye solutions</Link><Link href="/sclerals">Scleral lenses</Link><Link href="/post-laser-vision">Post-laser care</Link></div>
          <div><span>Resources</span><Link href="/patients">New patients</Link><Link href="/insurances">Insurance & financing</Link><Link href="/testimonials">Testimonials</Link></div>
          <div><span>Practice</span><Link href="/dr-nim">Meet Dr. Nim</Link><Link href="/our-office">Our office</Link><Link href="/doctor-referral">For doctors</Link></div>
        </div>
        <div className="footer-utility">
          <Link href="/contact">Contact</Link><Link href="/privacy-policy">Privacy Policy</Link><Link href="/hipaa-notice">HIPAA Notice</Link><Link href="/terms-of-service">Terms of Service</Link>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Precision Vision Institute</p>
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
