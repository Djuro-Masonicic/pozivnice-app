"use client";

import { useEffect, useRef } from "react";

const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Nunito+Sans:wght@300;400;500;600&display=swap";

const INVITE_STYLES = String.raw`
  :host {
    all: initial;
    display: block;
    width: 100%;
    --bg1: #fff8f4;
    --bg2: #fdecef;
    --card: #ffffffd9;
    --text: #3a2b2f;
    --accent: #b76e79;
    --accent-dark: #8f4b56;
  }

  :host,
  :host * {
    box-sizing: border-box;
  }

  .invite-page {
    min-height: 100vh;
    margin: 0;
    font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: var(--text);
    background: radial-gradient(circle at top, var(--bg2), var(--bg1) 60%);
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  .container {
    max-width: 1000px;
    margin: 40px auto;
    padding: 20px;
  }

  .invite {
    background: var(--card);
    border: 1px solid #f0cfd6;
    border-radius: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }

  .hero {
    text-align: center;
    padding: 56px 24px 28px;
    background: linear-gradient(180deg, #fff 0%, #fff8fa 100%);
    border-bottom: 1px solid #f3dbe0;
  }

  .hero .intro {
    font-family: "Lora", Georgia, serif;
    font-size: 1.4rem;
    color: var(--accent-dark);
    margin: 0 0 18px;
    font-weight: 500;
    font-style: italic;
  }

  .names {
    font-family: "Lora", Georgia, serif;
    font-size: clamp(2rem, 6vw, 3.6rem);
    margin: 0;
    color: var(--accent);
    letter-spacing: 0.5px;
    font-style: italic;
  }

  .timeline-wrap {
    max-width: 920px;
    margin: 20px auto 0;
    text-align: center;
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 0 10px;
  }

  .timeline-title {
    font-family: "Lora", Georgia, serif;
    color: var(--accent-dark);
    font-size: 1.4rem;
    margin: 0 0 24px;
    text-align: center;
    font-style: italic;
  }

  .timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  .timeline::before,
  .timeline-item::before {
    display: none;
  }

  .timeline-item {
    position: relative;
    width: 70%;
    padding: 0;
  }

  .timeline-item.left {
    left: 0;
    align-self: flex-start;
  }

  .timeline-item.right {
    left: auto;
    align-self: flex-end;
  }

  .timeline-divider {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0;
    margin: -8px 0;
    height: 60px;
  }

  .timeline-divider::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e8b4bf;
    transform: translateX(-50%);
    z-index: 0;
  }

  .timeline-divider .heart {
    font-size: 0.85rem;
    color: var(--accent);
    background: #fff8fa;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    border: 2px solid #f0cfd6;
    box-shadow: 0 2px 8px rgba(183, 110, 121, 0.12);
    position: relative;
    z-index: 1;
  }

  .timeline-card {
    background: #fff8fa;
    border: none;
    border-radius: 16px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 4px 16px rgba(183, 110, 121, 0.06);
    position: relative;
    z-index: 1;
  }

  .timeline-info {
    min-width: 0;
    padding: 4px 0;
  }

  .timeline-item.left .timeline-info {
    order: 2;
    text-align: left;
  }

  .timeline-item.left .timeline-photo {
    order: 1;
  }

  .timeline-item.right .timeline-info {
    order: 2;
    text-align: right;
  }

  .timeline-item.right .timeline-photo {
    order: 1;
  }

  .timeline-date {
    font-weight: 700;
    color: var(--accent-dark);
    margin-bottom: 6px;
    font-size: 1.6rem;
  }

  .timeline-text {
    margin: 0;
    line-height: 1.5;
    font-style: italic;
    font-size: 1.6rem;
  }

  .timeline-photo {
    width: 100%;
    aspect-ratio: 4 / 5;
    border-radius: 14px;
    object-fit: cover;
    border: none;
    background: none;
    display: block;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }

  .section {
    padding: 20px 24px;
  }

  .section h2 {
    font-family: "Lora", Georgia, serif;
    margin: 0 0 14px;
    color: var(--accent-dark);
    font-size: 1.35rem;
    text-align: center;
  }

  .countdown {
    display: flex;
    flex-wrap: nowrap;
    gap: 6px;
    margin-top: 10px;
    justify-content: center;
  }

  .time-box {
    background: none;
    border: none;
    border-radius: 0;
    padding: 8px 6px;
    text-align: center;
    min-width: 0;
    flex: 0 1 auto;
  }

  .time-box .num {
    display: block;
    font-family: "Lora", Georgia, serif;
    font-size: clamp(1.6rem, 5vw, 2.4rem);
    font-weight: 700;
    color: var(--accent-dark);
    line-height: 1.1;
  }

  .time-box .label {
    font-size: clamp(0.7rem, 2vw, 0.9rem);
    color: #6e5a5f;
    margin-top: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .events {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .event-card {
    background: #fff;
    border: 1px solid #f1d3d9;
    border-radius: 14px;
    padding: 16px;
  }

  .event-card h3 {
    font-family: "Lora", Georgia, serif;
    margin: 0 0 8px;
    color: var(--accent-dark);
    font-size: 1.1rem;
  }

  .event-card p {
    margin: 4px 0;
  }

  .location-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 6px;
  }

  .location-row p {
    margin: 0;
  }

  .map-btn {
    display: inline-block;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid #e7b9c2;
    background: #fff4f7;
    color: var(--accent-dark);
    font-weight: 600;
    font-size: 0.9rem;
    white-space: nowrap;
    transition: 0.2s ease;
  }

  .map-btn:hover {
    background: #ffeaf0;
    border-color: #d99eaa;
  }

  .wedding-highlight {
    text-align: center;
    padding: 30px 20px 24px;
    margin: 10px 0 0;
    background: linear-gradient(135deg, #fff4f7 0%, #fce4ec 50%, #fff8fa 100%);
    border-top: 2px solid #e8b4bf;
    border-bottom: 2px solid #e8b4bf;
    position: relative;
  }

  .wedding-highlight::before {
    content: "?";
    display: block;
    font-size: 2rem;
    margin-bottom: 8px;
    color: var(--accent);
  }

  .wedding-highlight .wh-date {
    font-family: "Lora", Georgia, serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--accent-dark);
    margin: 0 0 6px;
  }

  .wedding-highlight .wh-text {
    font-family: "Lora", Georgia, serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--accent);
    margin: 0 0 16px;
    font-style: italic;
  }

  .wedding-highlight .wh-photo {
    width: min(320px, 80%);
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: 16px;
    border: none;
    box-shadow: 0 8px 24px rgba(183, 110, 121, 0.25);
  }

  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .reveal.from-left {
    transform: translateX(-60px);
  }

  .reveal.from-right {
    transform: translateX(60px);
  }

  .reveal.visible {
    opacity: 1;
    transform: translate(0, 0);
  }

  .rsvp-btn {
    display: inline-block;
    padding: 14px 36px;
    font-family: "Lora", Georgia, serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, var(--accent), var(--accent-dark));
    border: none;
    border-radius: 40px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(183, 110, 121, 0.35);
    transition: 0.25s ease;
    letter-spacing: 0.5px;
    margin-bottom: 20px;
  }

  .rsvp-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 22px rgba(183, 110, 121, 0.45);
  }

  .modal-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 1000;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .modal-overlay.active {
    display: flex;
  }

  .modal {
    background: #fff;
    border-radius: 20px;
    padding: 32px 28px;
    max-width: 420px;
    width: 100%;
    position: relative;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    animation: modalIn 0.35s ease;
  }

  @keyframes modalIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .modal-close {
    position: absolute;
    top: 12px;
    right: 16px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #999;
    line-height: 1;
  }

  .modal-close:hover {
    color: var(--accent-dark);
  }

  .modal h2 {
    font-family: "Lora", Georgia, serif;
    color: var(--accent-dark);
    margin: 0 0 20px;
    text-align: center;
    font-size: 1.4rem;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: var(--text);
    font-size: 0.9rem;
  }

  .form-group select,
  .form-group input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e0c4ca;
    border-radius: 10px;
    font-family: inherit;
    font-size: 0.95rem;
    color: var(--text);
    background: #fff8fa;
    outline: none;
    transition: 0.2s;
  }

  .form-group select:focus,
  .form-group input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(183, 110, 121, 0.15);
  }

  .form-group select:hover,
  .form-group input:hover {
    border-color: var(--accent);
    background: #fff0f3;
    cursor: pointer;
  }

  .guest-counter {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 6px;
  }

  .guest-counter .counter-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1.5px solid #e0c4ca;
    background: #fff8fa;
    color: var(--accent-dark);
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    line-height: 1;
    user-select: none;
  }

  .guest-counter .counter-btn:hover {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
  }

  .guest-counter .counter-value {
    font-family: "Lora", Georgia, serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--accent-dark);
    min-width: 36px;
    text-align: center;
  }

  .attendance-toggle {
    display: flex;
    gap: 12px;
    margin-top: 6px;
  }

  .attendance-toggle .toggle-btn {
    flex: 1;
    padding: 10px;
    border: 1.5px solid #e0c4ca;
    border-radius: 10px;
    background: #fff8fa;
    color: var(--text);
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
    text-align: center;
  }

  .attendance-toggle .toggle-btn:hover {
    border-color: var(--accent);
    background: #fff0f3;
  }

  .attendance-toggle .toggle-btn.selected {
    background: linear-gradient(135deg, var(--accent), var(--accent-dark));
    color: #fff;
    border-color: var(--accent-dark);
  }

  .form-submit {
    width: 100%;
    padding: 12px;
    font-family: "Lora", Georgia, serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, var(--accent), var(--accent-dark));
    border: none;
    border-radius: 12px;
    cursor: pointer;
    margin-top: 6px;
    transition: 0.2s;
  }

  .form-submit:hover {
    opacity: 0.9;
  }

  .form-success {
    text-align: center;
    padding: 20px 0;
  }

  .form-success .check {
    font-size: 3rem;
    display: block;
    margin-bottom: 10px;
  }

  .form-success p {
    font-family: "Lora", Georgia, serif;
    color: var(--accent-dark);
    font-size: 1.1rem;
  }

  .footer {
    text-align: center;
    padding: 22px;
    background: #fff7f9;
    border-top: 1px solid #f3dbe0;
    color: #6e5a5f;
    font-style: italic;
  }

  @media (max-width: 760px) {
    .container {
      margin: 0 auto;
      padding: 14px;
    }

    .invite {
      border-radius: 18px;
    }

    .hero {
      padding: 38px 18px 22px;
    }

    .events {
      grid-template-columns: 1fr;
    }

    .timeline-wrap {
      padding: 0;
    }

    .timeline {
      gap: 30px;
    }

    .timeline-item,
    .timeline-item.left,
    .timeline-item.right {
      width: 92%;
      align-self: center;
      padding-left: 0;
      padding-right: 0;
      margin-left: 0;
      margin-right: 0;
    }

    .timeline-item.left .timeline-card,
    .timeline-item.right .timeline-card {
      margin-left: 0;
      margin-right: 0;
    }

    .timeline-item.left .timeline-info,
    .timeline-item.right .timeline-info {
      text-align: center;
    }

    .timeline-photo {
      aspect-ratio: 3 / 4;
    }

    .timeline-date {
      font-size: 1.6rem;
    }

    .timeline-text {
      font-size: 1.3rem;
    }

    .location-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .location-row p {
      width: 100% !important;
    }

    .map-btn {
      width: 100%;
      text-align: center;
    }

    .modal {
      padding: 28px 22px;
    }
  }
`;

