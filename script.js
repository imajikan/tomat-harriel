const button = document.getElementById("targetBtn");
const splatSound = document.getElementById("splatSound");

const totalCountEl = document.getElementById("totalCount");
const dailyCountEl = document.getElementById("dailyCount");

let totalClicks = Number(localStorage.getItem("totalClicks")) || 0;
let dailyClicks = Number(localStorage.getItem("dailyClicks")) || 0;

const today = new Date().toLocaleDateString();
const savedDate = localStorage.getItem("savedDate");

/* RESET DAILY */

if(savedDate !== today){
    dailyClicks = 0;
    localStorage.setItem("savedDate", today);
}

/* UPDATE UI */

function updateCounter(){
    totalCountEl.textContent = totalClicks;
    dailyCountEl.textContent = dailyClicks;
}

updateCounter();

/* RANDOM START POSITION */

function getRandomStartPosition(){

    const side = Math.floor(Math.random() * 4);

    switch(side){

        case 0:
            return {
                x: -150,
                y: Math.random() * window.innerHeight
            };

        case 1:
            return {
                x: window.innerWidth + 150,
                y: Math.random() * window.innerHeight
            };

        case 2:
            return {
                x: Math.random() * window.innerWidth,
                y: -150
            };

        default:
            return {
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 150
            };
    }
}

/* CLICK EVENT */

button.addEventListener("click", () => {

    totalClicks++;
    dailyClicks++;

    localStorage.setItem("totalClicks", totalClicks);
    localStorage.setItem("dailyClicks", dailyClicks);

    updateCounter();

    const rect = button.getBoundingClientRect();

    const targetX = rect.left + Math.random() * rect.width;
    const targetY = rect.top + Math.random() * rect.height;

    const start = getRandomStartPosition();

    const tomato = document.createElement("div");

    tomato.className = "tomato";
    const THROW_ITEMS = [
    "🍅"
];
    tomato.innerHTML =
    THROW_ITEMS[
        Math.floor(Math.random() * THROW_ITEMS.length)
    ];

    tomato.style.fontSize =
        `${50 + Math.random() * 40}px`;

    tomato.style.left = `${start.x}px`;
    tomato.style.top = `${start.y}px`;

    document.body.appendChild(tomato);

    requestAnimationFrame(() => {

        tomato.style.left = `${targetX}px`;
        tomato.style.top = `${targetY}px`;

        tomato.style.transform =
            `rotate(${360 + Math.random() * 1080}deg)`;
    });

    setTimeout(() => {

        tomato.remove();

        splatSound.currentTime = 0;
        splatSound.play();

        createSplash(targetX, targetY);

    }, 800);
});

/* SPLASH EFFECT */

function createSplash(x, y){

    const splash = document.createElement("div");

    splash.className = "splash";

    const splats = [
        "💥",
        "🩸",
        "💢"
    ];

    splash.innerHTML =
        splats[Math.floor(Math.random() * splats.length)];

    splash.style.left = `${x - 40}px`;
    splash.style.top = `${y - 40}px`;

    document.body.appendChild(splash);

    setTimeout(() => {
        splash.remove();
    }, 700);
}
