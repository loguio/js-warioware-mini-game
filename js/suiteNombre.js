
// Vérification régulière que les éléments du DOM sont bien présents
function waitForGameElements() {
  let gameContainer = document.getElementById("game-container");
  let timerElement = document.getElementById("time");

  if (!gameContainer || !timerElement) {
    setTimeout(waitForGameElements, 100);
    return;
  }

  startNumbersGame(gameContainer, timerElement);
}

// Fonction principale du jeu Numbers
function startNumbersGame(gameContainer, timerElement) {
  let numbers = [1, 2, 3, 4, 5, 6];
  let currentNumber = 1;
  let timeLeft = 10;

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function hasCollision(x, y, squares, squareSize) {
    return squares.some((square) => {
      const deltaX = Math.abs(square.x - x);
      const deltaY = Math.abs(square.y - y);
      return deltaX < squareSize && deltaY < squareSize;
    });
  }

  function getRandomNonOverlappingPosition(
    existingSquares,
    containerSize,
    squareSize
  ) {
    let position;
    do {
      let x = Math.floor(Math.random() * (containerSize - squareSize));
      let y = Math.floor(Math.random() * (containerSize - squareSize));
      position = { x, y };
    } while (hasCollision(position.x, position.y, existingSquares, squareSize));
    return position;
  }

  function createSquares() {
    gameContainer.innerHTML = "";
    let shuffledNumbers = shuffleArray([...numbers]);
    let existingSquares = [];

    shuffledNumbers.forEach((number) => {
      let position = getRandomNonOverlappingPosition(existingSquares, 700, 100);
      existingSquares.push(position);

      let square = document.createElement("div");
      square.classList.add("square");
      square.textContent = number;
      square.style.left = `${position.x}px`;
      square.style.top = `${position.y}px`;
      square.addEventListener("click", () => handleSquareClick(number, square));
      gameContainer.appendChild(square);
    });
  }

  function handleSquareClick(number, square) {
    if (number !== currentNumber) {
      endGame(false);
      return;
    }

    square.classList.add("hidden");
    currentNumber++;

    if (currentNumber > 6) {
      endGame(true);
    }
  }

  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;

      if (timeLeft <= 0) {
        endGame(false);
      }
    }, 1000);
  }

  function endGame(won) {
    if (won) {
      clearInterval(timer);
      clearInterval(timeLeft);
      gameWin(); // Appel de la fonction gameWin() si le joueur a gagné
    } else {
      clearInterval(timer);
      clearInterval(timeLeft);
      loadNextGame(); // Sinon, charger le prochain jeu
    }
  }

  function startGame() {
    currentNumber = 1;
    timeLeft = 10;
    timerElement.textContent = timeLeft;
    createSquares();
    startTimer();
  }

  startGame();
}

// Démarrer la vérification des éléments du jeu
waitForGameElements();
