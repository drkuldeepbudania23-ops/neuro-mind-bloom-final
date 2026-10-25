import type { L10n } from "./i18n";
import { WEBSITE } from "./site";

/**
 * Patient feedback (Master Prompt Part 12).
 *
 * - Anyone can submit; every submission starts as "pending" and is never public on its own.
 * - The doctor approves, edits (e.g. removes identifying details), rejects or deletes.
 * - Public display of approved feedback is OFF by default. Switch PUBLIC_REVIEWS_ENABLED to true
 *   only after legal/ethical review (Telemedicine Practice Guidelines and NMC rules on
 *   advertising and testimonials). Even then only approved entries whose author agreed to
 *   public display are shown.
 * - Nothing here is imported from clinical records, and no review is ever written by the clinic.
 */
export const PUBLIC_REVIEWS_ENABLED = false;

export type FeedbackStatus = "pending" | "approved" | "rejected";

export type FeedbackInput = {
  rating: number;
  name: string;
  comment: string;
  /** Agreed that the clinic may store this feedback (required). */
  consentStore: boolean;
  /** Agreed that the feedback may be shown publicly, without contact details (optional). */
  consentDisplay: boolean;
  /** Date of the consultation/experience being reviewed (yyyy-mm-dd), optional. */
  visitDate: string;
  language: "en" | "hi";
};

export type FeedbackDoc = FeedbackInput & {
  id?: string;
  status: FeedbackStatus;
  /** Exact consent wording the person agreed to — kept as the consent record. */
  consentText: string;
  consentVersion: string;
  /** Submission date (yyyy-mm-dd) shown with the review. */
  reviewDate: string;
  createdAt?: unknown;
  moderatedAt?: string;
  moderatorNote?: string;
};

export const FEEDBACK_LIMITS = { name: 60, comment: 1000, minComment: 10 } as const;
export const CONSENT_VERSION = "2026-10";

export const CONSENT_TEXT = {
  store: {
    en: "I agree that Neuro Mind Bloom may store this feedback to improve its service. I have not included medical details I want to keep private.",
    hi: "मैं सहमत हूँ कि न्यूरो माइंड ब्लूम सेवा सुधारने के लिए यह फ़ीडबैक सुरक्षित रख सकता है। मैंने ऐसी मेडिकल जानकारी नहीं लिखी है जिसे निजी रखना चाहता/चाहती हूँ।",
  },
  display: {
    en: "Optional: the doctor may show this feedback publicly with the display name above (or as \"Anonymous\"). No phone number or e-mail is ever shown.",
    hi: "वैकल्पिक: डॉक्टर यह फ़ीडबैक ऊपर दिए नाम (या \"गुमनाम\") के साथ सार्वजनिक रूप से दिखा सकते हैं। फ़ोन नंबर या ई-मेल कभी नहीं दिखाया जाता।",
  },
} satisfies Record<string, L10n>;

const PHONE_RE = /(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}/;
const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export type FeedbackError = "rating" | "comment" | "commentShort" | "name" | "contact" | "consent" | "date";

export const FEEDBACK_ERRORS: Record<FeedbackError, L10n> = {
  rating: { en: "Please choose a rating from 1 to 5 stars.", hi: "कृपया 1 से 5 स्टार की रेटिंग चुनें।" },
  comment: { en: `Please keep your feedback under ${FEEDBACK_LIMITS.comment} characters.`, hi: `कृपया फ़ीडबैक ${FEEDBACK_LIMITS.comment} अक्षरों से कम रखें।` },
  commentShort: { en: "Please write a few words about your experience.", hi: "कृपया अपने अनुभव के बारे में कुछ शब्द लिखें।" },
  name: { en: `Display name can be up to ${FEEDBACK_LIMITS.name} characters.`, hi: `नाम ${FEEDBACK_LIMITS.name} अक्षरों तक हो सकता है।` },
  contact: { en: "Please remove phone numbers or e-mail addresses — they cannot be stored with feedback.", hi: "कृपया फ़ोन नंबर या ई-मेल हटा दें — इन्हें फ़ीडबैक के साथ नहीं रखा जा सकता।" },
  consent: { en: "Please tick the consent box to submit.", hi: "भेजने के लिए कृपया सहमति बॉक्स पर टिक करें।" },
  date: { en: "Visit date cannot be in the future.", hi: "परामर्श की तारीख़ भविष्य की नहीं हो सकती।" },
};

