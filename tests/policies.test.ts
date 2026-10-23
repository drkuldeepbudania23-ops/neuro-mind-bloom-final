import assert from "node:assert/strict";
import test from "node:test";
import { POLICIES, getPolicy } from "../lib/content/policies";

test("all three legal pages exist with distinct slugs", () => {
  assert.deepEqual(POLICIES.map((p) => p.slug).sort(), ["privacy-policy", "refund-policy", "terms-and-conditions"]);
  assert.equal(getPolicy("refund-policy").title.en, "Refund & Cancellation Policy");
});

test("every policy text is bilingual and non-empty", () => {
  for (const p of POLICIES) {
    for (const v of [p.title, p.description, p.intro, ...p.sections.flatMap((s) => [s.h, ...s.p])]) {
      assert.ok(v.en.trim().length > 0, `${p.slug}: empty English text`);
      assert.ok(v.hi.trim().length > 0, `${p.slug}: empty Hindi text`);
    }
  }
});

test("policy pages never mention a registration number or medical college", () => {
  const all = JSON.stringify(POLICIES).toLowerCase();
  assert.ok(!all.includes("registration no"));
  assert.ok(!all.includes("medical college"));
});
