import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "O Nama | e-pozivnice.me",
  description:
    "Upoznajte tim iza e-pozivnice.me - studio koji stvara elegantne digitalne pozivnice sa mjerom, emocijom i pažljivo oblikovanim detaljima.",
};

const values = [
  {
    title: "Elegancija",
    description:
      "Biramo mirne tonove, profinjenu tipografiju i kompoziciju koja djeluje luksuzno bez viška.",
  },
  {
    title: "Personalizacija",
    description:
      "Svaka pozivnica prati vašu priču, energiju događaja i detalje koje želite da ostanu zapamćeni.",
  },
  {
    title: "Pouzdanost",
    description:
      "Proces je jasan, komunikacija brza, a finalni materijal spreman za dijeljenje bez stresa i čekanja.",
  },
];

const steps = [
  {
    num: "01",
    title: "Javite nam se",
    description:
      "Pošaljete nam osnovne informacije, željeni stil i raspoloženje koje želite prenijeti.",
  },
  {
    num: "02",
    title: "Biramo pravac",
    description:
      "Zajedno definišemo boje, tipografiju i ton tako da dizajn djeluje skladno i posebno.",
  },
  {
    num: "03",
    title: "Dorađujemo detalje",
    description:
      "Prilagođavamo tekst, raspored i ukrase dok pozivnica ne bude potpuno usklađena sa vama.",
  },
  {
    num: "04",
    title: "Spremno za dijeljenje",
    description:
      "Dobijate finalni format koji odmah možete poslati gostima preko telefona, maila ili mreža.",
  },
];

const highlights = [
  { value: "2024", label: "godina osnivanja" },
  { value: "100%", label: "digitalni i prilagodljivi formati" },
  { value: "24h", label: "prosječno vrijeme prvog odgovora" },
];

const contactCards = [
  {
    label: "E-pošta",
    value: "epozivnice.me@gmail.com",
    href: "mailto:epozivnice.me@gmail.com",
  },
  {
    label: "Instagram",
    value: "@e_pozivnice.me",
    href: "https://www.instagram.com/e_pozivnice.me/",
  },
];

