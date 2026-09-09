import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Psychiatrist in Ajmer – Dr. Kuldeep Budania | Neuro Mind Bloom',
  description: 'Psychiatrist in Ajmer, Rajasthan for anxiety, depression, OCD, addiction, sleep problems, sexual health concerns and other psychiatric conditions.',
  alternates: { canonical: "https://www.neuromindbloom.com/psychiatrist-ajmer" },
};

export default function Page() {
 return <main style={{maxWidth:900,margin:"0 auto",padding:"48px 22px",fontFamily:"Arial, sans-serif",lineHeight:1.65,color:"#17202a"}}>
  <nav><Link href="/">Neuro Mind Bloom</Link><Link href="/book-appointment">Book Appointment</Link></nav>
  <h1>Psychiatrist in Ajmer</h1>
  <p>Psychiatrist in Ajmer, Rajasthan for anxiety, depression, OCD, addiction, sleep problems, sexual health concerns and other psychiatric conditions.</p>
  <h2>Psychiatry services for Ajmer</h2>
  <p>Neuro Mind Bloom is based in Ajmer, Rajasthan and provides psychiatry consultation and follow-up care. Online consultation is also available for eligible patients.</p>
  <h2>Conditions and concerns</h2>
  <p>Anxiety, depression, OCD, bipolar disorder, schizophrenia, addiction, sleep problems, stress, relationship concerns and sexual health concerns can be assessed according to individual clinical needs.</p>
  <Link style={{display:"inline-block",marginTop:18,padding:"12px 18px",border:"1px solid currentColor",borderRadius:10,textDecoration:"none"}} href="/book-appointment">Book a consultation</Link>
  <p style={{fontSize:"0.92rem",opacity:0.78,marginTop:28}}>Information on this page is educational and does not replace an individual medical assessment. Emergencies require appropriate local emergency care.</p>
 </main>;
}
