import type { L10n } from "../i18n";

/**
 * Doctor profile — every item below was supplied by Dr. Kuldeep Budania.
 * Memberships are memberships (not fellowships or certifications). Certificates are short
 * training courses, not degrees. No certificate images are published (doctor's choice);
 * set `image` to a file in /public/certificates/ to show a "View Certificate" button later.
 */
export type Certificate = { title: L10n; institution: L10n; year: number; image: string | null };

export const PROFILE = {
  name: { en: "Dr. Kuldeep Budania", hi: "डॉ. कुलदीप बुडानिया" },
  qualifications: "MBBS, MD Psychiatry",
  description: {
    en: "Psychiatrist | De-addiction & Sexual Health Specialist",
    hi: "मानसिक रोग, नशा मुक्ति एवं सेक्स रोग विशेषज्ञ",
  },
  summary: [
    {
      en: "Dr. Kuldeep Budania is a psychiatrist (MBBS, MD Psychiatry) with more than eight years of clinical experience in mental health, de-addiction and sexual health. He practises from Ajmer, Rajasthan and offers private video consultations across India.",
      hi: "डॉ. कुलदीप बुडानिया (MBBS, MD मनोचिकित्सा) मानसिक स्वास्थ्य, नशा मुक्ति और यौन स्वास्थ्य में आठ वर्ष से अधिक के क्लिनिकल अनुभव वाले मनोचिकित्सक हैं। वे अजमेर, राजस्थान से प्रैक्टिस करते हैं और पूरे भारत में निजी वीडियो परामर्श देते हैं।",
    },
    {
      en: "His approach combines careful diagnosis, evidence-based medicines where needed, psychotherapy and family guidance — explained in simple Hindi or English.",
      hi: "उनके इलाज में सावधानी से की गई जाँच, ज़रूरत होने पर प्रमाणित दवाएँ, साइकोथेरेपी और परिवार का मार्गदर्शन शामिल है — आसान हिंदी या अंग्रेज़ी में।",
    },
  ] as L10n[],
  experience: [
    { en: "Former Doctor, Medical College, Kota", hi: "पूर्व चिकित्सक, मेडिकल कॉलेज, कोटा" },
    { en: "Senior Specialist (Psychiatry)", hi: "सीनियर स्पेशलिस्ट (मनोचिकित्सा)" },
    { en: "8+ years of clinical experience", hi: "8+ वर्षों का क्लिनिकल अनुभव" },
    { en: "14,000+ patients treated", hi: "14,000+ मरीज़ों का इलाज" },
  ] as L10n[],
  leadership: [
    { en: "Former General Secretary, Resident Doctors Association (RDA), Kota", hi: "पूर्व महासचिव, रेजिडेंट डॉक्टर्स एसोसिएशन (RDA), कोटा" },
    { en: "Former General Secretary, United Doctors Front (UDF)", hi: "पूर्व महासचिव, यूनाइटेड डॉक्टर्स फ्रंट (UDF)" },
  ] as L10n[],
  memberships: [
    { en: "Member, Indian Psychiatric Society (IPS)", hi: "सदस्य, इंडियन साइकियाट्रिक सोसाइटी (IPS)" },
    { en: "Member, Rajasthan De-addiction Society (RDS)", hi: "सदस्य, राजस्थान डी-एडिक्शन सोसाइटी (RDS)" },
  ] as L10n[],
  certificates: [
    {
      title: { en: "Cognitive Behavioural Therapy (CBT) Training", hi: "कॉग्निटिव बिहेवियरल थेरेपी (CBT) प्रशिक्षण" },
      institution: { en: "Lissun", hi: "Lissun" },
      year: 2025,
      image: null,
    },
    {
      title: { en: "Telemedicine Training", hi: "टेलीमेडिसिन प्रशिक्षण" },
      institution: { en: "Maharashtra University of Health Sciences", hi: "महाराष्ट्र यूनिवर्सिटी ऑफ़ हेल्थ साइंसेज़" },
      year: 2025,
      image: null,
    },
    {
      title: { en: "Introduction to HMIS & EMR", hi: "HMIS और EMR का परिचय" },
      institution: { en: "Maharashtra University of Health Sciences", hi: "महाराष्ट्र यूनिवर्सिटी ऑफ़ हेल्थ साइंसेज़" },
      year: 2025,
      image: null,
    },
    {
      title: { en: "Ayushman Bharat Digital Mission for Doctors", hi: "डॉक्टरों के लिए आयुष्मान भारत डिजिटल मिशन" },
      institution: { en: "National Health Authority", hi: "राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA)" },
      year: 2025,
      image: null,
    },
  ] as Certificate[],
  expertise: [
    { en: "Depression, anxiety, OCD and bipolar disorder", hi: "डिप्रेशन, घबराहट, OCD और बाइपोलर" },
    { en: "Schizophrenia and other psychotic disorders", hi: "सिज़ोफ्रेनिया और दूसरी साइकोटिक बीमारियाँ" },
    { en: "De-addiction: alcohol, afeem/doda, smack, cannabis, tobacco, pills", hi: "नशा मुक्ति: शराब, अफ़ीम/डोडा, स्मैक, गांजा, तंबाकू, गोलियाँ" },
    { en: "Sexual health: PE, ED, Dhat, low desire, performance anxiety", hi: "यौन स्वास्थ्य: शीघ्रपतन, इरेक्शन, धात, कम इच्छा, परफ़ॉर्मेंस की घबराहट" },
    { en: "Sleep problems and stress", hi: "नींद की समस्या और तनाव" },
    { en: "Student and young-doctor mental health", hi: "छात्रों और युवा डॉक्टरों का मानसिक स्वास्थ्य" },
    { en: "Child, adolescent and older-adult mental health", hi: "बच्चों, किशोरों और बुज़ुर्गों का मानसिक स्वास्थ्य" },
    { en: "CBT-based psychotherapy and counselling", hi: "CBT आधारित साइकोथेरेपी और काउंसलिंग" },
  ] as L10n[],
  languages: { en: "Hindi, English", hi: "हिंदी, अंग्रेज़ी" },
} as const;

export const PROFILE_PATH = "/dr-kuldeep-budania";
