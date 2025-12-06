/* Anonymous Guide — improved
   - Did-you-know shown before content
   - Unlock schedule: next available at 5:00 AM local (nearest after lastUnlock)
   - Larger nav, privacy info, improved rendering
   - localStorage keys:
      ag_unlocked (number)
      ag_lastUnlockTs (ms)
      ag_note_day_X
*/

/* ---------- Day content (paste full day objects here) ----------
Each object:
{
  day: 1,
  title: "The First Step",
  ayahArabic: "﴿ ... ﴾",
  ayahTrans: "translation..",
  didYouKnow: "Short fact related to the day.",
  text: `Long content ...`
}
---------------------------------------------------------------------------- */

const daysData = [
  {
    day: 1,
    title: "The First Step",
    ayahArabic: "﴿ بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ ﴾",
    ayahTrans: "In the name of Allah, the Most Merciful, the Most Compassionate.",
    didYouKnow: "The very first revealed word in the Qur’an was “Iqra” — to read and awaken.",
    text: `THE QUIET BEGINNING
Every meaningful journey starts softly — not with motivation, planning, or confidence… but with a small inward decision.
Maybe you feel tired. Maybe lost. Maybe your heart whispered, “It’s time.”
You didn’t arrive here by accident. Something within you refused to stay where you were.
THE AWAKENING
Allah places gentle moments in our lives — moments that say: Rise. Not loudly. Not forcefully. Just… rise.
This journal isn’t about perfection. It’s about beginning.
For today, one step is enough.
TODAY’S REFLECTION
Ask: “What am I running from — and what am I moving toward?”. 
Keep your answer honest. Honesty is the first form of strength.`
  },
  {
    day: 2,
    title: "Stand Still and See Yourself",
    ayahArabic: "﴿ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ ﴾",
    ayahTrans: "Indeed, Allah is with the patient.",
    didYouKnow: "The heart appears many times in the Qur’an — it is where reminders settle.",
    text: `TTHE CALL BACK
We lose ourselves quietly — in routines, fears, expectations, and noise.
But returning to yourself begins just as quietly — with awareness. With noticing. With the simple willingness to stop running.
THE INNER TURNING
Your heart is softer than you think. It responds to truth. It responds to sincerity. It responds to Allah.
Today is not about becoming someone new. It’s about coming back to who you were meant to be.
TODAY’S REFLECTION
Ask yourself: “Which part of me has been waiting for my attention?”
Write it simply. Let awareness be your first return.`
  },
   {
      day: 3,
    title: "Allowing Yourself to Slow Down",
    ayahArabic: "﴿ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴾",
    ayahTrans: "Verily, in the remembrance of Allah hearts find rest.",
    didYouKnow: "Allah swears by time in Surah Al-Asr — reminding us that loss begins when life becomes rushed.",
    text: `THE RUSH INSIDE YOU
You may feel behind. You may feel pressured to be more, heal faster, do everything.
But the soul doesn’t grow under pressure. It grows in stillness.
THE SACRED PAUSE
Slowing down doesn’t mean you’re weak. It means you’re listening. It means you’re choosing presence over panic.
Give yourself permission to breathe today — to be here, not elsewhere.
TODAY’S REFLECTION
Ask softly: “What can I slow down today, even slightly?”
Small pauses create space for healing.`
}
  // <- paste day 3..30..90 objects here
];

/* ---------- storage keys ---------- */
const KEY_UNLOCKED = 'ag_unlocked';
const KEY_LAST_UNLOCK = 'ag_lastUnlockTs';
const KEY_NOTE = d => `ag_note_day_${d}`;

/* ---------- DOM ---------- */
let home, journal, dayView, about, privacy;
let beginBtn, openJournal, aboutBtn, journalBtn, privacyBtn;
let daysList, backBtn, dayTitle, ayahArabic, ayahTrans, dayContent;
let note, saveNote, clearNote, unlockNext, unlockInfo, homeBtn;
let didYouKnowBox, didYouKnowText, homeDidYouKnow, dykText;
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
  didYouKnowBox = el('didYouKnowBox'); didYouKnowText = el('didYouKnowText');
  homeDidYouKnow = el('homeDidYouKnow'); dykText = el('dykText');
  shareBtn = el('shareBtn');

  // ensure storage
  if(!localStorage.getItem(KEY_UNLOCKED)){
    localStorage.setItem(KEY_UNLOCKED, '1');
    localStorage.setItem(KEY_LAST_UNLOCK, String(Date.now()));
  }

  bindUI();
  renderDays();
  showView('home');
  renderHomeDidYouKnow();
  updateHeaderCounts();
});

