import "server-only";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb, isAdminConfigured } from "./firebaseAdmin";

/**
 * Append-only audit trail of sensitive doctor actions done through the server
 * (prescription shared, data exported, 2FA changes, e-sign…). Never throws.
 * Clients can add entries too (rules: create-only, own uid), never edit/delete.
 */
export async function audit(uid: string, action: string, details: Record<string, unknown> = {}) {
  if (!isAdminConfigured()) return;
  try {
    const clean: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(details)) {
      if (v === undefined) continue;
      clean[k] = typeof v === "string" ? v.slice(0, 300) : v;
    }
    await adminDb().collection("auditLog").add({ uid, action, details: clean, source: "server", at: FieldValue.serverTimestamp() });
  } catch (error) {
    console.error("audit", error);
  }
}
