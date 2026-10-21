import type { Metadata, Viewport } from "next";
import { Fraunces, Mukta } from "next/font/google";
import SeoStructuredData from "./SeoStructuredData";
import { SITE_URL } from "../lib/site";
import "./globals.css";

// Mukta covers both Latin and Devanagari, so Hindi and English text share one
// consistent, highly legible typeface. Fraunces is used for display headings.
const mukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mukta",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Psychiatrist Dr. Kuldeep Budania | Online & Ajmer | Neuro Mind Bloom",
    template: "%s | Neuro Mind Bloom",
  },
  description:
    "Confidential psychiatry, de-addiction, sexual health and psychotherapy care with Dr. Kuldeep Budania (MBBS, MD Psychiatry). Video consultation across India, based in Ajmer, Rajasthan. Hindi & English.",
  keywords: [
    "online psychiatrist India", "psychiatrist Ajmer", "psychiatrist Rajasthan",
    "de addiction psychiatrist Rajasthan", "nasha mukti Ajmer", "sex specialist Ajmer",
    "depression treatment online India", "anxiety treatment online India", "OCD psychiatrist India",
    "psychotherapy online India", "मनोचिकित्सक अजमेर", "नशा मुक्ति", "Dr Kuldeep Budania",
    "Neuro Mind Bloom",
  ],
  alternates: {
    canonical: SITE_URL,
    languages: { "en-IN": SITE_URL, "hi-IN": `${SITE_URL}/hi`, "x-default": SITE_URL },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    url: SITE_URL,
    siteName: "Neuro Mind Bloom",
    title: "Dr. Kuldeep Budania – Psychiatrist | Neuro Mind Bloom",
    description: "Confidential psychiatry, de-addiction and psychotherapy care. Video consultation across India.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Neuro Mind Bloom – Mind Care, Life Care" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Kuldeep Budania – Psychiatrist | Neuro Mind Bloom",
    description: "Confidential psychiatry, de-addiction and psychotherapy care across India.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#073e45",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${mukta.variable} ${fraunces.variable}`}>
      <body>
        <SeoStructuredData />
        {children}
      </body>
    </html>
  );
}
