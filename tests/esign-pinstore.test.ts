import assert from "node:assert/strict";
import { pbkdf2Sync, randomBytes } from "node:crypto";
import test from "node:test";

process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = "demo-project";
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = "demo-key";

const token = `h.${Buffer.from(JSON.stringify({ doctor: true, auth_time: Math.floor(Date.now() / 1000) })).toString("base64url")}.s`;

test("no stored PIN and no legacy env → signing is refused (no hard-coded fallback)", async (t) => {
  const prev = globalThis.fetch;
  globalThis.fetch = (async () => new Response("{}", { status: 404 })) as typeof fetch;
  t.after(() => { globalThis.fetch = prev; });
  delete process.env.ESIGN_LEGACY_PIN_SALT;
  delete process.env.ESIGN_LEGACY_PIN_HASH;
  const { verifyPinForUid } = await import("../app/api/esign/pin-store");
  assert.equal(await verifyPinForUid("doctor-uid", token, "12345678"), false);
});

test("legacy PIN works only when supplied through server env", async (t) => {
  const prev = globalThis.fetch;
  globalThis.fetch = (async () => new Response("{}", { status: 404 })) as typeof fetch;
  t.after(() => { globalThis.fetch = prev; });
  const salt = randomBytes(24).toString("hex");
  process.env.ESIGN_LEGACY_PIN_SALT = salt;
  process.env.ESIGN_LEGACY_PIN_HASH = pbkdf2Sync("70813462", salt, 310000, 32, "sha256").toString("hex");
  const { verifyPinForUid } = await import("../app/api/esign/pin-store");
  assert.equal(await verifyPinForUid("doctor-uid", token, "70813462"), true);
  assert.equal(await verifyPinForUid("doctor-uid", token, "11111111"), false);
});
