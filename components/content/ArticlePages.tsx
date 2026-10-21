import Image from "next/image";
import Link from "next/link";
import { ARTICLE_CATS, ARTICLES, relatedArticles, type Article } from "../../lib/content/articles";
import { REFERENCES } from "../../lib/content/references";
import { matchVideos } from "../../lib/youtube/match";
import type { YouTubeVideo } from "../../lib/youtube/feed";
import { PROFILE_PATH } from "../../lib/content/profile";
import ArticleBrowser, { type ArticleCard } from "./ArticleBrowser";
import LiteYouTube from "./LiteYouTube";
import { getCondition } from "../../lib/content/conditions";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { DOCTOR, SITE_URL } from "../../lib/site";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import ShareButton from "../site/ShareButton";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { CallNowButton } from "../site/Social";
import { ArrowRightIcon, CheckIcon, PlusIcon } from "../site/icons";
import JsonLd from "./JsonLd";

const T = {
  title: { en: "Articles", hi: "लेख" },
  intro: { en: "Practical, evidence-based articles by Dr. Kuldeep Budania — in Hindi and English.", hi: "डॉ. कुलदीप बुडानिया के व्यावहारिक, प्रमाण-आधारित लेख — हिंदी और अंग्रेज़ी में।" },
  min: { en: "min read", hi: "मिनट में पढ़ें" },
  read: { en: "Read article", hi: "लेख पढ़ें" },
  related: { en: "Related guides", hi: "संबंधित जानकारी" },
  all: { en: "All articles", hi: "सभी लेख" },
  cta: { en: "Need personal advice? Book a confidential consultation.", hi: "व्यक्तिगत सलाह चाहिए? गोपनीय परामर्श बुक करें।" },
  book: { en: "Book a consultation", hi: "परामर्श बुक करें" },
  disclaimer: { en: "This article is for general information and is not a substitute for personal medical advice.", hi: "यह लेख सामान्य जानकारी के लिए है; व्यक्तिगत चिकित्सा सलाह का विकल्प नहीं है।" },
  home: { en: "Home", hi: "होम" },
  keyConcepts: { en: "Key concepts", hi: "मुख्य बातें" },
  symptoms: { en: "Symptoms and signs", hi: "लक्षण और संकेत" },
  causes: { en: "Causes", hi: "कारण" },
  riskFactors: { en: "Risk factors", hi: "जोखिम कारक" },
  management: { en: "Evidence-based management", hi: "प्रमाण-आधारित प्रबंधन" },
  whenHelp: { en: "When to seek professional help", hi: "विशेषज्ञ से कब मिलें" },
  faq: { en: "Frequently asked questions", hi: "अक्सर पूछे जाने वाले सवाल" },
  refs: { en: "Medical references", hi: "चिकित्सा संदर्भ" },
  refsNote: { en: "Guidelines and official sources used for this article.", hi: "इस लेख के लिए उपयोग किए गए दिशानिर्देश और आधिकारिक स्रोत।" },
  author: { en: "Author", hi: "लेखक" },
  reviewer: { en: "Medical reviewer", hi: "चिकित्सा समीक्षक" },
  reviewed: { en: "Last reviewed", hi: "अंतिम समीक्षा" },
  relatedArticles: { en: "Related articles", hi: "संबंधित लेख" },
  relatedVideos: { en: "Related videos", hi: "संबंधित वीडियो" },
  play: { en: "Play video", hi: "वीडियो चलाएँ" },
  updated: { en: "Updated", hi: "अपडेट" },
};

const SECTIONS = ["keyConcepts", "symptoms", "causes", "riskFactors", "management", "whenHelp"] as const;

/** Lightweight data for the client-side search / filter list. */
export function articleCards(list: Article[] = ARTICLES): ArticleCard[] {
  return list.map((a) => ({
    slug: a.slug,
    cat: a.cat,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    updated: a.updated,
    readMinutes: a.readMinutes,
    search: [a.title.en, a.title.hi, a.excerpt.en, a.excerpt.hi, ...(a.tags ?? [])].join(" ").toLowerCase(),
  }));
}

