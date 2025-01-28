const endpoints = document.querySelectorAll('.endpoint');
const svg = document.querySelector('.wires-svg');
const countdownElement = document.getElementById('countdown');
let startPoint = null;
let timeLeft = 10;
let timer;
let incorrectConnections = 0;

// Start countdown timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      alert("Temps écoulé! Vous avez perdu.");
      location.reload();
    }
  }, 1000);
}

endpoints.forEach(endpoint => {
  endpoint.addEventListener('click', () => {
    if (!startPoint) {
      startPoint = endpoint;
    } else {
      if (startPoint.dataset.color === endpoint.dataset.color && startPoint !== endpoint) {
        drawLine(startPoint, endpoint);
      } else {
        incorrectConnections++;
        if (incorrectConnections >= 3) {
          clearInterval(timer);
          alert("Trop d'erreurs! Vous avez perdu.");
          location.reload();
        }
      }
      startPoint = null;
    }
  });
});

function drawLine(start, end) {
  const startRect = start.getBoundingClientRect();
  const endRect = end.getBoundingClientRect();
  const svgRect = svg.getBoundingClientRect();
  
  const x1 = startRect.left + startRect.width / 2 - svgRect.left;
  const y1 = startRect.top + startRect.height / 2 - svgRect.top;
  const x2 = endRect.left + endRect.width / 2 - svgRect.left;
  const y2 = endRect.top + endRect.height / 2 - svgRect.top;

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', start.dataset.color);
  line.setAttribute('stroke-width', '4');
  svg.appendChild(line);

  checkWinCondition();
}

function checkWinCondition() {
  const connectedColors = new Set();
  svg.querySelectorAll('line').forEach(line => {
    connectedColors.add(line.getAttribute('stroke'));
  });
  if (connectedColors.size === 4) {
    clearInterval(timer);
    alert("Bravo! Vous avez réussi à connecter tous les fils.");
  }
}

startTimer();
