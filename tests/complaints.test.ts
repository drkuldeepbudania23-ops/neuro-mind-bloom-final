import assert from "node:assert/strict";
import test from "node:test";
import { BOOKING_COMPLAINTS, POPULAR_COMPLAINTS, normalise, searchComplaints } from "../lib/complaints";
import { complaintLabel } from "../app/data/psychiatrySearch";

const ens = (q: string) => searchComplaints(q).map((c) => c.en);

test("English search", () => {
  assert.ok(ens("sleep").includes("Poor sleep"));
  assert.ok(ens("anxiety").length > 0);
});

test("Hindi (Devanagari) search, with and without nukta", () => {
  assert.ok(ens("नींद").includes("Poor sleep"));
  assert.ok(ens("शराब").includes("Alcohol craving"));
  assert.ok(ens("ज्यादा नींद").includes("Excessive sleep"));
  assert.ok(ens("ज़्यादा नींद").includes("Excessive sleep"));
});

test("Hinglish / Roman Hindi search and spelling variants", () => {
  assert.ok(ens("neend").includes("Poor sleep"));
  assert.ok(ens("nind").includes("Poor sleep"));
  assert.ok(ens("ghabrahat").length > 0);
  assert.ok(ens("daru").includes("Alcohol craving"));
  assert.ok(ens("daaru").includes("Alcohol craving"));
  assert.ok(ens("afeem").includes("Opioid / smack / heroin craving"));
  assert.ok(ens("dhat").includes("Dhat syndrome (worry about semen loss)"));
  assert.ok(ens("shighrapatan").includes("Early ejaculation"));
  assert.ok(ens("gutka").includes("Tobacco dependence"));
});

test("multi-word queries require every word", () => {
  assert.ok(ens("neend nahi").includes("Poor sleep"));
  assert.equal(searchComplaints("xyzzy neend").length, 0);
});

test("labels keep the 'हिंदी / English' format the e-prescription prefill relies on", () => {
  for (const c of BOOKING_COMPLAINTS) {
    const label = complaintLabel(c);
    assert.equal(label.split(" / ").at(-1), c.en.split(" / ").at(-1));
    assert.ok(c.hi && c.en);
  }
  for (const en of POPULAR_COMPLAINTS) assert.ok(BOOKING_COMPLAINTS.some((c) => c.en === en), en);
  assert.equal(normalise("  Ghabrahat!! "), "ghabrahat");
});
