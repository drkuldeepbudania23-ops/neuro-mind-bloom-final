"use client";

import { auth } from "../firebase";

/** fetch() to our own API with the signed-in user's Firebase ID token. */
export async function api<T = Record<string, unknown>>(
  path: string,
  init: { method?: string; body?: unknown } = {}
): Promise<{ status: number; data: T & { ok?: boolean; error?: string } }> {
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : "";
  const res = await fetch(path, {
    method: init.method || (init.body ? "POST" : "GET"),
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.body ? { "Content-Type": "application/json" } : {}),
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as T & { ok?: boolean; error?: string };
  return { status: res.status, data };
}

/** Upload a note PDF to Cloud Storage (doctor only — enforced by storage.rules). */
export async function uploadNotePdf(file: File, onProgress?: (pct: number) => void): Promise<string> {
  const { getStorage, ref, uploadBytesResumable } = await import("firebase/storage");
  const app = (await import("../firebase")).default;
  const id = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  const path = `residents/notes/${id}.pdf`;
  const task = uploadBytesResumable(ref(getStorage(app), path), file, { contentType: "application/pdf" });
  await new Promise<void>((resolve, reject) => {
    task.on(
      "state_changed",
      (s) => onProgress?.(Math.round((s.bytesTransferred / Math.max(1, s.totalBytes)) * 100)),
      reject,
      () => resolve()
    );
  });
  return path;
}
