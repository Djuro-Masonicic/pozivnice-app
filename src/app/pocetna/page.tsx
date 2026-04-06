import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { invitations, categoryLabels } from "@/data/invitations";

export const metadata: Metadata = {
  title: "Početna | e-pozivnice.me",
  description:
    "Kratak pregled e-pozivnice.me studija, izdvojene digitalne pozivnice i brzi put do kontakta.",
};

const featuredInvitations = invitations.slice(0, 3);

const quickLinks = [
  {
    eyebrow: "O nama",
    title: "Malo o našem studiju",
    text: "Stvaramo digitalne pozivnice sa elegantnim tonom, pažljivom tipografijom i personalizovanim detaljima.",
    href: "/o-nama",
    cta: "Saznajte više",
  },
  {
    eyebrow: "Pozivnice",
    title: "Pogledajte izdvojene dizajne",
    text: "Od romantičnih vjenčanja do modernih proslava, kolekcija je napravljena da brzo pronađete pravi stil.",
    href: "/pozivnice",
    cta: "Otvorite kolekciju",
  },
  {
    eyebrow: "Kontakt",
    title: "Javite nam se direktno",
    text: "Ako već znate šta želite, dovoljno je da nam pošaljete ideju i mi ćemo vas usmjeriti dalje.",
    href: "/kontakt",
    cta: "Kontakt stranica",
  },
];

