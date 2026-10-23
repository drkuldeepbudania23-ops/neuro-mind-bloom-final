import type { L10n } from "../i18n";
import { CLINIC, CRISIS_HELPLINE, SERVICES } from "../site";

/**
 * Legal pages: Privacy Policy, Terms & Conditions, Refund & Cancellation Policy.
 * Written for an online (tele-)psychiatry practice in India — Telemedicine Practice
 * Guidelines 2020, Digital Personal Data Protection Act 2023, IMC (Professional Conduct)
 * Regulations. Review with the doctor before changing any rule (refund windows etc.).
 */
export type PolicySection = { h: L10n; p: L10n[] };
export type Policy = {
  slug: "privacy-policy" | "terms-and-conditions" | "refund-policy";
  title: L10n;
  description: L10n;
  intro: L10n;
  sections: PolicySection[];
};

/** Date the current text took effect (shown on every policy page). */
export const POLICY_EFFECTIVE = { en: "23 October 2026", hi: "23 अक्टूबर 2026" };

const contactLine: L10n = {
  en: `Neuro Mind Bloom (Dr. Kuldeep Budania), ${CLINIC.city.en} · Email: ${CLINIC.email} · Phone: ${CLINIC.phoneDisplay} · WhatsApp: ${CLINIC.whatsappDisplay}`,
  hi: `Neuro Mind Bloom (डॉ. कुलदीप बुडानिया), ${CLINIC.city.hi} · ईमेल: ${CLINIC.email} · फ़ोन: ${CLINIC.phoneDisplay} · WhatsApp: ${CLINIC.whatsappDisplay}`,
};

const feeList = SERVICES.map((s) => `${s.label.en} – ₹${s.fee}`).join(", ");
const feeListHi = SERVICES.map((s) => `${s.label.hi} – ₹${s.fee}`).join(", ");

