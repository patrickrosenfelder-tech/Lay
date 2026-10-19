export const SITE_URL = "https://www.precisionvisioninstitute.com";

export const CLINIC = {
  name: "Precision Vision Institute",
  phone: "(470) 440-4099",
  phoneHref: "tel:+14704404099",
  phoneE164: "+1-470-440-4099",
  email: "info@precisionvisioninstitute.com",
  fax: "(470) 588-8894",
  faxE164: "+1-470-588-8894",
  streetAddress: "3940 Buford Hwy Ste A104",
  addressLocality: "Duluth",
  addressRegion: "GA",
  postalCode: "30096",
  addressCountry: "US",
  // Coordinates of the Google Business Profile listing for the practice.
  latitude: 33.9775123,
  longitude: -84.1613159,
} as const;

export const MAPS_URL =
  "https://www.google.com/maps/place/Precision+Vision+Institute/@33.9775123,-84.1638908,17z/data=!4m8!3m7!1s0x88f5a31f1f5f00c9:0x21ed856629aca207!8m2!3d33.9775123!4d-84.1613159!9m1!1b1!16s%2Fg%2F11jv5wpzc2";

// Opening hours: the one place to edit them. Shown on the homepage, contact
// and office pages; OPENING_HOURS_SPEC feeds Google via structured data.
export const OPENING_HOURS = [
  { days: "Mon / Tue / Wed / Thurs", hours: "9:30 AM–1:00 PM, 2:00 PM–5:30 PM" },
  { days: "Sat", hours: "9:30 AM–1:30 PM" },
  { days: "Fri / Sun", hours: "Closed", closed: true },
] as const;

export const OPENING_HOURS_TEXT = OPENING_HOURS.map(({ days, hours }) => `${days}: ${hours}`).join(". ") + ".";

const MON_THU = ["Monday", "Tuesday", "Wednesday", "Thursday"];
export const OPENING_HOURS_SPEC = [
  // Closed 1–2 PM for lunch, so the weekdays are two opening periods.
  { dayOfWeek: MON_THU, opens: "09:30", closes: "13:00" },
  { dayOfWeek: MON_THU, opens: "14:00", closes: "17:30" },
  { dayOfWeek: "Saturday", opens: "09:30", closes: "13:30" },
].map((spec) => ({ "@type": "OpeningHoursSpecification", ...spec }));

// Fillable one-page form; regenerate with scripts/build-referral-pdf.py.
export const REFERRAL_FORM_URL = "/precision-vision-referral-form.pdf";

export const FACEBOOK_URL =
  "https://www.facebook.com/people/Precision-Vision-Institute/100063539512239/";

export const INSTAGRAM_URL = "https://www.instagram.com/dr.laynim/";
