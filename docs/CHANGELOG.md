# Changelog — Neuro Mind Bloom upgrade (branch `upgrade/dev`)

Nothing here has been deployed. The live site is untouched; `f5e4dc4` is its exact source.

| Phase | Commit | What changed |
|---|---|---|
| Baseline | `f5e4dc4` | Live site source as uploaded (untouched) |
| 1 — Foundation | `bff125e` | Security fixes (Firestore rules, hard-coded PIN hash removed, headers), Tailwind, bilingual homepage / booking / self-check, Book Now dropdown, Razorpay routes, SEO fixes, docs |
| 1b — Social & contact | `93a49d2` | Official FB / Instagram / YouTube / WhatsApp links, Subscribe / Follow, Call Now, Share, bilingual Contact page, Hindi + English + Hinglish complaint search, AUDIT & ASRS tests, dashboard Sign out + Video card |
| 1c — Trust & payment QR | `60e0522` | Registration no. hidden on public site, stats (8+ yrs, 14,000+ patients, 4.5★, Senior Specialist), Send Payment QR (WhatsApp / Email) after confirming, bilingual /pay UPI QR page, original OCD & tobacco checklists |
| 2 — Content & SEO | `68225fe` | Official logo, bilingual condition library (all old URLs kept), नशा मुक्ति & गुप्त रोग hubs, psychotherapy, resources, FAQ, 10 city pages, articles, YouTube hub, sitemap with hreflang |
| 2b — More pages | `a9ae72d` | Anxiety spectrum, phobias, dissociative, somatoform; child (ADHD, IDD, ODD, tics, autism, learning); geriatric; neuropsychiatry (epilepsy, post-stroke depression, dementia, headache) |
| 3 — Clinic automation | `6c58ff7` | Server PDF prescription + secure 30-day link, WhatsApp / email automation, real Excel export, cloud-save bug fixed, follow-up reminders, signature moved out of /public |
| 3 — fixes | `4d633c7`, `cbba2c6` | Generic name under brand; signature upright |
| 3 — Verification | `17facfb` | QR on every prescription → "Genuine prescription" page; JaaS private video rooms |
| 3 — Video choice | `90e010c`, `992214e` | Doctor picks Google Meet (default), Daily.co, Zoom, JaaS or Jitsi per appointment; one patient link for all |
| 3 — Patients | `f1199d2` | UHID per patient, old-record backfill, consultation history timeline, UHID on PDF / Excel |
| 3 — Security & planner | `00535fa` | 2FA (authenticator app) enforced in database rules, server-side e-sign with frozen signed copy, rate limits, audit log + activity view, weekly encrypted backups, optional App Check, appointments planner (filters, reschedule, payment badges) |
| 4 — Advanced content | `bdcba48`, `ce3adf1` | 14-section condition template + ICD codes, 74 new bilingual pages (library now 136: substances incl. afeem/doda/smack/sedatives with withdrawal warnings, sexual health, students, 11 therapies, eating, dementia, crisis), 10 self-tests with own pages (PHQ-15 + original checklists; licensing checked), Hinglish site search, student & psychotherapy centres, Kishangarh & Kuchaman City pages, breadcrumbs. See `ENHANCEMENT-REPORT.md` |
| 4b — Rx search & wording | see git log | Public pages name medicine classes only (antidepressants, antipsychotics, anti-craving, substitution therapy). Prescription screen: ranked medicine search over ~4,700 brand lines (psychiatry pack list, A–Z core list, 40+ extra brands and 26 extra generics, official catalogues; animal-health rows removed, duplicates merged), "+ Add brand to list" saved to Firestore `doctorMedicines` (doctor-only rule). Diagnosis search: full ICD-10 Chapter V (F00–F99 incl. F10–F19 subcodes) + ICD-11 equivalents, ICD-11-only diagnoses, common G/Z codes, Hinglish search (~360 entries) |
| 5 — Master Prompt | `67f220b` … `4180884` | Doctor profile page + certificates (no photos) + memberships; homepage in 15 sections; 25 Rajasthan cities, 5 state hubs, all-India and international hubs; 130 structured bilingual articles with search/filters/popular/recent + doctor article CMS; patient feedback (moderated, public display off) and recovery stories (consent + review gated); dependence/relapse blocks for gaming, gambling, internet; bilingual 404. See `MASTER-PROMPT-REPORT.md` |
| 5b — Rating & payment | see git log | Homepage 4.5/5★ rating badge. `/pay` now shows the clinic's own Razorpay UPI QR (`neuromindbloom266340.rzp@rxairtel`, payload unchanged, patient enters the amount shown) and a Razorpay.me button (`razorpay.me/@neuromindbloom`) for card / net-banking. Booking and Razorpay checkout logic unchanged |

Tests: `npm test` (89 unit tests). See `DEVELOPMENT-PLAN.md` for the manual test checklist.
