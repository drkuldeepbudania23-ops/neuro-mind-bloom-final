/**
 * Number typed or pasted by the doctor → the digits wa.me needs (country code
 * + number), or "" if it cannot be sent to safely. Pure, unit-tested.
 *
 * "+" or "00" means the number already has its country code. Without one, a
 * 10-digit mobile is Indian, and 11–15 digits must already include a code.
 * Never trim a number to its last 10 digits: for a foreign number that
 * produces a different +91 number, which may be a stranger's.
 */
export function toWaNumber(value: unknown): string {
  const cleaned = String(value ?? "").replace(/[^\d+]/g, "");
  const digits = cleaned.replace(/\D/g, "");
  const international = cleaned.startsWith("+") || digits.startsWith("00");
  const full = international ? digits.replace(/^0+/, "") : digits;

  const india = full.match(/^910?([6-9]\d{9})$/);
  if (india) return `91${india[1]}`;
  if (full.startsWith("91") && (international || full.length > 10)) return "";

  if (international) return /^[1-9]\d{7,14}$/.test(full) ? full : "";
  if (/^0?[6-9]\d{9}$/.test(full)) return `91${full.slice(-10)}`;
  return /^[1-9]\d{10,14}$/.test(full) ? full : "";
}
