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

// Box movement function
function moveBox() {
    const areaWidth = gameArea.clientWidth - box.clientWidth;
    const areaHeight = gameArea.clientHeight - box.clientHeight;

    // Random position
    const newX = Math.floor(Math.random() * areaWidth);
    const newY = Math.floor(Math.random() * areaHeight);

    box.style.left = newX + 'px';
    box.style.top = newY + 'px';
}

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

// Box click event
box.addEventListener('click', () => {
    score++;
    scoreEl.textContent = score;
    updateHighScore();
    updateLevel();
    moveBox();
});

// Timer countdown
setInterval(() => {
    if(time > 0) {
        time--;
        timeEl.textContent = time;
    } else {
        alert(`Game Over! Your score: ${score}`);
        // Reset everything
        score = 0;
        time = 30;
        level = 1;
        scoreEl.textContent = score;
        timeEl.textContent = time;
        levelEl.textContent = level;
        box.style.left = '0px';
        box.style.top = '0px';
    }
}, 1000);
  

