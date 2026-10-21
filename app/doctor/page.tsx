"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import EpinResetButton from "./EpinResetButton";

export default function DoctorDashboard() {
  const cards = [
    ["Appointments","/doctor/appointments"],
    ["E-Prescription","/doctor/prescription"],
    ["Follow-up","/doctor/follow-up"],
    ["Payment","/doctor/payment"],
    ["Video Consultations","/doctor/video"],
    ["Patients (UHID & History)","/doctor/patients"],
    ["Security (2FA)","/doctor/security"],
    ["Website: Articles","/doctor/articles"],
    ["Website: Patient Feedback","/doctor/feedback"],
    ["Website: Recovery Stories","/doctor/stories"]
  ];
  const router = useRouter();

  async function logout() {
    await signOut(auth);
    router.replace("/login");
  }

  return (
    <main style={{padding:30,maxWidth:1100,margin:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <h1>Doctor Dashboard</h1>
        <button onClick={logout} style={{padding:"10px 18px",borderRadius:999,border:"1px solid #cbd5e1",background:"white",cursor:"pointer",fontWeight:700}}>
          Sign out
        </button>
      </div>
      <p>Manage online consultation workflow from one place.</p>
      <EpinResetButton />

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
        gap:18,
        marginTop:25
      }}>
        {cards.map(([name,url]) => (
          <Link key={url} href={url} style={{
            display:"block",
            padding:26,
            border:"1px solid #ddd",
            borderRadius:16,
            textDecoration:"none",
            color:"#123",
            background:"white",
            boxShadow:"0 5px 18px rgba(0,0,0,.06)"
          }}>
            <h2>{name}</h2>
            <p>Open →</p>
          </Link>
        ))}
      </div>
    </main>
  );
}


