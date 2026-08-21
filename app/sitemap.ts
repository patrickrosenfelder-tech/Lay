import type { MetadataRoute } from "next";

const routes = [
  "",
  "/book",
  "/dry-eye",
  "/envision-dry-eye",
  "/sclerals",
  "/lasik-pk-prk",
  "/ortho-k-crt-lenses",
  "/patients",
  "/insurances",
  "/testimonials",
  "/faq",
  "/dr-nim",
  "/our-office",
  "/doctor-referral",
  "/contact",
  "/privacy-policy",
  "/hipaa-notice",
  "/terms-of-service",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.precisionvisioninstitute.com";
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