function SectionHeading({
  eyebrow,
  title,
  accent,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  accent: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-3 ${centered ? "items-center text-center" : "items-start text-left"}`}
      style={{ maxWidth: centered ? "760px" : "620px" }}
    >
      <p
        style={{
          fontFamily: "var(--font-great-vibes), cursive",
          fontSize: "clamp(1.75rem, 5vw, 2.35rem)",
          color: "rgba(184,151,58,0.9)",
          lineHeight: 1,
        }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-4xl sm:text-5xl lg:text-6xl font-light"
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          color: "#26190f",
          letterSpacing: "0.04em",
          lineHeight: 1.05,
        }}
      >
        {title} <em style={{ fontStyle: "italic", color: "#b8973a" }}>{accent}</em>
      </h2>
      <div
        style={{
          width: "62px",
          height: "1px",
          background: "linear-gradient(90deg, rgba(184,151,58,0.18), rgba(184,151,58,0.76), rgba(184,151,58,0.18))",
        }}
      />
    </div>
  );
}

export default function ONamaPage() {
  return (
    <main
      style={{
        background:
          "radial-gradient(circle at top, rgba(255,248,235,0.96) 0%, rgba(253,250,245,1) 36%, rgba(246,237,218,0.95) 100%)",
        overflow: "clip",
      }}
    >
      <ScrollReveal
        as="section"
        className="relative px-4 pt-8 pb-16 sm:px-6 sm:pt-12 sm:pb-20 lg:px-8 lg:pt-16 lg:pb-24"
      >
        <div
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            display: "grid",
            gap: "1.5rem",
            alignItems: "stretch",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          }}
        >
          <div
            className="section-shell"
            style={{
              padding: "clamp(1.25rem, 3.6vw, 2rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background:
                "linear-gradient(160deg, rgba(255,252,246,0.94), rgba(246,236,214,0.86))",
            }}
          >
            <div className="flex flex-col gap-6">
              <span
                style={{
                  alignSelf: "flex-start",
                  padding: "0.5rem 0.9rem",
                  border: "1px solid rgba(184,151,58,0.34)",
                  background: "rgba(255,255,255,0.62)",
                  color: "#7d5a10",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontSize: "0.72rem",
                }}
              >
                Digitalni studio za pozivnice
              </span>

              <div className="flex flex-col gap-5">
                <p
                  style={{
                    fontFamily: "var(--font-great-vibes), cursive",
                    fontSize: "clamp(2rem, 6vw, 3rem)",
                    color: "#c5a24b",
                    lineHeight: 1,
                  }}
                >
                  Upoznajte nas
                </p>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-light"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    color: "#24170e",
                    letterSpacing: "0.04em",
                    lineHeight: 0.95,
                  }}
                >
                  O <em style={{ fontStyle: "italic", color: "#b8973a" }}>Nama</em>
                </h1>
                <p
                  className="text-lg sm:text-xl lg:text-2xl"
                  style={{
                    maxWidth: "34rem",
                    color: "#45311a",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                  }}
                >
                  Kreiramo digitalne pozivnice koje djeluju profinjeno, emotivno i dovoljno posebno
                  da svaka proslava dobije svoj prepoznatljiv ton.
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gap: "0.85rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))",
                alignItems: "stretch",
              }}
            >
              {highlights.map((item, index) => (
                <ScrollReveal key={item.label} delay={index * 90}>
                  <div
                    style={{
                      padding: "1rem 1rem 1.1rem",
                      border: "1px solid rgba(184,151,58,0.24)",
                      background: "rgba(255,255,255,0.55)",
                      backdropFilter: "blur(8px)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
                        color: "#b8973a",
                        lineHeight: 1,
                        marginBottom: "0.45rem",
                      }}
                    >
                      {item.value}
                    </div>
                    <div
                      style={{
                        color: "#5a4122",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontSize: "0.74rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal delay={120}>
            <div
              className="section-shell"
              style={{
                padding: "clamp(1.25rem, 3.6vw, 2rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background:
                  "linear-gradient(180deg, rgba(255,253,249,0.98), rgba(251,244,231,0.92))",
              }}
            >
              <div
                style={{
                  paddingBottom: "1.4rem",
                  borderBottom: "1px solid rgba(184,151,58,0.22)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "0.9rem",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "#8c6730",
                    marginBottom: "1rem",
                  }}
                >
                  Naš pristup
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.45rem, 4.5vw, 2rem)",
                    lineHeight: 1.55,
                    color: "#2f2113",
                    fontStyle: "italic",
                  }}
                >
                  “Ne pravimo samo lijep dizajn. Gradimo osjećaj da je trenutak vrijedan pažnje,
                  da je pozivnica uvod u nešto zaista posebno.”
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {[
                  "Minimalistički, ali topli vizuelni identitet",
                  "Fokus na čitljivost, ritam i detalje",
                  "Savremeni formati prilagođeni dijeljenju",
                ].map((line, index) => (
                  <ScrollReveal key={line} delay={150 + index * 100}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.85rem",
                        padding: "0.95rem 1rem",
                        border: "1px solid rgba(184,151,58,0.2)",
                        background: "rgba(255,255,255,0.52)",
                      }}
                    >
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "999px",
                          background: "linear-gradient(180deg, #d5ba71, #b8973a)",
                          boxShadow: "0 0 18px rgba(184,151,58,0.35)",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: "1.12rem",
                          color: "#43301b",
                          lineHeight: 1.55,
                        }}
                      >
                        {line}
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gap: "1.5rem",
            alignItems: "center",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          }}
        >
          <ScrollReveal>
            <SectionHeading eyebrow="Naša priča" title="Studio sa" accent="mjerom" align="left" />
            <div className="mt-8 flex flex-col gap-5">
              <p
                style={{
                  fontSize: "clamp(1.06rem, 3vw, 1.2rem)",
                  lineHeight: 1.85,
                  color: "#392919",
                  fontStyle: "italic",
                }}
              >
                e-pozivnice.me nastao je iz ideje da najljepši trenuci zaslužuju uvod koji je jednako
                elegantan kao i sam događaj. Umjesto generičnih šablona, biramo pažljivo dizajniran
                pristup koji djeluje lično i savremeno.
              </p>
              <p
                style={{
                  fontSize: "clamp(1.04rem, 3vw, 1.15rem)",
                  lineHeight: 1.85,
                  color: "#4a3620",
                }}
              >
                Volimo tipografiju, finu ravnotežu praznog prostora i male detalje koji dizajnu daju
                osjećaj luksuza. Zato svaki projekat tretiramo kao mali editorial komad, a ne samo kao
                informativnu karticu.
              </p>
              <p
                style={{
                  fontSize: "clamp(1.04rem, 3vw, 1.15rem)",
                  lineHeight: 1.85,
                  color: "#4a3620",
                }}
              >
                Naš cilj je jednostavan: da vaša pozivnica odmah kaže gostima da ih čeka događaj sa
                stilom, pažnjom i toplinom.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div
              className="section-shell"
              style={{
                padding: "clamp(1.5rem, 4vw, 2.4rem)",
                background:
                  "linear-gradient(180deg, rgba(252,246,236,0.96), rgba(255,251,245,0.92))",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                }}
              >
                {[
                  {
                    title: "Vizija",
                    text: "Digitalna pozivnica može biti jednako elegantna i vrijedna čuvanja kao štampani komad.",
                  },
                  {
                    title: "Estetika",
                    text: "Mirni tonovi, profinjene linije i dovoljno kontrasta da sve djeluje čisto i luksuzno.",
                  },
                  {
                    title: "Iskustvo",
                    text: "Komunikacija bez komplikacija, brz proces i finalni rezultat koji je spreman za dijeljenje.",
                  },
                ].map((item, index) => (
                  <ScrollReveal key={item.title} delay={180 + index * 90}>
                    <div
                      style={{
                        height: "100%",
                        padding: "1.2rem 1.1rem",
                        border: "1px solid rgba(184,151,58,0.2)",
                        background: "rgba(255,255,255,0.56)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: "1.35rem",
                          color: "#2d2012",
                          letterSpacing: "0.06em",
                          marginBottom: "0.65rem",
                        }}
                      >
                        {item.title}
                      </div>
                      <p
                        style={{
                          color: "#513b20",
                          lineHeight: 1.75,
                          fontSize: "1rem",
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(4rem, 9vw, 5.75rem) clamp(1rem, 4vw, 2rem)",
          borderTop: "1px solid rgba(184,151,58,0.18)",
          borderBottom: "1px solid rgba(184,151,58,0.18)",
          background: "rgba(255,252,247,0.76)",
        }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <ScrollReveal>
            <div className="flex justify-center">
              <SectionHeading eyebrow="Šta nas vodi" title="Naše" accent="vrijednosti" />
            </div>
          </ScrollReveal>

          <div
            style={{
              marginTop: "clamp(2rem, 5vw, 3rem)",
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
            }}
          >
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 110}>
                <article
                  className="section-shell"
                  style={{
                    height: "100%",
                    padding: "1.45rem",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(250,244,232,0.84))",
                  }}
                >
                  <div
                    style={{
                      width: "54px",
                      height: "54px",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "999px",
                      border: "1px solid rgba(184,151,58,0.36)",
                      background: "rgba(184,151,58,0.08)",
                      color: "#b8973a",
                      fontSize: "1.2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    0{index + 1}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.8rem",
                      letterSpacing: "0.06em",
                      color: "#261a10",
                      marginBottom: "0.8rem",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      color: "#4e3820",
                      lineHeight: 1.8,
                      fontSize: "1.02rem",
                    }}
                  >
                    {value.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <ScrollReveal>
            <SectionHeading eyebrow="Kako radimo" title="Naš" accent="proces" />
          </ScrollReveal>

          <div
            style={{
              marginTop: "clamp(2rem, 5vw, 3rem)",
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            }}
          >
            {steps.map((step, index) => (
              <ScrollReveal key={step.num} delay={index * 90}>
                <article
                  style={{
                    height: "100%",
                    padding: "1.4rem 1.2rem",
                    border: "1px solid rgba(184,151,58,0.22)",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.76), rgba(248,239,221,0.82))",
                    boxShadow: "0 18px 42px rgba(89, 61, 16, 0.08)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "3rem",
                      color: "rgba(184,151,58,0.34)",
                      lineHeight: 1,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {step.num}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.55rem",
                      color: "#2d1f12",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {step.title}
                  </h3>
                  <div
                    style={{
                      width: "34px",
                      height: "1px",
                      background: "rgba(184,151,58,0.46)",
                      marginBottom: "0.85rem",
                    }}
                  />
                  <p
                    style={{
                      color: "#503a21",
                      lineHeight: 1.8,
                      fontSize: "1rem",
                    }}
                  >
                    {step.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal
        as="section"
        id="kontakt"
        className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div
          className="section-shell"
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "clamp(1.6rem, 5vw, 3rem)",
            background:
              "linear-gradient(145deg, rgba(22,15,9,0.98), rgba(42,28,12,0.94), rgba(91,67,28,0.9))",
            borderColor: "rgba(215,182,103,0.28)",
            boxShadow: "0 28px 70px rgba(21, 13, 4, 0.28)",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              alignItems: "center",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            }}
          >
            <div className="flex flex-col gap-5">
              <p
                style={{
                  fontFamily: "var(--font-great-vibes), cursive",
                  fontSize: "clamp(1.9rem, 5vw, 2.6rem)",
                  color: "#e1c16d",
                  lineHeight: 1,
                }}
              >
                Kontaktirajte nas
              </p>
              <h2
                className="text-4xl sm:text-5xl font-light"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  color: "#fffaf1",
                  lineHeight: 1.05,
                }}
              >
                Vaša <em style={{ fontStyle: "italic", color: "#d9b860" }}>pozivnica</em> može početi
                upravo ovdje.
              </h2>
              <p
                style={{
                  color: "rgba(255,247,233,0.82)",
                  lineHeight: 1.85,
                  fontSize: "1.08rem",
                  maxWidth: "34rem",
                }}
              >
                Pošaljite nam ideju, raspoloženje ili samo povod za slavlje. Mi ćemo od toga oblikovati
                pozivnicu koja djeluje elegantno, moderno i potpuno vaša.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              }}
            >
              {contactCards.map((card, index) => (
                <ScrollReveal key={card.label} delay={index * 120}>
                  <a
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{ textDecoration: "none", display: "block", height: "100%" }}
                  >
                    <div
                      style={{
                        height: "100%",
                        padding: "1.2rem 1.15rem",
                        border: "1px solid rgba(224,190,108,0.28)",
                        background: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div
                        style={{
                          color: "rgba(236,205,127,0.9)",
                          textTransform: "uppercase",
                          letterSpacing: "0.18em",
                          fontSize: "0.72rem",
                          marginBottom: "0.65rem",
                        }}
                      >
                        {card.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: "1.35rem",
                          color: "#fff9f0",
                          wordBreak: "break-word",
                        }}
                      >
                        {card.value}
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}
