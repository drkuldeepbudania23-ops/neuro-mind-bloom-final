"use client";

import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import type { CustomMedicine } from "../rx/medicineCatalogue";

/** Doctor-added brands (Firestore `doctorMedicines`, doctor-only by rules). */
export type SavedCustomMedicine = CustomMedicine & { id: string };

const LOCAL_KEY = "nmb-custom-medicines";

function readLocal(): SavedCustomMedicine[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLocal(list: SavedCustomMedicine[]) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list.slice(0, 2000)));
  } catch {
    /* storage unavailable */
  }
}

const clip = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);

export async function loadCustomMedicines(): Promise<SavedCustomMedicine[]> {
  try {
    const snap = await getDocs(collection(db, "doctorMedicines"));
    const list = snap.docs.map((d: { id: string; data(): Record<string, unknown> }) => {
      const x = d.data();
      return { id: d.id, generic: clip(x.generic, 120), brand: clip(x.brand, 80), strength: clip(x.strength, 40), form: clip(x.form, 40), company: clip(x.company, 80) };
    });
    writeLocal(list);
    return list;
  } catch (error) {
    console.warn("custom medicines (using this device's copy)", error);
    return readLocal();
  }
}

export async function saveCustomMedicine(m: CustomMedicine): Promise<SavedCustomMedicine> {
  const data = { generic: clip(m.generic, 120), brand: clip(m.brand, 80), strength: clip(m.strength, 40), form: clip(m.form, 40), company: clip(m.company, 80) };
  if (!data.generic && !data.brand) throw new Error("Enter a generic or brand name");
  let id = `local-${Date.now()}`;
  try {
    const ref = await addDoc(collection(db, "doctorMedicines"), { ...data, createdAt: serverTimestamp() });
    id = ref.id;
  } catch (error) {
    console.warn("custom medicine saved on this device only", error);
  }
  const saved = { id, ...data };
  writeLocal([saved, ...readLocal().filter((x) => x.id !== id)]);
  return saved;
}

export async function deleteCustomMedicine(id: string): Promise<void> {
  if (!id.startsWith("local-")) await deleteDoc(doc(db, "doctorMedicines", id));
  writeLocal(readLocal().filter((x) => x.id !== id));
}
