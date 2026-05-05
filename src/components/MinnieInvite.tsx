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
    min-height: 100svh;
    overflow-x: hidden;
    color: #333333;
    font-family: "Quicksand", sans-serif;
    text-align: center;
    position: relative;
  }

  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    height: 100lvh;
    background: url("/minnie/minnie.jpg") center/cover no-repeat;
    z-index: -2;
    transform: translateZ(0);
    will-change: transform;
  }

  .bg-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    height: 100lvh;
    background: rgba(255, 255, 255, 0.55);
    z-index: -1;
    transform: translateZ(0);
    will-change: transform;
  }

  .subject-img {
    position: fixed;
    top: 10px;
    right: 10px;
    width: 140px;
    z-index: 2;
    pointer-events: none;
  }

  .container {
    position: relative;
    z-index: 2;
    width: min(100%, 700px);
    margin: auto;
    padding: 90px 20px 120px;
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  .container.show {
    opacity: 1;
  }

  h1,
  .subtitle,
  .number,
  .date,
  .countdown,
  .text,
  .map-frame,
  .footer {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeUp 0.8s ease forwards;
  }

  h1 {
    margin: 0;
    color: #ff4fa3;
    font-family: "Baloo 2", sans-serif;
    font-size: 56px;
    animation-delay: 0.2s;
  }

  .subtitle {
    margin-top: 10px;
    font-family: "Baloo 2", sans-serif;
    font-size: 28px;
  }

  .subtitle.first {
    animation-delay: 0.4s;
  }

  .subtitle.second {
    animation-delay: 0.8s;
  }

  .number {
    margin: 10px 0;
    color: #ff9aa2;
    font-family: "Baloo 2", sans-serif;
    font-size: 110px;
    line-height: 0.95;
    animation-delay: 0.6s;
  }

  .date {
    margin-top: 20px;
    font-size: 22px;
    line-height: 1.55;
    animation-delay: 1s;
  }

  .countdown {
    width: min(100%, 460px);
    min-height: 96px;
    margin: 24px auto 0;
    animation-delay: 1.2s;
  }

  .countdown-title {
    margin-bottom: 10px;
    color: #ff4fa3;
    font-family: "Baloo 2", sans-serif;
    font-size: 21px;
    font-weight: 600;
    line-height: 1.1;
  }

  .countdown-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
  }

  .countdown-card {
    position: relative;
    min-width: 0;
    padding: 10px 8px 8px;
    overflow: hidden;
    border: 1px solid rgba(255, 79, 163, 0.18);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.68);
    box-shadow: 0 10px 24px rgba(255, 154, 162, 0.16);
    animation: countdownBob 2.8s ease-in-out infinite;
  }

  .countdown-card:nth-child(2) {
    animation-delay: 0.18s;
  }

  .countdown-card:nth-child(3) {
    animation-delay: 0.36s;
  }

  .countdown-card:nth-child(4) {
    animation-delay: 0.54s;
  }

  .countdown-card::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 50%;
    width: 20px;
    height: 20px;
    border-radius: 999px;
    background: rgba(255, 154, 162, 0.24);
    transform: translateX(-50%);
  }

  .countdown-value {
    position: relative;
    display: block;
    color: #ff4fa3;
    font-family: "Baloo 2", sans-serif;
    font-size: clamp(1.35rem, 5vw, 2.1rem);
    font-weight: 600;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    transition: transform 0.22s ease, color 0.22s ease;
  }

  .countdown-value.tick {
    color: #ff9aa2;
    transform: scale(1.16);
  }

  .countdown-label {
    display: block;
    margin-top: 6px;
    color: #555555;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .countdown-message {
    display: none;
    color: #ff4fa3;
    font-family: "Baloo 2", sans-serif;
    font-size: 27px;
    font-weight: 600;
  }

  .countdown.is-today .countdown-title,
  .countdown.is-today .countdown-grid {
    display: none;
  }

  .countdown.is-today .countdown-message {
    display: block;
  }

  .text {
    margin-top: 40px;
    font-size: 19px;
    line-height: 1.55;
    animation-delay: 1.4s;
  }

  .map-frame {
    width: 100%;
    height: 300px;
    margin-top: 30px;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 10px 28px rgba(255, 79, 163, 0.14);
    animation-delay: 1.6s;
  }

  .map-frame iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }

  .footer {
    margin-top: 50px;
    font-size: 18px;
    animation-delay: 1.8s;
  }

  .balloons,
  .effects {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    height: 100lvh;
    overflow: hidden;
    pointer-events: none;
  }

  .balloons {
    z-index: 3;
  }

  .effects {
    z-index: 4;
  }

  .balloon-wrap {
    position: absolute;
    bottom: -150px;
    animation: floatUp linear infinite;
  }

  .balloon {
    position: relative;
    width: 40px;
    height: 50px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    opacity: 0.45;
    cursor: pointer;
    pointer-events: auto;
    appearance: none;
    -webkit-appearance: none;
    animation: sway 3s ease-in-out infinite alternate;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
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

  .pop-ring {
    position: fixed;
    border: 2px solid #ff69b4;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%) scale(0);
    animation: ring 0.4s ease-out forwards;
  }

  .sparkle {
    position: fixed;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: radial-gradient(circle, #ffffff 20%, #ff69b4 70%, transparent);
    pointer-events: none;
    animation: fadeOut 0.8s ease-out forwards;
  }

  .confetti {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 14px;
    pointer-events: none;
    animation: confettiExplode var(--duration) ease forwards;
  }

  @keyframes floatUp {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(-120vh);
    }
  }

  @keyframes sway {
    from {
      transform: translateX(-10px);
    }

    to {
      transform: translateX(10px);
    }
  }

  @keyframes pop {
    0% {
      transform: scale(1);
    }

    40% {
      transform: scale(1.25);
    }

    60% {
      transform: scale(0.9);
    }

    100% {
      opacity: 0;
      transform: scale(0);
    }
  }

  @keyframes ring {
    to {
      opacity: 0;
      transform: translate(-50%, -50%) scale(2);
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(-15px) scale(0.5);
    }
  }

  @keyframes confettiExplode {
    0% {
      transform: translate(-50%, -50%) scale(0);
    }

    30% {
      transform: translate(var(--x), var(--y)) scale(1.2);
    }

    100% {
      opacity: 0;
      transform: translate(var(--x-end), var(--y-end)) scale(0.6) rotate(720deg);
    }
  }

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes countdownBob {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-5px);
    }
  }

  @media (min-width: 601px) {
    .invite-page {
      padding: 16px;
      background: #f7f4ee;
    }

    .bg {
      position: absolute;
      top: 16px;
      bottom: 16px;
      left: 50%;
      width: min(calc(100% - 32px), 600px);
      height: auto;
      transform: translateX(-50%);
      border-radius: 30px;
      box-shadow: 0 28px 80px rgba(92, 76, 50, 0.14);
      z-index: 0;
      will-change: auto;
    }

    .bg-overlay {
      position: absolute;
      top: 16px;
      bottom: 16px;
      left: 50%;
      width: min(calc(100% - 32px), 600px);
      height: auto;
      transform: translateX(-50%);
      border-radius: 30px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.44), rgba(255, 251, 252, 0.6)),
        radial-gradient(circle at center, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.34));
      z-index: 1;
      will-change: auto;
    }

    .subject-img {
      position: absolute;
      top: 28px;
      left: calc(50% + 140px);
      width: 130px;
      transform: translateX(-50%);
      z-index: 3;
    }

    .container {
      width: min(100%, 600px);
      min-height: 900px;
      padding: 56px 42px 42px;
      overflow-x: clip;
    }
  }

  @media (max-width: 600px) {
    .container {
      padding: 82px 20px 96px;
    }

    .subject-img {
      width: 100px;
    }

    h1 {
      font-size: 40px;
    }

    .subtitle {
      font-size: 24px;
    }

    .number {
      font-size: 70px;
    }

    .date {
      font-size: 20px;
    }

    .countdown {
      width: min(100%, 340px);
      min-height: 88px;
    }

    .countdown-title {
      font-size: 19px;
    }

    .countdown-grid {
      gap: 7px;
    }

    .countdown-card {
      padding: 9px 4px 7px;
      border-radius: 14px;
    }

    .countdown-label {
      font-size: 9px;
      letter-spacing: 0.05em;
    }

    .text {
      font-size: 18px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    h1,
    .subtitle,
    .number,
    .date,
    .countdown,
    .text,
    .map-frame,
    .footer {
      opacity: 1;
      transform: none;
      animation: none;
    }

    .container {
      opacity: 1;
    }

    .balloons,
    .effects {
      display: none;
    }
  }
`;

const INVITE_MARKUP = String.raw`
  <div class="invite-page">
    <div class="bg"></div>
    <div class="bg-overlay"></div>
    <div class="balloons" id="balloons"></div>
    <div class="effects" id="effects"></div>

    <img src="/minnie/subject.png" class="subject-img" alt="" />

    <main class="container" id="content">
      <h1>Anja</h1>
      <div class="subtitle first">te poziva na svoj</div>
      <div class="number">1.</div>
      <div class="subtitle second">ro&#273;endan &#127881;</div>

      <div class="date">27. septembar 2026<br />16:00h</div>
      <section class="countdown" id="countdown" aria-live="polite">
        <div class="countdown-title">Do zabave je ostalo</div>
        <div class="countdown-grid">
          <div class="countdown-card">
            <span class="countdown-value" data-countdown-unit="days">00</span>
            <span class="countdown-label">Dana</span>
          </div>
          <div class="countdown-card">
            <span class="countdown-value" data-countdown-unit="hours">00</span>
            <span class="countdown-label">Sati</span>
          </div>
          <div class="countdown-card">
            <span class="countdown-value" data-countdown-unit="minutes">00</span>
            <span class="countdown-label">Min</span>
          </div>
          <div class="countdown-card">
            <span class="countdown-value" data-countdown-unit="seconds">00</span>
            <span class="countdown-label">Sek</span>
          </div>
        </div>
        <div class="countdown-message">Danas slavimo! &#127874;</div>
      </section>

      <div class="text">
        Radujem se da zajedno proslavimo moj ro&#273;endan &#127874;<br /><br />
        &#128205; Sala&#353;, Podgorica<br /><br />
        Molimo da dolazak potvrdite do<br />10. septembra
      </div>

      <div class="map-frame">
        <iframe
          src="https://www.google.com/maps?q=Sala%C5%A1%20Podgorica&output=embed"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Salaš Podgorica mapa"
        ></iframe>
      </div>

      <div class="footer">Vidimo se na zabavi &#127880;</div>
    </main>
  </div>
`;

const BIRTHDAY_DATE = new Date("2026-09-27T16:00:00+02:00");
const BALLOON_COLORS = ["#ff9aa2", "#ffb7b2", "#ffdac1", "#b5ead7", "#c7ceea"];
const CONFETTI_COUNT = 100;

export default function MinnieInvite() {
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

    const content = qs<HTMLElement>("#content");
    const countdown = qs<HTMLElement>("#countdown");
    const balloons = qs<HTMLElement>("#balloons");
    const effects = qs<HTMLElement>("#effects");
    const countdownValues = {
      days: qs<HTMLElement>('[data-countdown-unit="days"]'),
      hours: qs<HTMLElement>('[data-countdown-unit="hours"]'),
      minutes: qs<HTMLElement>('[data-countdown-unit="minutes"]'),
      seconds: qs<HTMLElement>('[data-countdown-unit="seconds"]'),
    };

    if (
      !content ||
      !countdown ||
      !balloons ||
      !effects ||
      !countdownValues.days ||
      !countdownValues.hours ||
      !countdownValues.minutes ||
      !countdownValues.seconds
    ) {
      return;
    }

    const countdownDays = countdownValues.days;
    const countdownHours = countdownValues.hours;
    const countdownMinutes = countdownValues.minutes;
    const countdownSeconds = countdownValues.seconds;

    const timeouts = new Set<number>();

    const addTimeout = (callback: () => void, delay: number) => {
      const timeoutId = window.setTimeout(() => {
        timeouts.delete(timeoutId);
        callback();
      }, delay);
      timeouts.add(timeoutId);
      return timeoutId;
    };

    const createPopRing = (x: number, y: number) => {
      const ring = document.createElement("div");
      ring.className = "pop-ring";
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.style.width = "20px";
      ring.style.height = "20px";
      effects.appendChild(ring);
      addTimeout(() => ring.remove(), 400);
    };

    const sparkle = (x: number, y: number) => {
      const item = document.createElement("div");
      item.className = "sparkle";
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      effects.appendChild(item);
      addTimeout(() => item.remove(), 800);
    };

    const sparkleBurst = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      for (let index = 0; index < 6; index += 1) {
        sparkle(
          rect.left + rect.width / 2 + (Math.random() * 20 - 10),
          rect.top + rect.height / 2 + (Math.random() * 20 - 10),
        );
      }
    };

    const createBalloon = () => {
      const wrap = document.createElement("div");
      wrap.className = "balloon-wrap";
      wrap.style.left = `${Math.random() * 100}vw`;
      wrap.style.animationDuration = `${12 + Math.random() * 8}s`;

      const balloon = document.createElement("button");
      balloon.type = "button";
      balloon.className = "balloon";
      balloon.setAttribute("aria-label", "Pukni balon");
      balloon.style.background =
        BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)] ?? "#ff9aa2";

      const handlePop = (event: MouseEvent) => {
        event.stopPropagation();

        const rect = balloon.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        createPopRing(x, y);
        sparkleBurst(balloon);
        balloon.style.animation = "pop 0.4s ease forwards";
        addTimeout(() => wrap.remove(), 400);
      };

      balloon.addEventListener("click", handlePop);
      cleanups.push(() => balloon.removeEventListener("click", handlePop));

      wrap.appendChild(balloon);
      balloons.appendChild(wrap);

      addTimeout(() => wrap.remove(), 22000);
    };

    const launchConfetti = (done: () => void) => {
      for (let index = 0; index < CONFETTI_COUNT; index += 1) {
        const item = document.createElement("div");
        item.className = "confetti";

        const angle = Math.random() * 2 * Math.PI;
        const distance = 150 + Math.random() * 200;
        const duration = 1.5 + Math.random();

        item.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
        item.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
        item.style.setProperty("--x-end", `${Math.cos(angle) * distance * 1.5}px`);
        item.style.setProperty("--y-end", `${Math.sin(angle) * distance + 300}px`);
        item.style.setProperty("--duration", `${duration}s`);
        item.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;

        effects.appendChild(item);
        addTimeout(() => item.remove(), 2600);
      }

      addTimeout(done, 1800);
    };

    const pulseValue = (element: HTMLElement, value: string) => {
      if (element.textContent === value) return;

      element.textContent = value;
      element.classList.remove("tick");
      void element.offsetWidth;
      element.classList.add("tick");
      addTimeout(() => element.classList.remove("tick"), 220);
    };

    const pad = (value: number) => String(value).padStart(2, "0");

    const updateCountdown = () => {
      const distance = BIRTHDAY_DATE.getTime() - Date.now();

      if (distance <= 0) {
        countdown.classList.add("is-today");
        return;
      }

      countdown.classList.remove("is-today");
      const days = Math.floor(distance / 86400000);
      const hours = Math.floor((distance % 86400000) / 3600000);
      const minutes = Math.floor((distance % 3600000) / 60000);
      const seconds = Math.floor((distance % 60000) / 1000);

      pulseValue(countdownDays, pad(days));
      pulseValue(countdownHours, pad(hours));
      pulseValue(countdownMinutes, pad(minutes));
      pulseValue(countdownSeconds, pad(seconds));
    };

    let lastSparkleAt = 0;
    const handlePointerMove = (event: PointerEvent) => {
      const now = Date.now();
      if (now - lastSparkleAt < 45) return;
      lastSparkleAt = now;
      sparkle(event.clientX, event.clientY);
    };

    updateCountdown();
    const countdownIntervalId = window.setInterval(updateCountdown, 1000);
    cleanups.push(() => window.clearInterval(countdownIntervalId));

    for (let index = 0; index < 8; index += 1) {
      createBalloon();
    }

    const balloonIntervalId = window.setInterval(createBalloon, 4000);
    cleanups.push(() => window.clearInterval(balloonIntervalId));

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    cleanups.push(() => window.removeEventListener("pointermove", handlePointerMove));

    launchConfetti(() => {
      content.classList.add("show");
    });

    cleanups.push(() => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeouts.clear();
      balloons.innerHTML = "";
      effects.innerHTML = "";
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div ref={hostRef} style={{ display: "block", width: "100%" }} />;
}
