/* =========================================
   HARYFI – APPLICATION
========================================= */


/* =========================================
   NAVIGATION
========================================= */

function hideAllPages() {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });
}


function showHome() {

    hideAllPages();

    document
        .getElementById("homePage")
        .classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showLevels() {

    hideAllPages();

    document
        .getElementById("levelsPage")
        .classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function openA1() {

    hideAllPages();

    document
        .getElementById("a1Page")
        .classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   A1 – 50 LEKTIONEN
========================================= */

const a1Lessons = [

    "Alphabet & Aussprache",

    "Begrüßung & Verabschiedung",

    "Sich vorstellen",

    "Personalpronomen",

    "sein & haben",

    "Artikel: der, die, das",

    "Plural",

    "Verben im Präsens",

    "W-Fragen",

    "Ja-/Nein-Fragen",

    "Negation: nicht / kein",

    "Zahlen",

    "Uhrzeit",

    "Datum & Wochentage",

    "Monate & Jahreszeiten",

    "Familie",

    "Berufe",

    "Wohnen & Wohnung",

    "Möbel & Haushalt",

    "Essen & Trinken",

    "Einkaufen",

    "Kleidung & Farben",

    "Freizeit & Hobbys",

    "Tagesablauf",

    "Schule & Arbeit",

    "Stadt & Orte",

    "Wegbeschreibung",

    "Verkehr & Reisen",

    "Wetter",

    "Körper & Gesundheit",

    "Arzt & Apotheke",

    "Modalverben",

    "Possessivartikel",

    "Akkusativ",

    "Dativ – Grundlagen",

    "Präpositionen",

    "Trennbare Verben",

    "Imperativ",

    "Perfekt – Grundlagen",

    "Adjektive & Vergleiche",

    "Konnektoren",

    "Alltagssituationen",

    "Telefonieren & Nachrichten",

    "Termine & Verabredungen",

    "Schreiben & E-Mail",

    "Hörverstehen",

    "Leseverstehen",

    "Sprechen & Dialoge",

    "A1-Wortschatz",

    "A1-Wiederholung & Prüfungsvorbereitung"

];


/* =========================================
   CREATE LESSON LIST
========================================= */

function createLessonList() {

    const container =
        document.getElementById("lessonList");

    if (!container) return;

    container.innerHTML = "";

    a1Lessons.forEach((lesson, index) => {

        const card =
            document.createElement("div");

        card.className = "lesson-card";

        card.style.animationDelay =
            `${index * 0.025}s`;

        const number =
            document.createElement("div");

        number.className =
            "lesson-number";

        number.textContent =
            String(index + 1).padStart(2, "0");


        const name =
            document.createElement("div");

        name.className =
            "lesson-name";

        name.textContent =
            lesson;


        card.appendChild(number);

        card.appendChild(name);

        container.appendChild(card);

    });
}


/* =========================================
   CANVAS – ANIMATED GERMAN WORDS
========================================= */

const canvas =
    document.getElementById("wordCanvas");

const ctx =
    canvas.getContext("2d");


let canvasWidth = 0;
let canvasHeight = 0;


const germanWords = [

    "HALLO",
    "GUTEN MORGEN",
    "GUTEN TAG",
    "DANKE",
    "BITTE",
    "Tschüss".toUpperCase(),
    "WILLKOMMEN",
    "DEUTSCH",
    "LERNEN",
    "SPRECHEN",
    "HÖREN",
    "LESEN",
    "SCHREIBEN",
    "VERSTEHEN",
    "FRAGEN",
    "ANTWORTEN",
    "FREUND",
    "FREUNDIN",
    "FAMILIE",
    "SCHULE",
    "ARBEIT",
    "HAUS",
    "WOHNUNG",
    "STADT",
    "REISE",
    "ZUG",
    "BUS",
    "FLUGZEUG",
    "WASSER",
    "BROT",
    "KAFFEE",
    "TEE",
    "APFEL",
    "MUSIK",
    "SPORT",
    "ZEIT",
    "HEUTE",
    "MORGEN",
    "GESTERN",
    "GUT",
    "SUPER",
    "WUNDERBAR",
    "RICHTIG",
    "NEIN",
    "JA",
    "WARUM",
    "WIE",
    "WO",
    "WER",
    "WAS",
    "ICH",
    "DU",
    "WIR",
    "IHR",
    "SIE",
    "SEIN",
    "HABEN",
    "MACHEN",
    "KOMMEN",
    "GEHEN",
    "WOHNEN",
    "ARBEITEN",
    "SPIELEN",
    "JETZT",
    "LOS",
    "START",
    "ZUKUNFT"

];


/* =========================================
   RESIZE
========================================= */

function resizeCanvas() {

    const ratio =
        Math.min(window.devicePixelRatio || 1, 1.5);

    canvasWidth =
        window.innerWidth;

    canvasHeight =
        window.innerHeight;

    canvas.width =
        canvasWidth * ratio;

    canvas.height =
        canvasHeight * ratio;

    canvas.style.width =
        canvasWidth + "px";

    canvas.style.height =
        canvasHeight + "px";

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );
}


window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


/* =========================================
   WORD PARTICLE
========================================= */

class WordParticle {

    constructor() {

        this.reset(true);

    }


    reset(initial = false) {

        this.word =
            germanWords[
                Math.floor(
                    Math.random() *
                    germanWords.length
                )
            ];


        this.x =
            Math.random() *
            canvasWidth;


        this.y =
            Math.random() *
            canvasHeight;


        this.size =
            this.randomSize();


        this.speedX =
            (Math.random() - .5) *
            .75;


        this.speedY =
            (Math.random() - .5) *
            .75;


        this.rotation =
            (Math.random() - .5) *
            .4;


        this.rotationSpeed =
            (Math.random() - .5) *
            .004;


        this.opacity =
            .12 +
            Math.random() *
            .22;


        this.color =
            this.randomColor();


        if (!initial) {

            if (Math.random() > .5) {

                this.x =
                    Math.random() > .5
                        ? -150
                        : canvasWidth + 150;

            } else {

                this.y =
                    Math.random() > .5
                        ? -100
                        : canvasHeight + 100;

            }

        }

    }


    randomSize() {

        const random =
            Math.random();

        if (random < .35) {

            return 12 +
                Math.random() * 8;

        }

        if (random < .75) {

            return 20 +
                Math.random() * 12;

        }

        if (random < .95) {

            return 32 +
                Math.random() * 18;

        }

        return 52 +
            Math.random() * 25;

    }


    randomColor() {

        const colors = [

            "#ffffff",
            "#111111",
            "#7a2500",
            "#8a5200",
            "#5a005a",
            "#004d40",
            "#002b55",
            "#ffffff"

        ];

        return colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];

    }


    update() {

        this.x += this.speedX;

        this.y += this.speedY;

        this.rotation +=
            this.rotationSpeed;


        const margin = 180;


        if (
            this.x < -margin ||
            this.x > canvasWidth + margin ||
            this.y < -margin ||
            this.y > canvasHeight + margin
        ) {

            this.reset(false);

        }

    }


    draw() {

        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        ctx.rotate(
            this.rotation
        );


        ctx.font =
            `900 ${this.size}px Plus Jakarta Sans, sans-serif`;


        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";


        ctx.globalAlpha =
            this.opacity;


        ctx.fillStyle =
            this.color;


        ctx.shadowColor =
            "rgba(0,0,0,.12)";


        ctx.shadowBlur =
            8;


        ctx.fillText(
            this.word,
            0,
            0
        );


        ctx.restore();

    }

}


/* =========================================
   CREATE PARTICLES
========================================= */

let particles = [];


function createParticles() {

    particles = [];

    /*
       On limite le nombre de mots
       pour éviter que l'animation
       ralentisse sur téléphone.
    */

    const isMobile =
        window.innerWidth < 600;


    const count =
        isMobile
            ? 28
            : 45;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        particles.push(
            new WordParticle()
        );

    }

}


