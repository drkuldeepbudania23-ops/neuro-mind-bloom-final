import "server-only";
import { adminDb } from "./firebaseAdmin";
import { sendEmail } from "./notify";
import { audit } from "./audit";
import { encryptBackup, toPlain } from "../security/backupCrypto";
import { istDate } from "../notifications/templates";

/** Collections included in the weekly backup (2FA secrets and rate-limit counters are excluded). */
export const BACKUP_COLLECTIONS = [
  "patients",
  "patientRecords",
  "signedPrescriptions",
  "appointments",
  "payments",
  "followUps",
  "legacyPayments",
  "esignPins",
  "counters",
  "auditLog",
];

const EMAIL_LIMIT_BYTES = 25 * 1024 * 1024;

export async function runBackup() {
  const pass = process.env.BACKUP_ENCRYPTION_KEY || "";
  if (pass.length < 16) return { ok: false as const, error: "BACKUP_ENCRYPTION_KEY missing" };

  const db = adminDb();
  const data: Record<string, Record<string, unknown>> = {};
  const counts: Record<string, number> = {};
  for (const name of BACKUP_COLLECTIONS) {
    const snap = await db.collection(name).limit(50000).get();
    data[name] = Object.fromEntries(snap.docs.map((d) => [d.id, toPlain(d.data())]));
    counts[name] = snap.size;
  }
  const file = encryptBackup({ createdAt: new Date().toISOString(), counts, data }, pass);
  const name = `neuromindbloom-backup-${istDate()}.nmbbk`;

  // 1) Firebase Storage, if a bucket is configured.
  const bucketName = process.env.BACKUP_STORAGE_BUCKET || "";
  if (bucketName) {
    const { getStorage } = await import("firebase-admin/storage");
    await getStorage().bucket(bucketName).file(`backups/${name}`).save(file, { contentType: "application/octet-stream", resumable: false });
    await audit("system", "backup.storage", { name, bytes: file.length });
    return { ok: true as const, where: `gs://${bucketName}/backups/${name}`, counts, bytes: file.length };
  }

  // 2) Otherwise e-mail the encrypted file to the doctor.
  const to = process.env.BACKUP_EMAIL || process.env.DOCTOR_ALERT_EMAIL || "";
  if (!to) return { ok: false as const, error: "Set BACKUP_STORAGE_BUCKET or BACKUP_EMAIL" };
  if (file.length > EMAIL_LIMIT_BYTES) return { ok: false as const, error: "Backup too large for email — set BACKUP_STORAGE_BUCKET" };
  const lines = Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join("\n");
  const sent = await sendEmail(
    to,
    {
      subject: `Weekly encrypted backup ${istDate()} | Neuro Mind Bloom`,
      text: `Encrypted backup attached (${Math.round(file.length / 1024)} KB).\n\n${lines}\n\nKeep this email. To read the file: BACKUP_ENCRYPTION_KEY=... node scripts/decrypt-backup.mjs ${name} > backup.json`,
      html: `<p>Encrypted backup attached (${Math.round(file.length / 1024)} KB).</p><pre>${lines}</pre><p>Keep this email. Decrypt with <code>scripts/decrypt-backup.mjs</code> and your BACKUP_ENCRYPTION_KEY.</p>`,
    },
    [{ filename: name, content: file }]
  );
  await audit("system", "backup.email", { name, bytes: file.length, status: sent.status });
  return sent.status === "sent" ? { ok: true as const, where: `email:${to}`, counts, bytes: file.length } : { ok: false as const, error: `email ${sent.status}` };
}
