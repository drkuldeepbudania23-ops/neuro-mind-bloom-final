# Advanced Website Enhancement — Report

Branch `upgrade/dev`. Commits `bdcba48` (framework) and `ce3adf1` plus the final docs commit (content).
**Nothing deployed. Live site, Firebase production data and the doctor dashboard, booking, payment, video, e-prescription and patient-record flows were not changed.**

## 1. Feature completion

| # | Requirement | Status | Notes |
|---|---|---|---|
| 1 | Psychiatry library, 60–100 conditions, 18 categories | **Done** | 136 pages in total. 108 clinical pages across 22 clinical groups (plus 12 therapy and 16 service/city pages). The library page groups them, with jump links. |
| 1 | 14 sections per page | **Done** for all new pages and for 46 enriched older ones | The sections are: overview, symptoms, causes, risk factors, diagnosis (+ICD), treatment, psychotherapy, family guidance, when to seek help, self-check, FAQ, related conditions, related articles and related videos, plus the consult CTA. A few older hub-style pages (e.g. `sex-specialist-india`) have no risk-factor section by design. |
| 1 | ICD-10/11 codes | **Done where a clear code exists** | Where there is no specific code (crisis page, performance anxiety, BPSD, prescription dependence) the page shows a note instead of a code. |
| 2 | De-addiction pages | **Done** | New pages: opium (afeem), doda post, smack, heroin, ganja/bhang, charas, nicotine (smoking and vapes), prescription drugs, sedatives/sleeping pills and inhalants (whitener). These join the existing alcohol, cannabis, tobacco, opioid, gaming, gambling and internet pages. Each new page has four extra sections: dependence, withdrawal, health effects and relapse prevention. **Withdrawal warnings** (red box): alcohol, sedatives and prescription drugs, plus inhalant danger signs and heroin overdose. There is Rajasthan-specific Hindi content (manuhar, doda/bhukki, truck drivers, NDPS). |
| 2 | Gaming / gambling / internet pages | **Partial** | These have enriched sections (diagnosis, ICD, family) but not the four-part dependence/withdrawal/relapse block. |
| 3 | Sexual-health pages | **Done** | 8 new pages: delayed ejaculation, low desire, performance anxiety, vaginismus/pain, female interest/arousal, relationship difficulties, myths and psychosexual counselling. Together with the existing ED, PE and Dhat pages and the new couples therapy page, this covers all 12. They are listed on the गुप्त रोग hub. |
| 4 | Self-assessment centre | **Done** | 10 tests, each with its own page and URL. Each page has an intro, progress bar, scoring and interpretation, condition links, a booking button and the exact required disclaimer. **Licensing:** PHQ-9, GAD-7 and PHQ-15 are public domain; AUDIT is used unchanged and free; the ASRS 6-item screener is used unchanged with its © notice. DAST-10 and ISI are **not used** because of licence restrictions; original clinic checklists (drugs, sleep, study stress) replace them. Results are never stored. |
| 5 | Student centre | **Done** | 12 pages: NEET, JEE, exam anxiety, burnout, sleep, concentration, medical students, MBBS, NEET-PG, resident burnout, workplace stress and social media, plus the existing gaming page. The centre page has separate guidance for students, parents, medical students and residents. |
| 6 | Psychotherapy pages | **Done** | 11 pages: CBT, REBT, ERP, DBT skills, supportive, family, couples, marital, stress management, relapse prevention and anger management. Fees are ₹1500 for the first session and ₹1000 after that. |
| 7 | Connect articles / videos / conditions / tests | **Done** | Related conditions, articles (both directions), self-tests and videos are linked. Videos come from the clinic's real YouTube feed and are matched by keywords. If nothing matches, the page shows a "search our channel" link instead of an invented video. |
| 8 | Rajasthan SEO | **Done** | City pages: Ajmer, Kishangarh (new), Kota, Jaipur, Jodhpur, Udaipur, Bikaner, Sikar, Nagaur, Kuchaman City (new), Bhilwara, Tonk and Pali. Each has a unique title, description, local areas and its own topic links. All wording says "Ajmer-based, online video consultation"; there are no claims of a physical clinic. Every page has canonical/hreflang, a sitemap entry, breadcrumbs, JSON-LD (MedicalWebPage, MedicalCode, FAQPage, BreadcrumbList) and FAQs. A test enforces unique titles and descriptions. |
| 9 | Smart internal linking | **Done** | Hub "detailed guides" chips, centre pages, related links, articles ↔ conditions, test → condition links and search. |
| 10 | UX | **Done (not yet measured)** | Delivered: header with Students/Therapies and search, mobile search, sticky "On this page" chips, breadcrumbs on condition and hub pages, Hinglish site search, language switch and a mobile check at 390 px (0 px horizontal overflow on all previews). **Not yet measured:** Lighthouse/performance needs a real build. |

