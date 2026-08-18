"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  browserLocalPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

const DOCTOR_EMAIL = "drkuldeepbudania23@gmail.com";

export default function DoctorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DOCTOR_EMAIL);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await setPersistence(auth, browserLocalPersistence);

      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      if (
        result.user.email?.toLowerCase() !==
        DOCTOR_EMAIL.toLowerCase()
      ) {
        await signOut(auth);
        setError("Unauthorized doctor account.");
        return;
      }

      router.replace("/doctor");
      router.refresh();
    } catch {
      setError("Email or password is incorrect.");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError("");
    setMessage("");

    if (email.trim().toLowerCase() !== DOCTOR_EMAIL.toLowerCase()) {
      setError("Please use the authorized doctor email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage("Password reset email sent. Please check your inbox.");
    } catch {
      setError("Password reset email could not be sent.");
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f7f7",
      fontFamily: "Arial, sans-serif",
      padding: 20
    }}>
      <form onSubmit={handleLogin} style={{
        width: "100%",
        maxWidth: 420,
        background: "white",
        padding: 32,
        borderRadius: 18,
        boxShadow: "0 10px 30px rgba(0,0,0,.08)"
      }}>
        <h1 style={{ marginTop: 0 }}>Doctor Login</h1>
        <p style={{ marginBottom: 24 }}>Neuro Mind Bloom</p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 13,
            marginBottom: 14,
            border: "1px solid #ccc",
            borderRadius: 8,
            boxSizing: "border-box"
          }}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{
            width: "100%",
            padding: 13,
            marginBottom: 10,
            border: "1px solid #ccc",
            borderRadius: 8,
            boxSizing: "border-box"
          }}
        />

        <button
          type="button"
          onClick={handleForgotPassword}
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            marginBottom: 16,
            cursor: "pointer",
            textDecoration: "underline"
          }}
        >
          Forgot password?
        </button>

        {error && <p style={{ color: "#b00020" }}>{error}</p>}
        {message && <p style={{ color: "#176b3a" }}>{message}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 13,
            border: "none",
            borderRadius: 8,
            background: "#234f52",
            color: "white",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
