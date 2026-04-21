"use client";

import { useEffect, useRef } from "react";

const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Montserrat:wght@300;400&family=Cormorant+Garamond:wght@400;600&display=swap";

const INVITE_STYLES = String.raw`
  :host {
    all: initial;
    display: block;
    width: 100%;
    --text: #333333;
    --gold: #c49563;
    --paper: #fbfbf9;
  }

  :host,
  :host * {
    box-sizing: border-box;
  }

  .invite-page {
    min-height: 100vh;
    min-height: 100svh;
    padding: 16px;
    font-family: "Montserrat", sans-serif;
    color: var(--text);
    text-align: center;
    overflow-x: hidden;
    position: relative;
    background: #f7f4ee;
  }

  .bg-fixed {
    position: absolute;
    top: 16px;
    bottom: 16px;
    left: 50%;
    width: min(calc(100% - 32px), 600px);
    transform: translateX(-50%);
    background: url("/golubovi/golubovi.jpg") no-repeat center center;
    background-size: cover;
    border-radius: 30px;
    box-shadow: 0 28px 80px rgba(92, 76, 50, 0.14);
    z-index: 0;
  }

  .bg-overlay {
    position: absolute;
    top: 16px;
    bottom: 16px;
    left: 50%;
    width: min(calc(100% - 32px), 600px);
    transform: translateX(-50%);
    border-radius: 30px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.58), rgba(255, 251, 244, 0.72)),
      radial-gradient(circle at center, rgba(255, 253, 248, 0.12), rgba(255, 253, 248, 0.3));
    z-index: 1;
  }

  .overlay {
    position: relative;
    z-index: 2;
    width: min(100%, 600px);
    min-height: 900px;
    margin: 0 auto;
    padding: 56px 42px 42px;
    overflow-x: clip;
  }

  .lead {
    opacity: 0;
    animation: fadeIn 2s ease forwards;
    animation-delay: 0.5s;
    margin: 0 auto 20px;
    max-width: 400px;
    color: rgba(51, 51, 51, 0.82);
    font-family: "Cormorant Garamond", serif;
    font-size: 1.15rem;
    line-height: 1.55;
  }

  h1 {
    font-family: "Playfair Display", serif;
    font-style: italic;
    font-size: clamp(2.7rem, 10vw, 4.4rem);
    letter-spacing: 0.05em;
    line-height: 1.12;
    margin: 0;
    opacity: 0;
    transform: translateY(30px);
    animation: titleFade 1.5s ease forwards;
    animation-delay: 0.8s;
  }

  .amp {
    font-family: "Montserrat", sans-serif;
    font-weight: 300;
    margin: 0 8px;
  }

  .date-block {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    opacity: 0;
    animation: fadeUp 1.5s ease forwards;
    animation-delay: 1.3s;
    perspective: 1200px;
  }

  .date-text {
    margin-top: 24px;
    font-size: 18px;
    line-height: 1.6;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeUp 1.5s ease forwards;
    animation-delay: 1.6s;
  }

  .countdown {
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(1.35rem, 4vw, 1.9rem);
    margin-top: 28px;
    color: #5d4a35;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeUp 1.5s ease forwards;
    animation-delay: 1.9s;
  }

  .invite-text {
    font-size: 18px;
    line-height: 1.9;
    margin-top: 30px;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeUp 1.5s ease forwards;
    animation-delay: 2.2s;
  }

  .map-section {
    margin-top: 56px;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeUp 1.5s ease forwards;
    animation-delay: 2.5s;
  }

  .map-section h2 {
    margin-bottom: 30px;
    font-family: "Montserrat", serif;
    font-weight: 300;
  }

  .map-wrapper {
    position: relative;
    display: block;
    max-width: 100%;
    margin: 0 auto;
    text-decoration: none;
  }

  .map-wrapper iframe {
    width: 100%;
    height: 350px;
    border: 0;
    border-radius: 12px;
    pointer-events: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  .map-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 12px;
    transition: 0.3s;
    font-family: "Playfair Display", serif;
  }

  .map-overlay span {
    background: #ffffff;
    padding: 12px 28px;
    letter-spacing: 1px;
    font-size: 14px;
    color: #000000;
    margin-top: 0;
  }

  .map-wrapper:hover .map-overlay {
    background: rgba(0, 0, 0, 0.5);
  }

  footer {
    margin-top: 50px;
    font-size: 14px;
    opacity: 0;
    animation: fadeIn 2s ease forwards;
    animation-delay: 2.8s;
  }

  .heart {
    color: #b11226;
    font-size: 1.3em;
    display: inline-block;
    animation: pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .calendar-stack {
    position: relative;
    width: min(100%, 360px);
    height: 230px;
    margin: 0 auto;
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  .calendar-page {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--paper) 0%, #ffffff 100%);
    border-radius: 20px;
    box-shadow:
      0 15px 35px rgba(0, 0, 0, 0.12),
      0 5px 15px rgba(0, 0, 0, 0.08),
      inset 0 0 20px rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform-origin: top center;
    backface-visibility: hidden;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.7);
    transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .calendar-page::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(0, 0, 0, 0.02) 100%),
      radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.3) 0%, transparent 50%);
    pointer-events: none;
    border-radius: 20px;
  }

  .calendar-page::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4"/></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.02"/></svg>');
    opacity: 0.3;
    pointer-events: none;
    border-radius: 20px;
  }

  .page-header {
    position: absolute;
    top: 0;
    width: 100%;
    padding: 12px 10px;
    background: linear-gradient(135deg, var(--gold) 0%, #d4a574 50%, #deb896 100%);
    border-bottom: 2px solid rgba(255, 255, 255, 0.4);
    color: #ffffff;
    text-align: center;
    font-family: "Playfair Display", serif;
    letter-spacing: 1px;
    font-size: clamp(1.25rem, 4vw, 1.85rem);
    font-weight: 400;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    box-shadow:
      0 4px 12px rgba(212, 165, 116, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .page-day {
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(3.1rem, 11vw, 4rem);
    color: #1a1a1a;
    font-weight: 400;
    letter-spacing: -2px;
    text-shadow:
      0 2px 4px rgba(0, 0, 0, 0.08),
      0 1px 2px rgba(212, 165, 116, 0.15);
    line-height: 1;
    font-variant-numeric: tabular-nums;
    margin-top: 58px;
    text-align: center;
  }

  .calendar-page:nth-child(1) {
    transform: translateY(0) translateZ(0px);
  }

  .calendar-page:nth-child(2) {
    transform: translateY(6px) translateZ(-8px);
    box-shadow:
      0 12px 28px rgba(0, 0, 0, 0.15),
      0 4px 12px rgba(0, 0, 0, 0.12);
  }

  .calendar-page:nth-child(3) {
    transform: translateY(12px) translateZ(-16px);
    box-shadow:
      0 10px 24px rgba(0, 0, 0, 0.18),
      0 3px 10px rgba(0, 0, 0, 0.15);
  }

  .calendar-page:nth-child(4) {
    transform: translateY(18px) translateZ(-24px);
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.2),
      0 2px 8px rgba(0, 0, 0, 0.18);
  }

  .flip {
    animation: realisticFlip 0.08s ease-in-out forwards;
  }

  .celebrate {
    animation: celebrate 0.8s ease-out forwards;
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.15); opacity: 0.9; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes logoFade {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes titleFade {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    to { opacity: 0.8; }
  }

  @keyframes realisticFlip {
    0% { opacity: 1; transform: rotateX(0deg) translateY(0); }
    50% { opacity: 1; transform: rotateX(80deg) translateY(-8px); }
    85% { opacity: 0.5; transform: rotateX(160deg) translateY(-25px); }
    100% { opacity: 0; transform: rotateX(180deg) translateY(-35px); }
  }

  @keyframes celebrate {
    0% { transform: scale(1) rotateY(0deg); }
    50% { transform: scale(1.05) rotateY(5deg); }
    100% { transform: scale(1) rotateY(0deg); }
  }

  @media (max-width: 600px) {
    .invite-page {
      padding: 0;
      background: transparent;
    }

    .bg-fixed {
      position: fixed;
      inset: 0;
      width: auto;
      transform: none;
      border-radius: 0;
      box-shadow: none;
      z-index: -2;
    }

    .bg-overlay {
      position: fixed;
      inset: 0;
      width: auto;
      transform: none;
      border-radius: 0;
      background: transparent;
      z-index: -1;
    }

    .overlay {
      width: 100%;
      min-height: 100vh;
      min-height: 100svh;
      padding: 27vh 2vh;
      overflow-x: hidden;
    }

    .lead {
      max-width: none;
      margin-top: 2vh;
      margin-left: 5vh;
      margin-bottom: 0;
      color: inherit;
      font-family: "Montserrat", sans-serif;
      font-size: inherit;
      line-height: normal;
    }

    h1 {
      font-size: 4vh;
      margin-top: 5vh;
    }

    .date-block {
      margin-top: 1vh;
    }

    .date-text {
      margin-top: 20vh;
    }

    .invite-text {
      margin-top: 40px;
    }

    .map-section {
      margin-top: 9vh;
    }

    .countdown {
      font-size: 22px;
      margin-top: 40px;
    }

    .calendar-stack {
      width: 53vw;
      height: 22vh;
    }

    .map-wrapper iframe {
      height: 350px;
    }

    .map-overlay span {
      margin-top: 12vh;
    }

    .page-header {
      font-size: 30px;
    }

    .page-day {
      font-size: 60px;
      margin-top: 7vh;
    }
  }
`;

