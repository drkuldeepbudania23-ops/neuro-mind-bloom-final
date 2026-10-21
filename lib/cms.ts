import type { L10n } from "./i18n";
import { ARTICLE_CATS, type Article, type ArticleBlock, type ArticleCat } from "./content/articles";

/**
 * Doctor-managed content stored in Firestore (written from the doctor dashboard, read publicly
 * only when published — see firestore.rules). Shared by the admin screens and the public pages.
 */
export type CmsStatus = "draft" | "published";

export type CmsArticle = {
  id?: string;
  slug: string;
  /** A built-in library category or the id of a doctor-created category. */
  cat: string;
  title: L10n;
  excerpt: L10n;
  /** Lightweight text format: "## Heading", "- list item", blank line between paragraphs. */
  body: L10n;
  /** One reference per line (title, publisher, year, link) — the doctor is responsible for accuracy. */
  references: string;
  tags: string;
  related: string[];
  status: CmsStatus;
  published: string; // yyyy-mm-dd
  updated: string; // yyyy-mm-dd
};

export type CmsCategory = { id: string; name: L10n };

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+){1,10}$/;

export function emptyCmsArticle(today: string): CmsArticle {
  return {
    slug: "",
    cat: "awareness",
    title: { en: "", hi: "" },
    excerpt: { en: "", hi: "" },
    body: { en: "", hi: "" },
    references: "",
    tags: "",
    related: [],
    status: "draft",
    published: today,
    updated: today,
  };
}

/** Validation shared by the editor (and mirrored by Firestore rules). Returns error messages. */
export function validateCms(a: CmsArticle): string[] {
  const errors: string[] = [];
  if (!SLUG_RE.test(a.slug)) errors.push("URL slug: lowercase words separated by hyphens (e.g. sleep-tips-for-shift-workers).");
  if (!a.title.en.trim() || !a.title.hi.trim()) errors.push("Title is needed in English and Hindi.");
  if (!a.excerpt.en.trim() || !a.excerpt.hi.trim()) errors.push("Meta description is needed in English and Hindi.");
  if (a.excerpt.en.length > 200) errors.push("English meta description should be 200 characters or fewer.");
  if (a.status === "published" && (!a.body.en.trim() || !a.body.hi.trim())) errors.push("Article text is needed in both languages before publishing.");
  return errors;
}

function parseBody(text: string): { h?: string; p?: string; list?: string[] }[] {
  const out: { h?: string; p?: string; list?: string[] }[] = [];
  for (const chunk of text.replace(/\r/g, "").split(/\n{2,}/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    if (lines.every((l) => l.startsWith("- "))) out.push({ list: lines.map((l) => l.slice(2).trim()) });
    else if (lines[0].startsWith("## ")) {
      out.push({ h: lines[0].slice(3).trim() });
      const rest = lines.slice(1);
      if (rest.length) out.push(rest.every((l) => l.startsWith("- ")) ? { list: rest.map((l) => l.slice(2).trim()) } : { p: rest.join(" ") });
    } else out.push({ p: lines.join(" ") });
  }
  return out;
}

/** Turn the bilingual text bodies into article blocks (English structure drives pairing). */
export function bodyToBlocks(body: L10n): ArticleBlock[] {
  const en = parseBody(body.en);
  const hi = parseBody(body.hi);
  return en.map((b, i) => {
    const h = hi[i] ?? {};
    if (b.h !== undefined) return { h: { en: b.h, hi: h.h ?? b.h } };
    if (b.list) return { list: b.list.map((li, j) => ({ en: li, hi: h.list?.[j] ?? li })) };
    return { p: { en: b.p ?? "", hi: h.p ?? b.p ?? "" } };
  });
}

export function cmsToArticle(c: CmsArticle, categories: CmsCategory[] = []): Article {
  const builtIn = (c.cat in ARTICLE_CATS ? c.cat : "awareness") as ArticleCat;
  const custom = categories.find((x) => x.id === c.cat);
  const blocks = bodyToBlocks(c.body);
  const words = c.body.en.split(/\s+/).length;
  return {
    slug: c.slug,
    title: c.title,
    excerpt: c.excerpt,
    category: custom?.name ?? ARTICLE_CATS[builtIn],
    cat: builtIn,
    published: c.published,
    updated: c.updated,
    readMinutes: Math.max(2, Math.round(words / 200) + 1),
    related: c.related ?? [],
    body: blocks,
    customRefs: c.references.split("\n").map((l) => l.trim()).filter(Boolean),
    tags: c.tags.split(",").map((t) => t.trim()).filter(Boolean),
  };
}
