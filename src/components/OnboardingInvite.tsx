"use client";

import { useEffect, useRef } from "react";

const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Great+Vibes&family=Raleway:wght@300;400;500;600&display=swap";

const MAP_URL = "https://maps.google.com/?q=Belgrade,Serbia";
const QR_IMAGE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(MAP_URL)}`;

const INVITE_STYLES = String.raw`
  :host {
    all: initial;
    display: block;
    width: 100%;
  }

  :host,
  :host * {
    box-sizing: border-box;
  }

  .invite-root {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Raleway", sans-serif;
    background: linear-gradient(135deg, #f9ede0 0%, #f0d9c5 40%, #e8c9b0 100%);
  }

  .invite-root::before,
  .invite-root::after {
    content: "";
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(80px);
    opacity: 0.45;
  }

  .invite-root::before {
    top: -120px;
    left: -140px;
    width: 520px;
    height: 520px;
    background: radial-gradient(circle, #e0a882, transparent 70%);
  }

  .invite-root::after {
    right: -100px;
    bottom: -100px;
    width: 420px;
    height: 420px;
    background: radial-gradient(circle, #c9849a, transparent 70%);
  }

  .card-shell {
    position: relative;
    width: min(480px, 94vw);
    height: min(680px, 92vh);
    perspective: 1200px;
    z-index: 2;
  }

  .card {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 44px 36px 32px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 28px;
    background: rgba(255, 252, 248, 0.92);
    backdrop-filter: blur(18px) saturate(160%);
    -webkit-backdrop-filter: blur(18px) saturate(160%);
    box-shadow:
      0 2px 0 rgba(255, 255, 255, 0.9) inset,
      0 24px 60px rgba(120, 70, 30, 0.18),
      0 4px 16px rgba(120, 70, 30, 0.1);
    opacity: 0;
    pointer-events: none;
    transform: translateX(60px) scale(0.97);
    transition: opacity 0.45s ease, transform 0.45s ease;
    will-change: opacity, transform;
  }

  .card.active {
    opacity: 1;
    pointer-events: all;
    transform: translateX(0) scale(1);
  }

  .card.exit-left {
    opacity: 0;
    transform: translateX(-60px) scale(0.97);
    pointer-events: none;
  }

  .card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 3px;
    border-radius: 0 0 4px 4px;
    background: linear-gradient(90deg, transparent, #c9849a, #d4a866, #c9849a, transparent);
  }

  .slide-top {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 0;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 20px;
    padding: 5px 14px;
    border: 1px solid rgba(212, 168, 102, 0.35);
    border-radius: 40px;
    background: linear-gradient(135deg, rgba(201, 132, 154, 0.15), rgba(212, 168, 102, 0.15));
    color: #b07d4a;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .icon-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    margin-bottom: 22px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    background: linear-gradient(135deg, #f5dfc0, #ecc9a8);
    box-shadow: 0 4px 18px rgba(160, 100, 50, 0.15);
    font-size: 30px;
  }

  .slide-name {
    color: #5a3520;
    font-family: "Great Vibes", cursive;
    font-size: clamp(54px, 14vw, 78px);
    line-height: 1;
    text-align: center;
  }

  .slide-amp {
    display: block;
    color: #b07d4a;
    font-family: "Great Vibes", cursive;
    font-size: clamp(34px, 8vw, 48px);
    line-height: 1;
    text-align: center;
  }

  .slide-h1 {
    margin-bottom: 4px;
    color: #5a3520;
    font-family: "Great Vibes", cursive;
    font-size: clamp(38px, 10vw, 54px);
    line-height: 1.15;
    text-align: center;
  }

  .slide-h2 {
    margin-bottom: 20px;
    color: #b07d4a;
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(13px, 3vw, 16px);
    letter-spacing: 4px;
    text-align: center;
    text-transform: uppercase;
  }

  .deco-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    margin: 14px 0;
    color: #c9a070;
    font-size: 13px;
  }

  .deco-line::before,
  .deco-line::after {
    content: "";
    display: block;
    flex: 1;
    max-width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c9a070, transparent);
  }

  .detail-rows {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
  }

  .detail-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    border: 1px solid rgba(212, 168, 102, 0.25);
    border-radius: 14px;
    background: rgba(255, 248, 240, 0.7);
  }

  .dr-icon {
    flex-shrink: 0;
    width: 36px;
    font-size: 22px;
    text-align: center;
  }

  .dr-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .dr-label {
    color: #b07d4a;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .dr-value {
    color: #4a2e1a;
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(15px, 3.5vw, 18px);
  }

  .cd-grid {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }

  .cd-box {
    min-width: 68px;
    padding: 14px 10px 10px;
    border-radius: 14px;
    background: linear-gradient(160deg, #5a3520, #3e2010);
    box-shadow: 0 4px 14px rgba(90, 53, 32, 0.22);
    text-align: center;
  }

  .cd-num {
    color: #f5dfc0;
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(30px, 7vw, 42px);
    font-weight: 300;
    line-height: 1;
  }

  .cd-lbl {
    margin-top: 5px;
    color: #c9a070;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .quote-wrap {
    padding: 24px 22px;
    border: 1px solid rgba(212, 168, 102, 0.25);
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(201, 132, 154, 0.08), rgba(212, 168, 102, 0.08));
    text-align: center;
  }

  .quote-wrap p {
    color: #5a3520;
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(16px, 3.5vw, 20px);
    font-style: italic;
    line-height: 1.7;
  }

  .q-mark {
    color: #b07d4a;
    font-size: 1.5em;
  }

  .quote-author {
    margin-top: 12px;
    color: #9a6840;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .map-frame {
    width: 100%;
    overflow: hidden;
    border: 1px solid rgba(212, 168, 102, 0.3);
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(90, 53, 32, 0.12);
  }

  .map-frame iframe {
    display: block;
    width: 100%;
    height: 210px;
    border: none;
  }

  .map-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 14px;
    padding: 11px 26px;
    border: 1.5px solid #b07d4a;
    border-radius: 40px;
    color: #b07d4a;
    font-family: "Raleway", sans-serif;
    font-size: 12px;
    letter-spacing: 3px;
    text-decoration: none;
    text-transform: uppercase;
    transition: background 0.25s, color 0.25s;
  }

  .map-link-btn:hover {
    background: #b07d4a;
    color: #ffffff;
  }

  .rsvp-form {
    display: flex;
    flex-direction: column;
    gap: 11px;
    width: 100%;
  }

  .rsvp-form input,
  .rsvp-form select,
  .rsvp-form textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid rgba(176, 125, 74, 0.3);
    border-radius: 12px;
    background: rgba(255, 248, 240, 0.6);
    color: #4a2e1a;
    font-family: "Raleway", sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.25s;
  }

  .rsvp-form input::placeholder,
  .rsvp-form textarea::placeholder {
    color: rgba(90, 53, 32, 0.4);
  }

  .rsvp-form input:focus,
  .rsvp-form select:focus,
  .rsvp-form textarea:focus {
    border-color: #b07d4a;
  }

  .rsvp-form textarea {
    resize: none;
    height: 72px;
  }

  .rsvp-submit {
    padding: 13px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #d4a866, #b07d4a);
    box-shadow: 0 4px 14px rgba(176, 125, 74, 0.35);
    color: #ffffff;
    cursor: pointer;
    font-family: "Raleway", sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    transition: opacity 0.25s, transform 0.2s;
  }

  .rsvp-submit:hover {
    opacity: 0.88;
    transform: translateY(-2px);
  }

  .rsvp-thanks {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;
  }

  .rsvp-thanks.visible {
    display: flex;
  }

  .ty-icon {
    font-size: 44px;
  }

  .ty-title {
    color: #5a3520;
    font-family: "Great Vibes", cursive;
    font-size: 46px;
  }

  .ty-sub {
    color: #9a6840;
    font-family: "Cormorant Garamond", serif;
    font-size: 18px;
    font-style: italic;
  }

  .card-bottom {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 24px;
  }

  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border: 1.5px solid rgba(176, 125, 74, 0.35);
    border-radius: 50%;
    background: transparent;
    color: #b07d4a;
    cursor: pointer;
    transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.2s;
  }

  .nav-btn:hover {
    border-color: #b07d4a;
    background: #b07d4a;
    color: #ffffff;
    transform: scale(1.08);
  }

  .nav-btn:disabled {
    opacity: 0.25;
    pointer-events: none;
  }

  .nav-btn svg {
    width: 16px;
    height: 16px;
  }

  .dots {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .dot {
    width: 7px;
    height: 7px;
    border: 0;
    border-radius: 4px;
    background: rgba(176, 125, 74, 0.25);
    cursor: pointer;
    transition: width 0.35s ease, background 0.35s ease;
  }

  .dot.active {
    width: 22px;
    background: #b07d4a;
  }

  .qr-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding: 22px 20px;
    border: 1px solid rgba(212, 168, 102, 0.3);
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(201, 132, 154, 0.08), rgba(212, 168, 102, 0.08));
  }

  .qr-inner {
    overflow: hidden;
    padding: 12px;
    border-radius: 14px;
    background: #ffffff;
    box-shadow: 0 4px 18px rgba(90, 53, 32, 0.14);
    line-height: 0;
  }

  .qr-inner img {
    display: block;
    border-radius: 8px;
  }

  .qr-caption {
    color: #b07d4a;
    font-size: 11px;
    letter-spacing: 3px;
    text-align: center;
    text-transform: uppercase;
  }

  .petal {
    position: fixed;
    border-radius: 60% 0 60% 0;
    background: rgba(210, 150, 160, 0.4);
    pointer-events: none;
    animation: petal-fall linear infinite;
  }

  @keyframes petal-fall {
    0% {
      opacity: 0.8;
      transform: translateY(-40px) rotate(0deg);
    }

    100% {
      opacity: 0;
      transform: translateY(110vh) rotate(600deg);
    }
  }

  @media (max-width: 400px) {
    .card {
      padding: 32px 22px 24px;
    }

    .cd-box {
      min-width: 58px;
      padding: 10px 6px 8px;
    }
  }

  @media (max-height: 600px) {
    .card-shell {
      height: 98vh;
    }

    .card {
      padding: 28px 28px 20px;
    }
  }
