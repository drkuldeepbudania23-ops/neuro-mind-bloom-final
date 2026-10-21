import Link from "next/link";
import Logo from "../site/Logo";
import { CLINIC } from "../../lib/site";
import type { PrescriptionRecord } from "../../lib/rx/pdf";

/** Web page can show Hindi, so only trim and cap the text. */
function txt(value: string | undefined): string {
  return String(value ?? "").trim().slice(0, 200);
}

export type VerifyView =
  | { status: "invalid" }
  | {
      status: "valid";
      record: PrescriptionRecord & { sealed?: boolean; changedAfterSigning?: boolean };
      maskedName: string;
      doctor: { name: string; degrees: string; registrationNo: string };
    };

/**
 * Public result page for the QR code printed on every e-prescription.
 * Bilingual on one screen (pharmacists and patients both read it).
 * Shows only what is already printed on the prescription, with the
 * patient's name partly masked.
 */
export default function VerifyPrescription({ view }: { view: VerifyView }) {
  return (
    <div className="nmb min-h-screen bg-cream">
      <header className="border-b border-forest-100 bg-white">
        <div className="mx-auto flex h-16 max-w-xl items-center px-4">
          <Link href="/">
            <Logo lang="en" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-8">
        {view.status === "invalid" ? (
          <div className="rounded-3xl bg-white p-6 text-center shadow-[0_20px_60px_rgba(6,43,49,0.12)] md:p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fde8e4] text-3xl text-[#b23a1f]" aria-hidden>
              !
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-forest-900">Not verified · सत्यापित नहीं</h1>
            <p className="mt-3 text-forest-800">
              This code is not valid or has expired. Do not dispense on the basis of this prescription without calling the clinic.
            </p>
            <p className="mt-2 text-forest-800" lang="hi">
              यह कोड मान्य नहीं है या इसकी अवधि समाप्त हो गई है। क्लिनिक से पुष्टि किए बिना इस पर्चे से दवा न दें।
            </p>
            <a href={`tel:${CLINIC.phone}`} className="mt-5 inline-flex rounded-full bg-forest-800 px-6 py-3 font-semibold text-white">
              Call clinic · {CLINIC.phoneDisplay}
            </a>
          </div>
        ) : (
          <ValidCard view={view} />
        )}
        <p className="mt-6 text-center text-xs text-forest-700/80">
          {CLINIC.name} · Not valid for medicolegal purpose.
        </p>
      </main>
    </div>
  );
}

function ValidCard({ view }: { view: Extract<VerifyView, { status: "valid" }> }) {
  const r = view.record;
  const rows: [string, string][] = [
    ["Prescription ID", txt(r.prescriptionId)],
    ["Signed on · दिनांक", txt(r.signedAt) || txt(r.date)],
    ["Patient · मरीज़", view.maskedName],
    ["Age / Sex", [r.age, r.sex].filter(Boolean).join(" / ") || "-"],
    ["Consultation", r.consultationType === "teleconsultation" || r.isTeleconsultation ? "Teleconsultation" : "In-person (OPD)"],
    ["Doctor · डॉक्टर", `${view.doctor.name}, ${view.doctor.degrees}`],
    ["Reg. No.", view.doctor.registrationNo],
  ];
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(6,43,49,0.12)] md:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-100 text-2xl text-forest-800" aria-hidden>
          ✓
        </div>
        <div>
          <h1 className="text-xl font-semibold text-forest-900 md:text-2xl">Genuine prescription</h1>
          <p className="text-forest-700" lang="hi">
            यह पर्चा असली है — इलेक्ट्रॉनिक रूप से हस्ताक्षरित
          </p>
        </div>
      </div>

      {r.sealed && (
        <p className="mt-4 rounded-xl bg-forest-50 px-3 py-2 text-sm text-forest-800">
          🔒 Content locked at the time of signing — the details below are exactly what the doctor signed.
          <span className="block" lang="hi">हस्ताक्षर के समय की सामग्री सुरक्षित है — नीचे वही है जो डॉक्टर ने हस्ताक्षर किया।</span>
        </p>
      )}

      <dl className="mt-6 divide-y divide-forest-100 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-2.5">
            <dt className="text-forest-700">{k}</dt>
            <dd className="text-right font-medium text-forest-900">{v || "-"}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-6 font-semibold text-forest-900">Medicines · दवाइयाँ</h2>
      <ol className="mt-2 space-y-2 text-sm">
        {(r.rx ?? []).map((m, i) => (
          <li key={i} className="rounded-xl bg-forest-50 px-3 py-2">
            <span className="font-semibold text-forest-900">
              {i + 1}. {txt([m.brand || m.generic, m.strength].filter(Boolean).join(" "))}
            </span>
            {m.brand && m.generic && <span className="text-forest-700"> ({txt(m.generic)})</span>}
            <div className="text-forest-700">{txt([m.dose, m.frequency, m.duration].filter(Boolean).join(" · "))}</div>
          </li>
        ))}
        {(r.rx ?? []).length === 0 && <li className="text-forest-700">No medicines prescribed.</li>}
      </ol>

      <div className="mt-6 rounded-2xl bg-saffron-100 p-4 text-sm text-forest-900">
        <p>Match these details with the paper/PDF. If anything is different (medicine, strength, duration), do not dispense and call the clinic.</p>
        <p className="mt-1" lang="hi">
          इन विवरणों का पर्चे से मिलान करें। कुछ भी अलग हो तो दवा न दें और क्लिनिक को कॉल करें।
        </p>
        <a href={`tel:${CLINIC.phone}`} className="mt-3 inline-block font-semibold underline">
          {CLINIC.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
