"use client";

import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      router.replace("/doctor");
    } catch (error: any) {
      console.error(error);
      setMessage("Login failed. Please check email and password.");
    } finally {
      setLoading(false);
    }
  }

  async function forgotPassword() {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setMessage("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, cleanEmail);
      setMessage("Password reset email sent.");
    } catch (error: any) {
      console.error(error);
      setMessage("Could not send password reset email.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f3f7f7",
        display: "grid",
        placeItems: "center",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "white",
          padding: 30,
          borderRadius: 18,
          boxShadow: "0 15px 40px rgba(0,0,0,0.10)",
        }}
      >
        <h1
          style={{
            marginTop: 0,
            color: "#124c52",
          }}
        >
          Doctor Login
        </h1>

        <p style={{ color: "#64748b" }}>
          Neuro Mind Bloom Doctor Dashboard
        </p>

        <label
          style={{
            display: "block",
            marginTop: 18,
            fontWeight: 700,
          }}
        >
          Email
        </label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            marginTop: 7,
            padding: 13,
            borderRadius: 9,
            border: "1px solid #cbd5e1",
          }}
        />

        <label
          style={{
            display: "block",
            marginTop: 18,
            fontWeight: 700,
          }}
        >
          Password
        </label>

        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            marginTop: 7,
            padding: 13,
            borderRadius: 9,
            border: "1px solid #cbd5e1",
          }}
        />

        {message && (
          <div
            style={{
              marginTop: 15,
              padding: 11,
              background: "#f1f5f9",
              borderRadius: 8,
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
            marginTop: 20,
            padding: 14,
            borderRadius: 10,
            background: "#116169",
            color: "white",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={forgotPassword}
          style={{
            width: "100%",
            marginTop: 10,
            padding: 12,
            border: 0,
            background: "transparent",
            color: "#116169",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Forgot Password?
        </button>
      </form>
    </main>
  );
}
