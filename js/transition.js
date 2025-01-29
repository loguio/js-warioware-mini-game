function startCountdown(callback) {
    const countdownElement = document.querySelector('.countdown');
    let count = 3;
    const startTransition = true
    countdownElement.innerText = count;
    const scoreRecap = document.getElementById("recap-score")
    scoreRecap.innerText = localStorage.getItem("currentScore")

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownElement.innerText = count;
        } else {
            countdownElement.innerText = 'GO!';
            setTimeout(() => {
                document.getElementById('transition-screen').remove();
                if (callback) callback();
            }, 500);
            clearInterval(interval);
            loadNextGame(false)
        }
    }, 1000);
}

startCountdown()