export const PRIVACY: Policy = {
  slug: "privacy-policy",
  title: { en: "Privacy Policy", hi: "गोपनीयता नीति" },
  description: {
    en: "How Neuro Mind Bloom collects, uses, stores and protects your personal and health information during online psychiatry consultations.",
    hi: "ऑनलाइन मनोरोग परामर्श के दौरान Neuro Mind Bloom आपकी व्यक्तिगत और स्वास्थ्य जानकारी कैसे लेता, इस्तेमाल करता, रखता और सुरक्षित करता है।",
  },
  intro: {
    en: "Mental-health information is deeply personal. This policy explains what we collect, why, who can see it and the rights you have under the Digital Personal Data Protection Act, 2023.",
    hi: "मानसिक स्वास्थ्य की जानकारी बहुत निजी होती है। यह नीति बताती है कि हम क्या जानकारी लेते हैं, क्यों लेते हैं, उसे कौन देख सकता है और डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 के तहत आपके क्या अधिकार हैं।",
  },
  sections: [
    {
      h: { en: "1. Who we are", hi: "1. हम कौन हैं" },
      p: [
        {
          en: "Neuro Mind Bloom is the psychiatry practice of Dr. Kuldeep Budania (MBBS, MD Psychiatry), offering consultations by video, phone and in person. For this policy, the practice is the “Data Fiduciary” responsible for your data.",
          hi: "Neuro Mind Bloom डॉ. कुलदीप बुडानिया (MBBS, MD मनोचिकित्सा) की मनोरोग प्रैक्टिस है, जो वीडियो, फ़ोन और व्यक्तिगत परामर्श देती है। इस नीति के लिए यही प्रैक्टिस आपके डेटा की ज़िम्मेदार “डेटा फ़िड्यूशियरी” है।",
        },
      ],
    },
    {
      h: { en: "2. Information we collect", hi: "2. हम कौन-सी जानकारी लेते हैं" },
      p: [
        {
          en: "Contact and booking details: name, mobile number, email, age/gender, preferred date and time, language and the reason for consultation.",
          hi: "संपर्क और बुकिंग की जानकारी: नाम, मोबाइल नंबर, ईमेल, उम्र/लिंग, पसंदीदा तारीख़ और समय, भाषा और परामर्श का कारण।",
        },
        {
          en: "Health information you share with the doctor: symptoms, history, medicines, reports, assessment scores, consultation notes, prescriptions and follow-up plans.",
          hi: "डॉक्टर को दी गई स्वास्थ्य जानकारी: लक्षण, पुराना इतिहास, दवाएँ, रिपोर्ट, सेल्फ़-असेसमेंट के स्कोर, परामर्श नोट्स, पर्चे और फ़ॉलो-अप योजना।",
        },
        {
          en: "Payment information: amount, date, payment reference and status. Card, UPI PIN and bank login details are handled only by the payment provider (Razorpay) — we never see or store them.",
          hi: "भुगतान की जानकारी: राशि, तारीख़, भुगतान रेफ़रेंस और स्थिति। कार्ड, UPI PIN और बैंक लॉगिन की जानकारी सिर्फ़ भुगतान कंपनी (Razorpay) के पास जाती है — हम उन्हें न देखते हैं, न रखते हैं।",
        },
        {
          en: "Website feedback you choose to submit, and basic technical data (browser type, pages visited) needed to keep the website secure and working.",
          hi: "आप अपनी मर्ज़ी से जो फ़ीडबैक भेजते हैं, और वेबसाइट को सुरक्षित व चालू रखने के लिए ज़रूरी सामान्य तकनीकी जानकारी (ब्राउज़र, देखे गए पेज)।",
        },
      ],
    },
    {
      h: { en: "3. Why we use it", hi: "3. हम इसका इस्तेमाल क्यों करते हैं" },
      p: [
        {
          en: "To book and conduct your consultation, diagnose and treat you, issue prescriptions, send appointment, payment and follow-up reminders, keep medical records required by law, answer your questions and improve our care. We do not use your health information for advertising, and we never sell your data.",
          hi: "आपका अपॉइंटमेंट बुक करने और परामर्श देने, जाँच व इलाज करने, पर्चा देने, अपॉइंटमेंट/भुगतान/फ़ॉलो-अप की याद दिलाने, क़ानून के अनुसार मेडिकल रिकॉर्ड रखने, आपके सवालों के जवाब देने और इलाज बेहतर करने के लिए। आपकी स्वास्थ्य जानकारी का इस्तेमाल विज्ञापन के लिए नहीं होता और हम आपका डेटा कभी नहीं बेचते।",
        },
        {
          en: "By booking a consultation or sharing information with us, you give consent for these purposes. You may withdraw consent at any time (see section 7); this does not affect care already provided or records we must keep by law.",
          hi: "परामर्श बुक करके या जानकारी देकर आप इन कामों के लिए सहमति देते हैं। आप कभी भी सहमति वापस ले सकते हैं (भाग 7 देखें); इससे पहले दिए गए इलाज या क़ानूनन रखे जाने वाले रिकॉर्ड पर असर नहीं पड़ता।",
        },
      ],
    },
    {
      h: { en: "4. Who can see your information", hi: "4. आपकी जानकारी कौन देख सकता है" },
      p: [
        {
          en: "Only Dr. Kuldeep Budania and authorised staff of the practice. We share information outside the practice only with your consent, or when required by law, or in an emergency where there is a serious risk to your life or someone else's safety.",
          hi: "केवल डॉ. कुलदीप बुडानिया और प्रैक्टिस के अधिकृत स्टाफ़। प्रैक्टिस के बाहर जानकारी सिर्फ़ आपकी सहमति से, क़ानून की ज़रूरत पर, या ऐसी आपात स्थिति में दी जाती है जहाँ आपकी जान या किसी और की सुरक्षा को गंभीर ख़तरा हो।",
        },
        {
          en: "We use trusted service providers who process data only on our instructions: Google Firebase (secure database and login), Vercel (website hosting), Razorpay (payments), video-call services for teleconsultation, and WhatsApp / email for messages you request.",
          hi: "हम भरोसेमंद सेवा कंपनियों का इस्तेमाल करते हैं, जो सिर्फ़ हमारे निर्देश पर डेटा प्रोसेस करती हैं: Google Firebase (सुरक्षित डेटाबेस और लॉगिन), Vercel (वेबसाइट होस्टिंग), Razorpay (भुगतान), टेली-परामर्श के लिए वीडियो-कॉल सेवाएँ, और आपके कहने पर भेजे जाने वाले WhatsApp/ईमेल संदेश।",
        },
      ],
    },
    {
      h: { en: "5. How we protect it", hi: "5. हम इसे कैसे सुरक्षित रखते हैं" },
      p: [
        {
          en: "Records are stored in an access-controlled cloud database over encrypted connections (HTTPS). Only the doctor's verified account can open patient records, and access is logged. Consultations are not recorded. No system is perfectly secure, but we take reasonable security safeguards and will inform you and the authorities as required by law if a breach affects your data.",
          hi: "रिकॉर्ड एक सुरक्षित, नियंत्रित क्लाउड डेटाबेस में एन्क्रिप्टेड कनेक्शन (HTTPS) से रखे जाते हैं। मरीज़ के रिकॉर्ड सिर्फ़ डॉक्टर के सत्यापित अकाउंट से खुलते हैं और हर एक्सेस का रिकॉर्ड रहता है। परामर्श रिकॉर्ड नहीं किए जाते। कोई भी सिस्टम पूरी तरह सुरक्षित नहीं होता, पर हम उचित सुरक्षा उपाय करते हैं और डेटा लीक होने पर क़ानून के अनुसार आपको और अधिकारियों को सूचित करेंगे।",
        },
      ],
    },
    {
      h: { en: "6. How long we keep it", hi: "6. हम इसे कितने समय तक रखते हैं" },
      p: [
        {
          en: "Medical records and prescriptions are kept for at least three years from the last consultation, as required for doctors in India, and longer if needed for your continuing treatment or a legal matter. Booking enquiries that never become a consultation are deleted when no longer needed.",
          hi: "भारत में डॉक्टरों के नियमों के अनुसार मेडिकल रिकॉर्ड और पर्चे आख़िरी परामर्श से कम से कम तीन साल तक रखे जाते हैं, और आपके चलते इलाज या किसी क़ानूनी मामले के लिए ज़रूरत हो तो उससे ज़्यादा। जो बुकिंग पूछताछ परामर्श में नहीं बदलती, ज़रूरत ख़त्म होने पर हटा दी जाती है।",
        },
      ],
    },
    {
      h: { en: "7. Your rights", hi: "7. आपके अधिकार" },
      p: [
        {
          en: "You can ask for a summary of the personal data we hold about you, ask us to correct or update it, ask us to erase data we are not legally required to keep, withdraw consent, and nominate a person to exercise these rights on your behalf. To make a request, email or WhatsApp us from your registered mobile number; we may verify your identity before acting.",
          hi: "आप अपने बारे में रखी गई जानकारी का सारांश माँग सकते हैं, उसे ठीक या अपडेट करवा सकते हैं, जो जानकारी क़ानूनन रखना ज़रूरी नहीं उसे हटवा सकते हैं, सहमति वापस ले सकते हैं, और अपनी ओर से इन अधिकारों के लिए किसी व्यक्ति को नामित कर सकते हैं। अनुरोध के लिए अपने रजिस्टर्ड मोबाइल नंबर से ईमेल या WhatsApp करें; कार्रवाई से पहले हम आपकी पहचान की पुष्टि कर सकते हैं।",
        },
      ],
    },
    {
      h: { en: "8. Children", hi: "8. बच्चे" },
      p: [
        {
          en: "Patients under 18 are seen only with a parent or legal guardian, who gives consent on their behalf and should be present during the consultation.",
          hi: "18 साल से कम उम्र के मरीज़ों का परामर्श सिर्फ़ माता-पिता या क़ानूनी अभिभावक के साथ होता है, जो उनकी ओर से सहमति देते हैं और परामर्श के समय साथ रहने चाहिए।",
        },
      ],
    },
    {
      h: { en: "9. Cookies and browser storage", hi: "9. कुकीज़ और ब्राउज़र स्टोरेज" },
      p: [
        {
          en: "The website uses only the cookies and browser storage needed to work — for example remembering your language or keeping the doctor signed in. We do not use advertising or tracking cookies.",
          hi: "वेबसाइट सिर्फ़ ज़रूरी कुकीज़ और ब्राउज़र स्टोरेज का इस्तेमाल करती है — जैसे आपकी भाषा याद रखना या डॉक्टर को लॉग-इन रखना। हम विज्ञापन या ट्रैकिंग कुकीज़ इस्तेमाल नहीं करते।",
        },
      ],
    },
    {
      h: { en: "10. Grievance officer and changes", hi: "10. शिकायत अधिकारी और बदलाव" },
      p: [
        {
          en: `For any privacy question or complaint, contact Dr. Kuldeep Budania — ${CLINIC.email}, ${CLINIC.phoneDisplay}. We will acknowledge your complaint promptly and try to resolve it within 30 days. If you are not satisfied, you may approach the Data Protection Board of India. We may update this policy; the effective date at the top will change when we do.`,
          hi: `गोपनीयता से जुड़े किसी भी सवाल या शिकायत के लिए डॉ. कुलदीप बुडानिया से संपर्क करें — ${CLINIC.email}, ${CLINIC.phoneDisplay}। हम आपकी शिकायत जल्द स्वीकार करेंगे और 30 दिनों में हल करने की कोशिश करेंगे। संतुष्ट न होने पर आप भारत के डेटा संरक्षण बोर्ड से संपर्क कर सकते हैं। हम इस नीति को अपडेट कर सकते हैं; ऐसा होने पर ऊपर दी गई तारीख़ बदल जाएगी।`,
        },
      ],
    },
  ],
};

