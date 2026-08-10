const WORKER_URL = "https://notion-relay.anirudhavayadande.workers.dev";

document.addEventListener("DOMContentLoaded", async () => {
  const messageElement = document.getElementById("message-text");
  const dateElement = document.getElementById("date-display");
  const envelope = document.getElementById("envelope-wrapper");

  // Display today's date formatted nicely
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  dateElement.textContent = new Date().toLocaleDateString('en-US', options);

  try {
    // Fetch the note from your secure Cloudflare Worker
    const response = await fetch(WORKER_URL);
    const data = await response.json();
    
    // Inject the message into the letter
    messageElement.textContent = data.message;
  } catch (error) {
    messageElement.textContent = "Oops! Couldn't find today's note.";
  }

  // Add the click animation to open the envelope
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");
  });
});
