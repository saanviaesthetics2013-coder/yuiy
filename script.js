const clock = document.getElementById("clock");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

const closeModalBtn = document.getElementById("closeModal");

const projectGrid = document.getElementById("projectGrid");
const feedList = document.getElementById("feedList");
const search = document.getElementById("search");

const boot = document.getElementById("boot");
const bootStatus = document.getElementById("bootStatus");
const bootFill = document.getElementById("bootFill");

const palette = document.getElementById("palette");
const paletteInput = document.getElementById("paletteInput");
const paletteList = document.getElementById("paletteList");

const themeBtn = document.getElementById("themeBtn");
const paletteBtn = document.getElementById("paletteBtn");

const aboutBtn = document.getElementById("aboutBtn");
const contactBtn = document.getElementById("contactBtn");

let lightMode = false;

const aboutText =
  "I build premium interactive websites that feel like products. I focus on clean UI/UX, smooth animations, and modern web experiences.";

const contactText =
  "Email: yourmail@example.com\nGitHub: https://github.com/yourusername\nLinkedIn: https://linkedin.com/in/yourusername";

const projects = [
  { title: "Command Center UI", tags: "Frontend / UI", desc: "A futuristic dashboard style portfolio system." },
  { title: "Smart Portfolio", tags: "Web / UX", desc: "A portfolio that behaves like a real application." },
  { title: "Interactive Resume", tags: "Design / UI", desc: "Resume experience with animations and timeline layout." },
  { title: "Project Vault", tags: "JavaScript", desc: "Projects stored in a searchable interactive system." },
  { title: "Neon Landing", tags: "Landing Page", desc: "A premium landing page with glassmorphism design." }
];

const feedItems = [
  "System initialized.",
  "UI modules loaded.",
  "Command palette active (Ctrl+K).",
  "Projects indexed successfully.",
  "Ready for user interaction."
];

/* Clock */
function updateClock() {
  clock.textContent = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

/* Modal */
function openModal(title, body) {
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

/* Render Projects */
function renderProjects(list) {
  projectGrid.innerHTML = "";

  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${p.title}</h3><p>${p.tags}</p>`;
    card.addEventListener("click", () => openModal(p.title, p.desc));
    projectGrid.appendChild(card);
  });
}

renderProjects(projects);

/* Search */
search.addEventListener("input", () => {
  const q = search.value.toLowerCase();

  const filtered = projects.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.tags.toLowerCase().includes(q)
    );
  });

  renderProjects(filtered);
});

/* Feed */
function renderFeed() {
  feedList.innerHTML = "";

  feedItems.forEach((text) => {
    const item = document.createElement("div");
    item.className = "feed-item";
    item.textContent = text;
    feedList.appendChild(item);
  });
}

renderFeed();

/* Boot Animation */
const bootMessages = [
  "Initializing modules...",
  "Loading interface engine...",
  "Indexing projects...",
  "Starting command palette...",
  "System online."
];

let progress = 0;
let msgIndex = 0;

const bootTimer = setInterval(() => {
  progress += 10;
  bootFill.style.width = progress + "%";

  if (msgIndex < bootMessages.length) {
    bootStatus.textContent = bootMessages[msgIndex];
    msgIndex++;
  }

  if (progress >= 100) {
    clearInterval(bootTimer);
    setTimeout(() => {
      boot.style.display = "none";
    }, 600);
  }
}, 400);

/* Theme */
themeBtn.addEventListener("click", () => {
  lightMode = !lightMode;

  if (lightMode) {
    document.body.style.background = "#f5f5f5";
    document.body.style.color = "#111";
  } else {
    document.body.style.background = "#05070c";
    document.body.style.color = "white";
  }
});

/* Command Palette */
function openPalette() {
  palette.style.display = "flex";
  paletteInput.value = "";
  paletteInput.focus();
  renderPalette("");
}

function closePalette() {
  palette.style.display = "none";
}

const commands = [
  { name: "about", run: () => openModal("About", aboutText) },
  { name: "projects", run: () => openModal("Projects", "Use the dashboard search bar to explore projects.") },
  { name: "contact", run: () => openModal("Contact", contactText) },
  { name: "theme", run: () => themeBtn.click() }
];

function renderPalette(query) {
  paletteList.innerHTML = "";

  commands
    .filter(cmd => cmd.name.includes(query.toLowerCase()))
    .forEach(cmd => {
      const div = document.createElement("div");
      div.className = "palette-item";
      div.textContent = cmd.name;
      div.addEventListener("click", () => {
        closePalette();
        cmd.run();
      });
      paletteList.appendChild(div);
    });
}

paletteInput.addEventListener("input", () => {
  renderPalette(paletteInput.value);
});

paletteInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const input = paletteInput.value.toLowerCase().trim();
    const found = commands.find(c => c.name === input);

    if (found) {
      closePalette();
      found.run();
    } else {
      paletteList.innerHTML = `<div class="palette-item">Unknown command</div>`;
    }
  }

  if (e.key === "Escape") closePalette();
});

paletteBtn.addEventListener("click", openPalette);

palette.addEventListener("click", (e) => {
  if (e.target === palette) closePalette();
});

/* Buttons */
aboutBtn.addEventListener("click", () => openModal("About", aboutText));
contactBtn.addEventListener("click", () => openModal("Contact", contactText));

/* Ctrl+K Shortcut */
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openPalette();
  }

  if (e.key === "Escape") {
    closePalette();
    closeModal();
  }
});
