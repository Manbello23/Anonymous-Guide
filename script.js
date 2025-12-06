// Unlock time (5 AM)
const unlockHour = 5;

// --- JOURNAL DATA (Day 1–5 Added) ---
const journalData = [
  {
    day: 1,
    title: "The First Step",
    content: `
⭐ <strong>DAY 1 — The First Step</strong><br><br>

<strong>Did you know?</strong><br>
The very first word revealed in the Qur’an was “<em>Iqra</em>” — Read.  
A command not just to read text, but to awaken.<br><br>

﴿ بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ ﴾  
<span>In the name of Allah, the Most Merciful, the Most Compassionate.</span><br><br>

<strong>THE QUIET BEGINNING</strong><br>
Every meaningful journey starts softly —  
not with motivation, planning, or confidence…  
but with a small inward decision.<br><br>

Maybe you feel tired.  
Maybe lost.  
Maybe your heart whispered, “It’s time.”<br><br>

You didn’t arrive here by accident.  
Something within you refused to stay where you were.<br><br>

<strong>THE AWAKENING</strong><br>
Allah places gentle moments in our lives — moments that say:<br>
<i>Rise.</i><br>
Not loudly.  
Not forcefully.  
Just… rise.<br><br>

This journal isn’t about perfection.  
It’s about beginning.<br><br>

<strong>For today, one step is enough.</strong><br><br>

<strong>TODAY’S REFLECTION</strong><br>
Ask:<br>
“What am I running from — and what am I moving toward?”<br>
Keep your answer honest.  
Honesty is the first form of strength.
`
  },
  {
    day: 2,
    title: "Returning to Yourself",
    content: `
⭐ <strong>DAY 2 — Returning to Yourself</strong><br><br>

<strong>Did you know?</strong><br>
The heart is mentioned over 100 times in the Qur’an — always as something that turns, softens, or awakens.<br><br>

﴿ إِنَّ فِي ذَٰلِكَ لَذِكْرَى لِّمَن كَانَ لَهُ قَلْبٌ ﴾  
“Surely in this is a reminder for whoever has a heart.” — Qur’an 50:37<br><br>

<strong>THE CALL BACK</strong><br>
We lose ourselves quietly —  
in routines, fears, expectations, and noise.<br><br>

But returning to yourself begins just as quietly —  
with awareness.  
With noticing.  
With the willingness to stop running.<br><br>

<strong>THE INNER TURNING</strong><br>
Your heart is softer than you think.  
It responds to truth, sincerity, and Allah.<br><br>

Today is not about becoming someone new —  
but returning to who you were meant to be.<br><br>

<strong>TODAY’S REFLECTION</strong><br>
“Which part of me has been waiting for my attention?”<br>
Keep it simple. Awareness is your return.
`
  },
  {
    day: 3,
    title: "Allowing Yourself to Slow Down",
    content: `
⭐ <strong>DAY 3 — Allowing Yourself to Slow Down</strong><br><br>

<strong>Did you know?</strong><br>
Allah swears by time in Surah Al-Asr — reminding us that loss begins when life becomes rushed.<br><br>

﴿ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴾  
“Verily, in the remembrance of Allah hearts find rest.” — Qur’an 13:28<br><br>

<strong>THE RUSH INSIDE YOU</strong><br>
You may feel behind.  
You may feel pressured to do more, be more, heal faster.<br><br>

But the soul doesn’t grow under pressure.  
It grows in stillness.<br><br>

<strong>THE SACRED PAUSE</strong><br>
Slowing down doesn’t mean weakness —  
it means you’re listening.<br><br>

<strong>TODAY’S REFLECTION</strong><br>
“What can I slow down today — even slightly?”  
Small pauses make space for healing.
`
  },
  {
    day: 4,
    title: "Accepting Where You Are",
    content: `
⭐ <strong>DAY 4 — Accepting Where You Are</strong><br><br>

<strong>Did you know?</strong><br>
Allah describes Himself as Al-Laṭīf — The Subtly Kind —  
the One working within your life in ways you don’t always see.<br><br>

﴿ مَا قَدَرُوا اللَّهَ حَقَّ قَدْرِهِ ﴾  
“They did not recognize Allah as He deserves.” — Qur’an 39:67<br><br>

<strong>THE TRUTH OF YOUR MOMENT</strong><br>
You are exactly where you’re meant to be —  
not as a limitation,  
but as a lesson.<br><br>

Growth begins with acceptance.  
This moment, with its imperfections, is part of Allah’s design.<br><br>

<strong>THE GIFT OF NOW</strong><br>
Stop fighting the moment you’re in.  
Lean into it.  
Listen to it.<br><br>

<strong>TODAY’S REFLECTION</strong><br>
“What is this moment trying to teach me?”
`
  },
  {
    day: 5,
    title: "Your First Quiet Promise to Yourself",
    content: `
⭐ <strong>DAY 5 — The First Quiet Promise to Yourself</strong><br><br>

<strong>Did you know?</strong><br>
Every Prophet began their mission with something small —  
a whisper, a moment, a single command.  
Greatness begins tiny.<br><br>

﴿ وَعِبَادُ الرَّحْمَٰنِ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا ﴾  
“And the servants of the Most Merciful walk upon the earth gently.” — Qur’an 25:63<br><br>

<strong>THE SOFT BEGINNING OF COMMITMENT</strong><br>
Yesterday you set your intention.  
Today is about a small promise.<br><br>

Not heavy.  
Not overwhelming.  
Just meaningful.<br><br>

<strong>WHY IT MATTERS</strong><br>
A promise to yourself quietly says:  
“I am worth showing up for.”<br><br>

<strong>TODAY’S REFLECTION</strong><br>
“My small promise to myself today is ______.”<br>
Transformation begins quietly.
`
  }
];

// Generate day list
const daysContainer = document.getElementById("days");
journalData.forEach(entry => {
  const div = document.createElement("div");
  div.className = "day locked";
  div.innerText = `Day ${entry.day}`;
  div.dataset.day = entry.day;
  daysContainer.appendChild(div);
});

// Time-based unlocking
function unlockDays() {
  const now = new Date();
  const hour = now.getHours();
  const dayOfMonth = now.getDate();

  journalData.forEach(entry => {
    if (dayOfMonth >= entry.day && hour >= unlockHour) {
      document.querySelector(`.day[data-day='${entry.day}']`).classList.remove("locked");
    }
  });
}

unlockDays();

// Open day content
document.addEventListener("click", e => {
  if (e.target.classList.contains("day") && !e.target.classList.contains("locked")) {
    const selectedDay = parseInt(e.target.dataset.day);
    const entry = journalData.find(d => d.day === selectedDay);

    document.getElementById("content-title").innerText = `Day ${entry.day} — ${entry.title}`;
    document.getElementById("content-body").innerHTML = entry.content;

    document.getElementById("content-modal").style.display = "block";
  }
});

// Close modal
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("content-modal").style.display = "none";
});
