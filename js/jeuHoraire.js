// Variables pour les horloges
const adjustableClock = document.getElementById("adjustable-clock");
const adjustableHourHand = document.getElementById("adjustable-hour");
const adjustableMinuteHand = document.getElementById("adjustable-minute");

const fixedClock = document.getElementById("fixed-clock");
const fixedHourHand = document.getElementById("fixed-hour");
const fixedMinuteHand = document.getElementById("fixed-minute");
const result = document.getElementById("result");
const timerDisplay = document.getElementById("timer");

// Variables pour les angles de l'horloge fixe
const fixedHourAngle = Math.floor(Math.random() * 12) * 30;
const fixedMinuteAngle = Math.floor(Math.random() * 60) * 6;

// Variables pour la gestion du drag et du timer
let isDragging = false;
let hourAngle = 0;
let minuteAngle = 0;
let timer = 10;
let timerInterval;
let validationTimeout;
let isValid = false;

function getAngleFromCoordinates(x, y, centerX, centerY) {
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    return (angle + 360) % 360;
}

function startDrag(event) {
    if (!isValid) {
        isDragging = true;
    }
}

function stopDrag() {
    isDragging = false;
}

function onDrag(event) {
    if (!isDragging) return;

    const rect = adjustableClock.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = event.clientX || event.touches?.[0]?.clientX;
    const y = event.clientY || event.touches?.[0]?.clientY;

    if (x !== undefined && y !== undefined) {
        hourAngle = getAngleFromCoordinates(x, y, centerX, centerY);
        minuteAngle = (hourAngle % 30) * 2 * 6;

        updateClock(adjustableHourHand, adjustableMinuteHand, {
            hour: Math.floor(hourAngle / 30),
            minute: Math.floor(minuteAngle / 6),
        });

        checkIfCorrect();
    }
}

function updateClock(hourHand, minuteHand, time) {
    const hourDeg = (time.hour % 12) * 30 + (time.minute / 60) * 30;
    const minuteDeg = time.minute * 6;

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
}

function checkIfCorrect() {
    const correctHour = fixedHourAngle / 30;
    const correctMinute = fixedMinuteAngle / 6;
    const marginOfError = 30;

    const isHourCorrect = Math.floor(hourAngle / 30) === correctHour;
    const isMinuteCorrect = Math.abs(minuteAngle - fixedMinuteAngle) <= marginOfError;

    if (isHourCorrect && isMinuteCorrect) {
        if (!validationTimeout && !isValid) {
            validationTimeout = setTimeout(() => {
                stopTimer();
                result.textContent = "Heure validée ! Vous avez gagné !";
                isValid = true;
                disableDrag();
                gameWin(); // Appel de gameWin() en cas de victoire
            }, 1000);
        }
    } else {
        if (validationTimeout) {
            clearTimeout(validationTimeout);
            validationTimeout = null;
        }
    }
}

function startTimer() {
    timer = 10;
    timerDisplay.textContent = `Temps restant : ${timer}s`;
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            timerDisplay.textContent = `Temps restant : ${timer}s`;
        } else {
            clearInterval(timerInterval);
            result.textContent = "Temps écoulé. Vous avez perdu !";
            disableDrag();
            loadNextGame(); // Appel de loadNextGame() en cas de défaite par timeout
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function disableDrag() {
    isDragging = false;
    document.removeEventListener("mousedown", startDrag);
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchstart", startDrag);
    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("touchend", stopDrag);
}

// Initialisation
updateClock(fixedHourHand, fixedMinuteHand, {
    hour: fixedHourAngle / 30,
    minute: fixedMinuteAngle / 6,
});

document.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", onDrag);
document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchstart", startDrag);
document.addEventListener("touchmove", onDrag);
document.addEventListener("touchend", stopDrag);

startTimer();