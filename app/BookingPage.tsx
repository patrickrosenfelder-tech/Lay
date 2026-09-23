import { BookingWidget } from "./BookingWidget";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import {
  breadcrumbStructuredData,
  JsonLd,
  medicalWebPageStructuredData,
} from "./structured-data";

export function BookingPage() {
  return (
    <main id="main-content" className="booking-page">
      <JsonLd
        data={[
          medicalWebPageStructuredData({
            path: "/book",
            name: "Book an appointment",
            description:
              "View live appointment availability and book specialty eye care at Precision Vision Institute in Duluth, Georgia.",
          }),
          breadcrumbStructuredData([
            { name: "Home", path: "/" },
            { name: "Book an appointment", path: "/book" },
          ]),
        ]}
      />
      <SiteHeader />
      <section className="booking-section booking-page-section">
        <div className="booking-intro">
          <p className="section-label">Book an appointment</p>
          <h1>Plan your visit.</h1>
          <p>
            Pick the care you need, then choose a date and time that works
            for you. It takes about two minutes.
          </p>
          <div className="booking-contact">
            <span>Prefer to speak with us?</span>
            <a href="tel:+14704404099">(470) 440-4099</a>
          </div>
        </div>
        <BookingWidget eager />
      </section>
      <SiteFooter />
    </main>
  );
}
