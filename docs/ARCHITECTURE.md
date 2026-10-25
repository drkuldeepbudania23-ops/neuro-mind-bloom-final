# Neuro Mind Bloom — architecture

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript (strict) |
| Styling | Tailwind CSS v4 (utilities + theme, **no Preflight** so the existing doctor/prescription pages are untouched) |
| Fonts | `next/font`: Mukta (Latin + Devanagari) for body, Fraunces for English headings |
| Auth | Firebase Authentication (email/password) + custom claim `doctor: true` |
| Database | Cloud Firestore, protected by `firestore.rules` |
| Server code | Next.js Route Handlers (`app/api/**`, Node runtime) + Firebase Admin SDK |
| Payments | Razorpay Orders API + Checkout.js + webhook |
| Video | Jitsi (current) → see §7 |
| Hosting | Vercel (Preview deployments for testing, Production only after approval) |
| Mobile | Capacitor Android wrapper pointing at the website |

## 2. Environments (never test on live data)

| Environment | Branch | Firebase project | Razorpay keys | URL |
|---|---|---|---|---|
| Local dev | `upgrade/dev` | **neuro-mind-bloom-dev** (new, separate) | `rzp_test_…` | http://localhost:3000 |
| Preview / staging | `upgrade/dev` | neuro-mind-bloom-dev | `rzp_test_…` | Vercel preview URL (password-protected) |
| Production | `main` | neuro-mind-bloom (live) | `rzp_live_…` | www.neuromindbloom.com |

All configuration is in environment variables (`.env.example`). No secrets in code.

## 3. Folder structure

```
app/
  page.tsx                  English homepage  (/)
  hi/                       Hindi pages       (/hi, /hi/book-appointment, /hi/self-assessment)
  book-appointment/         Bilingual booking (EN)
  self-assessment/          PHQ-9 / GAD-7 (EN)
  <condition>-india/        31 existing SEO pages (to be rebuilt in Phase 2)
  doctor/                   Doctor dashboard (auth-guarded): appointments, payment,
                            prescription, follow-up, video
  login/                    Doctor login
  video/[id]/               Patient video room
  api/
    esign/                  verify-pin, reset-pin (PBKDF2, server-side)
    payments/razorpay/      order, verify, webhook
  layout.tsx, globals.css, sitemap.ts, robots.ts, SeoStructuredData.tsx
components/
  site/                     Header (Book Now dropdown), Footer, HomePage, icons, FloatingWhatsApp
  booking/BookingForm.tsx   Bilingual booking + Razorpay checkout
  assessment/               Bilingual self-assessment
lib/
  site.ts                   ONE source of truth: doctor, contacts, fees, services
  i18n.ts                   Language helpers, hreflang alternates
  content/home.ts           Homepage copy (EN + HI)
  booking.ts                Booking validation (mirrors Firestore rules)
  assessments.ts            PHQ-9 / GAD-7 questions + scoring
  payments/razorpay.ts      Signature verification, order payload (pure, tested)
  server/firebaseAdmin.ts   Admin SDK (server-only)
  server/payments.ts        Create order, mark paid (idempotent transaction)
  firebase.ts               Client SDK (env-configured)
data/                       Medicine + brand catalogues
tests/                      Unit tests (node:test + tsx)
scripts/                    Firestore rules test, e-sign test, doctor-claim script
archive/                    Old backups moved out of the build (kept for reference)
docs/                       This documentation
```

## 4. Data model (Firestore)

| Collection | Written by | Read by | Notes |
|---|---|---|---|
| `appointments/{id}` | Public booking form (strict schema in rules); doctor updates | Doctor | `serviceCode`, `language`, `consent` added; payment fields only via rules-checked doctor flow or server |
| `payments/{appointmentId or walk-in id}` | Doctor (rules-validated: Paid / Discount / Exempt) or server (Razorpay) | Doctor | Immutable after create |
| `razorpayOrders/{orderId}` | Server only | Server only | Links Razorpay order ↔ appointment; status `created` → `paid` |
| `patientRecords/{id}` | Doctor | Doctor; server (Admin) for PDF links & Excel | Prescriptions / consultation history. Only records with `signedAt` + `prescriptionId` can be downloaded as PDF |
| `patients/{uhid}` | Doctor (rules: id NMB-000000 format, no delete) | Doctor; server for Excel | name, mobile10, age, sex, email, visitCount, lastVisit |
| `counters/patients` | Doctor (rules: `next` can only go up by 1) | Doctor | UHID sequence |
| `followUps/{id}` | Doctor | Doctor; cron (Admin) | `nextVisitDate` (reminder date), `reminderSent` |
| `appointments.notifications` | Server only | Doctor | Timestamps of messages sent (prevents duplicates) |
| `esignPins/{uid}` | Server route on behalf of doctor | Doctor (own) | Salted PBKDF2 hash only, never the PIN |
| everything else | — | — | Denied by catch-all rule |

Planned: `prescriptions/{id}` (immutable signed versions), `auditLog/{id}`.

## 5. Core workflow

```
Patient                         Server / Firestore                      Doctor
───────                         ──────────────────                      ──────
Book (website / WhatsApp) ───▶  appointments (pending)
Pay (Razorpay Checkout)   ───▶  /api/payments/razorpay/order  (amount from serviceCode)
                                /verify  + /webhook ─▶ payments + appointment marked Paid
                                                         ◀──── sees Paid in dashboard
                                                                Payment screen: discount / exemption
Joins video link (WhatsApp) ◀──────────────────────────────────  Starts video room, shares link
                                                                E-prescription (ICD, medicines)
                                                                E-sign PIN ─▶ /api/esign/verify-pin
                                patientRecords saved     ◀────  Save
Receives PDF on WhatsApp/email ◀───────────────────────────────  Print / PDF / WhatsApp / Email
Receives secure PDF link  ◀────  /api/rx/<signed token> (3 days)
Follow-up reminder        ◀────  daily cron 9 AM IST     ◀────  Follow-up reminder date
```

