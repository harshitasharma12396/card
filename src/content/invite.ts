/**
 * Every word on the invitation lives here.
 * Content below was translated from the printed Hindi invitation card.
 * Gallery images, music and RSVP destination are still placeholders (see README).
 */

export type Ceremony = {
  name: string;
  /** Shown to guests, e.g. "6:15 AM" */
  time: string;
  /** 24h time used for the calendar file, e.g. "06:15" */
  at: string;
};

export type EventDay = {
  id: string;
  title: string;
  weekday: string;
  /** Shown on the card, e.g. "10 December 2026" */
  dateLabel: string;
  /** ISO date used for the calendar file */
  date: string;
  /** Leave empty when the card does not state a venue for that day. */
  venue?: string;
  note?: string;
  mapUrl?: string;
  icon: "kalash" | "mehendi" | "haldi" | "shaadi" | "reception";
  ceremonies: Ceremony[];
};

export type GalleryItem = {
  id: string;
  caption: string;
  /** Path under /public, e.g. "/gallery/01.jpg". When empty, placeholder art is shown. */
  src?: string;
  /** Small version of the photo for the thumbnail strip. */
  thumb?: string;
  alt: string;
  art: 1 | 2 | 3 | 4;
};

const mapSearch = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const VENUE_NAME = "Madhuban Marriage Garden";
const VENUE_ADDRESS = "Sikar Road, Rajawas, Nangal Siras, Rajasthan 302048";
/** Google Maps finds the venue by its plus code plus the address. */
const VENUE_MAP_QUERY = "Madhuban Marriage Garden, 3PCX+CG8, Sikar Rd, Rajawas, Nangal Siras, Rajasthan 302048";
const HOME = "20 Suman Vihar, Krishna Nagar, Imli Phatak, Jaipur, 302015";

