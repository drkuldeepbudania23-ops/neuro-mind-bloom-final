import Link from "next/link";
import { faqs as homeFaqs } from "../../lib/content/home";
import { NASHA_MUKTI, SEXUAL_HEALTH } from "../../lib/content/hubs";
import { getCondition } from "../../lib/content/conditions";
import type { FaqItem } from "../../lib/content/types";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { PlusIcon } from "../site/icons";
import JsonLd from "./JsonLd";

const T = {
  title: { en: "Frequently asked questions", hi: "अक्सर पूछे जाने वाले सवाल" },
  intro: { en: "Answers about consultation, fees, privacy, de-addiction, sexual health and therapy.", hi: "परामर्श, फीस, गोपनीयता, नशा मुक्ति, यौन स्वास्थ्य और थेरेपी से जुड़े सवालों के जवाब।" },
  more: { en: "Still have a question? Ask on WhatsApp or book a consultation.", hi: "और कोई सवाल? WhatsApp पर पूछें या परामर्श बुक करें।" },
  book: { en: "Book a consultation", hi: "परामर्श बुक करें" },
};

function sections(): { title: { en: string; hi: string }; items: FaqItem[] }[] {
  const therapy = getCondition("psychotherapy-counselling")?.faqs ?? [];
  const online = getCondition("online-psychiatrist-india")?.faqs ?? [];
  return [
    { title: { en: "Consultation & fees", hi: "परामर्श और फीस" }, items: [...homeFaqs, ...online.slice(2)] },
    { title: { en: "Nasha mukti (de-addiction)", hi: "नशा मुक्ति" }, items: NASHA_MUKTI.faqs },
    { title: { en: "Sexual health", hi: "यौन स्वास्थ्य" }, items: SEXUAL_HEALTH.faqs },
    { title: { en: "Psychotherapy", hi: "साइकोथेरेपी" }, items: therapy },
  ];
}

export default function FaqPage({ lang }: { lang: Lang }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const all = sections();
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: all.flatMap((s) => s.items).map((f) => ({ "@type": "Question", name: t(f.q), acceptedAnswer: { "@type": "Answer", text: t(f.a) } })),
  };
  return (
    <div className="nmb min-h-screen bg-cream" lang={lang === "hi" ? "hi" : "en"}>
      <JsonLd data={schema} />
      <SiteHeader lang={lang} path="/faq" />
      <main>
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
            <h1 className="text-3xl font-semibold md:text-5xl">{t(T.title)}</h1>
            <p className="mt-3 text-lg text-forest-100">{t(T.intro)}</p>
          </div>
        </section>
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
          {all.map((s) => (
            <section key={s.title.en} className="mb-10">
              <h2 className="text-2xl font-semibold text-forest-900">{t(s.title)}</h2>
              <div className="mt-4 divide-y divide-forest-100 rounded-2xl bg-white ring-1 ring-forest-100">
                {s.items.map((faq) => (
                  <details key={faq.q.en} className="group px-5">
                    <summary className="flex items-center justify-between gap-4 py-4 text-left text-lg font-semibold text-forest-900">
                      {t(faq.q)}
                      <PlusIcon size={20} className="shrink-0 text-saffron-600 transition-transform group-open:rotate-45" />
                    </summary>
                    <p className="pb-5 leading-relaxed text-forest-700">{t(faq.a)}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
          <div className="rounded-3xl bg-forest-800 p-6 text-white">
            <p className="text-lg font-semibold">{t(T.more)}</p>
            <Link href={localePath("/book-appointment", lang)} className="mt-4 inline-flex rounded-full bg-saffron-500 px-6 py-3 font-semibold text-forest-900">
              {t(T.book)}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
