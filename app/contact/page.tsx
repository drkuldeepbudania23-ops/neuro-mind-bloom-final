import type { Metadata } from "next";
import ContactPage from "../../components/site/ContactPage";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact – Call, WhatsApp, Email & Social Media",
  description:
    "Contact Neuro Mind Bloom: call +91 81076 39481, WhatsApp +91 93763 15331, email drkuldeepbudania23@gmail.com. Follow on YouTube, Instagram and Facebook.",
  alternates: alternatesFor("/contact", SITE_URL, "en"),
};

export default function Page() {
  return <ContactPage lang="en" />;
}
