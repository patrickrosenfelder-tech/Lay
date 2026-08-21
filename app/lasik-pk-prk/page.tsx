import type { Metadata } from "next";
import DetailPage from "../[slug]/page";

export const metadata: Metadata = {
  title: "LASIK/PK/PRK | Precision Vision Institute",
  description: "Specialty care for glare, halos, ghosting, and fluctuating vision after LASIK, PK, PRK, RK, or other corneal procedures.",
  alternates: { canonical: "/lasik-pk-prk" },
  openGraph: {
    title: "LASIK/PK/PRK | Precision Vision Institute",
    description: "Specialty care for glare, halos, ghosting, and fluctuating vision after corneal procedures.",
    images: [{ url: "/exam-room.jpg", alt: "Precision Vision Institute examination room" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LASIK/PK/PRK | Precision Vision Institute",
    description: "Specialty care for glare, halos, ghosting, and fluctuating vision after corneal procedures.",
    images: ["/exam-room.jpg"],
  },
};

export default function LasikPkPrkPage() {
  return <DetailPage params={Promise.resolve({ slug: "post-laser-vision" })} allowLegacyPostLaserPath />;
}
