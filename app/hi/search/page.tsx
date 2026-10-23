import type { Metadata } from "next";
import SearchPage from "../../../components/content/SearchPage";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";

export const metadata: Metadata = {
  title: "खोजें",
  description: "बीमारी, इलाज, लेख और स्व-जाँच खोजें — हिंदी, अंग्रेज़ी या हिंग्लिश में।",
  alternates: alternatesFor("/search", SITE_URL, "hi"),
  robots: { index: false, follow: true },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = (await searchParams).q;
  return <SearchPage lang="hi" query={(Array.isArray(q) ? q[0] : q || "").slice(0, 80)} />;
}
