import DoctorLoginButton from "./components/DoctorLoginButton";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neuro Mind Bloom | Dr. Kuldeep Budania, MD Psychiatry",
  description:
    "Confidential online psychiatric consultation and psychotherapy by Dr. Kuldeep Budania, MD Psychiatry, Ajmer.",
  keywords: [
    "psychiatrist Ajmer",
    "online psychiatry consultation",
    "psychotherapy",
    "Dr Kuldeep Budania",
    "Neuro Mind Bloom"
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}        <DoctorLoginButton />
      </body>
    </html>
  );
}