const INVITE_MARKUP = String.raw`
  <div class="invite-page">
    <div class="bg-fixed"></div>
    <div class="bg-overlay"></div>

    <div class="overlay">
      <p class="lead">
        Pozivamo Vas da svojim prisustvom uveličate naš poseban dan
      </p>

      <h1>Katarina <span class="amp">&</span> Vukašin</h1>

      <div class="date-block">
        <div class="calendar-stack" id="calendar-stack"></div>
      </div>

      <div class="date-text">
        Doček gostiju 16:00h - 16:45h<br />
        Imanje Knjaz, Podgorica
      </div>

      <div class="countdown" id="countdown"></div>

      <div class="invite-text">
        <p>Molimo Vas da dolazak potvrdite do 10. maja 2026. godine.</p>
        <p style="margin-top: 40px;">
          S poštovanjem,<br />
          porodice Rajković i Bojković
        </p>
      </div>

      <div class="map-section">
        <h2>Lokacija događaja</h2>

        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Imanje+Knjaz+Podgorica"
          target="_blank"
          rel="noopener noreferrer"
          class="map-wrapper"
        >
          <iframe
            src="https://www.google.com/maps?q=Imanje%20Knjaz%20Podgorica&output=embed"
            loading="lazy"
            title="Imanje Knjaz mapa"
          ></iframe>

          <div class="map-overlay">
            <span>Putanja</span>
          </div>
        </a>
      </div>

      <footer>
        S ljubavlju <span class="heart">❤</span> Katarina & Vukašin
      </footer>
    </div>
  </div>
`;

