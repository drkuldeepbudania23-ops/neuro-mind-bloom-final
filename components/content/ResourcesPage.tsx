import Link from "next/link";
import { getCondition } from "../../lib/content/conditions";
import { CITY_LIST } from "../../lib/content/conditions/cities";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { ArrowRightIcon } from "../site/icons";

type Group = { title: { en: string; hi: string }; text: { en: string; hi: string }; links: string[] };

const GROUPS: Group[] = [
  {
    title: { en: "Students & young people", hi: "छात्र और युवा" },
    text: { en: "Exam pressure, coaching stress, focus, sleep, mobile and gaming.", hi: "परीक्षा का दबाव, कोचिंग का तनाव, ध्यान, नींद, मोबाइल और गेमिंग।" },
    links: ["student-exam-stress-india", "adhd-psychiatrist-india", "internet-addiction-treatment-india", "gaming-disorder-treatment-india"],
  },
  {
    title: { en: "Women", hi: "महिलाएँ" },
    text: { en: "Pregnancy, after childbirth, periods, menopause and family stress.", hi: "गर्भावस्था, डिलीवरी के बाद, पीरियड्स, मेनोपॉज़ और पारिवारिक तनाव।" },
    links: ["womens-mental-health-india", "depression-treatment-india", "anxiety-phobia-treatment-india", "ocd-treatment-india"],
  },
  {
    title: { en: "Children & parents", hi: "बच्चे और माता-पिता" },
    text: { en: "ADHD, autism, learning difficulties, behaviour and school problems.", hi: "ADHD, ऑटिज़्म, सीखने में कठिनाई, व्यवहार और स्कूल की समस्याएँ।" },
    links: ["child-psychiatrist-india", "adhd-psychiatrist-india", "autism-psychiatrist-india", "intellectual-disability-idd-india", "odd-conduct-disorder-india", "tic-tourette-movement-disorders-india", "specific-learning-disorder-india"],
  },
  {
    title: { en: "Families of people with addiction", hi: "नशे से जूझ रहे लोगों के परिवार" },
    text: { en: "How to help without fights, safe detox, and relapse prevention.", hi: "बिना झगड़े मदद कैसे करें, सुरक्षित डिटॉक्स और दोबारा नशा न हो।" },
    links: ["deaddiction-psychiatrist-india", "alcohol-addiction-treatment-india", "opioid-smack-heroin-opium-doda-addiction-india", "substance-use-disorders-treatment-india"],
  },
  {
    title: { en: "Older adults & caregivers", hi: "बुज़ुर्ग और देखभाल करने वाले" },
    text: { en: "Memory problems, late-life depression, sleep and medicine safety.", hi: "याददाश्त की समस्या, बुढ़ापे का डिप्रेशन, नींद और दवाओं की सुरक्षा।" },
    links: ["geriatric-psychiatry-india", "dementia-memory-clinic-india", "late-life-depression-india", "delirium-confusion-elderly-india", "post-stroke-depression-india"],
  },
  {
    title: { en: "Couples & sexual health", hi: "दंपति और यौन स्वास्थ्य" },
    text: { en: "Performance anxiety, PE, erection problems, dhat worries and relationship conflict.", hi: "परफॉर्मेंस की घबराहट, शीघ्रपतन, इरेक्शन, धात की चिंता और रिश्तों का तनाव।" },
    links: ["sex-specialist-india", "premature-ejaculation-treatment-india", "erectile-dysfunction-treatment-india", "dhat-syndrome-treatment-india"],
  },
];

