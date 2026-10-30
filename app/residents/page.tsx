import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/site/SiteHeader";
import SiteFooter from "../../components/site/SiteFooter";
import { DEFAULT_PLANS } from "../../lib/residents";
import { DOCTOR, SITE_URL, formatINR } from "../../lib/site";

export const metadata: Metadata = {
  title: "Psychiatry Residents – Notes, Video Lectures & Case Discussions",
  description:
    "Learning programme for MD/DNB psychiatry residents by Dr. Kuldeep Budania (MD Psychiatry): topic-wise notes, video lectures and real case discussions.",
  alternates: { canonical: `${SITE_URL}/residents` },
};

const FEATURES = [
  { title: "Topic-wise notes", text: "Concise, exam-oriented notes as PDFs you can read on phone or laptop." },
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
              Notes, video lectures and case discussions for MD / DNB psychiatry residents — in one place, on your phone.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/residents/login?mode=signup" className="rounded-full bg-saffron-500 px-6 py-3 font-semibold text-forest-900 hover:bg-saffron-400">
                Join now
              </Link>
              <Link href="/residents/login" className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10">
                Sign in
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-forest-100 bg-white p-6">
                <h2 className="text-xl font-semibold text-forest-900">{f.title}</h2>
                <p className="mt-2 text-ink/80">{f.text}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-semibold text-forest-900">Plans</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {DEFAULT_PLANS.map((p) => (
              <div key={p.id} className="rounded-2xl border border-forest-100 bg-white p-6">
                <p className="font-semibold text-forest-700">{p.label.en}</p>
                <p className="mt-1 text-3xl font-semibold text-forest-900">{formatINR(p.price)}</p>
                <p className="mt-1 text-sm text-ink/70">Full access for {p.days} days. Renew any time — remaining days carry over.</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-ink/70">
            Current prices are confirmed at checkout. Payment by UPI, card or net banking through Razorpay. Access is for your personal use only;
            notes carry your name, and sharing them can lead to your account being closed.
          </p>
        </section>
      </main>
      <SiteFooter lang="en" />
    </div>
  );
}
