/**
 * Festival greeting banner — greeting only.
 *
 * NMC advertising guidelines (6 Oct 2026) restrict discounts, limited-period
 * offers, coupons and similar inducements by doctors. This banner must stay a
 * plain greeting: never add a discount, offer or "limited time" wording here.
 */
import type { L10n } from "./i18n";

export type FestivalGreeting = {
  id: string;
  /** Inclusive start date, IST (YYYY-MM-DD). */
  start: string;
  /** Inclusive end date, IST (YYYY-MM-DD). */
  end: string;
  title: L10n;
  message: L10n;
};

/** Diwali 2026: Lakshmi Puja is Sun 8 Nov; shown from 4 Nov to 11 Nov (8 days). */
export const DIWALI_2026: FestivalGreeting = {
  id: "diwali-2026",
  start: "2026-11-04",
  end: "2026-11-11",
  title: { en: "Happy Diwali!", hi: "शुभ दीपावली!" },
  message: {
    en: "Warm wishes to you and your family from Neuro Mind Bloom. May this festival of lights bring peace of mind and good health.",
    hi: "Neuro Mind Bloom की ओर से आपको और आपके परिवार को दीपावली की हार्दिक शुभकामनाएँ। यह रोशनी का त्योहार मन की शांति और अच्छी सेहत लेकर आए।",
  },
};

export const ACTIVE_GREETINGS: FestivalGreeting[] = [DIWALI_2026];

/** Today's date in India (YYYY-MM-DD), independent of the viewer's timezone. */
export function istDate(now: Date = new Date()): string {
  return new Date(now.getTime() + 330 * 60_000).toISOString().slice(0, 10);
}

/** The greeting to show on this date, if any. */
export function currentGreeting(
  now: Date = new Date(),
  greetings: FestivalGreeting[] = ACTIVE_GREETINGS,
): FestivalGreeting | null {
  const today = istDate(now);
  return greetings.find((g) => today >= g.start && today <= g.end) ?? null;
}
