"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (
      email === "drkuldeepbudania23@gmail.com" &&
      password === "Doctor@123"
    ) {
      sessionStorage.setItem("doctorLoggedIn", "true");
      router.push("/doctor");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f7f7",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "white",
          padding: 30,
          borderRadius: 18,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: 8 }}>Doctor Login</h1>
        <p style={{ marginBottom: 24 }}>Neuro Mind Bloom</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Doctor Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 14,
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 14,
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />

          {error && (
            <p style={{ color: "red", marginBottom: 12 }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "none",
              background: "#234f52",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
