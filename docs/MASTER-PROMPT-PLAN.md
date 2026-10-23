# Consolidated Master Prompt — gap analysis and plan

Base: branch `upgrade/dev` at commit `388cbc3` (all earlier phases). Nothing is deployed.

| Part | Requirement | Status before this round | Plan |
|---|---|---|---|
| 1 | Development rules | Followed | Same: dev branch only, no deploy, no production data |
| 2 | Doctor profile, leadership, memberships | **Missing** — no profile page; the homepage "About" section only | New `/dr-kuldeep-budania` (+ `/hi/`) page with Physician schema; data lives in `lib/content/profile.ts` |
| 2 | Verified stats | 8+ yrs, 14,000+ and 4.5★ shown without a source | **Updated per doctor:** all stats including the 4.5/5★ rating are shown. The source label/link ("Google reviews") appears automatically once `RATING.url` is set in `lib/site.ts` |
| 3 | Certificates | **Missing**; no certificate images were supplied | 4 certificate cards (title / institution / year). **Per doctor: no certificate photos** — cards show text only (no View button). Code of Conduct certificate excluded |
| 4 | Homepage order (15 sections) | 11 sections, different order | Reorder and add: Doctor intro + profile link, Specialities, De-addiction, Sexual health, Patient experience (no testimonials), Recovery education, Latest articles, Videos |
| 5–10 | Library, de-addiction, sexual health, tests, students, therapy | Done in the previous round (136 pages) | Add the dependence/withdrawal/relapse block to the gaming, gambling and internet pages |
| 8 | DAST-10, ISI | Not used — licence restrictions (DAST-10 © CAMH/Skinner, ISI © Mapi) | Keep original clinic checklists; documented |
| 11 | 130 articles + library features + CMS | 6 articles, basic list | Expand to 130 structured bilingual articles with verified guideline-level references only (WHO, NICE, MoHFW, ICD). Add search, category filters, popular, recently updated and reading time. Add a doctor-only article CMS (Firestore `cmsArticles`: draft / preview / publish / unpublish, categories) |
| 12 | Patient feedback | Missing | Public form with consent → Firestore `feedback` (create-only). Doctor moderation page (approve / edit / reject / delete). Public display flag **off** |
| 13 | Recovery stories | Missing | Doctor-only CMS (`recoveryStories`) with consent, doctor-review and fictional-example label. The public page lists only published stories; none exist by default |
| 14 | Videos | Feed + keyword matching | Lazy embeds (click-to-load), a homepage video section and videos on articles |
| 15 | Rajasthan 25 cities | 13 city pages + Rajasthan page | Add 12 cities with distinct local notes and turn `/psychiatrist-rajasthan` into a hub listing all 25 |
| 16 | North India | Missing | 5 state hubs (UP, MP, Haryana, Punjab, Delhi-NCR), each with its priority cities as distinct sections. No thin per-city pages |
| 17 | All-India | Online pages exist | `/locations/india` hub covering the 10 metros and topic links |
| 18 | International | Missing | `/international` educational hub with an eligibility statement (consultations for patients in India only), country helplines and NRI family guidance |
| 19 | Technical SEO | Sitemap, robots, hreflang, canonical and breadcrumbs exist | Add a 404 page, OG on new pages, Physician/Article schema and author/reviewer lines |
| 21 | Navigation | Header has search | Add profile, articles and locations in the footer/header; add an article search page |
| 22 | Booking etc. | Must not change | Untouched |


**Status after this round:** every row above is implemented — see `MASTER-PROMPT-REPORT.md` for evidence, tests and the remaining items.
