import type { Metadata } from "next";
import { ArticlesIndex, articleCards } from "../../components/content/ArticlePages";
import { getArticle } from "../../lib/content/articles";
import { cmsToArticle } from "../../lib/cms";
import { alternatesFor } from "../../lib/i18n";
import { cmsCategories, publishedCmsArticles } from "../../lib/server/cms";
import { SITE_URL } from "../../lib/site";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Articles – Mental Health, De-addiction & Sexual Health Library",
  description: "130+ evidence-based articles by Dr. Kuldeep Budania (MD Psychiatry) in English and Hindi: depression, anxiety, addiction, sexual health, children, sleep, students and older adults.",
  alternates: alternatesFor("/articles", SITE_URL, "en"),
};

export default async function Page() {
  const [cms, cats] = await Promise.all([publishedCmsArticles(), cmsCategories()]);
  const extra = articleCards(cms.filter((c) => !getArticle(c.slug)).map((c) => cmsToArticle(c, cats))).map((c) => ({ ...c, cms: true }));
  return <ArticlesIndex lang="en" extra={extra} />;
}
