import type { L10n } from "../i18n";
import { ASSESSMENTS, ASSESSMENT_ORDER } from "../assessments";
import { ARTICLES } from "./articles";
import { CONDITIONS } from "./conditions";
import { groupLabel, groupOf } from "./library";

/**
 * Site search (pure, unit-tested). Works in English, Hindi and Hinglish
 * ("daru", "neend", "ghabrahat"): common Hinglish words are expanded to
 * English topic words before matching.
 */

export type SearchKind = "condition" | "therapy" | "article" | "test" | "page";
export type SearchEntry = { path: string; kind: SearchKind; title: L10n; text: L10n; group?: L10n; keywords: string[] };

const HINGLISH: Record<string, string[]> = {
  daru: ["alcohol"], sharab: ["alcohol"], peena: ["alcohol"],
  afeem: ["opium"], afim: ["opium"], doda: ["doda", "poppy"], post: ["poppy"], smack: ["smack", "heroin"], chitta: ["heroin", "smack"],
  ganja: ["cannabis", "ganja"], charas: ["cannabis", "charas"], bhang: ["cannabis"], gutka: ["tobacco"], gutkha: ["tobacco"], khaini: ["tobacco"],
  bidi: ["tobacco"], beedi: ["tobacco"], cigarette: ["tobacco", "nicotine"], sigret: ["tobacco"], nasha: ["addiction", "nasha"], goli: ["pills", "sedative"],
  neend: ["sleep", "insomnia"], anidra: ["insomnia"], ghabrahat: ["anxiety", "panic"], chinta: ["anxiety", "worry"], dar: ["fear", "phobia"],
  udasi: ["depression"], udaas: ["depression"], tension: ["stress", "anxiety"], tanav: ["stress"], vaham: ["ocd"], vahem: ["ocd"], wahem: ["ocd"], shak: ["suspicion", "ocd", "psychosis"],
  awaz: ["voices", "psychosis", "schizophrenia"], pagal: ["psychosis"], yaad: ["memory", "dementia"], bhoolna: ["memory", "dementia"], mirgi: ["epilepsy", "seizure"], daura: ["seizure", "dissociative"],
  gussa: ["anger"], chidchida: ["irritable", "anger"], padhai: ["study", "student"], pariksha: ["exam"], exam: ["exam", "student"], coaching: ["student", "exam"],
  dhat: ["dhat"], swapnadosh: ["dhat", "night emission"], gupt: ["sexual"], sex: ["sexual"], shighrapatan: ["premature ejaculation"], napunsakta: ["erectile dysfunction"],
  bacha: ["child"], baccha: ["child"], bachcha: ["child"], budhapa: ["elderly", "geriatric"], buzurg: ["elderly", "geriatric"], mobile: ["gaming", "internet", "social media"], game: ["gaming"],
  satta: ["gambling", "betting"], jua: ["gambling"], khudkushi: ["suicide", "crisis"], aatmhatya: ["suicide", "crisis"], delivery: ["postpartum", "pregnancy"], periods: ["premenstrual", "pmdd"],
};

export function normaliseQuery(q: string): string {
  return q.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 80);
}

