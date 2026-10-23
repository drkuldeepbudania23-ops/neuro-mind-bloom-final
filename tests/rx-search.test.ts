import assert from "node:assert/strict";
import test from "node:test";
import { diagnosisLabel, diagnosisOptions, searchDiagnoses } from "../app/data/psychiatrySearch";
import { PSYCHIATRY_ICD } from "../data/psychiatry-icd";
import { EXTRA_BRANDS } from "../data/extra-brands";
import { medicines } from "../data/medicines";
import { brandBase, catalogue, customRows, displayName, searchMedicines } from "../lib/rx/medicineCatalogue";

test("ICD list covers every ICD-10 Chapter V block and has well-formed codes", () => {
  const codes = new Set(PSYCHIATRY_ICD.map((r) => r[0]));
  for (const c of ["F00", "F05", "F10", "F11.2", "F17.2", "F20", "F25", "F31", "F32.2", "F33", "F40.1", "F41.0", "F42", "F43.1", "F44", "F45.2", "F48.8", "F50.0", "F51.0", "F52.4", "F53", "F60.31", "F63.0", "F70", "F80", "F84", "F90", "F91.3", "F93.0", "F95.2", "F98.0", "F99"]) assert.ok(codes.has(c), `missing ${c}`);
  for (const [c10, c11, name] of PSYCHIATRY_ICD) {
    assert.ok(name.trim(), "empty name");
    assert.ok(c10 || c11, `${name}: no code`);
    if (c10) assert.match(c10, /^([A-Z]\d\d(\.\d{1,2})?|X60–X84)$/, `bad ICD-10 ${c10}`);
    if (c11) assert.match(c11, /^[0-9A-Z]{4}(\.[0-9A-Z]{1,2})?( \/ [0-9A-Z]{4})?$/, `bad ICD-11 ${c11}`);
  }
  assert.ok(diagnosisOptions.length >= 300, `only ${diagnosisOptions.length} diagnoses`);
});

test("diagnosis search: codes, names, ICD-11 and Hinglish", () => {
  assert.equal(searchDiagnoses("F32")[0].icd10, "F32");
  assert.equal(searchDiagnoses("6B20")[0].icd11, "6B20");
  assert.ok(searchDiagnoses("F11.2").some((d) => d.icd11 === "6C43.2"));
  assert.ok(searchDiagnoses("gaming").some((d) => d.icd11 === "6C51"));
  assert.ok(searchDiagnoses("neend").some((d) => /insomnia/i.test(d.name)));
  assert.ok(searchDiagnoses("daru withdrawal").some((d) => d.icd10 === "F10.3"));
  assert.equal(searchDiagnoses("  ").length, 0);
  // Plain-word search puts the main diagnosis first (not bipolar / post-schizophrenic variants).
  assert.equal(searchDiagnoses("depression")[0].icd10, "F32");
  assert.equal(diagnosisLabel({ name: "X", icd10: "F99", icd11: "", keywords: "", tags: [] }), "X | ICD-10 F99");
});

test("medicine catalogue: extra brands map to existing generics and several brands per generic", () => {
  const gens = new Set(medicines.map((m) => m.generic.toLowerCase()));
  for (const e of EXTRA_BRANDS) assert.ok(gens.has(e.generic.toLowerCase()), `unknown generic ${e.generic}`);
  const brandsFor = (g: string) => new Set(catalogue().filter((r) => r.generic.toLowerCase() === g).map((r) => brandBase(r.brand, r.strength).toLowerCase()));
  for (const g of ["escitalopram", "olanzapine", "risperidone", "quetiapine", "clonazepam", "lithium carbonate", "sertraline"]) assert.ok(brandsFor(g).size >= 3, `${g}: only ${[...brandsFor(g)].join(", ")}`);
  assert.ok(!catalogue().some((r) => /animal/i.test(r.category)), "animal health rows must be excluded");
});

test("medicine search ranks brands, ignores spacing and includes doctor-added brands", () => {
  assert.equal(searchMedicines("nexito")[0].brand.toLowerCase().startsWith("nexito"), true);
  assert.ok(searchMedicines("s citadep").some((r) => r.brand === "S Citadep"));
  assert.ok(searchMedicines("olanzapine 10").every((r) => /olanzapine/i.test(r.generic + r.brand + r.category) && /10/.test(r.strength + r.brand + r.generic)));
  const mine = customRows([{ generic: "Escitalopram", brand: "Testbrand", strength: "10 mg" }]);
  assert.equal(searchMedicines("testbrand", mine)[0].source, "custom");
  assert.equal(displayName({ brand: "Nexito 10", strength: "10 mg", generic: "" }), "Nexito 10");
  assert.equal(displayName({ brand: "Nexito", strength: "10 mg", generic: "" }), "Nexito 10 mg");
  assert.equal(searchMedicines("").length, 0);
});
