import type { Metadata } from "next";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "precisionvisioninstitute.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    // TODO(client): Add alternates.canonical after the final production domain is confirmed.
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
}

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
