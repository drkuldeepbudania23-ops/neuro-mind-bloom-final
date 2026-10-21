# Development plan — Neuro Mind Bloom upgrade

Branch: `upgrade/dev` (the first commit on `main` is the untouched live source).
Rule: nothing is deployed to production without Dr. Kuldeep Budania's written approval.

## Feature status

Legend: ✅ done in Phase 1 · 🟢 already in live site (kept) · 🔜 planned (phase)

| # | Feature | Status |
|---|---|---|
| 1 | Modern responsive homepage | ✅ New design, mobile-first, no horizontal scroll at 390 px |
| 2 | Complete Hindi + English website | ✅ Every public page at `/path` and `/hi/path` with hreflang (doctor dashboard stays English) |
| 3 | Psychiatry services & treatment pages | ✅ All 30 old URLs kept and rebuilt + new pages (OCD, PTSD, dhat, PE, ED, women, students, psychotherapy, 10 cities) — symptoms, causes, treatment, when to consult, FAQ, related links |
| 4 | Online appointment booking | ✅ Rebuilt: bilingual, validated, consent, service codes, complaint search in Hindi + English + Hinglish |
| 5 | Book Now dropdown (Website / WhatsApp) | ✅ Header + final CTA |
| 6 | Doctor login & secure dashboard | 🟢 Kept · ✅ Sign out, Video card · ✅ P3 2FA with authenticator app (Doctor → Security): enforced by Firestore rules + every doctor API, 12-hour sessions, 10 recovery codes, lockout after 5 wrong codes |
| 7 | Patient registration & records | ✅ P3 One UHID per patient (NMB-000123): auto-created on prescription save, matched by mobile + first name (family members sharing a phone get separate UHIDs); "Create UHIDs for old records" button; UHID on print/PDF/Excel |
| 8 | Appointment management | 🟢 Status + WhatsApp · ✅ P3 7-day planner, Today/Tomorrow/Week/Upcoming/date filters, status filter, search, grouped by day, payment badges, Reschedule (patient notified), Mark completed, Cancel |
| 9 | Razorpay payments | ✅ Server order/verify/webhook + checkout (needs keys) · 🟢 manual recording |
| 9b | Payment QR after confirmation | ✅ Doctor → Appointments → confirmed → "Send Payment QR" via WhatsApp / Email (editable amount, Hindi/English). Patient page `/pay` shows UPI QR with amount, UPI-app button, Razorpay option, "send screenshot" button. Needs `NEXT_PUBLIC_UPI_ID` |
| 10 | Payment exemption & discount | 🟢 Rules-enforced; ✅ now uses ₹500 / ₹1500 / ₹1000 |
| 11 | Video consultation & link sharing | ✅ P3 Doctor chooses per appointment: Google Meet (default, free 1-to-1 up to 24 h), Daily.co (in-website, free 10k min/month), Zoom (auto-created meeting, waiting room), JaaS, or free Jitsi backup; one signed patient link for all (ARCHITECTURE §7) |
| 12 | Email & WhatsApp notifications | ✅ P3 Automatic (when keys added): booking received + doctor alert, appointment confirmed, payment link, payment received, prescription PDF, daily follow-up reminders — WhatsApp Cloud API templates + Resend email. Manual buttons still work. See `NOTIFICATIONS.md` |
| 13 | Professional e-prescription | 🟢 Exists · ✅ server PDF, QR, UHID, server e-sign · ⏸ splitting the 1,900-line page into modules is postponed until the first real `npm run build` on your machine (a big refactor without running the app risks breaking a working page) |
| 14 | ICD-10 & ICD-11 search | 🟢 |
| 15 | Searchable medicine database | 🟢 |
| 16 | Brand & generic search | 🟢 |
| 17 | E-signature with secure PIN | 🟢 + ✅ hard-coded hash removed · ✅ P3 server-side signing: PIN checked on the server, Rx ID + time issued by the server, content frozen with SHA-256 (later edits cannot change the PDF/QR page) |
| 18 | PDF, print, WhatsApp sharing | 🟢 Print-to-PDF · ✅ P3 server-generated A4 PDF (single page when it fits, page x of y, footer) + secure 30-day link in WhatsApp message; email sends PDF as attachment |
| 19 | Consultation history | ✅ P3 Doctor → Patients → patient: timeline of prescriptions, appointments, payments and follow-ups (including old records without UHID); "+ New prescription" pre-filled |
| 20 | Excel export | ✅ P3 real .xlsx of ALL cloud data — sheets: Patient Records, Appointments, Payments, Follow-ups (Hindi-safe, frozen header). CSV of this device as fallback |
| 21 | Hindi-English self-assessments | ✅ PHQ-9, GAD-7 (crisis safety step), AUDIT (alcohol), ASRS (adult ADHD), clinic OCD checklist, clinic tobacco checklist |
| 22 | Psychotherapy & counselling info | ✅ Homepage section + /psychotherapy-counselling |
| 23 | Mental-health articles | ✅ /articles with 6 bilingual articles (add more in `lib/content/articles.ts`) |
| 24 | SEO | ✅ hreflang, sitemap rewrite, robots fix, middleware content-type fix, structured data with 3 fees |
| 25 | Social media | ✅ Official FB / Instagram / YouTube / WhatsApp links in header, footer, contact page, homepage; YouTube Subscribe + FB/IG Follow; Share website; Call Now · ✅ P2 YouTube video hub (/videos), share image (og-image.jpg) |
| 26 | Mobile-friendly | ✅ New pages checked at 390 px |
| 27 | Security & data protection | ✅ ARCHITECTURE §6 · ✅ P3 rate limits on public routes, append-only audit log (Doctor → Security → Recent activity), weekly encrypted backup (Sunday 2 AM), optional App Check |

