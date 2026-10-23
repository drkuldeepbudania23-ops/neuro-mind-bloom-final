import type { Metadata } from "next";
import SelfAssessment from "../../components/assessment/SelfAssessment";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: "Free Mental Health Self-Check – Depression, Anxiety, Alcohol, ADHD",
  description: "Free, private screening in English and Hindi: depression (PHQ-9), anxiety (GAD-7), alcohol (AUDIT), adult ADHD (ASRS), physical symptoms (PHQ-15), sleep, drugs, OCD, tobacco and study stress.",
  alternates: alternatesFor("/self-assessment", SITE_URL, "en"),
};

export default function Page() {
  return <SelfAssessment lang="en" />;
}
