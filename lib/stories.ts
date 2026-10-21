import type { L10n } from "./i18n";

/**
 * Recovery stories (Master Prompt Part 13).
 *
 * Two kinds:
 *  - "fictional": clearly labelled educational examples written by the clinic. Allowed once the
 *    doctor has reviewed them.
 *  - real patient stories: may only be published after the doctor has reviewed the text AND
 *    written consent is documented (and the story is de-identified). The editor and the
 *    Firestore rules both refuse to publish a real story without these.
 * No story may promise or imply a guaranteed outcome.
 */
export type StoryStatus = "draft" | "published";

export const STORY_CATEGORIES = {
  depression: { en: "Depression & mood", hi: "डिप्रेशन और मूड" },
  anxiety: { en: "Anxiety & OCD", hi: "चिंता और OCD" },
  addiction: { en: "De-addiction", hi: "नशा मुक्ति" },
  sexual: { en: "Sexual health", hi: "यौन स्वास्थ्य" },
  student: { en: "Students & young people", hi: "विद्यार्थी और युवा" },
  family: { en: "Family & caregivers", hi: "परिवार और देखभाल करने वाले" },
  other: { en: "Other", hi: "अन्य" },
} satisfies Record<string, L10n>;
export type StoryCategory = keyof typeof STORY_CATEGORIES;

export type Story = {
  id?: string;
  title: L10n;
  category: StoryCategory;
  /** Plain text; blank line between paragraphs. */
  narrative: L10n;
  /** Optional https image (must not identify a real patient). */
  imageUrl: string;
  imageAlt: L10n;
  fictional: boolean;
  doctorReviewed: boolean;
  consent: {
    documented: boolean;
    /** Where the signed consent is kept / how it was obtained — internal only, never public. */
    note: string;
    date: string;
  };
  status: StoryStatus;
  updated: string;
};

export function emptyStory(today: string): Story {
  return {
    title: { en: "", hi: "" },
    category: "depression",
    narrative: { en: "", hi: "" },
    imageUrl: "",
    imageAlt: { en: "", hi: "" },
    fictional: true,
    doctorReviewed: false,
    consent: { documented: false, note: "", date: "" },
    status: "draft",
    updated: today,
  };
}

/** Phrases that suggest a guaranteed or miracle outcome. */
const GUARANTEE_RE = /\b(guarantee[ds]?|100\s?%|permanent(ly)? cured?|miracle|cured forever|never relapse)\b|गारंटी|पक्का इलाज|हमेशा के लिए ठीक|चमत्कार/i;

/** Returns blocking problems; the publish button is disabled while any exist. */
export function validateStory(s: Story, publishing: boolean): string[] {
  const e: string[] = [];
  if (!s.title.en.trim() || !s.title.hi.trim()) e.push("Title is needed in English and Hindi.");
  if (s.title.en.length > 140 || s.title.hi.length > 140) e.push("Title must be 140 characters or less.");
  if (!(s.category in STORY_CATEGORIES)) e.push("Choose a category.");
  if (s.narrative.en.length > 8000 || s.narrative.hi.length > 8000) e.push("Narrative must be under 8,000 characters.");
  if (s.imageUrl && !/^https:\/\/\S+$/.test(s.imageUrl)) e.push("Image link must start with https://");
  if (s.imageUrl && (!s.imageAlt.en.trim() || !s.imageAlt.hi.trim())) e.push("Describe the image (alt text) in English and Hindi.");
  if (GUARANTEE_RE.test(`${s.title.en} ${s.title.hi} ${s.narrative.en} ${s.narrative.hi}`)) e.push("Remove wording that promises a guaranteed or permanent cure.");
  if (publishing) {
    if (s.narrative.en.trim().length < 200 || s.narrative.hi.trim().length < 150) e.push("Narrative is too short to publish (both languages needed).");
    if (!s.doctorReviewed) e.push("Doctor review must be ticked before publishing.");
    if (!s.fictional && !s.consent.documented) e.push("A real patient story cannot be published until written consent is documented.");
    if (!s.fictional && !s.consent.date) e.push("Record the consent date.");
  }
  return e;
}

export function canPublishStory(s: Story): boolean {
  return validateStory(s, true).length === 0;
}

/** Public-safe projection: drops the internal consent note. */
export function publicStory(s: Story) {
  const { consent, ...rest } = s;
  void consent;
  return rest;
}

export const STORY_DISCLAIMER: L10n = {
  en: "Every person's illness and recovery are different. These stories are for education and hope — they do not promise any particular result, and they are not a substitute for a personal consultation.",
  hi: "हर व्यक्ति की बीमारी और रिकवरी अलग होती है। ये कहानियाँ जानकारी और उम्मीद के लिए हैं — ये किसी ख़ास नतीजे का वादा नहीं करतीं, और व्यक्तिगत परामर्श की जगह नहीं लेतीं।",
};

export const FICTIONAL_LABEL: L10n = {
  en: "Fictional educational example — not a real patient",
  hi: "काल्पनिक शैक्षिक उदाहरण — असली मरीज़ नहीं",
};

export const REAL_LABEL: L10n = {
  en: "Shared with written consent; details changed to protect privacy",
  hi: "लिखित सहमति से साझा; निजता के लिए विवरण बदले गए",
};
