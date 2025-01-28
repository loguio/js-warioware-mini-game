// Titre du jeu
const text = "RANDOM MINI-GAMES";
const title = document.querySelector('.main-title');

// Affiche le titre comme un serpent qui bouge.
text.split("").forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter === " " ? " " : letter; 
    span.textContent = letter;
    span.style.animationDelay = `${index * 0.1}s`;
    title.appendChild(span);
});

