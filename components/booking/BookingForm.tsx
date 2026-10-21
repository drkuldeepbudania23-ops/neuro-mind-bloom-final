"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { PAYMENTS_ENABLED, startRazorpayPayment } from "../../lib/client/razorpayCheckout";
import { BOOKING_ERRORS, todayInIndia, validateBooking, type BookingErrorKey } from "../../lib/booking";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { CRISIS_HELPLINE, SERVICES, formatINR, getService, whatsappLink } from "../../lib/site";
import { complaintLabel } from "../../app/data/psychiatrySearch";
import { BOOKING_COMPLAINTS, POPULAR_COMPLAINTS, searchComplaints, type BookingComplaint } from "../../lib/complaints";


const T = {
  title: { en: "Book an appointment", hi: "अपॉइंटमेंट बुक करें" },
  intro: {
    en: "Fill in the details below. The clinic will confirm your slot on WhatsApp and send the video consultation link.",
    hi: "नीचे जानकारी भरें। क्लिनिक WhatsApp पर आपका समय पक्का करेगा और वीडियो परामर्श का लिंक भेजेगा।",
  },
  name: { en: "Patient's full name", hi: "मरीज़ का पूरा नाम" },
  mobile: { en: "Mobile number (WhatsApp)", hi: "मोबाइल नंबर (WhatsApp)" },
  email: { en: "Email (optional)", hi: "ईमेल (वैकल्पिक)" },
  service: { en: "Service", hi: "सेवा" },
  date: { en: "Preferred date", hi: "पसंदीदा तारीख" },
  time: { en: "Preferred time", hi: "पसंदीदा समय" },
  search: { en: "Search your problem (Hindi or English)", hi: "अपनी परेशानी खोजें (हिंदी या English)" },
  searchHint: {
    en: "Type in any language — e.g. sleep, neend, नींद, ghabrahat, sharab, dhat",
    hi: "किसी भी भाषा में लिखें — जैसे नींद, neend, sleep, घबराहट, शराब, धात",
  },
  popular: { en: "Common problems", hi: "आम परेशानियाँ" },
  selected: { en: "Selected", hi: "चुनी गई परेशानियाँ" },
  remove: { en: "Remove", hi: "हटाएँ" },
  noMatch: {
    en: "No match — just describe it in the box below in your own words.",
    hi: "कुछ नहीं मिला — नीचे वाले बॉक्स में अपने शब्दों में लिख दें।",
  },
  searchPh: { en: "e.g. sleep, anxiety, sadness / नींद, घबराहट", hi: "जैसे: नींद, घबराहट, उदासी / sleep, anxiety" },
  concern: { en: "Anything else? (optional)", hi: "और कुछ बताना है? (वैकल्पिक)" },
  concernPh: { en: "Select above or write in your own words", hi: "ऊपर से चुनें या अपने शब्दों में लिखें" },
  consent: {
    en: "I agree that Neuro Mind Bloom may store these details securely and contact me on WhatsApp/phone about this appointment.",
    hi: "मैं सहमत हूँ कि Neuro Mind Bloom ये जानकारी सुरक्षित रखे और इस अपॉइंटमेंट के लिए मुझसे WhatsApp/फ़ोन पर संपर्क करे।",
  },
  submit: { en: "Request appointment", hi: "अपॉइंटमेंट का अनुरोध भेजें" },
  saving: { en: "Saving…", hi: "सेव हो रहा है…" },
  saved: { en: "Appointment request received", hi: "अपॉइंटमेंट अनुरोध मिल गया" },
  savedText: {
    en: "Your reference number is below. The clinic will confirm the time on WhatsApp.",
    hi: "आपका रेफ़रेंस नंबर नीचे है। क्लिनिक WhatsApp पर समय पक्का करेगा।",
  },
  ref: { en: "Reference", hi: "रेफ़रेंस" },
  payNow: { en: "Pay now", hi: "अभी भुगतान करें" },
  paying: { en: "Opening payment…", hi: "भुगतान खुल रहा है…" },
  paid: { en: "Payment successful. Thank you!", hi: "भुगतान सफल रहा। धन्यवाद!" },
  payLater: {
    en: "You can also pay later — the clinic will share payment details on WhatsApp.",
    hi: "आप बाद में भी भुगतान कर सकते हैं — क्लिनिक WhatsApp पर जानकारी देगा।",
  },
  payFailed: {
    en: "Payment could not be completed. No money was taken if you saw an error — you can try again or pay later.",
    hi: "भुगतान पूरा नहीं हुआ। त्रुटि दिखी हो तो पैसा नहीं कटा — दोबारा कोशिश करें या बाद में भुगतान करें।",
  },
  whatsapp: { en: "Continue on WhatsApp", hi: "WhatsApp पर आगे बढ़ें" },
  saveError: {
    en: "Could not save your request. Please check your internet or book on WhatsApp.",
    hi: "अनुरोध सेव नहीं हो सका। इंटरनेट जाँचें या WhatsApp से बुक करें।",
  },
  emergency: {
    en: `Emergency or thoughts of self-harm? Do not wait — call ${CRISIS_HELPLINE.name} ${CRISIS_HELPLINE.number} or 112.`,
    hi: `इमरजेंसी या ख़ुद को नुकसान पहुँचाने के विचार? इंतज़ार न करें — ${CRISIS_HELPLINE.name} ${CRISIS_HELPLINE.number} या 112 पर कॉल करें।`,
  },
  back: { en: "← Back to home", hi: "← होम पेज पर वापस" },
};

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-forest-200 bg-white px-3.5 py-3 text-base text-forest-900 outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-200";
const labelClass = "block font-semibold text-forest-900";

