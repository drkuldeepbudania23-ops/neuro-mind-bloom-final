# Neuro Mind Bloom vs. Dr. Akash Parihar website — comparison

Source: 55 mobile screenshots of Dr. Akash Parihar's site (Asha Wellness Sanctuary, Kota) and the
live Neuro Mind Bloom source code (zip of `neuro-mind-bloom-final-main`).

## 1. What the reference site does well

| Area | What they have | Why it works |
|---|---|---|
| Header | Sticky header: logo · orange **Book Now** · green menu button | Booking is one tap away on every screen |
| Booking | Menu with **Book via WhatsApp** (bright green) + website booking | Most Indian patients prefer WhatsApp |
| Trust | Rating tiles (Google, JustDial), "Top-3" listing, MD college, faculty role, Practo verified | Builds credibility before the patient scrolls |
| About | Long bio + **timeline** (MBBS → MD → founded clinic → academic role) | Clear, story-like credentials |
| Conditions | Big dark-green cards, each with **Hindi name** (अवसाद, चिंता विकार…) and "Learn more" | Bilingual search terms, easy scanning |
| Resource hub | Condition library, student mental health, women's health, child & family, LGBTQ+ safe space, video hub | Positions doctor as an educator; strong SEO |
| Local SEO | City/district grid (Kota, Baran, Bundi, Jhalawar…), "Best psychiatrist in Kota" guides, Gupt rog / Dhat / Nasha mukti landing pages | Captures local search traffic |
| Articles | Blog cards with author + read time; LinkedIn newsletter "The Psychiatric Blueprint" | Fresh content, authority |
| FAQ | Long bilingual FAQ (English + Hindi in the same question) | Answers objections; FAQ rich results |
| Self-assessments | Free tests: Depression, Anxiety, OCD, ADHD, Addiction (AUDIT-C / DAST) | Engagement + converts worried visitors |
| De-addiction page | Very deep Hindi landing page: statistics, desi-vs-medical comparison, 3-phase treatment, family guide (CRAFT), emergency signs, myths vs facts, testimonials, privacy (MHCA 2017 / NDPS) | Speaks directly to Hadoti families in their language |
| Conversion | Floating WhatsApp button, sticky "अभी WhatsApp" bar, final CTA "नई ज़िंदगी की शुरुआत एक call से होती है" | Many chances to act |
| Language | Google-Translate style language dropdown at the bottom | (Weak — machine translation) |

## 2. Where Neuro Mind Bloom already goes further

The reference site is a **marketing site**. Neuro Mind Bloom is already a **clinic system**:

- Doctor login with Firebase custom claim (`doctor: true`) and protected dashboard
- Appointments saved to Firestore and managed by the doctor
- Payment recording with **discount / exemption** enforced by Firestore rules
- Video consultation rooms with patient WhatsApp join link
- **E-prescription** with ICD-10 / ICD-11 diagnosis search, generic + brand medicine database,
  8-digit **e-sign PIN** (PBKDF2, server-verified), teleconsultation label, print/PDF, WhatsApp/email
- Patient records + CSV export, follow-up page
- 31 SEO landing pages for conditions and cities
- Android app wrapper (Capacitor)

## 3. Gaps on Neuro Mind Bloom (before this upgrade)

| Gap | Impact |
|---|---|
| Homepage was plain and English-only; icon slots were empty, the **mobile menu button had no icon (effectively invisible)**, and a floating "Doctor Login" button was shown to every patient | Low trust; mobile visitors could not open the menu |
| No Hindi version of any page | Misses most Rajasthan searches and patients |
| Fees outdated (Psychotherapy ₹2000) | Wrong information |
| No Book Now dropdown, no website + WhatsApp choice | Fewer bookings |
| No online payment for patients (only doctor-side manual recording) | Extra follow-up work |
| No self-assessments, no articles, no psychotherapy page | Weak engagement and SEO |
| Condition pages are ~3 short paragraphs each, unstyled | Thin content — Google ranks them low |
| No credentials/trust section (college, experience, registration shown prominently) | Lower conversion |
| Middleware served `sitemap.xml` / `robots.txt` / images as `text/html` with `no-store` | SEO + speed problem |
| Several security issues (see `ARCHITECTURE.md` §6) | Patient-data risk |

## 4. What we adopt — and what we deliberately do NOT copy

**Adopt (adapted to our brand):** sticky header with Book Now dropdown; floating WhatsApp; bilingual
condition cards with Hindi names; fees section; how-it-works steps; psychotherapy explainer; privacy
section (MHCA 2017); bilingual FAQ; crisis helpline banner; free self-assessments; local-city pages
(Ajmer, Jaipur, Nagaur, Kishangarh, Beawar, Bhilwara…); deep Hindi नशा मुक्ति landing page; article hub.

**Do not copy:**
- Unverifiable numbers ("10,000+ patients", "70–80% recovery", "4.9★ 500+ reviews") — only show
  figures you can prove, and link to the source (e.g., your actual Google Business profile).
