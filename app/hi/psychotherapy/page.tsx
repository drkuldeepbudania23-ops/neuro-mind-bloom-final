import type { Metadata } from "next";
import CentrePage from "../../../components/content/CentrePage";
import { PSYCHOTHERAPY_CENTRE } from "../../../lib/content/centres";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";

export const metadata: Metadata = {
  title: PSYCHOTHERAPY_CENTRE.title.hi,
  description: PSYCHOTHERAPY_CENTRE.description.hi,
  alternates: alternatesFor("/psychotherapy", SITE_URL, "hi"),
};

export default function Page() {
  return <CentrePage centre={PSYCHOTHERAPY_CENTRE} lang="hi" />;
}
