/**
 * @fileoverview Constants and mock data for the Viveo client application.
 * Contains navigation links, mock celebrities, categories, and testimonials.
 * Replace with real API data when backend is integrated.
 */

import type {
  Celebrity,
  Category,
  Testimonial,
  NavLink,
  HowItWorksStep,
  HeroStat,
  FomoNotification,
  FAQItem,
  VideoShowcaseItem,
  PressLogo,
} from "./types";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_LINKS: NavLink[] = [
  { label: "Kako funkcioniše", href: "#kako-funkcionise" },
  { label: "Zvezde", href: "#zvezde" },
  { label: "Kategorije", href: "#kategorije" },
  { label: "Utisci", href: "#utisci" },
];

// ---------------------------------------------------------------------------
// Hero section
// ---------------------------------------------------------------------------

export const HERO_STATS: HeroStat[] = [
  { value: "500+", label: "Zvezda", numericValue: 500, suffix: "+" },
  { value: "10.000+", label: "Video poruka", numericValue: 10000, suffix: "+" },
  { value: "4.9", label: "Prosečna ocena", numericValue: 4.9, decimals: 1 },
];

// ---------------------------------------------------------------------------
// How It Works
// ---------------------------------------------------------------------------

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: 1,
    icon: "🔍",
    title: "Pronađi zvezdu",
    description:
      "Pretraži naš katalog poznatih ličnosti iz Srbije. Glumci, muzičari, sportisti — izaberi svog favorita.",
  },
  {
    step: 2,
    icon: "✍️",
    title: "Opiši svoju želju",
    description:
      "Napiši za koga je poruka i šta želiš da zvezda kaže. Rođendan, motivacija, čestitka — sve je moguće.",
  },
  {
    step: 3,
    icon: "🎬",
    title: "Primi video",
    description:
      "Zvezda snima personalizovanu video poruku samo za tebe. Primi je u roku od 7 dana i iznenadi voljenu osobu.",
  },
];

// ---------------------------------------------------------------------------
// Mock Categories
// ---------------------------------------------------------------------------

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Glumci",
    slug: "glumci",
    icon: "🎭",
    celebrityCount: 85,
  },
  {
    id: "cat-2",
    name: "Muzičari",
    slug: "muzicari",
    icon: "🎵",
    celebrityCount: 120,
  },
  {
    id: "cat-3",
    name: "Sportisti",
    slug: "sportisti",
    icon: "⚽",
    celebrityCount: 95,
  },
  {
    id: "cat-4",
    name: "Influenseri",
    slug: "influenseri",
    icon: "📱",
    celebrityCount: 150,
  },
  {
    id: "cat-5",
    name: "Komičari",
    slug: "komicar",
    icon: "😂",
    celebrityCount: 45,
  },
  {
    id: "cat-6",
    name: "TV Voditelji",
    slug: "tv-voditelji",
    icon: "📺",
    celebrityCount: 60,
  },
];

// ---------------------------------------------------------------------------
// Mock Celebrities
// ---------------------------------------------------------------------------

