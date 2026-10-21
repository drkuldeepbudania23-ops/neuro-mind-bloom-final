import type { Metadata } from "next";
import { ArticlesIndex, articleCards } from "../../../components/content/ArticlePages";
import { getArticle } from "../../../lib/content/articles";
import { cmsToArticle } from "../../../lib/cms";
import { alternatesFor } from "../../../lib/i18n";
import { cmsCategories, publishedCmsArticles } from "../../../lib/server/cms";
import { SITE_URL } from "../../../lib/site";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "लेख – मानसिक स्वास्थ्य, नशा मुक्ति और यौन स्वास्थ्य",
  description: "डॉ. कुलदीप बुडानिया (MD मनोचिकित्सा) के 130+ प्रमाण-आधारित लेख: डिप्रेशन, घबराहट, नशा, यौन स्वास्थ्य, बच्चे, नींद, छात्र और बुज़ुर्ग।",
  alternates: alternatesFor("/articles", SITE_URL, "hi"),
};

export default async function Page() {
  const [cms, cats] = await Promise.all([publishedCmsArticles(), cmsCategories()]);
  const extra = articleCards(cms.filter((c) => !getArticle(c.slug)).map((c) => cmsToArticle(c, cats))).map((c) => ({ ...c, cms: true }));
  return <ArticlesIndex lang="hi" extra={extra} />;
}
