/**
 * Appointment list helpers for the doctor dashboard (pure, unit-tested):
 * date-range / status / text filters, grouping by day, payment badge.
 */

export type ApptLike = {
  id: string;
  name?: string;
  patientName?: string;
  mobile?: string;
  date?: string;
  preferredDate?: string;
  time?: string;
  preferredTime?: string;
  status?: string;
  paymentStatus?: string;
  concern?: string;
  service?: string;
};

export type Range = "today" | "tomorrow" | "week" | "upcoming" | "all" | "date";
export type StatusFilter = "all" | "pending" | "confirmed" | "completed" | "cancelled";

export function apptDate(a: ApptLike): string {
  const d = String(a.date || a.preferredDate || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : "";
}

export function statusOf(a: ApptLike): Exclude<StatusFilter, "all"> {
  const s = String(a.status || "pending").toLowerCase();
  if (s === "confirmed") return "confirmed";
  if (s === "completed" || s === "done") return "completed";
  if (s === "cancelled" || s === "canceled" || s === "rejected") return "cancelled";
  return "pending";
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Minutes from "10:30", "4:05 pm", "Morning"… for sorting within a day. */
export function timeKey(t: string | undefined): number {
  const m = /^(\d{1,2}):(\d{2})\s*(am|pm)?/i.exec(String(t || "").trim());
  if (!m) {
    const word = String(t || "").toLowerCase();
    if (word.includes("morning")) return 9 * 60;
    if (word.includes("afternoon")) return 14 * 60;
    if (word.includes("evening")) return 18 * 60;
    return 24 * 60;
  }
  let h = Number(m[1]);
  const ap = m[3]?.toLowerCase();
  if (ap === "pm" && h < 12) h += 12;
  if (ap === "am" && h === 12) h = 0;
  return h * 60 + Number(m[2]);
}

export function filterAppointments<T extends ApptLike>(
  list: T[],
  opts: { range: Range; date?: string; status: StatusFilter; query: string; today: string }
): T[] {
  const q = opts.query.trim().toLowerCase();
  const digits = q.replace(/\D/g, "");
  return list.filter((a) => {
    const d = apptDate(a);
    switch (opts.range) {
      case "today":
        if (d !== opts.today) return false;
        break;
      case "tomorrow":
        if (d !== addDays(opts.today, 1)) return false;
        break;
      case "week":
        if (!d || d < opts.today || d > addDays(opts.today, 6)) return false;
        break;
      case "upcoming":
        if (!d || d < opts.today) return false;
        break;
      case "date":
        if (d !== opts.date) return false;
        break;
    }
    if (opts.status !== "all" && statusOf(a) !== opts.status) return false;
    if (q) {
      const hay = [a.name, a.patientName, a.concern, a.service, a.id].join(" ").toLowerCase();
      const phone = String(a.mobile || "").replace(/\D/g, "");
      if (!hay.includes(q) && !(digits.length >= 4 && phone.includes(digits))) return false;
    }
    return true;
  });
}

/** Group by day (no date last), each day sorted by time. */
export function groupByDay<T extends ApptLike>(list: T[], descending = false): { date: string; items: T[] }[] {
  const map = new Map<string, T[]>();
  for (const a of list) {
    const d = apptDate(a);
    map.set(d, [...(map.get(d) || []), a]);
  }
  const days = [...map.keys()].sort((x, y) => {
    if (!x) return 1;
    if (!y) return -1;
    return descending ? y.localeCompare(x) : x.localeCompare(y);
  });
  return days.map((date) => ({
    date,
    items: (map.get(date) || []).sort((a, b) => timeKey(a.time || a.preferredTime) - timeKey(b.time || b.preferredTime)),
  }));
}

export function paymentBadge(status: string | undefined): { label: string; color: string; bg: string } {
  switch (status) {
    case "Paid":
      return { label: "Paid", color: "#065f46", bg: "#d1fae5" };
    case "Discount":
      return { label: "Paid (discount)", color: "#065f46", bg: "#d1fae5" };
    case "Exempt":
      return { label: "Exempted", color: "#3730a3", bg: "#e0e7ff" };
    default:
      return { label: "Unpaid", color: "#9a3412", bg: "#ffedd5" };
  }
}

export function dayLabel(iso: string, today: string): string {
  if (!iso) return "No date given";
  const d = new Date(`${iso}T00:00:00Z`);
  const pretty = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  if (iso === today) return `Today · ${pretty}`;
  if (iso === addDays(today, 1)) return `Tomorrow · ${pretty}`;
  if (iso === addDays(today, -1)) return `Yesterday · ${pretty}`;
  return pretty;
}
