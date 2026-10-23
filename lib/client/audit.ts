"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

/** Add an entry to the append-only audit log (Firestore rules: own uid, create-only). Never throws. */
export async function logAction(action: string, details: Record<string, string | number | boolean | null> = {}) {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    await addDoc(collection(db, "auditLog"), { uid, action: action.slice(0, 80), details, source: "client", at: serverTimestamp() });
  } catch (error) {
    console.warn("audit log", error);
  }
}
