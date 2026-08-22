@font-face {
  font-family: 'MyHandwriting';
  src: url('Myfont-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Nunito', sans-serif;
  background-color: #0c0b22;
  color: #fff9f0;
  overflow-x: hidden;
  /* Deep Space + Star Glints + Staggered Pink Hearts & Gold Sparkles Pattern */
  background-image:
    /* Layer 1: Scalable SVG Pattern (Pink Hearts + Gold Cross Sparkles) */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cpath d='M30 20 C24 12, 14 15, 14 24 C14 33, 30 44, 30 44 C30 44, 46 33, 46 24 C46 15, 36 12, 30 20 Z' fill='%23ff70a6'/%3E%3Cpath d='M100 90 C94 82, 84 85, 84 94 C84 103, 100 114, 100 114 C100 114, 116 103, 116 94 C116 85, 106 82, 100 90 Z' fill='%23ff70a6'/%3E%3Cpath d='M85 24 Q85 30 91 30 Q85 30 85 36 Q85 30 79 30 Q85 30 85 24 Z' fill='%23ffe600'/%3E%3Cpath d='M15 94 Q15 100 21 100 Q15 100 15 106 Q15 100 9 100 Q15 100 15 94 Z' fill='%23ffe600'/%3E%3Ccircle cx='60' cy='65' r='1.5' fill='%23ffe600' opacity='0.7'/%3E%3Ccircle cx='128' cy='45' r='1.2' fill='%23ffe600' opacity='0.8'/%3E%3Ccircle cx='45' cy='125' r='1.2' fill='%23ffe600' opacity='0.8'/%3E%3Ccircle cx='115' cy='130' r='1' fill='%23ffffff' opacity='0.7'/%3E%3Ccircle cx='20' cy='55' r='1' fill='%23ffffff' opacity='0.6'/%3E%3Ccircle cx='80' cy='115' r='1.5' fill='%23ffffff' opacity='0.8'/%3E%3C/svg%3E"),
    /* Layer 2: Cosmic Nebula Glows */
    radial-gradient(circle at 20% 25%, rgba(255, 0, 144, 0.12) 0%, transparent 45%),
    radial-gradient(circle at 80% 75%, rgba(26, 26, 255, 0.18) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 230, 0, 0.05) 0%, transparent 60%);
  background-repeat: repeat, no-repeat, no-repeat, no-repeat;
  /* Reduced the background size to make the hearts smaller */
  background-size: 85px 85px, 100% 100%, 100% 100%, 100% 100%;
}

/* Scrollbar reset */
::-webkit-scrollbar { width: 0; height: 0; }
html { scrollbar-width: none; }

/* ─── ACCENTS & MEMPHIS BG ─── */
.memphis-bg {
  background: transparent;
}

