import type { Metadata } from "next";
import SiteHeader from "../../components/site/SiteHeader";
import SiteFooter from "../../components/site/SiteFooter";
import { DOCTOR } from "../../lib/site";

/**
 * Residents' learning lives inside the Neuro Mind Bloom app. This page is not
 * linked from the website and not indexed; a browser that opens /residents/app
 * is redirected here. No prices or payment links (purchase is via the
 * /residents/join link the doctor shares directly with residents).
 */
export const metadata: Metadata = {
  title: "Psychiatry Residents – Neuro Mind Bloom App",
  robots: { index: false, follow: false },
};

const FEATURES = [
  { title: "Topic-wise notes", text: "Concise, exam-oriented notes as PDFs, carrying your name." },
  { title: "Video lectures", text: "Recorded lectures on core psychiatry topics, watch any time." },
  { title: "Case discussions", text: "Real-world cases with discussion — ask questions and learn from other residents." },
];

export default function ResidentsPage() {
  return (
    <div className="nmb min-h-screen bg-cream" lang="en">
      <SiteHeader lang="en" path="/" />
      <main>
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
            <p className="text-sm font-semibold uppercase tracking-wide text-forest-200">For psychiatry residents</p>
            <h1 className="mt-2 text-3xl font-semibold md:text-5xl">Learn psychiatry with {DOCTOR.name.en}</h1>
            <p className="mt-4 max-w-2xl text-lg text-forest-100">
              Notes, video lectures and case discussions for MD / DNB psychiatry residents are available in the
              Neuro Mind Bloom app.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
          <div className="rounded-2xl border border-forest-100 bg-white p-6">
            <h2 className="text-xl font-semibold text-forest-900">Open the Neuro Mind Bloom app</h2>
            <p className="mt-2 text-ink/80">
              Install the app on your phone and sign in with the same email you used to register. Your notes,
              lectures and case discussions open there.
            </p>
            <p className="mt-2 text-sm text-ink/70">The app is coming soon on Google Play and the App Store.</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-forest-100 bg-white p-6">
                <h2 className="text-xl font-semibold text-forest-900">{f.title}</h2>
                <p className="mt-2 text-ink/80">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter lang="en" />
    </div>
  );
}
