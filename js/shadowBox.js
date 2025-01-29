
const objects = document.querySelectorAll('.object');
const shadows = document.querySelectorAll('.shadow');
const drawer = document.querySelector('.drawer');
const timerShadowBoxDisplay= document.getElementById("timer-shadow-box").querySelector("span");    
let isGameOver = false;
let matchedCount = 0;
let timerShadowBox = 5; 
// Fonction pour vérifier si deux rectangles se chevauchent
function isOverlapping(rect1, rect2) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

// Fonction pour générer une position aléatoire
function getRandomPosition(element, placedShadows, excludedRect) {
    const containerRect = document.querySelector('.shadow-box');

    const bodyWidth = containerRect.clientWidth;
    const bodyHeight = containerRect.clientHeight;

    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    let randomX, randomY, newRect, isColliding;

    do {
        randomX = Math.random() * (bodyWidth- elementWidth);
        randomY = Math.random() * (bodyHeight - elementHeight);

        newRect = {
            top: randomY,
            left: randomX,
            bottom: randomY + elementHeight,
            right: randomX + elementWidth,
        };

        // Vérifie les collisions avec les ombres déjà placées et la zone du tiroir
        isColliding =
            placedShadows.some((shadowRect) => isOverlapping(newRect, shadowRect)) ||
            isOverlapping(newRect, excludedRect);
    } while (isColliding);

    return { top: randomY, left: randomX, rect: newRect };
}

// Positionner les ombres de manière aléatoire
function positionShadowsRandomly() {
    const placedShadows = [];
    const drawerRect = drawer.getBoundingClientRect();

    shadows.forEach((shadow) => {
        const { top, left, rect } = getRandomPosition(shadow, placedShadows, drawerRect);

        shadow.style.top = `${top}px`;
        shadow.style.left = `${left}px`;
        
        placedShadows.push(rect);
    });
}

function startTimer() {
    const interval = setInterval(() => {
        timerShadowBox--;
        timerShadowBoxDisplay.textContent = timerShadowBox + 's';
        if (timerShadowBox <= 0) {
            clearInterval(interval);
            clearInterval(timerShadowBox);
            isGameOver = true;
            timerShadowBoxDisplay.parentElement.textContent = "Temps écoulé !"
            loadNextGame();
        }
    }, 1000);
}

// Ajout des écouteurs pour le drag-and-drop
objects.forEach((object) => {
    object.addEventListener('dragstart', handleDragStart);
    object.addEventListener('dragend', handleDragEnd);
});

shadows.forEach((shadow) => {
    shadow.addEventListener('dragover', handleDragOver);
    shadow.addEventListener('drop', handleDrop);
});

// Fonction pour gérer le début du drag
function handleDragStart(e) {
    if (isGameOver) return;
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.style.display = 'none';
    }, 0);
}

// Fonction pour gérer la fin du drag
function handleDragEnd(e) {
    if (isGameOver) return;
    e.target.style.display = '';
}

// Fonction pour permettre le dragover
function handleDragOver(e) {
    if (isGameOver) return;
    e.preventDefault();
}

// Fonction pour gérer le drop
function handleDrop(e) {
    if (isGameOver) return;
    e.preventDefault();
    const objectId = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(objectId);

    // Vérifie si l'image correspond à l'ombre
    if (draggedElement.src === e.target.src) {
        e.target.style.filter = 'none'; 
        e.target.style.opacity = '1';
        draggedElement.remove();

        matchedCount++;

        if (matchedCount === shadows.length) {
            isGameOver = true; 
            clearInterval(timerShadowBox);
            gameWin();
        }
    } else {
        isGameOver = true; 
        clearInterval(timerShadowBox);
        loadNextGame();
    }
}

positionShadowsRandomly();
setTimeout(() => {
    startTimer();
}, "500");
