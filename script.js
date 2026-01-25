// Elements
const gameArea = document.getElementById("gameArea");
const box = document.getElementById("box");
const startBtn = document.getElementById("startBtn");

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const highScoreEl = document.getElementById("highScore");

// Game variables
let score = 0;
let timeLeft = 30;
let gameRunning = false;
let timer = null;

// High score (localStorage)
let highScore = localStorage.getItem("highScore") || 0;
highScoreEl.textContent = highScore;

// Move box randomly
function moveBox() {
  const areaWidth = gameArea.clientWidth - box.clientWidth;
  const areaHeight = gameArea.clientHeight - box.clientHeight;

  const x = Math.random() * areaWidth;
  const y = Math.random() * areaHeight;

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

// Start button
startBtn.addEventListener("click", () => {
  if (gameRunning) return;

  score = 0;
  timeLeft = 30;
  gameRunning = true;

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

      // High score update
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreEl.textContent = highScore;
      }
    }
  }, 1000);
});