.accent {
  position: absolute;
  pointer-events: none;
  z-index: 2;
}
.circle-yellow { top: 2.5rem; left: 2.5rem; width: 5rem; height: 5rem; border-radius: 50%; border: 4px solid #ffe600; opacity: 0.4; }
.diamond-pink { top: 6rem; left: 8rem; width: 1.5rem; height: 1.5rem; background: #ff0090; transform: rotate(45deg); opacity: 0.6; }
.circle-blue { bottom: 5rem; right: 4rem; width: 7rem; height: 7rem; border-radius: 50%; border: 4px solid #1a1aff; opacity: 0.3; }
.diamond-coral { bottom: 10rem; right: 10rem; width: 2rem; height: 2rem; background: #ff5c3a; transform: rotate(12deg); opacity: 0.5; }
.pill-mint { top: 33%; right: 2rem; width: 1rem; height: 4rem; background: #00e5a0; opacity: 0.4; border-radius: 9999px; }
.pill-yellow { top: 50%; left: 2rem; width: 4rem; height: 1rem; background: #ffe600; opacity: 0.3; border-radius: 9999px; }

/* ─── HERO ENVELOPE SECTION ─── */
.envelope-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 5rem 1.5rem;
}

/* Soft dark halo behind the text to make it readable over the hearts */
.envelope-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 70%;
  background: radial-gradient(circle at 50% 25%, rgba(12, 11, 34, 0.95) 10%, rgba(12, 11, 34, 0) 55%);
  pointer-events: none;
  z-index: 0;
}

.header-pill {
  position: relative;
  z-index: 5;
  margin-bottom: 0.5rem;
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: #ff0090;
  color: #fff9f0;
  box-shadow: 0 4px 15px rgba(255, 0, 144, 0.4);
}

.main-title {
  position: relative;
  z-index: 5;
  text-align: center;
  margin-bottom: 4.5rem;
  line-height: 1.1;
  font-family: 'Fraunces', serif;
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 900;
  color: #fff9f0;
  text-shadow: 0 4px 20px rgba(0,0,0,0.6);
}

.highlight-yellow { color: #ffe600; font-style: italic; }
.highlight-pink { color: #ff0090; }

.envelope-container {
  position: relative;
  cursor: pointer;
  user-select: none;
  /* Increased the max-width to compensate for the background illusion */
  width: min(420px, 90vw);
  perspective: 800px;
  z-index: 10;
}

.note-slide {
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%) translateY(60px);
  width: calc(100% - 40px);
  max-height: 320px;
  background: #fff9f0;
  color: #0d0d2b;
  border-radius: 1rem;
  box-shadow: 0 20px 35px rgba(0,0,0,0.6);
  padding: 1.5rem 1.5rem;
  text-align: center;
  opacity: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  transition: transform 0.5s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s 0.3s ease;
}

.envelope-open .note-slide {
  transform: translateX(-50%) translateY(-50px);
  opacity: 1;
}

.note-pill {
  font-size: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ff0090;
  margin-bottom: 0.75rem;
}

.note-message {
  font-family: 'MyHandwriting', 'Fraunces', serif;
  font-size: 1.45rem;
  line-height: 1.5;
  color: #0d0d2b;
  margin: auto 0;
}

.note-author {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a1aff;
}

.envelope-body {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background: #1a1aff;
  border: 3px solid #ffe600;
  padding-top: 70%;
  box-shadow: 8px 8px 0px #ffe600;
}

.env-back {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 55%;
  background: #1230cc;
  clip-path: polygon(0 100%, 50% 0%, 100% 100%);
}

.env-crease {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 55%;
  background: transparent;
  border-left: 3px solid rgba(255,230,0,0.3);
  clip-path: polygon(0 100%, 50% 0%, 0 0);
}

.env-left-triangle {
  position: absolute;
  left: 0; bottom: 0;
  width: 50%;
  height: 55%;
  background: #0d1fb5;
  clip-path: polygon(0 0, 100% 100%, 0 100%);
}

.env-right-triangle {
  position: absolute;
  right: 0; bottom: 0;
  width: 50%;
  height: 55%;
  background: #0d1fb5;
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
}

.envelope-flap {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 55%;
  background: #2233ff;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top center;
  transform-style: preserve-3d;
  border-bottom: 2px solid rgba(255,230,0,0.4);
  z-index: 20;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.envelope-open .envelope-flap {
  transform: rotateX(180deg);
  z-index: 5;
}

.flap-heart {
  position: absolute;
  left: 50%;
  top: 1.5rem;
  transform: translateX(-50%);
}

.click-hint {
  text-align: center;
  margin-top: 1.25rem;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #ffe600;
  text-shadow: 0 2px 10px rgba(0,0,0,0.8);
  position: relative;
  z-index: 5;
}

/* ─── COUNTDOWN SECTION ─── */
.countdown-section {
  background: #ff0090;
  min-height: 45vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 5rem 1.5rem;
}

.ct-diamond-yellow { top: 1.5rem; left: 1.5rem; width: 3rem; height: 3rem; background: #ffe600; transform: rotate(45deg); opacity: 0.6; }
.ct-circle-navy { bottom: 1.5rem; right: 1.5rem; width: 4rem; height: 4rem; border-radius: 50%; border: 4px solid #0d0d2b; opacity: 0.4; }
.ct-diamond-white { top: 50%; right: 3rem; width: 1rem; height: 1rem; background: #fff9f0; transform: rotate(12deg); opacity: 0.5; }

.countdown-title {
  font-size: 0.85rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #0d0d2b;
  margin-bottom: 1.5rem;
}

.countdown-timer-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
}

.time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-box {
  background: #0d0d2b;
  color: #ffe600;
  width: clamp(72px, 18vw, 110px);
  height: clamp(72px, 18vw, 110px);
  font-size: clamp(2rem, 7vw, 3.5rem);
  font-weight: 700;
  border-radius: 0.75rem;
  border: 3px solid #ffe600;
  box-shadow: 4px 4px 0 #ffe600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.time-label {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #0d0d2b;
}

.colon {
  font-weight: 700;
  padding-bottom: 1.5rem;
  color: #0d0d2b;
  font-size: clamp(2rem, 7vw, 3.5rem);
}

/* ─── CALENDAR ARCHIVE SECTION ─── */
.calendar-section {
  background: transparent;
  min-height: 80vh;
  position: relative;
  overflow: hidden;
  padding: 6rem 1.5rem;
}

.cal-circle-pink { top: 2rem; right: 2rem; width: 6rem; height: 6rem; border-radius: 50%; border: 4px solid #ff0090; opacity: 0.25; }
.cal-diamond-yellow { bottom: 3rem; left: 2rem; width: 2.5rem; height: 2.5rem; background: #ffe600; transform: rotate(45deg); opacity: 0.3; }

.calendar-inner {
  max-width: 650px;
  margin: 0 auto;
}

.calendar-header-block {
  text-align: center;
  margin-bottom: 2.5rem;
}

.header-pill-yellow {
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: #ffe600;
  color: #0d0d2b;
  box-shadow: 0 4px 15px rgba(255, 230, 0, 0.4);
}

.calendar-heading {
  margin-top: 1rem;
  font-family: 'Fraunces', serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900;
  color: #fff9f0;
  line-height: 1.2;
  text-shadow: 0 4px 20px rgba(0,0,0,0.6);
}

.calendar-card {
  border-radius: 1rem;
  overflow: hidden;
  background: #13134a;
  border: 3px solid #1a1aff;
  box-shadow: 8px 8px 0 #1a1aff;
}

.calendar-month-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 2px solid #1a1aff;
}

.calendar-month-nav button {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  background: #ff0090;
  color: #fff9f0;
  border: none;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.calendar-month-nav button:hover {
  transform: scale(1.1);
}

#calendar-month-title {
  font-family: 'Fraunces', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff9f0;
}

.weekdays-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  padding: 1rem 1rem 0.25rem 1rem;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #ffe600;
  font-family: 'JetBrains Mono', monospace;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  padding: 0.5rem 1rem 1.5rem 1rem;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  color: rgba(255,249,240,0.3);
  transition: transform 0.15s ease, background-color 0.15s ease;
}

.calendar-day.empty {
  opacity: 0;
  pointer-events: none;
}

.calendar-day.unlocked {
  background: #ff0090;
  color: #fff9f0;
  cursor: pointer;
}

.calendar-day.unlocked:hover {
  background: #ff33a8;
  transform: scale(1.08);
}

.calendar-day.today {
  border: 2px solid #ffe600;
}

.calendar-legend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 0.75rem 1.5rem;
  border-top: 2px solid #1a1aff;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255,249,240,0.6);
}

.legend-box {
  width: 1rem;
  height: 1rem;
  border-radius: 2px;
}
.unlocked-box { background: #ff0090; }
.today-box { border: 2px solid #ffe600; background: transparent; }

/* ─── MODAL / POPUP ─── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(13, 13, 43, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

.modal-backdrop.active {
  opacity: 1;
  pointer-events: auto;
}

.modal-card {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: #fff9f0;
  color: #0d0d2b;
  border: 3px solid #ff0090;
  box-shadow: 8px 8px 0px #ff0090;
  border-radius: 1.25rem;
  padding: 2.5rem 2rem 2rem 2rem;
  text-align: center;
  transform: scale(0.92);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  max-height: 80vh;
  overflow-y: auto;
}

.modal-backdrop.active .modal-card {
  transform: scale(1);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ff0090;
  color: #fff9f0;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;
}

.modal-close:hover {
  transform: scale(1.1);
}

.modal-pill {
  font-size: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ff0090;
  margin-bottom: 1rem;
}

.modal-message {
  font-family: 'MyHandwriting', 'Fraunces', serif;
  font-size: 1.5rem;
  line-height: 1.5;
  color: #0d0d2b;
  margin-bottom: 1rem;
}

.modal-author {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1aff;
}
