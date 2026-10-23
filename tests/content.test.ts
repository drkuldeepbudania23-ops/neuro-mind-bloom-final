import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import test from "node:test";
import { ARTICLES } from "../lib/content/articles";
import { CONDITIONS, getCondition } from "../lib/content/conditions";
import { conditions as homeCards } from "../lib/content/home";
import { HUBS } from "../lib/content/hubs";

function bilingual(v: unknown, where: string) {
  const o = v as { en?: string; hi?: string };
  assert.ok(o && typeof o.en === "string" && o.en.trim(), `missing en: ${where}`);
  assert.ok(typeof o.hi === "string" && o.hi.trim(), `missing hi: ${where}`);
  assert.ok(/[ऀ-ॿ]/.test(o.hi!) || /^[A-Z0-9 ()/&+-]+$/.test(o.hi!), `hi text has no Devanagari: ${where} → ${o.hi}`);
}

test("every condition page is complete in English and Hindi", () => {
  const slugs = new Set<string>();
  for (const c of CONDITIONS) {
    assert.ok(!slugs.has(c.slug), `duplicate slug ${c.slug}`);
    slugs.add(c.slug);
    for (const key of ["name", "title", "h1", "description"] as const) bilingual(c[key], `${c.slug}.${key}`);
    for (const key of ["intro", "symptoms", "causes", "treatment", "seekHelp"] as const) {
      assert.ok(c[key].length > 0, `${c.slug}.${key} empty`);
      c[key].forEach((v, i) => bilingual(v, `${c.slug}.${key}[${i}]`));
    }
    assert.ok(c.faqs.length >= 3, `${c.slug} needs ≥3 FAQs`);
    c.faqs.forEach((f, i) => { bilingual(f.q, `${c.slug}.faq${i}.q`); bilingual(f.a, `${c.slug}.faq${i}.a`); });
    for (const r of c.related) assert.ok(getCondition(r), `${c.slug} → unknown related ${r}`);
    assert.ok(c.description.en.length <= 200, `${c.slug} description too long for search snippet`);
  }
});

test("all 30 old live SEO URLs still exist", () => {
  const old = readdirSync("archive/app/old-seo-pages");
  assert.equal(old.length, 30);
  for (const slug of old) assert.ok(getCondition(slug), `old URL lost: /${slug}`);
});

test("internal links from homepage, hubs and articles point to real pages", () => {
  for (const card of homeCards) assert.ok(getCondition(card.href.slice(1)), `home card → ${card.href}`);
  for (const hub of HUBS) for (const card of hub.cards) assert.ok(getCondition(card.href.slice(1)), `${hub.slug} card → ${card.href}`);
  for (const a of ARTICLES) {
    bilingual(a.title, a.slug);
    for (const r of a.related) assert.ok(getCondition(r), `${a.slug} → ${r}`);
  }
});
