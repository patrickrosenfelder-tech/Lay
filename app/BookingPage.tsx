import { BookingWidget } from "./BookingWidget";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function BookingPage() {
  return (
    <main className="booking-page">
      <SiteHeader />
      <section className="booking-section booking-page-section">
        <div className="booking-intro">
          <p className="section-label">Book an appointment</p>
          <h1>Plan your visit.</h1>
          <p>
            Complete the secure verification, choose the care you need, and
            select from the clinic&apos;s live appointment dates and times.
          </p>
          <div className="booking-contact">
            <span>Prefer to speak with us?</span>
            <a href="tel:+14704404099">(470) 440-4099</a>
          </div>
        </div>
        <BookingWidget />
      </section>
      <SiteFooter />
    </main>
  );
}
