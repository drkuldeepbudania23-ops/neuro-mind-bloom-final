"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

const services = [
  ["Depression", "Mood, motivation and emotional well-being"],
  ["Anxiety Disorders", "Anxiety, panic, phobias and stress"],
  ["OCD", "Obsessions, compulsions and related concerns"],
  ["Bipolar Disorder", "Mood episodes and long-term management"],
  ["Schizophrenia", "Psychosis and related mental health conditions"],
  ["Sleep Disorders", "Insomnia and sleep-related difficulties"],
  ["Addiction Psychiatry", "Alcohol, tobacco, cannabis, gaming and gambling"],
  ["Sexual Disorders", "Confidential psychiatric evaluation and care"],
  ["Child & Adolescent Psychiatry", "Emotional and behavioural concerns"],
  ["Geriatric Psychiatry", "Mental health care for older adults"],
  ["Psychotherapy", "CBT, REBT and supportive psychotherapy"],
  ["Couple & Family Therapy", "Relationship and family-focused support"],
];

const faqs = [
  ["Is the consultation online?", "Yes. The current service is video consultation only."],
  ["What is the psychiatric consultation fee?", "The psychiatric consultation fee is Ã¢â€šÂ¹500."],
  ["What is the psychotherapy fee?", "A psychotherapy session is Ã¢â€šÂ¹2000."],
  ["How will I receive the video link?", "The clinic will confirm your slot and share the consultation link on WhatsApp."],
  ["Will I receive a prescription?", "A digital prescription may be provided when clinically appropriate."],
  ["Is my information confidential?", "Yes. Personal and clinical information is handled with privacy and confidentiality."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [form, setForm] = useState({ name: "", phone: "", service: "Psychiatric Consultation Ã¢â‚¬â€œ Ã¢â€šÂ¹500", date: "", time: "", concern: "" });

  const whatsappBase = "https://wa.me/919376315331";
  const appointmentMessage = useMemo(() => {
    return encodeURIComponent(
      `Hello Dr. Kuldeep Budania,\n\nI want to book an online appointment.\n\nName: ${form.name}\nMobile: ${form.phone}\nService: ${form.service}\nPreferred Date: ${form.date || "Not selected"}\nPreferred Time: ${form.time || "Not selected"}\nBrief Concern: ${form.concern || "Not provided"}`
    );
  }, [form]);

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(`${whatsappBase}?text=${appointmentMessage}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <header className="siteHeader">
        <div className="navWrap container">
          <a className="brand" href="#home" aria-label="Neuro Mind Bloom home">
            <span className="brandMark">N</span>
            <span><strong>Neuro Mind Bloom</strong><small>Psychiatry Ã¢â‚¬Â¢ Psychology Ã¢â‚¬Â¢ Wellness</small></span>
          </a>
          <button className="menuBtn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">Ã¢ËœÂ°</button>
          
          <nav className={menuOpen ? "nav open" : "nav"}>
  <a href="#about">About</a>
  <a href="#services">Services</a>
  <a href="#consultations">Consultations</a>
  <a href="/doctor">Doctor Login</a>
  <a className="navCta" href="#booking">Book Appointment</a>
</nav>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="heroGlow one" /><div className="heroGlow two" />
        <div className="container heroGrid">
          <div className="heroCopy">
            <span className="eyebrow">Ã¢Å“â€œ Confidential Online Mental Health Care</span>
            <h1>Your Mental Health <em>Matters</em></h1>
            <p>Compassionate, confidential and evidence-based online psychiatric care from the comfort of your home.</p>
            <div className="heroActions">
              <a className="btn primary" href="#booking">Book Video Consultation</a>
              <a className="btn secondary" href={`${whatsappBase}?text=${encodeURIComponent("Hello Doctor, I want to book an online consultation.")}`} target="_blank" rel="noreferrer">WhatsApp Now</a>
            </div>
            <div className="trustRow">
              <div><b>100%</b><span>Confidential</span></div>
              <div><b>MD</b><span>Psychiatry</span></div>
              <div><b>Online</b><span>Convenient</span></div>
            </div>
          </div>
          <div className="portraitWrap">
            <div className="portraitHalo" />
            <Image src="/dr-kuldeep.png" alt="Dr. Kuldeep Budania, MD Psychiatry" width={900} height={1200} priority className="portrait" />
            <div className="doctorBadge"><strong>Dr. Kuldeep Budania</strong><span>MD Psychiatry</span><small>Ajmer, Rajasthan</small></div>
          </div>
        </div>
      </section>

      <section id="about" className="section light">
        <div className="container aboutGrid">
          <div><span className="sectionLabel">ABOUT THE DOCTOR</span><h2>Professional care with dignity and empathy</h2><p className="lead">Dr. Kuldeep Budania provides online psychiatric consultation and psychotherapy with a personalized, respectful and confidential approach.</p></div>
          <div className="featureGrid">
            {["Confidential care", "Evidence-based approach", "Personalized treatment", "Easy online access", "Digital prescription", "Follow-up guidance"].map((item) => <div className="featureCard" key={item}>Ã¢Å“â€œ {item}</div>)}
          </div>
        </div>
      </section>

      <section id="consultations" className="section">
        <div className="container"><div className="sectionHead"><span className="sectionLabel">ONLINE CONSULTATIONS</span><h2>Choose your consultation</h2></div>
          <div className="pricingGrid">
            <article className="priceCard teal"><div className="roundIcon">Ã°Å¸Â©Âº</div><h3>Psychiatric Consultation</h3><div className="price">Ã¢â€šÂ¹500</div><a className="btn primary full" href={`${whatsappBase}?text=${encodeURIComponent("Hello Doctor, I want to book a Psychiatric Consultation for Ã¢â€šÂ¹500.")}`} target="_blank" rel="noreferrer">Book on WhatsApp</a></article>
            <article className="priceCard blue"><div className="roundIcon">Ã°Å¸â€™Â¬</div><h3>Psychotherapy Session</h3><div className="price">Ã¢â€šÂ¹2000</div><a className="btn blueBtn full" href={`${whatsappBase}?text=${encodeURIComponent("Hello Doctor, I want to book a Psychotherapy Session for Ã¢â€šÂ¹2000.")}`} target="_blank" rel="noreferrer">Book on WhatsApp</a></article>
          </div>
        </div>
      </section>

      <section id="services" className="section light">
        <div className="container"><div className="sectionHead"><span className="sectionLabel">AREAS OF CARE</span><h2>Mental health services</h2></div>
          <div className="servicesGrid">{services.map(([title, desc]) => <article className="serviceCard" key={title}><span className="serviceIcon">Ã¢Å“Â¦</span><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div>
        </div>
      </section>

      <section
  id="booking"
  style={{
    padding: "70px 16px",
    background: "#f4f8f7",
  }}
>
  <div
    style={{
      maxWidth: "1180px",
      margin: "0 auto",
    }}
  >
    <div
      style={{
        textAlign: "center",
        marginBottom: "28px",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          fontWeight: 800,
          letterSpacing: "2px",
          color: "#17656b",
          marginBottom: "8px",
        }}
      >
        BOOK AN APPOINTMENT
      </div>

      <h2
        style={{
          margin: 0,
          fontSize: "clamp(30px, 5vw, 48px)",
          color: "#173f44",
        }}
      >
        Request your preferred date and time
      </h2>

      <p
        style={{
          color: "#64748b",
          maxWidth: "700px",
          margin: "14px auto 0",
          lineHeight: 1.6,
        }}
      >
        Submit your appointment request. It will be saved directly
        to the Doctor Dashboard. WhatsApp is also available after booking.
      </p>
    </div>

    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        background: "#ffffff",
        borderRadius: "22px",
        overflow: "hidden",
        boxShadow: "0 18px 50px rgba(0,0,0,0.10)",
      }}
    >
      <iframe
        src="/book-appointment"
        title="Book Appointment - Neuro Mind Bloom"
        style={{
          width: "100%",
          height: "920px",
          border: "0",
          display: "block",
          background: "#ffffff",
        }}
      />
    </div>
  </div>
</section>

      <section id="faq" className="section light"><div className="container narrow"><div className="sectionHead"><span className="sectionLabel">FAQ</span><h2>Common questions</h2></div>
        <div className="faqList">{faqs.map(([q,a],i)=><div className="faqItem" key={q}><button onClick={()=>setFaqOpen(faqOpen===i?null:i)}><span>{q}</span><b>{faqOpen===i?"":"+"}</b></button>{faqOpen===i&&<p>{a}</p>}</div>)}</div>
      </div></section>

      <section
  id="social"
  style={{
    padding: "70px 20px",
    background: "#f4f8f7",
  }}
>
  <div
    style={{
      maxWidth: "1100px",
      margin: "0 auto",
      textAlign: "center",
    }}
  >
    <p
      style={{
        color: "#17656b",
        fontWeight: 800,
        letterSpacing: "2px",
        fontSize: "13px",
      }}
    >
      CONNECT WITH US
    </p>

    <h2
      style={{
        fontSize: "clamp(30px,5vw,46px)",
        margin: "8px 0 14px",
        color: "#173f44",
      }}
    >
      Follow Neuro Mind Bloom
    </h2>

    <p
      style={{
        color: "#64748b",
        marginBottom: "32px",
      }}
    >
      Mental health awareness, educational videos, updates and online consultation.
    </p>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "14px",
      }}
    >

      <a
        href="https://www.youtube.com/results?search_query=Neuro+Mind+Bloom+Dr+Kuldeep+Budania"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: "14px 24px",
          borderRadius: "12px",
          background: "#ff0000",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 800,
        }}
      >
        YouTube
      </a>

      <a
        href="https://www.facebook.com/search/top?q=Neuro%20Mind%20Bloom"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: "14px 24px",
          borderRadius: "12px",
          background: "#1877f2",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 800,
        }}
      >
        Facebook
      </a>

      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: "14px 24px",
          borderRadius: "12px",
          background: "#833ab4",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 800,
        }}
      >
        Instagram
      </a>

      <a
        href="https://wa.me/919376315331"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: "14px 24px",
          borderRadius: "12px",
          background: "#25d366",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 800,
        }}
      >
        WhatsApp Business
      </a>

    </div>

    <p
      style={{
        marginTop: "24px",
        fontSize: "13px",
        color: "#64748b",
      }}
    >
      Neuro Mind Bloom â€¢ Psychiatry â€¢ Psychology â€¢ Wellness
    </p>

  </div>
</section>
<footer id="contact" className="footer"><div className="container footerGrid"><div><h3>Neuro Mind Bloom</h3><p>Psychiatry Ã¢â‚¬Â¢ Psychology Ã¢â‚¬Â¢ Wellness</p><p>Dr. Kuldeep Budania, MD Psychiatry</p></div><div><h4>Contact</h4><a href="tel:+918107639481">Call: +91 8107639481</a><a href="https://wa.me/919376315331" target="_blank" rel="noreferrer">WhatsApp: +91 9376315331</a><a href="mailto:drkuldeepbudania23@gmail.com">drkuldeepbudania23@gmail.com</a><span>Ajmer, Rajasthan</span></div><div><h4>Services</h4><a href="#consultations">Psychiatric Consultation</a><a href="#consultations">Psychotherapy</a><a href="#services">Sexual Disorders</a><a href="#services">Addiction Psychiatry</a></div></div><div className="copyright">Ã¯Â¿Â½ 2026 Neuro Mind Bloom. All rights reserved.</div></footer>

      <a className="floatingWhatsApp" href={`${whatsappBase}?text=${encodeURIComponent("Hello Doctor, I want to book an online consultation.")}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">WhatsApp</a>
    </main>
  );
}






