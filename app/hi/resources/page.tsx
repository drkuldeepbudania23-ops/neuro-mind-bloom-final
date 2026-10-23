import type { Metadata } from "next";
import ResourcesPage from "../../../components/content/ResourcesPage";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";

export const metadata: Metadata = {
  title: "मानसिक स्वास्थ्य जानकारी केंद्र",
  description: "छात्रों, महिलाओं, बच्चों और माता-पिता, नशे से जूझ रहे परिवारों, बुज़ुर्गों और दंपतियों के लिए जानकारी — हिंदी और अंग्रेज़ी में।",
  alternates: alternatesFor("/resources", SITE_URL, "hi"),
};

export default function Page() {
  return <ResourcesPage lang="hi" />;
}
