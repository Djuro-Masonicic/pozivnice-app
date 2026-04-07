"use client";

import { useEffect, useRef } from "react";

const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600&family=Quicksand:wght@400;600&display=swap";

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

  .invite-page {
    min-height: 100vh;
    overflow-x: hidden;
    color: #000000;
    font-family: "Quicksand", sans-serif;
    text-align: center;
  }

  .bg-fixed {
    position: fixed;
    inset: 0;
    z-index: -3;
    background: url("/krstan-terzic/IMG_5224.jpeg") center/cover no-repeat;
  }

  .bg-overlay {
    position: fixed;
    inset: 0;
    z-index: -2;
    background: rgba(255, 255, 255, 0.65);
  }

  .balloons {
    position: fixed;
    top: -150px;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  }

  .balloon {
    position: absolute;
    border-radius: 50%;
    opacity: 0.85;
    animation: float linear infinite;
  }

  .balloon::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 100%;
    width: 2px;
    height: 40px;
    background: #999999;
  }

  .overlay {
    min-height: 100vh;
    padding: 70px 20px;
  }

  .content-shell {
    width: min(100%, 720px);
    margin: 0 auto;
  }

  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }

  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }

  h1 {
    margin: 0;
    font-family: "Baloo 2", sans-serif;
    font-size: 60px;
    color: #4a6c8c;
  }

  .main-text {
    margin-top: 15px;
    color: #6f8fa6;
    font-family: "Baloo 2", sans-serif;
    font-size: 32px;
  }

  .number {
    margin-top: 10px;
    color: #ff9aa2;
    font-family: "Baloo 2", sans-serif;
    font-size: 120px;
    animation: pulse 2s infinite;
  }

  .date {
    margin-top: 40px;
    font-size: 22px;
    line-height: 1.8;
  }

  .countdown {
    margin-top: 40px;
    color: #4a6c8c;
    font-size: 28px;
    font-weight: 600;
  }

  .invite-text {
    margin-top: 40px;
    font-size: 18px;
    line-height: 1.8;
  }

  .map-section {
    margin-top: 70px;
  }

  .map-title {
    margin: 0 0 20px;
    color: #4a6c8c;
    font-family: "Baloo 2", sans-serif;
    font-size: 30px;
    font-weight: 600;
  }

  .map-section iframe {
    width: 100%;
    max-width: 650px;
    height: 320px;
    border: 0;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  footer {
    margin-top: 90px;
    font-size: 16px;
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(120vh);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }

  @media (max-width: 600px) {
    .overlay {
      padding: 54px 18px;
    }

    h1 {
      font-size: 42px;
    }

    .main-text {
      font-size: 24px;
    }

    .number {
      font-size: 80px;
    }

    .countdown {
      font-size: 22px;
    }

    .date {
      font-size: 20px;
    }

    .invite-text {
      font-size: 17px;
    }
  }
`;

const INVITE_MARKUP = String.raw`
  <div class="invite-page">
    <div class="bg-fixed"></div>
    <div class="bg-overlay"></div>
    <div class="balloons" id="balloons"></div>

    <div class="overlay">
      <div class="content-shell">
        <div class="reveal">
          <h1>Krstan</h1>
        </div>

        <div class="main-text reveal">
          te poziva na svoj
        </div>

        <div class="number reveal">
          3.
        </div>

        <div class="main-text reveal">
          rođendan 🎉
        </div>

        <div class="date reveal">
          27. septembar 2026<br />
          16:00h
        </div>

        <div class="countdown reveal" id="countdown"></div>

        <div class="invite-text reveal">
          Radujem se da zajedno proslavimo moj rođendan 🎂
          <br /><br />
          📍 Event centar Taša<br />
          Pljevlja
          <br /><br />
          Molimo da dolazak potvrdite do<br />
          10. septembra
        </div>

        <div class="map-section reveal">
          <h2 class="map-title">Lokacija</h2>
          <iframe
            src="https://www.google.com/maps?q=Event%20centar%20Tasa%20Pljevlja&output=embed"
            loading="lazy"
            title="Event centar Tasa mapa"
          ></iframe>
        </div>

        <footer class="reveal">
          Vidimo se na zabavi 🎈
        </footer>
      </div>
    </div>
  </div>
`;

const BIRTHDAY_DATE = new Date("2026-09-27T16:00:00+02:00");
const BALLOON_COLORS = [
  "#ff9aa2",
  "#a0e7e5",
  "#b4f8c8",
  "#fbe7c6",
  "#cdb4db",
  "#ffc8dd",
  "#ffd6a5",
];

export default function KrstanTerzicInvite() {
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

    const countdown = qs<HTMLElement>("#countdown");
    const balloonContainer = qs<HTMLDivElement>("#balloons");

    if (!countdown || !balloonContainer) {
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    qsa<HTMLElement>(".reveal").forEach((element) => {
      revealObserver.observe(element);
    });

    const createBalloon = () => {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.style.left = `${Math.random() * 100}%`;

      const size = 30 + Math.random() * 40;
      balloon.style.width = `${size}px`;
      balloon.style.height = `${size * 1.3}px`;
      balloon.style.background =
        BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)] ?? "#ff9aa2";

      const duration = 5 + Math.random() * 10;
      balloon.style.animationDuration = `${duration}s`;

      balloonContainer.appendChild(balloon);

      const removeTimeoutId = window.setTimeout(() => {
        balloon.remove();
      }, duration * 1000);

      cleanups.push(() => window.clearTimeout(removeTimeoutId));
    };

    const balloonIntervalId = window.setInterval(createBalloon, 800);
    cleanups.push(() => window.clearInterval(balloonIntervalId));

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = BIRTHDAY_DATE.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdown.textContent = `${days} dana ${hours}h ${minutes}m ${seconds}s`;
        return;
      }

      countdown.textContent = "🎂 Danas slavim rođendan!";
    };

    updateCountdown();
    const countdownIntervalId = window.setInterval(updateCountdown, 1000);
    cleanups.push(() => window.clearInterval(countdownIntervalId));
    cleanups.push(() => revealObserver.disconnect());
    cleanups.push(() => {
      balloonContainer.innerHTML = "";
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div ref={hostRef} style={{ display: "block", width: "100%" }} />;
}
