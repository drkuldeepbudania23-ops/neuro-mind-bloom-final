import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Online Psychiatry Consultation India | Neuro Mind Bloom',
  description: 'Book confidential online psychiatry consultation in India with Dr. Kuldeep Budania, MD Psychiatry.',
  alternates: { canonical: "https://www.neuromindbloom.com/online-psychiatry-consultation" },
};

export default function Page() {
 return <main style={{maxWidth:900,margin:"0 auto",padding:"48px 22px",fontFamily:"Arial, sans-serif",lineHeight:1.65,color:"#17202a"}}>
  <nav><Link href="/">Neuro Mind Bloom</Link><Link href="/book-appointment">Book Appointment</Link></nav>
  <h1>Online Psychiatry Consultation</h1>
  <p>Book confidential online psychiatry consultation in India with Dr. Kuldeep Budania, MD Psychiatry.</p>
  <h2>How online psychiatry consultation can help</h2>
  <p>Online consultation can support assessment, treatment planning and follow-up where teleconsultation is clinically appropriate. In-person or emergency evaluation may still be advised when required.</p>
  <h2>Conditions and concerns</h2>
  <p>Anxiety, depression, OCD, bipolar disorder, schizophrenia, addiction, sleep problems, stress, relationship concerns and sexual health concerns can be assessed according to individual clinical needs.</p>
  <Link style={{display:"inline-block",marginTop:18,padding:"12px 18px",border:"1px solid currentColor",borderRadius:10,textDecoration:"none"}} href="/book-appointment">Book a consultation</Link>
  <p style={{fontSize:"0.92rem",opacity:0.78,marginTop:28}}>Information on this page is educational and does not replace an individual medical assessment. Emergencies require appropriate local emergency care.</p>
 </main>;
}
