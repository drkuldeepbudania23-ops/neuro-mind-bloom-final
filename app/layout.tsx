import SeoStructuredData from "./SeoStructuredData";
import DoctorLoginButton from "./components/DoctorLoginButton";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.neuromindbloom.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Online Psychiatrist India | Dr. Kuldeep Budania | Neuro Mind Bloom",
    template: "%s | Neuro Mind Bloom",
  },
  description:
    "Online psychiatry consultation across India with Dr. Kuldeep Budania, MD Psychiatry. Confidential care for anxiety, depression, OCD, bipolar disorder, schizophrenia, addiction, sleep concerns and psychotherapy. Based in Ajmer, Rajasthan.",
  keywords: [
    "online psychiatrist India", "online psychiatry consultation India", "psychiatrist online India",
    "online mental health consultation India", "psychiatrist Rajasthan", "psychiatrist Ajmer",
    "psychiatrist Jaipur", "psychiatrist Kota", "de addiction psychiatrist Rajasthan",
    "anxiety treatment online India", "depression treatment online India", "OCD psychiatrist India",
    "addiction psychiatrist India", "psychotherapy online India", "sex specialist India", "sex specialist Ajmer", "sexual health psychiatrist India", "sexual disorders psychiatrist", "performance anxiety treatment", "Dr Kuldeep Budania psychiatrist",
    "Neuro Mind Bloom"
  ],
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Neuro Mind Bloom",
    title: "Online Psychiatrist India | Dr. Kuldeep Budania",
    description: "Confidential online psychiatry consultation across India. Based in Ajmer, Rajasthan.",
    images: [{ url: "/dr-kuldeep.png", alt: "Dr. Kuldeep Budania - MD Psychiatry" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Psychiatrist India | Dr. Kuldeep Budania",
    description: "Confidential online psychiatry consultation across India.",
    images: ["/dr-kuldeep.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <SeoStructuredData />
        {children}
        <DoctorLoginButton />
      </body>
    </html>
  );
}
