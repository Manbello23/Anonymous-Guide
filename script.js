/* ========== CONFIG ========== */
/* Set the global launch date (UTC). All users unlock days relative to this date.
   Format: YYYY-MM-DD (00:00:00 UTC start of day)
   Example: launch 2025-12-01 00:00:00 UTC -> Day 1 on that date for everyone.
*/
const LAUNCH_DATE = "2025-12-08"; // <-- change this to control global unlocking

/* Journal content array.
   Keep the structure simple: {day: n, title: "...", ayahArabic: "...", ayahTrans: "...", text: "full content..."}
   You can paste full day text here. For the demo we include Day 1 and a couple more samples.
*/
const daysData = [
  {
    day: 1,
    title: "The First Step",
    ayahArabic: "﴿ بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ ﴾",
    ayahTrans: "In the name of Allah, the Most Merciful, the Most Compassionate.",
    text: `Every meaningful journey begins quietly. Not with motivation. Not with a plan. Not with confidence. But with something much softer: a small decision made in the heart. For today... one step is enough.`
  },
  {
    day: 2,
    title: "Stand Still and See Yourself",
    ayahArabic: "﴿ إِنَّ اللّٰهَ مَعَ الصَّابِرِينَ ﴾",
    ayahTrans: "“Indeed, Allah is with the patient.” — Qur'an 2:153",
    text: `Yesterday was your first step. Today is your stillness. True growth doesn’t begin with action — it begins with awareness. Before walking forward, you must know where you stand.`
  },
  {
    day: 3,
    title: "Accept Where You Stand",
    ayahArabic: "﴿ فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾",
    ayahTrans: "“Indeed, with hardship comes ease.” — Qur’an 94:6",
    text: `Before any change begins, the heart must release the tension it’s been holding. Acceptance is not giving up. Acceptance is stopping the fight against reality.`
  }
  // Add more days up to 90 here. You can batch paste as needed.
];

/* ========== UTILS ========== */
function daysBetween(launchISO) {
  const launch = new Date(launchISO + "T00:00:00Z").getTime(); // UTC start
  const now = new Date().getTime();
  const diff = now - launch;
  return Math.floor(diff / 86400000) + 1; // day 1 on launch day
}

/* ========== APP STATE ========== */
let currentDayIndex = 0;
let currentDayNumber = 1;
const maxDayAvailable = daysData.length;

/* ========== DOM ========== */
const hero = document.getElementById("hero");
const beginBtn = document.getElementById("beginBtn");
const app = document.getElementById("app");
const menuBtn = document.getElementById("menuBtn");
const menuPanel = document.getElementById("menuPanel");
const goHome = document.getElementById("goHome");
const goJournal = document.getElementById("goJournal");
const goReflections = document.getElementById("goReflections");
const goAbout = document.getElementById("goAbout");
const goContact = document.getElementById("goContact");
const enterJournal = document.getElementById("enterJournal");

const homeView = document.getElementById("homeView");
const journalView = document.getElementById("journalView");
const reflectionsView = document.getElementById("reflectionsView");
const aboutView = document.getElementById("aboutView");
const contactView = document.getElementById("contactView");

const indexGrid = document.getElementById("indexGrid");
const dayReader = document.getElementById("dayReader");
const dayTitle = document.getElementById("dayTitle");
const ayahArabic = document.getElementById("ayahArabic");
const ayahTranslation = document.getElementById("ayahTranslation");
const dayContent = document.getElementById("dayContent");
const reflectionInput = document.getElementById("reflectionInput");
const saveNote = document.getElementById("saveNote");
const copyNote = document.getElementById("copyNote");
const clearNote = document.getElementById("clearNote");
const myNotes = document.getElementById("myNotes");
const exportAll = document.getElementById("exportAll");

const prevDayBtn = document.getElementById("prevDay");
const nextDayBtn = document.getElementById("nextDay");
const lockedOverlay = document.getElementById("lockedOverlay");
const backToIndex = document.getElementById("backToIndex");

const startDayComputed = Math.max(1, daysBetween(LAUNCH_DATE)); // clamp to 1+

