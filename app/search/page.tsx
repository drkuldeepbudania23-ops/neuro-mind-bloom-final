import type { Metadata } from "next";
import SearchPage from "../../components/content/SearchPage";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: "Search",
  description: "Search conditions, treatments, articles and self-checks in English, Hindi or Hinglish.",
  alternates: alternatesFor("/search", SITE_URL, "en"),
  robots: { index: false, follow: true },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = (await searchParams).q;
  return <SearchPage lang="en" query={(Array.isArray(q) ? q[0] : q || "").slice(0, 80)} />;
}
