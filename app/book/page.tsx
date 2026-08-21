import type { Metadata } from "next";
import { BookingPage } from "../BookingPage";

export const metadata: Metadata = {
  title: "Book an Appointment | Precision Vision Institute",
  description: "View current appointment availability at Precision Vision Institute in Duluth, Georgia.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return <BookingPage />;
}
