import Logo from "@/components/Logo";

const sparkles = [
  { top: "8%",   left: "6%",   delay: "0s",   size: 22 },
  { top: "18%",  left: "90%",  delay: "1.2s", size: 18 },
  { top: "52%",  left: "3%",   delay: "2.4s", size: 24 },
  { top: "72%",  left: "92%",  delay: "0.6s", size: 20 },
  { top: "35%",  left: "95%",  delay: "3.1s", size: 16 },
  { top: "84%",  left: "5%",   delay: "1.8s", size: 20 },
  { top: "4%",   left: "52%",  delay: "2.9s", size: 16 },
  { top: "92%",  left: "46%",  delay: "0.4s", size: 18 },
  { top: "62%",  left: "88%",  delay: "1.6s", size: 14 },
  { top: "44%",  left: "4%",   delay: "3.5s", size: 14 },
];

export default function Home() {
  return (
    <>
      <main
        className="relative flex flex-col items-center justify-center px-6 py-12 overflow-x-hidden"
        style={{ minHeight: "100%", background: "linear-gradient(160deg, #fdfaf5 0%, #fef9ee 50%, #fdf6e3 100%)" }}
      >

        {/* ── Twinkling sparkles (fixed overlay – never clipped) ── */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0" style={{ zIndex: 10 }}>
          {sparkles.map((s, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: s.top,
                left: s.left,
                animation: `twinkle 3.5s ease-in-out infinite ${s.delay}`,
              }}
            >
              <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="#b8973a">
                <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
              </svg>
            </div>
          ))}
        </div>

        {/* ── Bordered frame wrapping all content ── */}
        <div
          className="relative w-full max-w-4xl mx-auto my-8 sm:my-12"
          style={{ zIndex: 3, animation: "fade-in-up 1s ease both", animationDelay: "0.1s" }}
        >
          {/* Outer border */}
          <div
            className="absolute inset-0 animate-border-shimmer"
            style={{ border: "1.5px solid rgba(184,151,58,0.65)" }}
          />
          {/* Inner border */}
          <div
            className="absolute inset-[10px] animate-border-shimmer-delay"
            style={{ border: "1px solid rgba(184,151,58,0.32)" }}
          />

          {/* Corner ornaments */}
          {[
            "top-0 left-0",
            "top-0 right-0 rotate-90",
            "bottom-0 right-0 rotate-180",
            "bottom-0 left-0 -rotate-90",
          ].map((pos, i) => (
            <svg
              key={i}
              aria-hidden="true"
              width="28" height="28"
              viewBox="0 0 28 28"
              className={`absolute pointer-events-none ${pos}`}
              style={{ color: "#b8973a" }}
            >
              <path d="M2 2 L2 12 M2 2 L12 2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <circle cx="2" cy="2" r="2" fill="currentColor" />
            </svg>
          ))}

          {/* Content with padding to sit inside both borders */}
          <div className="relative flex flex-col items-center gap-7 text-center px-10 sm:px-16 py-12 sm:py-16">

            {/* Logo */}
            <div style={{ animation: "reveal 0.8s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "0.3s" }}>
              <div style={{ animation: "logo-breathe 4s ease-in-out infinite 2s" }}>
                <Logo />
              </div>
            </div>

            {/* Script coming soon */}
            <p
              className="text-3xl sm:text-4xl italic"
              style={{
                fontFamily: "var(--font-great-vibes), cursive",
                letterSpacing: "0.02em",
                color: "#b8973a",
                animation: "reveal 0.8s cubic-bezier(0.22,1,0.36,1) both, text-shimmer 2.5s ease-in-out infinite, glow-pulse 3s ease-in-out infinite",
                animationDelay: "0.65s, 2s, 2s",
              }}
            >
              Coming Soon
            </p>

            {/* Main serif heading */}
            <h1
              className="text-5xl sm:text-7xl font-light tracking-wide leading-tight"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                color: "#2c2013",
                animation: "reveal 0.8s cubic-bezier(0.22,1,0.36,1) both",
                animationDelay: "1.0s",
              }}
            >
              Web{" "}
              <em style={{ fontStyle: "italic", color: "#b8973a" }}>Pozivnice</em>
              <br />
              <span
                className="font-light text-4xl sm:text-5xl uppercase"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "#2c2013", letterSpacing: "0.25em" }}
              >
                Kreirane za Vas
              </span>
            </h1>

            {/* Gold ornament divider */}
            <div
              className="flex items-center gap-4 w-full max-w-xs"
              style={{ animation: "reveal 0.8s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "1.35s" }}
            >
              <span className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #b8973a)" }} />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#b8973a" style={{ animation: "gold-pulse 2.8s ease-in-out infinite 2s" }}>
                <path d="M12 2l2.09 6.26L20 9.27l-4.91 4.77L16.18 20 12 16.77 7.82 20l1.09-5.96L4 9.27l5.91-.01z" />
              </svg>
              <span className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #b8973a)" }} />
            </div>

            {/* Subtitle */}
            <p
              className="text-xl sm:text-2xl italic font-light leading-relaxed max-w-lg"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                color: "#5c4a2a",
                animation: "reveal 0.8s cubic-bezier(0.22,1,0.36,1) both",
                animationDelay: "1.65s",
              }}
            >
              Pripremamo nešto zaista posebno — odabranu kolekciju elegantnih digitalnih
              pozivnica za najdragocjenije trenutke Vašeg života.
            </p>

            {/* Occasion chips */}
            <div
              className="flex flex-wrap justify-center gap-2 pt-2"
              style={{ animation: "reveal 0.8s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "1.95s" }}
            >
              {["Vjenčanja", "Rođendani", "Mature", "Korporativno"].map((tag) => (
                <span
                  key={tag}
                  className="px-5 py-1.5 text-sm uppercase"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    border: "1px solid rgba(184,151,58,0.45)",
                    color: "#7a6030",
                    background: "rgba(255,251,235,0.75)",
                    letterSpacing: "0.15em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom script note */}
            <p
              className="text-xl italic mt-2"
              style={{
                fontFamily: "var(--font-great-vibes), cursive",
                color: "rgba(184,151,58,0.8)",
                animation: "reveal 0.8s cubic-bezier(0.22,1,0.36,1) both",
                animationDelay: "2.25s",
              }}
            >
              Ostanite s nama — stiže nešto nezaboravno
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
