"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DoctorLoginButton() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname.startsWith("/doctor")) {
    return null;
  }

  return (
    <Link
      href="/login"
      style={{
        position: "fixed",
        right: "18px",
        bottom: "18px",
        zIndex: 9999,
        padding: "12px 18px",
        borderRadius: "999px",
        background: "#136f63",
        color: "white",
        textDecoration: "none",
        fontWeight: 700,
        boxShadow: "0 8px 25px rgba(0,0,0,.20)",
      }}
    >
      Doctor Login
    </Link>
  );
}
