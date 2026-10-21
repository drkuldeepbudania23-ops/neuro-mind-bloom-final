import type { Metadata } from "next";
import LocationsIndex from "../../components/content/LocationsIndex";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: "Locations – Online Psychiatrist for Rajasthan, North India & All India",
  description: "Ajmer-based psychiatrist offering private video consultation: 25 Rajasthan cities, Uttar Pradesh, Madhya Pradesh, Haryana, Punjab, Delhi-NCR and all of India.",
  alternates: alternatesFor("/locations", SITE_URL, "en"),
};

export default function Page() {
  return <LocationsIndex lang="en" />;
}
