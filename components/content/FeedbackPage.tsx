import Link from "next/link";
import { displayName, type FeedbackDoc } from "../../lib/feedback";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { RATING, SITE_URL } from "../../lib/site";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { ShieldIcon } from "../site/icons";
import FeedbackForm from "./FeedbackForm";
import JsonLd from "./JsonLd";

export const FEEDBACK_META = {
  title: { en: "Patient Feedback – Dr. Kuldeep Budania", hi: "मरीज़ों का फ़ीडबैक – डॉ. कुलदीप बुडानिया" },
  description: {
    en: "Share feedback about your consultation with Dr. Kuldeep Budania. Feedback is private and moderated; nothing is published without consent.",
    hi: "डॉ. कुलदीप बुडानिया के साथ अपने परामर्श के बारे में फ़ीडबैक दें। फ़ीडबैक निजी और जाँचा हुआ रहता है; सहमति के बिना कुछ प्रकाशित नहीं होता।",
  },
};

const T = {
  home: { en: "Home", hi: "होम" },
  h1: { en: "Patient feedback", hi: "मरीज़ों का फ़ीडबैक" },
  intro: { en: "Your experience helps us improve. Feedback goes to the doctor privately and is never published automatically.", hi: "आपका अनुभव हमें बेहतर बनाने में मदद करता है। फ़ीडबैक निजी रूप से डॉक्टर तक जाता है और अपने-आप कभी प्रकाशित नहीं होता।" },
  ratingNote: { en: "Overall patient rating", hi: "कुल मरीज़ रेटिंग" },
  privacyTitle: { en: "How we handle feedback", hi: "हम फ़ीडबैक कैसे संभालते हैं" },
  privacy: [
    { en: "Every submission is reviewed by the doctor before anything else happens.", hi: "हर फ़ीडबैक को पहले डॉक्टर देखते हैं।" },
    { en: "Feedback is shown publicly only if you agree and the doctor approves it.", hi: "फ़ीडबैक तभी सार्वजनिक होता है जब आप सहमति दें और डॉक्टर मंज़ूर करें।" },
    { en: "We never write reviews ourselves and never copy anything from medical records.", hi: "हम ख़ुद कभी रिव्यू नहीं लिखते और मेडिकल रिकॉर्ड से कुछ नहीं लेते।" },
    { en: "Phone numbers and e-mail addresses are not stored with feedback.", hi: "फ़ीडबैक के साथ फ़ोन नंबर और ई-मेल नहीं रखे जाते।" },
  ],
  complaint: { en: "For an urgent concern about your treatment, please contact the clinic directly rather than using this form.", hi: "इलाज से जुड़ी तुरंत चिंता के लिए यह फ़ॉर्म नहीं, सीधे क्लिनिक से संपर्क करें।" },
  contact: { en: "Contact the clinic", hi: "क्लिनिक से संपर्क करें" },
  reviewsTitle: { en: "What patients say", hi: "मरीज़ क्या कहते हैं" },
  formTitle: { en: "Share your feedback", hi: "अपना फ़ीडबैक दें" },
};

export default function FeedbackPage({ lang, reviews = [] }: { lang: Lang; reviews?: Pick<FeedbackDoc, "rating" | "name" | "comment" | "reviewDate">[] }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const hi = lang === "hi";
  const url = `${SITE_URL}${localePath("/feedback", lang)}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", url, name: t(FEEDBACK_META.title), description: t(FEEDBACK_META.description), inLanguage: hi ? "hi-IN" : "en-IN" },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: t(T.home), item: `${SITE_URL}${localePath("/", lang)}` },
        { "@type": "ListItem", position: 2, name: t(T.h1), item: url },
      ] },
    ],
  };
  return (
    <div className="nmb min-h-screen bg-cream" lang={hi ? "hi" : "en"}>
      <JsonLd data={schema} />
      <SiteHeader lang={lang} path="/feedback" />
      <main id="main">
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-4xl px-4 pb-12 pt-8 md:px-6">
            <nav aria-label={hi ? "ब्रेडक्रंब" : "Breadcrumb"} className="mb-5 text-sm text-forest-200">
              <Link href={localePath("/", lang)} className="hover:text-white">{t(T.home)}</Link><span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page" className="text-white">{t(T.h1)}</span>
            </nav>
            <h1 className={`font-semibold ${hi ? "text-3xl md:text-5xl" : "font-display text-4xl md:text-5xl"}`}>{t(T.h1)}</h1>
            <p className="mt-4 max-w-3xl text-lg text-forest-100">{t(T.intro)}</p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3">
              <span className="text-3xl font-semibold text-saffron-400">{RATING.value}★</span>
              <span className="text-forest-100">
                {t(T.ratingNote)}
                {RATING.url && <> · <a href={RATING.url} target="_blank" rel="noopener noreferrer" className="underline">{t(RATING.source)}</a></>}
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-4xl gap-8 px-4 py-10 md:px-6">
          <div className="rounded-3xl border-2 border-forest-200 bg-white p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-forest-900"><ShieldIcon size={22} className="text-forest-600" />{t(T.privacyTitle)}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-forest-800">{T.privacy.map((p) => <li key={p.en}>{t(p)}</li>)}</ul>
            <p className="mt-3 text-sm text-forest-700">{t(T.complaint)} <Link href={localePath("/contact", lang)} className="font-semibold underline">{t(T.contact)}</Link></p>
          </div>

          {reviews.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-forest-900">{t(T.reviewsTitle)}</h2>
              <ul className="mt-4 grid gap-4 md:grid-cols-2">
                {reviews.map((r, i) => (
                  <li key={i} className="rounded-3xl bg-white p-5 ring-1 ring-forest-100">
                    <p aria-label={`${r.rating}/5`} className="text-saffron-500">{"★".repeat(r.rating)}<span className="text-forest-200">{"★".repeat(5 - r.rating)}</span></p>
                    <p className="mt-2 whitespace-pre-line text-forest-800">{r.comment}</p>
                    <p className="mt-3 text-sm text-forest-600">— {displayName(r, lang)} · {r.reviewDate}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-forest-900">{t(T.formTitle)}</h2>
            <FeedbackForm lang={lang} />
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
