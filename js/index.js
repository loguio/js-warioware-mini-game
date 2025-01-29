window.addEventListener('load', () => {
  const title = document.querySelector('.main-title');
  setTimeout(() => {
    title.style.animation = 'dropInBounce 2s ease-out forwards, snakeEffect 2s ease-in-out infinite';
  }, 500);
});

function loadSettings() {
  const gameContainer = document.querySelector('.game-container');
  const settingsContainer = document.querySelector('.settings-container');

  gameContainer.style.display = 'none';
  settingsContainer.style.display = 'flex';
}


const volumeSlider = document.getElementById('volume');
const soundToggle = document.getElementById('sound-toggle');

let isSoundOn = true;
let currentVolume = 50;

volumeSlider.addEventListener('input', (e) => {
    currentVolume = e.target.value;
    console.log(`Volume set to: ${currentVolume}%`);

    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
    audio.volume = currentVolume / 100;
    });
});

soundToggle.addEventListener('change', (e) => {
    isSoundOn = e.target.checked;
    console.log(`Sound is ${isSoundOn ? 'ON' : 'OFF'}`);

    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
    audio.muted = !isSoundOn;
    });
});


let remainingGames = [
  // Liste dynamique des jeux restants
  { name: "escape", html: "./html/escape.html", js: "escape.js" },
  { name: "tapeLeMot", html: "./html/tapeLeMot.html", js: "tapeLeMot.js" },
  { name: "sigma", html: "./html/sigma.html", js: "sigma.js" },
  { name: "cible", html: "./html/cible.html", js: "cible.js" },
  { name: "memories", html: "./html/memories.html", js: "memories.js" },
  { name: "jeuHoraire", html: "./html/jeuHoraire.html", js: "jeuHoraire.js" },
  { name: "powerwash", html: "./html/powerwash.html", js: "powerwash.js" },
  { name: "shadowBox", html: "./html/shadowBox.html", js: "shadowBox.js" },
  {
    name: "suiteNombre",
    html: "./html/suiteNombre.html",
    js: "suiteNombre.js",
  },
];


function loadScript(scriptSrc) {
  const script = document.createElement("script");
  script.src = scriptSrc;
  script.type = "text/javascript";
  script.onload = () => {
    console.log(`Script ${scriptSrc} chargé avec succès.`);
  };
  script.onerror = () => {
    console.error(`Erreur lors du chargement du script ${scriptSrc}.`);
  };
  document.body.appendChild(script);
}

function loadGame(game) {
  const gameContainer = document.getElementById("game-container");

  fetch(game.html)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Erreur lors du chargement du jeu : " + response.statusText
        );
      }
      return response.text();
    })
    .then((html) => {
      gameContainer.innerHTML = html; // Injection du jeu

      // Supprimer tout script existant pour éviter les doublons
      const oldScript = document.getElementById("game-script");
      if (oldScript) {
        oldScript.remove();
      }

      // Charger dynamiquement le script du jeu après l’injection du HTML
      const script = document.createElement("script");
      script.src = "./js/" + game.js;
      script.id = "game-script";
      script.type = "text/javascript";
      script.onload = () =>
        console.log(`Script ${game.js} chargé avec succès.`);
      script.onerror = () =>
        console.error(`Erreur lors du chargement du script ${game.js}.`);

      document.body.appendChild(script); // Ajouter le script au DOM
    })
    .catch((error) => {
      console.error(error);
      gameContainer.innerHTML =
        "<p>Impossible de charger le jeu. Veuillez réessayer.</p>";
    });
}

function loadNextGame() {
  if (remainingGames.length > 0) {
    // Sélectionner un jeu aléatoire parmi les jeux restants
    const randomIndex = Math.floor(Math.random() * remainingGames.length);
    const nextGame = remainingGames.splice(randomIndex, 1)[0]; // Retirer le jeu sélectionné
    loadGame(nextGame);
  } else {
    // Faire appel a la page de fin

    (game = {
      name: "gameOver",
      html: "./html/gameOver.html",
      js: "gameOver.js",
    }),
      loadGame(game);
  }
}

function launchRandomGame() {
  // Charger un jeu aléatoire au début
  const randomIndex = Math.floor(Math.random() * remainingGames.length);
  const initialGame = remainingGames.splice(randomIndex, 1)[0]; // Retirer le jeu initial
  loadGame(initialGame);
}

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector(".main-button");
  startButton.addEventListener("click", launchRandomGame);
});


// Sytème de point
function getScore() {
  return parseInt(localStorage.getItem("currentScore")) || 0;
}

function getHighScore() {
  return parseInt(localStorage.getItem("highScore")) || 0;
}

function setScore(score) {
  localStorage.setItem("currentScore", score);
}

function setHighScore(score) {
  localStorage.setItem("highScore", score);
}

function resetScore() {
  currentScore = localStorage.getItem("currentScore");
  highScore = parseInt(localStorage.getItem("highScore")) || 0;
  localStorage.setItem("currentScore", 0);
}

function addPoint() {
  let score = getScore();
  score += 1;
  setScore(score);
}

// Lorsqu'on gagne un jeu
function gameWin() {
  addPoint(); // Ajouter 1 point
  loadNextGame(); // Charger le jeu suivant
}
