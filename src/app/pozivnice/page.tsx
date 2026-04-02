"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { invitations, categoryLabels, type Category } from "@/data/invitations";
import ScrollReveal from "@/components/ScrollReveal";

type FilterTab = "sve" | Category;

const tabs: { key: FilterTab; label: string }[] = [
  { key: "sve", label: "Sve" },
  { key: "vjencanje", label: "Vjencanja" },
  { key: "rodjendan", label: "Rodjendani" },
  { key: "matura", label: "Mature" },
  { key: "korporativno", label: "Korporativno" },
];

/* Category hero photos — used in the page header when a filter is active */
const categoryPhotos: Record<Category, string> = {
  vjencanje:    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=700&fit=crop&q=80",
  rodjendan:    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&h=700&fit=crop&q=80",
  matura:       "https://images.unsplash.com/photo-1627556704283-048526b4eb5a?w=1600&h=700&fit=crop&q=80",
  korporativno: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=700&fit=crop&q=80",
};

/* Per-invitation accent photos in each card preview */
const invitationPhotos: Record<string, string> = {
  "zlatna-elegancija": "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&h=500&fit=crop&q=75",
  "bijela-ruza":       "https://images.unsplash.com/photo-1529636798-29ea53b93b5a?w=700&h=500&fit=crop&q=75",
  "midnight-luxury":   "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=700&h=500&fit=crop&q=75",
  "proljecno-slavlje": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&h=500&fit=crop&q=75",
  "elegantni-18":      "https://images.unsplash.com/photo-1464349153735-2cb6ef12c2bb?w=700&h=500&fit=crop&q=75",
  "veseli-rodjendan":  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&h=500&fit=crop&q=75",
  "maturska-noc":      "https://images.unsplash.com/photo-1627556704283-048526b4eb5a?w=700&h=500&fit=crop&q=75",
  "korporativni-gala": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&h=500&fit=crop&q=75",
};

