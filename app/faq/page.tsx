import type { Metadata } from "next";
import FaqPage from "../../components/content/FaqPage";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: "FAQ – Consultation, Fees, Privacy, De-addiction",
  description: "Answers to common questions about online psychiatry consultation, fees, confidentiality, nasha mukti, sexual health and psychotherapy.",
  alternates: alternatesFor("/faq", SITE_URL, "en"),
};

export default function Page() {
  return <FaqPage lang="en" />;
}