## 1b. Follow-up changes (doctor's request)

- **Treatment wording:** public pages now mention medicine *classes* only (antidepressants, antipsychotics, mood stabilisers, anti-craving medicines, opioid substitution therapy) — no individual drug names. A test enforces this (search keywords excluded).
- **Medicine search (doctor dashboard → prescription):** one ranked search over the psychiatry pack list, the A–Z core list, new extra brands (several per psychiatric generic) and 26 added generics (e.g. alprazolam, modafinil, trazodone, ziprasidone, paliperidone, sildenafil, tadalafil, dapoxetine, disulfiram, prazosin), and the official company catalogues. Animal-health rows removed; duplicates merged (pack-level row wins, company corrected). Spacing/hyphens ignored ("s citadep"), multi-word queries ("olanzapine 10"). **+ Add brand to list** lets the doctor save his own brands (Firestore `doctorMedicines`, doctor-only rule; device copy as fallback). Rows not from a pack-level source show "verify strength on pack".
- **Diagnosis search:** full ICD-10 Chapter V (F00–F99, all blocks, substance F10–F19 subcodes) with ICD-11 equivalents where one exists (left blank, never guessed, where not), ICD-11-only diagnoses (complex PTSD, prolonged grief, gaming, hoarding, BDD, binge eating…), common G/Z/X codes used in psychiatry, ranked results and Hinglish words (neend, ghabrahat, daru, afeem, mirgi…). The existing curated list stays first.
- **Deploy note:** `firestore.rules` gained the `doctorMedicines` rule — deploy rules to the dev project first.

## 2. Test & build results (this environment)

| Check | Result |
|---|---|
| Unit tests (`tsx --test tests/*.test.ts`) | **89 / 89 pass**. 10 new library tests check links, unique titles, substance sections, sedative warning tone, that no doses appear, crisis numbers, test licensing fields, Hinglish search and video matching. |
| TypeScript (strict, with shims) | **0 errors in new or changed code.** Two real bugs were found and fixed (`Article.excerpt`). The remaining reports come only from missing shims for `firebase/auth`, `React.CSSProperties` and Next's `fetch({ next })` in untouched files. |
| esbuild syntax check of all changed files | Pass |
| Server render + Playwright screenshots (390 px and 1366 px) | 8 pages rendered: condition EN/HI, therapy, hub, centre, search, library and test. No overflow. |
| `npm install` / `next build` / `next lint` / Lighthouse | **Not run.** The npm registry is blocked in this workspace. These must be run on your computer or in a Vercel Preview before going live. |

## 3. New / modified files (this enhancement)

**New:**
- `app/{,hi/}search`, `app/{,hi/}self-assessment/[test]`, `app/{,hi/}student-mental-health`, `app/{,hi/}psychotherapy`
- `components/content/{CentrePage,SearchPage}.tsx`
- `lib/content/{library,search,centres,selfTestPages}.ts`, `lib/youtube/match.ts`
- `lib/content/conditions/{_h,enrich-mental,enrich-other,new-mood-anxiety,new-psychosis-sleep-trauma,new-child-eating-dementia,new-substances,new-sexual,new-students,new-therapies}.ts`
- `tests/library.test.ts`
- `docs/CONTENT-ENHANCEMENT-PLAN.md`, `docs/ENHANCEMENT-REPORT.md`

**Modified:**
- `components/content/{ConditionPage,ConditionsLibrary,HubPage}.tsx`, `components/assessment/SelfAssessment.tsx`, `components/site/{SiteHeader,icons}.tsx`
- `lib/assessments.ts`, `lib/content/{types,articles,home,hubs}.ts`, `lib/content/conditions/{index,cities}.ts`
- `app/sitemap.ts`, `app/{,hi/}self-assessment/page.tsx`
- `docs/CHANGELOG.md`

## 4. Remaining work (honest list)

1. **Medical review by Dr. Budania of all new page text** before going live. This is essential for clinical accuracy and for the "medically reviewed by" line.
2. Run `npm ci && npm run build && npm run lint && npm test`, then a Lighthouse check on a Vercel Preview.
3. Confirm the YouTube channel ID so that video matching shows real videos.
4. Clinic address and OPD timings, if in-person visits are offered. Only then can the city pages mention them.
5. Optional: add the four-part dependence/withdrawal/relapse block to the gaming, gambling and internet pages.
6. Still pending from before: UPI ID, Google Business link, Razorpay test keys, a dev Firebase project.

## 5. Setup

```bash
git clone git-history-all-phases.bundle nmb-upgrade && cd nmb-upgrade && git checkout upgrade/dev
npm ci
cp .env.example .env.local   # fill with DEV Firebase + test keys only
npm test && npm run build && npm run dev
```
Deploy only to a **Vercel Preview** connected to a **dev Firebase project**. See `GO-LIVE-CHECKLIST.md`.
