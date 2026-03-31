export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className ?? ""}`}>
      {/* Envelope + sparkle icon */}
      <svg
        viewBox="0 0 220 155"
        xmlns="http://www.w3.org/2000/svg"
        className="w-32 h-auto"
        aria-hidden="true"
      >
        {/* Envelope body */}
        <rect
          x="12" y="18" width="188" height="122" rx="3"
          fill="none" stroke="#3a3530" strokeWidth="2.5"
        />
        {/* Top V-flap */}
        <polyline
          points="12,18 106,95 200,18"
          fill="none" stroke="#3a3530" strokeWidth="2"
        />
        {/* Bottom side folds — gold */}
        <line x1="12"  y1="140" x2="70"  y2="100" stroke="#b8973a" strokeWidth="1.8" />
        <line x1="200" y1="140" x2="142" y2="100" stroke="#b8973a" strokeWidth="1.8" />

        {/* Sparkle (4-pointed star) — top right of envelope */}
        <g stroke="#b8973a" strokeLinecap="round" fill="none">
          <line x1="208" y1="3"  x2="208" y2="24" strokeWidth="1.8" />
          <line x1="197" y1="13" x2="219" y2="13" strokeWidth="1.8" />
          <line x1="200" y1="6"  x2="216" y2="20" strokeWidth="1.3" />
          <line x1="216" y1="6"  x2="200" y2="20" strokeWidth="1.3" />
        </g>
        {/* Small decorative squares */}
        <rect x="186" y="5"  width="6" height="6" fill="#b8973a" />
        <rect x="193" y="0"  width="4" height="4" fill="#b8973a" opacity="0.65" />
      </svg>

      {/* Brand text */}
      <div className="flex items-baseline mt-1">
        <span
          style={{
            fontFamily: "var(--font-great-vibes), cursive",
            fontSize: "2.4rem",
            color: "#b8973a",
            lineHeight: 1,
            letterSpacing: "0.01em",
          }}
        >
          e-pozivnice
        </span>
        <span
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.75rem",
            color: "#3a3530",
            lineHeight: 1,
            marginLeft: "1px",
          }}
        >
          .me
        </span>
      </div>
    </div>
  );
}
