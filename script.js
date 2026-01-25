// =======================
// Variables
// =======================
let score = parseInt(localStorage.getItem("score")) || 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let timeLeft = 30;
let timer;
let gameRunning = false;

// =======================
// Elements
// =======================
const box = document.getElementById("box");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");

// =======================
// Sounds
// =======================
const clickSound = new Audio("sound/click.wav");
const gameOverSound = new Audio("sound/gameover.wav");

// =======================
// Mobile sound unlock (IMPORTANT)
// =======================
document.addEventListener("click", () => {
  clickSound.play().then(() => clickSound.pause());
  gameOverSound.play().then(() => gameOverSound.pause());
}, { once: true });

// =======================
// Initial UI
// =======================
scoreEl.textContent = score;
highScoreEl.textContent = highScore;
timeEl.textContent = timeLeft;
box.style.display = "none";

// =======================
// Move Box Function
// =======================
function moveBox() {
  if (!gameRunning) return;

  const gameArea = document.getElementById("gameArea");
  const areaWidth = gameArea.clientWidth - box.offsetWidth;
  const areaHeight = gameArea.clientHeight - box.offsetHeight;

  const x = Math.random() * areaWidth;
  const y = Math.random() * areaHeight;

  box.style.left = x + "px";
  box.style.top = y + "px";
}

// =======================
// Box Click
// =======================
box.addEventListener("click", () => {
  if (!gameRunning) return;

  score++;
  scoreEl.textContent = score;

  clickSound.currentTime = 0;
  clickSound.play();

  moveBox();
});

// =======================
// Start Game Button
// =======================
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

      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreEl.textContent = highScore;
      }

      gameOverSound.currentTime = 0;
      gameOverSound.play();
      alert("Game Over! Your score: " + score);
    }
  }, 1000);
});