function InvitationCard({ inv, animDelay }: { inv: (typeof invitations)[number]; animDelay: number }) {
  const { palette } = inv;
  const photoSrc = invitationPhotos[inv.id];

  return (
    <article
      className="inv-card card-appear"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(184,151,58,0.25)",
        background: "rgba(253,250,245,0.96)",
        overflow: "hidden",
        animationDelay: `${animDelay}ms`,
      }}
    >
      {/* Photo preview area */}
      <div
        className="inv-photo"
        style={{
          position: "relative",
          height: "210px",
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: "cover", opacity: 0.65 }}
          />
        )}

        {/* Colored overlay matching palette */}
        <div style={{ position: "absolute", inset: 0, background: `${palette.bg}90`, mixBlendMode: "multiply" }} />

        {/* Inner border */}
        <div style={{ position: "absolute", inset: "10px", border: `1px solid ${palette.border}`, pointerEvents: "none", zIndex: 2 }} />

        {/* Corner dots  */}
        {[
          { top: "10px", left: "10px" },
          { top: "10px", right: "10px" },
          { bottom: "10px", left: "10px" },
          { bottom: "10px", right: "10px" },
        ].map((pos, i) => (
          <div key={i} style={{ position: "absolute", width: "6px", height: "6px", background: palette.primary, opacity: 0.8, zIndex: 3, ...pos }} />
        ))}

        {/* Centred title overlay */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", zIndex: 4 }}>
          <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "1.9rem", color: palette.primary, lineHeight: 1, textShadow: `0 2px 16px ${palette.bg}` }}>
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

        {/* Year badge */}
        <span style={{ position: "absolute", top: "14px", right: "20px", fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.68rem", letterSpacing: "0.15em", color: palette.primary, opacity: 0.75, zIndex: 5 }}>
          {inv.year}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#b8973a", border: "1px solid rgba(184,151,58,0.45)", padding: "2px 10px" }}>
            {categoryLabels[inv.category]}
          </span>
          {inv.badges.map((badge) => (
            <span key={badge} style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#7a6030", background: "rgba(184,151,58,0.1)", padding: "2px 8px" }}>
              {badge}
            </span>
          ))}
        </div>
        <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.35rem", fontWeight: 300, color: "#2c2013", letterSpacing: "0.04em", lineHeight: 1.2 }}>
          {inv.title}
        </h2>
        <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1rem", color: "#5c4a2a", lineHeight: 1.65, fontStyle: "italic" }}>
          {inv.description}
        </p>
        <div style={{ height: "1px", background: "rgba(184,151,58,0.2)", margin: "4px 0" }} />
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.15rem", color: "#b8973a", letterSpacing: "0.05em" }}>
            {inv.price}
          </span>
          <Link href="/o-nama#kontakt" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.8rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#fdfaf5", background: "#b8973a", padding: "7px 18px", textDecoration: "none", border: "1px solid #b8973a" }}>
            Narucite
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function PozivnicePage() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("cat") as Category | null) ?? "sve";
  const [activeTab, setActiveTab] = useState<FilterTab>(
    tabs.some((t) => t.key === initialCat) ? initialCat : "sve"
  );
  /* filterKey changes each time tab changes — triggers re-mount + animation */
  const [filterKey, setFilterKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("cat") as Category | null;
    if (cat && tabs.some((t) => t.key === cat)) setActiveTab(cat);
  }, [searchParams]);

  const handleTabChange = useCallback((key: FilterTab) => {
    if (key === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(key);
      setFilterKey((k) => k + 1);
      setIsTransitioning(false);
    }, 200);
  }, [activeTab]);

  const filtered = activeTab === "sve" ? invitations : invitations.filter((inv) => inv.category === activeTab);
  const heroBg = activeTab !== "sve" ? categoryPhotos[activeTab as Category] : null;

  return (
    <main style={{ background: "linear-gradient(160deg, #fdfaf5 0%, #fef9ee 60%, #fdf6e3 100%)", overflowX: "hidden", minHeight: "60vh" }}>

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(184,151,58,0.2)" }}>
        {/* Background photo — fades on category change */}
        <div style={{ position: "absolute", inset: 0, transition: "opacity 0.7s ease", opacity: heroBg ? 1 : 0, background: "#130e08" }}>
          {heroBg && (
            <Image src={heroBg} alt="" fill priority style={{ objectFit: "cover", opacity: 0.35 }} sizes="100vw" />
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(19,14,8,0.3) 0%, rgba(19,14,8,0.7) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem 4rem", transition: "color 0.4s" }}>
          <div className="flex flex-col items-center gap-4 text-center" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <ScrollReveal>
              <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "1.8rem", color: "rgba(184,151,58,0.9)" }}>
                Nasa kolekcija
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="text-5xl sm:text-6xl font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: heroBg ? "#fdfaf5" : "#2c2013", letterSpacing: "0.06em", lineHeight: 1.15, transition: "color 0.4s ease" }}>
                Nase <em style={{ fontStyle: "italic", color: "#b8973a" }}>Pozivnice</em>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div style={{ width: "50px", height: "1px", background: "rgba(184,151,58,0.5)" }} />
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-xl sm:text-2xl italic font-light leading-relaxed" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: heroBg ? "rgba(253,250,245,0.8)" : "#5c4a2a", transition: "color 0.4s ease" }}>
                Svaka je jedinstvena — bas poput posebnog trenutka koji obiljezava.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ FILTER + GALLERY ══ */}
      <section style={{ padding: "3.5rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-4" role="tablist">
            {tabs.map(({ key, label }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabChange(key)}
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "0.9rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    padding: "9px 24px",
                    border: isActive ? "1px solid #b8973a" : "1px solid rgba(184,151,58,0.35)",
                    background: isActive ? "#b8973a" : "transparent",
                    color: isActive ? "#fdfaf5" : "#7a6030",
                    cursor: "pointer",
                    transition: "all 0.22s ease",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Count */}
          <p className="text-center mb-8" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.95rem", letterSpacing: "0.12em", color: "rgba(92,74,42,0.6)", textTransform: "uppercase" }}>
            {filtered.length} {filtered.length === 1 ? "dizajn" : "dizajna"}
          </p>

          {/* Grid — fades during transition */}
          <div
            key={filterKey}
            style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? "translateY(8px)" : "translateY(0)", transition: "opacity 0.2s ease, transform 0.2s ease" }}
          >
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((inv, i) => (
                  <InvitationCard key={inv.id} inv={inv} animDelay={i * 60} />
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

          {/* Bottom CTA */}
          <ScrollReveal style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", textAlign: "center", marginTop: "5rem", paddingTop: "3rem", borderTop: "1px solid rgba(184,151,58,0.2)" }}>
            <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "1.6rem", color: "rgba(184,151,58,0.8)" }}>Ne vidite sto trazite?</p>
            <p className="text-xl italic" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "#5c4a2a", maxWidth: "500px", lineHeight: 1.7 }}>
              Kreiramo i po narudzbi. Javite nam se sa vasim idejama — bez obaveza.
            </p>
            <Link href="/o-nama#kontakt" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.95rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#fdfaf5", background: "#b8973a", padding: "13px 36px", textDecoration: "none", border: "1px solid #b8973a" }}>
              Kontaktirajte Nas
            </Link>
          </ScrollReveal>

        </div>
      </section>
    </main>
  );
}