/* ---------- helpers ---------- */
function el(id){ return document.getElementById(id); }
function safeAddListener(elm, ev, fn){ if(!elm) return; elm.addEventListener(ev, fn); }

/* ---------- UI binding ---------- */
function bindUI(){
  safeAddListener(beginBtn, 'click', ()=> { openDay(1); showView('day'); });
  safeAddListener(openJournal, 'click', ()=> { showView('journal'); });
  safeAddListener(journalBtn, 'click', ()=> showView('journal'));
  safeAddListener(aboutBtn, 'click', ()=> showView('about'));
  safeAddListener(privacyBtn, 'click', ()=> showView('privacy'));
  safeAddListener(backBtn, 'click', ()=> showView('journal'));
  safeAddListener(saveNote, 'click', saveCurrentNote);
  safeAddListener(clearNote, 'click', clearCurrentNote);
  safeAddListener(unlockNext, 'click', tryUnlockNext);
  safeAddListener(homeBtn, 'click', ()=> showView('home'));
  safeAddListener(shareBtn, 'click', ()=> {
    try { navigator.share && navigator.share({ title: dayTitle.textContent, text: stripHtml(dayContent.innerText) }); }
    catch(e){ alert('Share not available on this device.'); }
  });
}

/* ---------- view helpers ---------- */
function showView(name){
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
    t.innerHTML = `<div class="num">Day ${d.day}</div>
                   <div class="title">${escapeHtml(d.title)}</div>
                   <div class="preview">${escapeHtml(getPreview(d.text || d.didYouKnow || ''))}</div>`;
    if(d.day<=unlocked){
      t.addEventListener('click', ()=> { openDay(d.day); showView('day'); });
    } else {
      t.title = 'Locked — next unlock at 5:00 AM local time';
    }
    daysList.appendChild(t);
  });
  updateHeaderCounts();
}

function renderHomeDidYouKnow(){
  // try to show the first unlocked day's did-you-know
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  const d = daysData.find(x=>x.day===unlocked) || daysData[0];
  if(!d) return;
  if(dykText) dykText.textContent = d.didYouKnow || (d.ayahTrans || '');
  if(el('totalDays')) el('totalDays').textContent = String(daysData.length || 90);
  if(el('unlockedCount')) el('unlockedCount').textContent = String(unlocked);
}

function updateHeaderCounts(){ if(el('unlockedCount')) el('unlockedCount').textContent = String(Number(localStorage.getItem(KEY_UNLOCKED) || 1)); }

/* ---------- open day ---------- */
function openDay(n){
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  if(n>unlocked) return;
  const data = daysData.find(x=>x.day===n);
  if(!data) return alert('Content not available yet.');
  currentDay = n;
  dayTitle.textContent = `DAY ${data.day} — ${data.title}`;
  // did you know
  if(didYouKnowText) didYouKnowText.textContent = data.didYouKnow || '';
  // ayah
  ayahArabic.textContent = data.ayahArabic || '';
  ayahTrans.textContent = data.ayahTrans || '';
  dayContent.innerHTML = formatText(shortenForDisplay(data.text || '', 600));
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
  }
}

/* ---------- unlock logic (5:00 AM rule) ---------- */
/*
  Rule:
  - Store last unlock timestamp (ms) in ag_lastUnlockTs
  - Next unlock allowed at the next 05:00 local time after lastUnlockTs
  - If no lastUnlockTs: allow immediate (but then set lastUnlock)
*/

function getNext5amAfter(ts){
  // returns ms timestamp of next occurrence of 05:00 local after given ts
  const base = ts ? new Date(Number(ts)) : new Date();
  // move to the day of base
  let candidate = new Date(base);
  candidate.setHours(5,0,0,0);
  if(candidate.getTime() <= base.getTime()){
    // if same or earlier, move to next day
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
  const parts = s.split(/\n{2,}/).map(p => `<p>${escapeHtml(p).replace(/\n/g,'<br>')}</p>`);
  return parts.join('');
}
function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function getPreview(s){
  if(!s) return '';
  const plain = s.replace(/\r/g,'').replace(/\n+/g,' ').trim();
  return plain.length>140 ? plain.slice(0,137)+'…' : plain;
}
function shortenForDisplay(s, max){
  if(!s) return '';
  return s.length>max ? escapeHtml(s.slice(0,max)) + '…' : escapeHtml(s);
}
function stripHtml(s){ return s.replace(/<\/?[^>]+(>|$)/g, ""); }
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

/* ---------- small initializers ---------- */
function stripTimeFromDate(date){
  const d = new Date(date);
  d.setHours(0,0,0,0);
  return d;
}
function renderInitial(){
  // show first unlocked day's did-you-know on home
  renderHomeDidYouKnow();
  updateUnlockUI();
}
renderInitial();
