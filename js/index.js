const text = "RANDOM MINI-GAMES";
const title = document.querySelector('.main-title');

const games = [
    { name: 'escape', html: './html/escape.html', js: 'escape.js' },
    { name: 'tapeLeMot', html: './html/tapeLeMot.html', js: 'tapeLeMot.js' },
    { name: 'sigma', html: './html/sigma.html', js: 'sigma.js' },
];

// Affiche le titre comme un serpent qui bouge.
text.split("").forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter === " " ? " " : letter; 
    span.style.animationDelay = `${index * 0.1}s`;
    title.appendChild(span);
});

function loadScript(scriptSrc) {
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.type = 'text/javascript';
    script.onload = () => {
        console.log(`Script ${scriptSrc} chargé avec succès.`);
    };
    script.onerror = () => {
        console.error(`Erreur lors du chargement du script ${scriptSrc}.`);
    };
    document.body.appendChild(script); // Ajoute le script à la page
}

function loadGame(game) {
    const gameContainer = document.getElementById('game-container');

    // Charger le fichier HTML avec fetch
    fetch(game.html)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du jeu : ' + response.statusText);
            }
            return response.text(); // Extraire le contenu du fichier HTML
        })
        .then((html) => {
            gameContainer.innerHTML = html; // Insérer le contenu dans la div
            loadScript("./js/" + game.js); // Charger le script associé au jeu
        })
        .catch((error) => {
            console.error(error);
            gameContainer.innerHTML = '<p>Impossible de charger le jeu. Veuillez réessayer.</p>';
        });
}

function launchRandomGame() {
    const randomGame = games[Math.floor(Math.random() * games.length)];
    loadGame(randomGame);
}

// Associe la fonction au bouton "DÉMARRER LE JEU"
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.main-button'); // Bouton "DÉMARRER LE JEU"
    startButton.addEventListener('click', launchRandomGame);
});
