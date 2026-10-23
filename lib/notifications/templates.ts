import { CLINIC, DOCTOR, WEBSITE } from "../site";

/**
 * Bilingual patient/doctor notification texts.
 *
 * WhatsApp: business-initiated WhatsApp messages MUST use templates approved in
 * Meta Business Manager. `whatsapp.template` is the template name and
 * `whatsapp.params` fill {{1}}, {{2}}… in order. The exact template bodies to
 * submit to Meta are in docs/NOTIFICATIONS.md (keep them in sync).
 *
 * Email: plain text + simple HTML, sent through Resend.
 * Pure module — no network — so it is unit-tested.
 */

export type Lang = "en" | "hi";

export type NotificationKind =
  | "booking_received"
  | "new_booking_alert"
  | "appointment_confirmed"
  | "appointment_rescheduled"
  | "payment_request"
  | "payment_received"
  | "prescription_ready"
  | "followup_reminder";

export type NotificationData = {
  patientName: string;
  service?: string;
  date?: string;
  time?: string;
  mode?: string;
  mobile?: string;
  concern?: string;
  amount?: number;
  link?: string;
  appointmentId?: string;
};

export type RenderedNotification = {
  whatsapp: { template: string; language: string; params: string[]; documentLink?: string; documentName?: string };
  email: { subject: string; text: string; html: string };
};

/** WhatsApp template names (must match the names approved in Meta). */
export const WHATSAPP_TEMPLATES: Record<NotificationKind, string> = {
  booking_received: "nmb_booking_received",
  new_booking_alert: "nmb_new_booking_alert",
  appointment_confirmed: "nmb_appointment_confirmed",
  appointment_rescheduled: "nmb_appointment_rescheduled",
  payment_request: "nmb_payment_request",
  payment_received: "nmb_payment_received",
  prescription_ready: "nmb_prescription_ready",
  followup_reminder: "nmb_followup_reminder",
};

const SIGN_OFF = {
  en: `${DOCTOR.name.en}\n${CLINIC.name} · ${WEBSITE.display}\nWhatsApp ${CLINIC.whatsappDisplay} · Call ${CLINIC.phoneDisplay}`,
  hi: `${DOCTOR.name.hi}\n${CLINIC.name} · ${WEBSITE.display}\nWhatsApp ${CLINIC.whatsappDisplay} · कॉल ${CLINIC.phoneDisplay}`,
};

/** Keep WhatsApp template parameters within Meta's rules (no newlines / tabs, no 4+ spaces, ≤ 1024 chars). */
export function waParam(value: string | number | undefined, fallback = "-"): string {
  const s = String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/ {4,}/g, "   ")
    .trim();
  return (s || fallback).slice(0, 1000);
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

function when(d: NotificationData, lang: Lang): string {
  const parts = [d.date, d.time].filter(Boolean).join(", ");
  if (parts) return parts;
  return lang === "hi" ? "समय की पुष्टि जल्द की जाएगी" : "time to be confirmed";
}

function inr(amount: number | undefined): string {
  return amount === undefined ? "-" : `Rs. ${Math.round(amount)}`;
}

function toHtml(text: string, link?: string): string {
  const body = escapeHtml(text).replace(/\n/g, "<br>");
  const button = link
    ? `<p style="margin:20px 0"><a href="${escapeHtml(link)}" style="background:#0f5c4d;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">${escapeHtml(link.includes("/api/rx/") ? "Download prescription (PDF)" : "Open link")}</a></p>`
    : "";
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#14232b;max-width:560px">${body}${button}<p style="font-size:12px;color:#6b7780;margin-top:24px">In an emergency call 112. Tele-MANAS (free, 24x7): 14416.</p></div>`;
}