## 6. Security model

**Implemented in this phase**
1. Firebase web config moved to env vars → dev can point at a separate project.
2. Hard-coded legacy e-sign PIN hash removed from source (optional server env fallback only).
3. Public appointment create now validated by rules: allowed fields only, sizes capped, mobile
   format, `status == 'pending'`, server timestamp. Previously any document of any size was accepted.
4. Middleware no longer forces `text/html` + `no-store` on every URL; private routes
   (`/doctor`, `/login`, `/video`) get `no-store` + `noindex`.
5. Security headers: HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy,
   CSP in **Report-Only** (switch to enforcing after checking a preview).
6. Razorpay amount is computed on the server from the service code; signatures verified with
   constant-time comparison; webhook makes recording idempotent.
7. Self-assessment answers never leave the browser.
8. (Phase 3) Doctor signature image removed from `/public` (was downloadable) — embedded only in
   server code for the PDF. Patient PDF links are HMAC-signed, expire in 3 days (resend for a fresh link), `no-store` + `noindex`.
9. (Phase 3) Notification/export/share routes verify the Firebase ID token **and** the `doctor` claim
   with the Admin SDK. The public booking-notify route only acts on a pending booking created in the
   last 30 minutes, sends only to that booking's own contacts, and only once (transaction).
10. (Phase 3) Cron route requires `CRON_SECRET` (constant-time compare). All provider keys are
   server-only env vars.
11. **2FA** (authenticator app, RFC 6238 TOTP): secret AES-256-GCM-encrypted in `mfa/{uid}`
   (server-only). A correct code sets custom claims `mfa: true, mfa_exp`; `isDoctor()` in
   firestore.rules and `verifyDoctorToken()` require `mfa_exp` in the future once 2FA is on, so an
   expired 2FA session cannot read patient data even with a valid password login. One-time
   recovery codes (hashed), replay protection, lockout after 5 wrong codes / 15 min.
12. **Server e-signing**: `/api/esign/sign` verifies the PIN, issues Prescription ID + time and
   stores the content in `signedPrescriptions/{id}` with a SHA-256 hash (`create()` — never
   overwritten; clients cannot write). PDF + QR page always use this frozen copy.
13. **Rate limits** (Firestore counters, fail-open): booking notify 10/h, video join 60/10 min,
   Razorpay order 20/10 min, prescription download 60/10 min, e-sign 20/10 min, 2FA 30/15 min per IP.
14. **Audit log** `auditLog`: server entries (e-sign, share, export, notify, video, 2FA, backups) +
   client entries (status change, reschedule, prescription save); rules = create-only, own uid,
   no update/delete. Visible in Doctor → Security.
15. **Backups**: weekly Vercel Cron → all clinical collections → gzip → AES-256-GCM with
   `BACKUP_ENCRYPTION_KEY` → Cloud Storage bucket or email. `scripts/decrypt-backup.mjs` restores
   JSON. (On the Blaze plan, also enable Firestore's own scheduled backups / PITR.)
16. **App Check** (optional): reCAPTCHA v3 on the web client; enforce in Firebase console.

**Still to do (Phase 3–4)**
- E-sign: the server PDF now only covers records saved with `signedAt` + `prescriptionId`; next
  step is to record the signature on the server at PIN verification and store an immutable copy + hash.
- Use Admin SDK `verifyIdToken` everywhere (helper `verifyDoctorToken` is ready).
- DPDP Act 2023: privacy notice, consent records (consent flag now stored), data-retention policy.
- Remove `archive/` from the deployed repo once nothing there is needed.

## 7. Video consultation — five providers, doctor chooses

| Provider | Where it opens | Free allowance | Needs |
|---|---|---|---|
| **Google Meet** (default) | Google Meet app / browser | Free Gmail: 1-to-1 up to 24 h; 3+ people 60 min | Nothing — doctor clicks "Create a new Google Meet", pastes the link once |
| **Daily.co** | Inside the website/dashboard | 10,000 participant-minutes / month (≈ 250 × 20-min calls) | `DAILY_API_KEY` |
| **Zoom** | Zoom app / Zoom web (patients know it) | Free Zoom account (meetings may stop at 40 min); Pro removes the limit | `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET` |
| **JaaS** (8x8 Jitsi) | Inside the website | 25 monthly users | `JAAS_*` |
| **Jitsi** meet.jit.si | Inside the website | Free, unlimited (doctor may need to sign in) | nothing — always available |

- Doctor → Video → **Start Video**: a "Video via" switch shows the configured providers. The choice is
  saved on the appointment; the **patient link never changes** — `/video/<id>?k=<signed key>` opens
  whatever the doctor selected (embedded room, or redirect to Zoom).
- If Daily's free minutes run out (or any service fails), switch to Zoom or Jitsi with one click.
- Daily rooms are private (token-only), JaaS rooms need our RS256 JWT, Zoom meetings use a waiting
  room; room names are an HMAC of the appointment id; recording is off; cancelled appointments
  cannot join. Links sent before this upgrade (no key) still open the free Jitsi room.

## 8. Prescription verification QR

Every server PDF carries a QR code → `/verify/<token>` (HMAC with a purpose-specific key, valid 2
years). The page (noindex, no-store) shows "Genuine prescription" with Rx ID, date, masked patient
name, age/sex, doctor + Reg. No. and the medicine list, so a pharmacist can spot an altered or fake
paper. Forged/expired codes show "Not verified" with the clinic number.
