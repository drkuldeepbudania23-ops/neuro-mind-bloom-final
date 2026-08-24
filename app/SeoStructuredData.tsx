export default function SeoStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": "https://neuromindbloom.com/#clinic",
        name: "Neuro Mind Bloom",
        url: "https://neuromindbloom.com",
        telephone: "+91-9376315331",
        priceRange: "₹₹",
        medicalSpecialty: "Psychiatric",
        areaServed: {
          "@type": "City",
          name: "Ajmer"
        },
        description:
          "Psychiatry, de-addiction, psychotherapy, counselling and online mental health consultation."
      },
      {
        "@type": "Physician",
        "@id": "https://neuromindbloom.com/#doctor",
        name: "Dr Kuldeep Budania",
        jobTitle: "Psychiatrist",
        medicalSpecialty: "Psychiatric",
        url: "https://neuromindbloom.com",
        telephone: "+91-9376315331",
        worksFor: {
          "@id": "https://neuromindbloom.com/#clinic"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://neuromindbloom.com/#website",
        name: "Neuro Mind Bloom",
        url: "https://neuromindbloom.com",
        publisher: {
          "@id": "https://neuromindbloom.com/#clinic"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}