export default function BookingForm({ lang }: { lang: Lang }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const params = useSearchParams();
  const initialService = getService(params.get("service") || "")?.code ?? SERVICES[0].code;

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    serviceCode: initialService as string,
    date: "",
    time: "",
    concern: "",
    consent: false,
  });
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState<BookingErrorKey[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");
  const [payState, setPayState] = useState<"idle" | "opening" | "paid" | "failed">("idle");

  const selected = getService(form.serviceCode) ?? SERVICES[0];
  const minDate = useMemo(() => todayInIndia(), []);

  const [picked, setPicked] = useState<string[]>([]);
  const results = useMemo(() => searchComplaints(search), [search]);
  const popular = useMemo(
    () => POPULAR_COMPLAINTS.map((en) => BOOKING_COMPLAINTS.find((c) => c.en === en)).filter(Boolean) as BookingComplaint[],
    []
  );

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function togglePick(item: BookingComplaint) {
    const label = complaintLabel(item);
    setPicked((list) => (list.includes(label) ? list.filter((l) => l !== label) : [...list, label]));
    setSearch("");
  }

  /** Concern saved for the doctor: picked complaints ("हिंदी / English") + free text. */
  function fullConcern() {
    return [...picked, form.concern.trim()].filter(Boolean).join("; ");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveError(false);
    const result = validateBooking({ ...form, concern: fullConcern(), lang });
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors([]);
    setSaving(true);
    try {
      const ref = await addDoc(collection(db, "appointments"), { ...result.doc, createdAt: serverTimestamp() });
      setAppointmentId(ref.id);
      // Acknowledgement to the patient + alert to the doctor (WhatsApp/email, if configured).
      fetch("/api/notify/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: ref.id }),
        keepalive: true,
      }).catch(() => {});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  }

  async function payNow() {
    setPayState("opening");
    try {
      const result = await startRazorpayPayment(appointmentId, selected.label.en);
      setPayState(result === "dismissed" ? "idle" : result);
    } catch (error) {
      console.error(error);
      setPayState("failed");
    }
  }

  const err = (key: BookingErrorKey) =>
    errors.includes(key) ? <p className="mt-1 text-sm font-medium text-[#b23a1f]">{t(BOOKING_ERRORS[key])}</p> : null;

  const whatsappMessage =
    lang === "hi"
      ? `नमस्ते डॉक्टर, मैंने वेबसाइट पर अपॉइंटमेंट का अनुरोध भेजा है।\nनाम: ${form.name}\nसेवा: ${selected.label.hi}\nरेफ़रेंस: ${appointmentId}`
      : `Hello Doctor, I have requested an appointment on the website.\nName: ${form.name}\nService: ${selected.label.en}\nReference: ${appointmentId}`;

  return (
    <div className="nmb min-h-screen bg-cream" lang={lang === "hi" ? "hi" : "en"}>
      <div className="bg-forest-900 pb-24 pt-10 text-white">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Link href={localePath("/", lang)} className="text-sm text-forest-200 hover:text-white">
            {t(T.back)}
          </Link>
          <h1 className="mt-4 text-3xl font-semibold md:text-5xl">{t(T.title)}</h1>
          <p className="mt-3 max-w-2xl text-lg text-forest-100">{t(T.intro)}</p>
        </div>
      </div>

      <div className="mx-auto -mt-16 max-w-3xl px-4 pb-20 md:px-6">
        {appointmentId ? (
          <section className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(6,43,49,0.12)] md:p-8" aria-live="polite">
            <h2 className="text-2xl font-semibold text-forest-900">{t(T.saved)}</h2>
            <p className="mt-2 text-forest-700">{t(T.savedText)}</p>
            <p className="mt-4 rounded-xl bg-forest-50 px-4 py-3 font-mono text-sm text-forest-800">
              {t(T.ref)}: {appointmentId}
            </p>

            {PAYMENTS_ENABLED && payState !== "paid" && (
              <div className="mt-6 rounded-2xl ring-1 ring-forest-100 p-5">
                <p className="font-semibold text-forest-900">
                  {t(selected.label)} — {formatINR(selected.fee)}
                </p>
                <button
                  type="button"
                  onClick={payNow}
                  disabled={payState === "opening"}
                  className="mt-3 w-full rounded-full bg-saffron-500 px-6 py-3.5 font-semibold text-forest-900 transition hover:bg-saffron-400 disabled:opacity-60"
                >
                  {payState === "opening" ? t(T.paying) : `${t(T.payNow)} ${formatINR(selected.fee)}`}
                </button>
                {payState === "failed" && <p className="mt-2 text-sm text-[#b23a1f]">{t(T.payFailed)}</p>}
                <p className="mt-2 text-sm text-forest-700/80">{t(T.payLater)}</p>
              </div>
            )}
            {payState === "paid" && (
              <p className="mt-6 rounded-xl bg-[#e3f6ea] px-4 py-3 font-semibold text-[#14713a]">{t(T.paid)}</p>
            )}

            <a
              href={whatsappLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-whatsapp px-6 py-3.5 font-semibold text-white"
            >
              {t(T.whatsapp)}
            </a>
          </section>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(6,43,49,0.12)] md:p-8">
            <fieldset className="grid gap-3">
              <legend className={labelClass}>{t(T.service)}</legend>
              {SERVICES.map((service) => (
                <label
                  key={service.code}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl px-4 py-3.5 ring-1 transition ${
                    form.serviceCode === service.code ? "bg-forest-50 ring-2 ring-forest-500" : "ring-forest-200 hover:ring-forest-500"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="service"
                      value={service.code}
                      checked={form.serviceCode === service.code}
                      onChange={() => update("serviceCode", service.code)}
                      className="h-4 w-4 accent-[#0b746f]"
                    />
                    <span>
                      <span className="block font-semibold text-forest-900">{t(service.label)}</span>
                      <span className="block text-sm text-forest-700/80">{t(service.short)}</span>
                    </span>
                  </span>
                  <span className="font-semibold text-forest-800">{formatINR(service.fee)}</span>
                </label>
              ))}
              {err("service")}
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                {t(T.name)}
                <input className={fieldClass} value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" maxLength={80} required />
                {err("name")}
              </label>
              <label className={labelClass}>
                {t(T.mobile)}
                <input
                  className={fieldClass}
                  value={form.mobile}
                  onChange={(e) => update("mobile", e.target.value)}
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={15}
                  placeholder="98XXXXXXXX"
                  required
                />
                {err("mobile")}
              </label>
            </div>

            <label className={labelClass}>
              {t(T.email)}
              <input className={fieldClass} type="email" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" maxLength={120} />
              {err("email")}
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                {t(T.date)}
                <input className={fieldClass} type="date" min={minDate} value={form.date} onChange={(e) => update("date", e.target.value)} required />
                {err("date")}
                {err("datePast")}
              </label>
              <label className={labelClass}>
                {t(T.time)}
                <input className={fieldClass} type="time" value={form.time} onChange={(e) => update("time", e.target.value)} required />
                {err("time")}
              </label>
            </div>

            <div>
              <label className={labelClass} htmlFor="complaint-search">
                {t(T.search)}
              </label>
              <p className="mt-0.5 text-sm text-forest-700/80">{t(T.searchHint)}</p>
              <input
                id="complaint-search"
                className={fieldClass}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === "hi" ? "जैसे: नींद नहीं आती / neend" : "e.g. sleep / neend / नींद"}
                autoComplete="off"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="complaint-results"
              />

              {search.trim().length >= 2 && results.length === 0 && (
                <p className="mt-2 text-sm text-forest-700">{t(T.noMatch)}</p>
              )}
              {results.length > 0 && (
                <ul id="complaint-results" role="listbox" className="mt-2 grid max-h-72 gap-1.5 overflow-y-auto rounded-2xl bg-forest-50/60 p-1.5">
                  {results.map((item) => {
                    const on = picked.includes(complaintLabel(item));
                    return (
                      <li key={item.en} role="option" aria-selected={on}>
                        <button
                          type="button"
                          onClick={() => togglePick(item)}
                          className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left transition ${
                            on ? "bg-forest-100" : "bg-white hover:bg-forest-100"
                          }`}
                        >
                          <span>
                            <span className="block font-medium text-forest-900">{lang === "hi" ? item.hi : item.en}</span>
                            <span className="block text-sm text-forest-700/80">{lang === "hi" ? item.en : item.hi}</span>
                          </span>
                          <span className="text-xl font-semibold text-forest-600">{on ? "✓" : "+"}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {!search && picked.length === 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-forest-700">{t(T.popular)}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {popular.map((item) => (
                      <button
                        key={item.en}
                        type="button"
                        onClick={() => togglePick(item)}
                        className="rounded-full bg-forest-50 px-3 py-1.5 text-sm text-forest-800 ring-1 ring-forest-100 hover:ring-forest-500"
                      >
                        + {lang === "hi" ? item.hi : item.en}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {picked.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-forest-700">{t(T.selected)}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {picked.map((label) => {
                      const [hi, en] = label.split(" / ");
                      return (
                        <li key={label}>
                          <button
                            type="button"
                            onClick={() => setPicked((list) => list.filter((l) => l !== label))}
                            aria-label={`${t(T.remove)}: ${lang === "hi" ? hi : en}`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-forest-800 px-3 py-1.5 text-sm text-white"
                          >
                            {lang === "hi" ? hi : en} <span aria-hidden>×</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <label className={labelClass}>
              {t(T.concern)}
              <textarea
                className={`${fieldClass} min-h-28 resize-y`}
                value={form.concern}
                onChange={(e) => update("concern", e.target.value)}
                placeholder={t(T.concernPh)}
                maxLength={2000}
                rows={4}
              />
              {err("concern")}
            </label>

            <label className="flex items-start gap-3 text-forest-800">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#0b746f]"
              />
              <span className="text-[15px] leading-relaxed">{t(T.consent)}</span>
            </label>
            {err("consent")}

            {saveError && <p className="rounded-xl bg-[#fff3ef] px-4 py-3 font-medium text-[#8a2c17]">{t(T.saveError)}</p>}

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-forest-800 px-6 py-4 text-lg font-semibold text-white transition hover:bg-forest-700 disabled:opacity-60"
            >
              {saving ? t(T.saving) : t(T.submit)}
            </button>

            <p className="rounded-xl bg-[#fff3ef] px-4 py-3 text-sm text-[#6b2a1a]">{t(T.emergency)}</p>
          </form>
        )}
      </div>
    </div>
  );
}