export function renderNotification(kind: NotificationKind, data: NotificationData, lang: Lang = "en"): RenderedNotification {
  const name = waParam(data.patientName, lang === "hi" ? "मरीज़" : "Patient");
  const service = waParam(data.service, lang === "hi" ? "परामर्श" : "Consultation");
  const at = waParam(when(data, lang));
  const link = data.link || "";
  let subject = "";
  let text = "";
  let params: string[] = [];
  let documentLink: string | undefined;

  switch (kind) {
    case "booking_received":
      params = [name, service, at];
      subject = lang === "hi" ? "आपका अपॉइंटमेंट अनुरोध मिल गया है" : "We received your appointment request";
      text =
        lang === "hi"
          ? `नमस्ते ${name},\n\n${service} के लिए आपका अनुरोध (${at}) हमें मिल गया है। डॉक्टर की पुष्टि के बाद आपको समय और भुगतान की जानकारी भेजी जाएगी।\n\nआपकी जानकारी पूरी तरह गोपनीय रहती है।`
          : `Hello ${name},\n\nWe have received your request for ${service} (${at}). You will get the confirmed time and payment details once the doctor confirms.\n\nYour information is kept strictly confidential.`;
      break;

    case "new_booking_alert":
      params = [name, waParam(data.mobile), service, at, waParam(data.concern)];
      subject = `New booking: ${name} — ${service}`;
      text = `New appointment request\n\nPatient: ${name}\nMobile: ${waParam(data.mobile)}\nService: ${service}\nPreferred: ${at}\nMode: ${waParam(data.mode)}\nConcern: ${waParam(data.concern)}\n\nOpen the doctor dashboard to confirm.`;
      break;

    case "appointment_confirmed":
      params = [name, service, at, waParam(data.mode, lang === "hi" ? "ऑनलाइन/क्लिनिक" : "Online/Clinic")];
      subject = lang === "hi" ? "आपका अपॉइंटमेंट कन्फ़र्म हो गया है" : "Your appointment is confirmed";
      text =
        lang === "hi"
          ? `नमस्ते ${name},\n\n${service} के लिए आपका अपॉइंटमेंट कन्फ़र्म है।\nसमय: ${at}\nमोड: ${params[3]}\n\nवीडियो परामर्श हो तो लिंक समय से पहले WhatsApp पर भेजा जाएगा।`
          : `Hello ${name},\n\nYour appointment for ${service} is confirmed.\nTime: ${at}\nMode: ${params[3]}\n\nFor video consultations the joining link will be sent on WhatsApp before the time.`;
      break;

    case "appointment_rescheduled":
      params = [name, service, at];
      subject = lang === "hi" ? "आपके अपॉइंटमेंट का समय बदला गया है" : "Your appointment time has changed";
      text =
        lang === "hi"
          ? `नमस्ते ${name},\n\n${service} के लिए आपका अपॉइंटमेंट अब ${at} पर है। यह समय सुविधाजनक न हो तो WhatsApp पर बताएँ।`
          : `Hello ${name},\n\nYour appointment for ${service} has been moved to ${at}. If this time does not suit you, please tell us on WhatsApp.`;
      break;

    case "payment_request":
      params = [name, service, inr(data.amount), waParam(link)];
      subject = lang === "hi" ? `भुगतान: ${inr(data.amount)} — ${service}` : `Payment: ${inr(data.amount)} — ${service}`;
      text =
        lang === "hi"
          ? `नमस्ते ${name},\n\n${service} की फ़ीस ${inr(data.amount)} है। नीचे दिए लिंक पर UPI QR स्कैन करके या ऑनलाइन भुगतान करें:\n${link}\n\nभुगतान के बाद स्क्रीनशॉट WhatsApp पर भेज दें।`
          : `Hello ${name},\n\nThe fee for ${service} is ${inr(data.amount)}. Scan the UPI QR or pay online using this link:\n${link}\n\nAfter paying, please send the screenshot on WhatsApp.`;
      break;

    case "payment_received":
      params = [name, inr(data.amount), service];
      subject = lang === "hi" ? "भुगतान प्राप्त हुआ — धन्यवाद" : "Payment received — thank you";
      text =
        lang === "hi"
          ? `नमस्ते ${name},\n\n${service} के लिए ${inr(data.amount)} का भुगतान मिल गया है। धन्यवाद।`
          : `Hello ${name},\n\nWe have received ${inr(data.amount)} for ${service}. Thank you.`;
      break;

    case "prescription_ready":
      params = [name, waParam(link)];
      documentLink = link || undefined;
      subject = lang === "hi" ? "आपका ई-प्रिस्क्रिप्शन" : "Your e-prescription";
      text =
        lang === "hi"
          ? `नमस्ते ${name},\n\nआपका ई-प्रिस्क्रिप्शन तैयार है। सुरक्षित लिंक (30 दिन तक मान्य):\n${link}\n\nदवाइयाँ डॉक्टर की सलाह अनुसार ही लें, अपने आप बंद या कम न करें।`
          : `Hello ${name},\n\nYour e-prescription is ready. Secure link (valid for 30 days):\n${link}\n\nTake medicines exactly as advised; do not stop or change them on your own.`;
      break;

    case "followup_reminder":
      params = [name, waParam(data.date)];
      subject = lang === "hi" ? "फ़ॉलो-अप याद दिलाना" : "Follow-up reminder";
      text =
        lang === "hi"
          ? `नमस्ते ${name},\n\nयाद दिला दें कि आपका फ़ॉलो-अप ${waParam(data.date)} को है। समय तय करने के लिए WhatsApp करें या वेबसाइट से बुक करें: ${WEBSITE.url}/hi/book-appointment`
          : `Hello ${name},\n\nA reminder that your follow-up is due on ${waParam(data.date)}. WhatsApp us or book on the website: ${WEBSITE.url}/book-appointment`;
      break;
  }

  const signOff = kind === "new_booking_alert" ? "" : `\n\n${SIGN_OFF[lang]}`;
  const fullText = text + signOff;
  return {
    whatsapp: {
      template: WHATSAPP_TEMPLATES[kind],
      language: kind === "new_booking_alert" ? "en" : lang === "hi" ? "hi" : "en",
      params,
      documentLink,
      documentName: documentLink ? "Prescription.pdf" : undefined,
    },
    email: { subject: `${subject} | ${CLINIC.name}`, text: fullText, html: toHtml(fullText, link || undefined) },
  };
}

/** Normalise an Indian mobile number to WhatsApp's international format (91XXXXXXXXXX), or null. */
export function toWhatsAppNumber(mobile: string | undefined): string | null {
  const digits = String(mobile || "").replace(/\D/g, "");
  if (/^[6-9]\d{9}$/.test(digits)) return `91${digits}`;
  if (/^0[6-9]\d{9}$/.test(digits)) return `91${digits.slice(1)}`;
  if (/^91[6-9]\d{9}$/.test(digits)) return digits;
  return null;
}

export function isEmail(value: string | undefined): boolean {
  return /^[^\s@<>]{1,64}@[^\s@<>]{1,190}\.[a-zA-Z]{2,}$/.test(String(value || "").trim());
}

/** YYYY-MM-DD in India Standard Time, optionally shifted by whole days. */
export function istDate(now: Date = new Date(), addDays = 0): string {
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000 + addDays * 24 * 60 * 60 * 1000);
  return ist.toISOString().slice(0, 10);
}

/** "2026-10-12" → "12 Oct 2026" */
export function prettyDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${Number(m[3])} ${months[Number(m[2]) - 1]} ${m[1]}`;
}
