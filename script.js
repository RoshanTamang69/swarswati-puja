// script.js
// Change this TARGET_DATE to the exact Saraswati Puja date/time you want.
// Use an ISO string in local time or with timezone: e.g. "2026-02-01T09:00:00"
const TARGET_DATE = new Date("2026-02-01T09:00:00");

// Elements
const enterBtn = document.getElementById("enterBtn");
const welcome = document.getElementById("welcome");
const main = document.getElementById("main");
const bgVideo = document.getElementById("bgVideo");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const eventDateEl = document.getElementById("eventDate");
const eventTimeEl = document.getElementById("eventTime");
const greetingEl = document.getElementById("greeting");

// Format and display the target event date/time
function formatDateForDisplay(d) {
  if (!(d instanceof Date) || isNaN(d)) return "--";
  return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
function formatTimeForDisplay(d) {
  if (!(d instanceof Date) || isNaN(d)) return "--";
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
eventDateEl.textContent = "Event date: " + formatDateForDisplay(TARGET_DATE);
eventTimeEl.textContent = "Event time: " + formatTimeForDisplay(TARGET_DATE);

// Countdown update
function updateCountdown() {
  const now = new Date();
  let diff = TARGET_DATE - now;

  if (isNaN(diff)) {
    daysEl.textContent = "--";
    hoursEl.textContent = "--";
    minutesEl.textContent = "--";
    secondsEl.textContent = "--";
    return;
  }

  if (diff <= 0) {
    // Event reached or passed
    daysEl.textContent = "0";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    greetingEl.textContent = "Happy Saraswati Puja!";
    // If you want, you can stop the interval after event starts:
    // clearInterval(countdownInterval);
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / (3600 * 24));
  const hours = Math.floor((sec % (3600 * 24)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  daysEl.textContent = days;
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Start countdown timer
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Enter button behavior
function openMainView() {
  // Smoothly hide welcome overlay and show main
  welcome.classList.add('fade-out');
  setTimeout(() => {
    welcome.style.display = 'none';
    main.classList.remove('hidden');
    // Attempt to play video (some browsers require user interaction)
    if (bgVideo && typeof bgVideo.play === 'function') {
      bgVideo.play().catch(() => {
        // If autoplay prevented, leave it muted; user can click
        console.log("Autoplay prevented; video will play after user interaction.");
      });
    }
  }, 300);
}

enterBtn.addEventListener('click', openMainView);
enterBtn.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' || e.key === ' ') openMainView();
});

// Small fade-out CSS injected for a subtle effect
const style = document.createElement('style');
style.textContent = `
  .fade-out { opacity: 0; transition: opacity 0.3s ease-in; }
`;
document.head.appendChild(style);