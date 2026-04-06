"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/pozivnice", label: "Pozivnice" },
  { href: "/o-nama", label: "O Nama" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMenuVisible(true);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setMenuVisible(false);
      closeTimerRef.current = null;
    }, 320);
  };

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
      return;
    }
    openMenu();
  };

  return (
    <header
      className="site-header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
      }}
    >
      <div
        className="header-inner"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(1rem, 4vw, 1.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "clamp(64px, 10vw, 72px)",
          gap: "0.75rem",
          zIndex: 2,
        }}
      >
        {/* Logo */}
        <Link href="/" className="nav-logo-link" style={{ textDecoration: "none", lineHeight: 0, minWidth: 0, flexShrink: 1 }}>
          <Logo compact />
        </Link>

        {/* Desktop nav links */}
        <nav
          className="nav-surface hidden sm:flex"
          style={{ alignItems: "center", gap: "2.5rem" }}
        >
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link-fancy${active ? " is-active" : ""}`}
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: active ? "#9f7414" : "#2f2415",
                  textDecoration: "none",
                  paddingBottom: "2px",
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
          className="nav-cta hidden sm:inline-block"
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
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          style={{
            background: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(184,151,58,0.32)",
            cursor: "pointer",
            padding: "10px 9px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            boxShadow: "0 10px 22px rgba(93, 65, 14, 0.08)",
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
      {menuVisible && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            className={`mobile-nav-backdrop ${menuOpen ? "is-open" : "is-closing"}`}
            onClick={closeMenu}
          />
          <nav
            className={`mobile-nav-panel sm:hidden ${menuOpen ? "is-open" : "is-closing"}`}
            style={{
              position: "fixed",
              top: "clamp(64px, 10vw, 72px)",
              left: "0",
              right: "0",
              bottom: "0",
              borderTop: "1px solid rgba(184,151,58,0.28)",
              background: "linear-gradient(180deg, rgba(253,250,245,0.99), rgba(251,245,233,0.98))",
              padding: "1.25rem clamp(1rem, 4vw, 1.5rem) max(1.5rem, env(safe-area-inset-bottom))",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              overflowY: "auto",
            }}
          >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`mobile-nav-link ${menuOpen ? "is-open" : "is-closing"}`}
              onClick={closeMenu}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.15rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: pathname === href ? "#9f7414" : "#2f2415",
                textDecoration: "none",
                padding: "0.2rem 0",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/o-nama#kontakt"
            className={`mobile-nav-link nav-cta ${menuOpen ? "is-open" : "is-closing"}`}
            onClick={closeMenu}
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "0.95rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#fdfaf5",
              background: "#b8973a",
              padding: "12px 20px",
              textDecoration: "none",
              textAlign: "center",
              marginTop: "0.5rem",
              width: "100%",
            }}
          >
            Naručite
          </Link>
        </nav>
        </>
      )}
    </header>
  );
}
