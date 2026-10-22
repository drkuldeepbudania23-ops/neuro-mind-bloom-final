# Old dashboard data → Cloud (Firestore)

## What is "old data"?
Appointments and saved prescriptions of the live site are **already in Firestore** (`appointments`, `patientRecords`) — the upgrade reads the same collections, nothing to move.

But the old dashboard kept some data **only in the doctor's browser** (localStorage, per website address):

| Browser key | What | Where it goes |
|---|---|---|
| `nmb_followups` | Follow-up notes (old site never saved them to the cloud) | `followUps` |
| `nmb_prescriptions` | Prescriptions whose cloud save had failed (old Firestore bug) | `patientRecords` |
| `nmb_payments` | Local copy of payment clearances (real record is already in `payments`) | `legacyPayments` (archive only) |

If that browser's data is cleared, these records are lost. **Do not clear history / site data in that browser until the import is done.**

## Safety
- A record already in the cloud is **never overwritten** — it is skipped. Running the import twice is harmless.
- Imported follow-ups get `reminderSent: true` → no patient gets a reminder for an old visit.
- Payment notes go to `legacyPayments` (read-only archive). They never create or change a payment clearance.
- Every imported document carries `importedFrom` and `importedAt`; the import is written to `auditLog`.

## Step 1 — Back up NOW from the live site (read-only, changes nothing)
Browser data belongs to the exact address, so do this on the computer + browser where the old dashboard is used, once for each address you use (`https://www.neuromindbloom.com` and, if used, `https://neuromindbloom.com`):

1. Open the live doctor dashboard and log in.
2. Press **F12** (Mac: Cmd+Option+J) → **Console** tab. (Chrome may ask you to type `allow pasting` first.)
3. Paste this line and press Enter — a file `nmb-browser-backup-YYYY-MM-DD.json` downloads:

```js
(()=>{const d={};["nmb_followups","nmb_prescriptions","nmb_payments"].forEach(k=>d[k]=localStorage.getItem(k)||"[]");const b=new Blob([JSON.stringify({format:"nmb-browser-backup-v1",exportedAt:new Date().toISOString(),origin:location.origin,data:d},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="nmb-browser-backup-"+new Date().toISOString().slice(0,10)+".json";a.click();})()
```

Keep this file safe (it contains patient data) — e.g. a private Google Drive folder.

## Step 2 — Upload to the cloud (after the upgrade is deployed)
Doctor dashboard → **Old Data → Cloud** (`/doctor/data-import`):
- On the **same browser and address** as the old dashboard, the page shows what it found → *Download backup file* → *Upload to cloud*.
- Or choose the backup file from Step 1 → *Upload to cloud*.

Firestore rules must include the new `legacyPayments` block (in `firestore.rules`) — deploy rules before using the page.