createParticles();


window.addEventListener(
    "resize",
    createParticles
);


/* =========================================
   CANVAS ANIMATION
========================================= */

function animateCanvas() {

    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    requestAnimationFrame(
        animateCanvas
    );

}


animateCanvas();


/* =========================================
   TOUCH / SWIPE POUR LES NIVEAUX
========================================= */

let touchStartX = 0;

let touchEndX = 0;


const levelsPage =
    document.getElementById(
        "levelsPage"
    );


if (levelsPage) {

    levelsPage.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    levelsPage.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            const difference =
                touchEndX - touchStartX;


            /*
              Swipe gauche / droite.
              Pour l'instant on anime
              simplement les cartes.
            */

            if (
                Math.abs(difference) > 60
            ) {

                document
                    .querySelectorAll(
                        ".level-card"
                    )
                    .forEach(
                        (card, index) => {

                            card.animate(

                                [
                                    {
                                        transform:
                                            "translateX(0)"
                                    },

                                    {
                                        transform:
                                            difference > 0
                                                ? "translateX(35px)"
                                                : "translateX(-35px)"
                                    },

                                    {
                                        transform:
                                            "translateX(0)"
                                    }

                                ],

                                {
                                    duration: 450,

                                    delay:
                                        index * 35,

                                    easing:
                                        "ease-out"
                                }

                            );

                        }
                    );

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================
   INITIALISATION
========================================= */

document.addEventListener(

    "DOMContentLoaded",
    () => {

        createLessonList();

        showHome();

    }
);
/* =========================================
   LEKTION 1 – DEUTSCHES ALPHABET
========================================= */

const germanAlphabet = [
    "A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U",
    "V", "W", "X", "Y", "Z"
];


/* =========================================
   AFFICHER ALPHABET
========================================= */

function createAlphabet() {

    const grid =
        document.getElementById("alphabetGrid");

    if (!grid) return;

    grid.innerHTML = "";

    germanAlphabet.forEach(letter => {

        const card =
            document.createElement("button");

        card.className =
            "letter-card";

        card.innerHTML = `
            <div class="letter">${letter}</div>
            <div class="letter-audio">
                🔊 Anhören
            </div>
        `;

        card.addEventListener(
            "click",
            () => {

                speakLetter(
                    letter,
                    card
                );

            }
        );

        grid.appendChild(card);

    });
}


/* =========================================
   AUDIO LETTRE
========================================= */

function speakLetter(letter, card) {

    if (
        !("speechSynthesis" in window)
    ) {
        alert(
            "Die Sprachausgabe wird von diesem Browser nicht unterstützt."
        );

        return;
    }


    /*
       Stoppe vorherige Aussprache
    */

    window.speechSynthesis.cancel();


    /*
       Animation
    */

    document
        .querySelectorAll(".letter-card")
        .forEach(element => {

            element.classList.remove(
                "playing"
            );

        });


    card.classList.add("playing");


    /*
       Deutsche Aussprache
    */

    const speech =
        new SpeechSynthesisUtterance(
            letter
        );

    speech.lang =
        "de-DE";

    speech.rate =
        0.65;

    speech.pitch =
        1.0;


    window.speechSynthesis.speak(
        speech
    );


    speech.onend = () => {

        card.classList.remove(
            "playing"
        );

    };/* =========================================
   LEKTION 1 – DEUTSCHES ALPHABET
========================================= */

const germanAlphabet = [
    "A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U",
    "V", "W", "X", "Y", "Z"
];


/* =========================================
   AFFICHER ALPHABET
========================================= */

function createAlphabet() {

    const grid =
        document.getElementById("alphabetGrid");

    if (!grid) return;

    grid.innerHTML = "";

    germanAlphabet.forEach(letter => {

        const card =
            document.createElement("button");

        card.className =
            "letter-card";

        card.innerHTML = `
            <div class="letter">${letter}</div>
            <div class="letter-audio">
                🔊 Anhören
            </div>
        `;

        card.addEventListener(
            "click",
            () => {

                speakLetter(
                    letter,
                    card
                );

            }
        );

        grid.appendChild(card);

    });
}


/* =========================================
   AUDIO LETTRE
========================================= */

function speakLetter(letter, card) {

    if (
        !("speechSynthesis" in window)
    ) {
        alert(
            "Die Sprachausgabe wird von diesem Browser nicht unterstützt."
        );

        return;
    }


    /*
       Stoppe vorherige Aussprache
    */

    window.speechSynthesis.cancel();


    /*
       Animation
    */

    document
        .querySelectorAll(".letter-card")
        .forEach(element => {

            element.classList.remove(
                "playing"
            );

        });


    card.classList.add("playing");


    /*
       Deutsche Aussprache
    */

    const speech =
        new SpeechSynthesisUtterance(
            letter
        );

    speech.lang =
        "de-DE";

    speech.rate =
        0.65;

    speech.pitch =
        1.0;


    window.speechSynthesis.speak(
        speech
    );


    speech.onend = () => {

        card.classList.remove(
            "playing"
        );

    };

}

}
