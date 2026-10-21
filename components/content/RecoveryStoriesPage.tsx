import Link from "next/link";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";
import { FICTIONAL_LABEL, REAL_LABEL, STORY_CATEGORIES, STORY_DISCLAIMER, type Story } from "../../lib/stories";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { ArrowRightIcon, ShieldIcon } from "../site/icons";
import JsonLd from "./JsonLd";

export const STORIES_META = {
  title: { en: "Recovery Stories & Wellness Education", hi: "रिकवरी की कहानियाँ और वेलनेस जानकारी" },
  description: {
    en: "Educational recovery stories about depression, anxiety, addiction and more — clearly labelled, consent-based and without promises of guaranteed results.",
    hi: "डिप्रेशन, चिंता, नशा और अन्य विषयों पर रिकवरी की शैक्षिक कहानियाँ — साफ़ लेबल, सहमति-आधारित और बिना पक्के नतीजे के वादे के।",
  },
};

const T = {
  home: { en: "Home", hi: "होम" },
  h1: { en: "Recovery stories", hi: "रिकवरी की कहानियाँ" },
  intro: { en: "Recovery is possible, and it rarely follows a straight line. These stories show what the journey can look like.", hi: "रिकवरी संभव है, और यह शायद ही कभी सीधी रेखा में चलती है। ये कहानियाँ दिखाती हैं कि यह सफ़र कैसा हो सकता है।" },
  empty: { en: "Stories will appear here once they have been reviewed and the required consent is in place. Meanwhile, these guides explain what recovery involves:", hi: "समीक्षा और ज़रूरी सहमति के बाद कहानियाँ यहाँ दिखेंगी। तब तक ये गाइड बताते हैं कि रिकवरी में क्या शामिल है:" },
  read: { en: "Read more", hi: "और पढ़ें" },
  learnTitle: { en: "Recovery & wellness education", hi: "रिकवरी और वेलनेस जानकारी" },
  book: { en: "Book a consultation", hi: "परामर्श बुक करें" },
};

const LEARN = [
  { href: "/psychotherapy", label: { en: "How psychotherapy helps", hi: "साइकोथेरेपी कैसे मदद करती है" } },
  { href: "/articles/family-role-in-mental-health-treatment", label: { en: "How families can support treatment", hi: "परिवार इलाज में कैसे साथ दे" } },
  { href: "/articles/mindfulness-for-beginners", label: { en: "Mindfulness for beginners", hi: "शुरुआत के लिए माइंडफ़ुलनेस" } },
  { href: "/relapse-prevention-counselling-india", label: { en: "Relapse prevention", hi: "दोबारा बीमारी से बचाव" } },
  { href: "/articles/sleep-and-mental-health", label: { en: "Sleep and mental health", hi: "नींद और मानसिक स्वास्थ्य" } },
  { href: "/articles", label: { en: "All articles", hi: "सभी लेख" } },
];

type PublicStory = Omit<Story, "consent">;

export default function RecoveryStoriesPage({ lang, stories = [] }: { lang: Lang; stories?: PublicStory[] }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const hi = lang === "hi";
  const url = `${SITE_URL}${localePath("/recovery-stories", lang)}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", url, name: t(STORIES_META.title), description: t(STORIES_META.description), inLanguage: hi ? "hi-IN" : "en-IN" },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: t(T.home), item: `${SITE_URL}${localePath("/", lang)}` },
        { "@type": "ListItem", position: 2, name: t(T.h1), item: url },
      ] },
    ],
  };
  return (
    <div className="nmb min-h-screen bg-cream" lang={hi ? "hi" : "en"}>
      <JsonLd data={schema} />
      <SiteHeader lang={lang} path="/recovery-stories" />
      <main id="main">
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-4xl px-4 pb-12 pt-8 md:px-6">
            <nav aria-label={hi ? "ब्रेडक्रंब" : "Breadcrumb"} className="mb-5 text-sm text-forest-200">
              <Link href={localePath("/", lang)} className="hover:text-white">{t(T.home)}</Link><span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page" className="text-white">{t(T.h1)}</span>
            </nav>
            <h1 className={`font-semibold ${hi ? "text-3xl md:text-5xl" : "font-display text-4xl md:text-5xl"}`}>{t(T.h1)}</h1>
            <p className="mt-4 max-w-3xl text-lg text-forest-100">{t(T.intro)}</p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-10 md:px-6">
          <p className="flex gap-3 rounded-2xl border-2 border-saffron-400 bg-white p-5 text-forest-800">
            <ShieldIcon size={22} className="mt-0.5 shrink-0 text-saffron-600" />
            <span>{t(STORY_DISCLAIMER)}</span>
          </p>

          {stories.length > 0 ? (
            <ul className="mt-8 grid gap-6">
              {stories.map((s) => (
                <li key={s.id ?? s.title.en}>
                  <article className="overflow-hidden rounded-3xl bg-white ring-1 ring-forest-100">
                    {s.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.imageUrl} alt={t(s.imageAlt)} loading="lazy" className="h-56 w-full object-cover" />
                    )}
                    <div className="p-6">
                      <p className="text-sm font-semibold uppercase tracking-wide text-forest-600">{t(STORY_CATEGORIES[s.category] ?? STORY_CATEGORIES.other)}</p>
                      <h2 className="mt-1 text-2xl font-semibold text-forest-900">{t(s.title)}</h2>
                      <p className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${s.fictional ? "bg-saffron-100 text-[#7a4a00]" : "bg-forest-50 text-forest-800"}`}>
                        {t(s.fictional ? FICTIONAL_LABEL : REAL_LABEL)}
                      </p>
                      <div className="mt-4 space-y-3 text-forest-800">
                        {t(s.narrative).split(/\n\s*\n/).filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
                      </div>
                      <p className="mt-4 text-xs text-forest-500">{hi ? "अंतिम समीक्षा" : "Last reviewed"}: {s.updated}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-forest-800">{t(T.empty)}</p>
          )}

          <h2 className="mt-10 text-2xl font-semibold text-forest-900">{t(T.learnTitle)}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {LEARN.map((l) => (
              <li key={l.href}>
                <Link href={localePath(l.href, lang)} className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 font-semibold text-forest-900 ring-1 ring-forest-100 hover:ring-forest-300">
                  {t(l.label)} <ArrowRightIcon size={18} className="shrink-0 text-forest-600" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10">
            <Link href={localePath("/book-appointment", lang)} className="inline-flex rounded-full bg-forest-800 px-6 py-3 font-semibold text-white hover:bg-forest-900">{t(T.book)}</Link>
          </p>
        </section>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
