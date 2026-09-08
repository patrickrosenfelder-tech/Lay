import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
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
