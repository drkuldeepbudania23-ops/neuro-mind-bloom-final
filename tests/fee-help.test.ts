import test from "node:test";
import assert from "node:assert/strict";
import { FEE_HELP, feeHelpVisible } from "../lib/feeHelp";

test("fee-help note shows only from 4 to 11 Nov 2026 (IST)", () => {
  assert.equal(feeHelpVisible(new Date("2026-11-03T23:55:00+05:30")), false);
  assert.equal(feeHelpVisible(new Date("2026-11-04T00:05:00+05:30")), true);
  assert.equal(feeHelpVisible(new Date("2026-11-11T23:55:00+05:30")), true);
  assert.equal(feeHelpVisible(new Date("2026-11-12T00:05:00+05:30")), false);
});

test("fee-help text carries no festival, offer or discount wording", () => {
  const text = [FEE_HELP.text, FEE_HELP.cta, FEE_HELP.whatsappMessage]
    .flatMap((v) => [v.en, v.hi])
    .join(" ")
    .toLowerCase();
  for (const word of ["discount", "offer", "diwali", "%", "free", "limited", "छूट", "ऑफ़र", "दीपावली", "दिवाली", "मुफ्त", "मुफ़्त"]) {
    assert.ok(!text.includes(word), `contains "${word}"`);
  }
});
