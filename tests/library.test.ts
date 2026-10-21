import assert from "node:assert/strict";
import test from "node:test";
import { ASSESSMENTS, ASSESSMENT_ORDER, SCREENING_DISCLAIMER } from "../lib/assessments";
import { ARTICLES } from "../lib/content/articles";
import { CENTRES } from "../lib/content/centres";
import { CONDITIONS, getCondition } from "../lib/content/conditions";
import { HUBS } from "../lib/content/hubs";
import { LIBRARY_GROUPS, isClinical } from "../lib/content/library";
import { buildSearchIndex, searchSite } from "../lib/content/search";
import { matchVideos } from "../lib/youtube/match";

const groupIds = new Set(LIBRARY_GROUPS.map((g) => g.id));
const articleSlugs = new Set(ARTICLES.map((a) => a.slug));

test("library has 100+ pages across the clinical groups", () => {
  const clinical = CONDITIONS.filter((c) => c.group && c.group !== "service" && c.group !== "therapy");
  assert.ok(clinical.length >= 100, `only ${clinical.length} clinical pages`);
  const used = new Set(CONDITIONS.map((c) => c.group).filter(Boolean));
  assert.ok(used.size >= 18, `only ${used.size} groups used`);
});

test("every group, article, self-test and related link resolves", () => {
  for (const c of CONDITIONS) {
    if (c.group) assert.ok(groupIds.has(c.group), `${c.slug}: unknown group ${c.group}`);
    for (const a of c.articles ?? []) assert.ok(articleSlugs.has(a), `${c.slug}: unknown article ${a}`);
    for (const t of c.selfTests ?? []) assert.ok(t in ASSESSMENTS, `${c.slug}: unknown test ${t}`);
    for (const r of c.related) assert.notEqual(r, c.slug, `${c.slug} links to itself`);
  }
  for (const [id, a] of Object.entries(ASSESSMENTS)) for (const s of a.conditions ?? []) assert.ok(getCondition(s), `test ${id} → unknown ${s}`);
  for (const centre of CENTRES) for (const s of centre.extraPages ?? []) assert.ok(getCondition(s), `centre → unknown ${s}`);
  for (const hub of HUBS) for (const s of hub.more?.slugs ?? []) assert.ok(getCondition(s), `hub ${hub.slug} → unknown ${s}`);
});

test("titles and descriptions are unique per language (no duplicate city/condition pages)", () => {
  for (const lang of ["en", "hi"] as const) {
    for (const key of ["title", "description", "h1"] as const) {
      const seen = new Map<string, string>();
      for (const c of CONDITIONS) {
        const v = c[key][lang];
        assert.ok(!seen.has(v), `duplicate ${key}.${lang}: ${c.slug} and ${seen.get(v)}`);
        seen.set(v, c.slug);
      }
    }
  }
});

test("clinical pages carry the advanced sections", () => {
  for (const c of CONDITIONS.filter((x) => x.group && !["service", "therapy"].includes(x.group))) {
    if (!isClinical(c)) continue;
    assert.ok(c.diagnosis?.length || c.slug === "sex-specialist-india" || c.headings?.symptoms, `${c.slug}: no diagnosis section`);
  }
  for (const c of CONDITIONS.filter((x) => x.group === "therapy" && x.slug !== "psychotherapy-counselling")) {
    assert.ok(c.headings?.symptoms && c.headings?.seekHelp, `${c.slug}: therapy headings missing`);
  }
});

test("substance pages cover dependence, withdrawal, health and relapse prevention", () => {
  const subs = CONDITIONS.filter((c) => c.group === "substance" && c.extra?.some((e) => e.id === "withdrawal"));
  assert.ok(subs.length >= 10, `only ${subs.length} detailed substance pages`);
  for (const c of subs) {
    for (const id of ["dependence", "withdrawal", "health", "relapse"]) assert.ok(c.extra!.some((e) => e.id === id), `${c.slug}: missing ${id}`);
  }
  for (const slug of ["sedative-sleeping-pill-dependence-india", "prescription-drug-dependence-india"]) {
    const w = getCondition(slug)!.extra!.find((e) => e.id === "withdrawal")!;
    assert.equal(w.tone, "warning", `${slug}: sedative withdrawal must be a warning`);
  }
  assert.ok(getCondition("alcohol-addiction-treatment-india")!.extra!.some((e) => e.tone === "warning"), "alcohol withdrawal warning missing");
});

