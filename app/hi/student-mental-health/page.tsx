import type { Metadata } from "next";
import CentrePage from "../../../components/content/CentrePage";
import { STUDENT_CENTRE } from "../../../lib/content/centres";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";

export const metadata: Metadata = {
  title: STUDENT_CENTRE.title.hi,
  description: STUDENT_CENTRE.description.hi,
  alternates: alternatesFor("/student-mental-health", SITE_URL, "hi"),
};

export default function Page() {
  return <CentrePage centre={STUDENT_CENTRE} lang="hi" />;
}