export const TERMS: Policy = {
  slug: "terms-and-conditions",
  title: { en: "Terms & Conditions", hi: "नियम एवं शर्तें" },
  description: {
    en: "Terms for using the Neuro Mind Bloom website and booking online psychiatry, de-addiction and sexual-health consultations with Dr. Kuldeep Budania.",
    hi: "Neuro Mind Bloom वेबसाइट के इस्तेमाल और डॉ. कुलदीप बुडानिया से ऑनलाइन मनोरोग, नशा मुक्ति और यौन स्वास्थ्य परामर्श बुक करने की शर्तें।",
  },
  intro: {
    en: "By using this website or booking a consultation you agree to these terms. Please read them along with our Privacy Policy and Refund & Cancellation Policy.",
    hi: "इस वेबसाइट का इस्तेमाल करके या परामर्श बुक करके आप इन शर्तों से सहमत होते हैं। कृपया इन्हें हमारी गोपनीयता नीति और रिफ़ंड एवं कैंसलेशन नीति के साथ पढ़ें।",
  },
  sections: [
    {
      h: { en: "1. Services", hi: "1. सेवाएँ" },
      p: [
        {
          en: "Neuro Mind Bloom provides psychiatric consultation, de-addiction treatment, sexual-health consultation and psychotherapy by Dr. Kuldeep Budania (MBBS, MD Psychiatry), mainly by video or phone (teleconsultation) and, where available, in person. All services are delivered online or in person — no physical goods are sold or shipped. Prescriptions are shared digitally by WhatsApp, email or the website.",
          hi: "Neuro Mind Bloom डॉ. कुलदीप बुडानिया (MBBS, MD मनोचिकित्सा) द्वारा मनोरोग परामर्श, नशा मुक्ति इलाज, यौन स्वास्थ्य परामर्श और साइकोथेरेपी देता है — मुख्य रूप से वीडियो या फ़ोन (टेली-परामर्श) से और जहाँ उपलब्ध हो, व्यक्तिगत रूप से। सभी सेवाएँ ऑनलाइन या व्यक्तिगत रूप से दी जाती हैं — कोई सामान बेचा या भेजा नहीं जाता। पर्चा WhatsApp, ईमेल या वेबसाइट से डिजिटल रूप में दिया जाता है।",
        },
      ],
    },
    {
      h: { en: "2. Not for emergencies", hi: "2. आपातकाल के लिए नहीं" },
      p: [
        {
          en: `This service is not an emergency service. If you or someone else is at immediate risk — thoughts of suicide or self-harm, violence, severe withdrawal, overdose or a medical emergency — call 112, go to the nearest hospital emergency, or call ${CRISIS_HELPLINE.name} at ${CRISIS_HELPLINE.number} (24×7, free).`,
          hi: `यह आपातकालीन सेवा नहीं है। अगर आपको या किसी और को तुरंत ख़तरा है — आत्महत्या या ख़ुद को नुक़सान के विचार, हिंसा, गंभीर विदड्रॉल, ओवरडोज़ या कोई मेडिकल इमरजेंसी — तो 112 पर कॉल करें, नज़दीकी अस्पताल की इमरजेंसी में जाएँ, या ${CRISIS_HELPLINE.name} ${CRISIS_HELPLINE.number} (24×7, मुफ़्त) पर कॉल करें।`,
        },
      ],
    },
    {
      h: { en: "3. Teleconsultation", hi: "3. टेली-परामर्श" },
      p: [
        {
          en: "Teleconsultations follow the Telemedicine Practice Guidelines, 2020 of India. The doctor decides whether your problem can be managed safely online. If it cannot, you may be advised an in-person visit, investigations or hospital care. Some medicines cannot legally be prescribed in a teleconsultation, and any prescription is at the doctor's professional judgement — booking a consultation does not guarantee a particular medicine, certificate or report.",
          hi: "टेली-परामर्श भारत की टेलीमेडिसिन प्रैक्टिस गाइडलाइंस, 2020 के अनुसार होता है। आपकी समस्या का इलाज ऑनलाइन सुरक्षित रूप से हो सकता है या नहीं, यह डॉक्टर तय करते हैं। अगर नहीं, तो आपको व्यक्तिगत रूप से मिलने, जाँच या अस्पताल में इलाज की सलाह दी जा सकती है। कुछ दवाएँ क़ानूनन टेली-परामर्श में नहीं लिखी जा सकतीं, और कोई भी पर्चा डॉक्टर के पेशेवर निर्णय पर निर्भर है — परामर्श बुक करने से किसी ख़ास दवा, सर्टिफ़िकेट या रिपोर्ट की गारंटी नहीं मिलती।",
        },
      ],
    },
    {
      h: { en: "4. Your responsibilities", hi: "4. आपकी ज़िम्मेदारियाँ" },
      p: [
        {
          en: "Give your true identity and accurate, complete information about your health and medicines; join the call on time from a private place with a working internet connection; take medicines only as prescribed and do not stop them suddenly without advice; and inform the doctor about side effects or worsening symptoms. Patients under 18 must consult with a parent or guardian present.",
          hi: "अपनी सही पहचान और अपनी सेहत व दवाओं की सही, पूरी जानकारी दें; समय पर किसी निजी जगह से अच्छे इंटरनेट के साथ कॉल से जुड़ें; दवाएँ सिर्फ़ पर्चे के अनुसार लें और बिना सलाह अचानक बंद न करें; साइड इफ़ेक्ट या तकलीफ़ बढ़ने पर डॉक्टर को बताएँ। 18 साल से कम उम्र के मरीज़ माता-पिता या अभिभावक की मौजूदगी में ही परामर्श लें।",
        },
      ],
    },
    {
      h: { en: "5. Appointments, fees and payment", hi: "5. अपॉइंटमेंट, फ़ीस और भुगतान" },
      p: [
        {
          en: `Current fees: ${feeList}. Fees are shown before booking and may change in future; the fee confirmed at booking applies to that appointment. Payment is made in advance through Razorpay (UPI, card, net-banking) or the clinic UPI QR. An appointment is confirmed only after the doctor's team confirms the slot. Cancellations and refunds follow our Refund & Cancellation Policy.`,
          hi: `मौजूदा फ़ीस: ${feeListHi}। फ़ीस बुकिंग से पहले दिखाई जाती है और भविष्य में बदल सकती है; बुकिंग के समय कन्फ़र्म हुई फ़ीस उसी अपॉइंटमेंट पर लागू होती है। भुगतान पहले Razorpay (UPI, कार्ड, नेट-बैंकिंग) या क्लिनिक के UPI QR से किया जाता है। डॉक्टर की टीम के स्लॉट कन्फ़र्म करने पर ही अपॉइंटमेंट पक्का होता है। कैंसलेशन और रिफ़ंड हमारी रिफ़ंड एवं कैंसलेशन नीति के अनुसार होते हैं।`,
        },
      ],
    },
    {
      h: { en: "6. Confidentiality and conduct", hi: "6. गोपनीयता और व्यवहार" },
      p: [
        {
          en: "Consultations are confidential, as explained in our Privacy Policy. Please do not record the consultation without the doctor's permission. We may decline or end a consultation if there is abusive behaviour, false identity, or a request for something unsafe or unlawful.",
          hi: "परामर्श गोपनीय होते हैं, जैसा गोपनीयता नीति में बताया गया है। डॉक्टर की अनुमति के बिना परामर्श रिकॉर्ड न करें। दुर्व्यवहार, ग़लत पहचान, या किसी असुरक्षित या ग़ैरक़ानूनी चीज़ की माँग होने पर हम परामर्श से मना कर सकते हैं या उसे रोक सकते हैं।",
        },
      ],
    },
    {
      h: { en: "7. Website content", hi: "7. वेबसाइट की जानकारी" },
      p: [
        {
          en: "Articles, videos, condition pages and self-assessment tools on this website are for general education. They are not a diagnosis and do not replace a personal consultation. Do not start, stop or change any medicine based only on website content. Website text, design and logo belong to Neuro Mind Bloom and may not be copied for commercial use without permission.",
          hi: "इस वेबसाइट के लेख, वीडियो, बीमारियों के पेज और सेल्फ़-असेसमेंट टूल सामान्य जानकारी के लिए हैं। ये निदान नहीं हैं और व्यक्तिगत परामर्श की जगह नहीं लेते। सिर्फ़ वेबसाइट की जानकारी के आधार पर कोई दवा शुरू, बंद या बदलें नहीं। वेबसाइट का टेक्स्ट, डिज़ाइन और लोगो Neuro Mind Bloom का है और बिना अनुमति व्यावसायिक इस्तेमाल के लिए कॉपी नहीं किया जा सकता।",
        },
      ],
    },
    {
      h: { en: "8. Limitation of liability", hi: "8. ज़िम्मेदारी की सीमा" },
      p: [
        {
          en: "We provide care with reasonable professional skill. We are not responsible for problems caused by inaccurate information given to us, by not following medical advice, or by failures of internet, phone or third-party services outside our control. To the extent permitted by law, our total liability for any claim relating to a consultation is limited to the fee paid for that consultation.",
          hi: "हम उचित पेशेवर कौशल के साथ इलाज देते हैं। हमें दी गई ग़लत जानकारी, डॉक्टरी सलाह न मानने, या हमारे नियंत्रण से बाहर इंटरनेट, फ़ोन या अन्य कंपनियों की सेवाओं में ख़राबी से हुई समस्याओं के लिए हम ज़िम्मेदार नहीं हैं। क़ानून जहाँ तक अनुमति देता है, किसी परामर्श से जुड़े दावे में हमारी कुल ज़िम्मेदारी उस परामर्श की फ़ीस तक सीमित है।",
        },
      ],
    },
    {
      h: { en: "9. Governing law and contact", hi: "9. लागू क़ानून और संपर्क" },
      p: [
        {
          en: "These terms are governed by the laws of India, and courts at Ajmer, Rajasthan have jurisdiction. We may update these terms; the effective date at the top will change when we do.",
          hi: "ये शर्तें भारत के क़ानूनों के अधीन हैं और अजमेर, राजस्थान की अदालतों का क्षेत्राधिकार होगा। हम इन शर्तों को अपडेट कर सकते हैं; ऐसा होने पर ऊपर दी गई तारीख़ बदल जाएगी।",
        },
        contactLine,
      ],
    },
  ],
};

