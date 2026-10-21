import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Online Psychiatrist India – Dr. Kuldeep Budania, MD Psychiatry',
  description: 'Consult a psychiatrist online across India for anxiety, depression, OCD, bipolar disorder, addiction, sleep problems and other mental health concerns.',
  alternates: { canonical: "https://www.neuromindbloom.com/online-psychiatrist-india" },
};

export default function Page() {
 return <main style={{maxWidth:900,margin:"0 auto",padding:"48px 22px",fontFamily:"Arial, sans-serif",lineHeight:1.65,color:"#17202a"}}>
  <nav><Link href="/">Neuro Mind Bloom</Link><Link href="/book-appointment">Book Appointment</Link></nav>
  <h1>Online Psychiatrist India</h1>
  <p>Consult a psychiatrist online across India for anxiety, depression, OCD, bipolar disorder, addiction, sleep problems and other mental health concerns.</p>
  <h2>Online psychiatric consultation across India</h2>
  <p>Neuro Mind Bloom provides confidential online psychiatry consultation with Dr. Kuldeep Budania, MD Psychiatry. Care is available for adults and families seeking assessment, treatment planning and follow-up for common psychiatric conditions.</p>
  <h2>Conditions and concerns</h2>
  <p>Anxiety, phobias, depression, personality-related difficulties, bipolar disorder, psychosis and schizophrenia-spectrum disorders, child and adolescent concerns, ADHD, autism-spectrum concerns, specific learning disorder, somatic symptom and pain-related distress, OCD, addiction, sleep problems, stress, relationship concerns and sexual health concerns can be assessed according to individual clinical needs.</p>
  <Link style={{display:"inline-block",marginTop:18,padding:"12px 18px",border:"1px solid currentColor",borderRadius:10,textDecoration:"none"}} href="/book-appointment">Book a consultation</Link>
  <p style={{fontSize:"0.92rem",opacity:0.78,marginTop:28}}>Information on this page is educational and does not replace an individual medical assessment. Emergencies require appropriate local emergency care.</p>
 </main>;
}