export function expandTokens(q: string): string[] {
  const tokens = normaliseQuery(q).split(" ").filter((t) => t.length >= 2 || /[ऀ-ॿ]/.test(t));
  const out = new Set<string>(tokens);
  for (const t of tokens) for (const extra of HINGLISH[t] ?? []) out.add(extra);
  return [...out];
}

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const c of CONDITIONS) {
    const g = groupOf(c);
    entries.push({
      path: `/${c.slug}`,
      kind: g === "therapy" ? "therapy" : c.category === "service" ? "page" : "condition",
      title: c.name,
      text: c.description,
      group: groupLabel(g),
      keywords: [...(c.keywords ?? []), c.slug.replace(/-/g, " "), ...(c.icd?.icd10 ? [c.icd.icd10.toLowerCase()] : [])],
    });
  }
  for (const a of ARTICLES) entries.push({ path: `/articles/${a.slug}`, kind: "article", title: a.title, text: a.excerpt, keywords: [] });
  for (const id of ASSESSMENT_ORDER) {
    const t = ASSESSMENTS[id];
    entries.push({ path: `/self-assessment/${id}`, kind: "test", title: t.title, text: t.intro ?? t.about, keywords: ["test", "self check", "screening", id] });
  }
  const pages: [string, L10n, L10n, string[]][] = [
    ["/nasha-mukti", { en: "Nasha Mukti – de-addiction centre", hi: "नशा मुक्ति केंद्र" }, { en: "Alcohol, opium, doda post, smack, ganja, tobacco and pills — safe medical treatment.", hi: "शराब, अफ़ीम, डोडा पोस्त, स्मैक, गांजा, तंबाकू और गोलियाँ — सुरक्षित डॉक्टरी इलाज।" }, ["addiction", "nasha", "de-addiction", "rehab"]],
    ["/gupt-rog-sexual-health", { en: "Sexual health (gupt rog)", hi: "यौन स्वास्थ्य (गुप्त रोग)" }, { en: "Confidential treatment for sexual problems.", hi: "यौन समस्याओं का गोपनीय इलाज।" }, ["sexual", "gupt rog", "sexologist"]],
    ["/student-mental-health", { en: "Student Mental Health Centre", hi: "छात्र मानसिक स्वास्थ्य केंद्र" }, { en: "NEET, JEE, NEET-PG, MBBS and residency stress — guidance for students and parents.", hi: "NEET, JEE, NEET-PG, MBBS और रेज़िडेंसी का तनाव — छात्रों और अभिभावकों के लिए मार्गदर्शन।" }, ["student", "exam", "neet", "jee", "kota", "coaching"]],
    ["/psychotherapy", { en: "Psychotherapy centre", hi: "साइकोथेरेपी केंद्र" }, { en: "CBT, REBT, ERP, DBT skills, family, couples and marital therapy explained.", hi: "CBT, REBT, ERP, DBT स्किल्स, परिवार, दंपति और वैवाहिक थेरेपी की जानकारी।" }, ["therapy", "counselling", "counseling", "psychologist"]],
    ["/self-assessment", { en: "Free self-assessments", hi: "निःशुल्क स्व-जाँच" }, { en: "PHQ-9, GAD-7, AUDIT, ASRS, PHQ-15 and clinic checklists.", hi: "PHQ-9, GAD-7, AUDIT, ASRS, PHQ-15 और क्लिनिक लक्षण-सूचियाँ।" }, ["test", "screening", "quiz"]],
    ["/book-appointment", { en: "Book a consultation", hi: "परामर्श बुक करें" }, { en: "Book online or on WhatsApp.", hi: "ऑनलाइन या WhatsApp पर बुक करें।" }, ["appointment", "booking", "fees", "consultation"]],
    ["/contact", { en: "Contact", hi: "संपर्क" }, { en: "Phone, WhatsApp and email.", hi: "फ़ोन, WhatsApp और ईमेल।" }, ["phone", "whatsapp", "address"]],
    ["/videos", { en: "Videos", hi: "वीडियो" }, { en: "Educational videos from our YouTube channel.", hi: "हमारे YouTube चैनल के जानकारी वाले वीडियो।" }, ["youtube", "video"]],
  ];
  for (const [path, title, text, keywords] of pages) entries.push({ path, kind: "page", title, text, keywords });
  return entries;
}

export function searchSite(index: SearchEntry[], query: string, limit = 30): SearchEntry[] {
  const tokens = expandTokens(query);
  if (!tokens.length) return [];
  const scored = index
    .map((e) => {
      const title = `${e.title.en} ${e.title.hi}`.toLowerCase();
      const text = `${e.text.en} ${e.text.hi} ${e.group?.en ?? ""} ${e.group?.hi ?? ""}`.toLowerCase();
      const keys = e.keywords.join(" ").toLowerCase();
      let score = 0;
      let matched = 0;
      for (const t of tokens) {
        let hit = false;
        if (title.includes(t)) { score += 5; hit = true; }
        if (keys.includes(t)) { score += 3; hit = true; }
        if (text.includes(t)) { score += 1; hit = true; }
        if (hit) matched++;
      }
      if (e.kind === "condition") score += 0.5;
      return { e, score, matched };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.matched - a.matched || b.score - a.score);
  return scored.slice(0, limit).map((x) => x.e);
}
