let container = document.querySelector('.container');
let scoreContainer = document.querySelector('.score');
let timeContainer = document.querySelector('.time');

document.addEventListener("DOMContentLoaded", function () {
    startGame();
});

function startGame() {
    let score = 0;
    let time = 10; // Temps de départ
    container.innerHTML = "";

    // Intervalle rapide pour spawner les cibles (200ms)
    let interval = setInterval(function showTarget() {
        let target = document.createElement('img');
        target.id = "target";
        target.src = "../img/cible.png";
        container.appendChild(target);

        // Positionnement aléatoire
        target.style.top = Math.random() * (500 - target.offsetHeight) + 'px';
        target.style.left = Math.random() * (600 - target.offsetWidth) + 'px';

        // Retirer automatiquement la cible après 2 secondes
        setTimeout(function () {
            target.remove();
        }, 2000);

        // Si le joueur clique sur la cible
        target.onclick = function () {
            score += 1;
            target.style.display = 'none'; // Masquer immédiatement
        };

        // Mettre à jour le score et le temps
        scoreContainer.innerHTML = `Score : ${score}`;
        timeContainer.innerHTML = `Temps : ${time}`;

        // Conditions d'arrêt du jeu
        if (score >= 6) { // Fin si le score atteint 6
            clearInterval(interval);
            container.innerHTML = "Bravo, vous avez gagné ! 🎯";
        } else if (time <= 0) { // Fin si le temps s'écoule
            clearInterval(interval);
            container.innerHTML = "Le jeu est terminé t'as raté t'es trop guez héhéhé HA";
        }
    }, 200); // Réduit le délai entre les spawns à 200ms

    // Timer pour décrémenter le temps restant
    let timer = setInterval(function () {
        time -= 1;
        timeContainer.innerHTML = `Temps : ${time}`;
        if (time <= 0) {
            clearInterval(timer);
        }
    }, 1000);
}
