import type { Metadata } from "next";
import HubPage from "../../components/content/HubPage";
import { SEXUAL_HEALTH } from "../../lib/content/hubs";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: SEXUAL_HEALTH.title.en,
  description: SEXUAL_HEALTH.description.en,
  alternates: alternatesFor("/gupt-rog-sexual-health", SITE_URL, "en"),
};

export default function Page() {
  return <HubPage hub={SEXUAL_HEALTH} lang="en" />;
}
