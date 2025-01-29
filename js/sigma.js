const gameArea = document.getElementById("gameArea");
const trueImage = document.getElementById("trueImage");
const falseImage = document.getElementById("falseImage");
const cDisplay = document.getElementById("c");

// Positionner les images aléatoirement dans la zone de jeu
function randomizePositions() {
    const gameRect = gameArea.getBoundingClientRect();

    // Position aléatoire de la bonne image
    const trueX = Math.floor(Math.random() * (gameRect.width - trueImage.width));
    const trueY = Math.floor(Math.random() * (gameRect.height - trueImage.height));
    trueImage.style.left = `${trueX}px`;
    trueImage.style.top = `${trueY}px`;

    // Position aléatoire de la fausse image
    const falseX = Math.floor(Math.random() * (gameRect.width - falseImage.width));
    const falseY = Math.floor(Math.random() * (gameRect.height - falseImage.height));
    falseImage.style.left = `${falseX}px`;
    falseImage.style.top = `${falseY}px`;
}

// Vérifier le clic sur la bonne image
function checkVictory(event, isTrue) {
    if (isTrue) {
        alert("Victoire ! Vous avez cliqué sur la bonne image !");
        loadNextGame(); // Passe au jeu suivant
    } else {
        alert("Défaite ! Vous avez cliqué sur la mauvaise image.");
        randomizePositions(); // Réinitialiser le jeu avec de nouvelles positions
    }
}
// Lancer le jeu au chargement de la page
randomizePositions();

// Ajouter des écouteurs d'événements pour les clics sur les images
trueImage.addEventListener("click", function(event) {
    checkVictory(event, true);
});

falseImage.addEventListener("click", function(event) {
    checkVictory(event, false);
});
