import type { L10n } from "../i18n";
import { b, faq } from "./conditions/_h";

/**
 * International educational hub. No medical licence outside India is claimed and no
 * cross-border consultation is offered: consultations are for people physically in India.
 */
export type Country = { name: L10n; local: L10n; note: L10n };

export const INTERNATIONAL = {
  title: b("Mental Health Information for Indians Abroad", "विदेश में रहने वाले भारतीयों के लिए मानसिक स्वास्थ्य जानकारी"),
  h1: b("Mental health guidance for Indians living abroad", "विदेश में रहने वाले भारतीयों के लिए मानसिक स्वास्थ्य मार्गदर्शन"),
  description: b(
    "Mental health information for Indians in the USA, UK, Canada, Australia, Gulf countries, Singapore, Malaysia, New Zealand and Germany — how to find care where you live.",
    "अमेरिका, ब्रिटेन, कनाडा, ऑस्ट्रेलिया, खाड़ी देश, सिंगापुर, मलेशिया, न्यूज़ीलैंड और जर्मनी में रहने वाले भारतीयों के लिए मानसिक स्वास्थ्य जानकारी — जहाँ आप रहते हैं वहाँ इलाज कैसे खोजें।"
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
    { name: b("USA", "अमेरिका"), local: b("Start with your primary care doctor or your insurer's behavioural-health directory.", "अपने प्राइमरी केयर डॉक्टर या बीमा कंपनी की बिहेवियरल-हेल्थ सूची से शुरू करें।"), note: b("Many universities offer free counselling for international students.", "कई विश्वविद्यालय अंतरराष्ट्रीय छात्रों को मुफ़्त काउंसलिंग देते हैं।") },
    { name: b("UK", "ब्रिटेन"), local: b("Register with a GP; NHS Talking Therapies can often be accessed by self-referral in England.", "GP के साथ रजिस्टर करें; इंग्लैंड में NHS Talking Therapies में अक्सर ख़ुद रेफ़र किया जा सकता है।"), note: b("Students can use their university wellbeing service.", "छात्र अपने विश्वविद्यालय की वेलबीइंग सेवा का उपयोग कर सकते हैं।") },
    { name: b("Canada", "कनाडा"), local: b("A family doctor or walk-in clinic can refer you; provincial health lines offer guidance.", "फ़ैमिली डॉक्टर या वॉक-इन क्लिनिक रेफ़र कर सकते हैं; प्रांतीय हेल्थ लाइन मार्गदर्शन देती हैं।"), note: b("New immigrants can ask settlement agencies about free counselling.", "नए प्रवासी सेटलमेंट एजेंसियों से मुफ़्त काउंसलिंग के बारे में पूछ सकते हैं।") },
    { name: b("Australia", "ऑस्ट्रेलिया"), local: b("See a GP, who can prepare a Mental Health Treatment Plan for subsidised psychology sessions where eligible.", "GP से मिलें, जो पात्रता होने पर सब्सिडी वाले साइकोलॉजी सेशन के लिए मेंटल हेल्थ ट्रीटमेंट प्लान बना सकते हैं।"), note: b("International students should check their OSHC cover.", "अंतरराष्ट्रीय छात्र अपना OSHC कवर जाँचें।") },
    { name: b("UAE", "UAE"), local: b("Consult a psychiatrist licensed by the DHA, DOH or MOHAP; check what your employer's health insurance covers.", "DHA, DOH या MOHAP से लाइसेंसशुदा मनोचिकित्सक से परामर्श लें; देखें कि नियोक्ता का स्वास्थ्य बीमा क्या कवर करता है।"), note: b("Long working hours and family separation are common stressors for workers.", "लंबे काम के घंटे और परिवार से अलगाव कर्मचारियों के आम तनाव हैं।") },
    { name: b("Saudi Arabia", "सऊदी अरब"), local: b("Ask your employer's medical insurer for a list of licensed psychiatrists.", "नियोक्ता के मेडिकल बीमा से लाइसेंसशुदा मनोचिकित्सकों की सूची माँगें।"), note: b("Do not carry or receive medicines from India without checking Saudi rules — some psychiatric medicines are controlled.", "सऊदी नियम जाँचे बिना भारत से दवाएँ न ले जाएँ और न मँगवाएँ — कुछ मनोरोग दवाएँ नियंत्रित हैं।") },
    { name: b("Qatar", "क़तर"), local: b("Hamad Medical Corporation and licensed private clinics provide psychiatric care.", "हमद मेडिकल कॉर्पोरेशन और लाइसेंसशुदा निजी क्लिनिक मनोरोग इलाज देते हैं।"), note: b("Check medicine import rules before travelling with prescriptions.", "पर्चे वाली दवाओं के साथ यात्रा से पहले दवा आयात के नियम जाँचें।") },
    { name: b("Singapore", "सिंगापुर"), local: b("A polyclinic or GP can refer you to a psychiatrist.", "पॉलीक्लिनिक या GP मनोचिकित्सक के पास रेफ़र कर सकते हैं।"), note: b("Work-pass holders should check their employer's medical benefits.", "वर्क-पास धारक अपने नियोक्ता के मेडिकल लाभ जाँचें।") },
    { name: b("Kuwait", "कुवैत"), local: b("The Kuwait Center for Mental Health (Shuwaikh) is the main public psychiatric hospital; ask your employer's insurer for licensed private psychiatrists.", "कुवैत सेंटर फ़ॉर मेंटल हेल्थ (शुवैख़) मुख्य सरकारी मनोरोग अस्पताल है; लाइसेंसशुदा निजी मनोचिकित्सकों के लिए नियोक्ता के बीमा से पूछें।"), note: b("Check Kuwait's medicine rules before bringing any prescription medicine from India.", "भारत से कोई भी पर्चे वाली दवा लाने से पहले कुवैत के दवा नियम जाँचें।") },
    { name: b("Oman", "ओमान"), local: b("Al Masarra Hospital in Muscat is the national psychiatric hospital; private licensed clinics are also available.", "मस्कट का अल मसर्रा अस्पताल राष्ट्रीय मनोरोग अस्पताल है; लाइसेंसशुदा निजी क्लिनिक भी उपलब्ध हैं।"), note: b("Isolation and work stress are common among expatriate workers — reach out early.", "प्रवासी कर्मचारियों में अकेलापन और काम का तनाव आम है — जल्दी मदद लें।") },
    { name: b("Bahrain", "बहरीन"), local: b("The Ministry of Health's Psychiatric Hospital and licensed private clinics provide psychiatric care.", "स्वास्थ्य मंत्रालय का मनोरोग अस्पताल और लाइसेंसशुदा निजी क्लिनिक मनोरोग इलाज देते हैं।"), note: b("Carry a copy of your prescription when travelling with medicines.", "दवाओं के साथ यात्रा करते समय पर्चे की कॉपी साथ रखें।") },
    { name: b("Malaysia", "मलेशिया"), local: b("A government clinic (Klinik Kesihatan) or GP can refer you to a psychiatrist.", "सरकारी क्लिनिक (क्लिनिक केसिहतान) या GP मनोचिकित्सक के पास रेफ़र कर सकते हैं।"), note: b("Befrienders also supports callers in Tamil and English.", "बिफ्रेंडर्स तमिल और अंग्रेज़ी में भी बात करते हैं।") },
    { name: b("New Zealand", "न्यूज़ीलैंड"), local: b("Your GP can refer you to mental health services; Asian Family Services offers support in several languages.", "आपके GP मानसिक स्वास्थ्य सेवाओं के पास रेफ़र कर सकते हैं; Asian Family Services कई भाषाओं में मदद देती है।"), note: b("International students can use their university's counselling service.", "अंतरराष्ट्रीय छात्र अपने विश्वविद्यालय की काउंसलिंग सेवा का उपयोग कर सकते हैं।") },
    { name: b("Germany", "जर्मनी"), local: b("A GP (Hausarzt) can refer you; statutory health insurance covers approved psychotherapy.", "GP (Hausarzt) रेफ़र कर सकते हैं; सरकारी स्वास्थ्य बीमा मान्य साइकोथेरेपी कवर करता है।"), note: b("Students can use the university's psychological counselling service (Psychologische Beratung).", "छात्र विश्वविद्यालय की मनोवैज्ञानिक काउंसलिंग सेवा (Psychologische Beratung) का उपयोग कर सकते हैं।") },
  ] as Country[],
  disclaimer: b(
    "In an emergency, call your country's local emergency number or go to the nearest hospital emergency department.",
    "इमरजेंसी में अपने देश का स्थानीय इमरजेंसी नंबर डायल करें या नज़दीकी अस्पताल के इमरजेंसी विभाग जाएँ।"
  ),
  faqs: [
    faq("Can I book an online consultation from abroad?", "क्या विदेश से ऑनलाइन परामर्श बुक कर सकता हूँ?", "No. Consultations are only for people physically in India, because medical licensing is country-specific. Please consult a licensed professional where you live.", "नहीं। परामर्श सिर्फ़ भारत में मौजूद लोगों के लिए है, क्योंकि चिकित्सा लाइसेंस हर देश का अलग होता है। कृपया जहाँ आप रहते हैं वहाँ के लाइसेंसशुदा विशेषज्ञ से परामर्श लें।"),
    faq("My parent in India needs help. Can I join the call from abroad?", "भारत में मेरे माता-पिता को मदद चाहिए। क्या मैं विदेश से कॉल में जुड़ सकता हूँ?", "Yes. The patient must be in India; with their consent, family members abroad can join the video call.", "हाँ। मरीज़ भारत में होना चाहिए; उनकी सहमति से विदेश में रहने वाले परिवारजन वीडियो कॉल में जुड़ सकते हैं।"),
    faq("Can you send medicines abroad?", "क्या आप विदेश दवाएँ भेज सकते हैं?", "No. We do not dispense or ship medicines. Prescriptions are for use in India.", "नहीं। हम दवाएँ नहीं देते या भेजते। पर्चे भारत में उपयोग के लिए हैं।"),
  ],
};
