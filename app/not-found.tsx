import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "../components/site/SiteFooter";
import SiteHeader from "../components/site/SiteHeader";
import { CRISIS_HELPLINE } from "../lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const LINKS: { href: string; en: string; hi: string }[] = [
  { href: "/", en: "Home", hi: "होम" },
  { href: "/book-appointment", en: "Book a consultation", hi: "परामर्श बुक करें" },
  { href: "/conditions", en: "Conditions we treat", hi: "जिन बीमारियों का इलाज होता है" },
  { href: "/articles", en: "Articles", hi: "लेख" },
  { href: "/self-assessment", en: "Self-assessment", hi: "सेल्फ़-असेसमेंट" },
  { href: "/contact", en: "Contact", hi: "संपर्क" },
];

/** Bilingual 404 for every unknown URL (English and /hi). */
export default function NotFound() {
  return (
    <div className="nmb min-h-screen bg-cream">
      <SiteHeader lang="en" path="/" />
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-forest-600">404</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-forest-900">This page could not be found</h1>
        <p lang="hi" className="mt-2 text-2xl font-semibold text-forest-800">यह पेज नहीं मिला</p>
        <p className="mt-4 text-forest-800">The link may be old or mistyped. These pages may help:</p>
        <p lang="hi" className="text-forest-800">लिंक पुराना या ग़लत हो सकता है। ये पेज मदद कर सकते हैं:</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <ul className="grid gap-2" aria-label="English">
            {LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} className="font-semibold text-forest-800 underline-offset-4 hover:underline">{l.en}</Link></li>
            ))}
          </ul>
          <ul lang="hi" className="grid gap-2" aria-label="हिन्दी">
            {LINKS.map((l) => (
              <li key={l.href}><Link href={l.href === "/" ? "/hi" : `/hi${l.href}`} className="font-semibold text-forest-800 underline-offset-4 hover:underline">{l.hi}</Link></li>
            ))}
          </ul>
        </div>
        <p className="mt-10 rounded-2xl bg-white p-4 text-sm text-forest-800 ring-1 ring-forest-100">
          Need urgent mental health support? Call {CRISIS_HELPLINE.name} {CRISIS_HELPLINE.number} (free, 24×7) or 112 in an emergency.
          <span lang="hi" className="block">तुरंत मदद चाहिए? {CRISIS_HELPLINE.name} {CRISIS_HELPLINE.number} (मुफ़्त, 24×7) या इमरजेंसी में 112 पर कॉल करें।</span>
        </p>
      </main>
      <SiteFooter lang="en" />
    </div>
  );
}
