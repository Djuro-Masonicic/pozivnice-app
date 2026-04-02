import Link from "next/link";
import Logo from "./Logo";

const footerLinks = [
  { href: "/", label: "Početna" },
  { href: "/pozivnice", label: "Pozivnice" },
  { href: "/o-nama", label: "O Nama" },
  { href: "/o-nama#kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#130e08",
        borderTop: "1px solid rgba(184,151,58,0.25)",
        padding: "3.5rem 1.5rem 2.5rem",
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
        {/* Logo */}
        <Logo compact className="opacity-90" />

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-great-vibes), cursive",
            fontSize: "1.35rem",
            color: "rgba(184,151,58,0.7)",
            lineHeight: 1,
          }}
        >
          Vaše priče, naše pozivnice
        </p>

        {/* Gold divider */}
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "rgba(184,151,58,0.4)",
          }}
        />

        {/* Nav links */}
        <nav style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
          {footerLinks.map(({ href, label }) => (
            <Link
              key={`${href}-${label}`}
              href={href}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "0.875rem",
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

        {/* Gold divider */}
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "rgba(184,151,58,0.2)",
          }}
        />

        {/* Copyright */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "0.8rem",
            color: "rgba(253,250,245,0.25)",
            letterSpacing: "0.08em",
          }}
        >
          © 2026 e-pozivnice.me &mdash; Sva prava zadržana
        </p>
      </div>
    </footer>
  );
}
