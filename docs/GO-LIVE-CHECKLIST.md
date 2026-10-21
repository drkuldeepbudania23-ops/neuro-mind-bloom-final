# Go-live checklist (do NOT skip — and only after Dr. Kuldeep approves)

## 1. Run it on your computer
```bash
npm install            # package-lock.json will update (new packages were added)
cp .env.example .env.local
npm test && npm run typecheck && npm run build
npm run dev            # http://localhost:3000 and /hi
```
`npm install` / `build` could not be run in the development sandbox (no package registry access),
so this first build on your machine is the real compile check.

## 2. Separate DEV Firebase project first
- Create a new Firebase project (e.g. `neuromindbloom-dev`), enable Email/Password auth,
  create the doctor user, run `npm run grant:doctor` for that user.
- Grant the doctor claim on DEV: `FIREBASE_PROJECT_ID=neuromindbloom-dev npm run grant:doctor -- <uid>`
- Deploy rules to DEV only: `firebase deploy --only firestore:rules --project neuromindbloom-dev`
- Fill `.env.local` with the DEV keys. Test everything in `DEVELOPMENT-PLAN.md` → test checklist.

## 3. Vercel Preview (not production)
Push `upgrade/dev` → Vercel creates a Preview URL. Add the env vars for **Preview** only:

| Needed for | Variables |
|---|---|
| Always | `NEXT_PUBLIC_FIREBASE_*`, `FIREBASE_SERVICE_ACCOUNT_BASE64`, `RX_LINK_SECRET`, `PUBLIC_BASE_URL` (= preview URL) |
| Online payment | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` (test keys), `RAZORPAY_WEBHOOK_SECRET`, `NEXT_PUBLIC_RAZORPAY_ENABLED` |
| UPI QR | `NEXT_PUBLIC_UPI_ID`, `NEXT_PUBLIC_UPI_NAME` |
| Email | `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_REPLY_TO` |
| WhatsApp automation | `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` + approved templates (`NOTIFICATIONS.md`) |
| Doctor alerts | `DOCTOR_ALERT_WHATSAPP`, `DOCTOR_ALERT_EMAIL` |
| Reminders | `CRON_SECRET` |
| Security | `MFA_ENCRYPTION_KEY`, `BACKUP_ENCRYPTION_KEY` (+ `BACKUP_STORAGE_BUCKET` or `BACKUP_EMAIL`), optional `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` |
| Video (optional) | `DAILY_API_KEY`, `ZOOM_*`, `JAAS_*`, `VIDEO_DEFAULT_PROVIDER` — Google Meet & Jitsi need nothing |

## 4. Production (only with approval)
1. Backup: Firestore export of the LIVE project (Google Cloud console → Firestore → Import/Export).
2. Deploy the new `firestore.rules` to the live project (they are stricter — test first on DEV).
3. Add production env vars (live Razorpay keys only when ready).
4. Merge `upgrade/dev` → `main` and let Vercel deploy. Keep the previous deployment for instant rollback
   (Vercel → Deployments → "Promote to Production" on the old one).
5. After go-live: Patients → "Create UHIDs for old records" once; Security → turn on 2FA and store
   the recovery codes safely; keep `BACKUP_ENCRYPTION_KEY` in a password manager (without it backups
   cannot be opened).
6. Check: home EN/HI, booking, payment, doctor login, prescription PDF + QR scan, video link, sitemap.

## Still pending from you
UPI ID · Google Business Profile link · YouTube channel ID confirmation · clinic address & OPD timings
· dev Firebase project · Razorpay test keys · (optional) Daily / Zoom / Resend / WhatsApp accounts.
