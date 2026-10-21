import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Sex Specialist India | Sexual Health Psychiatrist | Neuro Mind Bloom',
  description: 'Confidential psychiatric consultation for sexual health concerns, sexual dysfunction, performance anxiety, relationship concerns and related mental health issues in India.',
  alternates: { canonical: "https://www.neuromindbloom.com/sex-specialist-india" },
};

export default function Page() {
 return <main style={{maxWidth:900,margin:"0 auto",padding:"48px 22px",fontFamily:"Arial, sans-serif",lineHeight:1.65,color:"#17202a"}}>
  <nav><Link href="/">Neuro Mind Bloom</Link><Link href="/book-appointment">Book Appointment</Link></nav>
  <h1>Sex Specialist & Sexual Health Psychiatrist in India</h1>
  <p>Confidential psychiatric consultation for sexual health concerns, sexual dysfunction, performance anxiety, relationship concerns and related mental health issues in India.</p>
  <h2>Confidential care for sexual health concerns</h2>
  <p>Neuro Mind Bloom provides psychiatric assessment for sexual health and sexual disorder concerns, including performance anxiety, psychological contributors to sexual dysfunction, relationship-related concerns and associated anxiety or depression. Care is confidential and non-judgmental.</p>
  <h2>Conditions and concerns</h2>
  <p>Anxiety, depression, OCD, bipolar disorder, schizophrenia, addiction, sleep problems, stress, relationship concerns and sexual health concerns can be assessed according to individual clinical needs.</p>
  <Link style={{display:"inline-block",marginTop:18,padding:"12px 18px",border:"1px solid currentColor",borderRadius:10,textDecoration:"none"}} href="/book-appointment">Book a consultation</Link>
  <p style={{fontSize:"0.92rem",opacity:0.78,marginTop:28}}>Information on this page is educational and does not replace an individual medical assessment. Emergencies require appropriate local emergency care.</p>
 </main>;
}
