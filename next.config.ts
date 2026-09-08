import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: "tsconfig.vercel.json",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; frame-src 'self' https://web.eyecloudpro.com https://www.google.com https://maps.google.com; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://vitals.vercel-insights.com; font-src 'self' data:; object-src 'none'; upgrade-insecure-requests" },
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/LASIK/PK/PRK",
        destination: "/lasik-pk-prk",
        statusCode: 301,
      },
      {
        source: "/post-laser-vision",
        destination: "/lasik-pk-prk",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
