let score = 0;
let highScore = 0;
let level = 1;
let time = 30;

const box = document.getElementById('box');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const levelEl = document.getElementById('level');
const timeEl = document.getElementById('time');
const gameArea = document.querySelector('.game-area');

// Box original center position
const centerX = (gameArea.clientWidth - box.clientWidth) / 2;
const centerY = (gameArea.clientHeight - box.clientHeight) / 2;

// High score update
function updateHighScore() {
    if(score > highScore) highScore = score;
    highScoreEl.textContent = highScore;
}

// Level & time update
function updateLevel() {
    if(score >= 10 && level === 1) {
        level = 2;
        time = 20;
    } else if(score >= 20 && level === 2) {
        level = 3;
        time = 10;
    }
    levelEl.textContent = level;
    timeEl.textContent = time;
}

// Box click event (score বাড়বে)
box.addEventListener('click', () => {
    score++;
    scoreEl.textContent = score;
    updateHighScore();
    updateLevel();
});

// Small random movement function
function slightMove() {
    // Box will move max ±20px around center
    const maxShift = 20;
    const randomX = centerX + Math.floor(Math.random() * maxShift*2) - maxShift;
    const randomY = centerY + Math.floor(Math.random() * maxShift*2) - maxShift;

    box.style.left = randomX + 'px';
    box.style.top = randomY + 'px';
}

// Timer countdown
setInterval(() => {
    if(time > 0) {
        time--;
        timeEl.textContent = time;
        slightMove(); // Box moves slightly every second
    } else {
        alert(`Game Over! Your score: ${score}`);
        // Reset everything
        score = 0;
        time = 30;
        level = 1;
        scoreEl.textContent = score;
        timeEl.textContent = time;
        levelEl.textContent = level;
        box.style.left = centerX + 'px';
        box.style.top = centerY + 'px';
    }
}, 1000);

// Set initial center
box.style.left = centerX + 'px';
box.style.top = centerY + 'px';
  

