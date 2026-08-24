import SeoStructuredData from "./SeoStructuredData";
import DoctorLoginButton from "./components/DoctorLoginButton";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neuro Mind Bloom | Dr. Kuldeep Budania, MD Psychiatry",
  description: "Consult Dr Kuldeep Budania, MD Psychiatry. Psychiatry and de-addiction services in Rajasthan with online psychiatric consultation across India for anxiety, depression, OCD, bipolar disorder, schizophrenia, sleep and other mental health concerns.",
  keywords: [
    "psychiatrist in Rajasthan",
    "best psychiatrist in Rajasthan",
    "psychiatrist Rajasthan",
    "mental health doctor Rajasthan",
    "de addiction psychiatrist Rajasthan",
    "de addiction doctor Rajasthan",
    "nasha mukti doctor Rajasthan",

    "psychiatrist Ajmer",
    "psychiatrist in Ajmer",
    "psychiatrist Jaipur",
    "psychiatrist in Jaipur",
    "psychiatrist Kota",
    "psychiatrist in Kota",
    "psychiatrist Jodhpur",
    "psychiatrist Udaipur",

    "Dr Kuldeep Budania",
    "Dr Kuldeep Budania psychiatrist",
    "Neuro Mind Bloom",

    "online psychiatrist India",
    "online psychiatrist consultation India",
    "psychiatrist online India",
    "online psychiatry consultation",
    "online mental health consultation India",
    "online de addiction consultation India",

    "anxiety treatment Rajasthan",
    "depression treatment Rajasthan",
    "OCD treatment Rajasthan",
    "bipolar disorder psychiatrist Rajasthan",
    "schizophrenia treatment Rajasthan",
    "sleep disorder psychiatrist Rajasthan",
    "sexual disorder psychiatrist Rajasthan",
    "psychotherapy Rajasthan"
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SeoStructuredData />{children}        <DoctorLoginButton />
      </body>
    </html>
  );
}




