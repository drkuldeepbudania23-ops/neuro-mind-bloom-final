import type { Metadata } from "next";
import FeedbackPage, { FEEDBACK_META } from "../../components/content/FeedbackPage";
import { alternatesFor } from "../../lib/i18n";
import { displayableFeedback } from "../../lib/server/feedback";
import { SITE_URL } from "../../lib/site";

export const revalidate = 600;

export const metadata: Metadata = {
  title: FEEDBACK_META.title.en,
  description: FEEDBACK_META.description.en,
  alternates: alternatesFor("/feedback", SITE_URL, "en"),
};

export default async function Page() {
  return <FeedbackPage lang="en" reviews={await displayableFeedback()} />;
}
