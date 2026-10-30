# Residents' learning section (Phase 1)

Paid learning area for psychiatry residents: notes (PDF), video lectures (YouTube, unlisted)
and case discussions with comments.

**Content is app-only; purchase is website-only.** The Android/iPhone apps (Capacitor, loading
the live site) append `NeuroMindBloomApp/1` to their user-agent (`capacitor.config.ts`,
`lib/appShell.ts`). `middleware.ts` redirects browsers away from `/residents/app/**` and refuses
`/api/residents/content/**` outside the app; inside the app it refuses `/api/residents/order` and
redirects `/residents/join`. The app shows no prices, buy buttons or payment links, and only signs in
(no account creation), so no store billing or in-app account deletion is required. Nothing under
`/residents` is linked from the site or indexed; the doctor shares the payment link directly.

## Pages

| URL | Who | Where | What |
|---|---|---|---|
| `/residents` | Anyone with the link (noindex) | Browser | "Open the app" page — no prices |
| `/residents/join` | Resident (noindex) | Browser only | Sign up / sign in, profile, plans, Razorpay payment, "now open the app" |
| `/residents/login` | Resident (noindex) | Both | Sign in (sign-up only in the browser); returns to `/residents/join` in a browser, `/residents/app` in the app |
| `/residents/app` | Signed-in resident | App only | Access status, content list (locked until paid), profile |
| `/residents/app/[id]` | Active subscriber | App only | Note PDF (watermarked), video, case + discussion |
| `/doctor/residents` | Doctor (claim + 2FA) | Browser | Payment link (copy / WhatsApp), content editor, subscribers & payments, comments, plan prices |

The user-agent check is a product boundary, not a security control: content access is still enforced
server-side by `accessUntil` for every request. Older app builds without the marker are recognised on
the client through the Capacitor bridge, but the content APIs need the marker — ship the next app build
before inviting residents.

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

- `/residents` stays out of `sitemap.ts` on purpose (not public).
- Android/iPhone app builds with the user-agent marker, in-app PDF viewer, push notifications (Phase 2–4, see the app plan).
- Store links on `/residents` once the apps are published.
