import { test } from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync, createVerify } from "node:crypto";
import { buildJaasJwt, jaasRoomUrl, normalisePem, publicJitsiUrl, roomNameFor } from "../lib/video/jaas";
import { createRxToken, purposeSecret, verifyRxToken } from "../lib/rx/link";

const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const pem = privateKey.export({ type: "pkcs8", format: "pem" }).toString();

test("JaaS JWT is RS256-signed with the expected claims", () => {
  const now = new Date("2026-10-12T05:00:00Z");
  const jwt = buildJaasJwt({
    appId: "vpaas-magic-cookie-abc",
    apiKeyId: "key1",
    privateKeyPem: pem,
    room: "nmb-room",
    user: { id: "u1", name: "Dr. Kuldeep Budania", moderator: true },
    now,
  });
  const [h, p, sig] = jwt.split(".");
  const header = JSON.parse(Buffer.from(h, "base64url").toString());
  const payload = JSON.parse(Buffer.from(p, "base64url").toString());
  assert.deepEqual(header, { alg: "RS256", typ: "JWT", kid: "vpaas-magic-cookie-abc/key1" });
  assert.equal(payload.aud, "jitsi");
  assert.equal(payload.iss, "chat");
  assert.equal(payload.sub, "vpaas-magic-cookie-abc");
  assert.equal(payload.room, "nmb-room");
  assert.equal(payload.context.user.moderator, true);
  assert.equal(payload.context.features.recording, false);
  assert.equal(payload.exp - payload.iat, 3 * 3600);
  const ok = createVerify("RSA-SHA256").update(`${h}.${p}`).verify(publicKey, Buffer.from(sig, "base64url"));
  assert.ok(ok);
});

test("room names are unguessable and stable", () => {
  const a = roomNameFor("appt123456", "secret-one-123456");
  assert.equal(a, roomNameFor("appt123456", "secret-one-123456"));
  assert.notEqual(a, roomNameFor("appt123456", "secret-two-123456"));
  assert.match(a, /^nmb-[0-9a-f]{24}$/);
  assert.ok(!a.includes("appt123456"));
});

test("urls and PEM handling", () => {
  assert.match(jaasRoomUrl("app", "r", "a.b.c"), /^https:\/\/8x8\.vc\/app\/r\?jwt=a\.b\.c#config\.disableDeepLinking=true/);
  assert.match(publicJitsiUrl("ab<c>"), /^https:\/\/meet\.jit\.si\/NeuroMindBloom-abc#/);
  assert.equal(normalisePem(pem.replace(/\n/g, "\\n")), pem.trim());
  assert.equal(normalisePem(Buffer.from(pem).toString("base64")), pem.trim());
  assert.equal(normalisePem("garbage"), "");
});

test("purpose keys keep video, verify and rx tokens separate", () => {
  const secret = "a-long-test-secret-value-123";
  const video = createRxToken("appt123456", purposeSecret(secret, "video"));
  assert.equal(verifyRxToken(video, purposeSecret(secret, "video")), "appt123456");
  assert.equal(verifyRxToken(video, purposeSecret(secret, "verify")), null);
  assert.equal(verifyRxToken(video, secret), null);
});

import { dailyRoomPayload, dailyTokenPayload, pickProvider, zoomMeetingPayload, zoomStartTime } from "../lib/video/providers";

test("provider choice: requested > saved > env default > first configured", () => {
  const all = ["daily", "zoom", "jitsi"] as const;
  assert.equal(pickProvider("zoom", "daily", [...all]), "zoom");
  assert.equal(pickProvider(undefined, "zoom", [...all]), "zoom");
  assert.equal(pickProvider("jaas", undefined, [...all]), "daily"); // not configured → ignored
  assert.equal(pickProvider(undefined, undefined, [...all], "zoom"), "zoom");
  assert.equal(pickProvider(undefined, undefined, ["jitsi"]), "jitsi");
  assert.equal(pickProvider("evil", "zoom", ["jitsi"]), "jitsi");
});

test("Zoom meeting payload uses India time and a waiting room", () => {
  assert.equal(zoomStartTime("2026-10-14", "10:30"), "2026-10-14T10:30:00");
  assert.equal(zoomStartTime("2026-10-14", "4:05 pm"), "2026-10-14T16:05:00");
  assert.equal(zoomStartTime("2026-10-14", "12:15 am"), "2026-10-14T00:15:00");
  assert.equal(zoomStartTime("14/10/2026", "10:30"), null);
  const p = zoomMeetingPayload({ topic: "Consultation", date: "2026-10-14", time: "10:30" });
  assert.equal(p.type, 2);
  assert.equal(p.timezone, "Asia/Kolkata");
  assert.equal(p.settings.waiting_room, true);
  assert.equal(p.settings.auto_recording, "none");
  assert.equal(zoomMeetingPayload({ topic: "x" }).type, 1);
});

test("Daily room is private, no recording; tokens expire", () => {
  const r = dailyRoomPayload("nmb-abc", 1000);
  assert.equal(r.privacy, "private");
  assert.equal(r.properties.enable_recording, false);
  const t = dailyTokenPayload({ room: "nmb-abc", userName: "Sita", owner: false, nowSeconds: 1000, ttlSeconds: 60 });
  assert.equal(t.properties.is_owner, false);
  assert.equal(t.properties.exp, 1060);
});

import { normaliseMeetUrl } from "../lib/video/providers";

test("only real Google Meet links are accepted", () => {
  assert.equal(normaliseMeetUrl("https://meet.google.com/abc-defg-hij"), "https://meet.google.com/abc-defg-hij");
  assert.equal(normaliseMeetUrl(" meet.google.com/ABC-DEFG-HIJ?authuser=0 "), "https://meet.google.com/abc-defg-hij");
  assert.equal(normaliseMeetUrl("https://meet.google.com.evil.com/abc-defg-hij"), null);
  assert.equal(normaliseMeetUrl("https://evil.com/meet.google.com/abc-defg-hij"), null);
  assert.equal(normaliseMeetUrl("javascript:alert(1)"), null);
  assert.equal(normaliseMeetUrl(""), null);
});