export const MOCK_CELEBRITIES: Celebrity[] = [
  {
    id: "cel-1",
    name: "Marko Nikolić",
    slug: "marko-nikolic",
    image: "",
    category: "Glumci",
    price: 3500,
    rating: 4.9,
    reviewCount: 234,
    verified: true,
    bio: "Poznati srpski glumac sa više od 20 godina iskustva u pozorištu i na filmu.",
    responseTime: 24,
  },
  {
    id: "cel-2",
    name: "Jelena Petrović",
    slug: "jelena-petrovic",
    image: "",
    category: "Muzičari",
    price: 5000,
    rating: 4.8,
    reviewCount: 189,
    verified: true,
    bio: "Pop zvezda sa brojem 1 hitovima i milionskim pregledima na YouTube-u.",
    responseTime: 48,
  },
  {
    id: "cel-3",
    name: "Stefan Jovanović",
    slug: "stefan-jovanovic",
    image: "",
    category: "Sportisti",
    price: 4000,
    rating: 5.0,
    reviewCount: 312,
    verified: true,
    bio: "Reprezentativac Srbije u fudbalu, igrač jednog od najjačih evropskih klubova.",
    responseTime: 72,
  },
  {
    id: "cel-4",
    name: "Ana Đorđević",
    slug: "ana-djordjevic",
    image: "",
    category: "Influenseri",
    price: 2000,
    rating: 4.7,
    reviewCount: 567,
    verified: true,
    bio: "Najpraćenija srpska influenserka sa preko milion pratilaca na Instagramu.",
    responseTime: 12,
  },
  {
    id: "cel-5",
    name: "Nikola Stanković",
    slug: "nikola-stankovic",
    image: "",
    category: "Komičari",
    price: 2500,
    rating: 4.9,
    reviewCount: 421,
    verified: true,
    bio: "Stand-up komičar poznat po hit emisiji i rasprodatim nastupima širom Srbije.",
    responseTime: 24,
  },
  {
    id: "cel-6",
    name: "Milica Todorović",
    slug: "milica-todorovic",
    image: "",
    category: "TV Voditelji",
    price: 3000,
    rating: 4.6,
    reviewCount: 145,
    verified: true,
    bio: "Voditeljka najgledanije jutarnje emisije u Srbiji sa 15 godina na TV-u.",
    responseTime: 48,
  },
  {
    id: "cel-7",
    name: "Đorđe Milošević",
    slug: "djordje-milosevic",
    image: "",
    category: "Muzičari",
    price: 4500,
    rating: 4.8,
    reviewCount: 278,
    verified: true,
    bio: "Reper nove generacije sa platinum albumima i hitovima koji ruše rekorde.",
    responseTime: 36,
  },
  {
    id: "cel-8",
    name: "Ivana Ilić",
    slug: "ivana-ilic",
    image: "",
    category: "Glumci",
    price: 3000,
    rating: 4.7,
    reviewCount: 198,
    verified: false,
    bio: "Mlada glumica poznata po ulozi u najgledanijoj domaćoj seriji sezone.",
    responseTime: 24,
  },
];

// ---------------------------------------------------------------------------
// Mock Testimonials
// ---------------------------------------------------------------------------

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Petar Marković",
    avatar: "",
    rating: 5,
    text: "Naručio sam video poruku za maminu 60. rođendan od njenog omiljenog glumca. Plakala je od sreće! Najbolji poklon koji sam ikada dao.",
    celebrityName: "Marko Nikolić",
    date: "2025-01-15",
  },
  {
    id: "test-2",
    author: "Maja Pavlović",
    avatar: "",
    rating: 5,
    text: "Iznenadila sam dečka za godišnjicu video porukom od njegovog omiljenog fudbalera. Bio je u šoku! Ceo proces je bio brz i jednostavan.",
    celebrityName: "Stefan Jovanović",
    date: "2025-02-03",
  },
  {
    id: "test-3",
    author: "Nemanja Ristić",
    avatar: "",
    rating: 4,
    text: "Video poruka za kolegu koji odlazi u penziju. Svi u kancelariji su se smejali do suza. Fantastičan poklon za svaku priliku!",
    celebrityName: "Nikola Stanković",
    date: "2025-01-28",
  },
  {
    id: "test-4",
    author: "Tamara Đukić",
    avatar: "",
    rating: 5,
    text: "Moja ćerka je dobila poruku od omiljene influenserke za rođendan. Nije mogla da veruje! Definitivno ću ponovo koristiti Viveo.",
    celebrityName: "Ana Đorđević",
    date: "2025-02-10",
  },
];

// ---------------------------------------------------------------------------
// Trending Categories (Faza 1)
// ---------------------------------------------------------------------------

/** Category slugs that show a "Trending" badge */
export const TRENDING_CATEGORIES: string[] = ["muzicari", "influenseri"];

// ---------------------------------------------------------------------------
// FOMO Notifications (Faza 4)
// ---------------------------------------------------------------------------

export const FOMO_NOTIFICATIONS: FomoNotification[] = [
  { id: "fomo-1", buyer: "Ana", celebrityName: "Marko Nikolić", timeAgo: "pre 2 min", emoji: "🎉" },
  { id: "fomo-2", buyer: "Stefan", celebrityName: "Jelena Petrović", timeAgo: "pre 5 min", emoji: "🎵" },
  { id: "fomo-3", buyer: "Milica", celebrityName: "Nikola Stanković", timeAgo: "pre 8 min", emoji: "😂" },
  { id: "fomo-4", buyer: "Nikola", celebrityName: "Ana Đorđević", timeAgo: "pre 12 min", emoji: "📱" },
  { id: "fomo-5", buyer: "Jelena", celebrityName: "Stefan Jovanović", timeAgo: "pre 15 min", emoji: "⚽" },
  { id: "fomo-6", buyer: "Marko", celebrityName: "Milica Todorović", timeAgo: "pre 3 min", emoji: "📺" },
];