test("no page gives drug doses", () => {
  const dose = /\b\d+(\.\d+)?\s?(mg|mcg|ml)\b/i;
  for (const c of CONDITIONS) {
    const text = JSON.stringify([c.treatment, c.extra, c.faqs, c.psychotherapy]);
    assert.ok(!dose.test(text), `${c.slug} mentions a dose`);
  }
});

test("crisis page shows emergency numbers", () => {
  const c = getCondition("suicide-prevention-crisis-support-india")!;
  const text = JSON.stringify(c);
  assert.ok(text.includes("112") && text.includes("14416"));
});

test("every self-test has the required disclaimer, source and ≥1 condition", () => {
  assert.equal(SCREENING_DISCLAIMER.en, "Screening results do not establish a diagnosis. A qualified healthcare professional must perform a clinical assessment.");
  for (const id of ASSESSMENT_ORDER) {
    const a = ASSESSMENTS[id];
    assert.ok(a.intro && a.source, `${id}: intro/source missing`);
    assert.ok((a.conditions ?? []).length > 0, `${id}: no linked conditions`);
  }
});

test("search understands Hinglish and finds the new pages", () => {
  const index = buildSearchIndex();
  const top = (q: string) => searchSite(index, q, 5).map((e) => e.path);
  assert.ok(top("daru chhodna").includes("/alcohol-addiction-treatment-india"));
  assert.ok(top("afeem").includes("/opium-afeem-addiction-india"));
  assert.ok(top("doda post").includes("/doda-post-poppy-husk-addiction-india"));
  assert.ok(top("neet stress").includes("/neet-exam-stress-india"));
  assert.ok(top("CBT").some((p) => p.startsWith("/cbt-")));
  assert.equal(searchSite(index, "", 5).length, 0);
});

test("video matching only uses real feed items", () => {
  const vids = [
    { id: "a", title: "Sharab kaise chhode – alcohol", published: "2026-01-01" },
    { id: "b", title: "Exam tips", published: "2026-01-02" },
  ];
  const m = matchVideos(vids, ["alcohol"]);
  assert.deepEqual(m.map((v) => v.id), ["a"]);
  assert.equal(matchVideos(vids, ["schizophrenia"]).length, 0);
});

test("public pages use medicine classes, not individual drug names", () => {
  const names = /\b(buprenorphine|methadone|naltrexone|naloxone|disulfiram|acamprosate|baclofen|varenicline|bupropion|alprazolam|clonazepam|lorazepam|diazepam|etizolam|zolpidem|tramadol|codeine|escitalopram|sertraline|fluoxetine|paroxetine|venlafaxine|duloxetine|mirtazapine|amitriptyline|olanzapine|risperidone|aripiprazole|quetiapine|clozapine|haloperidol|lithium|valproate|divalproex|carbamazepine|lamotrigine|sildenafil|tadalafil|dapoxetine|donepezil|memantine|methylphenidate|atomoxetine|propranolol|thiamine|SSRIs?|SNRIs?)\b/i;
  for (const c of CONDITIONS) {
    const { keywords, videoKeywords, ...visible } = c;
    void keywords; void videoKeywords;
    const m = JSON.stringify(visible).match(names);
    assert.ok(!m, `${c.slug} names a medicine: ${m?.[0]}`);
  }
  for (const a of ARTICLES) assert.ok(!names.test(JSON.stringify(a)), `article ${a.slug} names a medicine`);
  for (const h of HUBS) assert.ok(!names.test(JSON.stringify(h)), `hub ${h.slug} names a medicine`);
});
