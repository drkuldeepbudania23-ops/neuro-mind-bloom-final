import type { L10n } from "../i18n";
import { b, faq } from "./conditions/_h";

/**
 * International educational hub. No medical licence outside India is claimed and no
 * cross-border consultation is offered: consultations are for people physically in India.
 */
export type Country = { name: L10n; urgent: L10n; local: L10n; note: L10n };

export const INTERNATIONAL = {
  title: b("Mental Health Information for Indians Abroad", "विदेश में रहने वाले भारतीयों के लिए मानसिक स्वास्थ्य जानकारी"),
  h1: b("Mental health guidance for Indians living abroad", "विदेश में रहने वाले भारतीयों के लिए मानसिक स्वास्थ्य मार्गदर्शन"),
  description: b(
    "Educational mental health information for Indians in the USA, UK, Canada, Australia, UAE, Saudi Arabia, Qatar and Singapore — local crisis lines and how to find care.",
    "अमेरिका, ब्रिटेन, कनाडा, ऑस्ट्रेलिया, UAE, सऊदी अरब, क़तर और सिंगापुर में रहने वाले भारतीयों के लिए मानसिक स्वास्थ्य जानकारी — स्थानीय हेल्पलाइन और इलाज कैसे खोजें।"
  ),
  intro: [
    b("Moving abroad brings opportunity, and also loneliness, work pressure, visa uncertainty and distance from family. These pages offer educational information in simple language.", "विदेश जाना नए मौक़े लाता है, साथ ही अकेलापन, काम का दबाव, वीज़ा की अनिश्चितता और परिवार से दूरी भी। ये पेज आसान भाषा में जानकारी देते हैं।"),
  ] as L10n[],
  eligibilityTitle: b("Who can book a consultation", "कौन परामर्श बुक कर सकता है"),
  eligibility: [
    b("Dr. Kuldeep Budania is registered to practise medicine in India. Consultations are offered only to patients who are physically in India at the time of the consultation.", "डॉ. कुलदीप बुडानिया भारत में चिकित्सा प्रैक्टिस के लिए पंजीकृत हैं। परामर्श सिर्फ़ उन मरीज़ों को दिया जाता है जो परामर्श के समय भारत में मौजूद हों।"),
    b("If you live abroad, please consult a licensed professional in your country. Medical licensing and telehealth rules differ between countries.", "अगर आप विदेश में रहते हैं, तो कृपया अपने देश के लाइसेंसशुदा विशेषज्ञ से परामर्श लें। चिकित्सा लाइसेंस और टेलीहेल्थ नियम हर देश में अलग होते हैं।"),
    b("You can book while visiting India, and family members in India can consult about a relative who lives in India.", "भारत आने पर आप बुक कर सकते हैं, और भारत में रहने वाले परिवारजन भारत में रहने वाले रिश्तेदार के बारे में परामर्श ले सकते हैं।"),
    b("Educational articles, videos and self-checks on this website are free for everyone.", "इस वेबसाइट के जानकारी वाले लेख, वीडियो और स्व-जाँच सबके लिए मुफ़्त हैं।"),
  ] as L10n[],
  concernsTitle: b("Common concerns for Indians abroad", "विदेश में भारतीयों की आम चिंताएँ"),
  concerns: [
    b("Loneliness and homesickness, especially in the first year", "अकेलापन और घर की याद, ख़ासकर पहले साल में"),
    b("Work pressure, long hours and job or visa insecurity", "काम का दबाव, लंबे घंटे और नौकरी या वीज़ा की असुरक्षा"),
    b("Alcohol use increasing as a way to cope", "सामना करने के तरीक़े के रूप में शराब का बढ़ना"),
    b("Postpartum depression without family support nearby", "पास में परिवार के सहारे के बिना प्रसव के बाद डिप्रेशन"),
    b("Students facing academic pressure and financial stress", "पढ़ाई का दबाव और आर्थिक तनाव झेलते छात्र"),
    b("Worry about ageing parents in India", "भारत में बुज़ुर्ग माता-पिता की चिंता"),
  ] as L10n[],
  countriesTitle: b("Where to get help in your country", "अपने देश में मदद कहाँ लें"),
  countries: [
    { name: b("USA", "अमेरिका"), urgent: b("Emergency 911 · 988 Suicide & Crisis Lifeline (call or text 988)", "इमरजेंसी 911 · 988 सुसाइड और क्राइसिस लाइफ़लाइन (988 पर कॉल या टेक्स्ट)"), local: b("Start with your primary care doctor or your insurer's behavioural-health directory.", "अपने प्राइमरी केयर डॉक्टर या बीमा कंपनी की बिहेवियरल-हेल्थ सूची से शुरू करें।"), note: b("Many universities offer free counselling for international students.", "कई विश्वविद्यालय अंतरराष्ट्रीय छात्रों को मुफ़्त काउंसलिंग देते हैं।") },
    { name: b("UK", "ब्रिटेन"), urgent: b("Emergency 999 · NHS 111 (option 2 for mental health in England) · Samaritans 116 123", "इमरजेंसी 999 · NHS 111 (इंग्लैंड में मानसिक स्वास्थ्य के लिए विकल्प 2) · Samaritans 116 123"), local: b("Register with a GP; NHS Talking Therapies can often be accessed by self-referral in England.", "GP के साथ रजिस्टर करें; इंग्लैंड में NHS Talking Therapies में अक्सर ख़ुद रेफ़र किया जा सकता है।"), note: b("Students can use their university wellbeing service.", "छात्र अपने विश्वविद्यालय की वेलबीइंग सेवा का उपयोग कर सकते हैं।") },
    { name: b("Canada", "कनाडा"), urgent: b("Emergency 911 · 9-8-8 Suicide Crisis Helpline (call or text)", "इमरजेंसी 911 · 9-8-8 सुसाइड क्राइसिस हेल्पलाइन (कॉल या टेक्स्ट)"), local: b("A family doctor or walk-in clinic can refer you; provincial health lines offer guidance.", "फ़ैमिली डॉक्टर या वॉक-इन क्लिनिक रेफ़र कर सकते हैं; प्रांतीय हेल्थ लाइन मार्गदर्शन देती हैं।"), note: b("New immigrants can ask settlement agencies about free counselling.", "नए प्रवासी सेटलमेंट एजेंसियों से मुफ़्त काउंसलिंग के बारे में पूछ सकते हैं।") },
    { name: b("Australia", "ऑस्ट्रेलिया"), urgent: b("Emergency 000 · Lifeline 13 11 14", "इमरजेंसी 000 · Lifeline 13 11 14"), local: b("See a GP, who can prepare a Mental Health Treatment Plan for subsidised psychology sessions where eligible.", "GP से मिलें, जो पात्रता होने पर सब्सिडी वाले साइकोलॉजी सेशन के लिए मेंटल हेल्थ ट्रीटमेंट प्लान बना सकते हैं।"), note: b("International students should check their OSHC cover.", "अंतरराष्ट्रीय छात्र अपना OSHC कवर जाँचें।") },
    { name: b("UAE", "UAE"), urgent: b("Emergency: Police 999 · Ambulance 998", "इमरजेंसी: पुलिस 999 · एम्बुलेंस 998"), local: b("Consult a psychiatrist licensed by the DHA, DOH or MOHAP; check what your employer's health insurance covers.", "DHA, DOH या MOHAP से लाइसेंसशुदा मनोचिकित्सक से परामर्श लें; देखें कि नियोक्ता का स्वास्थ्य बीमा क्या कवर करता है।"), note: b("Long working hours and family separation are common stressors for workers.", "लंबे काम के घंटे और परिवार से अलगाव कर्मचारियों के आम तनाव हैं।") },
    { name: b("Saudi Arabia", "सऊदी अरब"), urgent: b("Emergency 911 (unified) · Ministry of Health line 937", "इमरजेंसी 911 (संयुक्त) · स्वास्थ्य मंत्रालय लाइन 937"), local: b("Ask your employer's medical insurer for a list of licensed psychiatrists.", "नियोक्ता के मेडिकल बीमा से लाइसेंसशुदा मनोचिकित्सकों की सूची माँगें।"), note: b("Do not carry or receive medicines from India without checking Saudi rules — some psychiatric medicines are controlled.", "सऊदी नियम जाँचे बिना भारत से दवाएँ न ले जाएँ और न मँगवाएँ — कुछ मनोरोग दवाएँ नियंत्रित हैं।") },
    { name: b("Qatar", "क़तर"), urgent: b("Emergency 999 · HMC mental health helpline 16000", "इमरजेंसी 999 · HMC मानसिक स्वास्थ्य हेल्पलाइन 16000"), local: b("Hamad Medical Corporation and licensed private clinics provide psychiatric care.", "हमद मेडिकल कॉर्पोरेशन और लाइसेंसशुदा निजी क्लिनिक मनोरोग इलाज देते हैं।"), note: b("Check medicine import rules before travelling with prescriptions.", "पर्चे वाली दवाओं के साथ यात्रा से पहले दवा आयात के नियम जाँचें।") },
    { name: b("Singapore", "सिंगापुर"), urgent: b("Emergency 995 · SOS 1767 (24 hours) · IMH helpline 6389 2222", "इमरजेंसी 995 · SOS 1767 (24 घंटे) · IMH हेल्पलाइन 6389 2222"), local: b("A polyclinic or GP can refer you to a psychiatrist.", "पॉलीक्लिनिक या GP मनोचिकित्सक के पास रेफ़र कर सकते हैं।"), note: b("Work-pass holders should check their employer's medical benefits.", "वर्क-पास धारक अपने नियोक्ता के मेडिकल लाभ जाँचें।") },
  ] as Country[],
  disclaimer: b(
    "Helpline numbers are provided for convenience; please confirm them on your country's official health website, as services can change.",
    "हेल्पलाइन नंबर सुविधा के लिए दिए गए हैं; कृपया अपने देश की आधिकारिक स्वास्थ्य वेबसाइट पर पुष्टि करें, क्योंकि सेवाएँ बदल सकती हैं।"
  ),
  faqs: [
    faq("Can I book an online consultation from abroad?", "क्या विदेश से ऑनलाइन परामर्श बुक कर सकता हूँ?", "No. Consultations are only for people physically in India, because medical licensing is country-specific. Please consult a licensed professional where you live.", "नहीं। परामर्श सिर्फ़ भारत में मौजूद लोगों के लिए है, क्योंकि चिकित्सा लाइसेंस हर देश का अलग होता है। कृपया जहाँ आप रहते हैं वहाँ के लाइसेंसशुदा विशेषज्ञ से परामर्श लें।"),
    faq("My parent in India needs help. Can I join the call from abroad?", "भारत में मेरे माता-पिता को मदद चाहिए। क्या मैं विदेश से कॉल में जुड़ सकता हूँ?", "Yes. The patient must be in India; with their consent, family members abroad can join the video call.", "हाँ। मरीज़ भारत में होना चाहिए; उनकी सहमति से विदेश में रहने वाले परिवारजन वीडियो कॉल में जुड़ सकते हैं।"),
    faq("Can you send medicines abroad?", "क्या आप विदेश दवाएँ भेज सकते हैं?", "No. We do not dispense or ship medicines. Prescriptions are for use in India.", "नहीं। हम दवाएँ नहीं देते या भेजते। पर्चे भारत में उपयोग के लिए हैं।"),
  ],
};
