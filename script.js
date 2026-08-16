const WORKER_URL = "https://notion-relay.anirudhavayadande.workers.dev";

document.addEventListener("DOMContentLoaded", async () => {
  const messageElement = document.getElementById("message-text");
  const dateElement = document.getElementById("date-display");
  const envelope = document.getElementById("envelope-wrapper");
  const timerElement = document.getElementById("countdown-timer");
  const archiveGrid = document.getElementById("archive-grid");

  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  dateElement.textContent = new Date().toLocaleDateString('en-US', options);

  try {
    const response = await fetch(WORKER_URL);
    const data = await response.json();
    
    // 1. Process Today's Note
    if (data.todayNote && data.todayNote.message) {
      messageElement.textContent = data.todayNote.message;
    } else {
      messageElement.textContent = "No note available for today yet!";
    }

    // 2. Start the Countdown Timer
    if (data.serverTime) {
      startCountdown(data.serverTime, timerElement);
    } else {
      timerElement.textContent = "--:--:--";
    }

    // 3. Build the Archive Grid
    if (data.archive && data.archive.length > 0) {
      // Filter out today's note so the archive only shows past days
      const pastNotes = data.archive.filter(note => note.date !== data.todayDateStr);
      
      if (pastNotes.length === 0) {
        archiveGrid.innerHTML = "<p style='text-align:center; width:100%; color:#8c8c8c;'>No past notes to display yet.</p>";
      } else {
        pastNotes.forEach(note => {
          const card = document.createElement("div");
          card.className = "archive-card";
          
          card.innerHTML = `
            <div class="archive-card-day">${note.day}</div>
            <div class="archive-card-date">${note.date}</div>
            <div class="archive-card-message">${note.message}</div>
          `;
          archiveGrid.appendChild(card);
        });
      }
    } else {
      archiveGrid.innerHTML = "<p style='text-align:center; width:100%; color:#8c8c8c;'>No past notes to display yet.</p>";
    }

  } catch (error) {
    messageElement.textContent = "Oops! Couldn't load the notes.";
    timerElement.textContent = "--:--:--";
  }

  // Envelope Open Animation
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");
  });
});

// Accurate Countdown Logic (Locked strictly to IST)
function startCountdown(serverTimeMs, element) {
  setInterval(() => {
    // Force the browser to calculate the current time in Indian Standard Time (IST)
    const now = new Date();
    const istString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const istNow = new Date(istString);

    // Create a target for midnight in IST
    const istMidnight = new Date(istString);
    istMidnight.setHours(24, 0, 0, 0);

    const timeRemaining = istMidnight - istNow;

    if (timeRemaining <= 0) {
      element.textContent = "00:00:00";
      return;
    }

    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');

    element.textContent = `${h}:${m}:${s}`;
  }, 1000);
}
