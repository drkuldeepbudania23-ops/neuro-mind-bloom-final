import type { Lang } from "./i18n";
import { getService, type ServiceCode } from "./site";
import { toWaNumber } from "./whatsapp";

/**
 * Validation for the public booking form. Mirrors `validPublicAppointment` in
 * firestore.rules so users see a clear message instead of a rules rejection.
 */

export type BookingInput = {
  name: string;
  mobile: string;
  email?: string;
  serviceCode: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:MM
  concern?: string;
  consent: boolean;
  lang: Lang;
};

export type BookingErrorKey =
  | "name"
  | "mobile"
  | "email"
  | "service"
  | "date"
  | "datePast"
  | "time"
  | "concern"
  | "consent";

export type AppointmentDoc = {
  patientName: string;
  name: string;
  mobile: string;
  email?: string;
  service: string;
  serviceCode: ServiceCode;
  preferredDate: string;
  date: string;
  preferredTime: string;
  time: string;
  concern: string;
  mode: "Online";
  status: "pending";
  source: "Website";
  language: Lang;
  consent: true;
};

export const BOOKING_ERRORS: Record<BookingErrorKey, { en: string; hi: string }> = {
  name: { en: "Please enter the patient's full name.", hi: "कृपया मरीज़ का पूरा नाम लिखें।" },
  mobile: {
    en: "Please enter a valid mobile number. Outside India, start with + and the country code, e.g. +971 50 123 4567.",
    hi: "कृपया सही मोबाइल नंबर लिखें। भारत के बाहर का नंबर + और कंट्री कोड से लिखें, जैसे +971 50 123 4567।",
  },
  email: { en: "Please enter a valid email address or leave it empty.", hi: "सही ईमेल लिखें या खाली छोड़ दें।" },
  service: { en: "Please choose a service.", hi: "कृपया सेवा चुनें।" },
  date: { en: "Please choose a preferred date.", hi: "कृपया पसंदीदा तारीख चुनें।" },
  datePast: { en: "The date cannot be in the past.", hi: "बीती हुई तारीख नहीं चुन सकते।" },
  time: { en: "Please choose a preferred time.", hi: "कृपया पसंदीदा समय चुनें।" },
  concern: { en: "Please keep the concern under 2000 characters.", hi: "परेशानी 2000 अक्षरों से कम में लिखें।" },
  consent: {
    en: "Please agree to the consent statement to continue.",
    hi: "आगे बढ़ने के लिए कृपया सहमति दें।",
  },
};

/** Normalise an Indian mobile number to digits (keeps a 91 prefix if 12 digits). */
export function normaliseMobile(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export function isValidIndianMobile(digits: string): boolean {
  return /^[6-9]\d{9}$/.test(digits) || /^91[6-9]\d{9}$/.test(digits);
}

/**
 * Mobile as stored on the appointment, or "" if unusable. firestore.rules allow
 * 10–13 digits and no "+", so a foreign number of 10 digits or fewer is kept
 * with a "00" prefix: otherwise +65 9123 4567 would be read back as an Indian mobile.
 */
export function bookingMobile(raw: string): string {
  const wa = toWaNumber(raw);
  if (!wa) return "";
  if (/^91[6-9]\d{9}$/.test(wa)) {
    const digits = normaliseMobile(raw);
    return isValidIndianMobile(digits) ? digits : wa;
  }
  if (wa.length > 13) return "";
  return wa.length <= 10 ? `00${wa}` : wa;
}

/** Today's date in India (yyyy-mm-dd), independent of the server's timezone. */
export function todayInIndia(now: Date = new Date()): string {
  const ist = new Date(now.getTime() + (5.5 * 60 + now.getTimezoneOffset()) * 60_000);
  const y = ist.getFullYear();
  const m = String(ist.getMonth() + 1).padStart(2, "0");
  const d = String(ist.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function validateBooking(
  input: BookingInput,
  now: Date = new Date()
): { ok: true; doc: AppointmentDoc } | { ok: false; errors: BookingErrorKey[] } {
  const errors: BookingErrorKey[] = [];
  const name = input.name.trim().replace(/\s+/g, " ");
  const mobile = bookingMobile(input.mobile);
  const email = (input.email || "").trim();
  const concern = (input.concern || "").trim();
  const service = getService(input.serviceCode);

  if (name.length < 2 || name.length > 80) errors.push("name");
  if (!mobile) errors.push("mobile");
  if (email && (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))) errors.push("email");
  if (!service) errors.push("service");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) errors.push("date");
  else if (input.date < todayInIndia(now)) errors.push("datePast");
  if (!/^\d{2}:\d{2}$/.test(input.time)) errors.push("time");
  if (concern.length > 2000) errors.push("concern");
  if (!input.consent) errors.push("consent");

  if (errors.length || !service) return { ok: false, errors };

  const doc: AppointmentDoc = {
    patientName: name,
    name,
    mobile,
    service: `${service.label.en} - ₹${service.fee}`,
    serviceCode: service.code,
    preferredDate: input.date,
    date: input.date,
    preferredTime: input.time,
    time: input.time,
    concern,
    mode: "Online",
    status: "pending",
    source: "Website",
    language: input.lang,
    consent: true,
  };
  if (email) doc.email = email;
  return { ok: true, doc };
}
