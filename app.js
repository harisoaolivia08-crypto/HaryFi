/* =========================================
   HARYFI – APPLICATION
========================================= */

function switchPage(pageId, pushHash = true) {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add("active");
    if (pushHash) {
        const hash = pageId.replace("Page", "");
        if (hash === "home") history.pushState("", document.title, window.location.pathname + window.location.search);
        else window.location.hash = hash;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
}
function showHome() { switchPage("homePage"); }
function showLevels() { switchPage("levelsPage"); }
function openA1() { switchPage("a1Page"); }
function openAlphabet() { window.location.href = "lektion1.html"; }
function openLektion2() { window.location.href = "lektion2.html"; }

const a1Lessons = [
    "Alphabet & Aussprache", "Begrüßung & Verabschiedung", "Sich vorstellen", "Personalpronomen", "sein & haben", "Artikel: der, die, das", "Plural", "Verben im Präsens", "W-Fragen", "Reflexive Verben", "Negation: nicht / kein", "Zahlen", "Uhrzeit", "Datum & Wochentage", "Monate & Jahreszeiten", "Familie", "Berufe", "Wohnen & Wohnung", "Möbel & Haushalt", "Essen & Trinken", "Einkaufen", "Kleidung & Farben", "Freizeit & Hobbys", "Tagesablauf", "Schule & Arbeit", "Stadt & Orte", "Wegbeschreibung", "Verkehr & Reisen", "Wetter", "Körper & Gesundheit", "Arzt & Apotheke", "Modalverben", "Possessivartikel", "Akkusativ", "Dativ – Grundlagen", "Präpositionen", "Trennbare Verben", "Imperativ", "Perfekt – Grundlagen", "Adjektive & Vergleiche", "Konnektoren", "Alltagssituationen", "Telefonieren & Nachrichten", "Termine & Verabredungen", "Schreiben & E-Mail", "Hörverstehen", "Leseverstehen", "Sprechen & Dialoge", "A1-Wortschatz", "A1-Wiederholung & Prüfungsvorbereitung"
];

function createLessonList() {
    const container = document.getElementById("lessonList");
    if (!container) return;
    container.innerHTML = "";
    a1Lessons.forEach((lesson, index) => {
        const card = document.createElement("div");
        card.className = "lesson-card";
        card.style.animationDelay = `${index * 0.025}s`;
        const number = document.createElement("div"); number.className = "lesson-number"; number.textContent = String(index + 1).padStart(2, "0");
        const name = document.createElement("div"); name.className = "lesson-name"; name.textContent = lesson;
        card.append(number, name);
        if (index === 0) { card.dataset.href = "lektion1.html"; card.addEventListener("click", openAlphabet); }
        else if (index === 1) { card.dataset.href = "lektion2.html"; card.addEventListener("click", openLektion2); }
        else card.dataset.href = `lektion${index + 1}.html`;
        container.appendChild(card);
    });
}

const germanAlphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
function createAlphabet() {
    const grid = document.getElementById("alphabetGrid"); if (!grid) return;
    grid.innerHTML = "";
    germanAlphabet.forEach(letter => { const card = document.createElement("button"); card.className = "letter-card"; card.innerHTML = `<div class="letter">${letter}</div><div class="letter-audio">🔊 Anhören</div>`; card.addEventListener("click", () => speakLetter(letter, card)); grid.appendChild(card); });
}
function speakLetter(letter, card) {
    if (!("speechSynthesis" in window)) { alert("Die Sprachausgabe wird von diesem Browser nicht unterstützt."); return; }
    window.speechSynthesis.cancel(); document.querySelectorAll(".letter-card").forEach(element => element.classList.remove("playing")); card.classList.add("playing");
    const speech = new SpeechSynthesisUtterance(letter); speech.lang = "de-DE"; speech.rate = .65; speech.pitch = 1; window.speechSynthesis.speak(speech); speech.onend = () => card.classList.remove("playing");
}

document.addEventListener("DOMContentLoaded", () => { createLessonList(); createAlphabet(); });
