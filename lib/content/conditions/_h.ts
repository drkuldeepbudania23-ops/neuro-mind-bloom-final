import type { L10n } from "../../i18n";
import type { FaqItem } from "../types";

/** Short helpers for writing bilingual content: b("English", "हिंदी"). */
export const b = (en: string, hi: string): L10n => ({ en, hi });
export const faq = (qEn: string, qHi: string, aEn: string, aHi: string): FaqItem => ({ q: { en: qEn, hi: qHi }, a: { en: aEn, hi: aHi } });

/** Top up a page's FAQs (to `min`) from a list of relevant shared questions, skipping duplicates. */
export function topUpFaqs<T extends { faqs: FaqItem[] }>(pages: T[], shared: FaqItem[], min = 3): T[] {
  return pages.map((p) => {
    const faqs = [...p.faqs];
    for (const f of shared) {
      if (faqs.length >= min) break;
      if (!faqs.some((x) => x.q.en === f.q.en)) faqs.push(f);
    }
    return { ...p, faqs };
  });
}
