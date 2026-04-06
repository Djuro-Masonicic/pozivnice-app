import Link from "next/link";
import Logo from "./Logo";

const footerLinks = [
  { href: "/pocetna", label: "Početna" },
  { href: "/pozivnice", label: "Pozivnice" },
  { href: "/o-nama", label: "O Nama" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#130e08",
        borderTop: "1px solid rgba(184,151,58,0.25)",
        padding: "clamp(2.75rem, 9vw, 3.5rem) clamp(1rem, 4vw, 1.5rem) clamp(2rem, 7vw, 2.5rem)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.75rem",
          textAlign: "center",
        }}
      >
        <Logo compact className="opacity-90" />

        <p
          style={{
            fontFamily: "var(--font-great-vibes), cursive",
            fontSize: "clamp(1.15rem, 5vw, 1.35rem)",
            color: "rgba(184,151,58,0.7)",
            lineHeight: 1,
          }}
        >
          Vaše priče, naše pozivnice
        </p>

        <div
          style={{
            width: "60px",
            height: "1px",
            background: "rgba(184,151,58,0.4)",
          }}
        />

        <nav style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.9rem 1.5rem", maxWidth: "520px" }}>
          {footerLinks.map(({ href, label }) => (
            <Link
              key={`${href}-${label}`}
              href={href}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(0.78rem, 3.2vw, 0.875rem)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(253,250,245,0.5)",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div
          style={{
            width: "60px",
            height: "1px",
            background: "rgba(184,151,58,0.2)",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(0.72rem, 3vw, 0.8rem)",
            color: "rgba(253,250,245,0.25)",
            letterSpacing: "0.08em",
            lineHeight: 1.6,
          }}
        >
          © 2026 e-pozivnice.me &mdash; Sva prava zadržana
        </p>
      </div>
    </footer>
  );
}
