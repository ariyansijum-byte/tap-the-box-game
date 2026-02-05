let score = 0;
let highScore = 0;
let level = 1;
let time = 30;

const box = document.getElementById('box');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const levelEl = document.getElementById('level');
const timeEl = document.getElementById('time');

// High score
function updateHighScore() {
    if (score > highScore) highScore = score;
    highScoreEl.textContent = highScore;
}

// Level system
function updateLevel() {
    if (score >= 10 && level === 1) {
        level = 2;
        time = 20;
    } else if (score >= 20 && level === 2) {
        level = 3;
        time = 10;
    }
    levelEl.textContent = level;
    timeEl.textContent = time;
}

// Click box
box.addEventListener('click', () => {
    score++;
    scoreEl.textContent = score;
    updateHighScore();
    updateLevel();
});

// Smooth floating movement (middle area only)
function floatBox() {
    const max = 20; // কতটা নড়বে
    const x = Math.random() * max * 2 - max;
    const y = Math.random() * max * 2 - max;

    box.style.transform = `translate(${x}px, ${y}px)`;
}

// Timer
setInterval(() => {
    if (time > 0) {
        time--;
        timeEl.textContent = time;
        floatBox();
    } else {
        alert("Game Over! Score: " + score);

        score = 0;
        level = 1;
        time = 30;

        scoreEl.textContent = score;
        levelEl.textContent = level;
        timeEl.textContent = time;

        box.style.transform = "translate(0, 0)";
    }
}, 1000);
  

