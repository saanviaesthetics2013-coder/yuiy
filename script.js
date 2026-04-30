const boot = document.getElementById("boot");
const desktop = document.getElementById("desktop");
const bootFill = document.getElementById("bootFill");
const bootText = document.getElementById("bootText");

const clock = document.getElementById("clock");
const startMenu = document.getElementById("startMenu");

const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

let wallpapers = [
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80"
];

let currentWallpaper = 0;
let lightTheme = false;

/* ================= BOOT SYSTEM ================= */
let progress = 0;
const bootMessages = [
  "Initializing system...",
  "Loading UI modules...",
  "Starting desktop services...",
  "Preparing applications...",
  "Launching WebOS..."
];

let msgIndex = 0;

const bootInterval = setInterval(() => {
  progress += 10;
  bootFill.style.width = progress + "%";

  if (msgIndex < bootMessages.length) {
    bootText.innerText = bootMessages[msgIndex];
    msgIndex++;
  }

  if (progress >= 100) {
    clearInterval(bootInterval);
    setTimeout(() => {
      boot.style.display = "none";
      desktop.style.display = "block";
    }, 800);
  }
}, 400);

/* ================= CLOCK ================= */
function updateClock() {
  const now = new Date();
  clock.innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

/* ================= WINDOW SYSTEM ================= */
function openWindow(id) {
  const win = document.getElementById(id);
  win.style.display = "block";
  win.style.zIndex = Date.now(); // bring front
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none";
}

/* ================= START MENU ================= */
function toggleMenu() {
  startMenu.style.display = startMenu.style.display === "block" ? "none" : "block";
}

/* ================= DRAG WINDOWS ================= */
let dragData = { active: false, win: null, offsetX: 0, offsetY: 0 };

function dragStart(e, id) {
  dragData.active = true;
  dragData.win = document.getElementById(id);

  const rect = dragData.win.getBoundingClientRect();
  dragData.offsetX = e.clientX - rect.left;
  dragData.offsetY = e.clientY - rect.top;

  dragData.win.style.zIndex = Date.now();
}

document.addEventListener("mousemove", (e) => {
  if (!dragData.active) return;

  dragData.win.style.left = e.clientX - dragData.offsetX + "px";
  dragData.win.style.top = e.clientY - dragData.offsetY + "px";
});

document.addEventListener("mouseup", () => {
  dragData.active = false;
});

/* ================= SETTINGS ================= */
function toggleTheme() {
  lightTheme = !lightTheme;

  if (lightTheme) {
    document.body.style.background = "#f5f5f5";
  } else {
    document.body.style.background = "black";
  }
}

function changeWallpaper() {
  currentWallpaper++;
  if (currentWallpaper >= wallpapers.length) currentWallpaper = 0;
  desktop.style.backgroundImage = `url("${wallpapers[currentWallpaper]}")`;
}

/* ================= TERMINAL ================= */
terminalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = terminalInput.value.trim().toLowerCase();
    terminalInput.value = "";

    terminalOutput.innerHTML += `<p>> ${cmd}</p>`;

    if (cmd === "help") {
      terminalOutput.innerHTML += `<p>Commands: help, about, projects, clear, time</p>`;
    } else if (cmd === "about") {
      terminalOutput.innerHTML += `<p>This is a WebOS Portfolio made with pure HTML/CSS/JS.</p>`;
    } else if (cmd === "projects") {
      terminalOutput.innerHTML += `<p>Projects: Neon Dashboard, AI Portfolio, Game UI Website</p>`;
    } else if (cmd === "time") {
      terminalOutput.innerHTML += `<p>${new Date().toLocaleTimeString()}</p>`;
    } else if (cmd === "clear") {
      terminalOutput.innerHTML = "";
    } else {
      terminalOutput.innerHTML += `<p>Unknown command. Type 'help'</p>`;
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
});
