# Advanced website enhancement — inventory & implementation plan

Brief: `ADVANCED WEBSITE ENHANCEMENT` (10 phases). Work is done only in this project (branch
`upgrade/dev`). Nothing is deployed; the live site and Firebase data are untouched. The doctor
dashboard, booking, payment, video, e-prescription and patient-record workflows are not changed.

## 1. What already existed (before this work)

| Area | Already in the project | Gap |
|---|---|---|
| Condition library | 47 clinical pages + 3 service pages + 12 location pages (EN + HI), FAQ schema, breadcrumbs, related conditions | Pages had 6 sections (intro, symptoms, causes, treatment, when to seek help, FAQ). Missing: risk factors, diagnosis, psychotherapy, family guidance, ICD codes, related articles/videos/tests. Categories were broad (9). Several requested conditions missing |
| De-addiction | `/nasha-mukti` hub; pages: alcohol, opioids (combined), cannabis (combined), tobacco/nicotine (combined), gaming, gambling, internet, SUD overview | Separate pages for opium, doda post, smack, heroin, ganja, charas, nicotine, prescription drugs, sedatives; withdrawal-safety emphasis; relapse prevention & family sections |
| Sexual health | `/gupt-rog-sexual-health` hub; ED, PE, Dhat, porn overuse, sex-specialist pages | Delayed ejaculation, low desire, performance anxiety, vaginismus/genito-pelvic pain, female interest/arousal, relationship difficulties, myths, psychosexual counselling, couples therapy |
| Self-assessment | PHQ-9, GAD-7, AUDIT, ASRS + clinic OCD & tobacco checklists on one page | No per-test pages/intro, no progress indicator, no condition links, licensing notices incomplete |
| Students | One exam-stress page + resources section | Student centre with NEET/JEE/NEET-PG/MBBS/resident pages and audience-specific guidance |
| Psychotherapy | One psychotherapy-counselling page | Separate pages for 10 therapies |
| Articles / videos | 6 articles; videos hub from YouTube feed | Content not connected to conditions; no related videos on condition pages |
| Rajasthan SEO | 10 city pages + Ajmer + Rajasthan; sitemap with hreflang; canonical/alternates | Kishangarh & Kuchaman City missing; city pages too similar |
| UX | Bilingual header, mobile menu, Book Now dropdown | No site search, no on-page contents, condition categories too broad |

## 2. Licensing check for questionnaires (done before implementing)

| Tool | Status | Decision |
|---|---|---|
| PHQ-9, GAD-7, PHQ-15 | Public domain — phqscreeners.com: "no permission is required to reproduce, translate, display or distribute" | ✅ Use (PHQ-15 added) |
| AUDIT (WHO) | No permission needed for non-commercial use; organisations may reproduce if not materially changed; respondents must not be charged | ✅ Use, free, unchanged, with WHO notice |
| ASRS v1.1 6-question screener | Free, no permission; must keep the copyright notice (NYU & Harvard), cite, not alter | ✅ Use with copyright notice |
| DAST-10 | © 1982 Harvey Skinner & CAMH — "please contact Dr. Harvey Skinner" | ❌ Not used → original clinic drug-use checklist |
| ISI (Insomnia Severity Index) | © Charles Morin, licensed via Mapi Research Trust | ❌ Not used → original clinic sleep checklist |
| EPDS | © Royal College of Psychiatrists; written permission needed to republish | ❌ Not used |

Results are calculated in the visitor's browser and never stored or sent.

## 3. Implementation order

1. Framework — richer condition template (14 sections), 18 clinical categories, ICD-10/ICD-11
   fields, related articles / videos / self-tests, on-page contents, site search, therapy template.
2. Phase 1 content — upgrade every existing clinical page; add missing conditions.
3. Phases 2–3 — de-addiction knowledge centre and sexual health pages.
4. Phase 4 — self-assessment centre (per-test pages, progress, interpretation, links).
5. Phases 5–6 — student centre, psychotherapy pages.
6. Phases 7–10 — articles/videos linking, Rajasthan location pages, internal linking, UX.
7. QA — content completeness tests, link tests, typecheck, previews, reports, ZIP.

## 4. Content rules followed

- Original wording; nothing copied from the reference site.
- No invented statistics, reviews, testimonials or videos. Related videos come only from the clinic's
  real YouTube feed; if none match, the page links to a search of the clinic's channel.
- ICD-10 and ICD-11 codes only where a clear category exists; otherwise the field is left out.
- No medicine doses on public pages. Alcohol and sedative withdrawal pages state clearly that
  withdrawal can be dangerous and needs medical supervision.
- Location pages state plainly: the practice is based in Ajmer and other cities are served by online
  video consultation. No clinic address or in-person timings are claimed until Dr. Kuldeep confirms them.
