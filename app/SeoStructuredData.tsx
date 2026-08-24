export default function SeoStructuredData() {

  const schema = {
    "@context": "https://schema.org",

    "@graph": [

      {
        "@type": "MedicalBusiness",
        "@id": "https://neuromindbloom.com/#clinic",

        "name": "Neuro Mind Bloom",

        "url": "https://neuromindbloom.com",

        "telephone": "+91-9376315331",

        "priceRange": "₹₹",

        "medicalSpecialty": "Psychiatric",

        "description":
          "Psychiatry, de-addiction, psychotherapy and mental health consultation with primary service focus in Rajasthan and online psychiatric consultation across India.",

        "areaServed": [
          {
            "@type": "State",
            "name": "Rajasthan"
          },

          {
            "@type": "City",
            "name": "Ajmer"
          },

          {
            "@type": "City",
            "name": "Jaipur"
          },

          {
            "@type": "City",
            "name": "Kota"
          },

          {
            "@type": "City",
            "name": "Jodhpur"
          },

          {
            "@type": "City",
            "name": "Udaipur"
          }
        ]
      },

      {
        "@type": "Physician",
        "@id": "https://neuromindbloom.com/#doctor",

        "name": "Dr Kuldeep Budania",

        "jobTitle": "Psychiatrist",

        "medicalSpecialty": "Psychiatric",

        "url": "https://neuromindbloom.com",

        "telephone": "+91-9376315331",

        "worksFor": {
          "@id": "https://neuromindbloom.com/#clinic"
        },

        "areaServed": [
          {
            "@type": "State",
            "name": "Rajasthan"
          },

          {
            "@type": "Country",
            "name": "India",
            "description": "Online psychiatric consultation"
          }
        ],

        "knowsAbout": [
          "Psychiatry",
          "De-addiction",
          "Depression",
          "Anxiety Disorders",
          "Obsessive Compulsive Disorder",
          "Bipolar Disorder",
          "Schizophrenia",
          "Sleep Disorders",
          "Sexual Disorders",
          "Child and Adolescent Psychiatry",
          "Psychotherapy",
          "Counselling"
        ]
      },

      {
        "@type": "Service",

        "@id": "https://neuromindbloom.com/#online-psychiatry",

        "name": "Online Psychiatry Consultation",

        "serviceType": "Online Psychiatry Consultation",

        "provider": {
          "@id": "https://neuromindbloom.com/#doctor"
        },

        "areaServed": {
          "@type": "Country",
          "name": "India"
        },

        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://neuromindbloom.com/book-appointment"
        }
      },

      {
        "@type": "WebSite",

        "@id": "https://neuromindbloom.com/#website",

        "url": "https://neuromindbloom.com",

        "name": "Neuro Mind Bloom",

        "publisher": {
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
