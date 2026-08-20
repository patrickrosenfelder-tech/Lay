import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.precisionvisioninstitute.com"),
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
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "See what others miss. | Precision Vision Institute",
    description:
      "Advanced care for complex vision needs in Duluth, Georgia.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
