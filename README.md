# Neuro Mind Bloom — website & clinic system

Dr. Kuldeep Budania · MBBS, MD Psychiatry · मानसिक रोग, नशा मुक्ति एवं सेक्स रोग विशेषज्ञ
https://www.neuromindbloom.com

> **Branch `upgrade/dev`** — development of the upgraded site. The live site is NOT modified;
> the first commit on `main` is the untouched live source. Do not deploy without approval.

## Quick start
```bash
npm install
cp .env.example .env.local   # fill DEV Firebase project + Razorpay TEST keys
npm run dev                  # http://localhost:3000  (Hindi: /hi)
npm test && npm run typecheck && npm run build
```

## Docs
- `docs/COMPARISON.md` — comparison with Dr. Akash Parihar's website
- `docs/ARCHITECTURE.md` — stack, data model, workflow, security
- `docs/DEVELOPMENT-PLAN.md` — feature status, phases, test checklist, release steps
- `docs/CHANGELOG.md` — what each phase changed
- `docs/GO-LIVE-CHECKLIST.md` — setup, env vars, safe release steps
- `docs/NOTIFICATIONS.md` — WhatsApp / email automation and template texts

## Where to change things
- Fees, phone numbers, doctor details, social links → `lib/site.ts`
- Homepage text (English + Hindi) → `lib/content/home.ts`
