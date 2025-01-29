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

const testAudio = document.createElement('audio');
testAudio.src = './audio/musique.mp3';
testAudio.loop = true;
document.body.appendChild(testAudio);

testAudio.play();


let remainingGames = [
  // Liste dynamique des jeux restants
  { name: "escape", html: "./html/escape.html", js: "escape.js" },
  { name: "tapeLeMot", html: "./html/tapeLeMot.html", js: "tapeLeMot.js" },
  { name: "sigma", html: "./html/sigma.html", js: "sigma.js" },
  { name: "cible", html: "./html/cible.html", js: "cible.js" },
  { name: "memories", html: "./html/memories.html", js: "memories.js" },
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
          "Erreur lors du chargement du jeu : " + response.statusText
        );
      }
      return response.text();
    })
    .then((html) => {
      gameContainer.innerHTML = html;
      loadScript("./js/" + game.js);
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
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML =
      "<h1>🎉 Félicitations, vous avez terminé tous les jeux !</h1>";
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

