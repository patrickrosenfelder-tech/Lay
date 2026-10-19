# Precision Vision Institute website — runbook

How the site is put together, how to change common things, and what to do
when something breaks. Live site: https://www.precisionvisioninstitute.com

## How the site works

| Piece | Where |
|---|---|
| Code | GitHub `patrickrosenfelder-tech/Lay` (Next.js, run locally with vinext) |
| Hosting | Vercel team `patrickrosenfelder-techs-projects`, project `lay` |
| Live site | branch `main` → Vercel **Production** |
| Test site | branch `staging` → Vercel **Preview** (behind Vercel login) |
| Booking | EyeCloud scheduler, embedded on `/book` and the homepage |
| Contact form | `/api/inquiry` → email via Resend |
| Online referrals | Google Form in the practice's Google Workspace (HIPAA BAA), embedded on `/doctor-referral` |
| Referral PDF | `public/precision-vision-referral-form.pdf`, fax (470) 588-8894 |
| Google reviews | stored snapshot `app/google-reviews.json` — no live API calls |

### Release workflow

1. Work on `staging`, push, check the Preview deployment.
2. When approved, fast-forward `main` to `staging` (`git push origin origin/staging:main`).
3. Wait for the Production deployment, then check the live page.

Before pushing: `npm run lint`, `npx tsc --noEmit -p tsconfig.vercel.json`,
`npm test` (builds with vinext, then runs `tests/rendered-html.test.mjs`), and
`npm run build:vercel` (the build Vercel runs).

### Vercel environment variables

| Name | Type | Used for |
|---|---|---|
| `INQUIRY_RESEND_API_KEY` | Secret | contact + referral-question form email (Resend) |
| `INQUIRY_FROM_EMAIL` | Config | sender, must be on `precisionvisioninstitute.com` |
| `INQUIRY_TO_EMAIL` | Config | inbox that receives contact messages |
| `REFERRAL_GOOGLE_FORM_URL` | Config | online referral Google Form link |
| `SERPAPI_API_KEY`, `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | — | **no longer used by the site**; safe to delete |

Set every variable for **Production and Preview**. New values only apply after
a redeploy — and redeploy a deployment from the right branch (Deployments →
pick the newest row for `staging` or `main` → ⋯ → Redeploy).

## Common changes

| Change | Where |
|---|---|
| Opening hours | `OPENING_HOURS` and `OPENING_HOURS_SPEC` in `app/site.ts` (feeds homepage, contact, office page, Google structured data). Also update the Google Business Profile. |
| Phone, fax, email, address | `CLINIC` in `app/site.ts` |
| Menu | `navigation` in `app/SiteHeader.tsx` (nested groups like "Dry Eye" are `{ label, links }`) |
| Footer links | `app/SiteFooter.tsx` |
| Page copy | `pages` / `staticPages` in `app/[slug]/page.tsx` |
| Page titles / descriptions | `routeMetadata` in `app/[slug]/page.tsx` |
| FAQ answers | `app/faq-content.ts` (single source for /faq and service pages) |
| Add a Google review | add it at the top of `reviews` in `app/google-reviews.json`; update `rating`, `reviewCount`, `distribution`, `snapshotDate` from Google Maps |
| Refresh all reviews | `SERPAPI_API_KEY=… node scripts/refresh-google-reviews.mjs` (~6 SerpApi searches), review the diff, commit |
| Referral PDF wording | edit `scripts/build-referral-pdf.py`, then regenerate (instructions at the top of the script) |
| Old URL redirects | `redirects()` in `next.config.ts` |

## When something breaks

| Symptom | Likely cause | Fix |
|---|---|---|
| Contact form: "message service is temporarily unavailable" | `INQUIRY_RESEND_API_KEY` or `INQUIRY_FROM_EMAIL` missing for this environment | Add both in Vercel (Production + Preview), redeploy |
| Contact form: "We could not send your message" | Resend rejected it — domain not verified or sender not on the domain | Resend → Domains (must be Verified) and Emails/Logs for the reason; check DNS records in Cloudflare |
| Contact form says sent, nothing arrives | Spam folder, wrong `INQUIRY_TO_EMAIL` | Check spam; check Resend → Emails for delivery status |
| Online referral form missing on `/doctor-referral` | `REFERRAL_GOOGLE_FORM_URL` unset or not a `docs.google.com/forms/…` link | Set it (Config, Production + Preview), redeploy |
| Referral form shows "You need permission" | Google Form restricted to the organization | Form → Settings → Responses → turn off "Restrict to users in …" |
| Referral form footer shows the wrong organisation name | Workspace organisation name | admin.google.com → Account → Account settings → Profile → Organization name |
| Images or embeds blank, console shows "Content Security Policy" | Domain not allowed in the CSP | Add the domain to `img-src` / `frame-src` in `next.config.ts` |
| Review profile photos show initials | Google photo URL expired | Harmless fallback; refresh the reviews snapshot to get new URLs |
| Reviews look out of date | Snapshot is manual by design | Add new reviews by hand or run the refresh script (see above) |
| Phone menu won't open | Menu panel CSS (`.mobile-menu-panel.is-open`) | Check `app/globals.css`; test `mobile menu panel becomes visible when opened` guards it |
| Old link (e.g. `/lasik-pk-prk`) 404s | Redirect removed | Re-add to `redirects()` in `next.config.ts` |
| Deploy failed | Build or type error | Vercel → Deployments → the failed one → Build Logs; reproduce with `npm run build:vercel` |
| Changed a Vercel variable but nothing changed | No redeploy, or wrong branch redeployed | Redeploy the newest deployment of the right branch |
| Tests fail locally after an edit | Copy changed that a test checks | Read the assertion in `tests/rendered-html.test.mjs`; update the test if the change was intended |

## Open items

See `CONTENT-TODOS.md` for practice-supplied content (credentials, office
details, photos, myopia-control options).
