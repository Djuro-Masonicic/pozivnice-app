"use client";

import { useEffect, useRef } from "react";

const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Allura&display=swap";

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

  .page-wrap {
    min-height: 100vh;
    padding: 16px;
    background: #f7f4ee;
    color: #4e4031;
    font-family: "Cormorant Garamond", serif;
  }

  .page {
    width: min(100%, 760px);
    margin: 0 auto;
  }

  .invitation {
    position: relative;
    width: min(100%, 600px);
    min-height: 900px;
    margin: 0 auto;
    padding: 56px 42px 42px;
    overflow: hidden;
    border-radius: 30px;
    background: url("/dance/background.png") center/cover no-repeat;
    box-shadow: 0 28px 80px rgba(92, 76, 50, 0.14);
    isolation: isolate;
  }

  .invitation::before,
  .invitation::after {
    content: "";
    position: absolute;
    pointer-events: none;
  }

  .invitation::before {
    inset: 0;
    background: radial-gradient(circle at center, rgba(255, 253, 248, 0.16), rgba(255, 253, 248, 0.28));
    opacity: 1;
    z-index: -2;
  }

  .invitation::after {
    inset: 16px;
    border: 1px solid rgba(119, 98, 66, 0.12);
    border-radius: 24px;
    z-index: -1;
  }

  .content {
    position: relative;
    z-index: 1;
    text-align: center;
  }

  .eyebrow,
  .detail-label,
  .countdown-label,
  .countdown-heading {
    text-transform: uppercase;
    letter-spacing: 0.18em;
  }

  .names {
    margin: 7vh 0 0;
    font-family: "Allura", cursive;
    font-size: clamp(3rem, 13vw, 5.6rem);
    font-weight: 400;
    text-shadow: 0 4px 14px rgba(119, 98, 66, 0.06);
  }

  .subcopy {
    max-width: 400px;
    margin: 0 auto;
    font-size: 1.18rem;
    font-weight: 500;
    line-height: 1.55;
    letter-spacing: 0.01em;
    color: rgba(78, 64, 49, 0.9);
  }

  .details {
    max-width: 470px;
    margin: 0 auto 26px;
    text-align: center;
  }

  .details-top {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;
    margin-bottom: 28px;
  }

  .details-top .detail {
    flex: 1 1 0;
    min-width: 0;
  }

  .detail-address {
    position: relative;
    padding-top: 10px;
  }

  .detail-address::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 180px;
    height: 1px;
    transform: translateX(-50%);
    background: linear-gradient(to right, transparent, rgba(119, 98, 66, 0.22), transparent);
  }

  .detail-label {
    margin-bottom: 8px;
    font-size: 0.78rem;
    font-weight: 700;
    color: rgba(78, 64, 49, 0.74);
  }

  .detail-value {
    font-size: 1.54rem;
    line-height: 1.08;
    font-weight: 600;
  }

  .detail-value.address {
    font-size: 1.2rem;
    line-height: 1.32;
  }

  .address-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 14px;
    padding: 8px 18px;
    border: 1px solid rgba(119, 98, 66, 0.24);
    border-radius: 999px;
    background: rgba(255, 251, 244, 0.58);
    color: #776242;
    font-size: 0.92rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 6px 16px rgba(119, 98, 66, 0.06);
  }

  .address-link:hover {
    background: rgba(255, 251, 244, 0.86);
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(119, 98, 66, 0.1);
  }

  .countdown {
    width: 100%;
    margin: 0 auto;
    padding: 12px 0 0;
    text-align: center;
  }

  .countdown-heading {
    font-size: 0.78rem;
    font-weight: 700;
    color: rgba(78, 64, 49, 0.72);
    margin-bottom: 10px;
  }

  .countdown-date {
    margin-bottom: 16px;
    font-size: 1rem;
    color: #776242;
  }

  .countdown-grid {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 18px;
    flex-wrap: nowrap;
  }

  .countdown-value {
    display: block;
    margin-bottom: 5px;
    font-size: clamp(1.35rem, 3vw, 1.8rem);
    line-height: 1;
    color: #776242;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .countdown-label {
    font-size: 0.58rem;
    font-weight: 700;
    color: rgba(78, 64, 49, 0.66);
  }

  .countdown-message {
    margin-top: 12px;
    font-size: 0.98rem;
    color: rgba(78, 64, 49, 0.88);
  }

  .music-toggle {
    position: fixed;
    top: 18px;
    right: 18px;
    z-index: 20;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 18px;
    border: 1px solid rgba(119, 98, 66, 0.28);
    border-radius: 999px;
    background: rgba(255, 251, 244, 0.82);
    color: #776242;
    font-family: "Cormorant Garamond", serif;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(119, 98, 66, 0.1);
    transition: transform 0.25s ease, background 0.25s ease;
  }

  .music-toggle:hover {
    transform: translateY(-1px);
    background: rgba(255, 251, 244, 0.95);
  }

  .rsvp-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 18px;
    padding: 12px 28px;
    border: 1px solid rgba(119, 98, 66, 0.34);
    border-radius: 999px;
    background: rgba(255, 251, 244, 0.72);
    color: #776242;
    font-family: "Cormorant Garamond", serif;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 8px 20px rgba(119, 98, 66, 0.08);
  }

  .rsvp-button:hover {
    transform: translateY(-2px);
    background: rgba(255, 251, 244, 0.92);
    box-shadow: 0 12px 24px rgba(119, 98, 66, 0.12);
  }

  .modal-overlay {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 1000;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(58, 43, 47, 0.4);
    backdrop-filter: blur(3px);
  }

  .modal-overlay.active {
    display: flex;
  }

  .modal {
    position: relative;
    width: min(100%, 430px);
    padding: 28px 24px 24px;
    border-radius: 24px;
    background: rgba(255, 251, 244, 0.96);
    border: 1px solid rgba(119, 98, 66, 0.16);
    box-shadow: 0 24px 60px rgba(58, 43, 47, 0.18);
    animation: modalIn 0.3s ease;
  }

  @keyframes modalIn {
    from {
      opacity: 0;
      transform: translateY(24px) scale(0.97);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 14px;
    border: 0;
    background: transparent;
    color: rgba(78, 64, 49, 0.56);
    font-size: 1.8rem;
    line-height: 1;
    cursor: pointer;
  }

  .modal-title {
    margin: 0 0 18px;
    text-align: center;
    font-size: 1.7rem;
    font-weight: 600;
    color: #776242;
  }

  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }

  .form-group label {
    display: block;
    margin-bottom: 7px;
    font-size: 0.96rem;
    font-weight: 600;
    color: rgba(78, 64, 49, 0.82);
  }

  .form-group input {
    width: 100%;
    padding: 11px 13px;
    border: 1px solid rgba(119, 98, 66, 0.18);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.8);
    color: #4e4031;
    font: inherit;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  .form-group input:focus {
    border-color: rgba(119, 98, 66, 0.42);
    box-shadow: 0 0 0 3px rgba(154, 135, 97, 0.12);
    background: rgba(255, 255, 255, 0.96);
  }

  .attendance-toggle {
    display: flex;
    gap: 10px;
  }

  .toggle-btn {
    flex: 1 1 0;
    padding: 11px 12px;
    border: 1px solid rgba(119, 98, 66, 0.18);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.76);
    color: #4e4031;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }

  .toggle-btn.selected {
    background: linear-gradient(135deg, rgba(154, 135, 97, 0.95), rgba(119, 98, 66, 0.96));
    border-color: rgba(119, 98, 66, 0.96);
    color: #fff;
  }

  .guest-counter {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 4px;
  }

  .counter-btn {
    width: 38px;
    height: 38px;
    border: 1px solid rgba(119, 98, 66, 0.18);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.8);
    color: #776242;
    font-size: 1.35rem;
    line-height: 1;
    cursor: pointer;
  }

  .counter-value {
    min-width: 32px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #776242;
  }

  .guest-names {
    display: grid;
    gap: 8px;
    margin-top: 12px;
  }

  .form-submit {
    width: 100%;
    margin-top: 6px;
    padding: 12px 18px;
    border: 0;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(154, 135, 97, 0.95), rgba(119, 98, 66, 0.96));
    color: #fff;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  .form-submit:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  .form-success {
    display: none;
    padding: 12px 0 4px;
    text-align: center;
  }

  .form-success.active {
    display: block;
  }

  .form-success .check {
    display: block;
    margin-bottom: 8px;
    font-size: 2.6rem;
    color: #776242;
  }

  .form-success p {
    margin: 0;
    font-size: 1.08rem;
    line-height: 1.5;
    color: rgba(78, 64, 49, 0.84);
  }

  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .reveal.from-left {
    transform: translateX(-48px);
  }

  .reveal.from-right {
    transform: translateX(48px);
  }

  .reveal.visible {
    opacity: 1;
    transform: translate(0, 0);
  }

  @media (max-width: 600px) {
    .page-wrap {
      padding: 10px;
    }

    .invitation {
      padding: 52px 24px 32px;
      border-radius: 24px;
    }

    .music-toggle {
      top: 12px;
      right: 12px;
      padding: 9px 14px;
      font-size: 0.88rem;
    }

    .details {
      max-width: 100%;
    }

    .details-top {
      gap: 18px;
      margin-top: 30px;
    }

    .detail-address {
      margin-top: 22px;
      padding-top: 24px;
    }

    .detail-value {
      font-size: 1.42rem;
    }

    .detail-value.address {
      font-size: 1.18rem;
    }

    .countdown {
      padding-top: 0;
    }

    .countdown-grid {
      gap: 12px;
      flex-wrap: wrap;
    }
  }
