import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from "@firebase/rules-unit-testing";
import {
  doc,
  deleteDoc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const projectId = "demo-neuro-mind-bloom";
let environment;

test("payment and E-Sign data require an authorized doctor", async () => {
  environment = await initializeTestEnvironment({
    projectId,
    firestore: {
      rules: await readFile(new URL("../firestore.rules", import.meta.url), "utf8"),
    },
  });

  const anonymousDb = environment.unauthenticatedContext().firestore();
  const validBooking = {
    patientName: "Patient",
    name: "Patient",
    mobile: "9876543210",
    service: "Psychiatric Consultation - \u20B9500",
    serviceCode: "psychiatry-consultation",
    preferredDate: "2026-10-20",
    preferredTime: "11:00",
    concern: "Poor sleep",
    mode: "Online",
    status: "pending",
    source: "Website",
    language: "hi",
    consent: true,
    createdAt: serverTimestamp(),
  };
  await assertSucceeds(setDoc(doc(anonymousDb, "appointments/public-booking"), validBooking));
  // Unknown fields, bad mobile, non-pending status and oversized text are rejected.
  await assertFails(setDoc(doc(anonymousDb, "appointments/extra-field"), { ...validBooking, isAdmin: true }));
  await assertFails(setDoc(doc(anonymousDb, "appointments/bad-mobile"), { ...validBooking, mobile: "12ab" }));
  await assertFails(setDoc(doc(anonymousDb, "appointments/confirmed"), { ...validBooking, status: "confirmed" }));
  await assertFails(setDoc(doc(anonymousDb, "appointments/huge"), { ...validBooking, concern: "x".repeat(2001) }));
  await assertFails(setDoc(doc(anonymousDb, "appointments/forged-booking"), {
    patientName: "Patient",
    paymentStatus: "Paid",
    paymentDetails: {
      confirmedBy: "patient-uid",
      confirmedAt: serverTimestamp(),
      originalFee: 500,
      finalAmount: 500,
      discount: 0,
    },
  }));

  const patientDb = environment.authenticatedContext("patient-uid").firestore();
  await assertFails(updateDoc(doc(patientDb, "appointments/public-booking"), {
    paymentStatus: "Paid",
    paymentDetails: {
      confirmedBy: "patient-uid",
      confirmedAt: serverTimestamp(),
      originalFee: 500,
      finalAmount: 500,
      discount: 0,
    },
  }));
  await assertFails(setDoc(doc(patientDb, "payments/patient-payment"), {
    paymentStatus: "Paid",
  }));
  await assertFails(setDoc(doc(patientDb, "esignPins/patient-uid"), { hash: "fake" }));

  const doctorDb = environment.authenticatedContext("doctor-uid", { doctor: true }).firestore();
  const appointmentRef = doc(doctorDb, "appointments/public-booking");
  const appointmentPaymentRef = doc(doctorDb, "payments/public-booking");
  const paidDetails = {
      confirmedBy: "doctor-uid",
      confirmedAt: serverTimestamp(),
      originalFee: 500,
      finalAmount: 500,
      discount: 0,
      discountType: "",
      reason: "",
  };
  await assertSucceeds(runTransaction(doctorDb, async (transaction) => {
    const appointment = await transaction.get(appointmentRef);
    const payment = await transaction.get(appointmentPaymentRef);
    assert.ok(appointment.exists());
    assert.equal(payment.exists(), false);
    transaction.update(appointmentRef, {
      paymentId: "public-booking",
      paymentStatus: "Paid",
      paymentDetails: paidDetails,
    });
    transaction.set(appointmentPaymentRef, {
      paymentId: "public-booking",
      appointmentId: "public-booking",
      patientName: "Patient",
      paymentStatus: "Paid",
      paymentDetails: paidDetails,
      createdAt: serverTimestamp(),
    });
  }));
  await assertFails(runTransaction(doctorDb, async (transaction) => {
    const appointment = await transaction.get(appointmentRef);
    const payment = await transaction.get(appointmentPaymentRef);
    assert.ok(appointment.exists());
    assert.ok(payment.exists());
    transaction.update(appointmentRef, {
      paymentStatus: "Exempt",
      paymentDetails: {
        ...paidDetails,
        confirmedAt: serverTimestamp(),
        finalAmount: 0,
        reason: "second clearance",
      },
    });
    transaction.set(appointmentPaymentRef, {
      ...payment.data(),
      paymentStatus: "Exempt",
    });
  }));

  await environment.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), "appointments/legacy-paid"), {
      patientName: "Existing patient",
      paymentStatus: "Paid",
    });
  });
  const legacyAppointment = doc(doctorDb, "appointments/legacy-paid");
  const legacyPayment = doc(doctorDb, "payments/legacy-paid");
  const legacyDetails = {
    confirmedBy: "doctor-uid",
    confirmedAt: serverTimestamp(),
    originalFee: 500,
    finalAmount: 500,
    discount: 0,
    discountType: "",
    reason: "",
  };
  await assertSucceeds(runTransaction(doctorDb, async (transaction) => {
    await transaction.get(legacyAppointment);
    assert.equal((await transaction.get(legacyPayment)).exists(), false);
    transaction.update(legacyAppointment, {
      paymentId: "legacy-paid",
      paymentStatus: "Paid",
      paymentDetails: legacyDetails,
    });
    transaction.set(legacyPayment, {
      paymentId: "legacy-paid",
      appointmentId: "legacy-paid",
      patientName: "Existing patient",
      paymentStatus: "Paid",
      paymentDetails: legacyDetails,
      createdAt: serverTimestamp(),
    });
  }));
  await assertFails(runTransaction(doctorDb, async (transaction) => {
    const payment = await transaction.get(legacyPayment);
    transaction.update(legacyAppointment, {
      paymentStatus: "Exempt",
      paymentDetails: { ...legacyDetails, finalAmount: 0, reason: "changed" },
    });
    transaction.set(legacyPayment, { ...payment.data(), paymentStatus: "Exempt" });
  }));

  await assertSucceeds(setDoc(doc(doctorDb, "payments/approved-discount"), {
    paymentId: "approved-discount",
    appointmentId: "",
    patientName: "Walk-in",
    createdAt: serverTimestamp(),
    paymentStatus: "Discount",
    paymentDetails: {
      confirmedBy: "doctor-uid",
      confirmedAt: serverTimestamp(),
      originalFee: 500,
      finalAmount: 400,
      discount: 100,
      discountType: "amount",
      reason: "Approved concession",
    },
  }));
  await assertSucceeds(setDoc(doc(doctorDb, "payments/approved-exemption"), {
    paymentId: "approved-exemption",
    appointmentId: "",
    patientName: "Walk-in",
    createdAt: serverTimestamp(),
    paymentStatus: "Exempt",
    paymentDetails: {
      confirmedBy: "doctor-uid",
      confirmedAt: serverTimestamp(),
      originalFee: 500,
      finalAmount: 0,
      discount: 0,
      discountType: "",
      reason: "Approved exemption",
    },
  }));
  await assertFails(setDoc(doc(doctorDb, "payments/invalid-discount"), {
    paymentId: "invalid-discount",
    appointmentId: "",
    patientName: "Walk-in",
    createdAt: serverTimestamp(),
    paymentStatus: "Discount",
    paymentDetails: {
      confirmedBy: "doctor-uid",
      confirmedAt: serverTimestamp(),
      originalFee: 500,
      finalAmount: 0,
      discount: 600,
      discountType: "amount",
      reason: "Invalid discount",
    },
  }));
  await assertFails(setDoc(doc(doctorDb, "payments/missing-reason"), {
    paymentId: "missing-reason",
    appointmentId: "",
    patientName: "Walk-in",
    createdAt: serverTimestamp(),
    paymentStatus: "Exempt",
    paymentDetails: {
      confirmedBy: "doctor-uid",
      confirmedAt: serverTimestamp(),
      originalFee: 500,
      finalAmount: 0,
      discount: 0,
      discountType: "",
      reason: "",
    },
  }));
  await assertFails(updateDoc(doc(doctorDb, "payments/approved-discount"), {
    paymentStatus: "Paid",
  }));
  const pinRef = doc(doctorDb, "esignPins/doctor-uid");
  await assertSucceeds(setDoc(pinRef, {
    salt: "a".repeat(48),
    hash: "b".repeat(64),
    iterations: 310000,
    updatedAt: serverTimestamp(),
  }));
  await assertSucceeds(getDoc(doc(doctorDb, "esignPins/doctor-uid")));
  await assertFails(setDoc(pinRef, { pin: "plaintext" }));
  await assertFails(deleteDoc(pinRef));
  await assertFails(setDoc(doc(doctorDb, "esignPins/another-doctor"), {
    salt: "a".repeat(48),
    hash: "b".repeat(64),
    iterations: 310000,
    updatedAt: serverTimestamp(),
  }));
  await assertFails(getDoc(doc(patientDb, "esignPins/doctor-uid")));
  await assertFails(getDoc(doc(patientDb, "patientRecords/record-1")));
});

