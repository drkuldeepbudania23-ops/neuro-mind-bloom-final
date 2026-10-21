import "server-only";
import { PUBLIC_REVIEWS_ENABLED, publicFeedback, type FeedbackDoc } from "../feedback";
import { adminDb, isAdminConfigured } from "./firebaseAdmin";

/**
 * Approved feedback that the author agreed to display. Returns [] while PUBLIC_REVIEWS_ENABLED
 * is false (the default), so nothing is even read from the database.
 */
export async function displayableFeedback(): Promise<Pick<FeedbackDoc, "rating" | "name" | "comment" | "reviewDate">[]> {
  if (!PUBLIC_REVIEWS_ENABLED || !isAdminConfigured()) return [];
  try {
    const snap = await adminDb().collection("feedback").where("status", "==", "approved").limit(50).get();
    return publicFeedback(snap.docs.map((d) => d.data() as FeedbackDoc)).map(({ rating, name, comment, reviewDate }) => ({ rating, name, comment, reviewDate }));
  } catch (error) {
    console.warn("feedback", error);
    return [];
  }
}
