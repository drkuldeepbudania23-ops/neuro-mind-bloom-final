import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Depression Psychiatrist India | Neuro Mind Bloom",
  description: "Depression assessment and treatment with a psychiatrist online in India. Neuro Mind Bloom offers psychiatric consultation for low mood, loss of interest, sleep, appetite and related symptoms.",
  alternates: { canonical: "https://www.neuromindbloom.com/depression-treatment-india" },
};

export default function Page() {
  return <main style={{maxWidth:900,margin:"0 auto",padding:"48px 22px",fontFamily:"Arial, sans-serif",lineHeight:1.65,color:"#17202a"}}>
    <nav style={{display:"flex",gap:16,flexWrap:"wrap"}}><Link href="/">Neuro Mind Bloom</Link><Link href="/online-psychiatrist-india">Online Psychiatrist India</Link><Link href="/book-appointment">Book Appointment</Link></nav>
    <h1>Depression Psychiatrist India</h1>
    <p>Depression assessment and treatment with a psychiatrist online in India. Neuro Mind Bloom offers psychiatric consultation for low mood, loss of interest, sleep, appetite and related symptoms.</p>
    <h2>When to seek an assessment</h2>
    <p>Depression can involve persistent low mood, reduced interest, low energy, sleep or appetite changes, poor concentration and hopelessness. A psychiatric assessment helps clarify severity, contributing factors and an appropriate treatment plan.</p>
    <h2>Consultation options</h2>
    <p>Neuro Mind Bloom provides psychiatric consultation and follow-up based on individual clinical needs. Online consultation can be used when clinically appropriate; some concerns may require in-person examination, testing or local services.</p>
    <Link style={{display:"inline-block",marginTop:18,padding:"12px 18px",border:"1px solid currentColor",borderRadius:10,textDecoration:"none"}} href="/book-appointment">Book a consultation</Link>
    <p style={{fontSize:"0.92rem",opacity:0.78,marginTop:28}}>This page is for general information and does not replace an individual medical assessment. If there is immediate risk of harm, severe agitation, confusion, or inability to maintain safety, seek urgent local medical care.</p>
  </main>;
}
