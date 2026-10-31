import assert from "node:assert/strict";
import test from "node:test";
import { ARTICLE_CATS, ARTICLES } from "../lib/content/articles";
import { getCondition } from "../lib/content/conditions";
import { REFERENCES } from "../lib/content/references";

const DEVANAGARI = /[ऀ-ॿ]/;

test("articles: unique slugs, bilingual, valid links and references", () => {
  const seen = new Set<string>();
  const titles = new Set<string>();
  for (const a of ARTICLES) {
    assert.ok(!seen.has(a.slug), `duplicate slug ${a.slug}`);
    seen.add(a.slug);
    assert.ok(!titles.has(a.title.en), `duplicate title ${a.title.en}`);
    titles.add(a.title.en);
    assert.ok(a.cat in ARTICLE_CATS, `${a.slug}: bad cat`);
    for (const l of [a.title, a.excerpt]) assert.ok(l.en.trim() && DEVANAGARI.test(l.hi), `${a.slug}: missing Hindi`);
    assert.ok(a.excerpt.en.length <= 200, `${a.slug}: meta description too long (${a.excerpt.en.length})`);
    for (const r of a.related) assert.ok(getCondition(r), `${a.slug} → unknown condition ${r}`);
    for (const r of a.refs ?? []) assert.ok(REFERENCES[r], `${a.slug} → unknown reference ${r}`);
    assert.ok((a.refs?.length ?? 0) >= 1, `${a.slug}: needs at least one reference`);
    assert.ok((a.faqs?.length ?? 0) >= 2, `${a.slug}: needs FAQs`);
  }
});

test("structured articles carry every required section", () => {
  for (const a of ARTICLES.filter((x) => x.intro)) {
    for (const k of ["keyConcepts", "symptoms", "causes", "riskFactors", "management", "whenHelp"] as const) {
      assert.ok((a[k]?.length ?? 0) >= 2, `${a.slug}: section ${k} missing`);
      for (const item of a[k]!) assert.ok(item.en.trim() && DEVANAGARI.test(item.hi), `${a.slug}.${k}: Hindi missing for "${item.en}"`);
    }
  }
});

test("no medicine brand or drug names in article text", () => {
  const names = /\b(buprenorphine|methadone|naltrexone|naloxone|disulfiram|acamprosate|alprazolam|clonazepam|lorazepam|diazepam|zolpidem|tramadol|escitalopram|sertraline|fluoxetine|paroxetine|olanzapine|risperidone|quetiapine|aripiprazole|lithium|valproate|sildenafil|tadalafil|dapoxetine|methylphenidate|atomoxetine|melatonin|donepezil|memantine|SSRIs?)\b/i;
  for (const a of ARTICLES) {
    const { tags, videoKeywords, ...visible } = a;
    void tags; void videoKeywords;
    const m = JSON.stringify(visible).match(names);
    assert.ok(!m, `${a.slug} names a medicine: ${m?.[0]}`);
  }
});

test("library holds 132 articles across the ten categories", () => {
  const want: Record<string, number> = { depression: 15, anxiety: 15, addiction: 21, sexual: 15, child: 15, sleep: 10, therapy: 10, student: 10, geriatric: 10, awareness: 11 };
  const got: Record<string, number> = {};
  for (const a of ARTICLES) got[a.cat] = (got[a.cat] ?? 0) + 1;
  assert.deepEqual(got, want);
  assert.equal(ARTICLES.length, 132);
});
