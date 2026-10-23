import type { Metadata } from "next";
import { ASSESSMENTS, ASSESSMENT_ORDER, type AssessmentId } from "../assessments";
import { alternatesFor, type Lang } from "../i18n";
import { SITE_URL } from "../site";
import { getCondition } from "./conditions";
import type { ConditionNames } from "../../components/assessment/SelfAssessment";

export function selfTestParams() {
  return ASSESSMENT_ORDER.map((test) => ({ test }));
}

export function isTest(id: string): id is AssessmentId {
  return (ASSESSMENT_ORDER as string[]).includes(id);
}

export function selfTestMetadata(id: string, lang: Lang): Metadata {
  if (!isTest(id)) return {};
  const a = ASSESSMENTS[id];
  const title = lang === "hi" ? `${a.title.hi} – निःशुल्क ऑनलाइन स्व-जाँच` : `${a.title.en} – Free Online Self-Check`;
  const description = (a.intro ?? a.about)[lang].slice(0, 155);
  return { title, description, alternates: alternatesFor(`/self-assessment/${id}`, SITE_URL, lang) };
}

/** Names of the related condition pages (passed to the client component, so it stays small). */
export function conditionNamesFor(id: AssessmentId): ConditionNames {
  const names: ConditionNames = {};
  for (const slug of ASSESSMENTS[id].conditions ?? []) {
    const c = getCondition(slug);
    if (c) names[slug] = c.name;
  }
  return names;
}
