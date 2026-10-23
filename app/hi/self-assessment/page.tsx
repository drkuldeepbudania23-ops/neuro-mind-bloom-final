import type { Metadata } from "next";
import SelfAssessment from "../../../components/assessment/SelfAssessment";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";

export const metadata: Metadata = {
  title: "निःशुल्क मानसिक स्वास्थ्य स्व-जाँच – डिप्रेशन, घबराहट, शराब, ADHD",
  description: "डिप्रेशन (PHQ-9), घबराहट (GAD-7), शराब (AUDIT), वयस्क ADHD (ASRS), शारीरिक लक्षण (PHQ-15), नींद, नशा, OCD, तंबाकू और पढ़ाई के तनाव की निःशुल्क, निजी स्क्रीनिंग।",
  alternates: alternatesFor("/self-assessment", SITE_URL, "hi"),
};

export default function Page() {
  return <SelfAssessment lang="hi" />;
}
