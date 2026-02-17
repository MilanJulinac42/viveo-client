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
  VideoRequest,
  EarningsSummary,
  AvailabilitySlot,
  FanOrder,
} from "./types";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_LINKS: NavLink[] = [
  { label: "Zvezde", href: "/zvezde" },
  { label: "Postani zvezda", href: "/postani-zvezda" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
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
    extendedBio:
      "Marko Nikolić je jedan od najcenjenijih srpskih glumaca svoje generacije. Sa preko 20 godina iskustva na pozorišnim daskama i filmskom platnu, osvojio je brojne nagrade uključujući Sterijinu nagradu i nagradu za najboljeg glumca na FEST-u. Poznat je po ulogama u dramama i komedijama, a publika ga voli zbog autentičnosti i topline koju unosi u svaki lik. Van glume, Marko je posvećen mentorstvu mladih glumaca i redovno drži radionice na Fakultetu dramskih umetnosti.",
    tags: ["Glumac", "Pozorište", "Film", "Nagrađivani", "Mentor"],
    videoTypes: [
      { id: "vt-1-1", title: "Rođendanska čestitka", occasion: "Rođendan", emoji: "🎂", accentFrom: "from-pink-500", accentTo: "to-rose-600", message: "Srećan rođendan! Neka ti se svi snovi ostvare..." },
      { id: "vt-1-2", title: "Motivaciona poruka", occasion: "Motivacija", emoji: "💪", accentFrom: "from-blue-500", accentTo: "to-cyan-600", message: "Veruj u sebe, sve je moguće ako radiš na tome..." },
      { id: "vt-1-3", title: "Čestitka za praznik", occasion: "Praznici", emoji: "🎄", accentFrom: "from-emerald-500", accentTo: "to-teal-600", message: "Srećni praznici! Neka vam dom bude pun radosti..." },
    ],
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
    extendedBio:
      "Jelena Petrović je jedna od najpopularnijih pop pevačica u Srbiji. Njen debi album je dostigao platinasti tiraž, a singlovi redovno zauzimaju prva mesta na top listama. Sa preko 5 miliona pregleda na YouTube-u i rasprodatim koncertima širom regiona, Jelena je postala ikona moderne srpske muzičke scene. Pored muzike, aktivna je u humanitarnom radu i ambasadorka je UNICEF-a za Srbiju.",
    tags: ["Pevačica", "Pop muzika", "YouTube", "Humanitarni rad", "Koncerti"],
    videoTypes: [
      { id: "vt-2-1", title: "Muzička čestitka", occasion: "Čestitka", emoji: "🎶", accentFrom: "from-violet-500", accentTo: "to-purple-600", message: "Posebna pesma samo za tebe, od srca..." },
      { id: "vt-2-2", title: "Rođendanska poruka", occasion: "Rođendan", emoji: "🎂", accentFrom: "from-pink-500", accentTo: "to-rose-600", message: "Srećan rođendan! Uživaj u svom danu..." },
      { id: "vt-2-3", title: "Poruka za godišnjicu", occasion: "Godišnjica", emoji: "💕", accentFrom: "from-red-500", accentTo: "to-pink-600", message: "Čestitam vam godišnjicu! Ljubav je najlepša..." },
    ],
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
    extendedBio:
      "Stefan Jovanović je ponos srpskog fudbala. Kao kapiten reprezentacije, predvodio je tim do istorijskog uspeha na evropskom prvenstvu. Trenutno igra za jedan od najelitnijih klubova u Evropi gde je omiljen među navijačima. Stefan je poznat po sportskom duhu, profesionalizmu i posvećenosti mladim sportistima. Osnivač je fondacije koja finansira sportske akademije za decu iz manjih sredina.",
    tags: ["Fudbaler", "Reprezentativac", "Kapiten", "Fondacija", "Sportski duh"],
    videoTypes: [
      { id: "vt-3-1", title: "Motivacija za sportiste", occasion: "Motivacija", emoji: "⚽", accentFrom: "from-green-500", accentTo: "to-emerald-600", message: "Treniraj jako, igraj pametno, nikad ne odustaj..." },
      { id: "vt-3-2", title: "Rođendanska čestitka", occasion: "Rođendan", emoji: "🎉", accentFrom: "from-amber-500", accentTo: "to-orange-600", message: "Srećan rođendan, šampione! Neka ti godina bude..." },
      { id: "vt-3-3", title: "Poruka ohrabrenja", occasion: "Ohrabrenje", emoji: "🏆", accentFrom: "from-sky-500", accentTo: "to-blue-600", message: "Svaki pad je prilika da ustaneš jači..." },
    ],
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
    extendedBio:
      "Ana Đorđević je digitalna kreatorka sadržaja koja je osvojila srca publike autentičnošću i kreativnošću. Sa preko milion pratilaca na Instagramu i pola miliona na TikToku, Ana deli savete o modi, lepoti i životnom stilu. Sarađuje sa vodećim svetskim brendovima, a njen podcast o ženskom preduzetništvu je među top 10 u Srbiji. Ana veruje da je pozitivna energija zarazna i to unosi u svaku poruku.",
    tags: ["Influenserka", "Instagram", "Moda", "Lifestyle", "Podcast"],
    videoTypes: [
      { id: "vt-4-1", title: "Personalizovani pozdrav", occasion: "Pozdrav", emoji: "👋", accentFrom: "from-fuchsia-500", accentTo: "to-pink-600", message: "Hej! Evo jednog posebnog pozdrava za tebe..." },
      { id: "vt-4-2", title: "Saveti za stil", occasion: "Savet", emoji: "✨", accentFrom: "from-violet-500", accentTo: "to-indigo-600", message: "Imam specijalne savete za tvoj stil..." },
      { id: "vt-4-3", title: "Rođendanska poruka", occasion: "Rođendan", emoji: "🎂", accentFrom: "from-rose-500", accentTo: "to-pink-600", message: "Srećan rođendan, prelepa! Uživaj maksimalno..." },
    ],
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
    extendedBio:
      "Nikola Stanković je kralj srpskog stand-up humora. Njegov specijal na YouTube-u ima preko 10 miliona pregleda, a turneja mu je rasprodata mesecima unapred. Poznat po oštroj satiri i toplinskim zapažanjima o svakodnevnom životu u Srbiji, Nikola je omiljen gost na svim televizijama. Pored stand-upa, piše scenario za popularnu TV seriju i vodi humor podcast koji ima verne slušaoce.",
    tags: ["Komičar", "Stand-up", "TV", "Podcast", "Scenarista"],
    videoTypes: [
      { id: "vt-5-1", title: "Šaljiva čestitka", occasion: "Humor", emoji: "😂", accentFrom: "from-yellow-500", accentTo: "to-amber-600", message: "Spremi se za smeh! Imam nešto posebno za tebe..." },
      { id: "vt-5-2", title: "Roast poruka", occasion: "Roast", emoji: "🔥", accentFrom: "from-orange-500", accentTo: "to-red-600", message: "Drži se, ovo će te nasmejati do suza..." },
      { id: "vt-5-3", title: "Poruka za ekipu", occasion: "Ekipa", emoji: "🍻", accentFrom: "from-lime-500", accentTo: "to-green-600", message: "Za tvoju ekipu imam jednu dobru priču..." },
    ],
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
    extendedBio:
      "Milica Todorović je lice jutarnjeg programa koji svakodnevno prate milioni gledalaca. Sa 15 godina iskustva na televiziji, Milica je poznata po profesionalizmu, toplini i sposobnosti da svakog gosta učini opuštenim. Dobitnica je nagrade za najbolju voditeljku tri godine zaredom. Van kamera, Milica je strastvena o zdravom životu i redovno deli recepte i fitness savete na društvenim mrežama.",
    tags: ["Voditeljka", "TV", "Jutarnji program", "Nagrađivana", "Zdravi život"],
    videoTypes: [
      { id: "vt-6-1", title: "Jutarnji pozdrav", occasion: "Pozdrav", emoji: "☀️", accentFrom: "from-amber-500", accentTo: "to-yellow-600", message: "Dobro jutro! Imam jednu posebnu poruku za tebe..." },
      { id: "vt-6-2", title: "Čestitka za penziju", occasion: "Penzija", emoji: "🥂", accentFrom: "from-teal-500", accentTo: "to-cyan-600", message: "Čestitam na zasluženom odmoru! Uživaj..." },
      { id: "vt-6-3", title: "Rođendanska poruka", occasion: "Rođendan", emoji: "🎂", accentFrom: "from-pink-500", accentTo: "to-rose-600", message: "Srećan rođendan! Neka ti dan bude prelep..." },
    ],
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
    extendedBio:
      "Đorđe Milošević, poznatiji pod umetničkim imenom, je lider nove generacije srpskog hip-hop-a. Njegova muzika spaja trap zvuk sa autentičnim balkanskim elementima, stvarajući jedinstveni stil koji rezonira sa mladom publikom. Tri uzastopna albuma su dostigla platinasti tiraž, a njegova turneja po regionu je bila najposećeniji muzički događaj prošle godine. Đorđe je aktivan i na TikToku gde ima preko 2 miliona pratilaca.",
    tags: ["Reper", "Hip-hop", "TikTok", "Platinum", "Turneja"],
    videoTypes: [
      { id: "vt-7-1", title: "Freestyle pozdrav", occasion: "Pozdrav", emoji: "🎤", accentFrom: "from-purple-500", accentTo: "to-violet-600", message: "Imam jednu rimu samo za tebe, slušaj..." },
      { id: "vt-7-2", title: "Rođendanski rep", occasion: "Rođendan", emoji: "🎂", accentFrom: "from-indigo-500", accentTo: "to-blue-600", message: "Srećan rođendan, brate! Evo jedna za tebe..." },
      { id: "vt-7-3", title: "Motivaciona poruka", occasion: "Motivacija", emoji: "💯", accentFrom: "from-slate-600", accentTo: "to-zinc-700", message: "Uvek napred, nikad nazad. Ti to možeš..." },
    ],
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
    extendedBio:
      "Ivana Ilić je jedna od najtalentovanijih mladih glumica u Srbiji. Njenu glavnu ulogu u hit seriji prate milioni gledalaca svake nedelje. Diplomirala je na Fakultetu dramskih umetnosti u Beogradu sa najvišim ocenama, a pre televizije je nastupala u Jugoslovenskom dramskom pozorištu. Ivana je poznata po emotivnoj dubini koju donosi svakom liku i sposobnosti da publiku nasmeje i rasplače u istoj sceni.",
    tags: ["Glumica", "Serije", "FDU", "Pozorište", "Mlada nada"],
    videoTypes: [
      { id: "vt-8-1", title: "Dramatična čestitka", occasion: "Čestitka", emoji: "🎭", accentFrom: "from-rose-500", accentTo: "to-red-600", message: "Imam jednu posebnu poruku za tebe, slušaj pažljivo..." },
      { id: "vt-8-2", title: "Rođendanska poruka", occasion: "Rođendan", emoji: "🎂", accentFrom: "from-pink-500", accentTo: "to-fuchsia-600", message: "Srećan rođendan! Neka ti nova godina bude..." },
      { id: "vt-8-3", title: "Fan poruka", occasion: "Fan poruka", emoji: "💜", accentFrom: "from-violet-500", accentTo: "to-purple-600", message: "Hvala što me pratiš! Evo nešto samo za tebe..." },
    ],
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

// ---------------------------------------------------------------------------
// Dashboard Mock Data
// ---------------------------------------------------------------------------

/** Serbian day names for calendar */
export const SERBIAN_DAYS = [
  "Ponedeljak",
  "Utorak",
  "Sreda",
  "Četvrtak",
  "Petak",
  "Subota",
  "Nedelja",
];

/** Status labels in Serbian */
export const STATUS_LABELS: Record<string, string> = {
  pending: "Na čekanju",
  approved: "Prihvaćen",
  completed: "Završen",
  rejected: "Odbijen",
};

export const MOCK_REQUESTS: VideoRequest[] = [
  {
    id: "req-1",
    buyerName: "Petar Marković",
    buyerAvatar: "",
    videoType: "Rođendanska čestitka",
    occasion: "Rođendan",
    instructions: "Molim vas snimite čestitku za moju mamu Milicu koja puni 60 godina. Voli vaše filmove, posebno komedije. Bilo bi lepo da pomene njen nadimak 'Mica'.",
    recipientName: "Milica Marković",
    price: 3500,
    status: "pending",
    createdAt: "2025-02-10T14:30:00Z",
    deadline: "2025-02-17T14:30:00Z",
  },
  {
    id: "req-2",
    buyerName: "Maja Pavlović",
    buyerAvatar: "",
    videoType: "Motivaciona poruka",
    occasion: "Motivacija",
    instructions: "Poruka za mog brata koji se priprema za prijemni ispit na fakultetu. Zove se Lazar i veliki je fan. Malo ohrabrenja bi mu značilo!",
    recipientName: "Lazar Pavlović",
    price: 3500,
    status: "pending",
    createdAt: "2025-02-11T09:15:00Z",
    deadline: "2025-02-18T09:15:00Z",
  },
  {
    id: "req-3",
    buyerName: "Nemanja Ristić",
    buyerAvatar: "",
    videoType: "Čestitka za praznik",
    occasion: "Praznici",
    instructions: "Čestitka za slavu Svetog Nikolu, za celu porodicu Ristić. Pomeni da smo veliki fanovi!",
    recipientName: "Porodica Ristić",
    price: 3500,
    status: "pending",
    createdAt: "2025-02-12T16:45:00Z",
    deadline: "2025-02-19T16:45:00Z",
  },
  {
    id: "req-4",
    buyerName: "Tamara Đukić",
    buyerAvatar: "",
    videoType: "Rođendanska čestitka",
    occasion: "Rođendan",
    instructions: "Za mog dečka Stefana, puni 30 godina. Fan je vaših uloga u pozorištu. Pomeni da je vreme da odraste! 😄",
    recipientName: "Stefan Đukić",
    price: 3500,
    status: "approved",
    createdAt: "2025-02-08T11:00:00Z",
    deadline: "2025-02-15T11:00:00Z",
  },
  {
    id: "req-5",
    buyerName: "Aleksa Nikolić",
    buyerAvatar: "",
    videoType: "Motivaciona poruka",
    occasion: "Motivacija",
    instructions: "Za kolegu koji menja posao posle 10 godina. Zove se Dragan, malo hrabrosti mu treba za novi početak.",
    recipientName: "Dragan Simić",
    price: 3500,
    status: "approved",
    createdAt: "2025-02-09T08:20:00Z",
    deadline: "2025-02-16T08:20:00Z",
  },
  {
    id: "req-6",
    buyerName: "Jelena Stojanović",
    buyerAvatar: "",
    videoType: "Rođendanska čestitka",
    occasion: "Rođendan",
    instructions: "Za moju ćerku Anu koja puni 18 godina! Veliki je fan vaš. Pomeni da je konačno punoletna!",
    recipientName: "Ana Stojanović",
    price: 3500,
    status: "completed",
    createdAt: "2025-01-28T10:00:00Z",
    deadline: "2025-02-04T10:00:00Z",
  },
  {
    id: "req-7",
    buyerName: "Miloš Janković",
    buyerAvatar: "",
    videoType: "Čestitka za praznik",
    occasion: "Praznici",
    instructions: "Novogodišnja čestitka za celu kancelariju, firma 'Digital Solutions'. Neka bude zabavno!",
    recipientName: "Tim Digital Solutions",
    price: 3500,
    status: "completed",
    createdAt: "2025-01-25T15:30:00Z",
    deadline: "2025-02-01T15:30:00Z",
  },
  {
    id: "req-8",
    buyerName: "Sara Popović",
    buyerAvatar: "",
    videoType: "Motivaciona poruka",
    occasion: "Motivacija",
    instructions: "Za prijateljicu koja se oporavlja od operacije. Zove se Ivana i vaše uloge su joj pomagale da ostane pozitivna.",
    recipientName: "Ivana Đorđević",
    price: 3500,
    status: "completed",
    createdAt: "2025-01-20T12:00:00Z",
    deadline: "2025-01-27T12:00:00Z",
  },
  {
    id: "req-9",
    buyerName: "Darko Vasić",
    buyerAvatar: "",
    videoType: "Rođendanska čestitka",
    occasion: "Rođendan",
    instructions: "Za sina koji puni 10 godina, voli glumce i želi da bude glumac kad poraste. Pomeni mu da veruje u snove!",
    recipientName: "Filip Vasić",
    price: 3500,
    status: "completed",
    createdAt: "2025-01-15T09:00:00Z",
    deadline: "2025-01-22T09:00:00Z",
  },
  {
    id: "req-10",
    buyerName: "Zorana Milić",
    buyerAvatar: "",
    videoType: "Motivaciona poruka",
    occasion: "Motivacija",
    instructions: "Poruka za mene lično — trebam motivaciju za maraton koji trčim za mesec dana.",
    recipientName: "Zorana Milić",
    price: 3500,
    status: "rejected",
    createdAt: "2025-02-05T18:00:00Z",
    deadline: "2025-02-12T18:00:00Z",
  },
];

export const MOCK_EARNINGS: EarningsSummary = {
  totalEarnings: 245000,
  completedRequests: 47,
  pendingRequests: 3,
  averageRating: 4.9,
  weeklyEarnings: [
    { day: "Pon", amount: 7000 },
    { day: "Uto", amount: 10500 },
    { day: "Sre", amount: 3500 },
    { day: "Čet", amount: 14000 },
    { day: "Pet", amount: 7000 },
    { day: "Sub", amount: 21000 },
    { day: "Ned", amount: 10500 },
  ],
  monthlyEarnings: [
    { month: "Sep", amount: 28000 },
    { month: "Okt", amount: 35000 },
    { month: "Nov", amount: 42000 },
    { month: "Dec", amount: 56000 },
    { month: "Jan", amount: 49000 },
    { month: "Feb", amount: 35000 },
  ],
  earningsByType: [
    { type: "Rođendanska čestitka", amount: 98000, count: 28 },
    { type: "Motivaciona poruka", amount: 77000, count: 22 },
    { type: "Čestitka za praznik", amount: 70000, count: 20 },
  ],
};

export const MOCK_AVAILABILITY: AvailabilitySlot[] = [
  { id: "avail-1", dayOfWeek: 0, available: true, maxRequests: 5 },
  { id: "avail-2", dayOfWeek: 1, available: true, maxRequests: 5 },
  { id: "avail-3", dayOfWeek: 2, available: true, maxRequests: 3 },
  { id: "avail-4", dayOfWeek: 3, available: true, maxRequests: 5 },
  { id: "avail-5", dayOfWeek: 4, available: true, maxRequests: 5 },
  { id: "avail-6", dayOfWeek: 5, available: false, maxRequests: 0 },
  { id: "avail-7", dayOfWeek: 6, available: false, maxRequests: 0 },
];

// ---------------------------------------------------------------------------
// Fan Dashboard Mock Data
// ---------------------------------------------------------------------------

export const MOCK_FAN_ORDERS: FanOrder[] = [
  {
    id: "fan-order-1",
    celebrityName: "Marko Nikolić",
    celebritySlug: "marko-nikolic",
    celebrityImage: "",
    videoType: "Rođendanska čestitka",
    occasion: "Rođendan",
    instructions: "Molim vas snimite čestitku za moju mamu Milicu koja puni 60 godina. Voli vaše filmove, posebno komedije.",
    recipientName: "Milica Marković",
    price: 3500,
    status: "completed",
    createdAt: "2025-01-20T10:00:00Z",
    deadline: "2025-01-27T10:00:00Z",
  },
  {
    id: "fan-order-2",
    celebrityName: "Jelena Petrović",
    celebritySlug: "jelena-petrovic",
    celebrityImage: "",
    videoType: "Motivaciona poruka",
    occasion: "Motivacija",
    instructions: "Poruka za moju sestru koja se priprema za maraton. Zove se Tamara i veliki je fan.",
    recipientName: "Tamara Pavlović",
    price: 4000,
    status: "completed",
    createdAt: "2025-01-25T14:30:00Z",
    deadline: "2025-02-01T14:30:00Z",
  },
  {
    id: "fan-order-3",
    celebrityName: "Stefan Jovanović",
    celebritySlug: "stefan-jovanovic",
    celebrityImage: "",
    videoType: "Čestitka za praznik",
    occasion: "Praznici",
    instructions: "Čestitka za slavu Svetog Nikolu za celu porodicu. Pomeni da smo veliki fanovi!",
    recipientName: "Porodica Đukić",
    price: 2500,
    status: "pending",
    createdAt: "2025-02-10T09:00:00Z",
    deadline: "2025-02-17T09:00:00Z",
  },
  {
    id: "fan-order-4",
    celebrityName: "Ana Đorđević",
    celebritySlug: "ana-djordjevic",
    celebrityImage: "",
    videoType: "Rođendanska čestitka",
    occasion: "Rođendan",
    instructions: "Za mog dečka Stefana koji puni 30 godina. Veliki je fan vaše muzike, posebno pesme 'Grad'.",
    recipientName: "Stefan Milić",
    price: 5000,
    status: "pending",
    createdAt: "2025-02-11T16:00:00Z",
    deadline: "2025-02-18T16:00:00Z",
  },
  {
    id: "fan-order-5",
    celebrityName: "Nikola Stanković",
    celebritySlug: "nikola-stankovic",
    celebrityImage: "",
    videoType: "Motivaciona poruka",
    occasion: "Motivacija",
    instructions: "Poruka za mog sina koji trenira fudbal i sanja da postane profesionalac. Zove se Lazar, ima 12 godina.",
    recipientName: "Lazar Ristić",
    price: 3000,
    status: "approved",
    createdAt: "2025-02-08T11:00:00Z",
    deadline: "2025-02-15T11:00:00Z",
  },
  {
    id: "fan-order-6",
    celebrityName: "Milica Todorović",
    celebritySlug: "milica-todorovic",
    celebrityImage: "",
    videoType: "Čestitka za praznik",
    occasion: "Praznici",
    instructions: "Novogodišnja čestitka za kolege iz kancelarije. Firma se zove 'Tech Solutions'. Neka bude veselo!",
    recipientName: "Tim Tech Solutions",
    price: 4500,
    status: "approved",
    createdAt: "2025-02-09T08:30:00Z",
    deadline: "2025-02-16T08:30:00Z",
  },
  {
    id: "fan-order-7",
    celebrityName: "Ivana Ilić",
    celebritySlug: "ivana-ilic",
    celebrityImage: "",
    videoType: "Motivaciona poruka",
    occasion: "Motivacija",
    instructions: "Za prijateljicu koja menja posao posle 10 godina. Zove se Dragana. Malo hrabrosti za novi početak!",
    recipientName: "Dragana Vasić",
    price: 3500,
    status: "completed",
    createdAt: "2025-01-15T12:00:00Z",
    deadline: "2025-01-22T12:00:00Z",
  },
  {
    id: "fan-order-8",
    celebrityName: "Đorđe Milošević",
    celebritySlug: "djordje-milosevic",
    celebrityImage: "",
    videoType: "Rođendanska čestitka",
    occasion: "Rođendan",
    instructions: "Za mene lično — punim 25 godina i želim čestitku od svog omiljenog voditelja!",
    recipientName: "Petar Nikolić",
    price: 3000,
    status: "rejected",
    createdAt: "2025-02-05T18:00:00Z",
    deadline: "2025-02-12T18:00:00Z",
  },
];
