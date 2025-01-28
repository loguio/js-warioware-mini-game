document.addEventListener('DOMContentLoaded', () => {
    const surface = document.getElementById('surface');
    const progressSpan = document.getElementById('progress');
    const timerSpan = document.getElementById('timer');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalClose = document.getElementById('modal-close');

    const GRID_SIZE = 20;
    const GAME_DURATION = 35;
    
    let isMouseDown = false;
    let cleanPixels = 0;
    let timeLeft = GAME_DURATION;
    let timerInterval;
    let isGameActive = false;
    const totalPixels = GRID_SIZE * GRID_SIZE;

    function showModal(title, message) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
        createGrid();
    }

    modalClose.addEventListener('click', hideModal);

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
            const timeSpent = GAME_DURATION - timeLeft;
            showModal(
                "🎉 Victoire ! 🎉",
                `Bravo ! Vous avez nettoyé toute la surface en ${timeSpent} secondes !`
            );
        } else {
            const percentage = Math.floor((cleanPixels / totalPixels) * 100);
            showModal(
                "⏰ Temps écoulé !",
                `Vous avez nettoyé ${percentage}% de la surface. Essayez encore !`
            );
        }
    }

    function createGrid() {
        surface.innerHTML = '';
        cleanPixels = 0;
        updateProgress();
        clearInterval(timerInterval);
        timeLeft = GAME_DURATION;
        timerSpan.textContent = `Temps restant : ${timeLeft}s`;
        
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
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

    surface.addEventListener('mousedown', () => {
        isMouseDown = true;
    });

    surface.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    surface.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    surface.addEventListener('mousemove', (e) => {
        if (isMouseDown && isGameActive) {
            const pixel = e.target;
            if (pixel.classList.contains('powerwash-pixel')) {
                cleanPixel(pixel);
            }
        }
    });

    surface.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });

    createGrid();
});