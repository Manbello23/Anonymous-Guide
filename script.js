/* Anonymous Guide — integrated & fixed
   - Includes daysData for day 1-5
   - Unlock rule: next chapter allowed at 5:00AM local time after last unlock
   - Notes saved locally (localStorage)
   - Smooth view transitions
   - Requires logo files: logo-small.png and logo-hero.png (or update src)
*/

/* ---------- Day content (days 1-5 pasted) ----------
Each object:
{
  day: 1,
  title: "...",
  ayahArabic: "﴿ ... ﴾",
  ayahTrans: "...",
  didYouKnow: "...",
  text: "long string with paragraphs separated by \\n\\n"
}
---------------------------------------------------------------------------- */

const daysData = [
  {
    day: 1,
    title: "The First Step",
    ayahArabic: "﴿ بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ ﴾",
    ayahTrans: "In the name of Allah, the Most Merciful, the Most Compassionate.",
    didYouKnow: "The very first word revealed in the Qur’an was “Iqra” — Read. A command not just to read text, but to awaken.",
    text:
`THE QUIET BEGINNING

Every meaningful journey starts softly — not with motivation, planning, or confidence… but with a small inward decision.
Maybe you feel tired. Maybe lost. Maybe your heart whispered, “It’s time.”
You didn’t arrive here by accident. Something within you refused to stay where you were.

THE AWAKENING

Allah places gentle moments in our lives — moments that say: Rise. Not loudly. Not forcefully. Just… rise.
This journal isn’t about perfection. It’s about beginning.
For today, one step is enough.

TODAY’S REFLECTION

Ask: “What am I running from — and what am I moving toward?”
Keep your answer honest. Honesty is the first form of strength.`
  },
  {
    day: 2,
    title: "Returning to Yourself",
    ayahArabic: "﴿ إِنَّ فِي ذَٰلِكَ لَذِكْرَى لِّمَن كَانَ لَهُ قَلْبٌ ﴾",
    ayahTrans: "“Surely in this is a reminder for whoever has a heart.” — Qur’an 50:37",
    didYouKnow: "The heart is mentioned often in the Qur’an — always as something that turns, softens, or awakens.",
    text:
`THE CALL BACK

We lose ourselves quietly — in routines, fears, expectations, and noise.
But returning to yourself begins just as quietly — with awareness. With noticing. With the simple willingness to stop running.

THE INNER TURNING

Your heart is softer than you think. It responds to truth. It responds to sincerity. It responds to Allah.
Today is not about becoming someone new. It’s about coming back to who you were meant to be.

TODAY’S REFLECTION

Ask yourself: “Which part of me has been waiting for my attention?”
Write it simply. Let awareness be your first return.`
  },
  {
    day: 3,
    title: "Allowing Yourself to Slow Down",
    ayahArabic: "﴿ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴾",
    ayahTrans: "“Verily, in the remembrance of Allah hearts find rest.” — Qur’an 13:28",
    didYouKnow: "Allah swears by time in Surah Al-Asr — reminding us that loss begins when life becomes rushed.",
    text:
`THE RUSH INSIDE YOU

You may feel behind. You may feel pressured to be more, heal faster, do everything.
But the soul doesn’t grow under pressure. It grows in stillness.

THE SACRED PAUSE

Slowing down doesn’t mean you’re weak. It means you’re listening. It means you’re choosing presence over panic.
Give yourself permission to breathe today — to be here, not elsewhere.

TODAY’S REFLECTION

Ask softly: “What can I slow down today, even slightly?”
Small pauses create space for healing.`
  },
  {
    day: 4,
    title: "Accepting Where You Are",
    ayahArabic: "﴿ مَا قَدَرُوا اللَّهَ حَقَّ قَدْرِهِ ﴾",
    ayahTrans: "“They did not recognize Allah as He deserves to be recognized.” — Qur’an 39:67",
    didYouKnow: "In the Qur’an Allah is described with names that emphasize subtle kindness — He works within our lives in ways we often don’t see.",
    text:
`THE TRUTH OF YOUR MOMENT

You are exactly where you’re meant to be — not as a limitation, but as a lesson.
Growth doesn’t start with change. It starts with acceptance.

THE GIFT OF NOW

Stop fighting the moment you’re in. Lean into it. Listen to it. There is a message here — subtle but real.

TODAY’S REFLECTION

Ask: “What is this moment trying to teach me?”
Let the answer reveal itself gently.`
  },
  {
    day: 5,
    title: "The First Quiet Promise to Yourself",
    ayahArabic: "﴿ وَعِبَادُ الرَّحْمَٰنِ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا ﴾",
    ayahTrans: "“And the servants of the Most Merciful walk upon the earth gently.” — Qur’an 25:63",
    didYouKnow: "Every Prophet began with something small — a whisper, a moment, a single command. Greatness begins tiny.",
    text:
`THE SOFT BEGINNING OF COMMITMENT

Yesterday you formed intention. Today is about something just as gentle — a small promise to yourself.
Not loud. Not heavy. Just meaningful.

WHY IT MATTERS

A promise to yourself says: “I am worth showing up for.”
It’s not about perfection — it’s about dignity.

TODAY’S REFLECTION

Ask yourself: “What tiny, realistic promise can I keep today?”
Let it be light. Let it be human. Let it be yours.`
  }
];

