import type { MetadataRoute } from "next";

// Priorities reflect how central each page is to a new patient's decision.
// No lastModified: a build timestamp on every URL tells crawlers nothing.
const routes: [string, number][] = [
  ["", 1],
  ["/keratoconus", 0.9],
  ["/sclerals", 0.9],
  ["/post-surgical-vision", 0.9],
  ["/dry-eye", 0.9],
  ["/envision-dry-eye", 0.8],
  ["/ortho-k-crt-lenses", 0.9],
  ["/dr-nim", 0.8],
  ["/book", 0.8],
  ["/testimonials", 0.7],
  ["/insurances", 0.7],
  ["/patients", 0.6],
  ["/faq", 0.6],
  ["/our-office", 0.6],
  ["/contact", 0.6],
  ["/doctor-referral", 0.5],
  ["/privacy-policy", 0.2],
  ["/hipaa-notice", 0.2],
  ["/terms-of-service", 0.2],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.precisionvisioninstitute.com";
  return routes.map(([route, priority]) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route.startsWith("/privacy") || route.startsWith("/hipaa") || route.startsWith("/terms") ? "yearly" : "monthly",
    priority,
  }));
}
