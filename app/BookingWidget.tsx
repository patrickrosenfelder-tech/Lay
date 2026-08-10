import { ArrowIcon } from "./ArrowIcon";

const BOOKING_URL =
  "https://web.eyecloudpro.com/site/!appt_req?sid=30DE3BDF7982B488E75A54C45893656C";

export function BookingWidget() {
  return (
    <div className="booking-card">
      <div className="booking-card-header">
        <div>
          <p>Precision Vision Institute</p>
          <h3>Live appointment availability</h3>
        </div>
        <span className="secure-note">
          <span className="live-dot" aria-hidden="true" />
          Synced with EyeCloud
        </span>
      </div>

      <div className="booking-embed-intro">
        <strong>Choose from currently available appointments.</strong>
        <span>
          Complete the quick verification, select a service, then choose an
          available date and time.
        </span>
      </div>

      <iframe
        className="booking-embed"
        src={BOOKING_URL}
        title="Precision Vision Institute live appointment scheduler"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />

      <div className="booking-embed-footer">
        <span>Having trouble viewing the scheduler?</span>
        <a href={BOOKING_URL}>
          Open EyeCloud <ArrowIcon />
        </a>
      </div>
    </div>
  );
}
