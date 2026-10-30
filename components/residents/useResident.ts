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

/** Signed-in resident + their access status. Redirects to the resident login when signed out. */
export function useResident() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    const { status, data } = await api<Me>("/api/residents/me");
    if (status === 401) return router.replace("/residents/login");
    if (!data.ok) return setError(data.error === "not-configured" ? "The residents section is not set up yet." : "Could not load your account. Please refresh.");
    setError("");
    setMe(data);
  }, [router]);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace("/residents/login");
        return;
      }
      setUser(u);
      refresh();
    });
  }, [refresh, router]);

  return { user, me, error, refresh };
}

export function formatDate(ms: number | null | undefined) {
  if (!ms) return "";
  return new Date(ms).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
