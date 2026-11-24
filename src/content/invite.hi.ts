import { HOME_MAP_QUERY, VENUE_MAP_QUERY, mapSearch, type Invite } from "./invite";

/**
 * Hindi version of the invitation. Wording follows the printed card wherever the card has it.
 * Kept in English on purpose (the family's choice): "Save the date", "View on map", AM / PM,
 * "RSVP", and the "Counting down to Forever" heading.
 */

const VENUE_NAME = "मधुबन मैरिज गार्डन";
const VENUE_ADDRESS = "सीकर रोड, राजावास, नांगल सिरस, राजस्थान 302048";
const HOME = "सुमन विहार, इमली फाटक, जयपुर";
const AT_HOME = "निज निवास";

export const hi: Invite = {
  meta: {
    title: "राज एवं नवधा | विवाह निमंत्रण",
    description: "राज और नवधा के मंगल परिणय (14 दिसम्बर 2026, जयपुर) में आप सपरिवार सादर आमंत्रित हैं।",
  },

  envelope: {
    hint: "खोलने के लिए मुहर को छुएँ",
    youAreInvited: "आप आमंत्रित हैं",
  },

  couple: {
    first: "राज",
    second: "नवधा",
    monogram: "र & न",
    and: "और",
    blessing: "श्री गणेशाय नमः",
    firstParents: "श्रीमती सुमन शर्मा एवं स्व. श्री किशन लाल कोठोत्या के सुपुत्र, जयपुर",
    secondParents: "डॉ. आभा पारीक एवं डॉ. राजेश पारीक की सुपुत्री, श्री गोपाल नगर, जयपुर",
  },

  wedding: {
    dateLong: "सोमवार, 14 दिसम्बर 2026",
    dateShort: "14 दिसम्बर 2026",
    time: "पाणिग्रहण संस्कार · 12:15 PM",
    startsAt: "2026-12-14T12:15:00+05:30",
    venue: VENUE_NAME,
    venueAddress: VENUE_ADDRESS,
    city: "जयपुर",
    mapUrl: mapSearch(VENUE_MAP_QUERY),
    saveTheDate: "Save the date",
  },

  card: {
    blessing: "परमपिता परमेश्वर की असीम अनुकम्पा से",
    request: "मंगल परिणय की मधुर बेला पर वर-वधू को आशीर्वाद प्रदान करने हेतु आपको सपरिवार सादर आमंत्रित करते हैं",
    viewOnMap: "View on map",
  },

  families: {
    heading: "स्नेह एवं आशीर्वाद सहित",
    sub: "आपकी प्रतीक्षा में परिवारजन",
    groups: [
      { title: "उत्तराकांक्षी", lines: ["राम किशोर शर्मा"] },
      {
        title: "ननिहाल पक्ष",
        lines: [
          "श्रीमती ग्यारसी देवी - ग्यारसीलाल दण्डायत जी",
          "श्रीमती मंजू देवी - लक्ष्मीनारायण दण्डायत जी",
          "स्व. श्रीमती मंजू देवी - दिनेश चंद जी दण्डायत",
          "श्रीमती रेखा देवी - नन्दलाल जी दण्डायत",
          "श्रीमती पूनम देवी - नरेन्द्र जी दण्डायत",
          "एवं समस्त दण्डायत परिवार",
        ],
        footnote: "जी.के. होटल",
      },
      {
        title: "जंवाई पक्ष",
        lines: [
          "स्व. दरयाव - बजरंग सिंह जी",
          "मंजू - राजाबाबू जी",
          "स्व. आशा - मोहन जी",
          "रचना - राजेश जी",
          "डॉ. लता - आलोक जी",
          "रेखा - सौरभ जी",
          "गुड्डा - मनोज जी",
          "वीना - सुनील जी",
        ],
      },
      { title: "स्वागतकर्ता", lines: ["रजनीश - रेखा", "सक्षम, आदित्य"] },
    ],
  },

  eventsHeading: "शगुन के सुनहरे पल",
  eventsSub: "विघ्न हरण मंगल करण, गणनायक गणराज। प्रथम निमंत्रण आपको, सकल सुधारो काज॥",
  events: [
    {
      id: "thu",
      title: "गुरुवार",
      weekday: "गुरुवार",
      dateLabel: "10 दिसम्बर 2026",
      date: "2026-12-10",
      venue: AT_HOME,
      note: HOME,
      mapUrl: mapSearch(HOME_MAP_QUERY),
      icon: "kalash",
      ceremonies: [
        { name: "गणेश निमंत्रण", time: "6:15 AM", at: "06:15" },
        { name: "बान सांकड़ी", time: "9:15 AM", at: "09:15" },
        { name: "जनेऊ", time: "12:15 PM", at: "12:15" },
      ],
    },
    {
      id: "fri",
      title: "शुक्रवार",
      weekday: "शुक्रवार",
      dateLabel: "11 दिसम्बर 2026",
      date: "2026-12-11",
      venue: AT_HOME,
      note: HOME,
      mapUrl: mapSearch(HOME_MAP_QUERY),
      icon: "kalash",
      ceremonies: [
        { name: "चाक", time: "4:15 PM", at: "16:15" },
        { name: "बिदोरी", time: "6:15 PM", at: "18:15" },
      ],
    },
    {
      id: "sat",
      title: "शनिवार",
      weekday: "शनिवार",
      dateLabel: "12 दिसम्बर 2026",
      date: "2026-12-12",
      venue: AT_HOME,
      note: HOME,
      mapUrl: mapSearch(HOME_MAP_QUERY),
      icon: "mehendi",
      ceremonies: [{ name: "मेंहदी", time: "11:15 AM", at: "11:15" }],
    },
    {
      id: "sun",
      title: "रविवार",
      weekday: "रविवार",
      dateLabel: "13 दिसम्बर 2026",
      date: "2026-12-13",
      venue: VENUE_NAME,
      note: VENUE_ADDRESS,
      mapUrl: mapSearch(VENUE_MAP_QUERY),
      icon: "haldi",
      ceremonies: [
        { name: "भात", time: "9:15 AM", at: "09:15" },
        { name: "हल्दी", time: "12:15 PM", at: "12:15" },
        { name: "लग्न टीका", time: "5:15 PM", at: "17:15" },
        { name: "संगीत", time: "7:15 PM", at: "19:15" },
      ],
    },
    {
      id: "mon",
      title: "विवाह दिवस",
      weekday: "सोमवार",
      dateLabel: "14 दिसम्बर 2026",
      date: "2026-12-14",
      venue: VENUE_NAME,
      note: VENUE_ADDRESS,
      mapUrl: mapSearch(VENUE_MAP_QUERY),
      icon: "shaadi",
      ceremonies: [
        { name: "निकासी बारात", time: "10:15 AM", at: "10:15" },
        { name: "पाणिग्रहण संस्कार", time: "12:15 PM", at: "12:15" },
        { name: "आशीर्वाद समारोह एवं प्रीतिभोज", time: "7:00 PM से", at: "19:00" },
      ],
    },
  ],

  gallery: {
    heading: "हमारे पल",
    sub: "हमारे एल्बम के कुछ पन्ने",
    items: [
      { id: "g1", caption: "उसके लिए एक फूल", src: "/gallery/01.jpg", thumb: "/gallery/01-thumb.jpg", alt: "राज और नवधा: उसके लिए एक फूल", art: 1 },
      { id: "g2", caption: "हाथों में हाथ", src: "/gallery/02.jpg", thumb: "/gallery/02-thumb.jpg", alt: "राज और नवधा: हाथों में हाथ", art: 2 },
      { id: "g3", caption: "एक शांत दोपहर", src: "/gallery/03.jpg", thumb: "/gallery/03-thumb.jpg", alt: "राज और नवधा: एक शांत दोपहर", art: 3 },
      { id: "g4", caption: "हमेशा तुम", src: "/gallery/04.jpg", thumb: "/gallery/04-thumb.jpg", alt: "राज और नवधा: हमेशा तुम", art: 4 },
      { id: "g5", caption: "दो दिल, एक फ्रेम", src: "/gallery/05.jpg", thumb: "/gallery/05-thumb.jpg", alt: "राज और नवधा: दो दिल, एक फ्रेम", art: 1 },
      { id: "g6", caption: "तुम पर दिल हार बैठा", src: "/gallery/06.jpg", thumb: "/gallery/06-thumb.jpg", alt: "राज और नवधा: तुम पर दिल हार बैठा", art: 2 },
      { id: "g7", caption: "हँसी के पीछे-पीछे", src: "/gallery/07.jpg", thumb: "/gallery/07-thumb.jpg", alt: "राज और नवधा: हँसी के पीछे-पीछे", art: 3 },
      { id: "g8", caption: "हर कदम साथ-साथ", src: "/gallery/08.jpg", thumb: "/gallery/08-thumb.jpg", alt: "राज और नवधा: हर कदम साथ-साथ", art: 4 },
      { id: "g9", caption: "तुम्हारे संग चलते हुए", src: "/gallery/09.jpg", thumb: "/gallery/09-thumb.jpg", alt: "राज और नवधा: तुम्हारे संग चलते हुए", art: 1 },
      { id: "g10", caption: "शरारत भरे दिन", src: "/gallery/10.jpg", thumb: "/gallery/10-thumb.jpg", alt: "राज और नवधा: शरारत भरे दिन", art: 2 },
      { id: "g11", caption: "हमारे नाम", src: "/gallery/11.jpg", thumb: "/gallery/11-thumb.jpg", alt: "राज और नवधा: हमारे नाम", art: 3 },
      { id: "g12", caption: "चाय की एक प्याली पर", src: "/gallery/12.jpg", thumb: "/gallery/12-thumb.jpg", alt: "राज और नवधा: चाय की एक प्याली पर", art: 4 },
      { id: "g13", caption: "मीठे पल", src: "/gallery/13.jpg", thumb: "/gallery/13-thumb.jpg", alt: "राज और नवधा: मीठे पल", art: 1 },
      { id: "g14", caption: "बस हम दोनों", src: "/gallery/14.jpg", thumb: "/gallery/14-thumb.jpg", alt: "राज और नवधा: बस हम दोनों", art: 2 },
      { id: "g15", caption: "सितारों में लिखा", src: "/gallery/15.jpg", thumb: "/gallery/15-thumb.jpg", alt: "राज और नवधा: सितारों में लिखा", art: 3 },
    ],
    swipeHint: "और तस्वीरें देखने के लिए सरकाएँ",
  },

  rsvp: {
    heading: "क्या आप आएँगे?",
    sub: "हमारी मेज़ पर आपके लिए जगह पहले से तय है",
    nameLabel: "आपका नाम",
    namePlaceholder: "पूरा नाम",
    attendLabel: "क्या आप उपस्थित होंगे?",
    yes: "जी, अवश्य",
    no: "खेद है, नहीं",
    guestsLabel: "अतिथियों की संख्या",
    messageLabel: "हमारे लिए संदेश",
    messagePlaceholder: "आपका आशीर्वाद और शुभकामनाएँ…",
    submit: "RSVP भेजें",
    sending: "भेज रहे हैं…",
    successYesTitle: "आपके साथ उत्सव मनाने की प्रतीक्षा रहेगी",
    successYesBody: "आपका उत्तर हम तक पहुँच गया है। शीघ्र मिलते हैं!",
    successNoTitle: "आपकी कमी खलेगी",
    successNoBody: "सूचित करने के लिए धन्यवाद। आप हमारे हृदय में रहेंगे।",
    errorGeneric: "आपका उत्तर नहीं भेजा जा सका। कृपया थोड़ी देर बाद फिर प्रयास करें।",
    errorName: "कृपया अपना नाम बताएँ।",
    editAgain: "उत्तर बदलें",
  },

  countdown: {
    // Kept in English by request.
    heading: "Counting down to",
    headingAccent: "Forever",
    units: { days: "दिन", hours: "घंटे", minutes: "मिनट", seconds: "सेकंड" },
    tagline: ["जल्दी आइए, देर तक रुकिए।", "अपनी उपस्थिति से हमें आशीर्वाद दीजिए।"],
    wishButton: "शुभकामना आकाश-दीप छोड़ें",
    wishPrompt: "अपनी शुभकामना लिखें",
    wishPlaceholder: "आपका सफ़र सदा…",
    wishSend: "छोड़ें",
    wishClose: "बंद करें",
    wishFallbacks: [
      "चाय गरम रहे और ठहाके बुलंद।",
      "आपका सफ़र सदा सुकून भरा रहे।",
      "आपके जीवन में सदा सुनहरी शामें रहें।",
      "हर सुबह साथ की चाय से शुरू हो।",
    ],
  },

  footer: {
    withLove: "सप्रेम",
    families: "एवं परिवारजन",
    madeWith: "अपनों के लिए प्यार से बनाया",
    tagline: "हमेशा का एक छोटा-सा हिस्सा",
  },

  music: {
    on: "संगीत रोकें",
    off: "संगीत चलाएँ",
  },

  a11y: {
    envelopeLabel: "विवाह निमंत्रण का लिफ़ाफ़ा",
    openInvitation: "निमंत्रण खोलें",
    prevPhoto: "पिछली तस्वीर",
    nextPhoto: "अगली तस्वीर",
    choosePhoto: "तस्वीर चुनें",
    fewerGuests: "एक अतिथि कम करें",
    moreGuests: "एक अतिथि और जोड़ें",
    timer: (n) => (n === null ? "विवाह तक उलटी गिनती" : `विवाह में ${n} दिन शेष`),
  },
};
