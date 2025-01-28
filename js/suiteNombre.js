const gameContainer = document.getElementById("game-container");
const timerElement = document.getElementById("time");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const popupReplay = document.getElementById("popup-replay");

let numbers = [1, 2, 3, 4, 5, 6];
let currentNumber = 1;
let timeLeft = 10;
let timer;

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
    const x = Math.floor(Math.random() * (containerSize - squareSize));
    const y = Math.floor(Math.random() * (containerSize - squareSize));
    position = { x, y };
  } while (hasCollision(position.x, position.y, existingSquares, squareSize));
  return position;
}

function createSquares() {
  gameContainer.innerHTML = "";
  const shuffledNumbers = shuffleArray([...numbers]);
  const existingSquares = [];
  shuffledNumbers.forEach((number) => {
    const position = getRandomNonOverlappingPosition(existingSquares, 700, 100);
    existingSquares.push(position);

    const square = document.createElement("div");
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
    endGame(false, "Wrong number clicked!");
    return;
  }

  square.classList.add("hidden");
  currentNumber++;

  if (currentNumber > 6) {
    endGame(true, "You Win! 🎉");
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame(false, "Time's up!");
    }
  }, 1000);
}

function endGame(won, message) {
  clearInterval(timer);
  popupMessage.textContent = message;
  popup.style.display = "block";
}

function startGame() {
  currentNumber = 1;
  timeLeft = Math.max(5, timeLeft - 1); // Reduce time by 1 second, minimum of 5 seconds
  timerElement.textContent = timeLeft;
  popup.style.display = "none";
  createSquares();
  startTimer();
}

popupReplay.addEventListener("click", startGame);

startGame();
