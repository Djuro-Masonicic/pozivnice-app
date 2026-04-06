"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

const HEADER_HEIGHT = "72px";

const navLinks = [
  { href: "/pocetna", label: "Početna" },
  { href: "/pozivnice", label: "Pozivnice" },
  { href: "/o-nama", label: "O Nama" },
];

export default function NavbarResponsive() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const openMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMenuMounted(true);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setMenuMounted(false);
      closeTimerRef.current = null;
    }, 220);
  };

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
      return;
    }
    openMenu();
  };

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 80,
          background: "rgba(253,250,245,0.96)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(184,151,58,0.22)",
          boxShadow: "0 10px 26px rgba(72,48,12,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            height: HEADER_HEIGHT,
            padding: "0 clamp(1rem, 4vw, 1.5rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Link
            href="/pocetna"
            style={{
              textDecoration: "none",
              lineHeight: 0,
              minWidth: 0,
              maxWidth: "146px",
              overflow: "hidden",
              flexShrink: 1,
            }}
          >
            <Logo compact />
          </Link>

          <nav className="hidden md:flex" style={{ alignItems: "center", gap: "2rem" }}>
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "0.95rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: active ? "#9f7414" : "#2f2415",
                    textDecoration: "none",
                    borderBottom: active ? "1px solid rgba(159,116,20,0.7)" : "1px solid transparent",
                    paddingBottom: "2px",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/kontakt"
            className="hidden md:inline-block"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "0.9rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#fdfaf5",
              background: "#b8973a",
              padding: "10px 22px",
              textDecoration: "none",
              border: "1px solid #b8973a",
            }}
          >
            Naručite
          </Link>

          <button
            className="grid place-items-center md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            style={{
              width: "44px",
              height: "44px",
              border: "1px solid rgba(184,151,58,0.28)",
              background: "rgba(255,255,255,0.72)",
              cursor: "pointer",
              padding: 0,
              boxShadow: "0 8px 20px rgba(72,48,12,0.08)",
              flexShrink: 0,
            }}
          >
            <span style={{ position: "relative", width: "22px", height: "16px", display: "block" }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    left: 0,
                    width: "22px",
                    height: "2px",
                    background: "#2f2415",
                    transition: "transform 0.2s ease, opacity 0.2s ease",
                    top: i === 0 ? "0px" : i === 1 ? "7px" : "14px",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                    transform:
                      menuOpen && i === 0
                        ? "translateY(7px) rotate(45deg)"
                        : menuOpen && i === 2
                          ? "translateY(-7px) rotate(-45deg)"
                          : "none",
                  }}
                />
              ))}
            </span>
          </button>
        </div>
      </header>

      {menuMounted && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            className={menuOpen ? "navbar-backdrop navbar-backdrop-open" : "navbar-backdrop navbar-backdrop-close"}
            onClick={closeMenu}
          />

          <nav
            className={menuOpen ? "navbar-mobile-panel navbar-mobile-panel-open" : "navbar-mobile-panel navbar-mobile-panel-close"}
            style={{ top: HEADER_HEIGHT }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "420px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
              }}
            >
              {navLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="navbar-mobile-link"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.2rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: active ? "#9f7414" : "#2f2415",
                      textDecoration: "none",
                      padding: "0.95rem 1rem",
                      border: "1px solid rgba(184,151,58,0.2)",
                      background: active ? "rgba(184,151,58,0.12)" : "rgba(255,252,246,0.9)",
                    }}
                  >
                    {label}
                  </Link>
                );
              })}

              <Link
                href="/kontakt"
                onClick={closeMenu}
                className="navbar-mobile-link"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#fdfaf5",
                  background: "#b8973a",
                  padding: "1rem 1.1rem",
                  textDecoration: "none",
                  textAlign: "center",
                  border: "1px solid #b8973a",
                  marginTop: "0.35rem",
                }}
              >
                Naručite
              </Link>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
