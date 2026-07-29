"use client";

import { FormEvent, useMemo, useState } from "react";

const BOOKING_URL =
  "https://web.eyecloudpro.com/site/!appt_req?sid=30DE3BDF7982B488E75A54C45893656C";

const CONSULTATION_DETAILS = {
  "Scleral Lens / Keratoconus Evaluation": {
    duration: "60 mins",
    instructions:
      "Please bring your current specialty contact lenses and cases. The evaluation typically involves diagnostic lens fitting and corneal topography mapping.",
  },
  "Dry Eye Consultation": {
    duration: "45 mins",
    instructions:
      "Avoid artificial tears or medicated eye drops for at least 4 hours before your visit. Remove contact lenses 12 hours before the exam.",
  },
  "Ortho-K Fitting": {
    duration: "90 mins",
    instructions:
      "Detailed corneal topography mapping will be performed. Please do not wear contact lenses for 24 hours before the screening.",
  },
  "Comprehensive Exam": {
    duration: "30 mins",
    instructions:
      "Please bring your current prescription glasses and be prepared for possible dilation.",
  },
} as const;

type Consultation = keyof typeof CONSULTATION_DETAILS;

function todayForDateInput() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().split("T")[0];
}

export function BookingWidget() {
  const [consultation, setConsultation] = useState<Consultation>(
    "Scleral Lens / Keratoconus Evaluation",
  );
  const [date, setDate] = useState("");
  const [insurance, setInsurance] = useState("VSP");
  const [otherInsurance, setOtherInsurance] = useState("");
  const [ready, setReady] = useState(false);

  const selectedDetails = CONSULTATION_DETAILS[consultation];
  const dateWarning = useMemo(() => {
    if (!date) return "";
    const day = new Date(`${date}T00:00:00`).getDay();
    return day === 0 || day === 1 || day === 4
      ? "The clinic is closed on Mondays, Thursdays, and Sundays. Please choose Tuesday, Wednesday, Friday, or Saturday."
      : "";
  }, [date]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!date || dateWarning || (insurance === "Other" && !otherInsurance.trim())) {
      return;
    }
    setReady(true);
  }

  return (
    <div className="booking-card">
      <div className="booking-card-header">
        <div>
          <p>Precision Vision Institute</p>
          <h3>Appointment request</h3>
        </div>
        <span className="secure-note">Secure next step</span>
      </div>

      <div className="booking-hud" aria-live="polite">
        <div>
          <span>Estimated duration</span>
          <strong>{selectedDetails.duration}</strong>
        </div>
        <div>
          <span>Status</span>
          <strong>{ready ? "Ready to send" : "Choose your preferences"}</strong>
        </div>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="booking-field booking-field-wide">
          <label htmlFor="consultation">Consultation / service type</label>
          <select
            id="consultation"
            value={consultation}
            onChange={(event) => {
              setConsultation(event.target.value as Consultation);
              setReady(false);
            }}
          >
            {Object.keys(CONSULTATION_DETAILS).map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="booking-field">
          <label htmlFor="preferred-date">Preferred date</label>
          <input
            id="preferred-date"
            type="date"
            min={todayForDateInput()}
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setReady(false);
            }}
            required
          />
          <span className={dateWarning ? "field-note field-error" : "field-note"}>
            {dateWarning || "Clinic open Tue, Wed, Fri & Sat"}
          </span>
        </div>

        <div className="booking-field">
          <label htmlFor="insurance">Insurance provider</label>
          <select
            id="insurance"
            value={insurance}
            onChange={(event) => {
              setInsurance(event.target.value);
              setReady(false);
            }}
          >
            <option value="VSP">VSP</option>
            <option value="EyeMed">EyeMed</option>
            <option value="Medicare">Medicare</option>
            <option value="BlueCross">BlueCross</option>
            <option value="Cash / Self-Pay">Cash / Self-Pay</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {insurance === "Other" && (
          <div className="booking-field booking-field-wide">
            <label htmlFor="other-insurance">Specify insurance provider</label>
            <input
              id="other-insurance"
              type="text"
              placeholder="e.g. Humana, Aetna, Cigna"
              value={otherInsurance}
              onChange={(event) => {
                setOtherInsurance(event.target.value);
                setReady(false);
              }}
              required
            />
          </div>
        )}

        <button
          className="booking-submit"
          type="submit"
          disabled={Boolean(dateWarning)}
        >
          Review booking request <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="booking-instructions">
        <span>Pre-visit instructions</span>
        <h4>{consultation}</h4>
        <p>{selectedDetails.instructions}</p>
      </div>

      {ready && (
        <div className="booking-confirmation" role="status">
          <div>
            <strong>Your preferences are ready.</strong>
            <p>
              Continue to the secure scheduler to provide your contact details
              and send the request to the clinic.
            </p>
          </div>
          <a href={BOOKING_URL}>
            Continue securely <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </div>
  );
}
