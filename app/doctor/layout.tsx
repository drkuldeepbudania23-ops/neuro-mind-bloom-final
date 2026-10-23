"use client";

import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import MfaPrompt from "../../components/doctor/MfaPrompt";

export default function DoctorLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);
  const [needMfa, setNeedMfa] = useState(false);

  useEffect(() => {
    if (pathname === "/doctor/login") {
      setChecking(false);
      return;
    }

    let active = true;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!active) return;
      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const token = await user.getIdTokenResult();
        if (!active) return;
        if (token.claims.doctor !== true) {
          await signOut(auth);
          if (active) router.replace("/login?access=denied");
          return;
        }
        // 2FA enrolled but its session expired → ask for the code before showing data.
        const exp = Number(token.claims.mfa_exp || 0);
        setNeedMfa(token.claims.mfa === true && !(exp > Date.now() / 1000));
        setChecking(false);
      } catch {
        if (active) router.replace("/login");
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [pathname, router]);

  if (pathname === "/doctor/login") {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Checking doctor login...
      </div>
    );
  }

  if (needMfa) {
    return <MfaPrompt onDone={() => setNeedMfa(false)} />;
  }

  return <>{children}</>;
}