export default function PocetnaPage() {
  return (
    <main
      style={{
        background:
          "radial-gradient(circle at top, rgba(255,248,235,0.95) 0%, rgba(253,250,245,1) 34%, rgba(246,237,218,0.96) 100%)",
        overflow: "clip",
      }}
    >
      <section className="relative px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20 lg:px-8 lg:pt-16 lg:pb-24">
        <div
          aria-hidden="true"
          className="animate-twinkle"
          style={{
            position: "absolute",
            top: "7.5rem",
            left: "8%",
            width: "16px",
            height: "16px",
            color: "rgba(184,151,58,0.65)",
          }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 0 L12.4 7.6 L20 10 L12.4 12.4 L10 20 L7.6 12.4 L0 10 L7.6 7.6 Z" />
          </svg>
        </div>
        <div
          aria-hidden="true"
          className="animate-gold-pulse"
          style={{
            position: "absolute",
            top: "13rem",
            right: "10%",
            width: "10px",
            height: "10px",
            borderRadius: "999px",
            background: "rgba(184,151,58,0.55)",
          }}
        />

        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <ScrollReveal>
            <div
              className="section-shell"
              style={{
                padding: "clamp(1.4rem, 4vw, 2.6rem)",
                background:
                  "linear-gradient(160deg, rgba(255,252,246,0.95), rgba(246,236,214,0.88))",
              }}
            >
              <div className="flex flex-col gap-5 text-center items-center">
                <p
                  style={{
                    fontFamily: "var(--font-great-vibes), cursive",
                    fontSize: "clamp(1.9rem, 5vw, 2.8rem)",
                    color: "#c5a24b",
                    lineHeight: 1,
                  }}
                >
                  Dobro došli
                </p>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-light"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    color: "#24170e",
                    letterSpacing: "0.04em",
                    lineHeight: 1.04,
                  }}
                >
                  Sve važno <em style={{ fontStyle: "italic", color: "#b8973a" }}>na jednom mjestu</em>
                </h1>
                <div
                  style={{
                    width: "62px",
                    height: "1px",
                    background: "rgba(184,151,58,0.45)",
                  }}
                />
                <p
                  style={{
                    maxWidth: "44rem",
                    color: "#46321b",
                    lineHeight: 1.8,
                    fontSize: "clamp(1.02rem, 2.8vw, 1.16rem)",
                    fontStyle: "italic",
                  }}
                >
                  Ovdje možete brzo upoznati naš studio, pogledati izdvojene pozivnice i odmah doći do
                  stranice za kontakt kada budete spremni za svoju narudžbu.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 mt-6 lg:grid-cols-3" style={{ alignItems: "stretch" }}>
            {quickLinks.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 110}>
                <article
                  className="section-shell"
                  style={{
                    height: "100%",
                    padding: "1.3rem 1.2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(250,244,232,0.86))",
                  }}
                >
                  <div className="flex flex-col gap-3">
                    <p
                      style={{
                        color: "#8c6730",
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        fontSize: "0.74rem",
                      }}
                    >
                      {item.eyebrow}
                    </p>
                    <h2
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "1.8rem",
                        lineHeight: 1.08,
                        color: "#26190f",
                      }}
                    >
                      {item.title}
                    </h2>
                    <p
                      style={{
                        color: "#4e3820",
                        lineHeight: 1.75,
                        fontSize: "1rem",
                      }}
                    >
                      {item.text}
                    </p>
                  </div>

                  <Link
                    href={item.href}
                    style={{
                      marginTop: "1.2rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      color: "#8c6730",
                      textDecoration: "none",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      fontSize: "0.78rem",
                    }}
                  >
                    <span>{item.cta}</span>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "26px",
                        height: "26px",
                        display: "grid",
                        placeItems: "center",
                        border: "1px solid rgba(184,151,58,0.28)",
                        background: "rgba(255,255,255,0.62)",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 17 L17 7 M9 7 H17 V15"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <ScrollReveal>
            <div className="flex flex-col items-center gap-3 text-center mb-8">
              <p
                style={{
                  fontFamily: "var(--font-great-vibes), cursive",
                  fontSize: "1.75rem",
                  color: "rgba(184,151,58,0.86)",
                }}
              >
                Izdvojeno
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-light"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  color: "#26190f",
                  letterSpacing: "0.04em",
                }}
              >
                Tri pozivnice koje <em style={{ fontStyle: "italic", color: "#b8973a" }}>volimo</em>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 lg:grid-cols-3">
            {featuredInvitations.map((inv, index) => (
              <ScrollReveal key={inv.id} delay={index * 120}>
                <article
                  className="section-shell"
                  style={{
                    height: "100%",
                    padding: "1.15rem",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.84), rgba(250,244,232,0.88))",
                  }}
                >
                  <div
                    style={{
                      padding: "1.25rem 1rem",
                      border: `1px solid ${inv.palette.border}`,
                      background: inv.palette.bg,
                      marginBottom: "1rem",
                      minHeight: "220px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: "-22px",
                        right: "-22px",
                        width: "88px",
                        height: "88px",
                        borderRadius: "999px",
                        background: `${inv.palette.primary}16`,
                        animation: "logo-float 5.2s ease-in-out infinite",
                      }}
                    />
                    <div>
                      <p
                        style={{
                          color: inv.palette.primary,
                          textTransform: "uppercase",
                          letterSpacing: "0.18em",
                          fontSize: "0.7rem",
                          marginBottom: "0.75rem",
                        }}
                      >
                        {categoryLabels[inv.category]}
                      </p>
                      <h3
                        style={{
                          fontFamily: "var(--font-great-vibes), cursive",
                          fontSize: "2.1rem",
                          color: inv.palette.primary,
                          lineHeight: 1,
                          marginBottom: "0.75rem",
                        }}
                      >
                        {inv.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          color: inv.palette.text,
                          opacity: 0.82,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          fontSize: "0.72rem",
                        }}
                      >
                        {inv.subtitle}
                      </p>
                    </div>
                    <div
                      style={{
                        width: "46px",
                        height: "1px",
                        background: inv.palette.primary,
                        opacity: 0.5,
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <p
                      style={{
                        color: "#4e3820",
                        lineHeight: 1.7,
                        fontSize: "0.98rem",
                      }}
                    >
                      {inv.description}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <span
                        style={{
                          color: "#8c6730",
                          fontSize: "1.02rem",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {inv.price}
                      </span>
                      <Link
                        href="/pozivnice"
                        style={{
                          color: "#8c6730",
                          textDecoration: "none",
                          textTransform: "uppercase",
                          letterSpacing: "0.14em",
                          fontSize: "0.76rem",
                        }}
                      >
                        Pogledajte više
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal
            delay={120}
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link
              href="/pozivnice"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "0.92rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#fdfaf5",
                background: "#b8973a",
                padding: "0.95rem 1.8rem",
                textDecoration: "none",
                border: "1px solid #b8973a",
                boxShadow: "0 14px 30px rgba(184,151,58,0.18)",
              }}
            >
              Sve pozivnice
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
