import type { Metadata } from "next";
import ConditionsLibrary from "../../../components/content/ConditionsLibrary";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";

export const metadata: Metadata = {
  title: "बीमारियों की जानकारी – मानसिक स्वास्थ्य, नशा मुक्ति और यौन स्वास्थ्य",
  description: "डिप्रेशन, घबराहट, OCD, बाइपोलर, नशा, यौन समस्याएँ, बच्चों और बुज़ुर्गों के मानसिक स्वास्थ्य की जानकारी — हिंदी और अंग्रेज़ी में।",
  alternates: alternatesFor("/conditions", SITE_URL, "hi"),
};

export default function Page() {
  return <ConditionsLibrary lang="hi" />;
}