`;

const INVITE_MARKUP = String.raw`
  <div class="page-wrap">
    <button class="music-toggle" id="music-toggle" type="button">Pusti muziku</button>
    <audio id="bg-music" loop preload="auto" src="/dance/muzika.mp3"></audio>

    <div class="page">
      <main class="invitation">
        <section class="content">
          <h1 class="names reveal">Anja &amp; Stefan</h1>
          <div class="subcopy reveal">
            Pozivamo Vas da svojim prisustvom uveličate naš poseban dan
          </div>

          <div class="details">
            <div class="details-top">
              <article class="detail reveal from-left">
                <div class="detail-label">Datum</div>
                <div class="detail-value">15. jun 2026</div>
              </article>

              <article class="detail reveal from-right">
                <div class="detail-label">Vrijeme</div>
                <div class="detail-value">15h</div>
              </article>
            </div>

            <article class="detail detail-address reveal">
              <div class="detail-label">Adresa</div>
              <div class="detail-value address">Imanje Knjaz, Podgorica</div>
              <a
                class="address-link"
                href="https://www.google.com/maps/place/Imanje+Knjaz/@42.4704426,19.1817903,17z/data=!3m1!4b1!4m9!3m8!1s0x134dbffd40f83d9f:0xb5313e4933d8a2a9!5m2!4m1!1i2!8m2!3d42.4704387!4d19.1866612!16s%2Fg%2F11fzn__p3q?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                Otvori mapu
              </a>
            </article>
          </div>

          <section class="countdown reveal from-left" id="countdown" aria-live="polite">
            <div class="countdown-date">Do našeg dana ostalo je još</div>
            <div class="countdown-grid">
              <div class="countdown-item">
                <span class="countdown-value" data-unit="days">00</span>
                <span class="countdown-label">Dana</span>
              </div>
              <div class="countdown-item">
                <span class="countdown-value" data-unit="hours">00</span>
                <span class="countdown-label">Sati</span>
              </div>
              <div class="countdown-item">
                <span class="countdown-value" data-unit="minutes">00</span>
                <span class="countdown-label">Minuta</span>
              </div>
              <div class="countdown-item">
                <span class="countdown-value" data-unit="seconds">00</span>
                <span class="countdown-label">Sekundi</span>
              </div>
            </div>
            <div class="countdown-message" id="countdown-message"></div>
            <button class="rsvp-button" id="rsvpBtn" type="button">Potvrdi dolazak</button>
          </section>
        </section>
      </main>
    </div>

    <div class="modal-overlay" id="rsvpModal">
      <div class="modal">
        <button class="modal-close" id="modalClose" type="button" aria-label="Zatvori">&times;</button>

        <div id="rsvpForm">
          <h2 class="modal-title">Potvrdi dolazak</h2>

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

          <div class="form-group" id="guestSection" style="display: none;">
            <label>S kim dolazite? (uključujući Vas)</label>
            <div class="guest-counter">
              <button type="button" class="counter-btn" id="guestMinus">&minus;</button>
              <span class="counter-value" id="guestCount">1</span>
              <button type="button" class="counter-btn" id="guestPlus">+</button>
            </div>
            <input type="hidden" id="guests" value="1" />
            <div class="guest-names" id="guestNames"></div>
          </div>

          <button class="form-submit" id="formSubmit" type="button">Pošalji</button>
        </div>

        <div class="form-success" id="rsvpSuccess">
          <span class="check">❤</span>
          <p>Hvala na potvrdi.<br />Radujemo se Vašem dolasku.</p>
        </div>
      </div>
    </div>
  </div>
