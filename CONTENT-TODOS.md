# Precision Vision Institute content requests

These items need source material or client verification before they should appear
on the public site. No placeholder claims should be converted into published
facts without approval.

## Brand and photography

- Original vector logo artwork (`.svg`, `.ai`, or `.eps`) to replace the
  transparent PNG without redrawing the mark.
- A clinical homepage hero portrait of Dr. Lay Nim working with diagnostic
  equipment.
- A second, distinct photo of Dr. Nim in an exam-room or patient-care setting
  for her profile page. Do not reuse the current portrait for this placement.

## Dr. Lay Nim biography

- Confirmed number of years in practice and the preferred starting year.
- A verified count or approved range for specialty/scleral lens fittings, if
  the practice wants to publish one.
- Dr. Nim's expanded first-person explanation of why she chose specialty
  contact-lens care.

## Online referral form (Google Form)

- Super admin accepts Google's HIPAA BAA: Admin console → Account → Account
  settings → Legal and compliance → Google Workspace/Cloud Identity HIPAA
  Business Associate Amendment. Required before any real referral is sent.
- Build the Google Form in the practice's Workspace (fields mirror the PDF),
  with sign-in NOT required and "send responders a copy" OFF.
- Add its link in Vercel as `REFERRAL_GOOGLE_FORM_URL` (Config, Production +
  Preview) and redeploy. Until then the referral page offers PDF + fax only.

## Google reviews (snapshot)

- Reviews are a stored snapshot in `app/google-reviews.json` (no live API
  calls). Add new reviews by hand (newest first) and update `rating`,
  `reviewCount`, `distribution`, and `snapshotDate` from Google Maps, or run
  `SERPAPI_API_KEY=… node scripts/refresh-google-reviews.mjs` (~6 searches).
- The Vercel variables SERPAPI_API_KEY, GOOGLE_PLACES_API_KEY and
  GOOGLE_PLACE_ID are no longer used by the site and can be deleted.

