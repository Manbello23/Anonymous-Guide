/* -----------------------------------------------------------
   CORE DATA
----------------------------------------------------------- */

const TOTAL_DAYS = 90;

const KEY_NOTE = (day) => `note_day_${day}`;
const KEY_UNLOCKED = "unlocked";
const KEY_LAST_UNLOCK = "lastUnlockTs";

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

  3: {
    fact: "Taking just one deep breath can lower your heart rate almost instantly.",
    ayah_ar: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
    ayah_trans: "He is with you wherever you are. (Qur'an 57:4)",
    text: `Today, breathe with intention.  
Sit still for 30 seconds. Place one hand on your chest.  
Feel the rise. Feel the fall.  
This awareness is a doorway — step through it.`
  },
};

for (let i = 4; i <= 90; i++) {
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

const homeDYK = [
  "Your heart rate slows when you exhale longer than you inhale.",
  "Writing thoughts reduces emotional intensity by up to 30%.",
  "Quiet reflection strengthens long-term calm.",
];

/* -----------------------------------------------------------
   VIEW SWITCHER
----------------------------------------------------------- */

function showView(viewName) {
  Object.values(views).forEach(v => v.classList.add("hidden"));
  const target = views[viewName];

  target.classList.remove("hidden");
  target.classList.add("fade-in");
  setTimeout(() => target.classList.remove("fade-in"), 300);
}

/* -----------------------------------------------------------
   HOME
----------------------------------------------------------- */

function loadHomeDYK() {
  const pick = homeDYK[Math.floor(Math.random() * homeDYK.length)];
  document.getElementById("dykText").textContent = pick;
}

/* -----------------------------------------------------------
   JOURNAL LIST
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
   UNLOCK SYSTEM (CORRECTED)
----------------------------------------------------------- */

function getUnlockedDay() {
  return Number(localStorage.getItem(KEY_UNLOCKED) || 1);
}

function setUnlockedDay(day) {
  localStorage.setItem(KEY_UNLOCKED, day);
}

function getLastUnlockTs() {
  return Number(localStorage.getItem(KEY_LAST_UNLOCK) || 0);
}

function setLastUnlockTs(ts) {
  localStorage.setItem(KEY_LAST_UNLOCK, ts);
}

function initializeFirstUnlockIfNeeded(day) {
  if (day !== 1) return;
  if (getLastUnlockTs()) return;

  const first = new Date();
  first.setHours(5, 0, 0, 0);
  setLastUnlockTs(first.getTime());
}

function tryUnlockNextDay() {
  const last = getLastUnlockTs();
  if (!last) return;

  const now = new Date();
  const nextUnlock = new Date(last);
  nextUnlock.setDate(nextUnlock.getDate() + 1);

  if (now.getTime() >= nextUnlock.getTime()) {
    let unlocked = getUnlockedDay();
    if (unlocked < TOTAL_DAYS) {
      setUnlockedDay(unlocked + 1);

      const next = new Date();
      next.setHours(5, 0, 0, 0);
      setLastUnlockTs(next.getTime());
    }
  }
}

/* -----------------------------------------------------------
   OPEN DAY
----------------------------------------------------------- */

let currentDay = 1;

function openDay(day) {
  currentDay = day;

  initializeFirstUnlockIfNeeded(day);
  tryUnlockNextDay();

  const data = DAYS[day];

  dayTitle.textContent = `Day ${day}`;
  didYouKnowText.textContent = data.fact;
  ayahArabic.textContent = data.ayah_ar;
  ayahTrans.textContent = data.ayah_trans;

  dayContent.innerHTML = "";
  data.text.split("\n").forEach(p => {
    const el = document.createElement("p");
    el.textContent = p.trim();
    dayContent.appendChild(el);
  });

  const saved = localStorage.getItem(KEY_NOTE(day)) || "";
  document.getElementById("note").value = saved;

  const unlocked = getUnlockedDay();
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
   FIXED UNLOCK BUTTON
----------------------------------------------------------- */

unlockNextBtn.onclick = () => {
  const now = new Date();
  const last = getLastUnlockTs();
  const nextUnlock = new Date(last);
  nextUnlock.setDate(nextUnlock.getDate() + 1);

  if (now.getTime() < nextUnlock.getTime()) {
    unlockInfo.textContent = "Next chapter unlocks at 5:00 AM.";
    return;
  }

  tryUnlockNextDay();
  renderDaysList();
  unlockNextBtn.disabled = true;
  unlockInfo.textContent = "Next chapter unlocked!";
};

/* -----------------------------------------------------------
   NAVIGATION
----------------------------------------------------------- */

document.getElementById("homeBtn").onclick = () => showView("home");
document.getElementById("journalBtn").onclick = () => showView("journal");
document.getElementById("aboutBtn").onclick = () => showView("about");
document.getElementById("privacyBtn").onclick = () => showView("privacy");
document.getElementById("backBtn").onclick = () => showView("journal");

document.getElementById("beginBtn").onclick = () => {
  renderDaysList();
  openDay(1);
};
document.getElementById("openJournal").onclick = () => {
  renderDaysList();
  showView("journal");
};

/* -----------------------------------------------------------
   INIT
----------------------------------------------------------- */

loadHomeDYK();
renderDaysList();
showView("home");
