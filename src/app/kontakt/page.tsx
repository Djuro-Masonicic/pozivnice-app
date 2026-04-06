import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Kontakt | e-pozivnice.me",
  description:
    "Javite nam se za elegantne digitalne pozivnice. Pišite nam putem e-pošte ili Instagrama i zajedno ćemo oblikovati vašu pozivnicu.",
};

const contactCards = [
  {
    label: "E-pošta",
    value: "epozivnice.me@gmail.com",
    href: "mailto:epozivnice.me@gmail.com",
    note: "Pošaljite datum, vrstu događaja i željeni stil.",
  },
  {
    label: "Instagram",
    value: "@e_pozivnice.me",
    href: "https://www.instagram.com/e_pozivnice.me/",
    note: "Pošaljite inspiraciju, boje i vizuelne reference.",
  },
];

const infoPills = [
  "datum i vrsta događaja",
  "stil koji volite",
  "tekst za pozivnicu",
  "boje ili inspiracija",
];

export default function KontaktPage() {
  return (
    <main
      style={{
        background:
          "radial-gradient(circle at top, rgba(255,248,235,0.96) 0%, rgba(253,250,245,1) 38%, rgba(246,237,218,0.95) 100%)",
        overflow: "clip",
        minHeight: "calc(100dvh - 72px)",
        display: "flex",
      }}
    >
      <section className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div
          className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]"
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            minHeight: "calc(100dvh - 72px - clamp(3rem, 8vw, 5rem))",
            alignItems: "stretch",
          }}
        >
          <ScrollReveal>
            <div
              className="section-shell"
              style={{
                padding: "clamp(1.2rem, 3vw, 2rem)",
                background:
                  "linear-gradient(160deg, rgba(255,252,246,0.95), rgba(246,236,214,0.88))",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div className="flex flex-col gap-4">
                <p
                  style={{
                    fontFamily: "var(--font-great-vibes), cursive",
                    fontSize: "clamp(1.7rem, 5vw, 2.6rem)",
                    color: "#c5a24b",
                    lineHeight: 1,
                  }}
                >
                  Javite nam se
                </p>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-light"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    color: "#24170e",
                    letterSpacing: "0.04em",
                    lineHeight: 1,
                  }}
                >
                  Kontakt <em style={{ fontStyle: "italic", color: "#b8973a" }}>stranica</em>
                </h1>
                <div
                  style={{
                    width: "58px",
                    height: "1px",
                    background: "rgba(184,151,58,0.45)",
                  }}
                />
                <p
                  style={{
                    fontSize: "clamp(0.98rem, 2.6vw, 1.12rem)",
                    lineHeight: 1.7,
                    color: "#45311a",
                    fontStyle: "italic",
                    maxWidth: "31rem",
                  }}
                >
                  Recite nam kakvu pozivnicu želite i mi ćemo vam pomoći da je pretvorite u elegantan,
                  personalizovan digitalni dizajn spreman za dijeljenje.
                </p>
              </div>

              <div
                style={{
                  marginTop: "1.25rem",
                  padding: "1rem 1.05rem",
                  border: "1px solid rgba(184,151,58,0.18)",
                  background: "rgba(255,255,255,0.42)",
                }}
              >
                <div
                  style={{
                    color: "#8c6730",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    fontSize: "0.72rem",
                    marginBottom: "0.8rem",
                  }}
                >
                  Najbolje je da nam pošaljete
                </div>
                <div
                  style={{
                    display: "grid",
                    gap: "0.7rem 1rem",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
                  }}
                >
                  {infoPills.map((item, index) => (
                    <ScrollReveal key={item} delay={100 + index * 70}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.7rem",
                          color: "#4c361c",
                          lineHeight: 1.45,
                          fontSize: "0.98rem",
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "999px",
                            background: "linear-gradient(180deg, #d4b86a, #b8973a)",
                            flexShrink: 0,
                            boxShadow: "0 0 12px rgba(184,151,58,0.22)",
                          }}
                        />
                        <span>{item}</span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div
              className="section-shell"
              style={{
                padding: "clamp(1.15rem, 3vw, 1.7rem)",
                background:
                  "linear-gradient(145deg, rgba(23,16,9,0.98), rgba(43,29,12,0.94), rgba(90,66,27,0.9))",
                height: "100%",
                display: "grid",
                gap: "0.9rem",
                alignContent: "center",
              }}
            >
              <div className="flex flex-col gap-2">
                <p
                  style={{
                    color: "rgba(236,205,127,0.88)",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontSize: "0.74rem",
                  }}
                >
                  Kontakt opcije
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.5rem, 4vw, 2.05rem)",
                    color: "#fff9f0",
                    lineHeight: 1.15,
                  }}
                >
                  Sve što vam treba je odmah ovdje.
                </p>
              </div>

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
                        padding: "1.05rem 1rem",
                        border: "1px solid rgba(224,190,108,0.24)",
                        background: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: "0.75rem",
                          marginBottom: "0.55rem",
                        }}
                      >
                        <div
                          style={{
                            color: "rgba(236,205,127,0.9)",
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            fontSize: "0.7rem",
                          }}
                        >
                          {card.label}
                        </div>
                        {card.label === "Instagram" ? (
                          <span
                            aria-hidden="true"
                            style={{
                              width: "32px",
                              height: "32px",
                              display: "grid",
                              placeItems: "center",
                              border: "1px solid rgba(224,190,108,0.28)",
                              background: "rgba(255,255,255,0.08)",
                              color: "rgba(236,205,127,0.96)",
                              flexShrink: 0,
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M7 17 L17 7 M9 7 H17 V15"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: "clamp(1.3rem, 3.8vw, 1.8rem)",
                          color: "#fff9f0",
                          marginBottom: "0.55rem",
                          wordBreak: "break-word",
                        }}
                      >
                        {card.value}
                      </div>
                      <p
                        style={{
                          color: "rgba(255,247,233,0.78)",
                          lineHeight: 1.65,
                          fontSize: "0.95rem",
                        }}
                      >
                        {card.note}
                      </p>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
