import type { Metadata } from "next";
import HubPage from "../../../components/content/HubPage";
import { NASHA_MUKTI } from "../../../lib/content/hubs";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";

export const metadata: Metadata = {
  title: NASHA_MUKTI.title.hi,
  description: NASHA_MUKTI.description.hi,
  alternates: alternatesFor("/nasha-mukti", SITE_URL, "hi"),
};

export default function Page() {
  return <HubPage hub={NASHA_MUKTI} lang="hi" />;
}
