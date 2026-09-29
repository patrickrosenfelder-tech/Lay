import { ArrowIcon } from "./ArrowIcon";
import { CLINIC, REFERRAL_FORM_URL } from "./site";

// The online referral form is a Google Form in the practice's own Google
// Workspace, which is covered by Google's HIPAA BAA. Referrals are stored in
// the practice's account; nothing passes through this website's servers or
// ordinary email. Set in Vercel (Config, Production + Preview):
//   REFERRAL_GOOGLE_FORM_URL = https://docs.google.com/forms/d/e/…/viewform
// Until it is set, the referral page offers only the PDF + fax route.

/** Returns the embeddable form URL, or null when unset or not a Google Form. */
export function referralFormEmbedUrl(): string | null {
  const raw = process.env.REFERRAL_GOOGLE_FORM_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.hostname !== "docs.google.com" || !url.pathname.startsWith("/forms/")) return null;
    url.searchParams.set("embedded", "true");
    return url.toString();
  } catch {
    return null;
  }
}

export function ReferralOnlineForm({ embedUrl }: { embedUrl: string }) {
  const openUrl = embedUrl.replace(/([?&])embedded=true&?/, "$1").replace(/[?&]$/, "");
  return (
    <section className="referral-online" id="refer-online" aria-labelledby="refer-online-heading">
      <div className="referral-online-intro">
        <p className="section-label">Refer online</p>
        <h2 id="refer-online-heading">Send a referral in two minutes.</h2>
        <p>
          The form goes straight to the clinic&apos;s secure, HIPAA-covered Google Workspace account. We contact the patient to
          schedule and can update your office after the visit. Please fax corneal maps or records to{" "}
          {CLINIC.fax}.
        </p>
        <div className="referral-online-alternatives">
          <a href={openUrl} target="_blank" rel="noopener noreferrer">
            Open the form in a new tab <ArrowIcon />
          </a>
          <a href={REFERRAL_FORM_URL} target="_blank" rel="noopener">
            Prefer fax? Download the PDF <ArrowIcon />
          </a>
        </div>
      </div>
      <iframe
        className="referral-online-frame"
        src={embedUrl}
        title="Precision Vision Institute online referral form"
        loading="lazy"
      />
    </section>
  );
}