// ---------------------------------------------------------------------------
// Social Proof Stats (Faza 5)
// ---------------------------------------------------------------------------

export const SOCIAL_PROOF_STATS: string[] = [
  "234 video poruke danas",
  "98% zadovoljnih korisnika",
  "500+ zvezda na platformi",
  "Prosečno vreme odgovora: 24h",
  "4.9 prosečna ocena",
  "10.000+ isporučenih poruka",
];

// ---------------------------------------------------------------------------
// FAQ Items (Faza 7b)
// ---------------------------------------------------------------------------

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Kako funkcioniše naručivanje video poruke?",
    answer:
      "Izaberite zvezdu, opišite za koga je poruka i šta želite da kaže, i platite online. Zvezda snima personalizovanu video poruku i šalje vam je u roku od 7 dana.",
  },
  {
    id: "faq-2",
    question: "Koliko košta video poruka?",
    answer:
      "Cene se razlikuju u zavisnosti od zvezde — kreću se od 1.500 RSD do 10.000 RSD. Svaka zvezda samostalno određuje svoju cenu.",
  },
  {
    id: "faq-3",
    question: "Šta ako zvezda ne snimi video na vreme?",
    answer:
      "Ako zvezda ne isporuči video u roku od 7 dana, dobijate potpuni povraćaj novca. Garancija isporuke je naš prioritet.",
  },
  {
    id: "faq-4",
    question: "Mogu li da naručim video za poslovnu priliku?",
    answer:
      "Apsolutno! Mnoge kompanije koriste Viveo za motivacione poruke zaposlenima, čestitke klijentima ili promocije. Kontaktirajte nas za posebne poslovne pakete.",
  },
  {
    id: "faq-5",
    question: "Da li mogu da postanem zvezda na platformi?",
    answer:
      "Naravno! Ako imate javno prisustvo i fanove koji bi voleli da čuju od vas, prijavite se putem dugmeta 'Postani zvezda'. Naš tim će pregledati vašu prijavu.",
  },
  {
    id: "faq-6",
    question: "Koji načini plaćanja su dostupni?",
    answer:
      "Prihvatamo sve glavne platne kartice (Visa, Mastercard), kao i plaćanje putem mobilnih aplikacija. Sva plaćanja su sigurna i enkriptovana.",
  },
];

// ---------------------------------------------------------------------------
// Video Showcase Items (Faza 7a)
// ---------------------------------------------------------------------------

export const VIDEO_SHOWCASE_ITEMS: VideoShowcaseItem[] = [
  {
    id: "showcase-1",
    title: "Rođendanska čestitka",
    occasion: "Rođendan",
    emoji: "🎂",
    celebrityName: "Marko Nikolić",
    category: "Glumac",
    accentFrom: "from-pink-500",
    accentTo: "to-rose-600",
    message: "Srećan rođendan! Želim ti sve najbolje...",
  },
  {
    id: "showcase-2",
    title: "Motivaciona poruka",
    occasion: "Motivacija",
    emoji: "💪",
    celebrityName: "Stefan Jovanović",
    category: "Sportista",
    accentFrom: "from-blue-500",
    accentTo: "to-cyan-600",
    message: "Veruj u sebe, možeš ti to! Nikad ne odustaj...",
  },
  {
    id: "showcase-3",
    title: "Čestitka za godišnjicu",
    occasion: "Godišnjica",
    emoji: "🎉",
    celebrityName: "Jelena Petrović",
    category: "Muzičarka",
    accentFrom: "from-amber-500",
    accentTo: "to-orange-600",
    message: "Čestitam vam godišnjicu! Ljubav je najlepša...",
  },
];

// ---------------------------------------------------------------------------
// Press Logos (Faza 7c)
// ---------------------------------------------------------------------------

export const PRESS_LOGOS: PressLogo[] = [
  { id: "press-1", name: "Blic" },
  { id: "press-2", name: "Kurir" },
  { id: "press-3", name: "Telegraf" },
  { id: "press-4", name: "RTS" },
  { id: "press-5", name: "Nova.rs" },
  { id: "press-6", name: "N1" },
];
