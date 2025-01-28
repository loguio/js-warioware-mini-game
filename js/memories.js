const cards = ["pomme", "pomme", "poire", "poire", "peche", "peche"];
let shuffledCards = [];
let initialTimer = 5;
let revealTimer = 10;
let selectedCard = null;

const gameBoard = document.getElementById("game-board");
const initialTimerDisplay = document.getElementById("initial-timer");
const messageDisplay = document.getElementById("message");

// Shuffle cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffledCards = shuffle([...cards]);
    gameBoard.innerHTML = "";

    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card", "hidden");
        cardElement.setAttribute("data-value", card);
        cardElement.setAttribute("data-index", index);
        cardElement.innerText = "";

        cardElement.style.backgroundImage = `url('../img/${card}.jpg')`;
        cardElement.style.backgroundSize = "cover";
        cardElement.addEventListener("click", () => handleCardClick(cardElement));
        gameBoard.appendChild(cardElement);
    });
}

function startInitialTimer() {
    const timer = setInterval(() => {
        initialTimer--;
        initialTimerDisplay.textContent = initialTimer;

        if (initialTimer <= 0) {
            clearInterval(timer);
            hideCardsExceptOne();
            startRevealTimer();
        }
    }, 1000);
}

function hideCardsExceptOne() {
    const cardElements = document.querySelectorAll(".card");
    const randomIndex = Math.floor(Math.random() * shuffledCards.length);

    cardElements.forEach((card, index) => {
        if (index !== randomIndex) {
            card.classList.add("hidden");
            card.style.backgroundImage = "url('../img/dos.jpg')";
        } else {
            card.classList.remove("hidden");
            card.style.backgroundImage = `url('../img/${shuffledCards[index]}.jpg')`;
        }
    });
}

function startRevealTimer() {
    let timer = revealTimer;
    const revealCountdown = setInterval(() => {
        timer--;
        initialTimerDisplay.textContent = `Find the pair: ${timer}`;

        if (timer <= 0) {
            clearInterval(revealCountdown);
            displayMessage("Defeat! Time's up!");
        }
    }, 1000);
}

function handleCardClick(cardElement) {
    if (!selectedCard) {
        selectedCard = cardElement;
        cardElement.classList.remove("hidden");
    } else {
        if (selectedCard.getAttribute("data-value") === cardElement.getAttribute("data-value")) {
            displayMessage("Victory! You found the pair!");
        } else {
            displayMessage("Defeat! Wrong pair.");
        }
    }
}

function displayMessage(message) {
    messageDisplay.textContent = message;
}

// Start game
createBoard();
startInitialTimer();