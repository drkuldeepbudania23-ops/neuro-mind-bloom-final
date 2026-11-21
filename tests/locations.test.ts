import { test } from "node:test";
import assert from "node:assert/strict";
import { CONDITIONS, getCondition } from "../lib/content/conditions";
import { CITY_LIST } from "../lib/content/conditions/cities";
import { INTERNATIONAL } from "../lib/content/international";
import { RAJASTHAN_BLOCKS } from "../lib/content/rajasthan-blocks";
import { LOCATION_HUBS, REGIONS, REGION_BY_SLUG } from "../lib/content/regions";

const hindi = (s: string) => /[ऀ-ॿ]/.test(s);

test("Rajasthan blocks sit on existing pages, each block exactly once, never a town that has its own page", () => {
  const ownPages = new Set([...CITY_LIST.map((c) => c.name.en.toLowerCase()), "ajmer"]);
  const seen = new Map<string, string>();
  let count = 0;
  for (const [slug, groups] of Object.entries(RAJASTHAN_BLOCKS)) {
    const page = getCondition(slug);
    assert.ok(page, `blocks for missing page ${slug}`);
    assert.ok(page!.blocks?.length, `${slug} did not get its blocks`);
    for (const g of groups) {
      assert.ok(hindi(g.district.hi), `${slug} district label`);
      for (const x of g.items) {
        const k = x.name.en.toLowerCase();
        assert.ok(!seen.has(k), `${x.name.en} on both ${seen.get(k)} and ${slug}`);
        assert.ok(!ownPages.has(k), `${x.name.en} already has its own page`);
        assert.ok(hindi(x.name.hi) && hindi(x.note.hi) && x.note.en.trim(), `${slug}/${x.name.en} bilingual`);
        seen.set(k, slug);
        count++;
      }
    }
  }
  assert.ok(count >= 180, `only ${count} blocks`);
});

test("no separate district pages compete with the indexed city pages", () => {
  assert.ok(!LOCATION_HUBS.some((r) => r.slug.endsWith("-district")));
  assert.equal(CONDITIONS.filter((c) => c.slug === "online-psychiatrist-sikar").length, 1);
  assert.ok(getCondition("online-psychiatrist-jalore"));
});

test("state hubs: new states only where no page existed; no city on two hubs except overlaps already live", () => {
  for (const s of ["bihar", "himachal-pradesh", "jammu-kashmir"]) assert.ok(REGION_BY_SLUG.get(s), s);
  assert.ok(!REGION_BY_SLUG.get("uttarakhand"));
  assert.ok(REGION_BY_SLUG.get("india")!.cities.some((c) => c.name.en === "Haridwar"));
  assert.equal(REGIONS[REGIONS.length - 1].slug, "india");
  const LIVE_OVERLAPS = new Set(["noida", "ghaziabad", "gurugram", "faridabad"]);
  const where = new Map<string, string>();
  for (const r of REGIONS) for (const c of r.cities) {
    const k = c.name.en.toLowerCase();
    if (where.has(k)) assert.ok(LIVE_OVERLAPS.has(k), `${c.name.en} is on both ${where.get(k)} and ${r.slug}`);
    else where.set(k, r.slug);
  }
});

test("international page lists no foreign emergency/helpline numbers", () => {
  for (const c of INTERNATIONAL.countries) {
    assert.ok(!("urgent" in c));
    for (const v of [c.local.en, c.note.en]) assert.ok(!/\d{3}/.test(v), `${c.name.en}: number in "${v}"`);
  }
  assert.ok(INTERNATIONAL.countries.length >= 14);
});
