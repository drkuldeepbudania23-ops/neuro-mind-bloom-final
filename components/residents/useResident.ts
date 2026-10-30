"use client";

import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { api } from "../../lib/client/residentApi";
import type { Plan, ResidentProfile } from "../../lib/residents";

export type Me = {
  email: string;
  profile: (ResidentProfile & { email: string }) | null;
  accessUntil: number | null;
  active: boolean;
  plan: string;
  plans: Plan[];
};

/**
 * Signed-in resident + their access status. Redirects to the resident login when signed out;
 * `next` is where login returns to (the app home by default, the join page for website purchases).
 */
export function useResident(next: "/residents/app" | "/residents/join" = "/residents/app") {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  const [error, setError] = useState("");
  const loginHref = next === "/residents/join" ? "/residents/login?next=/residents/join&mode=signup" : "/residents/login";

  const refresh = useCallback(async () => {
    const { status, data } = await api<Me>("/api/residents/me");
    if (status === 401) return router.replace(loginHref);
    if (!data.ok) return setError(data.error === "not-configured" ? "The residents section is not set up yet." : "Could not load your account. Please refresh.");
    setError("");
    setMe(data);
  }, [router, loginHref]);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace(loginHref);
        return;
      }
      setUser(u);
      refresh();
    });
  }, [refresh, router, loginHref]);

  return { user, me, error, refresh };
}

export function formatDate(ms: number | null | undefined) {
  if (!ms) return "";
  return new Date(ms).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
