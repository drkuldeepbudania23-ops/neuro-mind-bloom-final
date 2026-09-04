"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import VideoConsultationLauncher from "./VideoConsultationLauncher";

export default function DoctorTemplate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideVideo = pathname.startsWith("/doctor/prescription");

  return (
    <>
      {children}
      {!hideVideo && <VideoConsultationLauncher />}
    </>
  );
}
