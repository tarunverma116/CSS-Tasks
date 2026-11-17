//  create a countdown timer for 15 minutes using setTimeout and setInterval Methods.
let timeLeft = 15 * 60; 

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    console.log(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    timeLeft--;
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        console.log("Time's up!");
    }
}
const timerInterval = setInterval(updateTimer, 1000);