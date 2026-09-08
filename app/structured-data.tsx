import {
  CLINIC,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MAPS_URL,
  SITE_URL,
} from "./site";

export const CLINIC_ID = `${SITE_URL}/#clinic`;

const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday"],
    opens: "09:30",
    closes: "17:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Friday",
    opens: "09:30",
    closes: "16:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "09:30",
    closes: "13:30",
  },
];

const services = [
  "Scleral lens fitting",
  "Keratoconus management",
  "Dry eye evaluation and treatment",
  "Orthokeratology (Ortho-K/CRT)",
  "Myopia management",
  "Post-surgical specialty contact lenses",
];

export const clinicStructuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": CLINIC_ID,
  name: CLINIC.name,
  url: SITE_URL,
  description:
    "Specialty eye care for keratoconus, severe dry eye, complex corneas, post-surgical vision, and progressive myopia.",
  telephone: CLINIC.phoneE164,
  email: CLINIC.email,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/precision-vision-logo.png`,
  priceRange: "$$",
  hasMap: MAPS_URL,
  sameAs: [FACEBOOK_URL, INSTAGRAM_URL, MAPS_URL],
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC.streetAddress,
    addressLocality: CLINIC.addressLocality,
    addressRegion: CLINIC.addressRegion,
    postalCode: CLINIC.postalCode,
    addressCountry: CLINIC.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CLINIC.latitude,
    longitude: CLINIC.longitude,
  },
  areaServed: [
    { "@type": "City", name: "Duluth", addressRegion: "GA" },
    { "@type": "City", name: "Johns Creek", addressRegion: "GA" },
    { "@type": "City", name: "Suwanee", addressRegion: "GA" },
    { "@type": "City", name: "Norcross", addressRegion: "GA" },
    { "@type": "City", name: "Alpharetta", addressRegion: "GA" },
  ],
  // schema.org expects MedicalSpecialty enum members here; the practice's own
  // service names belong in availableService / knowsAbout instead.
  medicalSpecialty: "Optometric",
  knowsAbout: services,
  availableService: services.map((name) => ({
    "@type": "MedicalTherapy",
    name,
  })),
  openingHoursSpecification: openingHours,
};

export function breadcrumbStructuredData(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

export function faqStructuredData(
  faqs: readonly (readonly [string, string])[] | { question: string; answer: string }[],
) {
  const entries = Array.isArray(faqs[0])
    ? (faqs as readonly (readonly [string, string])[]).map(([q, a]) => ({
        question: q,
        answer: a,
      }))
    : (faqs as { question: string; answer: string }[]);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function medicalWebPageStructuredData({
  path,
  name,
  description,
  about,
}: {
  path: string;
  name: string;
  description: string;
  about?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${SITE_URL}${path}#page`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: CLINIC.name },
    provider: { "@id": CLINIC_ID },
    ...(about ? { about: { "@type": "MedicalCondition", name: about } } : {}),
  };
}

export const doctorStructuredData = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": `${SITE_URL}/dr-nim#physician`,
  name: "Dr. Lay Nim, OD",
  jobTitle: "Optometrist",
  medicalSpecialty: "Optometric",
  url: `${SITE_URL}/dr-nim`,
  image: `${SITE_URL}/dr-nim.webp`,
  telephone: CLINIC.phoneE164,
  worksFor: { "@id": CLINIC_ID },
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC.streetAddress,
    addressLocality: CLINIC.addressLocality,
    addressRegion: CLINIC.addressRegion,
    postalCode: CLINIC.postalCode,
    addressCountry: CLINIC.addressCountry,
  },
  knowsAbout: [
    "Keratoconus",
    "Scleral contact lenses",
    "Orthokeratology",
    "Myopia management",
    "Dry eye disease",
  ],
  sameAs: [INSTAGRAM_URL],
};

export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
