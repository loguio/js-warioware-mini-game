function displayFinalScore() {
    const scoreElement = document.getElementById("final-score");
    if (scoreElement) {
        scoreElement.textContent = `Votre score : ${getScore()}`;
    }
}

function displayHighScore() {
    const highScoreElement = document.getElementById("high-score");
    if (highScoreElement) {
        highScoreElement.textContent = `Votre meilleur score : ${getHighScore()}`;
    }
}

function highScore() {
    let currentScore = getScore();
    let highScore = getHighScore();
    if (currentScore > highScore) {
        setHighScore(currentScore);
    }
}

highScore();
displayFinalScore();
displayHighScore();
resetScore();