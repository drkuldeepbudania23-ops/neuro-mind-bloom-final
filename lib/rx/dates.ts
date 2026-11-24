/** "2026-11-20" → "20/11/2026" (consultation date as printed). */
export function consultationDateText(date: string | undefined): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date || "");
  return m ? `${m[3]}/${m[2]}/${m[1]}` : "";
}

/** Today's date in India time as YYYY-MM-DD. */
export function istToday(now: Date = new Date()): string {
  return new Date(now.getTime() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
}

/** YYYY-MM-DD, `days` days before today (India time). */
export function istDaysAgo(days: number, now: Date = new Date()): string {
  return istToday(new Date(now.getTime() - days * 86400 * 1000));
}
