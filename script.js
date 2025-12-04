/* Anonymous Guide — single-file site script
   - Day data lives in daysData array
   - localStorage keys used: unlocked, lastUnlockTs, note_day_N
*/

/* ---------- Day content (add more objects to expand) ---------- */
const daysData = [
  {
    day: 1,
    title: "The First Step",
    ayahArabic: "﴿ بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ ﴾",
    ayahTrans: "In the name of Allah, the Most Merciful, the Most Compassionate.",
    text: `THE BEGINNING
Every meaningful journey begins quietly. Not with motivation. Not with a plan. Not with confidence. But with something much softer:
A small decision made in the heart.

Maybe you arrived here feeling tired. Maybe confused. Maybe overwhelmed by how far behind you feel. Or maybe… your heart simply whispered:
“It’s time.”

Whatever brought you here, know this: You didn’t come to this page by accident. You came because something inside you refused to stay where you were.
Let that sink in.

A QUIET AWAKENING
Life has moments that shake us gently — not to hurt us, but to wake us. Moments where Allah places a feeling in your chest that says:
“Rise.”
Not loudly. Not forcefully. Just a quiet invitation back to yourself.
This journal is not about perfection. It is not about fixing everything in one day. It is simply about beginning.
For today… one step is enough.

TODAY’S REFLECTION
Ask yourself:
“What am I running from?
And what am I hoping to run toward?”
Don’t overthink. Don’t write paragraphs. Just be honest — because honesty is the first form of strength.`
  }, 
  {
    day: 2,
    title: "Stand still and see yourself",
    ayahArabic: "﴿ إِنَّ اللّٰهَ مَعَ الصَّابِرِينَ ﴾",
    ayahTrans: "Indeed, Allah is with the patient.",
    text: `TODAY IS NOT ABOUT MOVING
Yesterday was your first step. Today is your stillness.
True growth doesn’t begin with action. It begins with awareness.
Before walking forward, you must know where you are standing. This is not weakness. This is wisdom.
THE GROUND BENEATH YOU
Gently ask yourself:
Where am I mentally? Where am I spiritually? Where am I emotionally? What have I been avoiding? What truth have I refused to admit? Which part of me is exhausted? Which part of me still believes things can get better?
Let the answers rise slowly. There is no rush here.
You’re not here to fix anything today. Just to see clearly.
A MOMENT OF CALM
Step outside yourself for a moment. Watch your life from a distance, without judgment.
What do you see?
A human being who wants to change. A heart trying to return to its Lord. Someone who hasn’t given up.
Let that truth settle gently.
TODAY’S REFLECTION
Ask:
“What part of me needs compassion right now?”
Let the answer come — even if it’s a single word.`
  }
];

/* ---------- storage keys ---------- */
const KEY_UNLOCKED = 'ag_unlocked';
const KEY_LAST_UNLOCK = 'ag_lastUnlockTs';
const KEY_NOTE = d => `ag_note_day_${d}`;

/* ---------- DOM refs (will be assigned after DOMContentLoaded) ---------- */
let home, journal, day, about;
let beginBtn, openJournal, aboutBtn;
let daysList, backBtn, dayTitle;
let ayahArabic, ayahTrans, dayContent;
let note, saveNote, clearNote;
let unlockNext, unlockInfo, homeBtn;

let currentDay = 1;

/* ---------- helpers ---------- */
function el(id){ return document.getElementById(id); }
function safeAddListener(elm, ev, fn){
  if(!elm) return console.warn('Missing element for listener:', ev, elm);
  elm.addEventListener(ev, fn);
}

/* ---------- init ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  // assign DOM refs now (after DOM is ready)
  home = el('home'); journal = el('journal'); day = el('day'); about = el('about');
  beginBtn = el('beginBtn'); openJournal = el('openJournal'); aboutBtn = el('aboutBtn');
  daysList = el('daysList'); backBtn = el('backBtn'); dayTitle = el('dayTitle');
  ayahArabic = el('ayahArabic'); ayahTrans = el('ayahTrans'); dayContent = el('dayContent');
  note = el('note'); saveNote = el('saveNote'); clearNote = el('clearNote');
  unlockNext = el('unlockNext'); unlockInfo = el('unlockInfo');
  homeBtn = el('homeBtn');

  // initialize storage keys if absent
  if(!localStorage.getItem(KEY_UNLOCKED)){
    localStorage.setItem(KEY_UNLOCKED, '1');
    localStorage.setItem(KEY_LAST_UNLOCK, Date.now().toString());
  }

  bindUI();
  showView('home');
  renderDays();
});

/* ---------- UI binding ---------- */
function bindUI(){
  safeAddListener(beginBtn, 'click', ()=> { openDay(1); showView('day'); });
  safeAddListener(openJournal, 'click', ()=> { showView('journal'); });
  safeAddListener(aboutBtn, 'click', ()=> showView('about'));
  safeAddListener(backBtn, 'click', ()=> showView('journal'));
  safeAddListener(saveNote, 'click', saveCurrentNote);
  safeAddListener(clearNote, 'click', clearCurrentNote);
  safeAddListener(unlockNext, 'click', tryUnlockNext);
  safeAddListener(homeBtn, 'click', ()=> showView('home'));
}

