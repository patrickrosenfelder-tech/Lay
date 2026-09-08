"use client";

import { FormEvent, useState } from "react";
import { CLINIC } from "./site";

type InquiryFormProps = {
  kind: "contact" | "referral";
};

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "sent" }
  | { state: "error"; message: string };

const GENERIC_ERROR =
  "We could not send your message. Please call the clinic and we will help right away.";

export function InquiryForm({ kind }: InquiryFormProps) {
  const isReferral = kind === "referral";
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.state === "submitting") return;

    const form = new FormData(event.currentTarget);
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          name: form.get("name"),
          practice: form.get("practice"),
          email: form.get("email"),
          phone: form.get("phone"),
          message: form.get("message"),
          company: form.get("company"),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setStatus({ state: "error", message: result.error ?? GENERIC_ERROR });
        return;
      }

      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: GENERIC_ERROR });
    }
  };

  if (status.state === "sent") {
    return (
      <div className="inquiry-form inquiry-success" role="status">
        <h3>Thank you — your message is on its way.</h3>
        <p>
          {isReferral
            ? "We will reply with secure referral instructions within one business day."
            : "We will get back to you within one business day."}{" "}
          If you need help sooner, call{" "}
          <a href={CLINIC.phoneHref}>{CLINIC.phone}</a>.
        </p>
      </div>
    );
  }

  const isSubmitting = status.state === "submitting";

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} noValidate={false}>
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

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div className="inquiry-honeypot" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="inquiry-privacy">
        Please do not include medical or other protected health information in
        this form.
      </p>

      {status.state === "error" && (
        <p className="inquiry-error" role="alert">
          {status.message} Call <a href={CLINIC.phoneHref}>{CLINIC.phone}</a>.
        </p>
      )}

      <button
        className="button button-primary"
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting
          ? "Sending…"
          : isReferral
            ? "Request referral instructions"
            : "Send general inquiry"}
      </button>
    </form>
  );
}