/* ========== BOOTSTRAP ========== */
document.addEventListener("DOMContentLoaded", () => {
  // render hero already visible; app hidden until begin
  // prepare index grid
  renderIndexGrid();

  // compute global unlocked day according to LAUNCH_DATE
  const globalDay = Math.max(0, daysBetween(LAUNCH_DATE));
  window.__GLOBAL_DAY = globalDay; // debug / reference

  // hide app initially
  app.classList.add("hidden");
});

/* ========== HERO / COVER ACTIONS ========== */
beginBtn.addEventListener("click", () => openApp());
document.getElementById("enterJournal").addEventListener("click", ()=> showJournal());

function openApp(){
  // small animation: shrink cover then show app
  document.querySelector(".cover-wrap").style.transform = "translateY(-18px) scale(.96)";
  setTimeout(()=> {
    hero.classList.add("hidden");
    app.classList.remove("hidden");
    showHome();
  }, 650);
}

/* ========== MENU ACTIONS ========== */
menuBtn.addEventListener("click", ()=> {
  const expanded = menuBtn.getAttribute("aria-expanded")==="true";
  if(expanded){
    menuBtn.setAttribute("aria-expanded","false");
    menuPanel.classList.add("hidden");
    menuPanel.setAttribute("aria-hidden","true");
  } else {
    menuBtn.setAttribute("aria-expanded","true");
    menuPanel.classList.remove("hidden");
    menuPanel.setAttribute("aria-hidden","false");
  }
});
goHome.addEventListener("click", ()=>{ showHome(); closeMenu();});
goJournal.addEventListener("click", ()=>{ showJournal(); closeMenu();});
goReflections.addEventListener("click", ()=>{ showReflections(); closeMenu();});
goAbout.addEventListener("click", ()=>{ showAbout(); closeMenu();});
goContact.addEventListener("click", ()=>{ showContact(); closeMenu();});
function closeMenu(){ menuBtn.setAttribute("aria-expanded","false"); menuPanel.classList.add("hidden"); menuPanel.setAttribute("aria-hidden","true"); }

/* ========== VIEW NAVIGATION ========== */
function hideAllViews(){
  homeView.classList.add("hidden");
  journalView.classList.add("hidden");
  reflectionsView.classList.add("hidden");
  aboutView.classList.add("hidden");
  contactView.classList.add("hidden");
}
function showHome(){ hideAllViews(); homeView.classList.remove("hidden"); }
function showJournal(){ hideAllViews(); journalView.classList.remove("hidden"); showIndex(); }
function showReflections(){ hideAllViews(); reflectionsView.classList.remove("hidden"); renderNotes(); }
function showAbout(){ hideAllViews(); aboutView.classList.remove("hidden"); }
function showContact(){ hideAllViews(); contactView.classList.remove("hidden"); }

/* ========== INDEX GRID ========== */
function renderIndexGrid(){
  indexGrid.innerHTML = "";
  const globalDay = window.__GLOBAL_DAY || 0;
  for(let i=1;i<=daysData.length;i++){
    const card = document.createElement("div");
    card.className = "index-card " + (i<=globalDay ? "unlocked":"locked");
    card.setAttribute("data-day", i);
    card.innerHTML = `<div class="num">${i}</div><div class="mini">Day ${i}</div>`;
    if(i<=globalDay){
      card.addEventListener("click", ()=> openDay(i));
    } else {
      card.addEventListener("click", ()=> showLockedInfo(i));
    }
    indexGrid.appendChild(card);
  }
}

/* ========== LOCKED INFO ========== */
function showLockedInfo(day){
  // simple toast or overlay
  alert(`Day ${day} is locked. This chapter opens later.`);
}

/* ========== OPEN DAY ========== */
function openDay(day){
  const globalDay = window.__GLOBAL_DAY || 0;
  const found = daysData.find(d=>d.day===day);
  if(!found) return alert("No content yet for this day.");
  currentDayNumber = day;
  currentDayIndex = daysData.indexOf(found);
  renderDay(found, day<=globalDay);
  showDayReader();
}

