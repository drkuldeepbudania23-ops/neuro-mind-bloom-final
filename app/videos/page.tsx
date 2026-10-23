import type { Metadata } from "next";
import VideosPage from "../../components/content/VideosPage";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";
import { latestVideos } from "../../lib/youtube/latest";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Videos – Mental Health, De-addiction & Sexual Health",
  description: "Watch Dr. Kuldeep Budania explain depression, anxiety, nasha mukti and sexual health in simple Hindi. Subscribe on YouTube.",
  alternates: alternatesFor("/videos", SITE_URL, "en"),
};

export default async function Page() {
  return <VideosPage lang="en" videos={await latestVideos()} />;
}
