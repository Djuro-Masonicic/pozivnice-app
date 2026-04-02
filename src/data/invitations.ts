export type Category = "vjencanje" | "rodjendan" | "matura" | "korporativno";

export interface Invitation {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
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
    id: "zlatna-elegancija",
    title: "Zlatna Elegancija",
    subtitle: "Sofija & Nikola",
    category: "vjencanje",
    palette: {
      bg: "#fdfaf5",
      primary: "#b8973a",
      secondary: "#d4b86a",
      text: "#2c2013",
      border: "rgba(184,151,58,0.6)",
    },
    price: "Od 15 €",
    badges: ["Bestseller", "Romantično"],
    description:
      "Klasičan zlatni dizajn sa elegantnim ornamentima i kaligrafskim pismom, idealan za svečana vjenčanja.",
    year: 2025,
  },
  {
    id: "bijela-ruza",
    title: "Bijela Ruža",
    subtitle: "Amira & Stefan",
    category: "vjencanje",
    palette: {
      bg: "#fff8f8",
      primary: "#c4758a",
      secondary: "#e8a0b0",
      text: "#3a1a22",
      border: "rgba(196,117,138,0.55)",
    },
    price: "Od 15 €",
    badges: ["Romantično", "Cvjetno"],
    description:
      "Delikatni ružičasto-bijeli dizajn sa motivom ruže. Savršen za modernu i romantičnu nevjestu.",
    year: 2025,
  },
  {
    id: "midnight-luxury",
    title: "Midnight Luxury",
    subtitle: "Elena & Marko",
    category: "vjencanje",
    palette: {
      bg: "#141422",
      primary: "#c9a84c",
      secondary: "#e8d5a0",
      text: "#f5f0e8",
      border: "rgba(201,168,76,0.7)",
    },
    price: "Od 18 €",
    badges: ["Premium", "Glamurozno"],
    description:
      "Raskošan tamni dizajn sa zlatnim akcentima za nezaboravno noćno slavlje .",
    year: 2025,
  },
  {
    id: "proljecno-slavlje",
    title: "Proljetno Slavlje",
    subtitle: "Jovana — 30. rođendan",
    category: "rodjendan",
    palette: {
      bg: "#f0fff4",
      primary: "#2d8a55",
      secondary: "#68d391",
      text: "#0d2a1a",
      border: "rgba(45,138,85,0.55)",
    },
    price: "Od 10 €",
    badges: ["Svježe", "Veselo"],
    description:
      "Živahni cvjetni dizajn sa proljetnim motivima. Savršen za svečani rodjendan okružen voljenima.",
    year: 2025,
  },
  {
    id: "elegantni-18",
    title: "Novi Početak",
    subtitle: "Lea — 18. godišnjica",
    category: "rodjendan",
    palette: {
      bg: "#f8f0ff",
      primary: "#7c3aed",
      secondary: "#a78bfa",
      text: "#1a0a2e",
      border: "rgba(124,58,237,0.5)",
    },
    price: "Od 12 €",
    badges: ["Elegantno", "Sofisticirano"],
    description:
      "Elegantna ljubičasta pozivnica sa zlatnim akcentima. Idealna proslava punoljetstva.",
    year: 2024,
  },
  {
    id: "veseli-rodjendan",
    title: "Sretan Rodjendan",
    subtitle: "Prijatelji & porodica",
    category: "rodjendan",
    palette: {
      bg: "#fffbf0",
      primary: "#d97706",
      secondary: "#fbbf24",
      text: "#2a1a0a",
      border: "rgba(217,119,6,0.55)",
    },
    price: "Od 10 €",
    badges: ["Popularno", "Za sve uzraste"],
    description:
      "Živahna i radosna pozivnica za proslavu sa porodicom i prijateljima. Topla zlatno-narandžasta paleta.",
    year: 2024,
  },
  {
    id: "maturska-noc",
    title: "Maturska Noć",
    subtitle: "Generacija 2025.",
    category: "matura",
    palette: {
      bg: "#f0f5ff",
      primary: "#1e40af",
      secondary: "#60a5fa",
      text: "#0a1535",
      border: "rgba(30,64,175,0.5)",
    },
    price: "Od 12 €",
    badges: ["Popularno", "Svečano"],
    description:
      "Svečani plavi dizajn koji obilježava kraj jednog i početak novog poglavlja. Idealno za maturske zabave.",
    year: 2025,
  },
  {
    id: "korporativni-gala",
    title: "Korporativni Gala",
    subtitle: "Poslovna proslava",
    category: "korporativno",
    palette: {
      bg: "#f5f5f5",
      primary: "#1a1a2e",
      secondary: "#c9a84c",
      text: "#1a1a1a",
      border: "rgba(26,26,46,0.45)",
    },
    price: "Od 20 €",
    badges: ["Profesionalno", "Premium"],
    description:
      "Profesionalan i elegantan dizajn za poslovne evente, gala večere i korporativna slavlja.",
    year: 2024,
  },
];

export const categoryLabels: Record<Category, string> = {
  vjencanje: "Vjenčanja",
  rodjendan: "Rođendani",
  matura: "Mature",
  korporativno: "Korporativno",
};
