import type { L10n } from "../i18n";

export type ConditionCategory =
  | "mental"
  | "addiction"
  | "sexual"
  | "child"
  | "elderly"
  | "neuro"
  | "women"
  | "student"
  | "therapy"
  | "service";

/** The 18 clinical groups of the condition library (plus extra library sections). */
export type LibraryGroup =
  | "mood"
  | "anxiety"
  | "ocd"
  | "bipolar"
  | "psychosis"
  | "sleep"
  | "child"
  | "adhd-autism"
  | "learning"
  | "personality"
  | "trauma"
  | "somatic"
  | "eating"
  | "geriatric"
  | "dementia"
  | "sexual"
  | "substance"
  | "behavioural"
  | "neuro"
  | "women"
  | "student"
  | "therapy"
  | "crisis"
  | "service";

export type SelfTestId = "phq9" | "gad7" | "audit" | "asrs" | "ocd" | "tobacco" | "phq15" | "drugs" | "sleep" | "study-stress";

/** An extra titled list, e.g. "Withdrawal", "Relapse prevention", "How sessions work". */
export type ExtraSection = { id: string; title: L10n; items: L10n[]; tone?: "warning" | "info" };

export type FaqItem = { q: L10n; a: L10n };

/**
 * One condition / service page. Rendered at /<slug> (English) and /hi/<slug> (Hindi)
 * by components/content/ConditionPage.tsx.
 */
export type ConditionContent = {
  slug: string;
  category: ConditionCategory;
  /** Short name used in cards and breadcrumbs. */
  name: L10n;
  /** <title> (brand is appended automatically). */
  title: L10n;
  h1: L10n;
  description: L10n;
  intro: L10n[];
  /** Optional custom section headings (defaults: Symptoms / Causes / Treatment / When to see a doctor). */
  headings?: Partial<Record<"symptoms" | "causes" | "treatment" | "seekHelp" | "riskFactors" | "diagnosis" | "psychotherapy" | "family" | "overview", L10n>>;
  symptoms: L10n[];
  causes: L10n[];
  treatment: L10n[];
  seekHelp: L10n[];
  faqs: FaqItem[];
  related: string[];
  /** Self-assessment to suggest, if any (legacy single value). */
  selfTest?: SelfTestId;

  // ---- Advanced library fields (all optional so older pages keep working) ----
  /** Library grouping (18 clinical groups + extras). Falls back to `category`. */
  group?: LibraryGroup;
  /** ICD-10 / ICD-11 codes — only where a clear category exists. */
  icd?: { icd10?: string; icd11?: string; note?: L10n };
  riskFactors?: L10n[];
  diagnosis?: L10n[];
  psychotherapy?: L10n[];
  family?: L10n[];
  /** Extra sections shown after causes / risk factors (withdrawal, relapse prevention…). */
  extra?: ExtraSection[];
  /** Relevant self-assessments (first one is featured). */
  selfTests?: SelfTestId[];
  /** Article slugs (articles that list this page in `related` are added automatically). */
  articles?: string[];
  /** Words used to find matching videos on the clinic's YouTube channel. */
  videoKeywords?: string[];
  /** Extra search words, including Hinglish (e.g. "daru", "neend"). */
  keywords?: string[];
};
