import type { Metadata } from "next";
import RecoveryStoriesPage, { STORIES_META } from "../../../components/content/RecoveryStoriesPage";
import { alternatesFor } from "../../../lib/i18n";
import { publishedStories } from "../../../lib/server/stories";
import { SITE_URL } from "../../../lib/site";

export const revalidate = 600;

export const metadata: Metadata = {
  title: STORIES_META.title.hi,
  description: STORIES_META.description.hi,
  alternates: alternatesFor("/recovery-stories", SITE_URL, "hi"),
};

export default async function Page() {
  return <RecoveryStoriesPage lang="hi" stories={await publishedStories()} />;
}
