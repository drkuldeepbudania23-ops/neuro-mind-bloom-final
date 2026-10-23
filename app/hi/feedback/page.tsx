import type { Metadata } from "next";
import FeedbackPage, { FEEDBACK_META } from "../../../components/content/FeedbackPage";
import { alternatesFor } from "../../../lib/i18n";
import { displayableFeedback } from "../../../lib/server/feedback";
import { SITE_URL } from "../../../lib/site";

export const revalidate = 600;

export const metadata: Metadata = {
  title: FEEDBACK_META.title.hi,
  description: FEEDBACK_META.description.hi,
  alternates: alternatesFor("/feedback", SITE_URL, "hi"),
};

export default async function Page() {
  return <FeedbackPage lang="hi" reviews={await displayableFeedback()} />;
}
