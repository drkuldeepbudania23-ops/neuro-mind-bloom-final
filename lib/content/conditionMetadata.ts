import type { Metadata } from "next";
import { alternatesFor, type Lang } from "../i18n";
import { SITE_URL } from "../site";
import { getCondition } from "./conditions";

export function conditionMetadata(slug: string, lang: Lang): Metadata {
  const c = getCondition(slug);
  if (!c) return {};
  const title = c.title[lang];
  const description = c.description[lang];
  return {
    title,
    description,
    alternates: alternatesFor(`/${slug}`, SITE_URL, lang),
    openGraph: { title, description, locale: lang === "hi" ? "hi_IN" : "en_IN", type: "article" },
  };
}
