export default function SeoStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": "https://neuromindbloom.com/#clinic",
        name: "Neuro Mind Bloom",
        url: "https://neuromindbloom.com",
        image: "https://neuromindbloom.com/dr-kuldeep.png",
        telephone: "+91-9376315331",
        email: "drkuldeepbudania23@gmail.com",
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
        "@id": "https://neuromindbloom.com/#doctor",
        name: "Dr. Kuldeep Budania",
        jobTitle: "Psychiatrist",
        description: "MD Psychiatry providing online psychiatric consultation and psychotherapy.",
        medicalSpecialty: "Psychiatric",
        url: "https://neuromindbloom.com",
        image: "https://neuromindbloom.com/dr-kuldeep.png",
        telephone: "+91-9376315331",
        worksFor: { "@id": "https://neuromindbloom.com/#clinic" },
        areaServed: { "@type": "Country", name: "India" },
        knowsAbout: ["Depression", "Anxiety Disorders", "Obsessive Compulsive Disorder", "Bipolar Disorder", "Schizophrenia", "Addiction Psychiatry", "Sleep Disorders", "Child and Adolescent Psychiatry", "Geriatric Psychiatry", "Psychotherapy"]
      },
      {
        "@type": "Service",
        "@id": "https://neuromindbloom.com/#online-psychiatry",
        name: "Online Psychiatry Consultation",
        serviceType: "Online Psychiatry Consultation",
        provider: { "@id": "https://neuromindbloom.com/#doctor" },
        areaServed: { "@type": "Country", name: "India" },
        offers: { "@type": "Offer", price: "500", priceCurrency: "INR", url: "https://neuromindbloom.com/book-appointment" },
        availableChannel: { "@type": "ServiceChannel", serviceUrl: "https://neuromindbloom.com/book-appointment" }
      },
      {
        "@type": "WebSite",
        "@id": "https://neuromindbloom.com/#website",
        url: "https://neuromindbloom.com",
        name: "Neuro Mind Bloom",
        inLanguage: ["en-IN", "hi-IN"],
        publisher: { "@id": "https://neuromindbloom.com/#clinic" }
      }
    ]
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
