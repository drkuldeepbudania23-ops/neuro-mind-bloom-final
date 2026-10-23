import type { MetadataRoute } from "next";
import { ARTICLES } from "../lib/content/articles";
import { CONDITIONS } from "../lib/content/conditions";
import { ASSESSMENT_ORDER } from "../lib/assessments";
import { REGIONS } from "../lib/content/regions";
import { SITE_URL } from "../lib/site";

/** Every public page exists in English (/path) and Hindi (/hi/path). */
const CORE: [string, number][] = [
  ["/", 1],
  ["/book-appointment", 0.9],
  ["/nasha-mukti", 0.9],
  ["/gupt-rog-sexual-health", 0.9],
  ["/conditions", 0.8],
  ["/self-assessment", 0.8],
  ["/contact", 0.8],
  ["/resources", 0.7],
  ["/faq", 0.7],
  ["/articles", 0.7],
  ["/videos", 0.6],
  ["/student-mental-health", 0.8],
  ["/psychotherapy", 0.8],
  ["/dr-kuldeep-budania", 0.9],
  ["/locations", 0.7],
  ["/international", 0.5],
  ["/feedback", 0.4],
  ["/recovery-stories", 0.5],
  ["/privacy-policy", 0.3],
  ["/terms-and-conditions", 0.3],
  ["/refund-policy", 0.3],
];

function urls(path: string) {
  const en = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const hi = path === "/" ? `${SITE_URL}/hi` : `${SITE_URL}/hi${path}`;
  return { en, hi };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: [string, number, "weekly" | "monthly"][] = [
    ...CORE.map(([p, pr]) => [p, pr, "weekly"] as [string, number, "weekly"]),
    ...CONDITIONS.map((c) => [`/${c.slug}`, c.category === "service" ? 0.7 : 0.8, "monthly"] as [string, number, "monthly"]),
    ...ARTICLES.map((a) => [`/articles/${a.slug}`, 0.6, "monthly"] as [string, number, "monthly"]),
    ...REGIONS.map((r) => [`/locations/${r.slug}`, 0.6, "monthly"] as [string, number, "monthly"]),
    ...ASSESSMENT_ORDER.map((id) => [`/self-assessment/${id}`, 0.6, "monthly"] as [string, number, "monthly"]),
  ];

  return entries.flatMap(([path, priority, changeFrequency]) => {
    const { en, hi } = urls(path);
    const alternates = { languages: { "en-IN": en, "hi-IN": hi } };
    return [
      { url: en, lastModified, changeFrequency, priority, alternates },
      { url: hi, lastModified, changeFrequency, priority, alternates },
    ];
  });
}
