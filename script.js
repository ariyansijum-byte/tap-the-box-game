// ===============================
// Tap The Box Game - FINAL JS
// ===============================

// Elements
const gameArea = document.getElementById("gameArea");
const box = document.getElementById("box");
const startBtn = document.getElementById("startBtn");

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const highScoreEl = document.getElementById("highScore");

// Game state
let score = 0;
let timeLeft = 30;
let gameRunning = false;
let timer = null;

// High score
let highScore = Number(localStorage.getItem("highScore")) || 0;
highScoreEl.textContent = highScore;

// Move box randomly
function moveBox() {
  if (!gameRunning) return;

  const areaWidth = gameArea.clientWidth;
  const areaHeight = gameArea.clientHeight;

  const boxWidth = box.offsetWidth;
  const boxHeight = box.offsetHeight;

  const maxX = areaWidth - boxWidth;
  const maxY = areaHeight - boxHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  box.style.left = x + "px";
  box.style.top = y + "px";
}

// Box click
box.addEventListener("click", () => {
  if (!gameRunning) return;

  score++;
  scoreEl.textContent = score;

  moveBox();
});

// Start game
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
      endGame();
    }
  }, 1000);
});

// End game
function endGame() {
  gameRunning = false;
  clearInterval(timer);

  box.style.display = "none";

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreEl.textContent = highScore;
  }

  alert("Game Over! Your Score: " + score);
}

