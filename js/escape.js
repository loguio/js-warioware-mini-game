const ga = document.getElementById("ga");
        const sz = document.getElementById("sz");
        const cDisplay = document.getElementById("c");

        // Positionner la safe zone aléatoirement
        function positionsz() {
            const gaRect = ga.getBoundingClientRect();
            const maxX = gaRect.width - sz.offsetWidth;
            const maxY = gaRect.height - sz.offsetHeight;

            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);

            sz.style.left = `${randomX}px`;
            sz.style.top = `${randomY}px`;
        }

        // Vérifier si la souris est dans la zone sécurisée
        function isMouseInsz(event) {
            const szRect = sz.getBoundingClientRect();
            return (
                event.clientX >= szRect.left &&
                event.clientX <= szRect.right &&
                event.clientY >= szRect.top &&
                event.clientY <= szRect.bottom
            );
        }

        // Initialiser le jeu
        function startGame() {
            positionsz();

            let c = 2;
            cDisplay.textContent = c;

            const interval = setInterval(() => {
                c--;
                cDisplay.textContent = c;

                if (c <= 0) {
                    clearInterval(interval);
                    ga.removeEventListener("mousemove", handleMouseMove);

                    if (!mouseInsz) {
                        alert("Défaite");
                    } else {
                        alert("Victoire");
                    }
                }
            }, 1000);

            let mouseInsz = false;

            function handleMouseMove(event) {
                mouseInsz = isMouseInsz(event);
            }

            ga.addEventListener("mousemove", handleMouseMove);
        }

        // Lancer le jeu au chargement de la page
        startGame();