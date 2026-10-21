"use client";

import Link from "next/link";
import { useState } from "react";
import { ASSESSMENTS, ASSESSMENT_ORDER, SCREENING_DISCLAIMER, optionsFor, scoreAssessment, type AssessmentId, type AssessmentResult } from "../../lib/assessments";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { CRISIS_HELPLINE, whatsappLink } from "../../lib/site";

const T = {
  title: { en: "Free mental health self-check", hi: "निःशुल्क मानसिक स्वास्थ्य स्व-जाँच" },
  intro: {
    en: "Short, scientifically validated questionnaires. This is a screening tool, not a diagnosis. Your answers stay on your device — nothing is saved or sent.",
    hi: "छोटे, वैज्ञानिक रूप से प्रमाणित प्रश्नावली। यह केवल स्क्रीनिंग है, निदान नहीं। आपके जवाब आपके फ़ोन/कंप्यूटर पर ही रहते हैं — कुछ भी सेव या भेजा नहीं जाता।",
  },
  start: { en: "Start", hi: "शुरू करें" },
  result: { en: "Your result", hi: "आपका परिणाम" },
  score: { en: "Score", hi: "स्कोर" },
  submit: { en: "See my result", hi: "मेरा परिणाम देखें" },
  answerAll: { en: "Please answer all questions.", hi: "कृपया सभी सवालों के जवाब दें।" },
  again: { en: "Choose another test", hi: "दूसरी जाँच चुनें" },
  book: { en: "Book a consultation", hi: "परामर्श बुक करें" },
  disclaimer: {
    en: "Screening scores can be affected by physical illness, medicines and recent events. Only a clinician can make a diagnosis.",
    hi: "शारीरिक बीमारी, दवाइयों और हाल की घटनाओं से स्कोर पर असर पड़ सकता है। निदान केवल डॉक्टर ही कर सकते हैं।",
  },
  safety: {
    en: `You mentioned thoughts of death or self-harm. You deserve support right now. Please call ${CRISIS_HELPLINE.name} ${CRISIS_HELPLINE.number} (free, 24×7) or 112, or talk to someone you trust today.`,
    hi: `आपने मौत या ख़ुद को नुकसान पहुँचाने के विचारों का ज़िक्र किया है। आपको अभी सहारे की ज़रूरत है और वह मिल सकता है। कृपया ${CRISIS_HELPLINE.name} ${CRISIS_HELPLINE.number} (निःशुल्क, 24×7) या 112 पर कॉल करें, या आज ही किसी भरोसेमंद व्यक्ति से बात करें।`,
  },
  back: { en: "← Back to home", hi: "← होम पेज पर वापस" },
  allTests: { en: "← All self-checks", hi: "← सभी स्व-जाँच" },
  progress: { en: "answered", hi: "जवाब दिए" },
  related: { en: "Learn more", hi: "और जानें" },
  source: { en: "About this questionnaire", hi: "इस प्रश्नावली के बारे में" },
  privacy: {
    en: "Your answers are scored on this device only. Nothing is stored or sent to anyone.",
    hi: "आपके जवाबों का स्कोर सिर्फ़ इसी फ़ोन/कंप्यूटर पर निकलता है। कुछ भी सेव या किसी को भेजा नहीं जाता।",
  },
};

export type ConditionNames = Record<string, { en: string; hi: string }>;

