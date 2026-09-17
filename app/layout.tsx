import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: "Precision Vision Institute | Specialty Eye Care in Duluth, GA",
  description:
    "Personalized specialty eye care for keratoconus, severe dry eye, post-LASIK and post-RK vision, and progressive myopia in Duluth, Georgia.",
  openGraph: {
    title: "See what others miss. | Precision Vision Institute",
    description:
      "Advanced care for complex vision needs in Duluth, Georgia.",
    images: [{ url: "/og.jpg", width: 1200, height: 631 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "See what others miss. | Precision Vision Institute",
    description:
      "Advanced care for complex vision needs in Duluth, Georgia.",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#082f4b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* DM Sans — geometric sans-serif, Avenir Next substitute */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
