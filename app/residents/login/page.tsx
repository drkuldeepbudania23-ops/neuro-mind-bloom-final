"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebase";
import { card, field, label, page, primaryBtn, linkBtn } from "../../../components/residents/ui";

const ERRORS: Record<string, string> = {
  "auth/email-already-in-use": "An account with this email already exists. Please sign in.",
  "auth/invalid-credential": "Email or password is incorrect.",
  "auth/wrong-password": "Email or password is incorrect.",
  "auth/user-not-found": "No account with this email. Please create one.",
  "auth/weak-password": "Use a password of at least 8 characters.",
  "auth/invalid-email": "Please enter a valid email.",
  "auth/too-many-requests": "Too many attempts. Please wait a few minutes and try again.",
};

export default function ResidentLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("mode") === "signup") setMode("signup");
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setMsg("");
    if (mode === "signup" && password.length < 8) return setMsg(ERRORS["auth/weak-password"]);
    setBusy(true);
    try {
      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await sendEmailVerification(cred.user).catch(() => undefined);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      router.replace("/residents/app");
    } catch (error) {
      const code = (error as { code?: string }).code || "";
      setMsg(ERRORS[code] || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (!email.trim()) return setMsg("Enter your email above, then tap “Forgot password”.");
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMsg("Password reset link sent. Please check your email.");
    } catch {
      setMsg("Could not send the reset link. Check the email and try again.");
    }
  }

  return (
    <main style={page}>
      <div style={{ ...card, maxWidth: 420, margin: "40px auto" }}>
        <Link href="/residents" style={{ color: "#0b746f", fontWeight: 700, textDecoration: "none" }}>← Residents</Link>
        <h1 style={{ margin: "12px 0 4px", color: "#062b31" }}>{mode === "signup" ? "Create your account" : "Resident sign in"}</h1>
        <p style={{ marginTop: 0, color: "#475569" }}>Notes, video lectures and case discussions.</p>
        <form onSubmit={submit}>
          <label style={label} htmlFor="email">Email</label>
          <input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={field} />
          <label style={label} htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            required
            minLength={mode === "signup" ? 8 : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={field}
          />
          {msg && <p role="alert" style={{ color: "#b45309", marginBottom: 0 }}>{msg}</p>}
          <button type="submit" disabled={busy} style={{ ...primaryBtn, width: "100%", marginTop: 16 }}>
            {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, gap: 8, flexWrap: "wrap" }}>
          <button type="button" style={linkBtn} onClick={() => { setMsg(""); setMode(mode === "signup" ? "signin" : "signup"); }}>
            {mode === "signup" ? "Have an account? Sign in" : "New here? Create account"}
          </button>
          {mode === "signin" && <button type="button" style={linkBtn} onClick={reset}>Forgot password</button>}
        </div>
      </div>
    </main>
  );
}
