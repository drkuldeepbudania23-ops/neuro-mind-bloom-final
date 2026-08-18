"use client";

import Link from "next/link";

export default function DoctorDashboard() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Neuro Mind Bloom</h1>
      <h2>Doctor Dashboard</h2>
      <p>Dr. Kuldeep Budania - MD Psychiatry</p>

      <div style={{ display: "grid", gap: 20, marginTop: 30 }}>
        <Link href="/doctor/prescription">e-Prescription</Link>
        <Link href="/doctor/follow-up">Patient Follow-up</Link>
        <Link href="/doctor/payment">Payment</Link>
      </div>
    </main>
  );
}