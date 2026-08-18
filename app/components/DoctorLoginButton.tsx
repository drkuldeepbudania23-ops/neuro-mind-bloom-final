"use client";

import Link from "next/link";

export default function DoctorLoginButton() {
  return (
    <Link
      href="/doctor/login"
      style={{
        position: "fixed",
        right: 20,
        bottom: 92,
        zIndex: 9998,
        background: "#234f52",
        color: "#fff",
        padding: "12px 18px",
        borderRadius: 999,
        textDecoration: "none",
        fontWeight: 700,
        boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
      }}
    >
      Doctor Login
    </Link>
  );
}