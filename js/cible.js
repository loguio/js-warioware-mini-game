
// Vérification régulière que les éléments du DOM sont bien présents
function waitForGameElements() {
    let container = document.querySelector('.container');
    let scoreContainer = document.querySelector('.score');
    let timeContainer = document.querySelector('.time');

    if (!container  || !scoreContainer || !timeContainer) {
        setTimeout(waitForGameElements, 100);
        return;
    }

    startCibleGame(container, scoreContainer, timeContainer);
}

// Fonction qui gère le jeu et l'activation du bouton Start
function startCibleGame(container, scoreContainer, timeContainer) {
    let score = 0;
    let time = 10;
    let interval = null;
    let timer = null;

    function startGame() {
        // Réinitialisation des valeurs
        score = 0;
        time = 10;
        scoreContainer.innerHTML = `Score : ${score}`;
        timeContainer.innerHTML = `Temps : ${time}`;
        container.innerHTML = "";

        // Nettoyage des timers si jamais ils étaient encore actifs
        if (interval) clearInterval(interval);
        if (timer) clearInterval(timer);

        // Spawn des cibles
        interval = setInterval(() => {
            let target = document.createElement('img');
            target.id = "target";
            target.src = "./img/cible.png";
            target.style.position = "absolute";
            target.style.top = Math.random() * (500 - 50) + 'px';
            target.style.left = Math.random() * (600 - 50) + 'px';
            container.appendChild(target);

            setTimeout(() => target.remove(), 2000);

            target.onclick = function () {
                score += 1;
                target.style.display = 'none';
                scoreContainer.innerHTML = `Score : ${score}`;
            };

            timeContainer.innerHTML = `Temps : ${time}`;

            if (score >= 6) {
                clearInterval(interval);
                clearInterval(timer);
                gameWin();
            } else if (time <= 0) {
                clearInterval(interval);
                loadNextGame();
            }
        }, 200);

        // Gestion du temps
        timer = setInterval(() => {
            time -= 1;
            timeContainer.innerHTML = `Temps : ${time}`;
            if (time <= 0) {
                clearInterval(timer);
            }
        }, 1000);
    }

    // Ajout du listener au bouton Start (évite de l'ajouter plusieurs fois)
    startGame()
}

// Démarrer la vérification des éléments du jeu
waitForGameElements();