Prescription requirements (single page, serial numbers, registration no., teleconsultation label,
e-sign, small footer "Not valid for medicolegal purpose.") — the live prescription page already
has these; Phase 3 will verify each against a printed A4 sample and shrink the footer wording.

## Phases

**Phase 1 — Foundation (this delivery)**
Security fixes · Tailwind · central fees · bilingual home/booking/self-check · Book Now dropdown ·
Razorpay server routes · SEO fixes · docs · unit tests.

**Phase 2 — Content & SEO (≈ 1–2 weeks)**
Condition-page template + Hindi versions · नशा मुक्ति landing page · city pages (Ajmer, Jaipur,
Nagaur, Kishangarh, Beawar, Bhilwara, Tonk) · psychotherapy page · article hub · more self-tests ·
Google Business Profile link + real reviews widget (only verified data).

**Phase 3 — Clinic system** — ✅ done so far: cloud-save fix for prescriptions (`ignoreUndefinedProperties`),
follow-ups saved to Firestore with reminder date, server PDF + secure link, notifications, real Excel
export, signature image moved out of `/public`. Remaining items below.
Doctor dashboard stays as it is — only gaps are fixed (no unnecessary redesign) · patients
collection · prescription refactor + server-side signed PDF · Excel export · video provider switch ·
2FA for doctor login.

**Phase 4 — Automation & hardening (≈ 1–2 weeks)**
WhatsApp Cloud API (booking confirmation, link, Rx, follow-up reminder) · email · App Check ·
rate limiting · audit log · scheduled backups · CSP enforcing · load & security review.

## How to run and test (on your computer)

```bash
# 1. Install (needs internet)
npm install

# 2. Configure a DEV Firebase project + Razorpay TEST keys
cp .env.example .env.local      # then fill the values

# 3. Run checks
npm run typecheck
npm test                        # unit tests (+ e-sign tests)
npm run test:rules              # needs Firebase emulator: npx firebase emulators:exec --only firestore "npm run test:rules"
npm run build                   # production build must pass

# 4. Run locally
npm run dev                     # http://localhost:3000  and  http://localhost:3000/hi
```

### Manual test checklist (before asking for production approval)
- [ ] `/` and `/hi`: header, Book Now dropdown (both options), mobile menu, language switch
- [ ] Every social link, Subscribe/Follow button, Call Now and Share opens correctly on Android, iPhone and desktop
- [ ] `/contact` and `/hi/contact`
- [ ] Confirm an appointment → Send Payment QR (WhatsApp + Email) → open link on phone → QR scans in GPay/PhonePe with correct amount
- [ ] Booking EN + HI: validation messages, save, reference number, WhatsApp continue
- [ ] Razorpay test card / UPI `success@razorpay`: appointment shows **Paid** in doctor dashboard
- [ ] Doctor payment screen: three services, discount and exemption still save
- [ ] Self-check: PHQ-9 item 9 > 0 shows the crisis box
- [ ] Doctor login, appointments, video, prescription, e-sign PIN, print
- [ ] Prescription → WhatsApp: message has secure PDF link; open link on phone → PDF with signature, footer, page numbers
- [ ] Patients → "Create UHIDs for old records" → search a patient → history shows old prescriptions/appointments/payments
- [ ] New prescription for an existing patient (same mobile) → same UHID suggested; family member with same mobile → new UHID
- [ ] Security → Turn on 2FA → scan QR → save recovery codes → sign out/in → code asked; wrong code ×5 → locked 15 min
- [ ] E-sign → edit a medicine after signing → PDF/QR page still show the signed version
- [ ] Appointments: planner day click, filters, Reschedule → patient gets message; Cancel / Mark completed
- [ ] Trigger backup once (Vercel → Cron → Run) → encrypted file arrives → open with scripts/decrypt-backup.mjs
- [ ] Scan the QR on the PDF with a phone → "Genuine prescription" page with the same medicines
- [ ] Video: Start Video (no Jitsi sign-in after JaaS keys) → Send Join Link → patient opens on phone → both in the same room
- [ ] Prescription → Email: patient receives email with PDF attached (needs Resend) — otherwise mail app opens with the link
- [ ] Excel Export → .xlsx opens in Excel/Google Sheets with 4 sheets, Hindi names readable
- [ ] Booking → patient + doctor receive WhatsApp/email (needs keys); Confirm → "confirmed" message; Auto-send payment link
- [ ] Follow-up with Reminder date = tomorrow → reminder next day 9 AM
- [ ] `/sitemap.xml` and `/robots.txt` load as XML/text (not HTML)
- [ ] Lighthouse mobile ≥ 90 for Performance, Accessibility, SEO
- [ ] Browser console: review CSP report-only warnings

### Release (only after approval)
1. Deploy `upgrade/dev` to a Vercel **Preview** with dev env vars → you test.
2. Add production env vars in Vercel (live Firebase, live Razorpay keys, webhook secret).
3. Deploy Firestore rules to production: `npx firebase deploy --only firestore:rules`.
4. Merge `upgrade/dev` → `main` → Vercel production deploy.
5. Smoke test live; keep the previous deployment ready for one-click rollback in Vercel.

### Important migration note — e-sign PIN
The old code silently fell back to a hard-coded PIN hash when no PIN record existed in Firestore.
That fallback is removed. If you have **never** used "Reset / Recover PIN", either set a PIN once
via Recover (after re-login) **or** temporarily copy the old salt/hash into
`ESIGN_LEGACY_PIN_SALT` / `ESIGN_LEGACY_PIN_HASH` (server env only).
