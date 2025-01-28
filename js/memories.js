const cards = ["pomme", "pomme", "poire", "poire", "peche", "peche"];
let shuffledCards = [];
let visibleCardIndex = null; // L'index de la carte visible
let gameActive = false; // Indique si le jeu est actif
let timer = 5;

const gameBoard = document.getElementById("game-board");
const timerDisplay = document.getElementById("timer");

// Mélanger les cartes
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Créer le plateau de jeu
function createBoard() {
    shuffledCards = shuffle([...cards]);
    gameBoard.innerHTML = "";

    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-value", card);
        cardElement.setAttribute("data-index", index);

        // Afficher les fruits au début
        cardElement.style.backgroundImage = `url('../img/${card}.jpg')`;
        cardElement.addEventListener("click", () => handleCardClick(cardElement));

        gameBoard.appendChild(cardElement);
    });
}

// Démarrer le compte à rebours
function startTimer() {
    const countdown = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;

        if (timer <= 0) {
            clearInterval(countdown);
            hideCardsAndLeaveOne(); // Cache 5 cartes et laisse une visible
            gameActive = true; // Le jeu commence
        }
    }, 1000);
}

// Cacher 5 cartes et laisser une visible
function hideCardsAndLeaveOne() {
    const cardElements = document.querySelectorAll(".card");
    const randomIndex = Math.floor(Math.random() * shuffledCards.length);
    visibleCardIndex = randomIndex;

    cardElements.forEach((card, index) => {
        if (index === randomIndex) {
            // Garder une carte visible
            card.classList.remove("hidden");
            card.style.backgroundImage = `url('../img/${shuffledCards[index]}.jpg')`;
        } else {
            // Masquer les autres cartes
            card.classList.add("hidden");
            card.style.backgroundImage = "url('../img/dos.jpg')";
        }
    });

    timerDisplay.textContent = "Find the pair!";
}

// Gérer les clics sur les cartes
function handleCardClick(cardElement) {
    if (!gameActive || !cardElement.classList.contains("hidden")) {
        return; // Ignore les clics si le jeu n'est pas actif ou si la carte est déjà visible
    }

    const clickedValue = cardElement.getAttribute("data-value");
    const visibleValue = shuffledCards[visibleCardIndex];

    // Afficher temporairement la carte cliquée
    cardElement.classList.remove("hidden");
    cardElement.style.backgroundImage = `url('../img/${clickedValue}.jpg')`;

    setTimeout(() => {
        if (clickedValue === visibleValue) {
            // Bonne paire
            alert("Victory! You found the pair!");
        } else {
            // Mauvaise paire
            alert("Defeat! Wrong card.");
        }
        gameActive = false; // Terminer le jeu après un clic
    }, 500); // Afficher la carte cliquée pendant 500ms
}

// Démarrer le jeu
createBoard();
startTimer();
