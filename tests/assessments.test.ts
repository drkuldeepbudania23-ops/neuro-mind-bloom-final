import assert from "node:assert/strict";
import test from "node:test";
import { ASSESSMENTS, scoreAssessment } from "../lib/assessments";

test("PHQ-9 bands follow published cut-offs", () => {
  const cases: [number[], string][] = [
    [[0, 0, 0, 0, 0, 0, 0, 0, 0], "minimal"],
    [[1, 1, 1, 1, 1, 0, 0, 0, 0], "mild"],
    [[2, 2, 2, 2, 2, 0, 0, 0, 0], "moderate"],
    [[3, 3, 3, 3, 3, 0, 0, 0, 0], "moderately-severe"],
    [[3, 3, 3, 3, 3, 3, 2, 0, 0], "severe"],
  ];
  for (const [answers, level] of cases) assert.equal(scoreAssessment("phq9", answers).band.level, level);
});

test("PHQ-9 item 9 triggers safety guidance at any non-zero answer", () => {
  assert.equal(scoreAssessment("phq9", [0, 0, 0, 0, 0, 0, 0, 0, 1]).safetyFlag, true);
  assert.equal(scoreAssessment("phq9", [3, 3, 3, 3, 3, 3, 3, 3, 0]).safetyFlag, false);
});

test("GAD-7 bands and validation", () => {
  assert.equal(scoreAssessment("gad7", [3, 3, 3, 3, 3, 3, 3]).band.level, "severe");
  assert.equal(scoreAssessment("gad7", [3, 3, 3, 1, 0, 0, 0]).band.level, "moderate");
  assert.throws(() => scoreAssessment("gad7", [0, 0, 0]));
  assert.throws(() => scoreAssessment("gad7", [0, 0, 0, 0, 0, 0, 4]));
});

test("bands cover every possible score with no gaps", () => {
  for (const a of Object.values(ASSESSMENTS)) {
    const max = a.questions.length * 3;
    const top = a.maxScore ?? max;
    for (let s = 0; s <= top; s++) assert.ok(a.bands.some((b) => s >= b.min && s <= b.max), `${a.id} score ${s}`);
    for (const q of a.questions) assert.ok(q.en && q.hi);
  }
});

test("AUDIT scoring uses WHO zones and 0/2/4 for items 9–10", () => {
  assert.equal(scoreAssessment("audit", [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]).band.level, "low-risk");
  assert.equal(scoreAssessment("audit", [2, 1, 1, 1, 1, 0, 1, 1, 0, 0]).band.level, "hazardous");
  assert.equal(scoreAssessment("audit", [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]).total, 40);
  assert.throws(() => scoreAssessment("audit", [0, 0, 0, 0, 0, 0, 0, 0, 1, 0])); // 1 is not allowed for item 9
});

test("ASRS Part A counts shaded responses (≥ Sometimes for 1–3, ≥ Often for 4–6)", () => {
  assert.equal(scoreAssessment("asrs", [2, 2, 2, 2, 2, 2]).total, 3);
  assert.equal(scoreAssessment("asrs", [2, 2, 2, 3, 2, 2]).band.level, "likely");
  assert.equal(scoreAssessment("asrs", [0, 0, 0, 4, 4, 4]).band.level, "unlikely");
});

test("original OCD and tobacco checklists score and band", () => {
  assert.equal(scoreAssessment("ocd", [2, 2, 2, 2, 2, 0, 0, 0]).band.level, "severe");
  assert.equal(scoreAssessment("ocd", [1, 1, 1, 1, 0, 0, 0, 0]).band.level, "minimal");
  assert.equal(scoreAssessment("tobacco", [2, 2, 2, 2, 2, 0, 0]).band.level, "dependence");
  assert.throws(() => scoreAssessment("ocd", [3, 0, 0, 0, 0, 0, 0, 0]));
});
