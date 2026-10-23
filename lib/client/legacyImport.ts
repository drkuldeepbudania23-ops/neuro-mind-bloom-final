import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { logAction } from "./audit";
import { COLLECTION_OF_KIND, importMeta, type LegacyKind, type LegacyPlan } from "../legacyImport";

export type KindResult = { added: number; alreadyInCloud: number; failed: number };
export type ImportResult = Record<LegacyKind, KindResult>;

const KINDS: LegacyKind[] = ["prescriptions", "followUps", "payments"];

/**
 * Upload old browser-only records to Firestore.
 *
 * Safety:
 *  - A record whose id already exists in the cloud is NEVER overwritten (skipped).
 *  - Imported follow-ups are marked reminderSent=true so no patient gets a
 *    surprise reminder for an old visit.
 *  - Old payment copies go to `legacyPayments` (archive only) — they never
 *    create or change a payment clearance.
 *  - Running it twice is harmless: the second run only skips.
 */
export async function importLegacyPlan(
  plan: LegacyPlan,
  source: "browser" | "file",
  onProgress?: (done: number, total: number) => void
): Promise<ImportResult> {
  const result: ImportResult = {
    prescriptions: { added: 0, alreadyInCloud: 0, failed: 0 },
    followUps: { added: 0, alreadyInCloud: 0, failed: 0 },
    payments: { added: 0, alreadyInCloud: 0, failed: 0 },
  };
  const meta = importMeta(source, new Date().toISOString());
  const total = KINDS.reduce((n, k) => n + plan[k].length, 0);
  let done = 0;

  for (const kind of KINDS) {
    const col = COLLECTION_OF_KIND[kind];
    for (const record of plan[kind]) {
      try {
        const ref = doc(db, col, record.id);
        const existing = await getDoc(ref);
        if (existing.exists()) {
          result[kind].alreadyInCloud++;
        } else {
          const extra = kind === "followUps" ? { reminderSent: true } : {};
          await setDoc(ref, { ...record, ...extra, ...meta });
          result[kind].added++;
        }
      } catch (error) {
        console.error(`Import ${kind}/${record.id} failed`, error);
        result[kind].failed++;
      }
      done++;
      onProgress?.(done, total);
    }
  }

  await logAction("legacy.import", {
    source,
    prescriptionsAdded: result.prescriptions.added,
    followUpsAdded: result.followUps.added,
    paymentsAdded: result.payments.added,
    failed: result.prescriptions.failed + result.followUps.failed + result.payments.failed,
  });
  return result;
}