/* ---------- storage keys ---------- */
const KEY_UNLOCKED = 'ag_unlocked';
const KEY_LAST_UNLOCK = 'ag_lastUnlockTs';
const KEY_NOTE = d => `ag_note_day_${d}`;

/* ---------- DOM references ---------- */
let home, journal, dayView, about, privacy;
let beginBtn, openJournal, aboutBtn, journalBtn, privacyBtn;
let daysList, backBtn, dayTitle, ayahArabic, ayahTrans, dayContent;
let note, saveNote, clearNote, unlockNext, unlockInfo, homeBtn;
let didYouKnowText, dykText;
let shareBtn;

let currentDay = 1;

/* ---------- init ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  // DOM
  home = el('home'); journal = el('journal'); dayView = el('day'); about = el('about'); privacy = el('privacy');
  beginBtn = el('beginBtn'); openJournal = el('openJournal'); aboutBtn = el('aboutBtn');
  journalBtn = el('journalBtn'); privacyBtn = el('privacyBtn');
  daysList = el('daysList'); backBtn = el('backBtn'); dayTitle = el('dayTitle');
  ayahArabic = el('ayahArabic'); ayahTrans = el('ayahTrans'); dayContent = el('dayContent');
  note = el('note'); saveNote = el('saveNote'); clearNote = el('clearNote');
  unlockNext = el('unlockNext'); unlockInfo = el('unlockInfo'); homeBtn = el('homeBtn');
  didYouKnowText = el('didYouKnowText'); dykText = el('dykText');
  shareBtn = el('shareBtn');

  // ensure storage defaults
  if(!localStorage.getItem(KEY_UNLOCKED)){
    localStorage.setItem(KEY_UNLOCKED, '1');
    // set last unlock to yesterday so nextUnlock calculation works consistently
    const yesterday = Date.now() - (24 * 60 * 60 * 1000);
    localStorage.setItem(KEY_LAST_UNLOCK, String(yesterday));
  }

  bindUI();
  renderDays();
  showView('home');
  renderHomeDidYouKnow();
  updateHeaderCounts();
  updateUnlockUI();
});

/* ---------- helpers ---------- */
function el(id){ return document.getElementById(id); }
function safeAddListener(elm, ev, fn){ if(!elm) return; elm.addEventListener(ev, fn); }

/* ---------- UI binding ---------- */
function bindUI(){
  safeAddListener(beginBtn, 'click', ()=> { openDay(1); transitionTo('day'); });
  safeAddListener(openJournal, 'click', ()=> { transitionTo('journal'); });
  safeAddListener(journalBtn, 'click', ()=> transitionTo('journal'));
  safeAddListener(aboutBtn, 'click', ()=> transitionTo('about'));
  safeAddListener(privacyBtn, 'click', ()=> transitionTo('privacy'));
  safeAddListener(backBtn, 'click', ()=> transitionTo('journal'));
  safeAddListener(saveNote, 'click', saveCurrentNote);
  safeAddListener(clearNote, 'click', clearCurrentNote);
  safeAddListener(unlockNext, 'click', tryUnlockNext);
  safeAddListener(homeBtn, 'click', ()=> transitionTo('home'));
  safeAddListener(shareBtn, 'click', ()=> {
    try { 
      if(navigator.share){
        navigator.share({ title: dayTitle.textContent, text: stripHtml(dayContent.innerText) });
      } else {
        // fallback: copy content to clipboard
        navigator.clipboard && navigator.clipboard.writeText(stripHtml(dayContent.innerText));
        toast('Content copied to clipboard (fallback).');
      }
    } catch(e){ toast('Share not available on this device.'); }
  });
}

