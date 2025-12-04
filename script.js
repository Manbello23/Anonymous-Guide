/* ---------- CONFIG ---------- */
/* Days array: add new day objects here (day ascending).
   To add a new day: copy the structure and append.
*/
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
  }
];

/* ---------- LOCAL STATE & KEYS ---------- */
const STORAGE_PREFIX = 'anonymous_guide_';
const KEY_UNLOCKED = STORAGE_PREFIX + 'unlocked';     // number
const KEY_LAST_UNLOCK_TS = STORAGE_PREFIX + 'lastUnlockTs';
const KEY_NOTE_PREFIX = STORAGE_PREFIX + 'note_day_';

/* ---------- UI refs ---------- */
const beginBtn = document.getElementById('beginBtn');
const aboutBtn = document.getElementById('aboutBtn');
const hero = document.getElementById('hero');
const journey = document.getElementById('journey');
const dayView = document.getElementById('dayView');
const about = document.getElementById('about');
const daysGrid = document.getElementById('daysGrid');
const backToJournal = document.getElementById('backToJournal');
const dayHeadText = document.getElementById('dayHeadText');
const ayahArabic = document.getElementById('ayahArabic');
const ayahTrans = document.getElementById('ayahTrans');
const dayContent = document.getElementById('dayContent');
const noteInput = document.getElementById('note');
const saveNoteBtn = document.getElementById('saveNote');
const copyNoteBtn = document.getElementById('copyNote');
const clearNoteBtn = document.getElementById('clearNote');
const unlockNextBtn = document.getElementById('unlockNextBtn');

/* ---------- STARTUP ---------- */
document.addEventListener('DOMContentLoaded', ()=> {
  // initial unlocked
  if(!localStorage.getItem(KEY_UNLOCKED)){
    localStorage.setItem(KEY_UNLOCKED, '1'); // Day 1 unlocked by default
    localStorage.setItem(KEY_LAST_UNLOCK_TS, Date.now().toString());
  }
  showHero();
  renderDaysGrid();
});

/* ---------- NAV ---------- */
beginBtn.addEventListener('click', ()=> {
  showJourney();
  openDay(1);
});
aboutBtn.addEventListener('click', ()=> {
  showAbout();
});
backToJournal.addEventListener('click', ()=> {
  showJourney();
});

/* ---------- SHOW / HIDE helpers ---------- */
function hideAllPanels(){
  hero.classList.add('hidden');
  journey.classList.add('hidden');
  dayView.classList.add('hidden');
  about.classList.add('hidden');
}
function showHero(){ hideAllPanels(); hero.classList.remove('hidden'); }
function showJourney(){ hideAllPanels(); journey.classList.remove('hidden'); renderDaysGrid(); }
function showDayPanel(){ hideAllPanels(); dayView.classList.remove('hidden'); }
function showAbout(){ hideAllPanels(); about.classList.remove('hidden'); }

/* ---------- DAYS GRID ---------- */
function renderDaysGrid(){
  daysGrid.innerHTML = '';
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  for(let i=1;i<=daysData.length;i++){
    const tile = document.createElement('div');
    tile.className = 'day-tile' + (i>unlocked ? ' locked' : '');
    tile.textContent = 'Day ' + i;
    if(i<=unlocked){
      tile.addEventListener('click', ()=> openDay(i));
    } else {
      // optional tooltip or click that explains lock
      tile.title = 'This chapter will open in time.';
    }
    daysGrid.appendChild(tile);
  }
}

/* ---------- OPEN DAY ---------- */
let currentDay = 1;
function openDay(n){
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  if(n > unlocked) return; // locked
  const data = daysData.find(d=>d.day===n);
  if(!data) { alert('Content not available yet.'); return; }
  currentDay = n;
  dayHeadText.textContent = `DAY ${data.day} — ${data.title}`;
  ayahArabic.textContent = data.ayahArabic || '';
  ayahTrans.textContent = data.ayahTrans || '';
  dayContent.innerHTML = `<p>${escapeHtmlMultiline(data.text)}</p>`;
  // load note
  const saved = localStorage.getItem(KEY_NOTE_PREFIX + data.day) || '';
  noteInput.value = saved;
  showDayPanel();
  updateUnlockButton();
}

/* ---------- NOTES ---------- */
saveNoteBtn.addEventListener('click', ()=>{
  localStorage.setItem(KEY_NOTE_PREFIX + currentDay, noteInput.value);
  alert('Saved locally on this device.');
});
copyNoteBtn.addEventListener('click', ()=>{
  navigator.clipboard.writeText(noteInput.value).then(()=> alert('Copied to clipboard.'));
});
clearNoteBtn.addEventListener('click', ()=>{
  if(confirm('Clear your note for this day?')){
    localStorage.removeItem(KEY_NOTE_PREFIX + currentDay);
    noteInput.value = '';
  }
});

/* ---------- UNLOCK LOGIC ---------- */
/* Behavior:
   - User starts with day 1 unlocked.
   - After reading a day, they can unlock the next day via "Unlock Next" button.
   - To prevent instant unlocking, the button is disabled until 24 hours since last unlock.
   - Owner/testing: open browser console and call `forceUnlock()` to bypass.
*/
function updateUnlockButton(){
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  const lastTs = Number(localStorage.getItem(KEY_LAST_UNLOCK_TS) || 0);
  const now = Date.now();
  const ms24 = 24*60*60*1000;
  if(unlocked >= daysData.length){
    unlockNextBtn.style.display = 'none';
    return;
  }
  // show state
  if(now - lastTs >= ms24){
    unlockNextBtn.disabled = false;
    unlockNextBtn.textContent = 'Unlock Next';
  } else {
    unlockNextBtn.disabled = true;
    const hours = Math.ceil((ms24 - (now - lastTs)) / (60*60*1000));
    unlockNextBtn.textContent = `Unlock available in ~${hours}h`;
  }
}
unlockNextBtn.addEventListener('click', ()=> {
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  if(unlocked >= daysData.length) return;
  const newVal = unlocked + 1;
  localStorage.setItem(KEY_UNLOCKED, String(newVal));
  localStorage.setItem(KEY_LAST_UNLOCK_TS, Date.now().toString());
  renderDaysGrid();
  openDay(newVal);
});

/* ---------- small helpers ---------- */
function escapeHtmlMultiline(s){
  if(!s) return '';
  // simple escape and preserve newlines as paragraphs
  const esc = s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return esc.split(/\n{2,}/).map(p=>'<p>'+p.replace(/\n/g,'<br>')+'</p>').join('');
}

/* debug helper (owner) */
function forceUnlock(){
  const unlocked = Number(localStorage.getItem(KEY_UNLOCKED) || 1);
  localStorage.setItem(KEY_UNLOCKED, String(Math.min(daysData.length, unlocked+1)));
  localStorage.setItem(KEY_LAST_UNLOCK_TS, '0');
  renderDaysGrid();
  alert('Forced one-day unlock (debug).');
}
window.forceUnlock = forceUnlock;
