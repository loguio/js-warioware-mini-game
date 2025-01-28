const text = "RANDOM MINI-GAMES";
const title = document.querySelector('.main-title');

text.split("").forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter === " " ? " " : letter; 
    span.textContent = letter;
    span.style.animationDelay = `${index * 0.1}s`;
    title.appendChild(span);
});

