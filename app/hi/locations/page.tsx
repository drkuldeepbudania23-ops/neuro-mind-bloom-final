import type { Metadata } from "next";
import LocationsIndex from "../../../components/content/LocationsIndex";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";

export const metadata: Metadata = {
  title: "सेवा क्षेत्र – राजस्थान, उत्तर भारत और पूरे भारत के लिए ऑनलाइन मनोचिकित्सक",
  description: "अजमेर स्थित मनोचिकित्सक का निजी वीडियो परामर्श: राजस्थान के 25 शहर, उत्तर प्रदेश, मध्य प्रदेश, हरियाणा, पंजाब, दिल्ली-NCR और पूरा भारत।",
  alternates: alternatesFor("/locations", SITE_URL, "hi"),
};

export default function Page() {
  return <LocationsIndex lang="hi" />;
}
