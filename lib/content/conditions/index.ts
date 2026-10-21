import type { ConditionCategory, ConditionContent } from "../types";
import { ADDICTION } from "./addiction";
import { ANXIETY_SPECTRUM } from "./anxiety-spectrum";
import { CHILD_EXTRA, GERIATRIC, NEURO } from "./child-geriatric-neuro";
import { CITY_PAGES } from "./cities";
import { LIFE_STAGES } from "./life-stages";
import { MENTAL } from "./mental";
import { SERVICES_PAGES } from "./services";
import { SEXUAL } from "./sexual";
import { ENRICH_MENTAL } from "./enrich-mental";
import { ENRICH_OTHER } from "./enrich-other";
import { NEW_MOOD_ANXIETY } from "./new-mood-anxiety";
import { NEW_PSYCHOSIS_SLEEP_TRAUMA } from "./new-psychosis-sleep-trauma";
import { NEW_CHILD_EATING_DEMENTIA } from "./new-child-eating-dementia";
import { NEW_SUBSTANCES } from "./new-substances";
import { NEW_SEXUAL } from "./new-sexual";
import { NEW_STUDENTS } from "./new-students";
import { NEW_THERAPIES } from "./new-therapies";

const ENRICH: Record<string, Partial<ConditionContent>> = { ...ENRICH_MENTAL, ...ENRICH_OTHER };

const BASE: ConditionContent[] = [
  ...MENTAL,
  ...ANXIETY_SPECTRUM,
  ...ADDICTION,
  ...SEXUAL,
  ...LIFE_STAGES,
  ...CHILD_EXTRA,
  ...GERIATRIC,
  ...NEURO,
  ...SERVICES_PAGES,
  ...NEW_MOOD_ANXIETY,
  ...NEW_PSYCHOSIS_SLEEP_TRAUMA,
  ...NEW_CHILD_EATING_DEMENTIA,
  ...NEW_SUBSTANCES,
  ...NEW_SEXUAL,
  ...NEW_STUDENTS,
  ...NEW_THERAPIES,
  ...CITY_PAGES,
];

/** Original pages + advanced-library sections (risk factors, diagnosis, ICD…). */
export const CONDITIONS: ConditionContent[] = BASE.map((c) => ({ ...c, ...(ENRICH[c.slug] ?? {}) }));

const BY_SLUG = new Map(CONDITIONS.map((c) => [c.slug, c]));

export function getCondition(slug: string): ConditionContent | undefined {
  return BY_SLUG.get(slug);
}

export const CATEGORY_LABELS: Record<ConditionCategory, { en: string; hi: string }> = {
  mental: { en: "Mental health", hi: "मानसिक स्वास्थ्य" },
  addiction: { en: "De-addiction · Nasha mukti", hi: "नशा मुक्ति" },
  sexual: { en: "Sexual health", hi: "यौन स्वास्थ्य" },
  child: { en: "Child & adolescent psychiatry", hi: "बच्चों और किशोरों की मनोचिकित्सा" },
  student: { en: "Students", hi: "छात्र" },
  women: { en: "Women", hi: "महिलाएँ" },
  elderly: { en: "Geriatric psychiatry (older adults)", hi: "जेरियाट्रिक साइकियाट्री (बुज़ुर्ग)" },
  neuro: { en: "Neuropsychiatry", hi: "न्यूरोसाइकियाट्री" },
  therapy: { en: "Psychotherapy & counselling", hi: "साइकोथेरेपी और काउंसलिंग" },
  service: { en: "Consultation & locations", hi: "परामर्श और शहर" },
};

export const CATEGORY_ORDER: ConditionCategory[] = ["mental", "addiction", "sexual", "child", "student", "women", "elderly", "neuro", "therapy", "service"];