export default function SelfAssessment({ lang, initial, conditionNames = {} }: { lang: Lang; initial?: AssessmentId; conditionNames?: ConditionNames }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const [active, setActive] = useState<AssessmentId | null>(initial ?? null);
  const [answers, setAnswers] = useState<(number | null)[]>(() => (initial ? Array(ASSESSMENTS[initial].questions.length).fill(null) : []));
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [showMissing, setShowMissing] = useState(false);

  function submit() {
    if (!active) return;
    if (answers.some((a) => a === null)) {
      setShowMissing(true);
      return;
    }
    setResult(scoreAssessment(active, answers));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const assessment = active ? ASSESSMENTS[active] : null;

  return (
    <div className="nmb min-h-screen bg-cream" lang={lang === "hi" ? "hi" : "en"}>
      <div className="bg-forest-900 pb-24 pt-10 text-white">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          {initial ? (
            <Link href={localePath("/self-assessment", lang)} className="text-sm text-forest-200 hover:text-white">{t(T.allTests)}</Link>
          ) : (
            <Link href={localePath("/", lang)} className="text-sm text-forest-200 hover:text-white">{t(T.back)}</Link>
          )}
          <h1 className="mt-4 text-3xl font-semibold md:text-5xl">{initial ? t(ASSESSMENTS[initial].title) : t(T.title)}</h1>
          <p className="mt-3 max-w-2xl text-lg text-forest-100">{initial && ASSESSMENTS[initial].intro ? t(ASSESSMENTS[initial].intro!) : t(T.intro)}</p>
          <p className="mt-3 max-w-2xl rounded-xl bg-forest-800 px-4 py-3 text-sm text-forest-100">{t(SCREENING_DISCLAIMER)}</p>
        </div>
      </div>

      <div className="mx-auto -mt-16 max-w-3xl px-4 pb-20 md:px-6">
        {!assessment && (
          <ul className="grid gap-4 sm:grid-cols-2">
            {ASSESSMENT_ORDER.map((id) => ASSESSMENTS[id]).map((a) => (
              <li key={a.id} className="flex flex-col rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(6,43,49,0.12)]">
                <h2 className="text-xl font-semibold text-forest-900">{t(a.title)}</h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-saffron-600">
                  {a.checklist ? (lang === "hi" ? "क्लिनिक लक्षण-सूची" : "Clinic checklist") : lang === "hi" ? "मानक स्क्रीनिंग टेस्ट" : "Standard screening test"}
                </p>
                <p className="mt-1 text-forest-700/80">{t(a.about)}</p>
                {a.intro && <p className="mt-2 flex-1 text-[15px] leading-relaxed text-forest-700">{t(a.intro)}</p>}
                <Link
                  href={localePath(`/self-assessment/${a.id}`, lang)}
                  className="mt-5 rounded-full bg-forest-800 px-6 py-3 text-center font-semibold text-white transition hover:bg-forest-700"
                >
                  {t(T.start)}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {assessment && result && (
          <section aria-live="polite" className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(6,43,49,0.12)] md:p-8">
            {result.safetyFlag && (
              <div role="alert" className="mb-6 rounded-2xl border-2 border-[#e9b4a8] bg-[#fff3ef] p-5">
                <p className="font-semibold text-[#8a2c17]">{t(T.safety)}</p>
                <a href={`tel:${CRISIS_HELPLINE.number}`} className="mt-3 inline-flex rounded-full bg-[#b23a1f] px-5 py-2.5 font-semibold text-white">
                  {CRISIS_HELPLINE.name} {CRISIS_HELPLINE.number}
                </a>
              </div>
            )}
            <p className="text-sm font-semibold uppercase tracking-wider text-saffron-600">{t(T.result)} · {t(assessment.title)}</p>
            <p className="mt-3 text-4xl font-semibold text-forest-900">{t(result.band.label)}</p>
            <p className="mt-1 text-forest-700">{t(T.score)}: {result.total} / {result.max}</p>
            <p className="mt-4 text-lg leading-relaxed text-forest-800">{t(result.band.advice)}</p>
            <p className="mt-4 rounded-xl bg-saffron-100 px-4 py-3 text-sm font-medium text-forest-900">{t(SCREENING_DISCLAIMER)}</p>
            <p className="mt-2 text-sm text-forest-700/80">{t(T.disclaimer)}</p>
            {(assessment.conditions ?? []).filter((slug) => conditionNames[slug]).length > 0 && (
              <div className="mt-6">
                <p className="font-semibold text-forest-900">{t(T.related)}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {(assessment.conditions ?? []).filter((slug) => conditionNames[slug]).map((slug) => (
                    <li key={slug}>
                      <Link href={localePath(`/${slug}`, lang)} className="inline-block rounded-full bg-cream px-4 py-2 text-sm font-semibold text-forest-800 ring-1 ring-forest-200 hover:ring-forest-500">
                        {t(conditionNames[slug])}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={localePath("/book-appointment", lang)} className="rounded-full bg-forest-800 px-6 py-3 font-semibold text-white hover:bg-forest-700">
                {t(T.book)}
              </Link>
              <a
                href={whatsappLink(lang === "hi" ? "नमस्ते, मैंने वेबसाइट पर स्व-जाँच की है और परामर्श लेना चाहता/चाहती हूँ।" : "Hello, I took the self-check on the website and would like a consultation.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-whatsapp px-6 py-3 font-semibold text-white"
              >
                WhatsApp
              </a>
              <Link href={localePath("/self-assessment", lang)} onClick={() => { setActive(null); setResult(null); }} className="rounded-full px-6 py-3 font-semibold text-forest-800 ring-1 ring-forest-200">
                {t(T.again)}
              </Link>
            </div>
          </section>
        )}

        {assessment && !result && (
          <section className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(6,43,49,0.12)] md:p-8">
            <h2 className="text-2xl font-semibold text-forest-900">{t(assessment.title)}</h2>
            <p className="mt-2 text-forest-700">{t(assessment.stem)}</p>
            {(() => {
              const done = answers.filter((a) => a !== null).length;
              const total = assessment.questions.length;
              return (
                <div className="sticky top-0 z-10 -mx-2 mt-4 bg-white/95 px-2 py-2 backdrop-blur">
                  <div className="flex justify-between text-sm text-forest-700">
                    <span>{done} / {total} {t(T.progress)}</span>
                    <span>{Math.round((done / total) * 100)}%</span>
                  </div>
                  <div
                    className="mt-1 h-2 overflow-hidden rounded-full bg-forest-100"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={total}
                    aria-valuenow={done}
                    aria-label={t(T.progress)}
                  >
                    <div className="h-full rounded-full bg-forest-600 transition-all" style={{ width: `${(done / total) * 100}%` }} />
                  </div>
                </div>
              );
            })()}
            {assessment.note && <p className="mt-3 rounded-xl bg-saffron-100 px-4 py-3 text-sm text-forest-900">{t(assessment.note)}</p>}
            <ol className="mt-6 grid gap-6">
              {assessment.questions.map((question, qi) => {
                const missing = showMissing && answers[qi] === null;
                return (
                  <li key={question.en}>
                    <fieldset className={`rounded-2xl p-4 ring-1 ${missing ? "ring-2 ring-[#d4573b]" : "ring-forest-100"}`}>
                      <legend className="px-1 font-semibold text-forest-900">
                        {qi + 1}. {t(question)}
                      </legend>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {optionsFor(assessment, qi).map((option) => (
                          <label
                            key={option.value}
                            className={`flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 ring-1 transition ${
                              answers[qi] === option.value ? "bg-forest-50 ring-2 ring-forest-500" : "ring-forest-100 hover:ring-forest-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q${qi}`}
                              checked={answers[qi] === option.value}
                              onChange={() => setAnswers((prev) => prev.map((v, i) => (i === qi ? option.value : v)))}
                              className="h-4 w-4 accent-[#0b746f]"
                            />
                            <span className="text-forest-900">{t(option.label)}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </li>
                );
              })}
            </ol>
            {showMissing && answers.some((a) => a === null) && (
              <p className="mt-4 font-medium text-[#b23a1f]">{t(T.answerAll)}</p>
            )}
            <button type="button" onClick={submit} className="mt-6 w-full rounded-full bg-forest-800 px-6 py-4 text-lg font-semibold text-white hover:bg-forest-700">
              {t(T.submit)}
            </button>
            <p className="mt-3 text-center text-sm text-forest-700/80">{t(T.privacy)}</p>
            {assessment.source && (
              <details className="mt-4 rounded-xl bg-cream px-4 py-3 text-sm text-forest-700">
                <summary className="cursor-pointer font-semibold text-forest-800">{t(T.source)}</summary>
                <p className="mt-2 leading-relaxed">{t(assessment.source)}</p>
              </details>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
