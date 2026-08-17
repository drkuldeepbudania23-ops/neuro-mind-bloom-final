"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

const DOCTOR_EMAIL = "drkuldeepbudania23@gmail.com";

export default function DoctorDashboard() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (
        !user ||
        user.email?.toLowerCase() !== DOCTOR_EMAIL.toLowerCase()
      ) {
        if (user) {
          await signOut(auth);
        }

        router.replace("/login");
        return;
      }

      setEmail(user.email || "");
      setChecking(false);
    });

    return unsubscribe;
  }, [router]);

  async function logout() {
    await signOut(auth);
    router.replace("/login");
  }

  if (checking) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        Checking doctor login...
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f8fa",
        padding: "28px 18px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "18px",
            boxShadow: "0 8px 28px rgba(0,0,0,.07)",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "14px",
              alignItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  color: "#123d40",
                }}
              >
                Doctor Dashboard
              </h1>

              <p
                style={{
                  marginBottom: 0,
                  color: "#64748b",
                }}
              >
                Neuro Mind Bloom
              </p>
            </div>

            <button
              onClick={logout}
              style={{
                border: 0,
                background: "#b91c1c",
                color: "white",
                padding: "11px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "18px",
          }}
        >
          {[
            ["📅", "Appointments", "View patient appointments"],
            ["👤", "Patients", "Patient records"],
            ["💊", "E-Prescription", "Create prescriptions"],
            ["🎥", "Video Consultation", "Online consultation"],
            ["🔁", "Follow-up", "Manage follow-up visits"],
            ["💳", "Payments", "Consultation payments"],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              style={{
                background: "white",
                padding: "22px",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 7px 22px rgba(0,0,0,.05)",
              }}
            >
              <div style={{ fontSize: "30px" }}>{icon}</div>

              <h2
                style={{
                  fontSize: "19px",
                  marginBottom: "8px",
                  color: "#123d40",
                }}
              >
                {title}
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "24px",
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            color: "#475569",
          }}
        >
          Logged in as: <strong>{email}</strong>
        </div>
      </div>
    </main>
  );
}
