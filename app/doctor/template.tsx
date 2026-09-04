"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import VideoConsultationLauncher from "./VideoConsultationLauncher";

export default function DoctorTemplate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPrescription = pathname === "/doctor/prescription" || pathname.startsWith("/doctor/prescription/");

  return (
    <>
      {children}
      {!isPrescription && <VideoConsultationLauncher />}
    </>
  );
}
