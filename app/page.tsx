import type { Metadata } from "next";
import HomePage from "../components/site/HomePage";
import { latestVideos } from "../lib/youtube/latest";
import { alternatesFor } from "../lib/i18n";
import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: { absolute: "Psychiatrist Dr. Kuldeep Budania | Online & Ajmer | Neuro Mind Bloom" },
  alternates: alternatesFor("/", SITE_URL, "en"),
};

export const revalidate = 21600;

export default async function Page() {
  const videos = await latestVideos(3);
  return <HomePage lang="en" videos={videos} />;
}