/* render day content */
function renderDay(d, unlocked=true){
  dayTitle.textContent = `Day ${d.day} — ${d.title}`;
  ayahArabic.textContent = d.ayahArabic || "";
  ayahTranslation.textContent = d.ayahTrans || "";
  dayContent.innerHTML = `<p>${d.text}</p>`;
  // set saved note
  const key = `journey_note_day_${d.day}`;
  const saved = localStorage.getItem(key) || "";
  reflectionInput.value = saved;
  // locked state
  if(!unlocked){
    lockedOverlay.classList.remove("hidden");
    lockedOverlay.setAttribute("aria-hidden","false");
    dayReader.classList.add("hidden");
  } else {
    lockedOverlay.classList.add("hidden");
    lockedOverlay.setAttribute("aria-hidden","true");
    dayReader.classList.remove("hidden");
  }
}

/* show reader UI */
function showDayReader(){ dayReader.classList.remove("hidden"); }

/* navigation */
prevDayBtn.addEventListener("click", ()=>{
  if(currentDayNumber<=1) return;
  openDay(currentDayNumber-1);
});
nextDayBtn.addEventListener("click", ()=>{
  openDay(currentDayNumber+1);
});

/* back to index from locked */
backToIndex.addEventListener("click", ()=>{ showJournal(); });

/* save / copy / clear notes */
saveNote.addEventListener("click", ()=> {
  const key = `journey_note_day_${currentDayNumber}`;
  localStorage.setItem(key, reflectionInput.value);
  alert("Saved locally on this device.");
  renderNotes();
});
copyNote.addEventListener("click", ()=>{
  navigator.clipboard.writeText(reflectionInput.value).then(()=> alert("Copied to clipboard."));
});
clearNote.addEventListener("click", ()=>{
  if(confirm("Clear your note for this day?")) {
    const key = `journey_note_day_${currentDayNumber}`;
    localStorage.removeItem(key);
    reflectionInput.value = "";
    renderNotes();
  }
});

/* render notes list */
function renderNotes(){
  myNotes.innerHTML = "";
  for(const d of daysData){
    const key = `journey_note_day_${d.day}`;
    const note = localStorage.getItem(key);
    if(note){
      const card = document.createElement("div");
      card.className = "note-card";
      card.innerHTML = `<div class="meta">Day ${d.day} — ${d.title}</div><div class="body">${escapeHtml(note)}</div>`;
      myNotes.appendChild(card);
    }
  }
}

/* export all */
exportAll.addEventListener("click", ()=>{
  const out = [];
  for(const d of daysData){
    const key = `journey_note_day_${d.day}`;
    const note = localStorage.getItem(key) || "";
    if(note) out.push({day:d.day,title:d.title,note});
  }
  const blob = new Blob([JSON.stringify(out,null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "journey-notes.json"; a.click();
  URL.revokeObjectURL(url);
});

/* tiny helper */
function escapeHtml(input){
  return input.replace(/[&<>"']/g, function(m){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
  });
}

/* show index or day */
function showIndex(){
  dayReader.classList.add("hidden");
  journalView.querySelector(".journal-index").classList.remove("hidden");
  renderIndexGrid();
}

/* small convenience: start at today's available day */
function jumpToToday(){
  const g = window.__GLOBAL_DAY || 0;
  const dayToOpen = Math.min(g, daysData.length) || 1;
  openDay(dayToOpen);
}

/* for demo: when user enters Journal from hero */
document.getElementById("enterJournal").addEventListener("click", ()=> {
  showJournal();
  // open today's unlocked day
  const g = window.__GLOBAL_DAY || 0;
  const showDayNumber = Math.min(Math.max(1,g), daysData.length);
  if(showDayNumber>0) openDay(showDayNumber);
});

/* shortcut after openApp: open today's entry */
document.getElementById("enterJournal").addEventListener("click", ()=> jumpToToday());

/* expose a tiny debug function (remove in production) */
window._setLaunch = function(iso){
  // change LAUNCH_DATE at runtime (for owner testing)
  window.__LAUNCH_OVERRIDE = iso;
  window.__GLOBAL_DAY = Math.max(0, daysBetween(iso));
  renderIndexGrid();
};