- Patient testimonials with disease details — check current NMC guidance on advertising and
  testimonials before publishing any; if used, only with written consent and fully anonymised.
- "WHO-approved centre" style claims unless there is a document behind them.
- Google-Translate widget — we publish real Hindi pages instead (`/hi/...`), which Google indexes.
- Copying their text, design or images. Our design (forest green + saffron, Fraunces + Mukta) is original.

## 5. Result of Phase 1

See `DEVELOPMENT-PLAN.md` for the feature-by-feature status.

## 6. Parity checklist — Dr. Akash Parihar's site is the MINIMUM in every area

Status: ✅ done · 🔜 next phase · ❓ needs information from Dr. Kuldeep

| Area (reference site) | Neuro Mind Bloom upgrade |
|---|---|
| Sticky header + Book Now | ✅ Book Now dropdown (Website / WhatsApp) + top bar with Call, language, social icons |
| Book via WhatsApp | ✅ Header dropdown, hero, footer, contact page, floating button |
| Call button | ✅ "Call Now · +91 81076 39481" in top bar, hero, mobile menu, footer, contact page |
| Social links | ✅ Facebook, Instagram, YouTube, WhatsApp — header, footer, contact page, homepage section |
| YouTube Subscribe / Follow buttons | ✅ Subscribe (opens YouTube's subscribe prompt), Facebook Follow, Instagram Follow |
| Share website | ✅ Native share sheet on phones; WhatsApp / Facebook / Copy link fallback |
| Language | ✅ Real Hindi pages (`/hi/...`), not machine translation |
| Contact section | ✅ Separate bilingual Contact page |
| Condition cards with Hindi names | ✅ Homepage + full condition library (/conditions): 52 condition/service pages (incl. anxiety spectrum, dissociative/somatoform, child — ADHD, IDD, ODD, tics, autism, learning; geriatric; neuropsychiatry) + 10 city pages, each in English and Hindi with FAQ rich results |
| Self-assessments (Depression, Anxiety, Addiction, ADHD, OCD) | ✅ PHQ-9, GAD-7, AUDIT (alcohol), ASRS (adult ADHD) + clinic-written OCD and tobacco/gutka checklists (original wording, not copies of copyrighted scales) |
| Bilingual FAQ | ✅ Homepage + /faq page with FAQ rich results |
| Privacy / MHCA 2017 section | ✅ |
| Crisis / emergency help | ✅ Tele-MANAS 14416 on home, booking, self-check, contact |
| Booking complaint search | ✅ Hindi + English + Hinglish ("neend", "ghabrahat", "daru", "dhat"), common-problem chips |
| About / credentials | ✅ Stats band: 8+ years, 14,000+ patients, 4.5★ rating, MD · Senior Specialist (college not shown — as instructed; registration no. shown only inside doctor dashboard / prescription) |
| Ratings & listings (Google, Practo, JustDial) | ✅ 4.5★ shown · ❓ send the Google Business Profile link so the rating can link to its source |
| Clinic address, map, timings | ❓ Need: full Ajmer address, OPD days/timings |
| Deep नशा मुक्ति landing page | ✅ /nasha-mukti — substances, 3-phase treatment, family guide (CRAFT), emergency signs, 6 myths vs facts, privacy, FAQ |
| Gupt rog / Dhat / sexual health pages | ✅ /gupt-rog-sexual-health hub + dhat, PE, ED, porn-overuse, sex-specialist (India/Ajmer) pages |
| Resource hub (student, women, child & family, elderly) | ✅ /resources — students, women, children & parents, families of addicts, elderly, couples, LGBTQ+-inclusive statement |
| Articles / blog with author & read time | ✅ /articles — 6 bilingual articles with author, date, read time, Article schema |
| City pages (Ajmer, Jaipur, Nagaur, Kishangarh, Beawar, Bhilwara, Tonk…) | ✅ Ajmer + Rajasthan + 10 cities (Jaipur, Jodhpur, Kota, Udaipur, Bhilwara, Nagaur, Bikaner, Tonk, Sikar, Pali) — honest "online consultation" pages |
| YouTube video hub (embed latest videos) | ✅ /videos — auto-updates from the channel feed every 6 hours |
| Testimonials | Only with written consent + after checking current NMC guidance |

| Logo | ✅ Official Neuro Mind Bloom emblem (from the social-media logo) in header, footer, favicon, app icon and share image; tagline "Mind Care, Life Care" |
| E-prescription sharing (reference site has none) | ✅ Server PDF + secure 30-day link on WhatsApp; email with PDF attached |
| Automatic messages (reference site has none) | ✅ Booking / confirmation / payment / prescription / follow-up reminders on WhatsApp + email (after keys are added) |
| Excel export | ✅ Real .xlsx — patient records, appointments, payments, follow-ups |
| Prescription authenticity (reference site has none) | ✅ QR code on every PDF → "Genuine prescription" check page for pharmacists |
| Video consultation | ✅ Private JaaS rooms with signed patient links (after keys are added) |
