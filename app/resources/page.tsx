import type { Metadata } from "next";
import ResourcesPage from "../../components/content/ResourcesPage";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: "Mental Health Resource Hub",
  description: "Guides for students, women, children and parents, families of people with addiction, older adults and couples — in Hindi and English.",
  alternates: alternatesFor("/resources", SITE_URL, "en"),
};

export default function Page() {
  return <ResourcesPage lang="en" />;
}
