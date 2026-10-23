"use client";

import { FormEvent, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { CONSENT_TEXT, FEEDBACK_ERRORS, FEEDBACK_LIMITS, validateFeedback, type FeedbackError } from "../../lib/feedback";
import type { Lang } from "../../lib/i18n";
import { tr } from "../../lib/i18n";

const T = {
  rating: { en: "Your rating", hi: "आपकी रेटिंग" },
  stars: { en: "stars", hi: "स्टार" },
  name: { en: "Display name (optional)", hi: "नाम (वैकल्पिक)" },
  nameHint: { en: "First name or initials. Leave blank to stay anonymous.", hi: "पहला नाम या शुरुआती अक्षर। गुमनाम रहने के लिए ख़ाली छोड़ें।" },
  date: { en: "Month of consultation (optional)", hi: "परामर्श की तारीख़ (वैकल्पिक)" },
  comment: { en: "Your feedback", hi: "आपका फ़ीडबैक" },
  commentHint: { en: "What went well? What could be better? Please don't include phone numbers, e-mail or private medical details.", hi: "क्या अच्छा लगा? क्या बेहतर हो सकता है? कृपया फ़ोन नंबर, ई-मेल या निजी मेडिकल जानकारी न लिखें।" },
  submit: { en: "Submit feedback", hi: "फ़ीडबैक भेजें" },
  sending: { en: "Sending…", hi: "भेजा जा रहा है…" },
  thanks: { en: "Thank you. Your feedback has been received and will be read by the doctor. It is not published automatically.", hi: "धन्यवाद। आपका फ़ीडबैक मिल गया है और डॉक्टर इसे पढ़ेंगे। यह अपने-आप प्रकाशित नहीं होता।" },
  failed: { en: "Could not send right now. Please try again later or message us on WhatsApp.", hi: "अभी भेजा नहीं जा सका। कृपया बाद में कोशिश करें या WhatsApp पर संदेश भेजें।" },
};

export default function FeedbackForm({ lang }: { lang: Lang }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [consentStore, setConsentStore] = useState(false);
  const [consentDisplay, setConsentDisplay] = useState(false);
  const [errors, setErrors] = useState<FeedbackError[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const result = validateFeedback({ rating, name, comment, visitDate, consentStore, consentDisplay, language: lang }, today);
    if (!result.ok) return setErrors(result.errors);
    setErrors([]);
    setState("sending");
    try {
      await addDoc(collection(db, "feedback"), { ...result.doc, createdAt: serverTimestamp() });
      setState("done");
    } catch (err) {
      console.error(err);
      setState("failed");
    }
  }

  if (state === "done") {
    return <p role="status" className="rounded-2xl bg-forest-50 p-5 text-forest-900 ring-1 ring-forest-200">{t(T.thanks)}</p>;
  }

  const field = "mt-1 w-full rounded-xl border border-forest-200 bg-white px-3 py-2.5 text-forest-900 focus:outline-none focus:ring-2 focus:ring-saffron-400";
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-3xl bg-white p-6 ring-1 ring-forest-100">
      <fieldset>
        <legend className="font-semibold text-forest-900">{t(T.rating)}</legend>
        <div className="mt-2 flex gap-1" role="radiogroup" aria-label={t(T.rating)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} ${t(T.stars)}`}
              onClick={() => setRating(n)}
              className={`h-11 w-11 rounded-full text-2xl leading-none transition ${n <= rating ? "text-saffron-500" : "text-forest-200"} hover:scale-110 focus:outline-none focus:ring-2 focus:ring-saffron-400`}
            >
              ★
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="font-semibold text-forest-900">{t(T.comment)}</span>
        <span className="block text-sm text-forest-600">{t(T.commentHint)}</span>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} maxLength={FEEDBACK_LIMITS.comment} rows={5} className={field} />
        <span className="block text-right text-xs text-forest-500">{comment.length}/{FEEDBACK_LIMITS.comment}</span>
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-semibold text-forest-900">{t(T.name)}</span>
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={FEEDBACK_LIMITS.name} className={field} autoComplete="given-name" />
          <span className="block text-sm text-forest-600">{t(T.nameHint)}</span>
        </label>
        <label className="block">
          <span className="font-semibold text-forest-900">{t(T.date)}</span>
          <input type="date" value={visitDate} max={today} onChange={(e) => setVisitDate(e.target.value)} className={field} />
        </label>
      </div>

      <label className="flex gap-3 text-forest-800">
        <input type="checkbox" checked={consentStore} onChange={(e) => setConsentStore(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-forest-700" />
        <span>{t(CONSENT_TEXT.store)}</span>
      </label>
      <label className="flex gap-3 text-forest-800">
        <input type="checkbox" checked={consentDisplay} onChange={(e) => setConsentDisplay(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-forest-700" />
        <span>{t(CONSENT_TEXT.display)}</span>
      </label>

      {errors.length > 0 && (
        <ul role="alert" className="rounded-2xl bg-[#fdecea] p-4 text-sm text-[#8a2c17]">
          {errors.map((e) => <li key={e}>{t(FEEDBACK_ERRORS[e])}</li>)}
        </ul>
      )}
      {state === "failed" && <p role="alert" className="text-sm text-[#8a2c17]">{t(T.failed)}</p>}

      <button type="submit" disabled={state === "sending"} className="justify-self-start rounded-full bg-forest-800 px-6 py-3 font-semibold text-white hover:bg-forest-900 disabled:opacity-60">
        {state === "sending" ? t(T.sending) : t(T.submit)}
      </button>
    </form>
  );
}