/* ---------- view helpers ---------- */
function showView(name){
  // guard: ensure elements exist
  [home,journal,day,about].forEach(s=>{
    if(!s) return; 
    s.classList.add('hidden');
  });
  if(name==='home' && home) home.classList.remove('hidden');
  if(name==='journal' && journal) journal.classList.remove('hidden');
  if(name==='day' && day) day.classList.remove('hidden');
  if(name==='about' && about) about.classList.remove('hidden');
}

/* ---------- render days list ---------- */
function renderDays(){
  if(!daysList) return;
  daysList.innerHTML = '';
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  // safety: ensure daysData array exists
  (daysData || []).forEach(d=>{
    const t = document.createElement('div');
    t.className = 'day-tile' + (d.day>unlocked ? ' locked' : '');
    t.textContent = `Day ${d.day}`;
    if(d.day<=unlocked){
      t.addEventListener('click', ()=> { openDay(d.day); showView('day'); });
    } else {
      t.title = 'This chapter is locked for now';
    }
    daysList.appendChild(t);
  });
}

/* ---------- open day ---------- */
function openDay(n){
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  if(n>unlocked) return;
  const data = (daysData || []).find(x=>x.day===n);
  if(!data) return alert('Content not available yet.');
  currentDay = n;
  if(dayTitle) dayTitle.textContent = `DAY ${data.day} — ${data.title}`;
  if(ayahArabic) ayahArabic.textContent = data.ayahArabic || '';
  if(ayahTrans) ayahTrans.textContent = data.ayahTrans || '';
  if(dayContent) dayContent.innerHTML = formatText(data.text);
  // load note
  if(note) note.value = localStorage.getItem(KEY_NOTE(n)) || '';
  updateUnlockUI();
}

/* ---------- notes ---------- */
function saveCurrentNote(){
  if(!note) return;
  localStorage.setItem(KEY_NOTE(currentDay), note.value);
  alert('Saved locally on this device.');
}
function clearCurrentNote(){
  if(!note) return;
  if(confirm('Clear your note for this day?')){
    localStorage.removeItem(KEY_NOTE(currentDay));
    note.value = '';
  }
}

/* ---------- unlock logic ---------- */
function updateUnlockUI(){
  if(!unlockNext || !unlockInfo) return;
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  const last = Number(localStorage.getItem(KEY_LAST_UNLOCK) || 0);
  if(unlocked >= (daysData || []).length){
    unlockNext.style.display = 'none';
    unlockInfo.textContent = 'All chapters unlocked.';
    return;
  }
  const now = Date.now();
  const ms24 = 24*60*60*1000;
  if(now - last >= ms24){
    unlockNext.disabled = false;
    unlockNext.textContent = 'Unlock Next';
    unlockInfo.textContent = '';
  } else {
    unlockNext.disabled = true;
    const hours = Math.ceil((ms24 - (now-last)) / (60*60*1000));
    unlockNext.textContent = 'Unlock Next';
    unlockInfo.textContent = `Next unlock available in ~${hours} hour(s).`;
  }
}

function tryUnlockNext(){
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  if(unlocked >= (daysData || []).length) return;
  const last = Number(localStorage.getItem(KEY_LAST_UNLOCK) || 0);
  const now = Date.now();
  const ms24 = 24*60*60*1000;
  if(now - last < ms24){
    alert('Unlock not available yet. Come back later.');
    return;
  }
  localStorage.setItem(KEY_UNLOCKED, String(unlocked+1));
  localStorage.setItem(KEY_LAST_UNLOCK, String(now));
  renderDays();
  openDay(unlocked+1);
}

/* ---------- util ---------- */
function formatText(s){
  if(!s) return '';
  const parts = s.split(/\n{2,}/).map(p => `<p>${escapeHtml(p).replace(/\n/g,'<br>')}</p>`);
  return parts.join('');
}
function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ---------- debug: owner helpers (only in console) ---------- */
window.ag_forceUnlock = function(){
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  localStorage.setItem(KEY_UNLOCKED, String(Math.min(unlocked+1, (daysData || []).length)));
  localStorage.setItem(KEY_LAST_UNLOCK, '0');
  renderDays();
  alert('Forced unlock (debug).');
};
