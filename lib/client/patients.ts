"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";
import { formatUhid, groupPeople, isUhid, mobileVariants, normaliseMobile, pickMatch, samePerson, type Patient } from "../patients";

type Doc = Record<string, unknown> & { id: string };

const asDocs = (snap: { docs: { id: string; data(): unknown }[] }): Doc[] =>
  snap.docs.map((d) => ({ ...(d.data() as Record<string, unknown>), id: d.id }));

export async function findPatientsByMobile(mobile: string): Promise<Patient[]> {
  const mobile10 = normaliseMobile(mobile);
  if (!mobile10) return [];
  const snap = await getDocs(query(collection(db, "patients"), where("mobile10", "==", mobile10), limit(20)));
  return asDocs(snap) as unknown as Patient[];
}

export async function getPatient(uhid: string): Promise<Patient | null> {
  if (!isUhid(uhid)) return null;
  const snap = await getDoc(doc(db, "patients", uhid));
  return snap.exists() ? ({ ...(snap.data() as object), uhid } as Patient) : null;
}

/** Allocate the next UHID atomically (counters/patients.next) and create the patient. */
export async function createPatient(input: { name: string; mobile: string; age?: string; sex?: string; email?: string }): Promise<Patient> {
  const mobile10 = normaliseMobile(input.mobile);
  if (!input.name.trim() || !mobile10) throw new Error("Name and a valid mobile are needed for a UHID");
  return runTransaction(db, async (tx) => {
    const counterRef = doc(db, "counters", "patients");
    const counter = await tx.get(counterRef);
    const next = (counter.exists() ? Number(counter.data()?.next || 0) : 0) + 1;
    const uhid = formatUhid(next);
    const patient: Patient = {
      uhid,
      name: input.name.trim().slice(0, 80),
      mobile10,
      mobile: input.mobile.trim().slice(0, 20),
      age: (input.age || "").slice(0, 10),
      sex: (input.sex || "").slice(0, 10),
      email: (input.email || "").trim().slice(0, 120),
      visitCount: 0,
    };
    tx.set(counterRef, { next });
    tx.set(doc(db, "patients", uhid), { ...patient, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    return patient;
  });
}

/** Existing patient with the same mobile + first name, otherwise a new UHID. */
export async function getOrCreatePatient(input: { name: string; mobile: string; age?: string; sex?: string; email?: string }): Promise<Patient> {
  const match = pickMatch(await findPatientsByMobile(input.mobile), input.name);
  return match ?? createPatient(input);
}

/** Called when a prescription is saved for this patient. */
export async function recordVisit(uhid: string, latest: { age?: string; sex?: string; email?: string }) {
  if (!isUhid(uhid)) return;
  await setDoc(
    doc(db, "patients", uhid),
    {
      visitCount: increment(1),
      lastVisit: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...(latest.age ? { age: latest.age.slice(0, 10) } : {}),
      ...(latest.sex ? { sex: latest.sex.slice(0, 10) } : {}),
      ...(latest.email ? { email: latest.email.slice(0, 120) } : {}),
    },
    { merge: true }
  );
}

/** Everything linked to a patient: by UHID, and by mobile for data saved before UHIDs existed. */
export async function loadPatientHistory(patient: Patient) {
  const variants = mobileVariants(patient.mobile10);
  const byMobile = async (name: string) =>
    variants.length ? asDocs(await getDocs(query(collection(db, name), where("mobile", "in", variants), limit(300)))) : [];
  const [recordsByUhid, recordsByMobile, appointments, followUps] = await Promise.all([
    getDocs(query(collection(db, "patientRecords"), where("uhid", "==", patient.uhid), limit(300))).then(asDocs),
    byMobile("patientRecords"),
    byMobile("appointments"),
    byMobile("followUps"),
  ]);
  // Old records without UHID: same mobile AND same first name (family members share phones).
  const records = [...recordsByUhid, ...recordsByMobile.filter((r) => !r.uhid && samePerson(r.patientName, patient.name))];
  const appts = appointments.filter((a) => samePerson(a.patientName || a.name, patient.name));
  const follows = followUps.filter((f) => samePerson(f.patient, patient.name));
  const paymentIds = [...new Set(appts.map((a) => a.id))].slice(0, 30);
  const payments = (
    await Promise.all(paymentIds.map(async (id) => {
      const snap = await getDoc(doc(db, "payments", id));
      return snap.exists() ? ({ ...(snap.data() as object), id } as Doc) : null;
    }))
  ).filter(Boolean) as Doc[];
  return { records, appointments: appts, payments, followUps: follows };
}

/** One-time: give UHIDs to people in old prescriptions/appointments and tag old prescriptions. */
export async function backfillUhids(onProgress?: (done: number, total: number) => void) {
  const [records, appointments] = await Promise.all([
    getDocs(query(collection(db, "patientRecords"), limit(5000))).then(asDocs),
    getDocs(query(collection(db, "appointments"), limit(5000))).then(asDocs),
  ]);
  const items = [
    ...records.filter((r) => !r.uhid).map((r) => ({
      id: `r:${r.id}`, name: String(r.patientName || ""), mobile: r.mobile, age: String(r.age || ""), sex: String(r.sex || ""),
      email: String(r.email || ""), at: /^\d{12,14}$/.test(r.id) ? Number(r.id) : 0,
    })),
    ...appointments.map((a) => ({
      id: `a:${a.id}`, name: String(a.patientName || a.name || ""), mobile: a.mobile, email: String(a.email || ""),
      at: Number((a.createdAt as { seconds?: number } | undefined)?.seconds || 0) * 1000,
    })),
  ];
  const groups = groupPeople(items);
  let done = 0;
  for (const g of groups) {
    const patient = await getOrCreatePatient({ name: g.name, mobile: g.mobile10, age: g.age, sex: g.sex, email: g.email });
    const recordIds = g.ids.filter((id) => id.startsWith("r:")).map((id) => id.slice(2));
    for (let i = 0; i < recordIds.length; i += 400) {
      const batch = writeBatch(db);
      for (const id of recordIds.slice(i, i + 400)) batch.set(doc(db, "patientRecords", id), { uhid: patient.uhid }, { merge: true });
      await batch.commit();
    }
    done += 1;
    onProgress?.(done, groups.length);
  }
  return { people: groups.length };
}
