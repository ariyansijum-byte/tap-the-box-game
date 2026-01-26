// ===============================
// Tap The Box Game – Final JS
// ===============================

// -------- Elements --------
const gameArea = document.getElementById("gameArea");
const box = document.getElementById("box");
const startBtn = document.getElementById("startBtn");

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const highScoreEl = document.getElementById("highScore");

// -------- Game State --------
let score = 0;
let timeLeft = 30;
let gameRunning = false;
let timer = null;

// -------- High Score --------
let highScore = Number(localStorage.getItem("highScore")) || 0;
highScoreEl.textContent = highScore;

// -------- Move Box --------
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

  box.style.left = `${x}px`;
  box.style.top = `${y}px`;
}

// -------- Box Click --------
box.addEventListener("click", () => {
  if (!gameRunning) return;

  score++;
  scoreEl.textContent = score;

  moveBox();
});

// -------- Start Game --------
startBtn.addEventListener("click", () => {
  if (gameRunning) return;

  // reset
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
      endGame();
    }
  }, 1000);
});

// -------- End Game --------
function endGame() {
  clearInterval(timer);
  gameRunning = false;
  box.style.display = "none";

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreEl.textContent = highScore;
  }
}
