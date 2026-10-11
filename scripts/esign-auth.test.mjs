import assert from "node:assert/strict";
import { pbkdf2Sync, randomBytes } from "node:crypto";
import test from "node:test";
import {
  authorizePinReset,
  getDoctorUid,
  hasRecentAuthentication,
  savePin,
  verifyPinForUid,
} from "../app/api/esign/pin-store.ts";
import { POST as resetPin } from "../app/api/esign/reset-pin/route.ts";
import { POST as verifyPin } from "../app/api/esign/verify-pin/route.ts";

function makeToken(claims) {
  return `header.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.signature`;
}

test("doctor claim, recovery freshness, and salted PIN lifecycle", async (context) => {
  const previousFetch = globalThis.fetch;
  const pin = "70813462";
  const salt = randomBytes(24).toString("hex");
  let fields = {
    salt: { stringValue: salt },
    hash: { stringValue: pbkdf2Sync(pin, salt, 310000, 32, "sha256").toString("hex") },
    iterations: { integerValue: "310000" },
  };
  let patchBody;

  globalThis.fetch = async (url, options = {}) => {
    if (String(url).includes("identitytoolkit.googleapis.com")) {
      const { idToken } = JSON.parse(options.body);
      return idToken === "invalid"
        ? Response.json({}, { status: 401 })
        : Response.json({ users: [{ localId: "doctor-uid" }] });
    }
    if (!String(url).includes("/documents/esignPins/doctor-uid")) {
      throw new Error("Unexpected test request");
    }
    if (options.method === "PATCH") {
      patchBody = JSON.parse(options.body);
      fields = patchBody.fields;
      return Response.json({});
    }
    return Response.json({ fields });
  };
  context.after(() => {
    globalThis.fetch = previousFetch;
  });

  const recentDoctorToken = makeToken({
    doctor: true,
    auth_time: Math.floor(Date.now() / 1000),
  });
  const recentPatientToken = makeToken({
    auth_time: Math.floor(Date.now() / 1000),
  });
  const staleDoctorToken = makeToken({
    doctor: true,
    auth_time: Math.floor(Date.now() / 1000) - 301,
  });

  assert.equal(await getDoctorUid(recentDoctorToken), "doctor-uid");
  assert.equal(await getDoctorUid(recentPatientToken), "");
  assert.equal(await getDoctorUid("invalid"), "");
  assert.equal(hasRecentAuthentication(recentDoctorToken), true);
  assert.equal(hasRecentAuthentication(staleDoctorToken), false);
  assert.equal(hasRecentAuthentication(makeToken({ auth_time: Date.now() / 1000 + 30 })), false);
  assert.equal((await authorizePinReset(recentPatientToken, "recover")).reason, "doctor");
  assert.equal((await authorizePinReset(staleDoctorToken, "recover")).reason, "reauthentication");
  assert.equal((await authorizePinReset(recentDoctorToken, "recover")).uid, "doctor-uid");
  assert.equal((await authorizePinReset(recentDoctorToken, "change", "11111111")).reason, "current-pin");
  assert.equal((await authorizePinReset(recentDoctorToken, "change", pin)).uid, "doctor-uid");

  assert.equal(await verifyPinForUid("doctor-uid", recentDoctorToken, pin), true);
  assert.equal(await verifyPinForUid("doctor-uid", recentDoctorToken, "11111111"), false);

  async function verifyRequest(body) {
    return verifyPin(new Request("https://local.test/api/esign/verify-pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }));
  }

  const patientVerification = await verifyRequest({ pin, idToken: recentPatientToken });
  assert.equal(patientVerification.status, 403);
  const wrongVerification = await verifyRequest({ pin: "11111111", idToken: recentDoctorToken });
  assert.equal(wrongVerification.status, 401);
  const wrongVerificationBody = await wrongVerification.json();
  assert.equal(JSON.stringify(wrongVerificationBody).includes("11111111"), false);
  const validVerification = await verifyRequest({ pin, idToken: recentDoctorToken });
  assert.equal(validVerification.status, 200);

  async function resetRequest(body) {
    return resetPin(new Request("https://local.test/api/esign/reset-pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }));
  }

  const rejectedPatient = await resetRequest({
    mode: "recover",
    pin: "91527403",
    idToken: recentPatientToken,
  });
  assert.equal(rejectedPatient.status, 403);
  assert.equal(patchBody, undefined);

  const rejectedStaleRecovery = await resetRequest({
    mode: "recover",
    pin: "91527403",
    idToken: staleDoctorToken,
  });
  assert.equal(rejectedStaleRecovery.status, 401);
  assert.equal(patchBody, undefined);

  const rejectedWrongPin = await resetRequest({
    mode: "change",
    currentPin: "11111111",
    pin: "91527403",
    idToken: recentDoctorToken,
  });
  assert.equal(rejectedWrongPin.status, 401);
  assert.equal(patchBody, undefined);

  const changed = await resetRequest({
    mode: "change",
    currentPin: pin,
    pin: "91527403",
    idToken: recentDoctorToken,
  });
  assert.equal(changed.status, 200);
  assert.equal(JSON.stringify(patchBody).includes("91527403"), false);

  const recovered = await resetRequest({
    mode: "recover",
    pin: "62734091",
    idToken: recentDoctorToken,
  });
  assert.equal(recovered.status, 200);
  assert.equal(JSON.stringify(patchBody).includes("62734091"), false);
  assert.equal(await verifyPinForUid("doctor-uid", recentDoctorToken, "62734091"), true);
  assert.equal(await verifyPinForUid("doctor-uid", recentDoctorToken, pin), false);

  assert.equal(await savePin("doctor-uid", recentDoctorToken, "31840672"), true);
  assert.ok(patchBody);
  assert.equal(JSON.stringify(patchBody).includes("31840672"), false);
  assert.equal(await verifyPinForUid("doctor-uid", recentDoctorToken, "31840672"), true);
});