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

## Clinical review before launch

- Dr. Nim to review the new `/keratoconus` page copy (symptoms, lens options,
  cross-linking wording, FAQ) before it is promoted from staging.
- Confirm the "Post-surgical vision" wording covers the procedures the practice
  sees: LASIK, PRK, RK, and corneal transplant (PK).

## Reviews

- Current Google review count from the Google Business Profile, so the
  testimonials page can show "5.0 · N reviews" (see `GOOGLE_RATING` in
  `app/reviews.ts`).

## Google reviews widget

- Create a Google Cloud API key restricted to **Places API (New)** and add it in
  Vercel as `GOOGLE_PLACES_API_KEY` (Preview + Production), then redeploy.
  Optional: `GOOGLE_PLACE_ID` to skip the name/address lookup.
- Until the key is set, /testimonials and the homepage carousel show the
  curated testimonials in `app/reviews.ts`.

## Clinical wording to confirm

- Dr. Nim to confirm the Ortho-K FAQ: lenses FDA-approved for temporary myopia
  correction; myopia-control use described as off-label in the U.S.
- Dr. Nim to confirm the hedged safety/comfort answers in `app/faq-content.ts`.

## All Google reviews (Business Profile API)

- Request Business Profile API access for the Google Cloud project (Google
  approval, days to weeks). Until approved and configured, the site keeps
  using the Places API (max 5 reviews).
- Then add in Vercel (Production + Preview): GBP_CLIENT_ID, GBP_CLIENT_SECRET,
  GBP_REFRESH_TOKEN (Secrets) and GBP_ACCOUNT_ID, GBP_LOCATION_ID (Config).
- OAuth consent screen must be "In production", not "Testing"; testing-mode
  refresh tokens expire after 7 days and the reviews would silently fall back.
