import "server-only";
import type { CmsArticle, CmsCategory } from "../cms";
import { adminDb, isAdminConfigured } from "./firebaseAdmin";

/**
 * Published doctor-written content for public pages (server-side, Admin SDK).
 * Returns empty lists when Firebase Admin is not configured or on any error, so the static
 * website always renders.
 */
export async function publishedCmsArticles(): Promise<CmsArticle[]> {
  if (!isAdminConfigured()) return [];
  try {
    const snap = await adminDb().collection("cmsArticles").where("status", "==", "published").limit(500).get();
    return snap.docs.map((d) => ({ ...(d.data() as CmsArticle), id: d.id }));
  } catch (error) {
    console.warn("cms articles", error);
    return [];
  }
}

export async function cmsCategories(): Promise<CmsCategory[]> {
  if (!isAdminConfigured()) return [];
  try {
    const snap = await adminDb().collection("cmsCategories").limit(100).get();
    return snap.docs.map((d) => ({ id: d.id, name: d.data()?.name }));
  } catch {
    return [];
  }
}

export async function publishedCmsArticle(slug: string): Promise<CmsArticle | null> {
  const all = await publishedCmsArticles();
  return all.find((a) => a.slug === slug) ?? null;
}
