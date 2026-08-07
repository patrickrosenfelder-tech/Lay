import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function ContactPage() {
  return (
    <main className="contact-page">
      <SiteHeader />
      <section className="contact-hero">
        <div>
          <p className="section-label">Contact Precision Vision Institute</p>
          <h1>Come see us in Duluth.</h1>
          <p>Call with appointment questions, benefits support, or help choosing a visit type. For general, non-patient-specific questions, email info@precisionvisioninstitute.com.</p>
          <div className="contact-actions"><a className="button button-primary" href="tel:+14704404099">Call (470) 440-4099</a><Link className="contact-directions" href="https://maps.google.com/?q=Precision+Vision+Institute+3940+Buford+Hwy+Duluth+GA+30096" target="_blank" rel="noreferrer">Get directions ↗</Link></div>
        </div>
        <div className="contact-exterior"><Image src="/precision-vision-exterior.png" alt="Exterior of Precision Vision Institute in Duluth" fill priority sizes="(max-width: 900px) 90vw, 46vw" /></div>
      </section>
      <section className="contact-location">
        <div className="contact-address"><p className="section-label">Find us</p><h2>3940 Buford Hwy<br />Suite A104<br />Duluth, GA 30096</h2><p>Mon / Tue / Wed / Fri: 9:30 AM–5:30 PM<br />Sat: 9:30 AM–1:30 PM<br />Thurs / Sun: Closed</p></div>
        <div className="contact-map"><iframe title="Map to Precision Vision Institute" src="https://www.google.com/maps?q=Precision%20Vision%20Institute%2C%203940%20Buford%20Hwy%20Ste%20A104%2C%20Duluth%2C%20GA%2030096&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </section>
      <SiteFooter />
    </main>
  );
}
