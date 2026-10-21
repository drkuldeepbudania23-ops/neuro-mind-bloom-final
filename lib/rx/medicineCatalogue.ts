import { consernBrandRows } from "../../data/consern-brand-catalogue";
import { EXTRA_BRANDS, EXTRA_GENERICS } from "../../data/extra-brands";
import { medicines } from "../../data/medicines";
import { officialBrandRows } from "../../data/official-brand-catalogue";
import { psychiatryBrands } from "../../data/psychiatryBrands";

/** One searchable brand + strength line. */
export type MedRow = {
  generic: string;
  brand: string;
  strength: string;
  company: string;
  form: string;
  category: string;
  source: "core" | "psychiatry" | "extra" | "official" | "consern" | "custom";
  /** Brand/strength pairing not taken from a pack-level source — show "verify pack". */
  verify?: boolean;
};

export type CustomMedicine = { generic: string; brand: string; strength?: string; form?: string; company?: string; category?: string };

const PSYCH = /ssri|snri|nassa|ndri|tca|sari|antidepress|antipsych|mood|benzo|anxio|hypnotic|sleep|adhd|dementia|antiepilep|anticholinergic|dependence|nicotine|ejacul|erectile|wakeful|psychiatr/i;

function cleanGeneric(g: string): string {
  return g
    .replace(/[?"]/g, "")
    .replace(/^\s*-\s*/, "")
    .replace(/^\((.*)\)$/, "$1")
    .replace(/\b(tablets?|capsules?|injection)\s+(i\.?p\.?|b\.?p\.?|u\.?s\.?p\.?)\.?/gi, "")
    .replace(/\s+(i\.?p\.?|b\.?p\.?|u\.?s\.?p\.?)\.?$/i, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function buildRows(): MedRow[] {
  const rows: MedRow[] = [];
  // Pack-level psychiatry list first: it wins when the same brand + strength appears elsewhere.
  for (const p of psychiatryBrands) rows.push({ generic: p.generic, brand: p.brand, strength: p.strength, company: p.company, form: "", category: p.category, source: "psychiatry" });
  const strengthsOf = new Map<string, { strengths: string[]; form: string; category: string }>();

  for (const m of medicines) {
    const form = Array.isArray(m.form) ? m.form.join(" / ") : String(m.form ?? "");
    strengthsOf.set(m.generic.toLowerCase(), { strengths: m.strengths?.length ? m.strengths : [""], form, category: m.category });
    const details = m.brandDetails?.length ? m.brandDetails : m.brands.map((name) => ({ name, company: "", strength: "", form: "" }));
    if (details.length === 0) {
      for (const st of m.strengths?.length ? m.strengths : [""]) rows.push({ generic: m.generic, brand: "", strength: st, company: "", form, category: m.category, source: "core" });
    }
    for (const d of details) {
      const strengths = d.strength ? [d.strength] : m.strengths?.length ? m.strengths : [""];
      for (const st of strengths) rows.push({ generic: m.generic, brand: d.name, strength: st, company: d.company || "", form: d.form || form, category: m.category, source: "core" });
    }
  }

  for (const e of EXTRA_BRANDS) {
    const base = strengthsOf.get(e.generic.toLowerCase());
    if (!base) continue;
    for (const st of base.strengths) rows.push({ generic: e.generic, brand: e.brand, strength: st, company: e.company || "", form: base.form, category: base.category, source: "extra", verify: true });
  }
  for (const g of EXTRA_GENERICS) {
    const brands = g.brands.length ? g.brands : [{ name: "", company: "" }];
    for (const br of brands) for (const st of g.strengths) rows.push({ generic: g.generic, brand: br.name, strength: st, company: br.company || "", form: g.form || "Tablet", category: g.category, source: "extra", verify: Boolean(br.name) });
  }

  for (const r of consernBrandRows) rows.push({ generic: r.generic, brand: r.brand, strength: r.strength || "", company: r.company || "", form: r.form || "", category: r.category || "", source: "consern" });
  for (const r of officialBrandRows) {
    if (/animal|veterinar/i.test(r.category || "")) continue;
    rows.push({ generic: cleanGeneric(r.generic || ""), brand: (r.brand || "").trim(), strength: r.strength || "", company: r.company || "", form: r.form || "", category: r.category || "", source: "official" });
  }
  return rows;
}

/** "Feliz S 10" + "10 mg" and "Feliz S" + "10 mg" are the same product. */
export function brandBase(brand: string, strength: string): string {
  const n = strength.match(/[0-9.]+/)?.[0];
  let b = brand.trim();
  if (n) b = b.replace(new RegExp(`[\\s-]+${n.replace(".", "\\.")}$`), "");
  return b;
}

function dedupeKey(r: MedRow): string {
  const st = r.strength.toLowerCase().replace(/\s+/g, "");
  return [r.generic.toLowerCase().trim(), brandBase(r.brand, r.strength).toLowerCase().replace(/[^a-z0-9]/g, ""), st].join("|");
}

/** Label for the result list: avoids "Nexito 10 10 mg". */
export function displayName(r: Pick<MedRow, "brand" | "strength" | "generic">): string {
  const brand = r.brand || r.generic;
  if (!r.strength) return brand;
  return brandBase(brand, r.strength) !== brand.trim() ? brand : `${brand} ${r.strength}`;
}

let CACHE: MedRow[] | null = null;
/** All built-in rows (built once, deduplicated). */
export function catalogue(): MedRow[] {
  if (CACHE) return CACHE;
  const all = buildRows();
  const bb = (r: MedRow) => brandBase(r.brand, r.strength).toLowerCase().replace(/[^a-z0-9]/g, "");
  const st = (r: MedRow) => r.strength.toLowerCase().replace(/\s+/g, "");
  // Pack-level sources: psychiatry list, official and Consern catalogues.
  const packLevel = all.filter((r) => r.source === "psychiatry" || r.source === "official" || r.source === "consern");
  const packKeys = new Set(packLevel.map((r) => `${bb(r)}|${st(r)}`));
  const companyOf = new Map<string, string>();
  for (const r of packLevel) if (r.company && bb(r) && !companyOf.has(bb(r))) companyOf.set(bb(r), r.company);
  const seen = new Map<string, MedRow>();
  for (const r0 of all) {
    let r = r0;
    if (r.source !== "psychiatry" && r.source !== "official" && r.source !== "consern" && r.brand) {
      if (r.source === "extra" && packKeys.has(`${bb(r)}|${st(r)}`)) continue; // a verified pack row already exists
      const known = companyOf.get(bb(r));
      if (known && known !== r.company) r = { ...r, company: known };
    }
    const key = dedupeKey(r);
    if (!seen.has(key)) seen.set(key, r);
  }
  CACHE = Array.from(seen.values());
  return CACHE;
}

export function customRows(list: CustomMedicine[]): MedRow[] {
  return list
    .filter((c) => c.generic?.trim() || c.brand?.trim())
    .map((c) => ({ generic: c.generic.trim(), brand: c.brand.trim(), strength: (c.strength || "").trim(), company: (c.company || "").trim(), form: (c.form || "").trim(), category: c.category || "Added by doctor", source: "custom" as const }));
}

const norm = (v: string) => v.toLowerCase().replace(/\s+/g, " ").trim();
const compact = (v: string) => v.toLowerCase().replace(/[^a-z0-9.+]/g, "");
const num = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) || 0;

/**
 * Ranked search: every word must match (brand, generic, company, strength, form or category),
 * spaces/hyphens ignored ("s citadep" = "S-Citadep"). Brand matches rank first, then generic,
 * psychiatry medicines before others, doctor-added brands before catalogue rows.
 */
export function searchMedicines(query: string, extra: MedRow[] = [], limit = 200): MedRow[] {
  const q = norm(query);
  if (!q) return [];
  const words = q.split(" ");
  const cq = compact(q);
  const out: { r: MedRow; score: number }[] = [];
  for (const r of [...extra, ...catalogue()]) {
    const hay = norm(`${r.brand} ${r.generic} ${r.company} ${r.strength} ${r.form} ${r.category}`);
    const chay = compact(hay);
    if (!words.every((w) => hay.includes(w) || chay.includes(compact(w)))) continue;
    const b = compact(r.brand);
    const g = compact(r.generic);
    let score = 6;
    if (b && b === cq) score = 0;
    else if (b && (b.startsWith(cq) || cq.startsWith(b))) score = 1;
    else if (g.startsWith(cq) || cq.startsWith(g)) score = 2;
    else if (b && b.startsWith(compact(words[0]))) score = 3;
    else if (g.startsWith(compact(words[0])) || norm(r.generic).split(/[ +/(]+/).some((x) => x.startsWith(words[0]))) score = 4;
    else if (hay.includes(q)) score = 5;
    if (PSYCH.test(r.category)) score -= 0.5;
    if (r.source === "custom") score -= 0.25;
    if (r.source === "official" || r.source === "consern") score += 0.2;
    out.push({ r, score });
  }
  return out
    .sort((a, b) => a.score - b.score || a.r.generic.localeCompare(b.r.generic) || brandBase(a.r.brand, a.r.strength).localeCompare(brandBase(b.r.brand, b.r.strength)) || num(a.r.strength) - num(b.r.strength))
    .slice(0, limit)
    .map((x) => x.r);
}
