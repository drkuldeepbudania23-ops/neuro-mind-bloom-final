import type { Metadata } from "next";
import ConditionsLibrary from "../../components/content/ConditionsLibrary";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: "Condition Library – Mental Health, Addiction & Sexual Health",
  description: "Guides to depression, anxiety, OCD, bipolar disorder, addiction, sexual health, child and old-age mental health — in English and Hindi.",
  alternates: alternatesFor("/conditions", SITE_URL, "en"),
};

export default function Page() {
  return <ConditionsLibrary lang="en" />;
}
