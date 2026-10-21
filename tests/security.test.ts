import { test } from "node:test";
import assert from "node:assert/strict";
import { base32Decode, base32Encode, generateRecoveryCodes, generateSecret, hashRecoveryCode, hotp, otpauthUri, totp, verifyTotp } from "../lib/security/totp";
import { clientIp, rateDecision } from "../lib/security/rateLimit";

// RFC 4226 Appendix D test vectors (secret "12345678901234567890")
const RFC_SECRET = base32Encode(Buffer.from("12345678901234567890"));

test("HOTP matches RFC 4226 test vectors", () => {
  const expected = ["755224", "287082", "359152", "969429", "338314", "254676", "287922", "162583", "399871", "520489"];
  expected.forEach((code, i) => assert.equal(hotp(RFC_SECRET, i), code));
});

test("TOTP matches RFC 6238 (SHA1, 6 digits) at T=59s and T=1111111109s", () => {
  assert.equal(totp(RFC_SECRET, 59 * 1000), "287082");
  assert.equal(totp(RFC_SECRET, 1111111109 * 1000), "081804");
});

test("verify accepts ±1 step, rejects reuse and wrong codes", () => {
  const s = generateSecret();
  const now = 1_760_000_000_000;
  const code = totp(s, now);
  const counter = verifyTotp(s, code, now);
  assert.equal(counter, Math.floor(now / 30000));
  assert.equal(verifyTotp(s, code, now + 30_000), counter); // phone 30 s behind
  assert.equal(verifyTotp(s, code, now, counter!), null); // replay refused
  assert.equal(verifyTotp(s, code, now + 120_000), null); // too old
  assert.equal(verifyTotp(s, "12345", now), null);
  assert.equal(verifyTotp(s, "abcdef", now), null);
});

test("base32 round trip, otpauth URI, recovery codes", () => {
  const bytes = Buffer.from([0, 1, 2, 250, 255, 7, 9]);
  assert.deepEqual(base32Decode(base32Encode(bytes)), bytes);
  assert.equal(generateSecret().length, 32);
  const uri = otpauthUri("JBSWY3DPEHPK3PXP", "drkuldeep@example.com");
  assert.match(uri, /^otpauth:\/\/totp\/Neuro%20Mind%20Bloom%3Adrkuldeep%40example\.com\?secret=JBSWY3DPEHPK3PXP&issuer=Neuro\+Mind\+Bloom/);
  const codes = generateRecoveryCodes();
  assert.equal(codes.length, 10);
  assert.equal(new Set(codes).size, 10);
  assert.match(codes[0], /^[A-Z2-7]{4}-[A-Z2-7]{4}$/);
  assert.equal(hashRecoveryCode("abcd-efgh", "p"), hashRecoveryCode("ABCDEFGH", "p"));
  assert.notEqual(hashRecoveryCode("ABCDEFGH", "p"), hashRecoveryCode("ABCDEFGH", "q"));
});

test("rate limit window", () => {
  let w = null as null | { count: number; start: number };
  const results: boolean[] = [];
  for (let i = 0; i < 4; i++) {
    const d = rateDecision(w, 1000 + i, 3, 60_000);
    w = d.next;
    results.push(d.allowed);
  }
  assert.deepEqual(results, [true, true, true, false]);
  const blocked = rateDecision(w, 2000, 3, 60_000);
  assert.equal(blocked.retryAfterSec, 59);
  assert.equal(rateDecision(w, 61_000, 3, 60_000).allowed, true); // new window
  assert.equal(clientIp(new Headers({ "x-forwarded-for": "1.2.3.4, 10.0.0.1" })), "1.2.3.4");
  assert.equal(clientIp(new Headers()), "unknown");
});
