import type { Metadata } from "next";
import DoctorProfile from "../../../components/site/DoctorProfile";
import { alternatesFor } from "../../../lib/i18n";
import { SITE_URL } from "../../../lib/site";

export const metadata: Metadata = {
  title: "डॉ. कुलदीप बुडानिया – मनोचिकित्सक, MBBS, MD | प्रोफ़ाइल",
  description:
    "डॉ. कुलदीप बुडानिया, MBBS, MD मनोचिकित्सा — मानसिक रोग, नशा मुक्ति एवं सेक्स रोग विशेषज्ञ। अनुभव, नेतृत्व, सदस्यता (IPS, RDS) और प्रशिक्षण।",
  alternates: alternatesFor("/dr-kuldeep-budania", SITE_URL, "hi"),
  openGraph: { type: "profile", locale: "hi_IN", url: `${SITE_URL}/hi/dr-kuldeep-budania`, images: ["/dr-kuldeep.png"] },
};

export default function Page() {
  return <DoctorProfile lang="hi" />;
}
