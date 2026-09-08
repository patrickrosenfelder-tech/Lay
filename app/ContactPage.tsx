import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { MAPS_URL } from "./site";
import { InquiryForm } from "./InquiryForm";
import { LocationMap } from "./LocationMap";
import { OfficeExterior } from "./OfficeExterior";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import {
  breadcrumbStructuredData,
  JsonLd,
  medicalWebPageStructuredData,
} from "./structured-data";

export function ContactPage() {
  return (
    <main id="main-content" className="contact-page">
      <JsonLd
        data={[
          medicalWebPageStructuredData({
            path: "/contact",
            name: "Contact & directions",
            description:
              "Contact Precision Vision Institute in Duluth, Georgia for appointment questions, directions, and help choosing a visit type.",
          }),
          breadcrumbStructuredData([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <SiteHeader />
      <section className="contact-hero">
        <div>
          <p className="section-label">Contact Precision Vision Institute</p>
          <h1>Come see us in Duluth.</h1>
          <p>Call with appointment questions, benefits support, or help choosing a visit type. For general, non-patient-specific questions, email <a href="mailto:info@precisionvisioninstitute.com">info@precisionvisioninstitute.com</a>.</p>
          <div className="contact-actions"><a className="button button-primary" href="tel:+14704404099">Call (470) 440-4099</a><Link className="button button-light" href="/book">Book online <ArrowIcon /></Link><Link className="contact-directions" href={MAPS_URL} target="_blank" rel="noopener noreferrer">Get directions <ArrowIcon /></Link></div>
        </div>
        <OfficeExterior className="contact-exterior" priority sizes="(max-width: 900px) 90vw, 46vw" />
      </section>
      <section className="inquiry-section">
        <div>
          <p className="section-label">General questions</p>
          <h2>Start with a simple message.</h2>
          <p>For non-clinical questions about appointments, directions, or benefits, send us a message and the team will reply within one business day.</p>
        </div>
        <InquiryForm kind="contact" />
      </section>
      <section className="contact-location">
        <div className="contact-address"><p className="section-label">Find us</p><h2>3940 Buford Hwy<br />Suite A104<br />Duluth, GA 30096</h2><p>Mon / Tue / Wed: 9:30 AM–5:30 PM<br />Fri: 9:30 AM–4:30 PM<br />Sat: 9:30 AM–1:30 PM<br />Thurs / Sun: Closed</p></div>
        <LocationMap className="contact-map" />
      </section>
      <SiteFooter />
    </main>
  );
}
