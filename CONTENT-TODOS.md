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

## Latest 50 Google reviews (SerpApi)

- Google declined Business Profile API access, so the testimonials page uses
  SerpApi to retrieve the listing's public reviews (newest first).
- Create a free SerpApi account (250 searches/month; the site uses ~180) and
  add its key in Vercel as `SERPAPI_API_KEY` (Secret, Production + Preview),
  then redeploy. Until then the page shows the 5 Places API reviews.
- Check SerpApi's dashboard after the first week to confirm usage stays
  inside the free plan.

## Online referral form (Google Form)

- Super admin accepts Google's HIPAA BAA: Admin console → Account → Account
  settings → Legal and compliance → Google Workspace/Cloud Identity HIPAA
  Business Associate Amendment. Required before any real referral is sent.
- Build the Google Form in the practice's Workspace (fields mirror the PDF),
  with sign-in NOT required and "send responders a copy" OFF.
- Add its link in Vercel as `REFERRAL_GOOGLE_FORM_URL` (Config, Production +
  Preview) and redeploy. Until then the referral page offers PDF + fax only.
