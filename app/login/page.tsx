"use client";

import { FormEvent, useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

const DOCTOR_EMAIL = "drkuldeepbudania23@gmail.com";

export default function DoctorLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState(DOCTOR_EMAIL);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      auth.currentUser &&
      auth.currentUser.email?.toLowerCase() === DOCTOR_EMAIL.toLowerCase()
    ) {
      router.replace("/doctor");
    }
  }, [router]);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      if (
        result.user.email?.toLowerCase() !== DOCTOR_EMAIL.toLowerCase()
      ) {
        await signOut(auth);
        setMessage("This account is not authorised for Doctor Login.");
        return;
      }

      router.push("/doctor");
    } catch (error: any) {
      console.error(error);

      if (error?.code === "auth/invalid-credential") {
        setMessage("Email or password is incorrect.");
      } else if (error?.code === "auth/too-many-requests") {
        setMessage("Too many attempts. Please try again later.");
      } else {
        setMessage("Login failed. Please check Firebase Authentication.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background:
          "linear-gradient(135deg,#eef9f7 0%,#ffffff 45%,#eef3ff 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "white",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 20px 55px rgba(0,0,0,0.10)",
          border: "1px solid #e5e7eb",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "26px" }}>
          <div style={{ fontSize: "42px", marginBottom: "8px" }}>🧠</div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#123d40",
            }}
          >
            Neuro Mind Bloom
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
            }}
          >
            Doctor Login
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: 600,
            }}
          >
            Doctor Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              marginBottom: "18px",
              fontSize: "15px",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: 600,
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              marginBottom: "18px",
              fontSize: "15px",
            }}
          />

          {message && (
            <div
              style={{
                background: "#fff1f2",
                color: "#be123c",
                padding: "10px 12px",
                borderRadius: "8px",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              border: 0,
              borderRadius: "12px",
              padding: "14px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "16px",
              background: "#136f63",
              color: "white",
            }}
          >
            {loading ? "Signing in..." : "Login as Doctor"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => router.push("/")}
          style={{
            width: "100%",
            marginTop: "13px",
            padding: "11px",
            borderRadius: "10px",
            background: "white",
            border: "1px solid #d1d5db",
            cursor: "pointer",
          }}
        >
          ← Back to Website
        </button>
      </div>
    </main>
  );
}
