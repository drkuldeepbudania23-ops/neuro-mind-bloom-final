import type { Metadata } from "next";
import VideosPage from "../../../components/content/VideosPage";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";
import { latestVideos } from "../../../lib/youtube/latest";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "वीडियो – मानसिक स्वास्थ्य, नशा मुक्ति और यौन स्वास्थ्य",
  description: "डॉ. कुलदीप बुडानिया से आसान हिंदी में डिप्रेशन, घबराहट, नशा मुक्ति और यौन स्वास्थ्य की जानकारी। YouTube पर सब्सक्राइब करें।",
  alternates: alternatesFor("/videos", SITE_URL, "hi"),
};

export default async function Page() {
  return <VideosPage lang="hi" videos={await latestVideos()} />;
}
