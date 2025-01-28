const holes = document.querySelectorAll('.hole');
let lastHole;
let gameActive = false;
let molesToHit = 3;
let molesHit = 0;

function randomHole() {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) {
        return randomHole();
    }
    lastHole = hole;
    return hole;
}

function showMoleSequentially(count) {
    if (count === 0 || !gameActive) {
        endGame();
        return;
    }

    const hole = randomHole();
    const mole = hole.querySelector('.mole');
    mole.classList.add('show');

    setTimeout(() => {
        mole.classList.remove('show');
        showMoleSequentially(count - 1);
    }, 1500); // Mole stays visible for 1.5 seconds
}

function startGame() {
    molesHit = 0;
    gameActive = true;

    // Show 3 moles
    showMoleSequentially(molesToHit);

    // End the game after 5 seconds if user hasn't hit all moles
    setTimeout(() => {
        if (gameActive) {
            endGame();
        }
    }, 5000); // Game lasts 5 seconds
}

function endGame() {
    gameActive = false;
    if (molesHit >= molesToHit) {
        alert('You win! You hit all the moles!');
    } else {
        alert('Game Over! You missed some moles.');
    }
}

holes.forEach(hole => {
    hole.addEventListener('click', () => {
        if (!gameActive) return;
        molesHit++;
    });

    const mole = hole.querySelector('.mole');
    hole.addEventListener('click', () => {
        if (!mole.classList.contains('show') || !gameActive) return;
        molesHit++;
        mole.classList.remove('show');
    });
});

// Start the game automatically
window.addEventListener('load', startGame);