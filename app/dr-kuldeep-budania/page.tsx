import type { Metadata } from "next";
import DoctorProfile from "../../components/site/DoctorProfile";
import { alternatesFor } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: "Dr. Kuldeep Budania – Psychiatrist, MBBS, MD Psychiatry | Profile",
  description:
    "Dr. Kuldeep Budania, MBBS, MD Psychiatry: psychiatrist, de-addiction and sexual health specialist. Experience, leadership roles, memberships (IPS, RDS) and training.",
  alternates: alternatesFor("/dr-kuldeep-budania", SITE_URL, "en"),
  openGraph: { type: "profile", title: "Dr. Kuldeep Budania – Psychiatrist", url: `${SITE_URL}/dr-kuldeep-budania`, images: ["/dr-kuldeep.png"] },
};

export default function Page() {
  return <DoctorProfile lang="en" />;
}
