console.log("Script powerwash.js chargé, en attente des éléments du jeu...");

function waitForGameElements() {
    const surface = document.getElementById('surface');
    const progressSpan = document.getElementById('progress');
    const timerSpan = document.getElementById('timer');

    if (!surface || !progressSpan || !timerSpan) {
        console.warn("⏳ Éléments du jeu introuvables, nouvelle tentative...");
        setTimeout(waitForGameElements, 100);
        return;
    }

    console.log("✅ Éléments du jeu trouvés, démarrage du jeu !");
    startPowerwashGame(surface, progressSpan, timerSpan);
}

function startPowerwashGame(surface, progressSpan, timerSpan) {
    const GRID_SIZE = 20;
    const GAME_DURATION = 35;

    let isMouseDown = false;
    let cleanPixels = 0;
    let timeLeft = GAME_DURATION;
    let timerInterval;
    let isGameActive = false;
    const totalPixels = GRID_SIZE * GRID_SIZE;

    function startTimer() {
        timeLeft = GAME_DURATION;
        isGameActive = true;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerSpan.textContent = `Temps restant : ${timeLeft}s`;

            if (timeLeft <= 0) {
                endGame(false);
            }
        }, 1000);
    }

    function endGame(isVictory) {
        clearInterval(timerInterval);
        isGameActive = false;

        if (isVictory) {
            loadNextGame();
        }
    }

    function createGrid() {
        surface.innerHTML = '';
        cleanPixels = 0;
        updateProgress();
        clearInterval(timerInterval);
        timeLeft = GAME_DURATION;
        timerSpan.textContent = `Temps restant : ${timeLeft}s`;

        for (let i = 0; i < totalPixels; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'powerwash-pixel';

            pixel.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (isGameActive) cleanPixel(pixel);
            });

            pixel.addEventListener('touchmove', (e) => {
                e.preventDefault();
                if (isGameActive) {
                    const touch = e.touches[0];
                    const element = document.elementFromPoint(touch.clientX, touch.clientY);
                    if (element && element.classList.contains('powerwash-pixel')) {
                        cleanPixel(element);
                    }
                }
            });

            surface.appendChild(pixel);
        }

        startTimer();
    }

    function cleanPixel(pixel) {
        if (!pixel.classList.contains('powerwash-pixel-clean') && isGameActive) {
            pixel.classList.add('powerwash-pixel-clean');
            cleanPixels++;
            updateProgress();

            if (cleanPixels === totalPixels) {
                endGame(true);
            }
        }
    }

    function updateProgress() {
        const percentage = Math.floor((cleanPixels / totalPixels) * 100);
        progressSpan.textContent = `Surface nettoyée : ${percentage}%`;
    }

    surface.addEventListener('mousedown', () => isMouseDown = true);
    surface.addEventListener('mouseup', () => isMouseDown = false);
    surface.addEventListener('mouseleave', () => isMouseDown = false);

    surface.addEventListener('mousemove', (e) => {
        if (isMouseDown && isGameActive) {
            const pixel = e.target;
            if (pixel.classList.contains('powerwash-pixel')) {
                cleanPixel(pixel);
            }
        }
    });

    surface.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

    createGrid();
}

waitForGameElements();