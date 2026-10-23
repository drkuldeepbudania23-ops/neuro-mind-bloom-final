import type { Lang } from "../../lib/i18n";
import { tr } from "../../lib/i18n";
import { SOCIAL } from "../../lib/site";
import type { YouTubeVideo } from "../../lib/youtube/feed";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { FollowButtons } from "../site/Social";
import { SocialIcon } from "../site/icons";

const T = {
  title: { en: "Videos by Dr. Kuldeep Budania", hi: "डॉ. कुलदीप बुडानिया के वीडियो" },
  intro: {
    en: "Simple explanations of mental health, de-addiction and sexual health — mostly in Hindi. New videos appear here automatically.",
    hi: "मानसिक स्वास्थ्य, नशा मुक्ति और यौन स्वास्थ्य की आसान जानकारी — ज़्यादातर हिंदी में। नए वीडियो यहाँ अपने आप दिखते हैं।",
  },
  latest: { en: "Latest video", hi: "नया वीडियो" },
  more: { en: "More videos", hi: "और वीडियो" },
  empty: {
    en: "Videos could not be loaded right now. Watch all videos on our YouTube channel.",
    hi: "अभी वीडियो लोड नहीं हो पाए। सभी वीडियो हमारे YouTube चैनल पर देखें।",
  },
  channel: { en: "Open YouTube channel", hi: "YouTube चैनल खोलें" },
};

export default function VideosPage({ lang, videos }: { lang: Lang; videos: YouTubeVideo[] }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const [first, ...rest] = videos;
  const date = (iso: string) =>
    iso ? new Date(iso).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";

  return (
    <div className="nmb min-h-screen bg-cream" lang={lang === "hi" ? "hi" : "en"}>
      <SiteHeader lang={lang} path="/videos" />
      <main>
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <h1 className="text-3xl font-semibold md:text-5xl">{t(T.title)}</h1>
            <p className="mt-3 max-w-3xl text-lg text-forest-100">{t(T.intro)}</p>
            <div className="mt-6">
              <FollowButtons lang={lang} />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          {!first ? (
            <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-forest-100">
              <p className="text-lg text-forest-800">{t(T.empty)}</p>
              <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#ff0000] px-6 py-3 font-semibold text-white">
                <SocialIcon name="youtube" size={20} /> {t(T.channel)}
              </a>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-forest-900">{t(T.latest)}</h2>
              <div className="mt-4 overflow-hidden rounded-3xl bg-black shadow-[0_20px_60px_rgba(6,43,49,0.18)]">
                <div className="relative aspect-video">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${first.id}`}
                    title={first.title}
                    loading="lazy"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
              <p className="mt-3 text-lg font-semibold text-forest-900">{first.title}</p>

              {rest.length > 0 && (
                <>
                  <h2 className="mt-12 text-2xl font-semibold text-forest-900">{t(T.more)}</h2>
                  <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((v) => (
                      <li key={v.id}>
                        <a
                          href={`https://www.youtube.com/watch?v=${v.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-forest-100 hover:ring-forest-500"
                        >
                          <span className="relative block aspect-video bg-forest-900">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover" />
                            <span className="absolute inset-0 grid place-items-center">
                              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#ff0000] text-white shadow-lg transition group-hover:scale-110">
                                <SocialIcon name="youtube" size={22} />
                              </span>
                            </span>
                          </span>
                          <span className="block p-4">
                            <span className="line-clamp-2 font-semibold text-forest-900">{v.title}</span>
                            <span className="mt-1 block text-sm text-forest-700/80">{date(v.published)}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
