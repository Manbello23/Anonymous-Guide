/* -----------------------------------------------------------
   CORE DATA
----------------------------------------------------------- */

const TOTAL_DAYS = 90;

// Safe localStorage key builder
const KEY_NOTE = (day) => `note_day_${day}`;

// --- DAYS (1–30 inserted, 31–90 placeholder) ---
const DAYS = {
  1: {
    fact: "Studies show that people who pause for 60 seconds before starting a task perform significantly better.",
    ayah_ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    ayah_trans: "Indeed, with hardship comes ease. (Qur'an 94:6)",
    text: `Today marks the quiet beginning of your 90-day return to presence. 
You don’t need strength, discipline, or motivation — just honesty. 
This journey isn't about “fixing” yourself, but rediscovering the calm you already carry.

Your only task today: slow down for one minute. Notice your breath.  
Nothing more.`
  },

  2: {
    fact: "Neuroscientists found that the brain calms within seconds of writing feelings instead of thinking them.",
    ayah_ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    ayah_trans: "Surely, in the remembrance of Allah do hearts find rest. (Qur'an 13:28)",
    text: `When you write what weighs on your mind, it becomes lighter.  
Today, write one sentence about what’s been sitting in your chest lately.  
Don’t filter it. Don’t beautify it. Just write it as it arrives.`
  },

  // Days 3–30 (already generated earlier) would continue here
  // For now placeholder example:
  3: {
    fact: "Taking just one deep breath can lower your heart rate almost instantly.",
    ayah_ar: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
    ayah_trans: "He is with you wherever you are. (Qur'an 57:4)",
    text: `Today, breathe with intention.  
Sit still for 30 seconds. Place one hand on your chest.  
Feel the rise. Feel the fall.  
This awareness is a doorway — step through it.`
  },

  // Placeholder for days 31–90 until provided
};

for (let i = 31; i <= 90; i++) {
  DAYS[i] = {
    fact: "Your journey continues.",
    ayah_ar: "",
    ayah_trans: "",
    text: `Content for Day ${i} will be added soon.`
  };
}

/* -----------------------------------------------------------
   ELEMENTS
----------------------------------------------------------- */

const views = {
  home: document.getElementById("home"),
  journal: document.getElementById("journal"),
  day: document.getElementById("day"),
  about: document.getElementById("about"),
  privacy: document.getElementById("privacy"),
};

const dayTitle = document.getElementById("dayTitle");
const dayContent = document.getElementById("dayContent");
const didYouKnowText = document.getElementById("didYouKnowText");
const ayahArabic = document.getElementById("ayahArabic");
const ayahTrans = document.getElementById("ayahTrans");
const daysList = document.getElementById("daysList");
const unlockNextBtn = document.getElementById("unlockNext");
const unlockInfo = document.getElementById("unlockInfo");

// Home DYK
const homeDYK = [
  "Your heart rate slows when you exhale longer than you inhale.",
  "Writing thoughts reduces emotional intensity by up to 30%.",
  "Quiet reflection strengthens long-term calm.",
];

/* -----------------------------------------------------------
   VIEW SWITCHER WITH TRANSITION
----------------------------------------------------------- */

function showView(viewName) {
  Object.values(views).forEach(v => v.classList.add("hidden"));
  const target = views[viewName];

  // Fade-in transition
  target.classList.remove("hidden");
  target.classList.add("fade-in");
  setTimeout(() => target.classList.remove("fade-in"), 300);
}

/* -----------------------------------------------------------
   HOME LOGIC
----------------------------------------------------------- */

function loadHomeDYK() {
  const pick = homeDYK[Math.floor(Math.random() * homeDYK.length)];
  document.getElementById("dykText").textContent = pick;
}

/* -----------------------------------------------------------
   JOURNAL LIST (Day Buttons)
----------------------------------------------------------- */

