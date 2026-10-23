import type { L10n } from "../../i18n";
import type { ArticleCat, ArticleInput } from "../articles";

type P = [string, string]; // [English, Hindi]
type Q = [string, string, string, string]; // [qEn, qHi, aEn, aHi]

export type ArtSpec = {
  slug: string;
  title: P;
  excerpt: P;
  related: string[];
  refs: string[];
  intro: P[];
  key: P[];
  sym: P[];
  cause: P[];
  risk: P[];
  mgmt: P[];
  help: P[];
  faq: Q[];
  tags?: string[];
  video?: string[];
  heads?: Partial<Record<"keyConcepts" | "symptoms" | "causes" | "riskFactors" | "management" | "whenHelp", P>>;
};

const l = ([en, hi]: P): L10n => ({ en, hi });
const DATE = "2026-10-12";

/** Compact tuple format → structured article input. */
export function batch(cat: ArticleCat, specs: ArtSpec[]): ArticleInput[] {
  return specs.map((s) => ({
    slug: s.slug,
    cat,
    title: l(s.title),
    excerpt: l(s.excerpt),
    published: DATE,
    updated: DATE,
    related: s.related,
    refs: s.refs,
    intro: s.intro.map(l),
    keyConcepts: s.key.map(l),
    symptoms: s.sym.map(l),
    causes: s.cause.map(l),
    riskFactors: s.risk.map(l),
    management: s.mgmt.map(l),
    whenHelp: s.help.map(l),
    faqs: s.faq.map(([qe, qh, ae, ah]) => ({ q: { en: qe, hi: qh }, a: { en: ae, hi: ah } })),
    tags: s.tags,
    videoKeywords: s.video,
    headings: s.heads
      ? Object.fromEntries(Object.entries(s.heads).map(([k, v]) => [k, l(v as P)]))
      : undefined,
  }));
}
