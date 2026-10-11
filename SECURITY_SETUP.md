# Security and Release Setup

## Doctor Claim

Doctor pages, payment approval, patient records, and E-Sign PIN APIs require the Firebase custom claim `doctor: true`. The claim is never assigned by application code. Public appointment creation cannot set payment fields, payment history is create-only, and only a claimed doctor can atomically link a payment to an appointment.

Before deploying the restrictive rules or application, identify the existing doctor's Firebase Auth UID through a trusted Firebase Admin account and grant the claim:

```sh
GOOGLE_APPLICATION_CREDENTIALS=/secure/path/service-account.json npm run grant:doctor -- FIREBASE_USER_UID
```

The service-account file must stay outside this repository. The script verifies that the supplied UID belongs to the enabled, email-verified `drkuldeepbudania23@gmail.com` account before changing claims. It merges `doctor: true` into existing custom claims, then reads the account back and verifies the claim. The doctor must sign out and back in to refresh the ID token. Do not run this command for patient accounts.

Legacy appointment statuses without a linked immutable payment record are not treated as a new payment. A claimed doctor can verify the existing `Paid`, `Discount`, or `Exempt` status once from the payment page; this links its history without collecting a second payment. Status-only legacy records do not authorize E-Sign until that verification is complete.

## Environment

The website currently reads no `process.env` or `NEXT_PUBLIC_*` variables. Vercel's configured build command is `npm run build`. Firebase web configuration is currently embedded in `lib/firebase.ts`; its API key is client configuration, not an Admin credential. Do not move service-account credentials or Admin SDK credentials into Vercel client variables.

The one-time claim tool uses Application Default Credentials from `GOOGLE_APPLICATION_CREDENTIALS`; the Firebase UID is a command-line argument, not an environment variable. No production Firebase credential or Vercel environment value is required by the deployed app.

## Deployment Checklist

1. Confirm the Firebase project ID is `neuro-mind-bloom` and confirm the doctor's UID through an authorized admin channel.
2. Grant `doctor: true` to that UID using the command above; do not grant it to patients. Have the doctor sign out and sign in again.
3. Run `npm run test:esign`, then run `npx firebase-tools emulators:exec --only firestore --project demo-neuro-mind-bloom 'npm run test:rules'` and `npm run build`.
4. Review `firestore.rules` and the production project selection before any rules deployment. The rules in this repository replace the previous authenticated-user catch-all with explicit collection policies.
5. Deploy the updated rules and application in a coordinated maintenance window. Rules-first fails closed for the old payment UI until the new application is live; application-first leaves the old rules exposed until rules deployment. Keep that interval as short as possible.
6. Do not use a Vercel preview for live booking/payment smoke tests without first isolating its Firebase project: the checked-in Firebase client config points preview and production builds at the same production Firebase project.
7. After deployment approval, smoke-test a new public appointment, existing claimed-doctor login, one appointment payment, a walk-in payment, E-Sign verification, and the video/PDF/WhatsApp flows using approved test data.

No Firebase rules, production Firebase settings, Vercel settings, or production records have been changed by the local work in this repository.

## Rollback

- Do not roll back to the pre-hardening application: it restores client-side E-Sign verification and the old payment path. For a UI-only regression, prepare a rollback build from the secure release that reverts only the failing UI change while retaining doctor-claim checks, PIN APIs, immutable payment history, and restrictive rules.
- Keep the restrictive Firestore rules active during any rollback. If no secure rollback build is available, disable the affected doctor action until a fix is ready; do not restore the old broad authenticated-user catch-all to recover availability.
- If a doctor is locked out, verify the UID and custom claim with Firebase Admin and refresh the doctor's login. Do not weaken rules or grant the claim to a patient.
- Payment history is append-only and no patient-record migration is performed. Preserve the Firestore payment documents and patient records during rollback; do not delete or rewrite them.
- Before rules deployment, retain the reviewed `firestore.rules` version with the release record so an authorized operator can restore a known-good restrictive policy if needed.