"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/pozivnice", label: "Pozivnice" },
  { href: "/o-nama", label: "O Nama" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        background: "rgba(253,250,245,0.97)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(184,151,58,0.22)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", lineHeight: 0 }}>
          <Logo compact />
        </Link>

        {/* Desktop nav links */}
        <nav
          className="hidden sm:flex"
          style={{ alignItems: "center", gap: "2.5rem" }}
        >
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: active ? "#b8973a" : "#3a2e1e",
                  textDecoration: "none",
                  borderBottom: active
                    ? "1px solid #b8973a"
                    : "1px solid transparent",
                  paddingBottom: "2px",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/o-nama#kontakt"
          className="hidden sm:inline-block"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "0.9rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#fdfaf5",
            background: "#b8973a",
            padding: "8px 22px",
            textDecoration: "none",
            border: "1px solid #b8973a",
          }}
        >
          Naručite
        </Link>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "#3a2e1e",
                transition: "all 0.2s",
                transformOrigin: "center",
                transform:
                  menuOpen && i === 0
                    ? "translateY(7px) rotate(45deg)"
                    : menuOpen && i === 2
                    ? "translateY(-7px) rotate(-45deg)"
                    : menuOpen && i === 1
                    ? "scaleX(0)"
                    : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          className="sm:hidden"
          style={{
            borderTop: "1px solid rgba(184,151,58,0.2)",
            background: "rgba(253,250,245,0.99)",
            padding: "1rem 1.5rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.15rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: pathname === href ? "#b8973a" : "#3a2e1e",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/o-nama#kontakt"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "0.95rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#fdfaf5",
              background: "#b8973a",
              padding: "10px 20px",
              textDecoration: "none",
              textAlign: "center",
              marginTop: "0.5rem",
            }}
          >
            Naručite
          </Link>
        </nav>
      )}
    </header>
  );
}