export const invite = {
  meta: {
    title: "Raj & Navdha | Wedding Invitation",
    description: "You and your family are warmly invited to the wedding of Raj and Navdha, 14 December 2026, Jaipur.",
  },

  envelope: {
    hint: "Tap the seal to open",
    skip: "Skip",
  },

  couple: {
    first: "Raj",
    second: "Navdha",
    blessing: "श्री गणेशाय नमः",
    togetherWith: "Together with our families",
    firstParents: "Son of Smt. Suman Sharma & the late Shri Kishan Lal Kothotya, Jaipur",
    secondParents: "Daughter of Dr. Abha Pareek & Dr. Rajesh Pareek, Shri Gopal Nagar, Jaipur",
  },

  wedding: {
    dateLong: "Monday, 14 December 2026",
    dateShort: "14th December 2026",
    time: "Wedding ceremony at 12:15 PM",
    /** Countdown target (India Standard Time): Pani Grahan Sanskar, the wedding ceremony. */
    startsAt: "2026-12-14T12:15:00+05:30",
    venue: VENUE_NAME,
    venueAddress: VENUE_ADDRESS,
    city: "Jaipur",
    mapUrl: mapSearch(VENUE_MAP_QUERY),
    saveTheDate: "Save the dates",
  },

  card: {
    blessing: "With the infinite grace of the Supreme Father",
    request: "we cordially invite you and your family to bless the auspicious wedding of",
    viewOnMap: "View on map",
  },

  families: {
    heading: "With love and blessings",
    sub: "The families who await you",
    groups: [
      { title: "Awaiting your gracious presence", lines: ["Ram Kishor Sharma"] },
      {
        title: "Nanihal (maternal family)",
        lines: [
          "Smt. Gyarsi Devi & Gyarsi Lal Dandayat ji",
          "Smt. Manju Devi & Laxminarayan Dandayat ji",
          "Late Smt. Manju Devi & Dinesh Chand ji Dandayat",
          "Smt. Rekha Devi & Nandlal ji Dandayat",
          "Smt. Poonam Devi & Narendra ji Dandayat",
          "and the entire Dandayat family",
        ],
        footnote: "G.K. Hotel",
      },
      {
        title: "Daughters and sons-in-law of the family",
        lines: [
          "Late Daryav & Bajrang Singh ji",
          "Manju & Rajababu ji",
          "Late Asha & Mohan ji",
          "Rachna & Rajesh ji",
          "Dr. Lata & Alok ji",
          "Rekha & Saurabh ji",
          "Gudda & Manoj ji",
          "Veena & Sunil ji",
        ],
      },
      { title: "Welcomed by", lines: ["Rajneesh & Rekha", "Saksham, Aditya"] },
    ],
  },

  eventsHeading: "Golden moments",
  eventsSub: "Remover of obstacles, bringer of joy, Lord Ganesha: ours is the first invitation to you. Bless every task we begin.",
  events: [
    {
      id: "thu",
      title: "Thursday",
      weekday: "Thursday",
      dateLabel: "10 December 2026",
      date: "2026-12-10",
      venue: "Family residence",
      note: HOME,
      mapUrl: mapSearch(HOME),
      icon: "kalash",
      ceremonies: [
        { name: "Ganesh Nimantran", time: "6:15 AM", at: "06:15" },
        { name: "Baan Sankdi", time: "9:15 AM", at: "09:15" },
        { name: "Janeu", time: "12:15 PM", at: "12:15" },
      ],
    },
    {
      id: "fri",
      title: "Friday",
      weekday: "Friday",
      dateLabel: "11 December 2026",
      date: "2026-12-11",
      venue: "Family residence",
      note: HOME,
      mapUrl: mapSearch(HOME),
      icon: "kalash",
      ceremonies: [
        { name: "Chaak", time: "4:15 PM", at: "16:15" },
        { name: "Bindori", time: "6:15 PM", at: "18:15" },
      ],
    },
    {
      id: "sat",
      title: "Saturday",
      weekday: "Saturday",
      dateLabel: "12 December 2026",
      date: "2026-12-12",
      venue: "Family residence",
      note: HOME,
      mapUrl: mapSearch(HOME),
      icon: "mehendi",
      ceremonies: [{ name: "Mehndi", time: "11:15 AM", at: "11:15" }],
    },
    {
      id: "sun",
      title: "Sunday",
      weekday: "Sunday",
      dateLabel: "13 December 2026",
      date: "2026-12-13",
      venue: VENUE_NAME,
      note: VENUE_ADDRESS,
      mapUrl: mapSearch(VENUE_MAP_QUERY),
      icon: "haldi",
      ceremonies: [
        { name: "Bhaat", time: "9:15 AM", at: "09:15" },
        { name: "Haldi", time: "12:15 PM", at: "12:15" },
        { name: "Lagan Tika", time: "5:15 PM", at: "17:15" },
        { name: "Sangeet", time: "7:15 PM", at: "19:15" },
      ],
    },
    {
      id: "mon",
      title: "Wedding Day",
      weekday: "Monday",
      dateLabel: "14 December 2026",
      date: "2026-12-14",
      venue: VENUE_NAME,
      note: VENUE_ADDRESS,
      mapUrl: mapSearch(VENUE_MAP_QUERY),
      icon: "shaadi",
      ceremonies: [
        { name: "Nikasi Baraat (groom's procession)", time: "10:15 AM", at: "10:15" },
        { name: "Pani Grahan Sanskar (wedding ceremony)", time: "12:15 PM", at: "12:15" },
        { name: "Aashirwad Samaroh & Preetibhoj (blessings and dinner)", time: "From 7:00 PM", at: "19:00" },
      ],
    },
  ] satisfies EventDay[],

  gallery: {
    heading: "Our moments",
    sub: "A few pages from our album",
    items: [
      { id: "g1", caption: "A flower for her", src: "/gallery/01.jpg", thumb: "/gallery/01-thumb.jpg", alt: "Raj and Navdha: A flower for her", art: 1 },
      { id: "g2", caption: "Hand in hand", src: "/gallery/02.jpg", thumb: "/gallery/02-thumb.jpg", alt: "Raj and Navdha: Hand in hand", art: 2 },
      { id: "g3", caption: "A quiet afternoon", src: "/gallery/03.jpg", thumb: "/gallery/03-thumb.jpg", alt: "Raj and Navdha: A quiet afternoon", art: 3 },
      { id: "g4", caption: "Always you", src: "/gallery/04.jpg", thumb: "/gallery/04-thumb.jpg", alt: "Raj and Navdha: Always you", art: 4 },
      { id: "g5", caption: "Two hearts, one frame", src: "/gallery/05.jpg", thumb: "/gallery/05-thumb.jpg", alt: "Raj and Navdha: Two hearts, one frame", art: 1 },
      { id: "g6", caption: "Swept off my feet", src: "/gallery/06.jpg", thumb: "/gallery/06-thumb.jpg", alt: "Raj and Navdha: Swept off my feet", art: 2 },
      { id: "g7", caption: "Chasing laughter", src: "/gallery/07.jpg", thumb: "/gallery/07-thumb.jpg", alt: "Raj and Navdha: Chasing laughter", art: 3 },
      { id: "g8", caption: "Every step together", src: "/gallery/08.jpg", thumb: "/gallery/08-thumb.jpg", alt: "Raj and Navdha: Every step together", art: 4 },
      { id: "g9", caption: "Walking beside you", src: "/gallery/09.jpg", thumb: "/gallery/09-thumb.jpg", alt: "Raj and Navdha: Walking beside you", art: 1 },
      { id: "g10", caption: "Playful days", src: "/gallery/10.jpg", thumb: "/gallery/10-thumb.jpg", alt: "Raj and Navdha: Playful days", art: 2 },
      { id: "g11", caption: "Cheers to us", src: "/gallery/11.jpg", thumb: "/gallery/11-thumb.jpg", alt: "Raj and Navdha: Cheers to us", art: 3 },
      { id: "g12", caption: "Over a cup of chai", src: "/gallery/12.jpg", thumb: "/gallery/12-thumb.jpg", alt: "Raj and Navdha: Over a cup of chai", art: 4 },
      { id: "g13", caption: "Sweet moments", src: "/gallery/13.jpg", thumb: "/gallery/13-thumb.jpg", alt: "Raj and Navdha: Sweet moments", art: 1 },
      { id: "g14", caption: "Just the two of us", src: "/gallery/14.jpg", thumb: "/gallery/14-thumb.jpg", alt: "Raj and Navdha: Just the two of us", art: 2 },
      { id: "g15", caption: "Written in the stars", src: "/gallery/15.jpg", thumb: "/gallery/15-thumb.jpg", alt: "Raj and Navdha: Written in the stars", art: 3 },
    ] satisfies GalleryItem[],
    swipeHint: "Swipe to see more",
  },

  rsvp: {
    heading: "Will you come?",
    sub: "A seat at our table is already yours",
    nameLabel: "Your name",
    namePlaceholder: "Full name",
    attendLabel: "Will you be there?",
    yes: "Joyfully yes",
    no: "Regretfully no",
    guestsLabel: "Number of guests",
    messageLabel: "A message for us",
    messagePlaceholder: "Your blessings & wishes…",
    submit: "Send RSVP",
    sending: "Sending…",
    successYesTitle: "We can't wait to celebrate with you",
    successYesBody: "Your reply has reached us. See you soon!",
    successNoTitle: "You will be missed",
    successNoBody: "Thank you for letting us know. You will be in our hearts.",
    errorGeneric: "We couldn't send your reply. Please try again in a moment.",
    errorName: "Please tell us your name.",
    editAgain: "Change my reply",
  },

  countdown: {
    heading: "Counting down to",
    headingAccent: "Forever",
    units: { days: "Days", hours: "Hours", minutes: "Mins", seconds: "Secs" },
    tagline: ["Come early. Stay late.", "Bless us with your presence."],
    wishButton: "Release a wish lantern",
    wishPrompt: "Write a little wish",
    wishPlaceholder: "May your journey always be…",
    wishSend: "Release",
    wishClose: "Close",
    wishFallbacks: [
      "May the tea be hot and the laughter louder.",
      "May your journey always be unhurried.",
      "Wishing you a lifetime of golden evenings.",
      "May every morning begin with chai together.",
    ],
  },

  footer: {
    withLove: "With all our love",
    families: "& Our Families",
    madeWith: "Made with love for our people",
    tagline: "A little piece of forever",
  },

  music: {
    src: "/audio/invite.mp3",
    on: "Pause music",
    off: "Play music",
  },
};

export type Invite = typeof invite;
