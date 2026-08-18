"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const DOCTOR_EMAIL = "drkuldeepbudania23@gmail.com";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/doctor/login";

  const [loading, setLoading] = useState(!isLoginPage);
  const [authorized, setAuthorized] = useState(isLoginPage);

  useEffect(() => {
    if (isLoginPage) {
      setAuthorized(true);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (
        user &&
        user.email?.toLowerCase() === DOCTOR_EMAIL.toLowerCase()
      ) {
        setAuthorized(true);
        setLoading(false);
      } else {
        if (user) {
          await signOut(auth);
        }

        setAuthorized(false);
        setLoading(false);
        router.replace("/doctor/login");
      }
    });

    return () => unsubscribe();
  }, [isLoginPage, router]);

  async function handleLogout() {
    await signOut(auth);
    router.replace("/doctor/login");
    router.refresh();
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading || !authorized) {
    return (
      <main style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif"
      }}>
        Checking doctor login...
      </main>
    );
  }

  return (
    <>
      <div style={{
        maxWidth: 900,
        margin: "18px auto 0",
        padding: "0 20px",
        display: "flex",
        justifyContent: "flex-end"
      }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 16px",
            border: "1px solid #ccc",
            borderRadius: 8,
            background: "white",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Logout
        </button>
      </div>

      {children}
    </>
  );
}
