import { CLINIC, DOCTOR, SERVICES, SOCIAL } from "../lib/site";
export default function SeoStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": "https://www.neuromindbloom.com/#clinic",
        name: "Neuro Mind Bloom",
        url: "https://www.neuromindbloom.com",
        image: "https://www.neuromindbloom.com/dr-kuldeep.png",
        logo: "https://www.neuromindbloom.com/logo-badge.png",
        telephone: CLINIC.phone,
        email: CLINIC.email,
        sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.youtube],
        priceRange: "₹₹",
        medicalSpecialty: "Psychiatric",
        description: "Online psychiatry, de-addiction and psychotherapy consultation across India, based in Ajmer, Rajasthan.",
        address: { "@type": "PostalAddress", addressLocality: "Ajmer", addressRegion: "Rajasthan", addressCountry: "IN" },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "State", name: "Rajasthan" },
          { "@type": "City", name: "Ajmer" }
        ]
      },
      {
        "@type": "Physician",
        "@id": "https://www.neuromindbloom.com/#doctor",
        name: "Dr. Kuldeep Budania",
        jobTitle: "Psychiatrist",
        alternateName: DOCTOR.name.hi,
        description: "MD Psychiatry providing online psychiatric consultation and psychotherapy.",
        medicalSpecialty: "Psychiatric",
        url: "https://www.neuromindbloom.com",
        image: "https://www.neuromindbloom.com/dr-kuldeep.png",
        telephone: CLINIC.phone,
        sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.youtube],
        worksFor: { "@id": "https://www.neuromindbloom.com/#clinic" },
        areaServed: { "@type": "Country", name: "India" },
        knowsAbout: ["Depression", "Anxiety Disorders", "Obsessive Compulsive Disorder", "Bipolar Disorder", "Schizophrenia", "Addiction Psychiatry", "Sleep Disorders", "Child and Adolescent Psychiatry", "Geriatric Psychiatry", "Psychotherapy", "Sexual Medicine", "De-addiction"]
      },
      {
        "@type": "Service",
        "@id": "https://www.neuromindbloom.com/#online-psychiatry",
        name: "Online Psychiatry Consultation",
        serviceType: "Online Psychiatry Consultation",
        provider: { "@id": "https://www.neuromindbloom.com/#doctor" },
        areaServed: { "@type": "Country", name: "India" },
        offers: SERVICES.map((service) => ({
          "@type": "Offer",
          name: service.label.en,
          price: String(service.fee),
          priceCurrency: "INR",
          url: `https://www.neuromindbloom.com/book-appointment?service=${service.code}`,
        })),
        availableChannel: { "@type": "ServiceChannel", serviceUrl: "https://www.neuromindbloom.com/book-appointment" }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.neuromindbloom.com/#website",
        url: "https://www.neuromindbloom.com",
        name: "Neuro Mind Bloom",
        inLanguage: ["en-IN", "hi-IN"],
        publisher: { "@id": "https://www.neuromindbloom.com/#clinic" }
      }
    ]
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
