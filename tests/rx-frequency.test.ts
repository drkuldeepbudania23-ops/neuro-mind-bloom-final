import { test } from "node:test";
import assert from "node:assert/strict";
import { FREQUENCY_OPTIONS, TIMING_OPTIONS, timingForFrequency } from "../lib/rx/frequency";

test("TDS / 8 hourly / BD fill a matching timing", () => {
  assert.equal(timingForFrequency("TDS"), "Morning, Afternoon & Night");
  assert.equal(timingForFrequency("1-1-1"), "Morning, Afternoon & Night");
  assert.equal(timingForFrequency("8 hourly"), "Every 8 hours");
  assert.equal(timingForFrequency("BD"), "Morning & Night");
  assert.equal(timingForFrequency("HS"), "Night");
  assert.equal(timingForFrequency("SOS"), "As required");
  assert.equal(timingForFrequency("custom"), "");
});

test("every frequency default is a selectable timing", () => {
  for (const f of FREQUENCY_OPTIONS) {
    const t = timingForFrequency(f);
    assert.ok(t, `no default for ${f}`);
    assert.ok((TIMING_OPTIONS as readonly string[]).includes(t), `${f} -> ${t} not in list`);
  }
});
