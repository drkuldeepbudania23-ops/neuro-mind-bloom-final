import test from "node:test";
import assert from "node:assert/strict";
import { currentGreeting, DIWALI_2026, istDate } from "../lib/festival";

test("istDate uses India time, not UTC", () => {
  // 20:00 UTC on 3 Nov is already 4 Nov 01:30 in India.
  assert.equal(istDate(new Date("2026-11-03T20:00:00Z")), "2026-11-04");
});

test("Diwali greeting shows only from 4 to 11 Nov 2026 (IST)", () => {
  assert.equal(currentGreeting(new Date("2026-11-03T12:00:00+05:30")), null);
  assert.equal(currentGreeting(new Date("2026-11-04T00:05:00+05:30"))?.id, "diwali-2026");
  assert.equal(currentGreeting(new Date("2026-11-08T19:00:00+05:30"))?.id, "diwali-2026");
  assert.equal(currentGreeting(new Date("2026-11-11T23:55:00+05:30"))?.id, "diwali-2026");
  assert.equal(currentGreeting(new Date("2026-11-12T00:05:00+05:30")), null);
});

test("greeting text carries no offer or discount wording", () => {
  const text = [DIWALI_2026.title, DIWALI_2026.message].flatMap((v) => [v.en, v.hi]).join(" ").toLowerCase();
  for (const word of ["discount", "offer", "off", "%", "free", "छूट", "ऑफ़र", "मुफ्त", "मुफ़्त"]) {
    assert.ok(!new RegExp(`(^|\\s)${word.replace("%", "\\%")}(\\s|$)`).test(text) && !text.includes(word === "off" ? " off " : word), `contains "${word}"`);
  }
});