export const REFUND: Policy = {
  slug: "refund-policy",
  title: { en: "Refund & Cancellation Policy", hi: "रिफ़ंड एवं कैंसलेशन नीति" },
  description: {
    en: "Cancellation, rescheduling and refund rules for online psychiatry consultations and psychotherapy sessions at Neuro Mind Bloom.",
    hi: "Neuro Mind Bloom में ऑनलाइन मनोरोग परामर्श और साइकोथेरेपी सत्रों के कैंसलेशन, री-शेड्यूल और रिफ़ंड के नियम।",
  },
  intro: {
    en: "We try to keep this simple and fair. All services are consultations delivered online or in person — nothing is shipped.",
    hi: "हम इसे आसान और निष्पक्ष रखने की कोशिश करते हैं। सभी सेवाएँ ऑनलाइन या व्यक्तिगत परामर्श हैं — कोई सामान नहीं भेजा जाता।",
  },
  sections: [
    {
      h: { en: "1. If you cancel or reschedule", hi: "1. अगर आप कैंसल या री-शेड्यूल करते हैं" },
      p: [
        {
          en: "24 hours or more before your appointment: you may reschedule free of charge, or cancel for a full refund.",
          hi: "अपॉइंटमेंट से 24 घंटे या उससे पहले: आप मुफ़्त में री-शेड्यूल कर सकते हैं, या कैंसल करके पूरा रिफ़ंड ले सकते हैं।",
        },
        {
          en: "Less than 24 hours before: you may reschedule once free of charge to a slot within the next 14 days. Refunds are not given for cancellations made within 24 hours.",
          hi: "24 घंटे से कम समय पहले: आप अगले 14 दिनों के किसी स्लॉट में एक बार मुफ़्त री-शेड्यूल कर सकते हैं। 24 घंटे के अंदर कैंसल करने पर रिफ़ंड नहीं दिया जाता।",
        },
        {
          en: "No-show: if you do not join within 15 minutes of the appointment time without informing us, the session is treated as used and no refund is given.",
          hi: "न आना (नो-शो): अगर आप बिना बताए अपॉइंटमेंट के समय के 15 मिनट के अंदर नहीं जुड़ते, तो सत्र इस्तेमाल हुआ माना जाएगा और रिफ़ंड नहीं मिलेगा।",
        },
      ],
    },
    {
      h: { en: "2. If we cancel or cannot consult", hi: "2. अगर हम कैंसल करें या परामर्श न हो पाए" },
      p: [
        {
          en: "If the doctor cancels, cannot attend, or the consultation cannot take place because of a technical problem on our side, you can choose a free reschedule or a full refund.",
          hi: "अगर डॉक्टर कैंसल करें, उपलब्ध न हों, या हमारी तरफ़ की तकनीकी समस्या से परामर्श न हो पाए, तो आप मुफ़्त री-शेड्यूल या पूरा रिफ़ंड चुन सकते हैं।",
        },
        {
          en: "If, at the start of the consultation, the doctor decides your condition cannot be managed safely online and advises an in-person or emergency visit instead, you will receive a full refund.",
          hi: "अगर परामर्श की शुरुआत में डॉक्टर तय करें कि आपकी समस्या का ऑनलाइन इलाज सुरक्षित नहीं है और आपको व्यक्तिगत या इमरजेंसी में दिखाने की सलाह दें, तो आपको पूरा रिफ़ंड मिलेगा।",
        },
        {
          en: "If you were charged twice or an amount higher than the fee confirmed for your appointment, the extra amount is refunded in full.",
          hi: "अगर आपसे दो बार या अपॉइंटमेंट की कन्फ़र्म फ़ीस से ज़्यादा राशि कट गई हो, तो ज़्यादा कटी पूरी राशि लौटाई जाएगी।",
        },
      ],
    },
    {
      h: { en: "3. When refunds are not given", hi: "3. कब रिफ़ंड नहीं मिलता" },
      p: [
        {
          en: "Once a consultation or therapy session has been completed, the fee is not refundable — including when the doctor's medical advice or prescription is different from what you expected. Fees for completed sessions of a therapy package are not refundable; unused, pre-paid sessions are refunded on request.",
          hi: "परामर्श या थेरेपी सत्र पूरा होने के बाद फ़ीस वापस नहीं होती — तब भी जब डॉक्टर की सलाह या पर्चा आपकी उम्मीद से अलग हो। थेरेपी पैकेज के पूरे हो चुके सत्रों की फ़ीस वापस नहीं होती; पहले से भुगतान किए गए जो सत्र इस्तेमाल नहीं हुए, उनका अनुरोध पर रिफ़ंड होता है।",
        },
      ],
    },
    {
      h: { en: "4. How to request and when you get it", hi: "4. अनुरोध कैसे करें और रिफ़ंड कब मिलेगा" },
      p: [
        {
          en: `Send your name, registered mobile number, appointment date and payment reference by WhatsApp (${CLINIC.whatsappDisplay}) or email (${CLINIC.email}) within 7 days of the appointment date. Approved refunds are initiated within 2 working days to the original payment method (same UPI ID, card or bank account) and usually reach you in 5–7 working days, depending on your bank.`,
          hi: `अपना नाम, रजिस्टर्ड मोबाइल नंबर, अपॉइंटमेंट की तारीख़ और भुगतान रेफ़रेंस अपॉइंटमेंट की तारीख़ से 7 दिनों के अंदर WhatsApp (${CLINIC.whatsappDisplay}) या ईमेल (${CLINIC.email}) पर भेजें। मंज़ूर हुआ रिफ़ंड 2 कार्य-दिवसों में उसी भुगतान माध्यम (वही UPI ID, कार्ड या बैंक खाता) में शुरू किया जाता है और आमतौर पर बैंक के अनुसार 5–7 कार्य-दिवसों में मिल जाता है।`,
        },
        contactLine,
      ],
    },
  ],
};

export const POLICIES = [PRIVACY, TERMS, REFUND] as const;

export function getPolicy(slug: Policy["slug"]): Policy {
  return POLICIES.find((p) => p.slug === slug)!;
}
