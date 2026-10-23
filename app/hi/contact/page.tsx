import type { Metadata } from "next";
import ContactPage from "../../../components/site/ContactPage";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";

export const metadata: Metadata = {
  title: "संपर्क – कॉल, WhatsApp, ईमेल और सोशल मीडिया",
  description:
    "Neuro Mind Bloom से संपर्क करें: कॉल +91 81076 39481, WhatsApp +91 93763 15331, ईमेल drkuldeepbudania23@gmail.com। YouTube, Instagram और Facebook पर जुड़ें।",
  alternates: alternatesFor("/contact", SITE_URL, "hi"),
};

export default function Page() {
  return <ContactPage lang="hi" />;
}