function fmt(date: string, lang: Lang) {
  return new Date(`${date}T00:00:00+05:30`).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function Byline({ a, lang }: { a: Article; lang: Lang }) {
  return (
    <div className="flex items-center gap-3">
      <Image src={DOCTOR.photo} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover object-top" />
      <div className="text-sm">
        <p className="font-semibold">{tr(DOCTOR.name, lang)}, {DOCTOR.degrees}</p>
        <p className="opacity-80">{tr(T.updated, lang)} {fmt(a.updated, lang)} · {a.readMinutes} {tr(T.min, lang)}</p>
      </div>
    </div>
  );
}

export function ArticlesIndex({ lang, extra = [] }: { lang: Lang; extra?: ArticleCard[] }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const hi = lang === "hi";
  const cards = [...articleCards(), ...extra];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: t(T.title), url: `${SITE_URL}${localePath("/articles", lang)}`, inLanguage: hi ? "hi-IN" : "en-IN", numberOfItems: cards.length },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: t(T.home), item: `${SITE_URL}${localePath("/", lang)}` },
        { "@type": "ListItem", position: 2, name: t(T.title), item: `${SITE_URL}${localePath("/articles", lang)}` },
      ] },
    ],
  };
  return (
    <div className="nmb min-h-screen bg-cream" lang={hi ? "hi" : "en"}>
      <JsonLd data={schema} />
      <SiteHeader lang={lang} path="/articles" />
      <main id="main">
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <nav aria-label={hi ? "ब्रेडक्रंब" : "Breadcrumb"} className="mb-4 text-sm text-forest-200">
              <Link href={localePath("/", lang)} className="hover:text-white">{t(T.home)}</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-white">{t(T.title)}</span>
            </nav>
            <h1 className="text-3xl font-semibold md:text-5xl">{t(T.title)}</h1>
            <p className="mt-3 max-w-3xl text-lg text-forest-100">{t(T.intro)}</p>
          </div>
        </section>
        <ArticleBrowser lang={lang} cards={cards} cats={ARTICLE_CATS} />
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}

