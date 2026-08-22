// Paste your exact live Cloudflare Worker URL here
const WORKER_URL = "https://YOUR_WORKER_URL_HERE"; 

let appData = {
  todayNote: null,
  archive: [],
  todayDateStr: ""
};

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

document.addEventListener("DOMContentLoaded", async () => {
  const envelope = document.getElementById("envelope-wrapper");
  const envelopeHint = document.getElementById("envelope-hint");
  const messageElement = document.getElementById("message-text");
  const todayDayLabel = document.getElementById("today-day-label");

  // Envelope Open / Close toggle
  if (envelope) {
    envelope.addEventListener("click", () => {
      const isOpen = envelope.classList.toggle("envelope-open");
      if (envelopeHint) {
        envelopeHint.textContent = isOpen ? "✕ click to close" : "♥ click to open";
      }
    });
  }

  // Calendar month buttons
  document.getElementById("prev-month-btn")?.addEventListener("click", () => {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear -= 1;
    } else {
      currentMonth -= 1;
    }
    renderCalendar(currentYear, currentMonth);
  });

  document.getElementById("next-month-btn")?.addEventListener("click", () => {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear += 1;
    } else {
      currentMonth += 1;
    }
    renderCalendar(currentYear, currentMonth);
  });

  // Modal setup
  const modal = document.getElementById("archive-modal");
  const modalClose = document.getElementById("modal-close-btn");
  modalClose?.addEventListener("click", () => modal.classList.remove("active"));
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal?.classList.remove("active");
  });

  // Start IST Countdown
  startISTCountdown();

  // Fetch Live Notion Data
  try {
    const response = await fetch(WORKER_URL);
    const data = await response.json();
    appData = data;

    // Set today's note
    if (data.todayNote && data.todayNote.message) {
      messageElement.textContent = data.todayNote.message;
      if (todayDayLabel && data.todayNote.day) {
        todayDayLabel.textContent = `Note #${data.todayNote.day}`;
      }
    } else {
      messageElement.textContent = "No note available for today yet!";
    }

    // Render initial calendar with live data
    renderCalendar(currentYear, currentMonth);

  } catch (error) {
    console.error("Error fetching Notion notes:", error);
    messageElement.textContent = "Oops! Couldn't load today's note.";
    renderCalendar(currentYear, currentMonth);
  }
});

// ─── CALENDAR RENDERER ───
function renderCalendar(year, month) {
  const daysGrid = document.getElementById("days-grid");
  const monthTitle = document.getElementById("calendar-month-title");
  if (!daysGrid || !monthTitle) return;

  const dateObj = new Date(year, month, 1);
  monthTitle.textContent = dateObj.toLocaleString("default", { month: "long", year: "numeric" });

  daysGrid.innerHTML = "";

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Get current date in IST
  const istNow = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const isThisMonth = istNow.getFullYear() === year && istNow.getMonth() === month;
  const todayDayNum = istNow.getDate();

  // Empty padding cells for start of month
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-day empty";
    daysGrid.appendChild(emptyCell);
  }

  // Create dictionary of unlocked notes by date (YYYY-MM-DD)
  const unlockedMap = {};
  if (appData.archive && Array.isArray(appData.archive)) {
    appData.archive.forEach((item) => {
      if (item.date) {
        unlockedMap[item.date] = item;
      }
    });
  }
  if (appData.todayNote && appData.todayNote.date) {
    unlockedMap[appData.todayNote.date] = appData.todayNote;
  }

  // Render day cells
  for (let d = 1; d <= totalDays; d++) {
    const dayCell = document.createElement("div");
    dayCell.className = "calendar-day";
    dayCell.textContent = d;

    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    if (isThisMonth && d === todayDayNum) {
      dayCell.classList.add("today");
    }

    const note = unlockedMap[formattedDate];
    if (note) {
      dayCell.classList.add("unlocked");
      dayCell.addEventListener("click", () => {
        openNoteModal(note, d);
      });
    }

    daysGrid.appendChild(dayCell);
  }
}

// ─── POPUP MODAL (ITEM 1 ON MASTER SHEET) ───
function openNoteModal(note, dayNum) {
  const modal = document.getElementById("archive-modal");
  const modalPill = document.getElementById("modal-day-pill");
  const modalMessage = document.getElementById("modal-message-text");

  if (!modal || !modalPill || !modalMessage) return;

  modalPill.textContent = note.day ? `Note from Day ${note.day}` : `Note from Day ${dayNum}`;
  modalMessage.textContent = note.message || "No content found for this day.";

  modal.classList.add("active");
}

// ─── IST MIDNIGHT COUNTDOWN ───
function startISTCountdown() {
  const hoursEl = document.getElementById("timer-hours");
  const minsEl = document.getElementById("timer-minutes");
  const secsEl = document.getElementById("timer-seconds");

  setInterval(() => {
    const now = new Date();
    const istString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const istNow = new Date(istString);

    const istMidnight = new Date(istString);
    istMidnight.setHours(24, 0, 0, 0);

    const timeRemaining = istMidnight - istNow;

    if (timeRemaining <= 0) {
      if (hoursEl) hoursEl.textContent = "00";
      if (minsEl) minsEl.textContent = "00";
      if (secsEl) secsEl.textContent = "00";
      return;
    }

    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, "0");
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, "0");
  }, 1000);
}
