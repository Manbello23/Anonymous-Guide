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
   4: {
     title: "ACCEPTING WHERE YOU ARE",
    fact: "In the Qur’an, Allah describes Himself as Al-Latīf — The Subtly Kind — the One who works within your life in ways you don’t always see.",
    ayah_ar: "مَا قَدَرُوا اللَّهَ حَقَّ قَدْرِهِ",
    ayah_trans: "They did not recognize Allah as He deserves to be recognized. — Qur’an 39:67",
    text: `THE TRUTH OF YOUR MOMENT
You are exactly where you’re meant to be — not as a limitation, but as a lesson.
Growth doesn’t start with change. It starts with acceptance.
This moment, with its imperfections, is part of Allah’s design for you.
THE GIFT OF NOW
Stop fighting the moment you’re in. Lean into it. Listen to it. There is a message here — subtle but real.
TODAY’S REFLECTION
Ask: “What is this moment trying to teach me?”
Let the answer reveal itself gently.`
  },
   5: {
     title: "THE FIRST QUIET PROMISE TO YOURSELF",
    fact: "Every Prophet began their mission with something small — a whisper, a moment, a single command. Greatness begins tiny.",
    ayah_ar: "وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا",
    ayah_trans: "And the servants of the Most Merciful walk upon the earth gently. — Qur’an 25:63",
    text: `THE SOFT BEGINNING OF COMMITMENT
Yesterday you formed your intention. Today is about something just as gentle — a small promise to yourself.
Not loud. Not heavy. Not overwhelming.
Just meaningful.
WHY IT MATTERS
A promise to yourself says: “I am worth showing up for.”
It’s not about perfection — it’s about dignity.
THE MOMENT OF TRUTH
Ask yourself: “What tiny, realistic promise can I keep today?”
Let it be light. Let it be human. Let it be yours.
TODAY’S REFLECTION
Complete: “My small promise to myself today is ______.”
This is how transformation begins — quietly.`
  },
    6: {
     title: "THE WEIGHT YOU DON'T TALK ABOUT",
    fact: "In Surah Ad-Duha, Allah reminds the Prophet ﷺ of three blessings before giving him any commands — teaching us that healing starts with reassurance, not pressure.",
    ayah_ar: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ",
    ayah_trans: "Your Lord has not abandoned you, nor has He disliked you. — Qur’an 93:3",
    text: `THE UNSEEN BURDEN
Everybody carries a weight no one else sees. A fear. A regret. A memory. A quiet ache.
You’re not weak for feeling it. You’re human.
THE MERCY IN ACKNOWLEDGING IT
Allah sees every heaviness you don’t speak of. Sometimes the first healing isn’t releasing the burden — it’s admitting you’re carrying it.
TODAY’S REFLECTION
Ask: “What weight have I been pretending isn’t heavy?” Write it gently. Name it without shame.`
  },
   7: {
     title: "WHEN YOUR HEART FEELS UNCLEAR",
    fact: "The word Basīrah (inner clarity) appears repeatedly in the Qur’an — meaning a type of sight that comes from the heart, not the eyes.",
    ayah_ar: "فَإِنَّهَا لَا تَعْمَى الْأَبْصَارُ وَلَٰكِن تَعْمَى الْقُلُوبُ",
    ayah_trans: "It is not the eyes that go blind, but the hearts. — Qur’an 22:46",
    text: `WHEN CONFUSION SETS IN
Sometimes you don’t know what you feel. You don’t know what you want. You don’t know what your next step should be.
This is not failure — it’s a sign that your heart is rearranging itself.
THE BEGINNING OF CLARITY
Clarity isn’t forced. It arrives when the heart becomes quiet enough to hear itself again.
TODAY’S REFLECTION
Ask: “What is one thing I’m unsure about — and what might Allah be teaching me through this uncertainty?”`
  },
   8: {
     title: "THE BEAUTY IN SMALL EFFORTS",
    fact: "The Prophet ﷺ said the most beloved actions to Allah are those done consistently, even if small.",
    ayah_ar: "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ",
    ayah_trans: "Whoever does an atom’s weight of good will see it. — Qur’an 99:7",
    text: `THE TRUTH ABOUT SMALL STEPS
We admire big transformations, but your life changes through tiny choices repeated quietly.
A small prayer. A small pause. A small kindness to yourself.
These are not insignificant — they are seen.
THE POWER OF GENTLE CONSISTENCY
Small efforts build trust between you and you. They remind your heart it’s capable.
TODAY’S REFLECTION
Ask: “What is one tiny action I can repeat daily that will help me grow?”`
  },
    9: {
     title: "FACING WHAT YOU AVOID",
    fact: "Many du‘ā in the Qur’an begin with admitting weakness — showing that facing your struggles is a form of strength.",
    ayah_ar: "رَبِّ إِنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ",
    ayah_trans: "My Lord, I am touched by distress, and You are the Most Merciful. — Qur’an 21:83",
    text: `THE THINGS YOU TURN AWAY FROM
We all have something we avoid: A truth. A task. A memory. A responsibility. A feeling.
Avoidance doesn’t make it disappear — it only delays your peace.
THE COURAGE TO LOOK
You don’t have to solve it today. Just face it. Open the door a little.
That alone is transformation.
TODAY’S REFLECTION
Ask: “What have I been avoiding — and why?” Write with honesty, not pressure.`
  },
   10: {
     title: "TRUSTING THE PROCESS, EVEN WHEN IT'S SLOW",
    fact: "The Qur’an was revealed over 23 years, not instantly — to show us that meaningful transformation is gradual.",
    ayah_ar: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ",
    ayah_trans: "Perhaps you dislike something, yet it is good for you. — Qur’an 2:216",
    text: `WHEN GROWTH FEELS TOO SLOW
You may feel like nothing is changing. Like you’re doing the work, but your heart is not catching up. Like progress is invisible.
But Allah grows things silently — flowers, hearts, destinies.
TRUST THE PACE OF YOUR JOURNEY
Slow progress is still progress. Slow steps are still steps. Slow healing is still healing.
TODAY’S REFLECTION
Ask: “What slow change in my life is actually moving me forward?”`
  },
   11: {
     title: "WHEN YOU FEEL DISCONNECTED",
    fact: "The Qur’an describes the heart as something that rusts — meaning spiritual distance can build slowly, without you noticing.",
    ayah_ar: "كَلَّا بَلْ رَانَ عَلَىٰ قُلُوبِهِمْ",
    ayah_trans: "No — their hearts have become rusted. — Qur’an 83:14",
    text: `THE QUIET DISCONNECTION
Some days, your heart feels far. Distant from Allah. Distant from yourself.
You don’t feel spiritual. You don’t feel inspired. You don’t feel “present.”
This isn’t a sign you’re failing — it’s a sign you’re human.
THE WAY BACK
Your heart doesn’t return through force. It returns through small moments of sincerity.
A whispered du‘ā. A single ayah. A pause to breathe.
TODAY’S REFLECTION
Ask gently: “What is one small thing that helps me feel connected again?”`
  },
    12: {
     title: "THE STRENGTH IN ASKING FOR HELP",
    fact: "Every Prophet in the Qur’an made du‘ā — showing that asking Allah for help is not weakness, it is prophetic tradition.",
    ayah_ar: "ادْعُونِي أَسْتَجِبْ لَكُمْ",
    ayah_trans: "Call upon Me and I will respond to you. — Qur’an 40:60",
    text: `YOUR SILENT STRUGGLES
There are things you carry alone. Things you don’t speak about. Things you think you must handle yourself.
But you weren’t created to carry life unsupported.
THE HONOR IN ASKING
Strength isn’t pretending. Strength is turning to Allah and saying: “I can’t do this alone.”
Help doesn’t always change your situation, but it always changes you.
TODAY’S REFLECTION
Ask: “What is one thing I need to ask Allah’s help for — sincerely?”`
  },
    13: {
     title: "LETTING GO OF OLD STORIES",
    fact: "In the Qur’an, Allah often reminds people of past nations — not to trap them in history, but to show that stories can be rewritten.",
    ayah_ar: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ",
    ayah_trans: "Allah does not change a people until they change themselves. — Qur’an 13:11",
    text: `THE STORIES YOU CARRY
Your mind holds old narratives: “I always fail.” “I’m not enough.” “This is just who I am.”
These stories feel real — but they are not destiny.
THE FREEDOM OF REWRITING
You can choose a new story today. A new belief. A new identity. A new way of being with yourself.
Nothing in your past can stop that.
TODAY’S REFLECTION
Ask: “What old story about myself am I finally ready to release?”`
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
