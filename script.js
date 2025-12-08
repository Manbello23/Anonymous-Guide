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
     title: "THE FIRST STEP",
    fact: "The very first word revealed in the Qur’an was “Iqra” — Read. A command not just to read text, but to awaken.",
    ayah_ar: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ ",
    ayah_trans: "In the name of Allah, the Most Merciful, the Most Compassionate.",
    text: `THE QUIET BEGINNING
Every meaningful journey starts softly — not with motivation, planning, or confidence… but with a small inward decision.
Maybe you feel tired. Maybe lost. Maybe your heart whispered, “It’s time.”
You didn’t arrive here by accident. Something within you refused to stay where you were.
THE AWAKENING
Allah places gentle moments in our lives — moments that say: Rise. Not loudly. Not forcefully. Just… rise.
This journal isn’t about perfection. It’s about beginning.
For today, one step is enough.
TODAY’S REFLECTION
Ask: “What am I running from — and what am I moving toward?”
Keep your answer honest. Honesty is the first form of strength.`
  },

  2: {
     title: "RETURNING TO YOURSELF",
    fact: "The heart is mentioned over 100 times in the Qur’an — always as something that turns, softens, or awakens.",
    ayah_ar: "إِنَّ فِي ذَٰلِكَ لَذِكْرَى لِّمَن كَانَ لَهُ قَلْبٌ",
    ayah_trans: "Surely in this is a reminder for whoever has a heart. — (Qur’an 50:37)",
    text: `THE CALL BACK
We lose ourselves quietly — in routines, fears, expectations, and noise.
But returning to yourself begins just as quietly — with awareness. With noticing. With the simple willingness to stop running.
THE INNER TURNING
Your heart is softer than you think. It responds to truth. It responds to sincerity. It responds to Allah.
Today is not about becoming someone new. It’s about coming back to who you were meant to be.
TODAY’S REFLECTION
Ask yourself: “Which part of me has been waiting for my attention?”
Write it simply. Let awareness be your first return.`
  },

  3: {
     title: "ALLOWING YOURSELF TO SLOWDOWN",
    fact: "Allah swears by time in Surah Al-Asr — reminding us that loss begins when life becomes rushed.",
    ayah_ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    ayah_trans: "Verily, in the remembrance of Allah hearts find rest. — Qur’an 13:28",
    text: `THE RUSH INSIDE YOU
You may feel behind. You may feel pressured to be more, heal faster, do everything.
But the soul doesn’t grow under pressure. It grows in stillness.
THE SACRED PAUSE
Slowing down doesn’t mean you’re weak. It means you’re listening. It means you’re choosing presence over panic.
Give yourself permission to breathe today — to be here, not elsewhere.
TODAY’S REFLECTION
Ask softly: “What can I slow down today, even slightly?”
Small pauses create space for healing.`
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
