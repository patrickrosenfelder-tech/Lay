"use client";

import { FormEvent } from "react";

type InquiryFormProps = {
  kind: "contact" | "referral";
};

export function InquiryForm({ kind }: InquiryFormProps) {
  const isReferral = kind === "referral";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = isReferral ? "Referral coordination request" : "General website inquiry";
    const lines = [
      `Name: ${form.get("name") ?? ""}`,
      ...(isReferral ? [`Practice: ${form.get("practice") ?? ""}`] : []),
      `Email: ${form.get("email") ?? ""}`,
      `Phone: ${form.get("phone") ?? ""}`,
      ...(isReferral ? [] : [`Question: ${form.get("message") ?? ""}`]),
    ];

    window.location.href = `mailto:info@precisionvisioninstitute.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="inquiry-fields">
        <label>
          {isReferral ? "Your name" : "Name"}
          <input name="name" autoComplete="name" required />
        </label>
        {isReferral && (
          <label>
            Practice name
            <input name="practice" autoComplete="organization" required />
          </label>
        )}
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
        {!isReferral && (
          <label className="inquiry-message">
            General question
            <textarea name="message" rows={4} required />
          </label>
        )}
      </div>
      <p className="inquiry-privacy">Please do not include medical or other protected health information in this form.</p>
      <button className="button button-primary" type="submit">
        {isReferral ? "Request secure referral instructions" : "Send general inquiry"}
      </button>
    </form>
  );
}
