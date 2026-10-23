import Link from "next/link";
import type { Metadata } from "next";
import { POLICIES, POLICY_EFFECTIVE, getPolicy, type Policy } from "../../lib/content/policies";
import type { Lang } from "../../lib/i18n";
import { alternatesFor, localePath, tr } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";

const T = {
  effective: { en: "Effective from", hi: "लागू तिथि" },
  related: { en: "Related policies", hi: "दूसरी नीतियाँ" },
  questions: { en: "Questions? Contact us", hi: "कोई सवाल? संपर्क करें" },
};

export function policyMetadata(slug: Policy["slug"], lang: Lang): Metadata {
  const p = getPolicy(slug);
  return {
    title: tr(p.title, lang),
    description: tr(p.description, lang),
    alternates: alternatesFor(`/${slug}`, SITE_URL, lang),
  };
}

export default function PolicyPage({ slug, lang }: { slug: Policy["slug"]; lang: Lang }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const policy = getPolicy(slug);
  return (
    <div className="nmb min-h-screen bg-cream" lang={lang === "hi" ? "hi" : "en"}>
      <SiteHeader lang={lang} path={`/${slug}`} />
      <main>
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
            <h1 className="text-3xl font-semibold md:text-5xl">{t(policy.title)}</h1>
            <p className="mt-3 text-lg text-forest-100">{t(policy.intro)}</p>
            <p className="mt-4 text-sm text-forest-200">
              {t(T.effective)}: {t(POLICY_EFFECTIVE)}
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
          <div className="grid gap-8 rounded-3xl bg-white p-6 ring-1 ring-forest-100 md:p-10">
            {policy.sections.map((s) => (
              <section key={s.h.en}>
                <h2 className="text-xl font-semibold text-forest-900 md:text-2xl">{t(s.h)}</h2>
                {s.p.map((para) => (
                  <p key={para.en.slice(0, 40)} className="mt-3 leading-relaxed text-forest-700">
                    {t(para)}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <nav aria-label={t(T.related)} className="mt-8 flex flex-wrap gap-3">
            {POLICIES.filter((p) => p.slug !== slug).map((p) => (
              <Link
                key={p.slug}
                href={localePath(`/${p.slug}`, lang)}
                className="rounded-full bg-white px-5 py-2.5 font-semibold text-forest-800 ring-1 ring-forest-200 hover:bg-forest-50"
              >
                {t(p.title)}
              </Link>
            ))}
            <Link
              href={localePath("/contact", lang)}
              className="rounded-full bg-forest-800 px-5 py-2.5 font-semibold text-white hover:bg-forest-900"
            >
              {t(T.questions)}
            </Link>
          </nav>
        </div>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
