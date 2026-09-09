# Neuro Mind Bloom — Final consolidated source

This package is based on the latest `neuro mind bloom source.zip` supplied on 08-Sep-2026.

## Included / consolidated
- Existing live website structure retained.
- Appointment booking saved to Firestore and shown in doctor dashboard.
- Consultation fee ₹500 and psychotherapy fee ₹2000.
- Patient complaint search in Hindi + English at booking.
- Doctor e-prescription complaint selection in English only.
- E-prescription can prefill patient name/mobile/age/sex and recognized preset complaints from appointmentId.
- Searchable ICD-10 / ICD-11 psychiatry diagnosis list expanded across common mood, anxiety, psychosis, substance, child, cognitive, eating, personality, sexual and behavioural conditions.
- Generic + brand medicine search with newer psychiatry drugs already present in the source database.
- PIN-based doctor e-sign flow with prescription ID, date/time and Registration No. 30526.
- Teleconsultation marking on prescription when opened from an appointment/video flow.
- `NOT VALID FOR MEDICOLEGAL PURPOSE` warning retained at prescription bottom.
- Confirmed appointments available in Video Consultations with patient WhatsApp join-link flow.
- Follow-up and payment pages retained.
- Capacitor Android wrapper retained separately from website behaviour and points to https://neuromindbloom.com.

## Build note
The source package itself does not include npm dependencies. Run `npm install` once on a machine with internet, then `npm run build` or `npm run dev`. The current execution environment could not complete dependency download within its execution window, so a full Next.js production compile was not completed here.
