# Neuro Mind Bloom — Development Audit and Release Gate
Date: 2026-10-11
Branch: claude-website-upgrade-2026-10-11
Production policy: NEVER merge or deploy without explicit owner approval after full verification.

## Verified from repository
- Next.js 15 / React 19, Firebase client and firebase-admin dependencies.
- Existing homepage: app/page.tsx; doctor dashboard: app/doctor/page.tsx.
- Dashboard currently links to appointments, prescription, follow-up, and payment.
- Firestore rules use a doctor custom claim and include payment and e-sign checks.
- Homepage FAQ still says psychotherapy fee 2000; requested pricing is 1500 first session and 1000 follow-up.
- Homepage booking form currently opens a WhatsApp message; verify separately whether a website booking route exists.
- README also lists outdated psychotherapy fee 2000.
- Layout includes SEO metadata and structured-data component.

## Non-negotiable requirements
- Hindi and English across the site and every self-assessment.
- Doctor: Dr. Kuldeep Budania, MBBS, MD Psychiatry.
- Hindi designation: मानसिक रोग, नशा मुक्ति एवं सेक्स रोग विशेषज्ञ.
- Book Now choices exactly: Website Booking and WhatsApp Booking.
- Psychotherapy first session INR 1500, follow-up INR 1000.
- Preserve all working prescription, medication-search, e-sign/E-PIN, appointments, patient records, payment, and video-consultation features.
- No real patient data in development, logs, or screenshots.
- Review medical content and assessment licensing/scoring before publishing.
- Protect production Firebase, secrets, and all clinical records.

## Implementation gates
1. Inventory all app routes, server actions, Firestore collections/rules, environment variables (names only), integrations, and existing tests.
2. Audit authentication, doctor role, patient data access, e-sign security, PDF print, WhatsApp/email delivery, booking/payment and video workflow.
3. Implement bilingual design/content architecture, content review workflow, assessment tools and SEO incrementally on this branch.
4. Validate fees and public content against owner-approved requirements.
5. Run build, lint/type checks, automated tests and mobile/browser accessibility checks.
6. Test all end-to-end patient and doctor flows using synthetic data on isolated non-production services.
7. Provide preview URL, issue log and rollback plan; owner explicitly approves before merge/deployment.

Status: initial source inspection only. No build, end-to-end test, or production deployment has been performed.
