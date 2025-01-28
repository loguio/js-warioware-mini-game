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
const fixedHourAngle = Math.floor(Math.random() * 12) * 30; // Angle aléatoire
const fixedMinuteAngle = 0;

// Variables pour la gestion du drag et du timer
let isDragging = false;
let hourAngle = 0;
let minuteAngle = 0;
let timer = 10;
let timerInterval;
let validationTimeout;
let isValid = false;  // Variable pour suivre si l'heure est validée

// Fonction pour calculer l'angle à partir des coordonnées de la souris ou du toucher
function getAngleFromCoordinates(x, y, centerX, centerY) {
  const deltaX = x - centerX;
  const deltaY = y - centerY;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // En degrés
  return (angle + 360) % 360; // S'assurer que l'angle est positif
}

// Fonction pour démarrer le drag
function startDrag(event) {
  if (!isValid) {  // Ne permet pas de draguer si la réponse est valide ou le timer écoulé
    isDragging = true;
  }
}

// Fonction pour arrêter le drag
function stopDrag() {
  isDragging = false;
}

// Fonction pour gérer le déplacement de la souris ou du toucher
function onDrag(event) {
  if (!isDragging) return;

  const rect = adjustableClock.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Détection des coordonnées du curseur (souris ou tactile)
  const x = event.clientX || event.touches?.[0]?.clientX;
  const y = event.clientY || event.touches?.[0]?.clientY;

  if (x !== undefined && y !== undefined) {
    hourAngle = getAngleFromCoordinates(x, y, centerX, centerY);
    updateClock(adjustableHourHand, adjustableMinuteHand, {
      hour: Math.floor(hourAngle / 30), // Chaque 30° correspond à une heure
      minute: Math.floor((hourAngle % 30) * 2),
    });
    checkIfCorrect();
  }
}

// Fonction pour mettre à jour les aiguilles
function updateClock(hourHand, minuteHand, time) {
  const hourDeg = (time.hour % 12) * 30 + (time.minute / 60) * 30;
  const minuteDeg = time.minute * 6;

  hourHand.style.transform = `rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
}

// Fonction pour vérifier si l'heure est correcte
function checkIfCorrect() {
    const correctHour = fixedHourAngle / 30;
    const correctMinute = fixedMinuteAngle / 6;
  
    // Marge d'erreur de 5 minutes (30°) pour les minutes
    const marginOfError = 30; // 30° = 5 minutes

    // Vérification des heures et des minutes avec une tolérance pour les minutes
    const isHourCorrect = Math.floor(hourAngle / 30) === correctHour;
    const isMinuteCorrect = Math.abs(minuteAngle - correctMinute) <= marginOfError;

    if (isHourCorrect && isMinuteCorrect) {
        // Si l'heure et les minutes sont correctes avec la marge d'erreur, activer le timer de 1 seconde pour vérifier
        if (!validationTimeout && !isValid) {
            validationTimeout = setTimeout(() => {
                stopTimer(); // Arrêter le timer
                result.textContent = "Heure validée ! Vous avez gagné !";
                isValid = true;  // L'heure est maintenant validée
                disableDrag();  // Désactiver le drag
            }, 1000);
        }
    } else {
        // Annuler le timeout si l'heure ou les minutes sont modifiées
        if (validationTimeout) {
            clearTimeout(validationTimeout);
            validationTimeout = null;
        }
    }
}


// Fonction pour démarrer le timer
function startTimer() {
  timer = 10; // Réinitialiser le timer à 10 secondes
  timerDisplay.textContent = `Temps restant : ${timer}s`;
  timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      timerDisplay.textContent = `Temps restant : ${timer}s`;
    } else {
      clearInterval(timerInterval);
      result.textContent = "Temps écoulé. Vous avez perdu !";
      disableDrag();  // Désactiver le drag si le temps est écoulé
    }
  }, 1000);
}

// Fonction pour arrêter le timer
function stopTimer() {
    clearInterval(timerInterval);
    if (isValid) {
      result.textContent = "Temps écoulé. Vous avez perdu !";
    }
  }
  

// Fonction pour désactiver le drag
function disableDrag() {
  isDragging = false;
  document.removeEventListener("mousedown", startDrag);
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchstart", startDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", stopDrag);
}

// Initialisation de l'horloge fixe
updateClock(fixedHourHand, fixedMinuteHand, {
  hour: fixedHourAngle / 30,
  minute: fixedMinuteAngle / 6,
});

// Ajouter les événements de drag
document.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", onDrag);
document.addEventListener("mouseup", stopDrag);

document.addEventListener("touchstart", startDrag);
document.addEventListener("touchmove", onDrag);
document.addEventListener("touchend", stopDrag);

// Démarrer le timer dès que la page est prête
startTimer();
