// ─── CONFIGURATION ───
const START_DATE = new Date("2026-08-22T00:00:00+05:30"); // IST Start Date
const WORKER_URL = "https://happybirthdayananya.anilovesananya.workers.dev"; // Your Cloudflare Worker URL

let unlockedNotes = {};

// ─── DOM ELEMENTS ───
const envelopeWrapper = document.getElementById("envelope-wrapper");
const envelopeHint = document.getElementById("envelope-hint");
const messageText = document.getElementById("message-text");
const todayDayLabel = document.getElementById("today-day-label");

const timerHours = document.getElementById("timer-hours");
const timerMinutes = document.getElementById("timer-minutes");
const timerSeconds = document.getElementById("timer-seconds");

const daysGrid = document.getElementById("days-grid");
const calendarMonthTitle = document.getElementById("calendar-month-title");
const prevMonthBtn = document.getElementById("prev-month-btn");
const nextMonthBtn = document.getElementById("next-month-btn");

const archiveModal = document.getElementById("archive-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalDayPill = document.getElementById("modal-day-pill");
const modalMessageText = document.getElementById("modal-message-text");

// Calendar View State
let currentCalDate = new Date();

// ─── TIME & DAY CALCULATIONS (IST) ───
function getISTNow() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * 5.5);
}

function getDaysSinceStart() {
  const istNow = getISTNow();
  const diffTime = istNow - START_DATE;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, diffDays);
}

// ─── FETCH NOTES FROM CLOUDFLARE / NOTION ───
async function fetchNotes() {
  try {
    const res = await fetch(WORKER_URL);
    const data = await res.json();
    unlockedNotes = data;
    renderTodayNote();
    renderCalendar();
  } catch (err) {
    console.error("Error fetching notes:", err);
    messageText.textContent = "Happy Birthday Ananya! ♥";
    todayDayLabel.textContent = `Day 1`;
  }
}

function renderTodayNote() {
  const currentDay = getDaysSinceStart();
  todayDayLabel.textContent = `Day ${currentDay}`;
  
  if (unlockedNotes[currentDay]) {
    messageText.textContent = unlockedNotes[currentDay];
  } else {
    messageText.textContent = "Happy birthday, Ananya! Today marks the beginning of 365 days of love notes.";
  }
}

// ─── ENVELOPE TOGGLE ───
if (envelopeWrapper) {
  envelopeWrapper.addEventListener("click", () => {
    envelopeWrapper.classList.toggle("envelope-open");
    if (envelopeWrapper.classList.contains("envelope-open")) {
      envelopeHint.innerHTML = '<span class="hint-close">✕ click to close</span>';
    } else {
      envelopeHint.innerHTML = "♥ click to open";
    }
  });
}

// ─── COUNTDOWN TIMER (SYNCED TO IST MIDNIGHT) ───
function updateCountdown() {
  const istNow = getISTNow();
  const tomorrowIST = new Date(istNow);
  tomorrowIST.setHours(24, 0, 0, 0);

  const diff = tomorrowIST - istNow;

  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  if (timerHours) timerHours.textContent = String(hours).padStart(2, "0");
  if (timerMinutes) timerMinutes.textContent = String(minutes).padStart(2, "0");
  if (timerSeconds) timerSeconds.textContent = String(seconds).padStart(2, "0");
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ─── CALENDAR RENDERING ───
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function renderCalendar() {
  if (!daysGrid) return;
  daysGrid.innerHTML = "";

  const year = currentCalDate.getFullYear();
  const month = currentCalDate.getMonth();

  calendarMonthTitle.textContent = `${MONTH_NAMES[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const istNow = getISTNow();
  const currentDayCount = getDaysSinceStart();

  // Empty leading cells
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-day empty";
    daysGrid.appendChild(emptyCell);
  }

  // Days of month
  for (let d = 1; d <= totalDays; d++) {
    const dayCell = document.createElement("div");
    dayCell.className = "calendar-day";
    dayCell.textContent = d;

    const thisDate = new Date(year, month, d, 23, 59, 59);
    const dayDiff = Math.floor((thisDate - START_DATE) / (1000 * 60 * 60 * 24)) + 1;

    // Check if day is unlocked
    if (dayDiff >= 1 && dayDiff <= currentDayCount) {
      dayCell.classList.add("unlocked");
      dayCell.addEventListener("click", () => openArchiveModal(dayDiff, d, MONTH_NAMES[month]));
    }

    // Check if it's today
    if (
      d === istNow.getDate() &&
      month === istNow.getMonth() &&
      year === istNow.getFullYear()
    ) {
      dayCell.classList.add("today");
    }

    daysGrid.appendChild(dayCell);
  }
}

// Calendar Month Navigation
if (prevMonthBtn) {
  prevMonthBtn.addEventListener("click", () => {
    currentCalDate.setMonth(currentCalDate.getMonth() - 1);
    renderCalendar();
  });
}

if (nextMonthBtn) {
  nextMonthBtn.addEventListener("click", () => {
    currentCalDate.setMonth(currentCalDate.getMonth() + 1);
    renderCalendar();
  });
}

// ─── ARCHIVE MODAL / POPUP ───
function openArchiveModal(dayNumber, dateNum, monthName) {
  modalDayPill.textContent = `Day ${dayNumber}`;
  
  if (unlockedNotes[dayNumber]) {
    modalMessageText.textContent = unlockedNotes[dayNumber];
  } else {
    modalMessageText.textContent = "A sweet love note for this day. ♥";
  }
  archiveModal.classList.add("active");
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", () => {
    archiveModal.classList.remove("active");
  });
}

if (archiveModal) {
  archiveModal.addEventListener("click", (e) => {
    if (e.target === archiveModal) {
      archiveModal.classList.remove("active");
    }
  });
}

// ─── INIT ───
fetchNotes();
