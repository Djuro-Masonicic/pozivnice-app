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
    subtitle: "Staklena ljubavna priča",
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
    price: "30 €",
    badges: ["Uživo prikaz", "Staklena kartica"],
    description:
      "Romantična višeslojna pozivnica za vjenčanje sa odbrojavanjem, citatom, lokacijom, QR kodom i potvrdom dolaska.",
    year: 2026,
  },
  {
    id: "anja-stefan-dance",
    title: "Anja & Stefan",
    subtitle: "Muzička pozivnica",
    category: "vjencanje",
    previewImage: "/previews/DanceInvitationPreview.png",
    demoHref: "/DancePozivnica",
    palette: {
      bg: "#fdfaf5",
      primary: "#776242",
      secondary: "#9a8761",
      text: "#4e4031",
      border: "rgba(119,98,66,0.38)",
    },
    price: "30 €",
    badges: ["Uživo prikaz", "Muzika"],
    description:
      "Elegantna cvjetna pozivnica sa muzikom u pozadini, odbrojavanjem, mapom i formom za potvrdu dolaska.",
    year: 2026,
  },
  {
    id: "aleksandra-milan",
    title: "Aleksandra & Milan",
    subtitle: "Ljubavna priča kroz vrijeme",
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
    price: "30 €",
    badges: ["Uživo prikaz", "Foto-priča"],
    description:
      "Nježna pozivnica za vjenčanje u uredničkom stilu, oblikovana kroz ključne fotografije, animirani kalendar i profinjenu sekciju s mapom.",
    year: 2026,
  },
  {
    id: "golubovi",
    title: "Katarina & Vukašin",
    subtitle: "Cvjetni okvir s golubovima",
    category: "vjencanje",
    previewImage: "/previews/GoluboviPreview.png",
    demoHref: "/GoluboviPozivnica",
    palette: {
      bg: "#fbfbf9",
      primary: "#c49563",
      secondary: "#d8b98b",
      text: "#333333",
      border: "rgba(196,149,99,0.4)",
    },
    price: "30 €",
    badges: ["Uživo prikaz", "Klasična"],
    description:
      "Klasična cvjetna pozivnica za vjenčanje sa golubovima, zlatnim detaljima, odbrojavanjem i dotjeranom sekcijom s mapom.",
    year: 2026,
  },
  {
    id: "anja-minnie",
    title: "Anja",
    subtitle: "1. rođendan",
    category: "rodjendan",
    previewImage: "/previews/minnie-card.png",
    demoHref: "/MinniePozivnica",
    palette: {
      bg: "#fff6fb",
      primary: "#ff4fa3",
      secondary: "#ff9aa2",
      text: "#333333",
      border: "rgba(255,79,163,0.35)",
    },
    price: "30 €",
    badges: ["Uživo prikaz", "Rođendan"],
    description:
      "Slatka rođendanska pozivnica inspirisana Mini Maus, sa konfetama, balonima koje možete puknuti, iskricama, odbrojavanjem i mapom.",
    year: 2026,
  },
  {
    id: "krstan-terzic",
    title: "Krstan",
    subtitle: "3. rođendan",
    category: "rodjendan",
    previewImage: "/previews/KrstanPreview.png",
    demoHref: "/KrstanTerzicPozivnica",
    palette: {
      bg: "#f6fbff",
      primary: "#6f8fa6",
      secondary: "#ff9aa2",
      text: "#263847",
      border: "rgba(111,143,166,0.4)",
    },
    price: "30 €",
    badges: ["Uživo prikaz", "Dječja"],
    description:
      "Razigrana rođendanska pozivnica sa lebdećim balonima, nježnim ilustracijama i aktivnim odbrojavanjem.",
    year: 2026,
  },
];

export const categoryLabels: Record<Category, string> = {
  vjencanje: "Vjenčanja",
  rodjendan: "Rođendani",
  matura: "Mature",
  korporativno: "Korporativno",
};