test("feedback is create-only for the public; recovery stories need review and consent", async () => {
  const anonymousDb = environment.unauthenticatedContext().firestore();
  const doctorDb = environment.authenticatedContext("doctor-uid", { doctor: true }).firestore();
  const validFeedback = {
    rating: 5, name: "R.", comment: "Very patient and clear explanation.", consentStore: true, consentDisplay: false,
    visitDate: "", language: "en", status: "pending", consentText: "I agree", consentVersion: "2026-10",
    reviewDate: "2026-10-12", createdAt: serverTimestamp(),
  };
  await assertSucceeds(setDoc(doc(anonymousDb, "feedback/f1"), validFeedback));
  await assertFails(setDoc(doc(anonymousDb, "feedback/f2"), { ...validFeedback, status: "approved" }));
  await assertFails(setDoc(doc(anonymousDb, "feedback/f3"), { ...validFeedback, rating: 6 }));
  await assertFails(setDoc(doc(anonymousDb, "feedback/f4"), { ...validFeedback, consentStore: false }));
  await assertFails(setDoc(doc(anonymousDb, "feedback/f5"), { ...validFeedback, mobile: "9876543210" }));
  await assertFails(getDoc(doc(anonymousDb, "feedback/f1")));
  await assertFails(updateDoc(doc(anonymousDb, "feedback/f1"), { status: "approved" }));
  await assertSucceeds(updateDoc(doc(doctorDb, "feedback/f1"), { status: "approved", moderatedAt: "2026-10-12" }));
  await assertFails(updateDoc(doc(doctorDb, "feedback/f1"), { rating: 1 }));
  await assertSucceeds(deleteDoc(doc(doctorDb, "feedback/f1")));

  const story = {
    title: { en: "A", hi: "अ" }, category: "depression", narrative: { en: "", hi: "" }, imageUrl: "", imageAlt: { en: "", hi: "" },
    fictional: false, doctorReviewed: true, consent: { documented: false, note: "", date: "" }, status: "published", updated: "2026-10-12",
  };
  await assertFails(setDoc(doc(doctorDb, "recoveryStories/s1"), story));
  await assertSucceeds(setDoc(doc(doctorDb, "recoveryStories/s1"), { ...story, status: "draft" }));
  await assertSucceeds(setDoc(doc(doctorDb, "recoveryStories/s2"), { ...story, fictional: true }));
  await assertFails(setDoc(doc(doctorDb, "recoveryStories/s3"), { ...story, fictional: true, doctorReviewed: false }));
  await assertSucceeds(setDoc(doc(doctorDb, "recoveryStories/s4"), { ...story, consent: { documented: true, note: "file", date: "2026-10-01" } }));
  await assertFails(getDoc(doc(anonymousDb, "recoveryStories/s2")));
  await assertFails(setDoc(doc(anonymousDb, "recoveryStories/s5"), { ...story, status: "draft" }));
});

test.after(async () => {
  await environment?.cleanup();
});