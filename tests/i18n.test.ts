import assert from "node:assert/strict";
import test from "node:test";
import { alternatesFor, basePath, langFromPath, localePath, tr } from "../lib/i18n";

test("locale paths", () => {
  assert.equal(localePath("/", "hi"), "/hi");
  assert.equal(localePath("/book-appointment", "hi"), "/hi/book-appointment");
  assert.equal(localePath("/book-appointment", "en"), "/book-appointment");
  assert.equal(basePath("/hi/self-assessment"), "/self-assessment");
  assert.equal(basePath("/hi"), "/");
  assert.equal(langFromPath("/hi/x"), "hi");
  assert.equal(langFromPath("/history"), "en");
});

test("hreflang alternates", () => {
  const a = alternatesFor("/book-appointment", "https://www.neuromindbloom.com", "hi");
  assert.equal(a.canonical, "https://www.neuromindbloom.com/hi/book-appointment");
  assert.equal(a.languages["en-IN"], "https://www.neuromindbloom.com/book-appointment");
  assert.equal(alternatesFor("/", "https://x.com", "en").canonical, "https://x.com");
  assert.equal(tr({ en: "A", hi: "" }, "hi"), "A");
});
