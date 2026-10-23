import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "../../components/booking/BookingForm";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: "Book Appointment – Online Psychiatry Consultation",
  description:
    "Book a confidential video consultation with Dr. Kuldeep Budania (MD Psychiatry). Psychiatry ₹500 · Psychotherapy ₹1500 first session, ₹1000 follow-up.",
  alternates: alternatesFor("/book-appointment", SITE_URL, "en"),
};

export default function Page() {
  return (
    <Suspense>
      <BookingForm lang="en" />
    </Suspense>
  );
}