const T = {
  title: { en: "Mental health resource hub", hi: "मानसिक स्वास्थ्य जानकारी केंद्र" },
  intro: {
    en: "Free, reliable guides in Hindi and English — choose the section that fits you or your family.",
    hi: "हिंदी और अंग्रेज़ी में निःशुल्क, भरोसेमंद जानकारी — अपने या परिवार के लिए सही हिस्सा चुनें।",
  },
  safe: { en: "A safe space for everyone", hi: "सबके लिए सुरक्षित जगह" },
  safeText: {
    en: "Care at Neuro Mind Bloom is respectful and non-judgemental for every person — regardless of gender, sexual orientation, religion, caste or background, including LGBTQ+ individuals.",
    hi: "Neuro Mind Bloom में हर व्यक्ति का इलाज सम्मान के साथ और बिना किसी जजमेंट के होता है — लिंग, यौन रुझान, धर्म, जाति या पृष्ठभूमि चाहे जो हो, LGBTQ+ लोगों सहित।",
  },
  tools: { en: "Tools", hi: "उपकरण" },
  selfCheck: { en: "Free self-checks", hi: "निःशुल्क स्व-जाँच" },
  library: { en: "All conditions", hi: "सभी बीमारियाँ" },
  nasha: { en: "Nasha mukti guide", hi: "नशा मुक्ति गाइड" },
  gupt: { en: "Gupt rog & sexual health", hi: "गुप्त रोग और यौन स्वास्थ्य" },
  therapy: { en: "Psychotherapy & counselling", hi: "साइकोथेरेपी और काउंसलिंग" },
  articles: { en: "Articles", hi: "लेख" },
  videos: { en: "Videos", hi: "वीडियो" },
  faq: { en: "FAQ", hi: "सवाल-जवाब" },
  cities: { en: "Online consultation across Rajasthan", hi: "पूरे राजस्थान में ऑनलाइन परामर्श" },
};

export default function ResourcesPage({ lang }: { lang: Lang }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const tools: [string, { en: string; hi: string }][] = [
    ["/self-assessment", T.selfCheck],
    ["/conditions", T.library],
    ["/nasha-mukti", T.nasha],
    ["/gupt-rog-sexual-health", T.gupt],
    ["/psychotherapy-counselling", T.therapy],
    ["/articles", T.articles],
    ["/videos", T.videos],
    ["/faq", T.faq],
  ];
  return (
    <div className="nmb min-h-screen bg-cream" lang={lang === "hi" ? "hi" : "en"}>
      <SiteHeader lang={lang} path="/resources" />
      <main>
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <h1 className="text-3xl font-semibold md:text-5xl">{t(T.title)}</h1>
            <p className="mt-3 max-w-3xl text-lg text-forest-100">{t(T.intro)}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {tools.map(([href, label]) => (
                <li key={href}>
                  <Link href={localePath(href, lang)} className="inline-flex rounded-full bg-white/10 px-4 py-2 font-medium hover:bg-saffron-500 hover:text-forest-900">
                    {t(label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-12 md:grid-cols-2 md:px-6">
          {GROUPS.map((g) => (
            <section key={g.title.en} className="rounded-3xl bg-white p-6 ring-1 ring-forest-100">
              <h2 className="text-2xl font-semibold text-forest-900">{t(g.title)}</h2>
              <p className="mt-1 text-forest-700">{t(g.text)}</p>
              <ul className="mt-4 grid gap-2">
                {g.links.map((slug) => {
                  const c = getCondition(slug);
                  if (!c) return null;
                  return (
                    <li key={slug}>
                      <Link href={localePath(`/${slug}`, lang)} className="flex items-center justify-between rounded-xl bg-cream px-4 py-3 font-medium text-forest-900 hover:bg-forest-50">
                        {t(c.name)} <ArrowRightIcon size={16} className="text-saffron-600" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          <section className="rounded-3xl bg-forest-800 p-6 text-white md:col-span-2">
            <h2 className="text-2xl font-semibold">{t(T.safe)}</h2>
            <p className="mt-2 max-w-3xl text-forest-100">{t(T.safeText)}</p>
          </section>

          <section className="rounded-3xl bg-white p-6 ring-1 ring-forest-100 md:col-span-2">
            <h2 className="text-2xl font-semibold text-forest-900">{t(T.cities)}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[{ slug: "psychiatrist-ajmer", name: { en: "Ajmer", hi: "अजमेर" } }, ...CITY_LIST.map((c) => ({ slug: c.slug, name: c.name }))].map((c) => (
                <li key={c.slug}>
                  <Link href={localePath(`/${c.slug}`, lang)} className="inline-flex rounded-full bg-forest-50 px-4 py-2 text-forest-800 ring-1 ring-forest-100 hover:ring-forest-500">
                    {t(c.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
