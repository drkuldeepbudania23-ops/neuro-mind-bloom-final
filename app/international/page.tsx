import type { Metadata } from "next";
import InternationalPage from "../../components/content/InternationalPage";
import { INTERNATIONAL } from "../../lib/content/international";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: INTERNATIONAL.title.en,
  description: INTERNATIONAL.description.en,
  alternates: alternatesFor("/international", SITE_URL, "en"),
};

export default function Page() {
  return <InternationalPage lang="en" />;
}
