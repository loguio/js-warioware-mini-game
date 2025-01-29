const words = [
    "maison", "chat", "chien", "soleil", "lune", "ordinateur", "table", "chaise", "fenetre", "porte",
    "voiture", "jardin", "livre", "stylo", "papier", "telephone", "ecole", "travail", "temps", "pluie",
    "neige", "vent", "mer", "riviere", "montagne", "foret", "champ", "village", "ville", "pont",
    "route", "train", "avion", "bateau", "moto", "camion", "velo", "chocolat", "pomme", "banane",
    "orange", "fraise", "cerise", "poire", "raisin", "legume", "carotte", "patate", "tomate", "poivron",
    "fromage", "pain", "gâteau", "glace", "sucre", "sel", "poivre", "huile", "eau", "lait",
    "cafe", "the", "biere", "vin", "jus", "peche", "abricot", "citron", "framboise", "ananas",
    "lumiere", "ombre", "ciel", "etoile", "nuage", "arbre", "fleur", "herbe", "oiseau", "papillon",
    "insecte", "poisson", "requin", "baleine", "cheval", "vache", "mouton", "cochon", "poule", "canard"
];

let currentWord = "";
let userInput = "";
let wordsCompleted = 0;
let time = 10;
let timerInterval;
let gameActive = false;

const currentWordElement = document.getElementById("current-word").querySelector("span");
const userInputElement = document.getElementById("user-input").querySelector("span");
const timerElement = document.getElementById("timer").querySelector("span");
const scoreElement = document.getElementById("score").querySelector("span");
const endMessageElement = document.getElementById("end-message");

// Met à jour l'affichage des éléments
function updateDisplay() {
    currentWordElement.textContent = gameActive ? currentWord : "";
    userInputElement.textContent = userInput;
    timerElement.textContent = time;
    scoreElement.textContent = wordsCompleted;
}

// Réinitialise le jeu
function resetGame() {
    clearInterval(timerInterval);
    time = 10;
    userInput = "";
    wordsCompleted = 0;
    gameActive = false;
    currentWord = "";
    endMessageElement.textContent = "";
    updateDisplay();
}

// Démarre un nouveau tour
function startRound() {
    gameActive = true;
    currentWord = words[Math.floor(Math.random() * words.length)];

    // Timer
    timerInterval = setInterval(() => {
        time--;
        if (time <= 0) {
            clearInterval(timerInterval);
            endGame(false);
        }
        updateDisplay();
    }, 1000);

    updateDisplay();
}

// Termine la partie
function endGame(isWin) {
    gameActive = false;
    clearInterval(timerInterval);
    endMessageElement.textContent = isWin
        ? "Félicitations ! Vous avez gagné 🎉"
        : "Temps écoulé ! Perdu 😢";

    if (!isWin) {
        loadNextGame(); // Passe au jeu suivant si le joueur a perdu
    }
}

// Gère les entrées clavier
window.addEventListener("keydown", (e) => {
    if (!gameActive) return;

    if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
        userInput += e.key;
    } else if (e.key === "Backspace") {
        userInput = userInput.slice(0, -1);
    }

    // Vérifie si le mot est correct
    if (userInput === currentWord) {
        wordsCompleted++;
        if (wordsCompleted >= 3) {
            endGame(true);
            gameWin(); // Gagner
        } else {
            userInput = "";
            currentWord = words[Math.floor(Math.random() * words.length)];
        }
    }

    updateDisplay();
});

// Ajoute l'événement au bouton de démarrage
startRound();

// Initialise l'affichage
updateDisplay();