/** Validates and normalises a public submission. Mirrors the Firestore rules. */
export function validateFeedback(input: FeedbackInput, today: string): { ok: true; doc: Omit<FeedbackDoc, "createdAt"> } | { ok: false; errors: FeedbackError[] } {
  const errors: FeedbackError[] = [];
  const name = input.name.trim().replace(/\s+/g, " ");
  const comment = input.comment.trim();
  if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5) errors.push("rating");
  if (comment.length < FEEDBACK_LIMITS.minComment) errors.push("commentShort");
  if (comment.length > FEEDBACK_LIMITS.comment) errors.push("comment");
  if (name.length > FEEDBACK_LIMITS.name) errors.push("name");
  if (PHONE_RE.test(comment) || EMAIL_RE.test(comment) || PHONE_RE.test(name) || EMAIL_RE.test(name)) errors.push("contact");
  if (!input.consentStore) errors.push("consent");
  if (input.visitDate && (!DATE_RE.test(input.visitDate) || input.visitDate > today)) errors.push("date");
  if (errors.length) return { ok: false, errors };
  const lang = input.language === "hi" ? "hi" : "en";
  const consentText = CONSENT_TEXT.store[lang] + (input.consentDisplay ? ` | ${CONSENT_TEXT.display[lang]}` : "");
  return {
    ok: true,
    doc: {
      rating: input.rating,
      name,
      comment,
      consentStore: true,
      consentDisplay: input.consentDisplay,
      visitDate: input.visitDate,
      language: lang,
      status: "pending",
      consentText,
      consentVersion: CONSENT_VERSION,
      reviewDate: today,
    },
  };
}

/** What may appear on the public site — only when the flag is on, approved, and display was consented. */
export function publicFeedback(items: FeedbackDoc[], enabled = PUBLIC_REVIEWS_ENABLED): FeedbackDoc[] {
  if (!enabled) return [];
  return items.filter((f) => f.status === "approved" && f.consentDisplay);
}

export function displayName(f: Pick<FeedbackDoc, "name">, lang: "en" | "hi"): string {
  return f.name.trim() || (lang === "hi" ? "गुमनाम" : "Anonymous");
}

/** Public link to the feedback form, sent to patients after a consultation. */
export function feedbackPageUrl(lang: "en" | "hi" = "hi"): string {
  return `${WEBSITE.url}${lang === "hi" ? "/hi" : ""}/feedback`;
}

/** WhatsApp / e-mail text asking a patient for feedback. Contains no clinical details. */
export function feedbackRequestMessage(name: string | undefined, lang: "en" | "hi" = "hi"): { subject: string; text: string } {
  const who = (name || "").trim();
  const link = feedbackPageUrl(lang);
  if (lang === "hi") {
    return {
      subject: "Neuro Mind Bloom – आपका फ़ीडबैक",
      text: `नमस्ते${who ? ` ${who}` : ""},\nNeuro Mind Bloom पर परामर्श के लिए धन्यवाद।\n\nआपका अनुभव कैसा रहा? कृपया 1 मिनट निकालकर इस लिंक पर अपना फ़ीडबैक दें:\n${link}\n\nआपका फ़ीडबैक केवल डॉक्टर पढ़ते हैं और आपकी अनुमति के बिना कहीं प्रकाशित नहीं होता।\n— डॉ. कुलदीप बुडानिया`,
    };
  }
  return {
    subject: "Neuro Mind Bloom – Your feedback",
    text: `Hello${who ? ` ${who}` : ""},\nThank you for consulting at Neuro Mind Bloom.\n\nHow was your experience? Please take 1 minute to share your feedback here:\n${link}\n\nYour feedback is read only by the doctor and is never published without your consent.\n— Dr. Kuldeep Budania`,
  };
}