const INVITE_MARKUP = String.raw`
  <div class="invite-page">
    <main class="container">
      <section class="invite">
        <header class="hero">
          <p class="intro">Pozivamo Vas da svojim prisustvom uveličate naš poseban dan</p>
          <h1 class="names">Aleksandra i Milan</h1>

          <div class="timeline-wrap">
            <h3 class="timeline-title">Naša priča</h3>
            <ul class="timeline">
              <li class="timeline-item left reveal from-left">
                <div class="timeline-card">
                  <div class="timeline-info">
                    <div class="timeline-date">21.7.2020.</div>
                    <p class="timeline-text">Smo se sreli.</p>
                  </div>
                  <img class="timeline-photo" src="/aleksandra-milan/sreli-smo-se.png" alt="Naše prvo upoznavanje" />
                </div>
              </li>

              <li class="timeline-divider"><span class="heart">❤</span></li>

              <li class="timeline-item right reveal from-right">
                <div class="timeline-card">
                  <div class="timeline-info">
                    <div class="timeline-date">20.8.2020.</div>
                    <p class="timeline-text">Smo se zaljubili.</p>
                  </div>
                  <img class="timeline-photo" src="/aleksandra-milan/zaljubili-smo-se.png" alt="Naša zajednička fotografija" />
                </div>
              </li>

              <li class="timeline-divider"><span class="heart">❤</span></li>

              <li class="timeline-item left reveal from-left">
                <div class="timeline-card">
                  <div class="timeline-info">
                    <div class="timeline-date">10.4.2025.</div>
                    <p class="timeline-text">Smo se vjerili.</p>
                  </div>
                  <img class="timeline-photo" src="/aleksandra-milan/vjeridba.png" alt="Fotografija sa vjeridbe" />
                </div>
              </li>
            </ul>
          </div>

          <div class="wedding-highlight reveal">
            <p class="wh-date">20.7.2026.</p>
            <p class="wh-text">Ćemo se vjenčati.</p>
            <img class="wh-photo" src="/aleksandra-milan/vjencanje.png" alt="Fotografija para" />
          </div>
        </header>

        <section class="section">
          <h2>Odbrojavanje do vjenčanja</h2>
          <div id="countdown" class="countdown" aria-live="polite">
            <div class="time-box"><span class="num" id="days">0</span><span class="label">dana</span></div>
            <div class="time-box"><span class="num" id="hours">0</span><span class="label">sati</span></div>
            <div class="time-box"><span class="num" id="minutes">0</span><span class="label">minuta</span></div>
            <div class="time-box"><span class="num" id="seconds">0</span><span class="label">sekundi</span></div>
          </div>
        </section>

        <section class="section">
          <h2>Satnica</h2>
          <div class="events">
            <article class="event-card">
              <h3>Crkveno vjenčanje</h3>
              <p><strong>Vrijeme:</strong> 11:00h</p>
              <div class="location-row">
                <p style="width: 41vw;"><strong>Mjesto:</strong> Hram Hristovog Vaskrsenja, Podgorica</p>
                <a class="map-btn" href="https://www.google.com/maps/search/?api=1&query=Hram+Hristovog+Vaskrsenja+Podgorica" target="_blank" rel="noopener noreferrer">Otvori mapu</a>
              </div>
            </article>

            <article class="event-card">
              <h3>Proslava</h3>
              <p><strong>Vrijeme:</strong> 16:00h</p>
              <div class="location-row">
                <p style="width: 41vw;"><strong>Mjesto:</strong> Salaš, Podgorica</p>
                <a class="map-btn" href="https://www.google.com/maps/search/?api=1&query=Salas+Podgorica" target="_blank" rel="noopener noreferrer">Otvori mapu</a>
              </div>
            </article>
          </div>
        </section>

        <section class="section" style="text-align: center;">
          <button type="button" class="rsvp-btn" id="rsvpBtn">Potvrdi dolazak</button>
        </section>

        <footer class="footer">Radujemo se da ovaj dan podijelimo sa Vama ❤</footer>
      </section>
    </main>

    <div class="modal-overlay" id="rsvpModal">
      <div class="modal">
        <button type="button" class="modal-close" id="modalClose">&times;</button>
        <div id="rsvpForm">
          <h2>Potvrdi dolazak</h2>
          <div class="form-group">
            <label>Da li dolazite na vjenčanje?</label>
            <div class="attendance-toggle">
              <button type="button" class="toggle-btn" data-value="da">Da</button>
              <button type="button" class="toggle-btn" data-value="ne">Ne</button>
            </div>
            <input type="hidden" id="attendance" value="" />
          </div>
          <div class="form-group">
            <label for="fullName">Ime i prezime</label>
            <input type="text" id="fullName" placeholder="Unesite ime i prezime" />
          </div>
          <div class="form-group" id="guestSection" style="display:none">
            <label>S kim dolazite? (broj osoba uključujući Vas)</label>
            <div class="guest-counter">
              <button type="button" class="counter-btn" id="guestMinus">&minus;</button>
              <span class="counter-value" id="guestCount">1</span>
              <button type="button" class="counter-btn" id="guestPlus">+</button>
            </div>
            <input type="hidden" id="guests" value="1" />
            <div id="guestNames" style="margin-top: 12px;"></div>
          </div>
          <button type="button" class="form-submit" id="formSubmit">Pošalji</button>
        </div>
        <div class="form-success" id="rsvpSuccess" style="display:none">
          <span class="check">❤</span>
          <p id="successText">Hvala na potvrdi!<br />Radujemo se Vašem dolasku.</p>
        </div>
      </div>
    </div>
  </div>
`;

