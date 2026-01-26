// ============================
// Elements
// ============================
const gameArea = document.getElementById("gameArea");
const box = document.getElementById("box");
const startBtn = document.getElementById("startBtn");

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const highScoreEl = document.getElementById("highScore");

// ============================
// Game State
// ============================
let score = 0;
let timeLeft = 30;
let gameRunning = false;
let timer = null;

// ============================
// High Score
// ============================
let highScore = Number(localStorage.getItem("highScore")) || 0;
highScoreEl.textContent = highScore;

// ============================
// Move Box Function
// ============================
function moveBox() {
  if (!gameRunning) return;

  const areaWidth = gameArea.clientWidth;
  const areaHeight = gameArea.clientHeight;

  const boxWidth = box.offsetWidth;
  const boxHeight = box.offsetHeight;

  const x = Math.random() * (areaWidth - boxWidth);
  const y = Math.random() * (areaHeight - boxHeight);

  box.style.left = x + "px";
  box.style.top = y + "px";
}

// ============================
// Box Click
// ============================
box.addEventListener("click", () => {
  if (!gameRunning) return;

  score++;
  scoreEl.textContent = score;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreEl.textContent = highScore;
  }

  moveBox();
});

// ============================
// Start Button
// ============================
startBtn.addEventListener("click", () => {
  if (gameRunning) return;

  gameRunning = true;
  score = 0;
  timeLeft = 30;

  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;

  box.style.display = "block";
  moveBox();

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      gameRunning = false;
      box.style.display = "none";
    }
  }, 1000);
});