const MONTHS = [
  "JANUAR",
  "FEBRUAR",
  "MART",
  "APRIL",
  "MAJ",
  "JUN",
  "JUL",
  "AVGUST",
  "SEPTEMBAR",
  "OKTOBAR",
  "NOVEMBAR",
  "DECEMBAR",
];

export default function GoluboviInvite() {
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
    const stack = root.getElementById("calendar-stack");
    const countdown = root.getElementById("countdown");

    if (!stack || !countdown) {
      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    }

    const currentDate = new Date();
    const targetDate = new Date(2026, 5, 2);
    targetDate.setHours(23, 59, 59, 999);

    const displayDates: Date[] = [];
    const iterator = new Date(currentDate);

    if (iterator > targetDate) {
      displayDates.push(new Date(targetDate));
    } else {
      while (iterator <= targetDate) {
        displayDates.push(new Date(iterator));
        iterator.setDate(iterator.getDate() + 1);
      }
    }

    let dateIndex = 0;
    let runTimeoutId: number | null = null;

    const createPage = (date: Date) => {
      const page = document.createElement("div");
      page.className = "calendar-page";
      page.innerHTML = `
        <div class="page-header">${MONTHS[date.getMonth()]} ${date.getFullYear()}</div>
        <div class="page-day">${String(date.getDate()).padStart(2, "0")}</div>
      `;
      return page;
    };

    const initStack = () => {
      stack.innerHTML = "";

      for (let index = 0; index < 4 && index < displayDates.length; index += 1) {
        const page = createPage(displayDates[index]);
        page.style.zIndex = String(10 - index);
        stack.appendChild(page);
      }
    };

    const flipPage = () => {
      if (dateIndex >= displayDates.length - 1) {
        const finalPage = stack.children[0] as HTMLElement | undefined;
        finalPage?.classList.add("celebrate");
        return false;
      }

      const topPage = stack.children[0] as HTMLElement | undefined;
      if (!topPage) return false;

      topPage.classList.add("flip");

      const removeTimeoutId = window.setTimeout(() => {
        if (topPage.parentNode === stack) {
          topPage.remove();
        }

        dateIndex += 1;

        if (dateIndex + 3 < displayDates.length) {
          const newPage = createPage(displayDates[dateIndex + 3]);
          newPage.style.zIndex = String(7);
          stack.appendChild(newPage);
        }

        Array.from(stack.children).forEach((page, index) => {
          (page as HTMLElement).style.zIndex = String(10 - index);
        });
      }, 75);

      cleanups.push(() => window.clearTimeout(removeTimeoutId));
      return true;
    };

    const run = () => {
      if (flipPage()) {
        runTimeoutId = window.setTimeout(run, 80);
      }
    };

    initStack();
    const startTimeoutId = window.setTimeout(run, 100);
    cleanups.push(() => window.clearTimeout(startTimeoutId));
    cleanups.push(() => {
      if (runTimeoutId !== null) {
        window.clearTimeout(runTimeoutId);
      }
    });

    const weddingDate = new Date("June 2, 2026 16:00:00").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdown.textContent = `${days} dana ${hours}h ${minutes}m ${seconds}s`;
        return;
      }

      countdown.textContent = "Danas je naš dan ❤";
    };

    updateCountdown();
    const countdownIntervalId = window.setInterval(updateCountdown, 1000);
    cleanups.push(() => window.clearInterval(countdownIntervalId));

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div ref={hostRef} style={{ display: "block", width: "100%" }} />;
}
