import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "../../../../components/content/ArticlePages";
import { ARTICLES, getArticle, type Article } from "../../../../lib/content/articles";
import { cmsToArticle } from "../../../../lib/cms";
import { alternatesFor } from "../../../../lib/i18n";
import { cmsCategories, publishedCmsArticle } from "../../../../lib/server/cms";
import { SITE_URL } from "../../../../lib/site";
import { latestVideos } from "../../../../lib/youtube/latest";

type Props = { params: Promise<{ slug: string }> };

/** Library articles are static; doctor-published (CMS) articles are rendered on demand. */
export const dynamicParams = true;
export const revalidate = 600;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

async function load(slug: string): Promise<Article | null> {
  const a = getArticle(slug);
  if (a) return a;
  const cms = await publishedCmsArticle(slug);
  return cms ? cmsToArticle(cms, await cmsCategories()) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await load((await params).slug);
  if (!a) return {};
  return {
    title: a.title.hi,
    description: a.excerpt.hi,
    alternates: alternatesFor(`/articles/${a.slug}`, SITE_URL, "hi"),
    openGraph: { type: "article", title: a.title.hi, description: a.excerpt.hi, publishedTime: a.published, modifiedTime: a.updated, locale: "hi_IN" },
  };
}

export default async function Page({ params }: Props) {
  const article = await load((await params).slug);
  if (!article) notFound();
  const videos = await latestVideos(15);
  return <ArticleView article={article} lang="hi" videos={videos} />;
}
