"use client";

import type { ReactNode } from "react";
import VideoConsultationLauncher from "./VideoConsultationLauncher";

export default function DoctorTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <VideoConsultationLauncher />
    </>
  );
}
