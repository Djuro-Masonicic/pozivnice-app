"use client";

import { Suspense, startTransition, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { invitations, categoryLabels, type Category } from "@/data/invitations";
import ScrollReveal from "@/components/ScrollReveal";

type FilterTab = "sve" | Category;

const categoryOrder: Category[] = ["vjencanje", "rodjendan", "matura", "korporativno"];
const tabs: { key: FilterTab; label: string }[] = [
  { key: "sve", label: "Sve" },
  ...categoryOrder
    .filter((category) => invitations.some((inv) => inv.category === category))
    .map((category) => ({ key: category, label: categoryLabels[category] })),
];

const categoryPhotos: Record<Category, string> = {
  vjencanje: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=700&fit=crop&q=80",
  rodjendan: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&h=700&fit=crop&q=80",
  matura: "https://images.unsplash.com/photo-1627556704283-048526b4eb5a?w=1600&h=700&fit=crop&q=80",
  korporativno: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=700&fit=crop&q=80",
};

const invitationPhotos: Record<string, string> = {
  "zlatna-elegancija": "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&h=500&fit=crop&q=75",
  "bijela-ruza": "https://images.unsplash.com/photo-1529636798-29ea53b93b5a?w=700&h=500&fit=crop&q=75",
  "midnight-luxury": "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=700&h=500&fit=crop&q=75",
  "proljecno-slavlje": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&h=500&fit=crop&q=75",
  "elegantni-18": "https://images.unsplash.com/photo-1464349153735-2cb6ef12c2bb?w=700&h=500&fit=crop&q=75",
  "veseli-rodjendan": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&h=500&fit=crop&q=75",
  "maturska-noc": "https://images.unsplash.com/photo-1627556704283-048526b4eb5a?w=700&h=500&fit=crop&q=75",
  "korporativni-gala": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&h=500&fit=crop&q=75",
};

function InvitationCard({
  inv,
  animDelay,
  animateOnMount,
  priority = false,
}: {
  inv: (typeof invitations)[number];
  animDelay: number;
  animateOnMount: boolean;
  priority?: boolean;
}) {
  const { palette } = inv;
  const photoSrc = inv.previewImage ?? invitationPhotos[inv.id];
  const hasLivePreview = Boolean(inv.previewImage && inv.demoHref);

  return (
    <article
      className={animateOnMount ? "inv-card card-appear" : "inv-card"}
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(160,121,33,0.36)",
        background: "rgba(255,252,246,0.98)",
        overflow: "hidden",
        animationDelay: animateOnMount ? `${animDelay}ms` : undefined,
        boxShadow: "0 14px 34px rgba(98, 70, 16, 0.06)",
      }}
    >
      <div
        className="inv-photo"
        style={{
          position: "relative",
          height: "clamp(190px, 52vw, 210px)",
          background: palette.bg,
          overflow: "hidden",
          borderBottom: `1px solid ${palette.border}`,
        }}
      >
        {photoSrc && (
          <Image
            src={photoSrc}
            alt={inv.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: "cover", opacity: hasLivePreview ? 1 : 0.65 }}
          />
        )}

        {!hasLivePreview && (
          <div style={{ position: "absolute", inset: 0, background: `${palette.bg}90`, mixBlendMode: "multiply" }} />
        )}
        <div style={{ position: "absolute", inset: "10px", border: `1px solid ${palette.border}`, pointerEvents: "none", zIndex: 2 }} />

        {[
          { top: "10px", left: "10px" },
          { top: "10px", right: "10px" },
          { bottom: "10px", left: "10px" },
          { bottom: "10px", right: "10px" },
        ].map((pos, i) => (
          <div key={i} style={{ position: "absolute", width: "6px", height: "6px", background: palette.primary, opacity: 0.8, zIndex: 3, ...pos }} />
        ))}

        {hasLivePreview ? (
          <>
            {inv.demoHref && (
              <Link
                href={inv.demoHref}
                aria-label={`Otvori ${inv.title}`}
                style={{ position: "absolute", inset: 0, zIndex: 4 }}
              />
            )}
            <div
              style={{
                position: "absolute",
                inset: "auto 0 0 0",
                zIndex: 5,
                padding: "2.5rem 1rem 1rem",
                background: "linear-gradient(to top, rgba(18,11,6,0.78), rgba(18,11,6,0.04))",
                pointerEvents: "none",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.15rem",
                  color: "#fffaf0",
                  letterSpacing: "0.04em",
                  lineHeight: 1.15,
                }}
              >
                {inv.title}
              </p>
              <p
                style={{
                  marginTop: "0.35rem",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,250,240,0.86)",
                }}
              >
                {inv.subtitle}
              </p>
            </div>
          </>
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", zIndex: 4 }}>
            <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "clamp(1.55rem, 6vw, 1.9rem)", color: palette.primary, lineHeight: 1, textShadow: `0 2px 16px ${palette.bg}`, textAlign: "center", padding: "0 0.75rem" }}>
              {inv.title}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "90px" }}>
              <span style={{ flex: 1, height: "1px", background: `${palette.primary}70` }} />
              <svg width="7" height="7" viewBox="0 0 8 8" fill={palette.primary} opacity={0.8}>
                <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z" />
              </svg>
              <span style={{ flex: 1, height: "1px", background: `${palette.primary}70` }} />
            </div>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: palette.text, opacity: 0.65 }}>
              {inv.subtitle}
            </p>
          </div>
        )}

        <span style={{ position: "absolute", top: "14px", right: "20px", fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.68rem", letterSpacing: "0.15em", color: palette.primary, opacity: 0.75, zIndex: 5 }}>
          {inv.year}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f6712", border: "1px solid rgba(160,121,33,0.52)", padding: "2px 10px", background: "rgba(184,151,58,0.08)" }}>
            {categoryLabels[inv.category]}
          </span>
          {inv.badges.map((badge) => (
            <span key={badge} style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#5f4510", background: "rgba(184,151,58,0.14)", padding: "2px 8px" }}>
              {badge}
            </span>
          ))}
        </div>
        <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.35rem", fontWeight: 300, color: "#2c2013", letterSpacing: "0.04em", lineHeight: 1.2 }}>
          {inv.title}
        </h2>
        <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1rem", color: "#352716", lineHeight: 1.65, fontStyle: "italic" }}>
          {inv.description}
        </p>
        <div style={{ height: "1px", background: "rgba(160,121,33,0.24)", margin: "4px 0" }} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.15rem", color: "#91670e", letterSpacing: "0.05em" }}>
            {inv.price}
          </span>
          <div className="flex w-full gap-2 sm:w-auto">
            {inv.demoHref && (
              <Link
                href={inv.demoHref}
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#8f6712",
                  background: "rgba(255,252,246,0.96)",
                  padding: "10px 18px",
                  textDecoration: "none",
                  border: "1px solid rgba(160,121,33,0.36)",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Pogledajte
              </Link>
            )}
            <Link href="/kontakt" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.8rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#fdfaf5", background: "#b8973a", padding: "10px 18px", textDecoration: "none", border: "1px solid #b8973a", textAlign: "center", width: "100%" }}>
              Narucite
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function PozivniceContent() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("cat") as Category | null) ?? "sve";
  const [activeTab, setActiveTab] = useState<FilterTab>(
    tabs.some((t) => t.key === initialCat) ? initialCat : "sve"
  );
  const [animateCards, setAnimateCards] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAnimateCards(false);
    }, 550);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const handleTabChange = useCallback((key: FilterTab) => {
    if (key === activeTab) return;
    startTransition(() => {
      setActiveTab(key);
      setAnimateCards(false);
    });
  }, [activeTab]);

  const filtered = activeTab === "sve" ? invitations : invitations.filter((inv) => inv.category === activeTab);
  const heroBg = activeTab !== "sve" ? categoryPhotos[activeTab as Category] : null;

  return (
    <main style={{ background: "linear-gradient(160deg, #fdfaf5 0%, #fef9ee 60%, #fdf6e3 100%)", overflowX: "hidden", minHeight: "60vh" }}>
      <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(160,121,33,0.28)" }}>
        <div style={{ position: "absolute", inset: 0, transition: "opacity 0.45s ease", opacity: heroBg ? 1 : 0, background: "#130e08" }}>
          {heroBg && (
            <Image src={heroBg} alt="" fill priority style={{ objectFit: "cover", opacity: 0.35 }} sizes="100vw" />
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(19,14,8,0.3) 0%, rgba(19,14,8,0.7) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, padding: "clamp(3.5rem, 11vw, 5rem) clamp(1rem, 4vw, 1.5rem) clamp(3rem, 9vw, 4rem)", transition: "color 0.3s ease" }}>
          <div className="flex flex-col items-center gap-4 text-center" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <ScrollReveal>
              <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "1.8rem", color: "rgba(184,151,58,0.9)" }}>
                Nasa kolekcija
              </p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: heroBg ? "#fdfaf5" : "#2c2013", letterSpacing: "0.06em", lineHeight: 1.15, transition: "color 0.3s ease" }}>
                Nase <em style={{ fontStyle: "italic", color: "#b8973a" }}>Pozivnice</em>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <div style={{ width: "50px", height: "1px", background: "rgba(184,151,58,0.5)" }} />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-lg sm:text-xl lg:text-2xl italic font-light leading-relaxed" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: heroBg ? "rgba(253,250,245,0.88)" : "#3c2c16", transition: "color 0.3s ease" }}>
                Svaka je jedinstvena - bas poput posebnog trenutka koji obiljezava.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(3rem, 9vw, 3.5rem) clamp(1rem, 4vw, 1.5rem) clamp(4rem, 10vw, 6rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="section-shell mb-6" style={{ padding: "clamp(1rem, 3vw, 1.25rem)" }}>
            <div className="tab-grid" role="tablist">
              {tabs.map(({ key, label }) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    className="tab-button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleTabChange(key)}
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "0.9rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "10px 14px",
                      border: isActive ? "1px solid #a67a16" : "1px solid rgba(160,121,33,0.28)",
                      background: isActive ? "linear-gradient(135deg, #b8973a, #9f7414)" : "rgba(255,252,246,0.88)",
                      color: isActive ? "#fffaf0" : "#5b430f",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                      width: "100%",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-center mb-8" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(0.85rem, 3.5vw, 0.95rem)", letterSpacing: "0.12em", color: "rgba(80,58,21,0.8)", textTransform: "uppercase" }}>
            {filtered.length} {filtered.length === 1 ? "dizajn" : "dizajna"}
          </p>

          <div>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {filtered.map((inv, i) => (
                  <InvitationCard
                    key={inv.id}
                    inv={inv}
                    animDelay={i * 50}
                    animateOnMount={animateCards}
                    priority={i < 2}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-20" style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", fontStyle: "italic", color: "#7a6030" }}>
                  Nema pozivnica u ovoj kategoriji.
                </p>
              </div>
            )}
          </div>

          <ScrollReveal style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", textAlign: "center", marginTop: "clamp(3.5rem, 10vw, 5rem)", paddingTop: "clamp(2.25rem, 8vw, 3rem)", borderTop: "1px solid rgba(184,151,58,0.2)" }}>
            <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "1.6rem", color: "rgba(184,151,58,0.8)" }}>Ne vidite sto trazite?</p>
            <p className="text-lg sm:text-xl italic" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "#5c4a2a", maxWidth: "500px", lineHeight: 1.7 }}>
              Kreiramo i po narudzbi. Javite nam se sa vasim idejama - bez obaveza.
            </p>
            <Link href="/kontakt" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.95rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#fdfaf5", background: "#b8973a", padding: "13px 28px", textDecoration: "none", border: "1px solid #b8973a", width: "100%", maxWidth: "320px", textAlign: "center" }}>
              Kontaktirajte Nas
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

export default function PozivnicePage() {
  return (
    <Suspense>
      <PozivniceContent />
    </Suspense>
  );
}
