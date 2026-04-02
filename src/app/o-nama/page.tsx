import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "O Nama | e-pozivnice.me",
  description:
    "Upoznajte tim iza e-pozivnice.me — mladi i strastveni dizajneri koji stvaraju elegantne digitalne pozivnice s ljubavlju.",
};

const values = [
  {
    title: "Elegancija",
    description:
      "Svaki detalj je promišljen — od tipografije do palete boja. Vjerujemo da ljepota leži u preciznosti.",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
        <path
          d="M20 4 L22 14 L32 14 L24 20 L27 30 L20 24 L13 30 L16 20 L8 14 L18 14 Z"
          stroke="#b8973a"
          strokeWidth="1.8"
          fill="rgba(184,151,58,0.1)"
        />
      </svg>
    ),
  },
  {
    title: "Personalizacija",
    description:
      "Nema dvije iste pozivnice. Svaki naš rad odražava jedinstvenu priču para, porodice ili organizacije.",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
        <circle cx="20" cy="14" r="7" stroke="#b8973a" strokeWidth="1.8" fill="rgba(184,151,58,0.1)" />
        <path
          d="M6 36 C6 28 12 24 20 24 C28 24 34 28 34 36"
          stroke="#b8973a"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    title: "Pouzdanost",
    description:
      "Dogovoreni rok je sveti rok. Isporučujemo na vrijeme, bez kompromisa u kvalitetu.",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
        <circle cx="20" cy="20" r="14" stroke="#b8973a" strokeWidth="1.8" fill="rgba(184,151,58,0.07)" />
        <path
          d="M13 20 L18 25 L28 15"
          stroke="#b8973a"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
];

const steps = [
  {
    num: "01",
    title: "Kontaktirajte Nas",
    description: "Pišite nam putem e-pošte ili društvenih mreža sa vašim idejama i potrebama.",
  },
  {
    num: "02",
    title: "Odaberite Dizajn",
    description:
      "Pregledajte našu kolekciju ili nam opišite viziju — kreiramo i po narudžbi.",
  },
  {
    num: "03",
    title: "Personalizujemo",
    description:
      "Prilagođavamo tekst, boje i detalje dok pozivnica ne bude savršena baš za vas.",
  },
  {
    num: "04",
    title: "Primite i Podijelite",
    description:
      "Dobijate finalni fajl spreman za slanje — WhatsApp, e-pošta, ili print kod štampara.",
  },
];

const cornerPositions = [
  "top-0 left-0",
  "top-0 right-0 rotate-90",
  "bottom-0 right-0 rotate-180",
  "bottom-0 left-0 -rotate-90",
];

