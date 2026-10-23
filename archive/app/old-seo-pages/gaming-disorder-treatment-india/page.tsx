import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gaming Disorder Treatment India",
  description: "Assessment and treatment planning for problematic gaming and gaming disorder, including effects on sleep, education, work, relationships and mental health.",
  alternates: { canonical: "https://www.neuromindbloom.com/gaming-disorder-treatment-india" },
};

export default function Page() {
  return <main style={{maxWidth:900,margin:"0 auto",padding:"48px 22px",fontFamily:"Arial, sans-serif",lineHeight:1.65,color:"#17202a"}}>
    <nav style={{display:"flex",gap:16,flexWrap:"wrap"}}><Link href="/">Neuro Mind Bloom</Link><Link href="/online-psychiatrist-india">Online Psychiatrist India</Link><Link href="/deaddiction-psychiatrist-india">De-addiction</Link><Link href="/book-appointment">Book Appointment</Link></nav>
    <h1>Gaming Disorder Treatment India</h1>
    <p>Assessment and treatment planning for problematic gaming and gaming disorder, including effects on sleep, education, work, relationships and mental health.</p>
    <h2>Assessment and treatment</h2>
    <p>Care is individualized after clinical assessment. Treatment may include psychoeducation, counseling or psychotherapy, medication when clinically appropriate, follow-up and coordination with other medical specialists when needed.</p>
    <h2>Consultation options</h2>
    <p>Neuro Mind Bloom provides psychiatric consultation and follow-up. Online consultation can be used when clinically appropriate; emergencies, significant withdrawal, intoxication, seizures, severe confusion or other acute medical concerns require urgent in-person medical care.</p>
    <Link style={{display:"inline-block",marginTop:18,padding:"12px 18px",border:"1px solid currentColor",borderRadius:10,textDecoration:"none"}} href="/book-appointment">Book a consultation</Link>
    <p style={{fontSize:"0.92rem",opacity:0.78,marginTop:28}}>General information only; this does not replace an individual medical assessment.</p>
  </main>;
}
