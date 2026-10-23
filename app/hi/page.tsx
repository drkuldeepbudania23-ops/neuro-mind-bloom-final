import type { Metadata } from "next";
import HomePage from "../../components/site/HomePage";
import { latestVideos } from "../../lib/youtube/latest";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: { absolute: "मनोचिकित्सक डॉ. कुलदीप बुडानिया | ऑनलाइन व अजमेर | Neuro Mind Bloom" },
  description:
    "डॉ. कुलदीप बुडानिया (MBBS, MD मनोचिकित्सा) — मानसिक रोग, नशा मुक्ति एवं सेक्स रोग विशेषज्ञ। पूरे भारत में गोपनीय वीडियो परामर्श, अजमेर, राजस्थान।",
  alternates: alternatesFor("/", SITE_URL, "hi"),
  openGraph: { locale: "hi_IN", url: `${SITE_URL}/hi` },
};

export const revalidate = 21600;

export default async function Page() {
  const videos = await latestVideos(3);
  return <HomePage lang="hi" videos={videos} />;
}
