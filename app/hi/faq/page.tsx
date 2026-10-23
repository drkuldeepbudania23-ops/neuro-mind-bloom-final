import type { Metadata } from "next";
import FaqPage from "../../../components/content/FaqPage";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";

export const metadata: Metadata = {
  title: "सवाल-जवाब – परामर्श, फीस, गोपनीयता, नशा मुक्ति",
  description: "ऑनलाइन मनोरोग परामर्श, फीस, गोपनीयता, नशा मुक्ति, यौन स्वास्थ्य और साइकोथेरेपी से जुड़े आम सवालों के जवाब।",
  alternates: alternatesFor("/faq", SITE_URL, "hi"),
};

export default function Page() {
  return <FaqPage lang="hi" />;
}
