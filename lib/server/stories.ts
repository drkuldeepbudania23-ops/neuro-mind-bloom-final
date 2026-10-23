import "server-only";
import { publicStory, type Story } from "../stories";
import { adminDb, isAdminConfigured } from "./firebaseAdmin";

/** Published recovery stories for the public page (Admin SDK). Empty on any error. */
export async function publishedStories() {
  if (!isAdminConfigured()) return [];
  try {
    const snap = await adminDb().collection("recoveryStories").where("status", "==", "published").limit(100).get();
    return snap.docs
      .map((d) => ({ ...(d.data() as Story), id: d.id }))
      // Defence in depth — the rules already refuse to publish these.
      .filter((s) => s.doctorReviewed && (s.fictional || s.consent?.documented))
      .sort((a, b) => b.updated.localeCompare(a.updated))
      .map(publicStory);
  } catch (error) {
    console.warn("recovery stories", error);
    return [];
  }
}
