"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode, CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── constants ────────────────────────────────────────────────────
const SECTIONS = ["hero", "about", "weddings", "birthdays", "contact"] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Envelope Hero ──────────────────────────────────────────────
type Phase = "idle" | "flying" | "settled" | "opening" | "rising" | "expanding" | "revealed";

function EnvelopeHero({ onDone }: { onDone?: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const go = (ms: number, p: Phase) => setTimeout(() => setPhase(p), ms);
    const timers = [
      go(80,   "flying"),
      go(1000, "settled"),
      go(1700, "opening"),
      go(2600, "rising"),
      go(4000, "expanding"),
      go(5600, "revealed"),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === "revealed" && onDone) onDone();
  }, [phase, onDone]);

  const W = 340, H = 220;
  const PW = W - 40; // 300 — paper slightly narrower than envelope
  const PH = H - 40; // 180 — paper slightly shorter than envelope

  const isOpening = phase === "opening" || phase === "rising" || phase === "expanding";
  const showEnvelope = phase !== "revealed";
  const showInnerPaper = phase === "opening";     // cream paper visible inside when lid opens
  const showJumpingPaper = phase === "rising";   // same paper, now a sibling at z:20

  // Envelope wrapper opacity:
  // idle → hidden, flying → let animation handle, expanding → fade out, else → visible
  const envelopeOpacityStyle =
    phase === "idle"      ? { opacity: 0 } :
    phase === "flying"    ? {} :               // animation owns opacity
    phase === "expanding" ? { opacity: 0, transition: "opacity 0.8s ease" } :
                            { opacity: 1 };

  // Full-screen paper — hidden until expanding keyframe fires, then static full-screen
  const fullClipPath = phase === "revealed" ? "inset(0px 0px)" : "inset(50% 50%)";
  const fullAnimation = phase === "expanding"
    ? "paper-expand 1.6s cubic-bezier(0.7,0,0.3,1) forwards"
    : undefined;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>

      {/* ── FULL-SCREEN PAPER (z:5) ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "#f8f4ee",
        zIndex: 5,
        clipPath: fullClipPath,
        animation: fullAnimation,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {phase === "revealed" && (
          <>
            <div aria-hidden="true" className="grain-overlay" style={{ opacity: 0.07 }} />
            <div id="hero-content" className="hero-content-pad" style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "1.1rem", textAlign: "center",
              position: "relative", zIndex: 1,
            }}>
              {/* Animated border — dot at top-center, expands both sides */}
              {/* Dot */}
              <span aria-hidden="true" style={{
                position: "absolute", top: -20, left: "50%",
                width: 6, height: 6, borderRadius: "50%",
                background: "#c4896f",
                boxShadow: "0 0 8px 2px rgba(196,137,111,0.6)",
                pointerEvents: "none",
                animation: "border-dot 0.4s ease-out both 2600ms",
              }} />
              {/* Top-left half: right edge = dot, grows leftward */}
              <span aria-hidden="true" style={{
                position: "absolute", top: -21, left: -20,
                width: "calc(50% + 20px)", height: 2,
                background: "rgba(196,137,111,0.35)",
                pointerEvents: "none",
                transformOrigin: "right",
                animation: "border-h 0.4s ease-out both 2900ms",
              }} />
              {/* Top-right half: left edge = dot, grows rightward */}
              <span aria-hidden="true" style={{
                position: "absolute", top: -21, right: -20,
                width: "calc(50% + 20px)", height: 2,
                background: "rgba(196,137,111,0.35)",
                pointerEvents: "none",
                transformOrigin: "left",
                animation: "border-h 0.4s ease-out both 2900ms",
              }} />
              {/* Left side: grows down from top-left corner */}
              <span aria-hidden="true" style={{
                position: "absolute", top: -20, left: -21,
                width: 2, height: "calc(100% + 40px)",
                background: "rgba(196,137,111,0.35)",
                pointerEvents: "none",
                transformOrigin: "top",
                animation: "border-v 0.4s ease-out both 3300ms",
              }} />
              {/* Right side: grows down from top-right corner */}
              <span aria-hidden="true" style={{
                position: "absolute", top: -20, right: -21,
                width: 2, height: "calc(100% + 40px)",
                background: "rgba(196,137,111,0.35)",
                pointerEvents: "none",
                transformOrigin: "top",
                animation: "border-v 0.4s ease-out both 3300ms",
              }} />
              {/* Bottom-left half: grows from left corner toward center */}
              <span aria-hidden="true" style={{
                position: "absolute", bottom: -21, left: -20,
                width: "calc(50% + 20px)", height: 2,
                background: "rgba(196,137,111,0.35)",
                pointerEvents: "none",
                transformOrigin: "left",
                animation: "border-h 0.4s ease-out both 3700ms",
              }} />
              {/* Bottom-right half: grows from right corner toward center */}
              <span aria-hidden="true" style={{
                position: "absolute", bottom: -21, right: -20,
                width: "calc(50% + 20px)", height: 2,
                background: "rgba(196,137,111,0.35)",
                pointerEvents: "none",
                transformOrigin: "right",
                animation: "border-h 0.4s ease-out both 3700ms",
              }} />

              {/* "Dobro došli" — script, types in */}
              <p style={{
                fontFamily: "var(--font-great-vibes), cursive",
                fontSize: "clamp(1rem, 2.5vw, 1.6rem)", color: "#c4896f", margin: 0,
                whiteSpace: "nowrap",
                animation: "type-in 0.7s steps(12, end) both 0ms",
              }}>Dobro došli</p>

              {/* "e‑pozivnice" — heading, types in */}
              <h1 style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(3.5rem, 11vw, 9rem)", fontWeight: 400,
                color: "#1a1208", lineHeight: 0.92, letterSpacing: "-0.03em", margin: 0,
                whiteSpace: "nowrap",
                animation: "type-in 0.8s steps(12, end) both 350ms",
              }}>e‑pozivnice</h1>

              {/* Divider — fades in */}
              <div style={{
                display: "flex", alignItems: "center", gap: "1rem",
                width: "100%", maxWidth: "360px",
                animation: "hero-text-in 0.6s cubic-bezier(0.22,1,0.36,1) both 900ms",
              }}>
                <span style={{ flex: 1, height: "1px", background: "rgba(196,137,111,0.3)" }} />
                <span style={{
                  fontFamily: "var(--font-cormorant), serif", fontSize: "0.62rem",
                  letterSpacing: "0.38em", textTransform: "uppercase",
                  color: "rgba(26,18,8,0.28)",
                }}>Montenegro</span>
                <span style={{ flex: 1, height: "1px", background: "rgba(196,137,111,0.3)" }} />
              </div>

              {/* Subtitle — types in, no italic */}
              <p style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(1rem, 1.9vw, 1.2rem)",
                color: "rgba(26,18,8,0.5)", lineHeight: 1.8, margin: 0,
                maxWidth: "440px",
                animation: "type-in 1.1s steps(52, end) both 1050ms",
              }}>
                Elegantne digitalne pozivnice za svaki poseban trenutak.
              </p>

              {/* CTA button — fades in */}
              <button
                onClick={() => scrollTo("about")}
                className="hero-btn"
                style={{
                  marginTop: "0.2rem", fontFamily: "var(--font-cormorant), serif",
                  fontSize: "0.75rem", letterSpacing: "0.32em",
                  textTransform: "uppercase", color: "#1a1208",
                  background: "none", border: "1px solid rgba(26,18,8,0.2)",
                  padding: "13px 38px", cursor: "pointer",
                  animation: "hero-text-in 0.8s cubic-bezier(0.22,1,0.36,1) both 2400ms",
                }}
              >Otkrijte više</button>
            </div>
          </>
        )}
      </div>

      {/* ── ENVELOPE WRAPPER (z:10) — contains all envelope layers ── */}
      {showEnvelope && (
        <div style={{
          position: "absolute",
          width: W, height: H,
          zIndex: 10,
          perspective: "700px",
          ...envelopeOpacityStyle,
          animation: phase === "flying"
            ? "env-fly-in 0.65s cubic-bezier(0.22,1,0.36,1) both"
            : undefined,
        }}>

          {/* z:1 — dark back panel */}
          <div style={{
            position: "absolute", inset: 0,
            background: "#1e140b",
            border: "1px solid rgba(196,137,111,0.35)",
            borderRadius: "2px",
            zIndex: 1,
          }} />

          {/* z:2 — inner paper (sits behind the front-face triangles) */}
          {showInnerPaper && (
            <div style={{
              position: "absolute",
              top: "10px", left: "10px", right: "10px", bottom: "10px",
              background: "#f8f4ee",
              zIndex: 2,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "flex-start",
              paddingTop: "16px",
              gap: "4px",
            }}>
              {/* Decorative lines */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} aria-hidden="true" style={{
                  position: "absolute", left: "14px", right: "14px",
                  top: `${20 + i * 18}%`, height: "1px",
                  background: "rgba(26,18,8,0.07)",
                }} />
              ))}
              {/* Logo mark */}
              <span style={{
                fontFamily: "var(--font-great-vibes), cursive",
                fontSize: "2.8rem", color: "#c4896f", lineHeight: 1,
                position: "relative", zIndex: 1,
              }}>e‑pozivnice</span>
              <span style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "0.55rem", letterSpacing: "0.35em",
                textTransform: "uppercase", color: "rgba(26,18,8,0.3)",
                position: "relative", zIndex: 1,
              }}>Montenegro</span>
            </div>
          )}

          {/* z:3 — front-face triangles (bottom + left + right) overlap paper edges */}
          <svg
            viewBox="0 0 340 220"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 3, pointerEvents: "none" }}
          >
            {/* The three triangles that form the envelope front face */}
            <polygon points="0,220 340,220 170,110" fill="#1e140b" />
            <polygon points="0,0 0,220 170,110"    fill="#1e140b" />
            <polygon points="340,0 340,220 170,110" fill="#1e140b" />
            {/* Crease lines */}
            <line x1="0"   y1="220" x2="170" y2="110" stroke="rgba(196,137,111,0.25)" strokeWidth="1" />
            <line x1="340" y1="220" x2="170" y2="110" stroke="rgba(196,137,111,0.25)" strokeWidth="1" />
            <line x1="0"   y1="0"   x2="170" y2="110" stroke="rgba(196,137,111,0.18)" strokeWidth="1" />
            <line x1="340" y1="0"   x2="170" y2="110" stroke="rgba(196,137,111,0.18)" strokeWidth="1" />
          </svg>

