const cDisplay = document.getElementById("c");

// Positionner la safe zone aléatoirement
function positionsafeZone() {
    const gameArea = document.getElementById("game-area");
    const safeZone = document.getElementById("safe-zone");

    const gameAreaRect = gameArea.getBoundingClientRect();
    const maxX = gameAreaRect.width - safeZone.offsetWidth;
    const maxY = gameAreaRect.height - safeZone.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    safeZone.style.left = `${randomX}px`;
    safeZone.style.top = `${randomY}px`;
}

// Vérifier si la souris est dans la zone sécurisée
function isMouseInsafeZone(event) {
    const safeZone = document.getElementById("safe-zone");

    const safeZoneRect = safeZone.getBoundingClientRect();
    return (
        event.clientX >= safeZoneRect.left &&
        event.clientX <= safeZoneRect.right &&
        event.clientY >= safeZoneRect.top &&
        event.clientY <= safeZoneRect.bottom
    );
}

// Initialiser le jeu
function startGameArea() {
    const gameArea = document.getElementById("game-area");
    positionsafeZone();

    let c = 3;
    cDisplay.textContent = c;

    const interval = setInterval(() => {
        c--;
        cDisplay.textContent = c;

        if (c <= 0) {
            clearInterval(interval);
            gameArea.removeEventListener("mousemove", handleMouseMove);

            if (!mouseInsafeZone) {
                clearInterval(c);
                loadNextGame();
            } else {
                clearInterval(c);
                gameWin();
            }
        }
    }, 1000);

    let mouseInsafeZone = false;

    function handleMouseMove(event) {
        mouseInsafeZone = isMouseInsafeZone(event);
    }

    gameArea.addEventListener("mousemove", handleMouseMove);
}

// Lancer le jeu au chargement de la page
setTimeout(() => {
    startGameArea();
  }, "500");