export function ArticleView({ article, lang, videos = [] }: { article: Article; lang: Lang; videos?: YouTubeVideo[] }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const hi = lang === "hi";
  const url = `${SITE_URL}${localePath(`/articles/${article.slug}`, lang)}`;
  const related = article.related.map(getCondition).filter((c): c is NonNullable<ReturnType<typeof getCondition>> => Boolean(c));
  const more = relatedArticles(article);
  const vids = matchVideos(videos, article.videoKeywords ?? [article.title.en.split(" ")[0]], 2);
  const refs = (article.refs ?? []).map((id) => REFERENCES[id]).filter(Boolean);
  const intro = article.intro ?? [];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        headline: t(article.title),
        description: t(article.excerpt),
        datePublished: article.published,
        dateModified: article.updated,
        lastReviewed: article.updated,
        inLanguage: hi ? "hi-IN" : "en-IN",
        url,
        image: `${SITE_URL}/og-image.jpg`,
        author: { "@type": "Physician", name: DOCTOR.name.en, url: `${SITE_URL}${PROFILE_PATH}` },
        reviewedBy: { "@type": "Physician", name: DOCTOR.name.en, url: `${SITE_URL}${PROFILE_PATH}` },
        publisher: { "@type": "Organization", name: "Neuro Mind Bloom", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-badge.png` } },
        about: related.slice(0, 3).map((c) => ({ "@type": "MedicalCondition", name: c.name.en })),
      },
      ...(article.faqs?.length
        ? [{ "@type": "FAQPage", mainEntity: article.faqs.map((f) => ({ "@type": "Question", name: t(f.q), acceptedAnswer: { "@type": "Answer", text: t(f.a) } })) }]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t(T.home), item: `${SITE_URL}${localePath("/", lang)}` },
          { "@type": "ListItem", position: 2, name: t(T.title), item: `${SITE_URL}${localePath("/articles", lang)}` },
          { "@type": "ListItem", position: 3, name: t(article.title), item: url },
        ],
      },
    ],
  };

  return (
    <div className="nmb min-h-screen bg-cream" lang={hi ? "hi" : "en"}>
      <JsonLd data={schema} />
      <SiteHeader lang={lang} path={`/articles/${article.slug}`} />
      <main id="main">
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
            <nav aria-label={hi ? "ब्रेडक्रंब" : "Breadcrumb"} className="text-sm text-forest-200">
              <Link href={localePath("/", lang)} className="hover:text-white">{t(T.home)}</Link><span aria-hidden="true" className="mx-2">/</span>
              <Link href={localePath("/articles", lang)} className="hover:text-white">{t(T.title)}</Link>
            </nav>
            <p className="mt-4 w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-saffron-400">{t(article.category)}</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">{t(article.title)}</h1>
            <p className="mt-4 text-lg text-forest-100">{t(article.excerpt)}</p>
            <div className="mt-6 text-forest-100">
              <Byline a={article} lang={lang} />
            </div>
          </div>
        </section>
        <article className="mx-auto max-w-3xl px-4 py-10 md:px-6">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-forest-100 md:p-10">
            {intro.map((p) => <p key={p.en} className="mt-4 text-lg leading-relaxed text-forest-800 first:mt-0">{t(p)}</p>)}
            {article.body.map((block, i) => {
              if ("h" in block) return <h2 key={i} className="mt-8 text-2xl font-semibold text-forest-900 first:mt-0">{t(block.h)}</h2>;
              if ("p" in block) return <p key={i} className="mt-4 text-lg leading-relaxed text-forest-800 first:mt-0">{t(block.p)}</p>;
              return (
                <ul key={i} className="mt-4 grid gap-2.5">
                  {block.list.map((li) => (
                    <li key={li.en} className="flex gap-3 text-lg leading-relaxed text-forest-800">
                      <CheckIcon size={20} className="mt-1 shrink-0 text-forest-600" /> {t(li)}
                    </li>
                  ))}
                </ul>
              );
            })}
            {SECTIONS.map((key) => {
              const items = article[key];
              if (!items?.length) return null;
              const warn = key === "whenHelp";
              return (
                <section key={key} aria-labelledby={`s-${key}`} className={warn ? "mt-8 rounded-2xl bg-[#fff3ef] p-5" : "mt-8"}>
                  <h2 id={`s-${key}`} className={`text-2xl font-semibold ${warn ? "text-[#8a2c17]" : "text-forest-900"}`}>{t(article.headings?.[key] ?? T[key])}</h2>
                  <ul className="mt-4 grid gap-2.5">
                    {items.map((li) => (
                      <li key={li.en} className="flex gap-3 text-lg leading-relaxed text-forest-800">
                        <CheckIcon size={20} className={`mt-1 shrink-0 ${warn ? "text-[#b23a1f]" : "text-forest-600"}`} /> {t(li)}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
            {article.faqs && article.faqs.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-semibold text-forest-900">{t(T.faq)}</h2>
                <div className="mt-4 divide-y divide-forest-100 rounded-2xl ring-1 ring-forest-100">
                  {article.faqs.map((f) => (
                    <details key={f.q.en} className="group px-5">
                      <summary className="flex items-center justify-between gap-4 py-4 font-semibold text-forest-900">{t(f.q)}<PlusIcon size={18} className="shrink-0 text-saffron-600 transition-transform group-open:rotate-45" /></summary>
                      <p className="pb-4 leading-relaxed text-forest-700">{t(f.a)}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
            {(refs.length > 0 || (article.customRefs?.length ?? 0) > 0) && (
              <section className="mt-10">
                <h2 className="text-xl font-semibold text-forest-900">{t(T.refs)}</h2>
                <p className="mt-1 text-sm text-forest-700">{t(T.refsNote)}</p>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[15px] text-forest-800">
                  {refs.map((r) => (
                    <li key={r.title}>
                      {r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline decoration-forest-300 underline-offset-2 hover:text-forest-900">{r.title}</a> : r.title}. {r.publisher}{r.year ? `, ${r.year}` : ""}.
                    </li>
                  ))}
                  {(article.customRefs ?? []).map((r) => <li key={r}>{r}</li>)}
                </ol>
              </section>
            )}
            <dl className="mt-10 grid gap-3 rounded-2xl bg-cream p-5 text-sm text-forest-800 sm:grid-cols-3">
              <div><dt className="font-semibold">{t(T.author)}</dt><dd><Link href={localePath(PROFILE_PATH, lang)} className="underline underline-offset-2">{t(DOCTOR.name)}</Link>, {DOCTOR.degrees}</dd></div>
              <div><dt className="font-semibold">{t(T.reviewer)}</dt><dd>{t(DOCTOR.name)}, MD Psychiatry</dd></div>
              <div><dt className="font-semibold">{t(T.reviewed)}</dt><dd><time dateTime={article.updated}>{fmt(article.updated, lang)}</time></dd></div>
            </dl>
            <p className="mt-6 text-sm text-forest-700/80">{t(T.disclaimer)}</p>
            <div className="mt-6">
              <ShareButton lang={lang} url={url} />
            </div>
          </div>

          {vids.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-forest-900">{t(T.relatedVideos)}</h2>
              <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                {vids.map((v) => (
                  <li key={v.id}><LiteYouTube id={v.id} title={v.title} playLabel={t(T.play)} /><p className="mt-2 text-sm font-medium text-forest-900">{v.title}</p></li>
                ))}
              </ul>
            </section>
          )}

          {more.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-forest-900">{t(T.relatedArticles)}</h2>
              <ul className="mt-3 grid gap-3">
                {more.map((a) => (
                  <li key={a.slug}>
                    <Link href={localePath(`/articles/${a.slug}`, lang)} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-forest-100 hover:ring-forest-500">
                      <span><span className="block font-semibold text-forest-900">{t(a.title)}</span><span className="text-sm text-forest-700">{t(a.category)} · {a.readMinutes} {t(T.min)}</span></span>
                      <ArrowRightIcon size={16} className="shrink-0 text-saffron-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-forest-900">{t(T.related)}</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {related.map((c) => (
                  <li key={c.slug}>
                    <Link href={localePath(`/${c.slug}`, lang)} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 font-medium text-forest-900 ring-1 ring-forest-100 hover:ring-forest-500">
                      {t(c.name)} <ArrowRightIcon size={16} className="text-saffron-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-8 rounded-3xl bg-forest-800 p-6 text-white">
            <p className="text-lg font-semibold">{t(T.cta)}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={localePath("/book-appointment", lang)} className="inline-flex rounded-full bg-saffron-500 px-6 py-3 font-semibold text-forest-900">{t(T.book)}</Link>
              <CallNowButton lang={lang} variant="ghost" />
            </div>
          </div>
        </article>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