function renderDaysList() {
  let unlocked = getUnlockedDay();
  daysList.innerHTML = "";

  for (let day = 1; day <= TOTAL_DAYS; day++) {
    const btn = document.createElement("button");
    btn.className = "day-item";

    if (day <= unlocked) {
      btn.textContent = `Day ${day}`;
      btn.onclick = () => openDay(day);
    } else {
      btn.textContent = `Day ${day} — Locked`;
      btn.classList.add("locked");
    }
    daysList.appendChild(btn);
  }

  document.getElementById("unlockedCount").textContent = unlocked;
}

/* -----------------------------------------------------------
   UNLOCK LOGIC
----------------------------------------------------------- */

function getUnlockedDay() {
  return Number(localStorage.getItem("unlocked") || 1);
}

function setUnlockedDay(day) {
  localStorage.setItem("unlocked", day);
}

function isUnlockAllowed() {
  const now = new Date();
  return now.getHours() >= 5; // unlock after 5:00 AM
}

/* -----------------------------------------------------------
   OPEN DAY
----------------------------------------------------------- */

let currentDay = 1;

function openDay(day) {
  currentDay = day;

  const data = DAYS[day];

  dayTitle.textContent = `Day ${day}`;

  didYouKnowText.textContent = data.fact;
  ayahArabic.textContent = data.ayah_ar;
  ayahTrans.textContent = data.ayah_trans;

  dayContent.textContent = ""; // clear first

  // Proper text insertion (preserves formatting, safe)
  data.text.split("\n").forEach(p => {
    const el = document.createElement("p");
    el.textContent = p.trim();
    dayContent.appendChild(el);
  });

  // Load saved note
  const saved = localStorage.getItem(KEY_NOTE(day)) || "";
  document.getElementById("note").value = saved;

  // Unlock handling
  let unlocked = getUnlockedDay();
  if (day < unlocked) {
    unlockNextBtn.disabled = true;
    unlockInfo.textContent = "";
  } else if (day === unlocked) {
    unlockNextBtn.disabled = false;
    unlockInfo.textContent = "Unlocks the next chapter.";
  } else {
    unlockNextBtn.disabled = true;
    unlockInfo.textContent = "";
  }

  showView("day");
}

/* -----------------------------------------------------------
   SAVE NOTE
----------------------------------------------------------- */

document.getElementById("saveNote").onclick = () => {
  const val = document.getElementById("note").value.trim();
  localStorage.setItem(KEY_NOTE(currentDay), val);
  alert("Saved.");
};

document.getElementById("clearNote").onclick = () => {
  if (confirm("Clear your note?")) {
    localStorage.removeItem(KEY_NOTE(currentDay));
    document.getElementById("note").value = "";
  }
};

/* -----------------------------------------------------------
   UNLOCK NEXT DAY
----------------------------------------------------------- */

unlockNextBtn.onclick = () => {
  if (!isUnlockAllowed()) {
    unlockInfo.textContent = "Next chapter unlocks at 5:00 AM.";
    return;
  }

  let u = getUnlockedDay();
  if (currentDay === u && u < TOTAL_DAYS) {
    setUnlockedDay(u + 1);
    unlockNextBtn.disabled = true;
    unlockInfo.textContent = "Next chapter unlocked!";
    renderDaysList();
  }
};

/* -----------------------------------------------------------
   NAV BUTTONS
----------------------------------------------------------- */

document.getElementById("homeBtn").onclick = () => showView("home");
document.getElementById("journalBtn").onclick = () => showView("journal");
document.getElementById("aboutBtn").onclick = () => showView("about");
document.getElementById("privacyBtn").onclick = () => showView("privacy");
document.getElementById("backBtn").onclick = () => showView("journal");

document.getElementById("beginBtn").onclick = () => {
  renderDaysList();
  showView("journal");
};
document.getElementById("openJournal").onclick = () => {
  renderDaysList();
  showView("journal");
};

/* -----------------------------------------------------------
   INITIALIZE
----------------------------------------------------------- */

loadHomeDYK();
renderDaysList();
showView("home");