export default function AleksandraMilanInvite() {
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

    const query = <T extends Element>(selector: string) => root.querySelector(selector) as T | null;
    const queryAll = <T extends Element>(selector: string) => Array.from(root.querySelectorAll(selector)) as T[];
    const cleanups: Array<() => void> = [];
    const previousOverflow = document.body.style.overflow;

    const addListener = (
      target: EventTarget,
      type: string,
      handler: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) => {
      target.addEventListener(type, handler, options);
      cleanups.push(() => target.removeEventListener(type, handler, options));
    };

    const revealEls = queryAll<HTMLElement>(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((element) => revealObserver.observe(element));
    cleanups.push(() => revealObserver.disconnect());

    const rsvpBtn = query<HTMLButtonElement>("#rsvpBtn");
    const rsvpModal = query<HTMLElement>("#rsvpModal");
    const modalClose = query<HTMLButtonElement>("#modalClose");
    const formSubmit = query<HTMLButtonElement>("#formSubmit");
    const rsvpForm = query<HTMLElement>("#rsvpForm");
    const rsvpSuccess = query<HTMLElement>("#rsvpSuccess");
    const successText = query<HTMLElement>("#successText");
    const attendance = query<HTMLInputElement>("#attendance");
    const fullName = query<HTMLInputElement>("#fullName");
    const guestSection = query<HTMLElement>("#guestSection");
    const guestCount = query<HTMLElement>("#guestCount");
    const guestInput = query<HTMLInputElement>("#guests");
    const guestNamesDiv = query<HTMLElement>("#guestNames");
    const guestMinus = query<HTMLButtonElement>("#guestMinus");
    const guestPlus = query<HTMLButtonElement>("#guestPlus");
    const attendanceButtons = queryAll<HTMLButtonElement>(".attendance-toggle .toggle-btn");
    const daysEl = query<HTMLElement>("#days");
    const hoursEl = query<HTMLElement>("#hours");
    const minutesEl = query<HTMLElement>("#minutes");
    const secondsEl = query<HTMLElement>("#seconds");

    if (
      !rsvpBtn ||
      !rsvpModal ||
      !modalClose ||
      !formSubmit ||
      !rsvpForm ||
      !rsvpSuccess ||
      !successText ||
      !attendance ||
      !fullName ||
      !guestSection ||
      !guestCount ||
      !guestInput ||
      !guestNamesDiv ||
      !guestMinus ||
      !guestPlus ||
      attendanceButtons.length === 0 ||
      !daysEl ||
      !hoursEl ||
      !minutesEl ||
      !secondsEl
    ) {
      return () => {
        cleanups.forEach((cleanup) => cleanup());
        document.body.style.overflow = previousOverflow;
      };
    }

    const setModalOpen = (open: boolean) => {
      rsvpModal.classList.toggle("active", open);
      document.body.style.overflow = open ? "hidden" : previousOverflow;
      if (open) {
        window.requestAnimationFrame(() => fullName.focus());
      }
    };

    addListener(rsvpBtn, "click", () => setModalOpen(true));
    addListener(modalClose, "click", () => setModalOpen(false));
    addListener(rsvpModal, "click", (event) => {
      if (event.target === rsvpModal) {
        setModalOpen(false);
      }
    });

    const renderGuestFields = (count: number) => {
      guestNamesDiv.innerHTML = "";
      for (let index = 2; index <= count; index += 1) {
        const fieldWrap = document.createElement("div");
        fieldWrap.style.marginBottom = "8px";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Ime i prezime gosta ${index - 1}`;
        input.className = "guest-name-input";
        input.style.cssText = "width:100%;padding:10px 12px;border:1px solid #e0c4ca;border-radius:10px;font-family:inherit;font-size:.95rem;color:var(--text);background:#fff8fa;outline:none;transition:.2s;box-sizing:border-box;";

        fieldWrap.appendChild(input);
        guestNamesDiv.appendChild(fieldWrap);
      }
    };

    attendanceButtons.forEach((button) => {
      addListener(button, "click", () => {
        attendanceButtons.forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
        attendance.value = button.dataset.value ?? "";
        guestSection.style.display = attendance.value === "da" ? "block" : "none";
      });
    });

    addListener(guestMinus, "click", () => {
      const nextValue = Math.max(1, Number.parseInt(guestInput.value, 10) - 1);
      guestInput.value = String(nextValue);
      guestCount.textContent = String(nextValue);
      renderGuestFields(nextValue);
    });

    addListener(guestPlus, "click", () => {
      const nextValue = Math.min(10, Number.parseInt(guestInput.value, 10) + 1);
      guestInput.value = String(nextValue);
      guestCount.textContent = String(nextValue);
      renderGuestFields(nextValue);
    });

    addListener(formSubmit, "click", async () => {
      const attendanceValue = attendance.value;
      const fullNameValue = fullName.value.trim();
      const guestsValue = guestInput.value;

      if (!attendanceValue || !fullNameValue) {
        window.alert("Molimo popunite sva polja.");
        return;
      }

      const guestNamesList: string[] = [];
      if (attendanceValue === "da") {
        const guestInputs = queryAll<HTMLInputElement>(".guest-name-input");
        for (const input of guestInputs) {
          const value = input.value.trim();
          if (!value) {
            window.alert("Molimo unesite imena svih gostiju.");
            return;
          }
          guestNamesList.push(value);
        }
      }

      formSubmit.disabled = true;
      formSubmit.textContent = "Šaljem...";

      const dolazakText = attendanceValue === "da" ? "Da, dolazim!" : "Ne, nažalost ne mogu.";
      const statusEmoji = attendanceValue === "da" ? "✅" : "❌";
      const emailData: Record<string, string> = {
        _subject: `${statusEmoji} ${fullNameValue} je odgovorio/la na poziv za vjenčanje`,
        _template: "box",
        Poruka: `${fullNameValue} je odgovorio/la na Vaš poziv za dolazak na vjenčanje.`,
        Dolazak: dolazakText,
        "Ime i prezime": fullNameValue,
        _captcha: "false",
      };

      if (attendanceValue === "da") {
        emailData["Ukupno osoba"] = guestsValue;
        if (guestNamesList.length > 0) {
          emailData.Gosti = guestNamesList.join(", ");
        }
      }

      try {
        const response = await fetch("https://formsubmit.co/ajax/milica2001vujanovic@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(emailData),
        });

        const data = (await response.json()) as { success?: string; message?: string };

        if (data.success === "true") {
          rsvpForm.style.display = "none";
          rsvpSuccess.style.display = "block";
          successText.innerHTML =
            attendanceValue === "ne"
              ? "Hvala na odgovoru.<br />Žao nam je što nećete biti sa nama."
              : "Hvala na potvrdi!<br />Radujemo se Vašem dolasku.";
          return;
        }

        window.alert(`Greška: ${data.message ?? "Pokušajte ponovo."}`);
      } catch {
        window.alert("Greška pri slanju. Molimo pokušajte ponovo.");
      }

      formSubmit.disabled = false;
      formSubmit.textContent = "Pošalji";
    });

    const weddingDate = new Date("2026-07-20T00:00:00+02:00").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = weddingDate - now;

      if (diff <= 0) {
        daysEl.textContent = "0";
        hoursEl.textContent = "0";
        minutesEl.textContent = "0";
        secondsEl.textContent = "0";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      daysEl.textContent = String(days);
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
      secondsEl.textContent = String(seconds).padStart(2, "0");
    };

    updateCountdown();
    const countdownInterval = window.setInterval(updateCountdown, 1000);
    cleanups.push(() => window.clearInterval(countdownInterval));

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return <div ref={hostRef} style={{ display: "block", width: "100%" }} />;
}

