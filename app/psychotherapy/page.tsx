import type { Metadata } from "next";
import CentrePage from "../../components/content/CentrePage";
import { PSYCHOTHERAPY_CENTRE } from "../../lib/content/centres";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: PSYCHOTHERAPY_CENTRE.title.en,
  description: PSYCHOTHERAPY_CENTRE.description.en,
  alternates: alternatesFor("/psychotherapy", SITE_URL, "en"),
};

export default function Page() {
  return <CentrePage centre={PSYCHOTHERAPY_CENTRE} lang="en" />;
}
