import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "../../../components/booking/BookingForm";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";

export const metadata: Metadata = {
  title: "अपॉइंटमेंट बुक करें – ऑनलाइन मनोरोग परामर्श",
  description:
    "डॉ. कुलदीप बुडानिया (MD मनोचिकित्सा) से गोपनीय वीडियो परामर्श बुक करें। मनोरोग परामर्श ₹500 · साइकोथेरेपी पहला सत्र ₹1500, फॉलो-अप ₹1000।",
  alternates: alternatesFor("/book-appointment", SITE_URL, "hi"),
};

export default function Page() {
  return (
    <Suspense>
      <BookingForm lang="hi" />
    </Suspense>
  );
}