/* ---------- view helpers with simple transitions ---------- */
function transitionTo(name){
  // add small 'out' animation by adding hidden, then show target
  const views = { home, journal, dayView, about, privacy };
  Object.values(views).forEach(v => { if(!v) return; v.classList.add('hidden'); });
  // small delay to allow CSS transition to run
  requestAnimationFrame(()=> {
    // show chosen view
    if(name==='home' && home) home.classList.remove('hidden');
    if(name==='journal' && journal) journal.classList.remove('hidden');
    if(name==='day' && dayView) dayView.classList.remove('hidden');
    if(name==='about' && about) about.classList.remove('hidden');
    if(name==='privacy' && privacy) privacy.classList.remove('hidden');
    // after view change, ensure header counts / unlock UI updated
    renderHomeDidYouKnow();
    updateHeaderCounts();
    updateUnlockUI();
    // scroll to top of view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function showView(name){
  // immediate show without animation (kept for compatibility)
  [home,journal,dayView,about,privacy].forEach(s=>{ if(!s) return; s.classList.add('hidden'); });
  if(name==='home' && home) home.classList.remove('hidden');
  if(name==='journal' && journal) journal.classList.remove('hidden');
  if(name==='day' && dayView) dayView.classList.remove('hidden');
  if(name==='about' && about) about.classList.remove('hidden');
  if(name==='privacy' && privacy) privacy.classList.remove('hidden');
}

/* ---------- rendering ---------- */
function renderDays(){
  if(!daysList) return;
  daysList.innerHTML = '';
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  daysData.forEach(d=>{
    const t = document.createElement('div');
    t.className = 'day-tile' + (d.day>unlocked ? ' locked' : '');
    const previewText = escapeHtml(getPreview(d.text || d.didYouKnow || ''));
    t.innerHTML = `
      <div class="num">Day ${d.day}</div>
      <div class="title">${escapeHtml(d.title)}</div>
      <div class="preview">${previewText}</div>
    `;
    if(d.day<=unlocked){
      t.addEventListener('click', ()=> { openDay(d.day); transitionTo('day'); });
    } else {
      t.title = 'Locked — next unlock at 5:00 AM local time';
    }
    daysList.appendChild(t);
  });
  updateHeaderCounts();
}

function renderHomeDidYouKnow(){
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  const d = daysData.find(x=>x.day===unlocked) || daysData[0];
  if(!d) return;
  if(dykText) dykText.textContent = d.didYouKnow || (d.ayahTrans || '');
  const totalEl = el('totalDays');
  const unlockedEl = el('unlockedCount');
  if(totalEl) totalEl.textContent = String(daysData.length || 90);
  if(unlockedEl) unlockedEl.textContent = String(unlocked);
}

function updateHeaderCounts(){ if(el('unlockedCount')) el('unlockedCount').textContent = String(Number(localStorage.getItem(KEY_UNLOCKED) || 1)); }

/* ---------- open day ---------- */
function openDay(n){
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  if(n>unlocked) { toast('This day is still locked.'); return; }
  const data = daysData.find(x=>x.day===n);
  if(!data) return alert('Content not available yet.');
  currentDay = n;
  dayTitle.textContent = `DAY ${data.day} — ${data.title}`;
  // did you know
  if(didYouKnowText) didYouKnowText.textContent = data.didYouKnow || '';
  // ayah
  ayahArabic.textContent = data.ayahArabic || '';
  ayahTrans.textContent = data.ayahTrans || '';
  dayContent.innerHTML = formatText(data.text || '');
  // note
  note.value = localStorage.getItem(KEY_NOTE(currentDay)) || '';
  updateUnlockUI();
}

/* ---------- notes ---------- */
function saveCurrentNote(){
  if(!note) return;
  localStorage.setItem(KEY_NOTE(currentDay), note.value);
  toast('Saved locally on this device.');
}
function clearCurrentNote(){
  if(!note) return;
  if(confirm('Clear your note for this day?')){
    localStorage.removeItem(KEY_NOTE(currentDay));
    note.value = '';
    toast('Note cleared.');
  }
}

/* ---------- unlock logic (5:00 AM rule) ---------- */
/*
  Logic:
  - last unlock timestamp stored at KEY_LAST_UNLOCK
  - next unlock allowed at the next 05:00 local time after the lastUnlock
  - if lastUnlock missing we set to yesterday during init
*/

function getNext5amAfter(ts){
  const base = ts ? new Date(Number(ts)) : new Date();
  let candidate = new Date(base);
  candidate.setHours(5,0,0,0);
  if(candidate.getTime() <= base.getTime()){
    candidate = new Date(candidate.getTime() + 24*60*60*1000);
  }
  return candidate.getTime();
}

function updateUnlockUI(){
  if(!unlockNext || !unlockInfo) return;
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  const last = Number(localStorage.getItem(KEY_LAST_UNLOCK) || 0);
  const total = daysData.length || 90;
  if(unlocked >= total){
    unlockNext.style.display = 'none';
    unlockInfo.textContent = 'All chapters unlocked.';
    return;
  }
  const now = Date.now();
  const nextUnlockTs = getNext5amAfter(last || (now - 24*60*60*1000));
  if(now >= nextUnlockTs){
    unlockNext.disabled = false;
    unlockNext.textContent = 'Unlock Next';
    unlockInfo.textContent = '';
  } else {
    unlockNext.disabled = true;
    unlockNext.textContent = 'Unlock Next';
    unlockInfo.textContent = `Next unlock: ${formatLocalDate(nextUnlockTs)} (5:00 AM)`;
  }
}

function tryUnlockNext(){
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  const total = daysData.length || 90;
  if(unlocked >= total) return;
  const last = Number(localStorage.getItem(KEY_LAST_UNLOCK) || 0);
  const now = Date.now();
  const nextUnlockTs = getNext5amAfter(last || (now - 24*60*60*1000));
  if(now < nextUnlockTs){
    alert('Unlock not available yet. Come back at 5:00 AM local time.');
    return;
  }
  // unlock
  localStorage.setItem(KEY_UNLOCKED, String(unlocked+1));
  localStorage.setItem(KEY_LAST_UNLOCK, String(now));
  renderDays();
  openDay(unlocked+1);
  renderHomeDidYouKnow();
  toast('New chapter unlocked — welcome.');
}

/* ---------- small utilities ---------- */
function formatText(s){
  if(!s) return '';
  // split by double-newline into paragraphs
  const parts = String(s).split(/\n{2,}/).map(p => `<p>${escapeHtml(p.trim()).replace(/\n/g,'<br>')}</p>`);
  return parts.join('');
}
function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function getPreview(s){
  if(!s) return '';
  const plain = s.replace(/\r/g,'').replace(/\n+/g,' ').trim();
  return plain.length>140 ? plain.slice(0,137)+'…' : plain;
}
function stripHtml(s){ return String(s).replace(/<\/?[^>]+(>|$)/g, ""); }
function formatLocalDate(ts){
  const d = new Date(Number(ts));
  const opts = { year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' };
  return d.toLocaleString(undefined, opts);
}

/* tiny toast */
function toast(msg){
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.position='fixed'; t.style.right='18px'; t.style.bottom='18px';
  t.style.background='rgba(0,0,0,0.8)'; t.style.color='#fff'; t.style.padding='10px 14px';
  t.style.borderRadius='10px'; t.style.zIndex=9999; t.style.fontSize='14px';
  document.body.appendChild(t);
  setTimeout(()=> t.remove(),2200);
}

/* ---------- debug helpers ---------- */
window.ag_forceUnlock = function(){
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  localStorage.setItem(KEY_UNLOCKED, String(Math.min(unlocked+1, daysData.length || 90)));
  localStorage.setItem(KEY_LAST_UNLOCK, String(Date.now()));
  renderDays();
  alert('Forced unlock (debug).');
};

/* ---------- initial render update ---------- */
function renderInitial(){
  renderHomeDidYouKnow();
  updateUnlockUI();
}
renderInitial();
