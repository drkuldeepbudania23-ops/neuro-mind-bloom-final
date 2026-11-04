/**
 * Fee-help note on the booking page, shown for a fixed window chosen by the
 * doctor. A patient who has trouble with the fee can message on WhatsApp
 * before booking; any concession is decided privately, case by case.
 *
 * NMC advertising guidelines (6 Oct 2026) restrict discounts, limited-period
 * offers and coupons. Keep this text neutral: no festival name, no rate, no
 * "discount"/"offer" wording and no deadline.
 */
import type { L10n } from "./i18n";
import { istDate } from "./festival";

export const FEE_HELP = {
  /** Inclusive start date, IST (YYYY-MM-DD). */
  start: "2026-11-04",
  /** Inclusive end date, IST (YYYY-MM-DD). */
  end: "2026-11-11",
  text: {
    en: "Facing difficulty with the fee?",
    hi: "फ़ीस को लेकर कोई दिक्कत हो?",
  } as L10n,
  cta: {
    en: "Message us on WhatsApp before booking",
    hi: "बुकिंग से पहले WhatsApp करें",
  } as L10n,
  whatsappMessage: {
    en: "Hello Doctor, I would like to talk about the consultation fee before booking.",
    hi: "नमस्ते डॉक्टर, मैं बुकिंग से पहले फ़ीस के बारे में बात करना चाहता/चाहती हूँ।",
  } as L10n,
};

/** True only on dates inside the window, in India time. */
export function feeHelpVisible(now: Date = new Date()): boolean {
  const today = istDate(now);
  return today >= FEE_HELP.start && today <= FEE_HELP.end;
}