`;

const INVITE_MARKUP = `
  <div class="invite-root" id="invite-root">
    <div class="card-shell" id="card-shell">
      <div class="card active" id="slide-0">
        <div class="slide-top">
          <span class="badge">&#10086; Pozivnica &#10086;</span>
          <div class="slide-name">Sanja</div>
          <div class="slide-amp">&amp;</div>
          <div class="slide-name">Marko</div>
          <div class="deco-line">&#10022;</div>
          <p style="font-family:'Cormorant Garamond',serif;font-size:clamp(15px,3.5vw,19px);letter-spacing:3px;text-transform:uppercase;color:#9a6840;text-align:center;margin-top:4px;">22. august 2026.</p>
          <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#b89068;margin-top:6px;">Beograd, Srbija</p>
        </div>
        <div class="card-bottom">
          <button class="nav-btn" disabled aria-label="Nazad"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg></button>
          <div class="dots" id="dots-0"></div>
          <button class="nav-btn" data-dir="next" aria-label="Dalje"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg></button>
        </div>
      </div>

      <div class="card" id="slide-1">
        <div class="slide-top">
          <div class="icon-circle">&#8987;</div>
          <p class="slide-h2">Do velikog dana</p>
          <h2 class="slide-h1">Odbrojavanje</h2>
          <div class="deco-line">&#10022;</div>
          <div class="cd-grid">
            <div class="cd-box"><div class="cd-num" id="cd-d">--</div><div class="cd-lbl">Dana</div></div>
            <div class="cd-box"><div class="cd-num" id="cd-h">--</div><div class="cd-lbl">Sati</div></div>
            <div class="cd-box"><div class="cd-num" id="cd-m">--</div><div class="cd-lbl">Min</div></div>
            <div class="cd-box"><div class="cd-num" id="cd-s">--</div><div class="cd-lbl">Sek</div></div>
          </div>
          <p style="margin-top:20px;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(16px,3vw,19px);color:#9a6840;text-align:center;">Jedva cekamo da proslavimo zajedno!</p>
        </div>
        <div class="card-bottom">
          <button class="nav-btn" data-dir="prev" aria-label="Nazad"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg></button>
          <div class="dots" id="dots-1"></div>
          <button class="nav-btn" data-dir="next" aria-label="Dalje"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg></button>
        </div>
      </div>

      <div class="card" id="slide-2">
        <div class="slide-top">
          <div class="icon-circle">&#128141;</div>
          <p class="slide-h2">Sve sto treba da znate</p>
          <h2 class="slide-h1">Detalji</h2>
          <div class="deco-line">&#10022;</div>
          <div class="detail-rows">
            <div class="detail-row"><div class="dr-icon">&#128197;</div><div class="dr-text"><span class="dr-label">Datum</span><span class="dr-value">Subota, 22. august 2026.</span></div></div>
            <div class="detail-row"><div class="dr-icon">&#9200;</div><div class="dr-text"><span class="dr-label">Vreme</span><span class="dr-value">Ceremonija u 16:00 &middot; Proslava od 18:00</span></div></div>
            <div class="detail-row"><div class="dr-icon">&#128205;</div><div class="dr-text"><span class="dr-label">Lokacija</span><span class="dr-value">Beograd, Srbija</span></div></div>
            <div class="detail-row"><div class="dr-icon">&#128248;</div><div class="dr-text"><span class="dr-label">Dress Code</span><span class="dr-value">Svecana elegancija</span></div></div>
          </div>
        </div>
        <div class="card-bottom">
          <button class="nav-btn" data-dir="prev" aria-label="Nazad"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg></button>
          <div class="dots" id="dots-2"></div>
          <button class="nav-btn" data-dir="next" aria-label="Dalje"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg></button>
        </div>
      </div>

      <div class="card" id="slide-3">
        <div class="slide-top">
          <div class="icon-circle">&#128149;</div>
          <p class="slide-h2">Rec ljubavi</p>
          <h2 class="slide-h1">Za vas dvoje</h2>
          <div class="deco-line">&#10022;</div>
          <div class="quote-wrap">
            <p><span class="q-mark">&#8222;</span>Ljubav je strpljiva, ljubav je dobra. Ljubav se ne raduje nepravdi, a raduje se istini.<span class="q-mark">&#8220;</span></p>
            <p class="quote-author">&mdash; 1. Korincani 13:4&ndash;6</p>
          </div>
          <div class="deco-line" style="margin-top:22px;">&#10022;</div>
          <p style="font-family:'Great Vibes',cursive;font-size:clamp(28px,7vw,38px);color:#b07d4a;text-align:center;margin-top:4px;">Sanja &amp; Marko</p>
        </div>
        <div class="card-bottom">
          <button class="nav-btn" data-dir="prev" aria-label="Nazad"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg></button>
          <div class="dots" id="dots-3"></div>
          <button class="nav-btn" data-dir="next" aria-label="Dalje"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg></button>
        </div>
      </div>

      <div class="card" id="slide-4">
        <div class="slide-top">
          <div class="icon-circle">&#128205;</div>
          <p class="slide-h2">Kako do nas</p>
          <h2 class="slide-h1">Lokacija</h2>
          <div class="deco-line">&#10022;</div>
          <div class="map-frame">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90938.19578338!2d20.3551768!3d44.8176234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7aa3d7b53fbd%3A0x1db8645cf2177ee4!2sBelgrade%2C%20Serbia!5e0!3m2!1ssr!2s!4v1710000000000" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Lokacija vencanja"></iframe>
          </div>
          <a class="map-link-btn" href="${MAP_URL}" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            Otvori u Google Maps
          </a>
        </div>
        <div class="card-bottom">
          <button class="nav-btn" data-dir="prev" aria-label="Nazad"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg></button>
          <div class="dots" id="dots-4"></div>
          <button class="nav-btn" data-dir="next" aria-label="Dalje"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg></button>
        </div>
      </div>

      <div class="card" id="slide-5">
        <div class="slide-top">
          <div class="icon-circle">&#128247;</div>
          <p class="slide-h2">Skenirajte za navigaciju</p>
          <h2 class="slide-h1">QR Kod</h2>
          <div class="deco-line">&#10022;</div>
          <div class="qr-box">
            <div class="qr-inner">
              <img src="${QR_IMAGE_URL}" alt="QR kod za navigaciju" width="160" height="160" />
            </div>
            <p class="qr-caption">Navigacija do lokacije vencanja</p>
          </div>
          <p style="margin-top:12px;font-family:'Cormorant Garamond',serif;font-size:clamp(14px,3vw,17px);color:#9a6840;text-align:center;font-style:italic;">Beograd, Srbija &middot; 22. august 2026.</p>
        </div>
        <div class="card-bottom">
          <button class="nav-btn" data-dir="prev" aria-label="Nazad"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg></button>
          <div class="dots" id="dots-5"></div>
          <button class="nav-btn" data-dir="next" aria-label="Dalje"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg></button>
        </div>
      </div>

      <div class="card" id="slide-6">
        <div class="slide-top">
          <div class="icon-circle">&#128140;</div>
          <p class="slide-h2">Potvrdite dolazak do 1. avg.</p>
          <h2 class="slide-h1">RSVP</h2>
          <div class="deco-line">&#10022;</div>
          <form class="rsvp-form" id="rsvpForm" novalidate>
            <input type="text" id="rsvp-name" placeholder="Vase ime i prezime" required autocomplete="name" />
            <select id="rsvp-attend" required>
              <option value="" disabled selected>Da li dolazite?</option>
              <option value="yes">Da, dolazim! &#127881;</option>
              <option value="no">Nazalost, ne mogu</option>
            </select>
            <input type="number" id="rsvp-guests" placeholder="Broj gostiju (ukljucujuci vas)" min="1" max="20" />
            <textarea id="rsvp-msg" placeholder="Poruka za mladence (opciono)"></textarea>
            <button type="submit" class="rsvp-submit">Posalji potvrdu &#10022;</button>
          </form>
          <div class="rsvp-thanks" id="rsvpThanks">
            <div class="ty-icon">&#127754;</div>
            <div class="ty-title">Hvala vam!</div>
            <div class="ty-sub">Vidimo se 22. avgusta!</div>
          </div>
        </div>
        <div class="card-bottom">
          <button class="nav-btn" data-dir="prev" aria-label="Nazad"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg></button>
          <div class="dots" id="dots-6"></div>
          <button class="nav-btn" disabled aria-label="Dalje"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg></button>
        </div>
      </div>
    </div>
  </div>
