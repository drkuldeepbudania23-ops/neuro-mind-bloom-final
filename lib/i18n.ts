/**
 * Minimal, dependency-free bilingual support.
 *
 * Every public page exists at two URLs:
 *   English: /something        Hindi: /hi/something
 * so that Google can index both languages separately (hreflang alternates).
 * Components receive `lang` as a prop — no client-side language state, which
 * keeps pages server-rendered and fast.
 */

export const LANGS = ["en", "hi"] as const;
export type Lang = (typeof LANGS)[number];

/** A string available in both languages. */
export type L10n = { en: string; hi: string };

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "hi";
}

/** Pick the right language from a bilingual value. */
export function tr(value: L10n, lang: Lang): string {
  return value[lang] || value.en;
}

/** Build the path for a page in a given language. `path` is the English path. */
export function localePath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return clean;
  return clean === "/" ? "/hi" : `/hi${clean}`;
}

/** Strip the /hi prefix, returning the English path. */
export function basePath(pathname: string): string {
  if (pathname === "/hi") return "/";
  if (pathname.startsWith("/hi/")) return pathname.slice(3);
  return pathname || "/";
}

export function langFromPath(pathname: string): Lang {
  return pathname === "/hi" || pathname.startsWith("/hi/") ? "hi" : "en";
}

/** hreflang alternates for Next.js `metadata.alternates`. */
export function alternatesFor(path: string, siteUrl: string, lang: Lang) {
  const en = `${siteUrl}${localePath(path, "en") === "/" ? "" : localePath(path, "en")}`;
  const hi = `${siteUrl}${localePath(path, "hi")}`;
  return {
    canonical: lang === "en" ? en : hi,
    languages: { "en-IN": en, "hi-IN": hi, "x-default": en },
  };
}
