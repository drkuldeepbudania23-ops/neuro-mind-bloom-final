# Residents' learning section (Phase 1)

Paid learning area for psychiatry residents: notes (PDF), video lectures (YouTube, unlisted)
and case discussions with comments. Sold on the website only (Razorpay), so the future
Android/iPhone apps can show the same content without store commission.

## Pages

| URL | Who | What |
|---|---|---|
| `/residents` | Public | About the programme, plans, Join / Sign in |
| `/residents/login` | Public (noindex) | Email + password sign up / sign in, password reset |
| `/residents/app` | Signed-in resident (noindex) | Profile, plan purchase / renewal, content list (locked until paid) |
| `/residents/app/[id]` | Active subscriber | Note PDF (watermarked), video, case + discussion |
| `/doctor/residents` | Doctor (claim + 2FA) | Content editor, subscribers & payments, comment moderation, plan prices |

## How access works

- Residents are ordinary Firebase Auth users (no custom claim). Their record is `residents/{uid}`.
- `accessUntil` is written **only by the server** after a verified Razorpay payment
  (`/api/residents/verify` + the existing webhook) or a doctor grant. Early renewal adds days on top.
- All residents' collections are server-only (`firestore.rules` deny client access). Every API route
  verifies the Firebase ID token; content routes also check `accessUntil > now` and `blocked != true`.
- Plan amounts come from `residentConfig/plans` (doctor-editable) or the defaults in `lib/residents.ts`
  (₹999 / 30 days, ₹9,999 / 365 days). The browser never sends an amount.

## Notes PDFs

1. Doctor uploads the PDF from `/doctor/residents` → Cloud Storage `residents/notes/<id>.pdf`
   (`storage.rules`: doctor-only write, nobody can read directly).
2. A resident taps “Open notes” → the server stamps their name, mobile, email and date on every page
   (pdf-lib), stores `residents/licensed/<uid>/<id>.pdf`, and returns a **10-minute** signed link.

## One-time setup (dev project first, then live after approval)

1. Firebase console → **Storage** → Get started (needs the Blaze plan on new projects).
2. Deploy rules: `firebase deploy --only firestore:rules,storage`.
3. Env vars (Vercel): existing `FIREBASE_SERVICE_ACCOUNT_BASE64`, `RAZORPAY_KEY_ID/SECRET`,
   `RAZORPAY_WEBHOOK_SECRET`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`. Optional `RESIDENT_STORAGE_BUCKET`
   if notes should live in a different bucket.
4. Razorpay webhook: no change — the existing `/api/payments/razorpay/webhook` now also records
   resident subscription orders (`payment.captured` / `order.paid`).
5. Firebase Auth: Email/Password sign-in must be enabled (already used by the doctor login).

## Not in Phase 1

- `/residents` is not yet in `sitemap.ts` (the sitemap assumes every page has a Hindi twin); add it at go-live.
- Android/iPhone app shells (Phase 2–4, see the app plan).
