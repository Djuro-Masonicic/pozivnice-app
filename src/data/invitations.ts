export type Category = "vjencanje" | "rodjendan" | "matura" | "korporativno";

export interface Invitation {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  previewImage?: string;
  demoHref?: string;
  palette: {
    bg: string;
    primary: string;
    secondary: string;
    text: string;
    border: string;
  };
  price: string;
  badges: string[];
  description: string;
  year: number;
}

export const invitations: Invitation[] = [
  {
    id: "sanja-marko-onboarding",
    title: "Sanja & Marko",
    subtitle: "Glass wedding story",
    category: "vjencanje",
    previewImage: "/previews/onboarding-card.svg",
    demoHref: "/onboarding",
    palette: {
      bg: "#fff8f2",
      primary: "#b07d4a",
      secondary: "#d4a866",
      text: "#4a2e1a",
      border: "rgba(176,125,74,0.45)",
    },
    price: "Po dogovoru",
    badges: ["Live demo", "Glass card"],
    description:
      "Romantic multi-slide wedding invitation with countdown, quote, location, QR code, and RSVP flow.",
    year: 2026,
  },
  {
    id: "anja-stefan-dance",
    title: "Anja & Stefan",
    subtitle: "Music invitation",
    category: "vjencanje",
    previewImage: "/dance/background.png",
    demoHref: "/DancePozivnica",
    palette: {
      bg: "#fdfaf5",
      primary: "#776242",
      secondary: "#9a8761",
      text: "#4e4031",
      border: "rgba(119,98,66,0.38)",
    },
    price: "Po dogovoru",
    badges: ["Live demo", "Music"],
    description:
      "Elegant floral invitation with background music, countdown, map link, and RSVP modal.",
    year: 2026,
  },
  {
    id: "aleksandra-milan",
    title: "Aleksandra & Milan",
    subtitle: "Timeline love story",
    category: "vjencanje",
    previewImage: "/aleksandra-milan/vjencanje.png",
    demoHref: "/AleksandraMilanPozivnica",
    palette: {
      bg: "#fdfaf5",
      primary: "#c49563",
      secondary: "#d9b47d",
      text: "#333333",
      border: "rgba(196,149,99,0.42)",
    },
    price: "Po dogovoru",
    badges: ["Live demo", "Photo story"],
    description:
      "Soft editorial wedding invitation built around milestone photos, animated calendar, and a refined map section.",
    year: 2026,
  },
  {
    id: "golubovi",
    title: "Katarina & Vukasin",
    subtitle: "Floral dove frame",
    category: "vjencanje",
    previewImage: "/golubovi/golubovi.jpg",
    demoHref: "/GoluboviPozivnica",
    palette: {
      bg: "#fbfbf9",
      primary: "#c49563",
      secondary: "#d8b98b",
      text: "#333333",
      border: "rgba(196,149,99,0.4)",
    },
    price: "Po dogovoru",
    badges: ["Live demo", "Classic"],
    description:
      "Classic floral wedding invitation with doves, gold accents, countdown, and polished map section.",
    year: 2026,
  },
  {
    id: "krstan-terzic",
    title: "Krstan",
    subtitle: "3. rodjendan",
    category: "rodjendan",
    previewImage: "/krstan-terzic/IMG_5224.jpeg",
    demoHref: "/KrstanTerzicPozivnica",
    palette: {
      bg: "#f6fbff",
      primary: "#6f8fa6",
      secondary: "#ff9aa2",
      text: "#263847",
      border: "rgba(111,143,166,0.4)",
    },
    price: "Po dogovoru",
    badges: ["Live demo", "Kids"],
    description:
      "Playful birthday invitation with floating balloons, soft illustration art, and a live countdown.",
    year: 2026,
  },
];

export const categoryLabels: Record<Category, string> = {
  vjencanje: "Vjencanja",
  rodjendan: "Rodjendani",
  matura: "Mature",
  korporativno: "Korporativno",
};