export default function ONamaPage() {
  return (
    <main
      style={{
        background: "linear-gradient(160deg, #fdfaf5 0%, #fef9ee 60%, #fdf6e3 100%)",
        overflowX: "hidden",
      }}
    >
      {/* ══════ PAGE HEADER ══════ */}
      <ScrollReveal as="section"
        className="relative flex flex-col items-center justify-center px-6 py-16 sm:py-24"
        style={{ borderBottom: "1px solid rgba(184,151,58,0.2)" }}
      >
        <div className="flex flex-col items-center gap-4 text-center" style={{ maxWidth: "700px" }}>
          <p
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: "1.8rem",
              color: "rgba(184,151,58,0.85)",
              animation: "reveal 0.8s cubic-bezier(0.22,1,0.36,1) both 0.1s",
            }}
          >
            Upoznajte nas
          </p>
          <h1
            className="text-5xl sm:text-6xl font-light"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: "#2c2013",
              letterSpacing: "0.06em",
              lineHeight: 1.15,
              animation: "reveal 0.8s cubic-bezier(0.22,1,0.36,1) both 0.3s",
            }}
          >
            O{" "}
            <em style={{ fontStyle: "italic", color: "#b8973a" }}>Nama</em>
          </h1>
          <div
            style={{
              width: "50px",
              height: "1px",
              background: "rgba(184,151,58,0.5)",
              animation: "reveal 0.8s cubic-bezier(0.22,1,0.36,1) both 0.5s",
            }}
          />
          <p
            className="text-xl sm:text-2xl italic font-light leading-relaxed"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: "#5c4a2a",
              animation: "reveal 0.8s cubic-bezier(0.22,1,0.36,1) both 0.65s",
            }}
          >
            Stvaramo elegantne digitalne pozivnice koje nose emociju, stil i vašu jedinstvenu priču.
          </p>
        </div>
      </ScrollReveal>

      {/* ══════ OUR STORY ══════ */}
      <section style={{ padding: "5rem 1.5rem", position: "relative" }}>
        <div
          style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "5rem" }}
        >
          {/* Story block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
            {/* Decorative frame with text */}
            <ScrollReveal delay={0}>
            <div className="relative" style={{ padding: "2rem" }}>
              <div
                className="absolute inset-0 animate-border-shimmer"
                style={{ border: "1.5px solid rgba(184,151,58,0.5)" }}
              />
              <div
                className="absolute inset-2 animate-border-shimmer-delay"
                style={{ border: "1px solid rgba(184,151,58,0.22)" }}
              />
              {cornerPositions.map((pos, i) => (
                <svg
                  key={i}
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 28 28"
                  className={`absolute pointer-events-none ${pos}`}
                  style={{ color: "#b8973a" }}
                >
                  <path
                    d="M2 2 L2 12 M2 2 L12 2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="2" cy="2" r="2" fill="currentColor" />
                </svg>
              ))}
              <div className="relative flex flex-col gap-4 py-4 px-2 text-center">
                <p
                  style={{
                    fontFamily: "var(--font-great-vibes), cursive",
                    fontSize: "3.5rem",
                    color: "#b8973a",
                    lineHeight: 1,
                  }}
                >
                  e-pozivnice
                </p>
                <div
                  style={{ width: "40px", height: "1px", background: "rgba(184,151,58,0.5)", margin: "0 auto" }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#5c4a2a",
                  }}
                >
                  Osnovano 2024.
                </p>
                <p
                  className="italic"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.1rem",
                    color: "#7a6030",
                    lineHeight: 1.7,
                  }}
                >
                  &ldquo;Svaka pozivnica je obećanje — obećanje da će taj trenutak biti nezaboravan.&rdquo;
                </p>
              </div>
            </div>
            </ScrollReveal>

            {/* Story text */}
            <ScrollReveal delay={120}>
            <div className="flex flex-col gap-5">
              <h2
                className="text-3xl sm:text-4xl font-light"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  color: "#2c2013",
                  letterSpacing: "0.04em",
                }}
              >
                Naša <em style={{ fontStyle: "italic", color: "#b8973a" }}>Priča</em>
              </h2>
              <div style={{ width: "40px", height: "1px", background: "rgba(184,151,58,0.5)" }} />
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.15rem",
                  color: "#4a3a20",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                }}
              >
                e-pozivnice.me je nastao iz jednostavne ideje: svaki poseban trenutak zaslužuje
                savršenu pozivnicu. Umjesto skupih printanih verzija koje završe u ladici,
                vjerujemo u digitalne pozivnice koje žive — koje se dijele, čuvaju i s ponosom
                pokazuju.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.15rem",
                  color: "#4a3a20",
                  lineHeight: 1.8,
                }}
              >
                Naš tim se sastoji od mladih dizajnera i kreativaca koji su strastveni prema
                tipografiji, boji i proporcijama. Svaki projekat tretiramo kao vlastiti — jer znamo
                koliko vam znači taj poseban dan.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.15rem",
                  color: "#4a3a20",
                  lineHeight: 1.8,
                }}
              >
                Do sada smo kreirali pozivnice za vjenčanja, rođendane, mature i korporativne evente
                širom regiona — i svaki put smo ponosni kada naš klijent kaže: &ldquo;Ovo je tačno
                ono što sam zamišljao.&rdquo;
              </p>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════ VALUES ══════ */}
      <section
        style={{
          background: "rgba(255,252,246,0.9)",
          borderTop: "1px solid rgba(184,151,58,0.18)",
          borderBottom: "1px solid rgba(184,151,58,0.18)",
          padding: "5rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="flex flex-col items-center gap-3 text-center mb-14">
            <p
              style={{
                fontFamily: "var(--font-great-vibes), cursive",
                fontSize: "1.6rem",
                color: "rgba(184,151,58,0.85)",
              }}
            >
              Šta nas pokreće
            </p>
            <h2
              className="text-4xl sm:text-5xl font-light"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                color: "#2c2013",
                letterSpacing: "0.05em",
              }}
            >
              Naše <em style={{ fontStyle: "italic", color: "#b8973a" }}>Vrijednosti</em>
            </h2>
            <div style={{ width: "50px", height: "1px", background: "rgba(184,151,58,0.5)", marginTop: "8px" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {values.map(({ title, description, icon }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
              <div
                className="flex flex-col items-center text-center gap-5 px-6 py-8"
                style={{ border: "1px solid rgba(184,151,58,0.25)", background: "rgba(253,250,245,0.7)" }}
              >
                <div
                  style={{
                    width: "68px",
                    height: "68px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(184,151,58,0.07)",
                    border: "1px solid rgba(184,151,58,0.25)",
                  }}
                >
                  {icon}
                </div>
                <h3
                  className="text-2xl font-light uppercase"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    color: "#2c2013",
                    letterSpacing: "0.15em",
                  }}
                >
                  {title}
                </h3>
                <div style={{ width: "30px", height: "1px", background: "rgba(184,151,58,0.45)" }} />
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.1rem",
                    color: "#5c4a2a",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                  }}
                >
                  {description}
                </p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PROCESS ══════ */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="flex flex-col items-center gap-3 text-center mb-14">
            <p
              style={{
                fontFamily: "var(--font-great-vibes), cursive",
                fontSize: "1.6rem",
                color: "rgba(184,151,58,0.85)",
              }}
            >
              Kako radimo
            </p>
            <h2
              className="text-4xl sm:text-5xl font-light"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                color: "#2c2013",
                letterSpacing: "0.05em",
              }}
            >
              Naš <em style={{ fontStyle: "italic", color: "#b8973a" }}>Proces</em>
            </h2>
            <div style={{ width: "50px", height: "1px", background: "rgba(184,151,58,0.5)", marginTop: "8px" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ num, title, description }, i) => (
              <ScrollReveal key={num} delay={i * 80}>
              <div
                className="flex flex-col gap-4 px-6 py-8"
                style={{ border: "1px solid rgba(184,151,58,0.2)", background: "rgba(253,250,245,0.5)", height: "100%" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "3rem",
                    fontStyle: "italic",
                    color: "rgba(184,151,58,0.35)",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </span>
                <h3
                  className="text-xl font-light uppercase"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    color: "#2c2013",
                    letterSpacing: "0.12em",
                  }}
                >
                  {title}
                </h3>
                <div style={{ width: "30px", height: "1px", background: "rgba(184,151,58,0.4)" }} />
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.05rem",
                    color: "#5c4a2a",
                    lineHeight: 1.7,
                  }}
                >
                  {description}
                </p>
              </div>
            </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CONTACT SECTION ══════ */}
      <section
        id="kontakt"
        style={{
          background: "#130e08",
          borderTop: "1px solid rgba(184,151,58,0.3)",
          padding: "5.5rem 1.5rem",
        }}
      >
        <div
          className="flex flex-col items-center text-center gap-6"
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          <p
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: "2rem",
              color: "rgba(184,151,58,0.8)",
            }}
          >
            Kontaktirajte nas
          </p>
          <h2
            className="text-4xl sm:text-5xl font-light"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: "#fdfaf5",
              letterSpacing: "0.06em",
              lineHeight: 1.2,
            }}
          >
            Vaša <em style={{ fontStyle: "italic", color: "#b8973a" }}>Pozivnica</em> Čeka
          </h2>
          <div style={{ width: "50px", height: "1px", background: "rgba(184,151,58,0.4)" }} />
          <p
            className="text-xl italic font-light"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: "rgba(253,250,245,0.6)",
              lineHeight: 1.8,
            }}
          >
            Pišite nam — odgovaramo u roku od 24 sata. Objasnite nam svoju viziju i mi ćemo
            se pobrinuti za sve ostalo.
          </p>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row gap-8 pt-4 w-full justify-center">
            {[
              {
                label: "E-pošta",
                value: "info@e-pozivnice.me",
                href: "mailto:info@e-pozivnice.me",
                icon: (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                    <rect x="2" y="5" width="20" height="14" rx="1.5" stroke="#b8973a" strokeWidth="1.8" />
                    <polyline points="2,5 12,13 22,5" stroke="#b8973a" strokeWidth="1.5" fill="none" />
                  </svg>
                ),
              },
              {
                label: "Instagram",
                value: "@epozivnice.me",
                href: "https://instagram.com/epozivnice.me",
                icon: (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="#b8973a" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="5" stroke="#b8973a" strokeWidth="1.5" />
                    <circle cx="17.5" cy="6.5" r="1.25" fill="#b8973a" />
                  </svg>
                ),
              },
            ].map(({ label, value, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ textDecoration: "none" }}
              >
                <div className="flex flex-col items-center gap-3 px-8 py-6" style={{ border: "1px solid rgba(184,151,58,0.3)", background: "rgba(184,151,58,0.06)" }}>
                  {icon}
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "0.8rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(184,151,58,0.65)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.05rem",
                      color: "rgba(253,250,245,0.8)",
                    }}
                  >
                    {value}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