`;

const RSVP_EMAIL = "milica2001vujanovic@gmail.com";
const WEDDING_DATE = new Date("2026-06-15T15:00:00+02:00");

export default function DanceInvite() {
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

    const music = qs<HTMLAudioElement>("#bg-music");
    const musicToggle = qs<HTMLButtonElement>("#music-toggle");
    const rsvpBtn = qs<HTMLButtonElement>("#rsvpBtn");
    const rsvpModal = qs<HTMLDivElement>("#rsvpModal");
    const modalClose = qs<HTMLButtonElement>("#modalClose");
    const formSubmit = qs<HTMLButtonElement>("#formSubmit");
    const rsvpForm = qs<HTMLDivElement>("#rsvpForm");
    const rsvpSuccess = qs<HTMLDivElement>("#rsvpSuccess");
    const guestSection = qs<HTMLDivElement>("#guestSection");
    const attendanceInput = qs<HTMLInputElement>("#attendance");
    const fullNameInput = qs<HTMLInputElement>("#fullName");
    const guestCount = qs<HTMLSpanElement>("#guestCount");
    const guestInput = qs<HTMLInputElement>("#guests");
    const guestNamesDiv = qs<HTMLDivElement>("#guestNames");
    const countdown = qs<HTMLElement>("#countdown");
    const countdownMessage = qs<HTMLElement>("#countdown-message");
    const countdownValues = {
      days: qs<HTMLElement>('[data-unit="days"]'),
      hours: qs<HTMLElement>('[data-unit="hours"]'),
      minutes: qs<HTMLElement>('[data-unit="minutes"]'),
      seconds: qs<HTMLElement>('[data-unit="seconds"]'),
    };

    if (
      !music ||
      !musicToggle ||
      !rsvpBtn ||
      !rsvpModal ||
      !modalClose ||
      !formSubmit ||
      !rsvpForm ||
      !rsvpSuccess ||
      !guestSection ||
      !attendanceInput ||
      !fullNameInput ||
      !guestCount ||
      !guestInput ||
      !guestNamesDiv ||
      !countdown ||
      !countdownMessage ||
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

    let musicPlaying = false;
    let countdownIntervalId: number | null = null;

    const setMusicLabel = () => {
      musicToggle.textContent = musicPlaying ? "Pauziraj muziku" : "Pusti muziku";
    };

    const tryStartMusic = async () => {
      try {
        await music.play();
        musicPlaying = true;
        setMusicLabel();
        return true;
      } catch {
        musicPlaying = false;
        setMusicLabel();
        return false;
      }
    };

    const handleMusicToggle = async () => {
      if (!musicPlaying) {
        await tryStartMusic();
        return;
      }

      music.pause();
      musicPlaying = false;
      setMusicLabel();
    };

    const renderGuestFields = (count: number) => {
      guestNamesDiv.innerHTML = "";

      for (let index = 2; index <= count; index += 1) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Ime i prezime gosta ${index - 1}`;
        input.className = "guest-name-input";
        guestNamesDiv.appendChild(input);
      }
    };

    const closeModal = () => {
      rsvpModal.classList.remove("active");
    };

    const openModal = () => {
      rsvpModal.classList.add("active");
    };

    const pad = (value: number) => String(value).padStart(2, "0");

    const updateCountdown = () => {
      const now = new Date();
      const distance = WEDDING_DATE.getTime() - now.getTime();

      if (distance <= 0) {
        countdownDays.textContent = "00";
        countdownHours.textContent = "00";
        countdownMinutes.textContent = "00";
        countdownSeconds.textContent = "00";
        countdownMessage.textContent = "Naš poseban dan je stigao.";

        if (countdownIntervalId !== null) {
          window.clearInterval(countdownIntervalId);
          countdownIntervalId = null;
        }

        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      countdownDays.textContent = pad(days);
      countdownHours.textContent = pad(hours);
      countdownMinutes.textContent = pad(minutes);
      countdownSeconds.textContent = pad(seconds);
      countdownMessage.textContent = "";
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -18% 0px",
      },
    );

    qsa<HTMLElement>(".reveal").forEach((element) => {
      revealObserver.observe(element);
    });

    const countdownObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (countdownIntervalId === null) {
            updateCountdown();
            countdownIntervalId = window.setInterval(updateCountdown, 1000);
          }

          countdownObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -18% 0px",
      },
    );

    countdownObserver.observe(countdown);

    const attendanceButtons = qsa<HTMLButtonElement>(".attendance-toggle .toggle-btn");
    attendanceButtons.forEach((button) => {
      const clickHandler = () => {
        attendanceButtons.forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
        attendanceInput.value = button.dataset.value ?? "";
        guestSection.style.display = button.dataset.value === "da" ? "block" : "none";
      };

      button.addEventListener("click", clickHandler);
      cleanups.push(() => button.removeEventListener("click", clickHandler));
    });

    const plusButton = qs<HTMLButtonElement>("#guestPlus");
    const minusButton = qs<HTMLButtonElement>("#guestMinus");

    if (plusButton && minusButton) {
      const handleMinus = () => {
        const value = Number.parseInt(guestInput.value, 10);
        if (value > 1) {
          const nextValue = value - 1;
          guestInput.value = String(nextValue);
          guestCount.textContent = String(nextValue);
          renderGuestFields(nextValue);
        }
      };

      const handlePlus = () => {
        const value = Number.parseInt(guestInput.value, 10);
        if (value < 10) {
          const nextValue = value + 1;
          guestInput.value = String(nextValue);
          guestCount.textContent = String(nextValue);
          renderGuestFields(nextValue);
        }
      };

      minusButton.addEventListener("click", handleMinus);
      plusButton.addEventListener("click", handlePlus);

      cleanups.push(() => minusButton.removeEventListener("click", handleMinus));
      cleanups.push(() => plusButton.removeEventListener("click", handlePlus));
    }

    const handleSubmit = async () => {
      const attendance = attendanceInput.value;
      const fullName = fullNameInput.value.trim();
      const guests = guestInput.value;

      if (!attendance || !fullName) {
        window.alert("Molimo popunite sva polja.");
        return;
      }

      const guestNames: string[] = [];
      if (attendance === "da") {
        const inputs = qsa<HTMLInputElement>(".guest-name-input");
        for (const input of inputs) {
          if (!input.value.trim()) {
            window.alert("Molimo unesite imena svih gostiju.");
            return;
          }

          guestNames.push(input.value.trim());
        }
      }

      formSubmit.disabled = true;
      formSubmit.textContent = "Šaljem...";

      const statusIcon = attendance === "da" ? "✅" : "❌";
      const emailData: Record<string, string> = {
        _subject: `${statusIcon} Odgovor na pozivnicu - ${fullName}`,
        _template: "box",
        _captcha: "false",
        Status: statusIcon,
        Dolazak: attendance === "da" ? "✅ Da, dolazim." : "❌ Ne, nažalost ne mogu.",
        "Ime i prezime": fullName,
      };

      if (attendance === "da") {
        emailData["Ukupno osoba"] = guests;
        if (guestNames.length > 0) {
          emailData.Gosti = guestNames.join(", ");
        }
      }

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${RSVP_EMAIL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(emailData),
        });

        const data = (await response.json()) as { success?: boolean | string };
        if (data.success === true || data.success === "true") {
          rsvpForm.style.display = "none";
          rsvpSuccess.classList.add("active");

          const successText = rsvpSuccess.querySelector("p");
          if (attendance === "ne" && successText) {
            successText.innerHTML = "Hvala na odgovoru.<br />Žao nam je što nećete biti sa nama.";
          }

          return;
        }

        window.alert("Greška pri slanju. Pokušajte ponovo.");
      } catch {
        window.alert("Greška pri slanju. Pokušajte ponovo.");
      } finally {
        formSubmit.disabled = false;
        formSubmit.textContent = "Pošalji";
      }
    };

    const handleOverlayClick = (event: MouseEvent) => {
      if (event.target === rsvpModal) {
        closeModal();
      }
    };

    const handleInitialInteraction = () => {
      void tryStartMusic();
      window.removeEventListener("pointerdown", handleInitialInteraction);
    };

    setMusicLabel();
    void tryStartMusic();

    musicToggle.addEventListener("click", handleMusicToggle);
    rsvpBtn.addEventListener("click", openModal);
    modalClose.addEventListener("click", closeModal);
    rsvpModal.addEventListener("click", handleOverlayClick);
    formSubmit.addEventListener("click", handleSubmit);
    window.addEventListener("pointerdown", handleInitialInteraction, { passive: true });

    cleanups.push(() => musicToggle.removeEventListener("click", handleMusicToggle));
    cleanups.push(() => rsvpBtn.removeEventListener("click", openModal));
    cleanups.push(() => modalClose.removeEventListener("click", closeModal));
    cleanups.push(() => rsvpModal.removeEventListener("click", handleOverlayClick));
    cleanups.push(() => formSubmit.removeEventListener("click", handleSubmit));
    cleanups.push(() => window.removeEventListener("pointerdown", handleInitialInteraction));
    cleanups.push(() => revealObserver.disconnect());
    cleanups.push(() => countdownObserver.disconnect());
    cleanups.push(() => {
      if (countdownIntervalId !== null) {
        window.clearInterval(countdownIntervalId);
      }
    });
    cleanups.push(() => {
      music.pause();
      music.currentTime = 0;
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div ref={hostRef} style={{ display: "block", width: "100%" }} />;
}