{/* z:6 — wax seal, rolls off when lid opens */}
          {(phase === "flying" || phase === "settled" || phase === "opening") && (
            <div
              key={phase === "opening" ? "seal-ripping" : "seal-closed"}
              style={{
                position: "absolute",
                left: "50%", top: "50%",
                width: "44px", height: "44px",
                zIndex: 6,
                borderRadius: "50%",
                background: "radial-gradient(circle at 38% 38%, #c4896f, #7a3e20)",
                border: "1px solid rgba(196,137,111,0.3)",
                boxShadow: "0 2px 12px rgba(196,137,111,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-great-vibes), cursive",
                fontSize: "1.05rem", color: "rgba(248,245,240,0.85)",
                // when not animating, centre with transform
                transform: phase !== "opening" ? "translate(-50%, -50%)" : undefined,
                animation: phase === "opening"
                  ? "seal-roll 0.9s ease-in forwards"
                  : undefined,
              }}
            >e</div>
          )}

          {/* z:5 — lid flap (rotates fully to -180deg, blends into dark body behind it) */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "50%",
            transformOrigin: "top center",
            zIndex: 5,
            animation: isOpening
              ? "env-lid-open 0.9s cubic-bezier(0.4,0,0.2,1) forwards"
              : undefined,
          }}>
            <svg viewBox="0 0 340 110" style={{ width: "100%", height: "100%", display: "block" }}>
              <polygon points="0,0 340,0 170,108" fill="#1e140b"
                stroke="rgba(196,137,111,0.35)" strokeWidth="1" strokeLinejoin="round" />
            </svg>
          </div>

        </div>
      )}

      {/* ── JUMPING PAPER (z:20 — sibling of envelope z:10, so it floats above it) ── */}
      {showJumpingPaper && (
        <div style={{
          position: "absolute",
          width: PW, height: PH,
          zIndex: 20,
          background: "#f8f4ee",
          animation: "inner-paper-jump 1.3s cubic-bezier(0.22,1,0.36,1) forwards",
        }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} aria-hidden="true" style={{
              position: "absolute", left: "14px", right: "14px",
              top: `${20 + i * 18}%`, height: "1px",
              background: "rgba(26,18,8,0.07)",
            }} />
          ))}
          {/* Logo — same as inner paper so it stays visible while jumping */}
          <span style={{
            position: "absolute", top: "16px", left: 0, right: 0,
            textAlign: "center",
            fontFamily: "var(--font-great-vibes), cursive",
            fontSize: "2.8rem", color: "#c4896f", lineHeight: 1,
          }}>e‑pozivnice</span>
          <span style={{
            position: "absolute", top: "70px", left: 0, right: 0,
            textAlign: "center",
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "0.55rem", letterSpacing: "0.35em",
            textTransform: "uppercase", color: "rgba(26,18,8,0.3)",
          }}>Montenegro</span>
        </div>
      )}
    </div>
  );
}
function SectionNav({ active }: { active: number }) {
  const isLight = active !== 4; // only contact section has dark bg
  return (
    <nav
      aria-label="Section navigation"
      className="section-nav-wrap"
      style={{
        position: "fixed",
        right: "28px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 3000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {SECTIONS.map((id, i) => (
        <div key={id} style={{ display: "flex", flexDirection: "column", alignItems: "center" ,zIndex:3000}}>
          {i > 0 && (
            <div
              style={{
                width: "1px",
                height: "38px",
                background: isLight ? "rgba(30,20,10,0.12)" : "rgba(255,255,255,0.12)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: active >= i ? "100%" : "0%",
                  background: "#c4896f",
                  transition: "height 0.6s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </div>
          )}
          <button
            aria-label={`Navigate to section ${i + 1}`}
            onClick={() => scrollTo(id)}
            style={{
              width: active === i ? "10px" : "7px",
              height: active === i ? "10px" : "7px",
              borderRadius: "50%",
              background: active === i ? "#c4896f" : "transparent",
              border: active === i
                ? "2px solid rgba(196,137,111,0.4)"
                : isLight
                  ? "1.5px solid rgba(30,20,10,0.3)"
                  : "1.5px solid rgba(255,255,255,0.35)",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
              boxShadow: active === i ? "0 0 10px rgba(196,137,111,0.6)" : "none",
            }}
          />
        </div>
      ))}
    </nav>
  );
}


// ─── Animate on enter ───────────────────────────────────────────
function Animate({
  children,
  delay = 0,
  from = "bottom",
  style,
  className,
}: {
  children: ReactNode;
  delay?: number;
  from?: "bottom" | "left" | "right" | "scale";
  style?: CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const dir = mobile && (from === "left" || from === "right") ? "bottom" : from;
  const initial: Record<string, string> = {
    bottom: "translateY(40px)",
    left: "translateX(-55px)",
    right: "translateX(55px)",
    scale: "scale(0.93) translateY(22px)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : initial[dir],
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Scroll connector: line from hero → about → weddings → birthdays → contact ───
function ScrollConnector() {
  const [, tick] = useState(0);
  const geoRef = useRef<{
    dotX: number; dotY: number;
    aboutL: number; aboutR: number; aboutT: number; aboutB: number;
    aboutCX: number;
    wtL: number; wtR: number; wtT: number; wtB: number; wtCX: number;
    midY: number;
    btL: number; btR: number; btT: number; btB: number; btCX: number;
    midY2: number;
    // contact content
    ctL: number; ctR: number; ctT: number; ctB: number; ctCX: number;
    midY3: number;
    progress: number;
  } | null>(null);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      const heroBox = document.getElementById("hero-content");
      const aboutBox = document.getElementById("about-content");
      const wedTextBox = document.getElementById("weddings-text");
      const bdTextBox = document.getElementById("birthdays-text");
      const contactContentBox = document.getElementById("contact-content");
      if (!heroBox || !aboutBox || !wedTextBox || !bdTextBox || !contactContentBox) return;

      const hRect = heroBox.getBoundingClientRect();
      const aRect = aboutBox.getBoundingClientRect();
      const wtRect = wedTextBox.getBoundingClientRect();
      const btRect = bdTextBox.getBoundingClientRect();
      const ccRect = contactContentBox.getBoundingClientRect();
      const sy = window.scrollY;
      const vh = window.innerHeight;

      const dotX = hRect.left + hRect.width / 2;
      const dotY = hRect.bottom + 21 + sy;

      const pad = 50;
      const aboutL = aRect.left - pad;
      const aboutR = aRect.right + pad;
      const aboutT = aRect.top + sy - pad;
      const aboutB = aRect.bottom + sy + pad;
      const aboutCX = (aboutL + aboutR) / 2;

      const wtPad = 30;
      const wtL = wtRect.left - wtPad;
      const wtR = wtRect.right + wtPad;
      const wtT = wtRect.top + sy - wtPad;
      const wtB = wtRect.bottom + sy + wtPad;
      const wtCX = wtRect.left + wtRect.width / 2;

      const midY = (aboutB + wtT) / 2;

      const btPad = 30;
      const btL = btRect.left - btPad;
      const btR = btRect.right + btPad;
      const btT = btRect.top + sy - btPad;
      const btB = btRect.bottom + sy + btPad;
      const btCX = btRect.left + btRect.width / 2;

      const midY2 = (wtB + btT) / 2;

      const ctPad = 40;
      const ctL = ccRect.left - ctPad;
      const ctR = ccRect.right + ctPad;
      const ctT = ccRect.top + sy - ctPad;
      const ctB = ccRect.bottom + sy + ctPad;
      const ctCX = ccRect.left + ccRect.width / 2;

      const midY3 = (btB + ctT) / 2;

      // Progress: 0 at top, 1 at max scroll (page bottom)
      const scrollEnd = document.documentElement.scrollHeight - vh;
      const progress = scrollEnd > 0 ? Math.min(Math.max(sy / scrollEnd, 0), 1) : 0;

      geoRef.current = { dotX, dotY, aboutL, aboutR, aboutT, aboutB, aboutCX, wtL, wtR, wtT, wtB, wtCX, midY, btL, btR, btT, btB, btCX, midY2, ctL, ctR, ctT, ctB, ctCX, midY3, progress };
      tick(n => n + 1);
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    rafId = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const geo = geoRef.current;
  if (!geo || geo.progress <= 0) return null;

  const { dotX, dotY, aboutL, aboutR, aboutT, aboutB, aboutCX, wtL, wtR, wtT, wtB, wtCX, midY, btL, btR, btT, btB, btCX, midY2, ctL, ctR, ctT, ctB, ctCX, midY3, progress } = geo;
  const clr = "rgba(196,137,111,0.35)";

  // ── Phase 1: hero dot → about wrap ──
  const vertDrop1 = aboutT - dotY;
  const halfTopW = dotX - aboutL;
  const halfTopR = aboutR - dotX;
  const sideH1 = aboutB - aboutT;
  const bottomW1 = aboutR - aboutL;
  const aboutWrapSide = Math.max(halfTopW, halfTopR) + sideH1 + bottomW1 / 2;
  const phase1Total = vertDrop1 + aboutWrapSide;

  // ── Phase 2: about bottom → halfway drop → go left → drop → wrap wedding text ──
  const vertDropHalf = midY - aboutB;
  const horizShift = Math.abs(aboutCX - wtCX);
  const vertDropRest = wtT - midY;
  const wtHalfTopW = wtCX - wtL;
  const wtHalfTopR = wtR - wtCX;
  const wtSideH = wtB - wtT;
  const wtBottomW = wtR - wtL;
  const wtWrapSide = Math.max(wtHalfTopW, wtHalfTopR) + wtSideH + wtBottomW / 2;
  const phase2Total = vertDropHalf + horizShift + vertDropRest + wtWrapSide;

  // ── Phase 3: wedding text bottom → halfway drop → go right → drop → wrap birthday text ──
  const p3VertDropHalf = midY2 - wtB;
  const p3HorizShift = Math.abs(btCX - wtCX);
  const p3VertDropRest = btT - midY2;
  const btHalfTopW = btCX - btL;
  const btHalfTopR = btR - btCX;
  const btSideH = btB - btT;
  const btBottomW = btR - btL;
  const btWrapSide = Math.max(btHalfTopW, btHalfTopR) + btSideH + btBottomW / 2;
  const phase3Total = p3VertDropHalf + p3HorizShift + p3VertDropRest + btWrapSide;

  // ── Phase 4: birthday text bottom → halfway drop → go left → drop → wrap contact content ──
  const p4VertDropHalf = midY3 - btB;
  const p4HorizShift = Math.abs(btCX - ctCX);
  const p4VertDropRest = ctT - midY3;
  const ctHalfTopW = ctCX - ctL;
  const ctHalfTopR = ctR - ctCX;
  const ctSideH = ctB - ctT;
  const ctBottomW = ctR - ctL;
  const ctWrapSide = Math.max(ctHalfTopW, ctHalfTopR) + ctSideH + ctBottomW / 2;
  const phase4Total = p4VertDropHalf + p4HorizShift + p4VertDropRest + ctWrapSide;

  const grandTotal = phase1Total + phase2Total + phase3Total + phase4Total;
  const cur = progress * grandTotal;

  // ── Phase 1 calculations (no acceleration — smooth 1:1 scroll-to-draw) ──
  const vertLen1 = Math.min(cur, vertDrop1);
  const afterVert1 = Math.max(0, cur - vertDrop1);

  const lTopLen = Math.min(afterVert1, halfTopW);
  const lSideLen = Math.min(Math.max(0, afterVert1 - halfTopW), sideH1);
  const lBotLen = Math.min(Math.max(0, afterVert1 - halfTopW - sideH1), bottomW1 / 2);

  const rTopLen = Math.min(afterVert1, halfTopR);
  const rSideLen = Math.min(Math.max(0, afterVert1 - halfTopR), sideH1);
  const rBotLen = Math.min(Math.max(0, afterVert1 - halfTopR - sideH1), bottomW1 / 2);

  const aboutWrapDone = afterVert1 >= aboutWrapSide - 1;

  // ── Phase 2 calculations (no acceleration — smooth 1:1 scroll-to-draw) ──
  const p2 = Math.max(0, cur - phase1Total);

  const p2DropH = Math.min(p2, vertDropHalf);
  const p2Horiz = Math.min(Math.max(0, p2 - vertDropHalf), horizShift);
  const p2DropV = Math.min(Math.max(0, p2 - vertDropHalf - horizShift), vertDropRest);
  const p2Wrap = Math.max(0, p2 - vertDropHalf - horizShift - vertDropRest);

  const wtlTopLen = Math.min(p2Wrap, wtHalfTopW);
  const wtlSideLen = Math.min(Math.max(0, p2Wrap - wtHalfTopW), wtSideH);
  const wtlBotLen = Math.min(Math.max(0, p2Wrap - wtHalfTopW - wtSideH), wtBottomW / 2);

  const wtrTopLen = Math.min(p2Wrap, wtHalfTopR);
  const wtrSideLen = Math.min(Math.max(0, p2Wrap - wtHalfTopR), wtSideH);
  const wtrBotLen = Math.min(Math.max(0, p2Wrap - wtHalfTopR - wtSideH), wtBottomW / 2);

  const wedWrapDone = p2Wrap >= wtWrapSide - 1;

  // ── Phase 3 calculations (no acceleration — smooth 1:1 scroll-to-draw) ──
  const p3 = Math.max(0, cur - phase1Total - phase2Total);

  const p3DropH2 = Math.min(p3, p3VertDropHalf);
  // btCX > wtCX so line goes right
  const p3Horiz2 = Math.min(Math.max(0, p3 - p3VertDropHalf), p3HorizShift);
  const p3DropV2 = Math.min(Math.max(0, p3 - p3VertDropHalf - p3HorizShift), p3VertDropRest);
  const p3Wrap = Math.max(0, p3 - p3VertDropHalf - p3HorizShift - p3VertDropRest);

  const btlTopLen = Math.min(p3Wrap, btHalfTopW);
  const btlSideLen = Math.min(Math.max(0, p3Wrap - btHalfTopW), btSideH);
  const btlBotLen = Math.min(Math.max(0, p3Wrap - btHalfTopW - btSideH), btBottomW / 2);

  const btrTopLen = Math.min(p3Wrap, btHalfTopR);
  const btrSideLen = Math.min(Math.max(0, p3Wrap - btHalfTopR), btSideH);
  const btrBotLen = Math.min(Math.max(0, p3Wrap - btHalfTopR - btSideH), btBottomW / 2);

  const bdWrapDone = p3Wrap >= btWrapSide - 1;

  // ── Phase 4 calculations ──
  const p4 = Math.max(0, cur - phase1Total - phase2Total - phase3Total);
  const p4DropH3 = Math.min(p4, p4VertDropHalf);
  const p4Horiz3 = Math.min(Math.max(0, p4 - p4VertDropHalf), p4HorizShift);
  const p4DropV3 = Math.min(Math.max(0, p4 - p4VertDropHalf - p4HorizShift), p4VertDropRest);
  const p4Wrap = Math.max(0, p4 - p4VertDropHalf - p4HorizShift - p4VertDropRest);

  const ctlTopLen = Math.min(p4Wrap, ctHalfTopW);
  const ctlSideLen = Math.min(Math.max(0, p4Wrap - ctHalfTopW), ctSideH);
  const ctlBotLen = Math.min(Math.max(0, p4Wrap - ctHalfTopW - ctSideH), ctBottomW / 2);

  const ctrTopLen = Math.min(p4Wrap, ctHalfTopR);
  const ctrSideLen = Math.min(Math.max(0, p4Wrap - ctHalfTopR), ctSideH);
  const ctrBotLen = Math.min(Math.max(0, p4Wrap - ctHalfTopR - ctSideH), ctBottomW / 2);

  const ctWrapDone = p4Wrap >= ctWrapSide - 1;

  const renderDot = (x: number, y: number) => (
    <div style={{
      position: "absolute", top: y - 3, left: x - 3,
      width: 6, height: 6, borderRadius: "50%",
      background: "#c4896f",
      boxShadow: "0 0 8px 2px rgba(196,137,111,0.6)",
    }} />
  );

  const renderH = (x: number, y: number, w: number) => w > 0 ? (
    <div style={{ position: "absolute", top: y - 1, left: x, width: w, height: 2, background: clr }} />
  ) : null;

  const renderV = (x: number, y: number, h: number) => h > 0 ? (
    <div style={{ position: "absolute", top: y, left: x - 1, width: 2, height: h, background: clr }} />
  ) : null;

  return (
    <div className="scroll-connector-wrap" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 50, overflow: "visible" }}>
      {/* ── PHASE 1: Hero → About ── */}
      {renderDot(dotX, dotY)}
      {renderV(dotX, dotY, vertLen1)}
      {vertLen1 >= vertDrop1 && renderDot(dotX, aboutT)}

      {renderH(dotX - lTopLen, aboutT, lTopLen)}
      {renderV(aboutL + 1, aboutT, lSideLen)}
      {renderH(aboutL, aboutB, lBotLen)}

      {renderH(dotX, aboutT, rTopLen)}
      {renderV(aboutR, aboutT, rSideLen)}
      {renderH(aboutR - rBotLen, aboutB, rBotLen)}

      {/* Dot at about bottom-center */}
      {aboutWrapDone && renderDot(aboutCX, aboutB)}

      {/* ── PHASE 2: About bottom → halfway → left → down → wrap wedding text ── */}
      {/* Step A: vertical drop to midpoint */}
      {aboutWrapDone && renderV(aboutCX, aboutB, p2DropH)}

      {/* Step B: horizontal line going left to wedding text center */}
      {p2Horiz > 0 && renderH(aboutCX - p2Horiz, midY, p2Horiz)}

      {/* Dot at the corner where it turns left */}
      {p2DropH >= vertDropHalf && p2Horiz > 0 && renderDot(aboutCX, midY)}

      {/* Step C: vertical drop to wedding text top */}
      {p2DropV > 0 && renderV(wtCX, midY, p2DropV)}

      {/* Dot at the corner where it turns down */}
      {p2Horiz >= horizShift && p2DropV > 0 && renderDot(wtCX, midY)}

      {/* Dot where it meets the wedding text box */}
      {p2DropV >= vertDropRest && renderDot(wtCX, wtT)}

      {/* Step D: wrap around wedding text */}
      {renderH(wtCX - wtlTopLen, wtT, wtlTopLen)}
      {renderV(wtL + 1, wtT, wtlSideLen)}
      {renderH(wtL, wtB, wtlBotLen)}

      {renderH(wtCX, wtT, wtrTopLen)}
      {renderV(wtR, wtT, wtrSideLen)}
      {renderH(wtR - wtrBotLen, wtB, wtrBotLen)}

      {/* Dot at wedding text bottom-center */}
      {wedWrapDone && renderDot(wtCX, wtB)}

      {/* ── PHASE 3: Wedding text bottom → halfway → right → down → wrap birthday text ── */}
      {/* Step A: vertical drop to midpoint between weddings and birthdays */}
      {wedWrapDone && renderV(wtCX, wtB, p3DropH2)}

      {/* Step B: horizontal line going right to birthday text center */}
      {p3Horiz2 > 0 && renderH(wtCX, midY2, p3Horiz2)}

      {/* Dot at the corner where it turns right */}
      {p3DropH2 >= p3VertDropHalf && p3Horiz2 > 0 && renderDot(wtCX, midY2)}

      {/* Step C: vertical drop to birthday text top */}
      {p3DropV2 > 0 && renderV(btCX, midY2, p3DropV2)}

      {/* Dot at the corner where it turns down */}
      {p3Horiz2 >= p3HorizShift && p3DropV2 > 0 && renderDot(btCX, midY2)}

      {/* Dot where it meets the birthday text box */}
      {p3DropV2 >= p3VertDropRest && renderDot(btCX, btT)}

      {/* Step D: wrap around birthday text */}
      {renderH(btCX - btlTopLen, btT, btlTopLen)}
      {renderV(btL + 1, btT, btlSideLen)}
      {renderH(btL, btB, btlBotLen)}

      {renderH(btCX, btT, btrTopLen)}
      {renderV(btR, btT, btrSideLen)}
      {renderH(btR - btrBotLen, btB, btrBotLen)}

      {/* Dot at birthday text bottom-center */}
      {bdWrapDone && renderDot(btCX, btB)}

      {/* ── PHASE 4: Birthday text bottom → halfway → left → down → wrap contact content ── */}
      {/* Step A: vertical drop to midpoint */}
      {bdWrapDone && renderV(btCX, btB, p4DropH3)}

      {/* Step B: horizontal line going left to contact content center */}
      {p4Horiz3 > 0 && (() => { const goLeft = btCX > ctCX; return renderH(goLeft ? btCX - p4Horiz3 : btCX, midY3, p4Horiz3); })()}

      {/* Dot at the corner where it turns */}
      {p4DropH3 >= p4VertDropHalf && p4Horiz3 > 0 && renderDot(btCX, midY3)}

      {/* Step C: vertical drop to contact content top */}
      {p4DropV3 > 0 && renderV(ctCX, midY3, p4DropV3)}

      {/* Dot at the corner where it turns down */}
      {p4Horiz3 >= p4HorizShift && p4DropV3 > 0 && renderDot(ctCX, midY3)}

      {/* Dot where it meets the contact content box */}
      {p4DropV3 >= p4VertDropRest && renderDot(ctCX, ctT)}

      {/* Step D: wrap around contact content */}
      {renderH(ctCX - ctlTopLen, ctT, ctlTopLen)}
      {renderV(ctL + 1, ctT, ctlSideLen)}
      {renderH(ctL, ctB, ctlBotLen)}

      {renderH(ctCX, ctT, ctrTopLen)}
      {renderV(ctR, ctT, ctrSideLen)}
      {renderH(ctR - ctrBotLen, ctB, ctrBotLen)}

      {/* Dot at contact content bottom-center */}
      {ctWrapDone && renderDot(ctCX, ctB)}
    </div>
  );
}

// ─── Mobile wrap connector: hero -> weddings -> birthdays -> contact ───
function MobileWrapConnector() {
  const [line, setLine] = useState<{
    d: string;
    length: number;
    progress: number;
    width: number;
    height: number;
    firstDotX: number;
    firstDotY: number;
  } | null>(null);

  useEffect(() => {
    let rafId = 0;
    const ns = "http://www.w3.org/2000/svg";
    const update = () => {
      if (window.innerWidth >= 1024) {
        setLine(null);
        return;
      }

      const heroBox = document.getElementById("hero-content");
      const aboutHeading = document.getElementById("about-heading");
      const aboutText = document.getElementById("about-text-block");
      const wBox = document.getElementById("weddings-text");
      const wImg = document.getElementById("weddings-image");
      const bBox = document.getElementById("birthdays-text");
      const bImg = document.getElementById("birthdays-image");
      const cBox = document.getElementById("contact-content");
      if (!heroBox || !aboutHeading || !aboutText || !wBox || !wImg || !bBox || !bImg || !cBox) return;

      const sy = window.scrollY;
      const vh = window.innerHeight;
      const hRect = heroBox.getBoundingClientRect();
      const scrollEnd = document.documentElement.scrollHeight - vh;
      const progress = scrollEnd > 0 ? Math.min(Math.max(sy / scrollEnd, 0), 1) : 0;

      const rect = (el: HTMLElement, pad: number) => {
        const r = el.getBoundingClientRect();
        return {
          l: Math.round(r.left - pad),
          r: Math.round(r.right + pad),
          t: Math.round(r.top + sy - pad),
          b: Math.round(r.bottom + sy + pad),
          cx: Math.round(r.left + r.width / 2),
        };
      };

      const aboutHeadRect = rect(aboutHeading, 0);
      const aboutTextRect = rect(aboutText, 0);
      const aboutPadX = 22;
      const aboutPadTop = 10;
      const aboutPadBottom = 16;
      const about = {
        l: Math.min(aboutHeadRect.l, aboutTextRect.l) - aboutPadX,
        r: Math.max(aboutHeadRect.r, aboutTextRect.r) + aboutPadX,
        t: Math.min(aboutHeadRect.t, aboutTextRect.t) - aboutPadTop,
        b: Math.max(aboutHeadRect.b, aboutTextRect.b) + aboutPadBottom,
        cx: Math.round((Math.min(aboutHeadRect.l, aboutTextRect.l) + Math.max(aboutHeadRect.r, aboutTextRect.r)) / 2),
      };
      const wCard = rect(wBox, 0);
      const wImage = rect(wImg, 0);
      const bCard = rect(bBox, 0);
      const bImage = rect(bImg, 0);
      const contactBase = rect(cBox, 0);
      const contact = { ...contactBase, b: contactBase.b + 28 };

      const startX = Math.round(hRect.left + hRect.width / 2);
      // Hero decorative bottom border is rendered below hero-content by ~21px.
      // Align line start/dot to that visible border, not the raw element box.
      const startY = Math.round(hRect.bottom + sy + 21);
      const cmds: string[] = [`M ${startX} ${startY}`];

      let curX = startX;
      let curY = startY;

      const connectToTopCenter = (box: { t: number; cx: number }) => {
        const midY = (curY + box.t) / 2;
        cmds.push(`L ${curX} ${midY}`, `L ${box.cx} ${midY}`, `L ${box.cx} ${box.t}`);
        curX = box.cx;
        curY = box.t;
      };

      const wrapSingle = (box: { l: number; r: number; t: number; b: number; cx: number }) => {
        cmds.push(
          `L ${box.l} ${box.t}`,
          `L ${box.l} ${box.b}`,
          `L ${box.r} ${box.b}`,
          `L ${box.cx} ${box.b}`
        );
        curX = box.cx;
        curY = box.b;
      };

      const wrapCardThenImage = (
        card: { l: number; r: number; t: number; b: number },
        image: { r: number; t: number; b: number; cx: number }
      ) => {
        const seamY = card.b;

        // left border of card -> bottom border of card
        cmds.push(`L ${card.l} ${card.t}`, `L ${card.l} ${seamY}`, `L ${card.r} ${seamY}`);

        // then right border of image -> middle of image bottom
        cmds.push(`L ${image.r} ${seamY}`, `L ${image.r} ${image.b}`, `L ${image.cx} ${image.b}`);
        curX = image.cx;
        curY = image.b;
      };

      // Section 2: drop from hero bottom-center to about top-center
      cmds.push(`L ${curX} ${about.t}`, `L ${about.cx} ${about.t}`);
      curX = about.cx;
      curY = about.t;
      wrapSingle(about);

      // Section 3
      connectToTopCenter(wCard);
      wrapCardThenImage(wCard, wImage);

      // Section 4
      connectToTopCenter(bCard);
      wrapCardThenImage(bCard, bImage);

      // Contact
      connectToTopCenter(contact);
      wrapSingle(contact);

      const d = cmds.join(" ");
      const path = document.createElementNS(ns, "path");
      path.setAttribute("d", d);
      const length = path.getTotalLength();

      setLine({
        d,
        length,
        progress,
        width: window.innerWidth,
        height: document.documentElement.scrollHeight,
        firstDotX: startX,
        firstDotY: startY,
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!line || line.progress <= 0) return null;
  const drawn = line.length * line.progress;

  return (
    <div className="mobile-wrap-connector" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 45, overflow: "visible" }}>
      <svg
        width="100%"
        height={line.height}
        viewBox={`0 0 ${line.width} ${line.height}`}
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d={line.d}
          fill="none"
          className="mobile-wrap-path-glow"
          strokeWidth={3.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${drawn} ${Math.max(line.length - drawn, 0)}`}
        />
        <path
          d={line.d}
          fill="none"
          className="mobile-wrap-path-main"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${drawn} ${Math.max(line.length - drawn, 0)}`}
        />
        <circle cx={line.firstDotX} cy={line.firstDotY} r="3.5" className="mobile-wrap-dot" />
      </svg>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────
export default function Home() {
  const [active, setActive] = useState(0);
  const [animDone, setAnimDone] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!animDone) return;
    const observers = Array.from(SECTIONS).map((id, i) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.45 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [animDone]);

  return (
    <main style={{ background: "#0a0908", position: "relative" }}>
      {animDone && isDesktop && <SectionNav active={active} />}
      {animDone && isDesktop && <ScrollConnector />}
      {animDone && !isDesktop && <MobileWrapConnector />}

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          height: "100dvh",
          background: "#0a0908",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" className="grain-overlay" />
        <EnvelopeHero onDone={() => setAnimDone(true)} />
      </section>

      {animDone && <>
      {/* ══ ABOUT ═════════════════════════════════════════════════ */}
      <section
        id="about"
        className="section-pad section-full"
        style={{
          background: "#f4f0eb",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          id="about-content"
          className="about-grid"
          style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}
        >
          <Animate from="left">
            <p
              id="about-heading"
              style={{
                fontFamily: "var(--font-great-vibes), cursive",
                fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                color: "#1a1917",
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              Svaka priča zaslužuje savršen uvod.
            </p>
          </Animate>

          <Animate from="right" delay={180}>
            <div id="about-text-block" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                  color: "#4a3f35",
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                Mi smo tim koji vjeruje da svaki poziv treba nositi emociju. Kreiramo personalizovane digitalne pozivnice koje savršeno odgovaraju vašem događaju — od prve linije do posljednje tačke.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1.05rem",
                  color: "#8a7a6a",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                Naš proces je brz, lagan i potpuno prilagođen vama.
              </p>
              <Link
                href="/o-nama"
                className="about-link"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "#c4896f",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(196,137,111,0.35)",
                  paddingBottom: "3px",
                  alignSelf: "flex-start",
                }}
              >
                Saznajte više o nama →
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* ══ WEDDINGS ══════════════════════════════════════════════ */}
      <section
        id="weddings"
        className="section-pad section-full"
        style={{
          background: "#f4f0eb",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          id="weddings-content"
          className="category-grid"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {isDesktop ? (
            <>
              <div id="weddings-text" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <Animate from="left">
                  <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "1.35rem", color: "#c4896f", margin: "0 0 0.2rem" }}>
                    Naša kolekcija
                  </p>
                </Animate>
                <Animate delay={110} from="left">
                  <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 400, color: "#1a1917", lineHeight: 1, margin: "0 0 1.1rem", letterSpacing: "-0.01em" }}>
                    Vjenčanja
                  </h2>
                </Animate>
                <Animate delay={220} from="left">
                  <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.15rem", color: "#4a3f35", lineHeight: 1.75, maxWidth: "460px", marginBottom: "2rem", fontStyle: "italic" }}>
                    Romantične, elegantne pozivnice za najvažniji dan vašeg života.
                  </p>
                </Animate>
                <Animate delay={330} from="left">
                  <Link href="/pozivnice?cat=vjencanje" className="section-cta" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.78rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#f8f5f0", background: "#1a1917", padding: "14px 38px", textDecoration: "none", display: "inline-block" }}>
                    Pogledajte kolekciju
                  </Link>
                </Animate>
              </div>
              <Animate from="right" delay={200}>
                <div className="category-image" style={{ position: "relative", width: "100%", borderRadius: "4px", overflow: "hidden" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1067&fit=crop&q=85"
                    alt="Vjenčanje"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              </Animate>
            </>
          ) : (
            <div className="feature-stack">
              <div className="feature-card" id="weddings-text">
                <Animate from="left">
                  <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "1.35rem", color: "#c4896f", margin: "0 0 0.2rem" }}>Naša kolekcija</p>
                </Animate>
                <Animate delay={110} from="left">
                  <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(2.2rem, 8vw, 3.2rem)", fontWeight: 400, color: "#1a1917", lineHeight: 1, margin: "0 0 1.1rem", letterSpacing: "-0.01em" }}>Vjenčanja</h2>
                </Animate>
                <Animate delay={220} from="left">
                  <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.05rem", color: "#4a3f35", lineHeight: 1.75, maxWidth: "420px", marginBottom: "1.5rem", fontStyle: "italic" }}>
                    Romantične, elegantne pozivnice za najvažniji dan vašeg života.
                  </p>
                </Animate>
                <Animate delay={330} from="left">
                  <Link href="/pozivnice?cat=vjencanje" className="section-cta" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.78rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#f8f5f0", background: "#1a1917", padding: "14px 38px", textDecoration: "none", display: "inline-block" }}>
                    Pogledajte kolekciju
                  </Link>
                </Animate>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1067&fit=crop&q=85"
                alt="Vjenčanje"
                id="weddings-image"
                className="feature-image"
                width={560}
                height={360}
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* ══ BIRTHDAYS ═════════════════════════════════════════════ */}
      <section
        id="birthdays"
        className="section-pad section-full"
        style={{
          background: "#f4f0eb",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="category-grid"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {isDesktop ? (
            <>
              <Animate from="left" delay={200}>
                <div className="category-image" style={{ position: "relative", width: "100%", borderRadius: "4px", overflow: "hidden" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=1067&fit=crop&q=85"
                    alt="Rođendan"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Animate>
              <div id="birthdays-text" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <Animate from="right">
                  <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "1.35rem", color: "#c4896f", margin: "0 0 0.2rem" }}>
                    Naša kolekcija
                  </p>
                </Animate>
                <Animate delay={110} from="right">
                  <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 400, color: "#1a1917", lineHeight: 1, margin: "0 0 1.1rem", letterSpacing: "-0.01em" }}>
                    Rođendani
                  </h2>
                </Animate>
                <Animate delay={220} from="right">
                  <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.15rem", color: "#4a3f35", lineHeight: 1.75, maxWidth: "420px", marginBottom: "2rem", fontStyle: "italic" }}>
                    Pozivnice pune radosti za proslave koje će se dugo pamtiti.
                  </p>
                </Animate>
                <Animate delay={330} from="right">
                  <Link href="/pozivnice?cat=rodjendan" className="section-cta" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.78rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#f8f5f0", background: "#1a1917", padding: "14px 38px", textDecoration: "none", display: "inline-block" }}>
                    Pogledajte kolekciju
                  </Link>
                </Animate>
              </div>
            </>
          ) : (
            <div className="feature-stack">
              <div className="feature-card" id="birthdays-text">
                <Animate from="right">
                  <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "1.35rem", color: "#c4896f", margin: "0 0 0.2rem" }}>Naša kolekcija</p>
                </Animate>
                <Animate delay={110} from="right">
                  <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(2.2rem, 8vw, 3.2rem)", fontWeight: 400, color: "#1a1917", lineHeight: 1, margin: "0 0 1.1rem", letterSpacing: "-0.01em" }}>Rođendani</h2>
                </Animate>
                <Animate delay={220} from="right">
                  <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.05rem", color: "#4a3f35", lineHeight: 1.75, maxWidth: "420px", marginBottom: "1.5rem", fontStyle: "italic" }}>
                    Pozivnice pune radosti za proslave koje će se dugo pamtiti.
                  </p>
                </Animate>
                <Animate delay={330} from="right">
                  <Link href="/pozivnice?cat=rodjendan" className="section-cta" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.78rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#f8f5f0", background: "#1a1917", padding: "14px 38px", textDecoration: "none", display: "inline-block" }}>
                    Pogledajte kolekciju
                  </Link>
                </Animate>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=1067&fit=crop&q=85"
                alt="Rođendan"
                id="birthdays-image"
                className="feature-image"
                width={560}
                height={360}
              />
            </div>
          )}
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════════ */}
      <section
        id="contact"
        className="section-pad section-full"
        style={{
          background: "#0a0908",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: isDesktop ? "1px solid rgba(255,255,255,0.04)" : "none",
        }}
      >
        <div
          id="contact-content"
          style={{
            maxWidth: "640px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1.5rem",
          }}
        >
          <Animate from="scale">
            <p
              style={{
                fontFamily: "var(--font-great-vibes), cursive",
                fontSize: "1.5rem",
                color: "#c4896f",
                margin: 0,
              }}
            >
              Kontaktirajte nas
            </p>
          </Animate>
          <Animate delay={100} from="scale">
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
                fontWeight: 400,
                color: "#f8f5f0",
                lineHeight: 1.05,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Počnimo zajedno
            </h2>
          </Animate>
          <Animate delay={160}>
            <div style={{ width: "32px", height: "1px", background: "rgba(196,137,111,0.4)" }} />
          </Animate>
          <Animate delay={240}>
            <p
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "1.1rem",
                color: "rgba(248,245,240,0.45)",
                lineHeight: 1.8,
                fontStyle: "italic",
                margin: 0,
              }}
            >
              Javite nam se sa svojom idejom — i mi ćemo je pretvoriti u nešto zaista posebno.
            </p>
          </Animate>

          <Animate delay={350} style={{ width: "100%", marginTop: "0.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              {[
                { label: "Email", value: "epozivnice.me@gmail.com", href: "mailto:epozivnice.me@gmail.com" },
                { label: "WhatsApp", value: "+382 69 000 000", href: "https://wa.me/38269000000" },
                { label: "Instagram", value: "@e_pozivnice.me", href: "https://www.instagram.com/e_pozivnice.me/" },
              ].map(({ label, value, href }, idx) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.1rem 1.25rem",
                    borderTop: idx === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "0.68rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(248,245,240,0.25)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1rem",
                      color: "#f8f5f0",
                      fontStyle: "italic",
                    }}
                  >
                    {value}
                  </span>
                </a>
              ))}
            </div>
          </Animate>

          <Animate delay={480}>
            <Link
              href="/o-nama#kontakt"
              style={{
                marginTop: "0.5rem",
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "0.78rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#0a0908",
                background: "#c4896f",
                padding: "14px 42px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Napišite nam
            </Link>
          </Animate>
        </div>
      </section>
      </>}
    </main>
  );
}