`;

export default function OnboardingInvite() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    root.innerHTML = "";

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = FONT_STYLESHEET;

    const styleTag = document.createElement("style");
    styleTag.textContent = INVITE_STYLES;

    const markupContainer = document.createElement("div");
    markupContainer.innerHTML = INVITE_MARKUP;

    root.append(fontLink, styleTag, markupContainer);

    const cleanups: Array<() => void> = [];
    const qs = <T extends Element>(selector: string) => root.querySelector<T>(selector);
    const qsa = <T extends Element>(selector: string) => Array.from(root.querySelectorAll<T>(selector));

    const inviteRoot = qs<HTMLDivElement>("#invite-root");
    const cards = qsa<HTMLDivElement>(".card");
    const rsvpForm = qs<HTMLFormElement>("#rsvpForm");
    const rsvpThanks = qs<HTMLDivElement>("#rsvpThanks");
    const countdownDays = qs<HTMLElement>("#cd-d");
    const countdownHours = qs<HTMLElement>("#cd-h");
    const countdownMinutes = qs<HTMLElement>("#cd-m");
    const countdownSeconds = qs<HTMLElement>("#cd-s");

    if (
      !inviteRoot ||
      cards.length === 0 ||
      !rsvpForm ||
      !rsvpThanks ||
      !countdownDays ||
      !countdownHours ||
      !countdownMinutes ||
      !countdownSeconds
    ) {
      return;
    }

    const total = cards.length;
    let current = 0;
    let touchStartX: number | null = null;

    const createPetals = () => {
      const colors = [
        "rgba(210,150,160,.38)",
        "rgba(230,180,140,.3)",
        "rgba(200,160,180,.32)",
      ];

      for (let index = 0; index < 14; index += 1) {
        const petal = document.createElement("div");
        petal.className = "petal";
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.top = "-20px";
        petal.style.width = `${7 + Math.random() * 9}px`;
        petal.style.height = `${10 + Math.random() * 12}px`;
        petal.style.background = colors[Math.floor(Math.random() * colors.length)] ?? colors[0]!;
        petal.style.animationDuration = `${7 + Math.random() * 10}s`;
        petal.style.animationDelay = `${Math.random() * 9}s`;
        inviteRoot.appendChild(petal);
      }
    };

    const buildDots = () => {
      for (let index = 0; index < total; index += 1) {
        const container = qs<HTMLDivElement>(`#dots-${index}`);
        if (!container) continue;

        container.innerHTML = "";

        for (let dotIndex = 0; dotIndex < total; dotIndex += 1) {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = `dot${dotIndex === current ? " active" : ""}`;
          dot.setAttribute("aria-label", `Idi na karticu ${dotIndex + 1}`);
          dot.addEventListener("click", () => {
            goTo(dotIndex);
          });
          container.appendChild(dot);
        }
      }
    };

    const goTo = (nextIndex: number) => {
      if (nextIndex === current || nextIndex < 0 || nextIndex >= total) return;

      const previous = cards[current];
      const next = cards[nextIndex];

      previous?.classList.remove("active");
      previous?.classList.add("exit-left");

      const timeoutId = window.setTimeout(() => {
        previous?.classList.remove("exit-left");
      }, 450);
      cleanups.push(() => window.clearTimeout(timeoutId));

      current = nextIndex;
      next?.classList.add("active");
      buildDots();
    };

    const updateCountdown = () => {
      const target = new Date("2026-08-22T16:00:00");
      const diff = target.getTime() - new Date().getTime();

      if (diff <= 0) {
        countdownDays.textContent = "00";
        countdownHours.textContent = "00";
        countdownMinutes.textContent = "00";
        countdownSeconds.textContent = "00";
        return;
      }

      countdownDays.textContent = String(Math.floor(diff / 86400000)).padStart(2, "0");
      countdownHours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0");
      countdownMinutes.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      countdownSeconds.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    };

    const countdownIntervalId = window.setInterval(updateCountdown, 1000);
    cleanups.push(() => window.clearInterval(countdownIntervalId));
    updateCountdown();
    createPetals();
    buildDots();

    qsa<HTMLButtonElement>('.nav-btn[data-dir="next"]').forEach((button) => {
      const handler = () => {
        if (current < total - 1) goTo(current + 1);
      };

      button.addEventListener("click", handler);
      cleanups.push(() => button.removeEventListener("click", handler));
    });

    qsa<HTMLButtonElement>('.nav-btn[data-dir="prev"]').forEach((button) => {
      const handler = () => {
        if (current > 0) goTo(current - 1);
      };

      button.addEventListener("click", handler);
      cleanups.push(() => button.removeEventListener("click", handler));
    });

    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.key === "ArrowRight" || event.key === "ArrowDown") && current < total - 1) {
        goTo(current + 1);
      }

      if ((event.key === "ArrowLeft" || event.key === "ArrowUp") && current > 0) {
        goTo(current - 1);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? null;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStartX === null) return;

      const endX = event.changedTouches[0]?.clientX;
      if (typeof endX !== "number") {
        touchStartX = null;
        return;
      }

      const deltaX = endX - touchStartX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0 && current < total - 1) goTo(current + 1);
        if (deltaX > 0 && current > 0) goTo(current - 1);
      }

      touchStartX = null;
    };

    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();

      const name = qs<HTMLInputElement>("#rsvp-name")?.value.trim() ?? "";
      const attend = qs<HTMLSelectElement>("#rsvp-attend")?.value ?? "";

      if (!name || !attend) {
        window.alert("Molimo popunite obavezna polja.");
        return;
      }

      rsvpForm.style.display = "none";
      rsvpThanks.classList.add("visible");

      const icon = qs<HTMLElement>(".ty-icon");
      const title = qs<HTMLElement>(".ty-title");
      const subtitle = qs<HTMLElement>(".ty-sub");

      if (attend === "no") {
        if (icon) icon.innerHTML = "&#128144;";
        if (title) title.textContent = "Hvala sto ste odgovorili!";
        if (subtitle) subtitle.textContent = "Bice nam nedostajati.";
      }
    };

    window.addEventListener("keydown", handleKeydown);
    inviteRoot.addEventListener("touchstart", handleTouchStart, { passive: true });
    inviteRoot.addEventListener("touchend", handleTouchEnd, { passive: true });
    rsvpForm.addEventListener("submit", handleSubmit as EventListener);

    cleanups.push(() => window.removeEventListener("keydown", handleKeydown));
    cleanups.push(() => inviteRoot.removeEventListener("touchstart", handleTouchStart));
    cleanups.push(() => inviteRoot.removeEventListener("touchend", handleTouchEnd));
    cleanups.push(() => rsvpForm.removeEventListener("submit", handleSubmit as EventListener));

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div ref={hostRef} style={{ display: "block", width: "100%" }} />;
}
