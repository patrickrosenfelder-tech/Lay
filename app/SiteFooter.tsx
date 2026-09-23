import Image from "next/image";
import Link from "next/link";
import { MobileQuickActions } from "./MobileQuickActions";

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <Link className="footer-brand" href="/">
          <Image className="footer-logo" src="/precision-vision-wordmark.png" alt="Precision Vision Institute" width={1028} height={212} sizes="190px" />
        </Link>
        <div className="footer-navigation">
          <div>
            <span>Care</span>
            <Link href="/dry-eye">Dry eye evaluation</Link>
            <Link href="/envision-dry-eye">Envision dry eye package</Link>
            <Link href="/keratoconus">Keratoconus</Link>
            <Link href="/sclerals">Scleral lenses</Link>
            <Link href="/post-surgical-vision">Post-surgical vision</Link>
            <Link href="/ortho-k-crt-lenses">Ortho-K/CRT lenses</Link>
          </div>
          <div>
            <span>Resources</span>
            <Link href="/patients">Patients</Link>
            <Link href="/insurances">Insurance &amp; financing</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/testimonials">Testimonials</Link>
          </div>
          <div>
            <span>Practice</span>
            <Link href="/dr-nim">Meet Dr. Nim</Link>
            <Link href="/our-office">Our office</Link>
            <Link href="/doctor-referral">For doctors</Link>
            <Link href="/book">Book an evaluation</Link>
          </div>
        </div>
        <div className="footer-utility">
          <Link href="/contact">Contact</Link><Link href="/privacy-policy">Privacy Policy</Link><Link href="/hipaa-notice">HIPAA Notice</Link><Link href="/terms-of-service">Terms of Service</Link>
        </div>
        <p className="footer-service-area">
          Specialty eye care in Duluth, GA, serving Johns Creek, Suwanee, Norcross, Alpharetta, and Gwinnett County.
        </p>
        <p className="copyright">© {new Date().getFullYear()} Precision Vision Institute</p>
      </footer>
      <MobileQuickActions />
    </>
  );
}
