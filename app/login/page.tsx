"use client";

import { FormEvent, useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirebaseAuth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const auth = getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/doctor");
    } catch (error: any) {
      setMsg(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function forgotPassword() {
    if (!email.trim()) {
      setMsg("पहले registered email लिखें।");
      return;
    }

    try {
      const auth = getFirebaseAuth();
      await sendPasswordResetEmail(auth, email.trim());
      setMsg("Password reset email भेज दिया गया है।");
    } catch (error: any) {
      setMsg(error?.message || "Reset email नहीं भेजा जा सका।");
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      background: "#f4f8f8",
      padding: 20
    }}>
      <form onSubmit={login} style={{
        width: "100%",
        maxWidth: 420,
        background: "white",
        padding: 32,
        borderRadius: 18,
        boxShadow: "0 10px 35px rgba(0,0,0,.10)"
      }}>
        <h1>Doctor Login</h1>
        <p>Neuro Mind Bloom</p>

        <input
          type="email"
          placeholder="Registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={input}
        />

        <button type="submit" disabled={loading} style={primary}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <button type="button" onClick={forgotPassword} style={secondary}>
          Forgot Password
        </button>

        {msg && <p>{msg}</p>}
      </form>
    </main>
  );
}

const input = {
  width: "100%",
  padding: "13px",
  marginBottom: "12px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  boxSizing: "border-box" as const
};

const primary = {
  width: "100%",
  padding: "13px",
  border: 0,
  borderRadius: "10px",
  background: "#126a73",
  color: "white",
  fontWeight: 700,
  cursor: "pointer"
};

const secondary = {
  width: "100%",
  marginTop: "10px",
  padding: "12px",
  border: "1px solid #126a73",
  borderRadius: "10px",
  background: "white",
  color: "#126a73",
  cursor: "pointer"
};
