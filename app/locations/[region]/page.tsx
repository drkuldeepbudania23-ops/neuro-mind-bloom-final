import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RegionPage from "../../../components/content/RegionPage";
import { REGIONS, REGION_BY_SLUG } from "../../../lib/content/regions";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return REGIONS.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const r = REGION_BY_SLUG.get((await params).region);
  if (!r) return {};
  return {
    title: r.title.en,
    description: r.description.en,
    alternates: alternatesFor(`/locations/${r.slug}`, SITE_URL, "en"),
    openGraph: { title: r.title.en, description: r.description.en, locale: "en_IN" },
  };
}

export default async function Page({ params }: { params: Promise<{ region: string }> }) {
  const r = REGION_BY_SLUG.get((await params).region);
  if (!r) notFound();
  return <RegionPage region={r} lang="en" />;
}
