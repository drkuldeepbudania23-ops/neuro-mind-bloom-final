"use client";

import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirebaseAuth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DoctorLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      } else {
        setReady(true);
      }
    });

    return () => unsubscribe();
  }, [router]);

  async function logout() {
    const auth = getFirebaseAuth();
    await signOut(auth);
    router.replace("/login");
  }

  if (!ready) {
    return <div style={{ padding: 40 }}>Checking doctor login...</div>;
  }

  return (
    <>
      <header style={{
        padding: "14px 20px",
        background: "#0f5961",
        color: "white",
        display: "flex",
        gap: 18,
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        <strong style={{ marginRight: "auto" }}>
          Neuro Mind Bloom — Doctor
        </strong>

        <Link href="/doctor" style={link}>Dashboard</Link>
        <Link href="/doctor/appointments" style={link}>Appointments</Link>
        <Link href="/doctor/prescription" style={link}>E-Prescription</Link>
        <Link href="/doctor/follow-up" style={link}>Follow-up</Link>
        <Link href="/doctor/payment" style={link}>Payment</Link>

        <button onClick={logout} style={{
          border: 0,
          padding: "9px 14px",
          borderRadius: 8,
          cursor: "pointer"
        }}>
          Logout
        </button>
      </header>

      {children}
    </>
  );
}

const link = {
  color: "white",
  textDecoration: "none"
};
