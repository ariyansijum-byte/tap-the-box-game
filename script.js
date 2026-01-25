// =======================
// Variables
// =======================
let score = parseInt(localStorage.getItem("score")) || 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let timeLeft = 30;
let timer;
let gameRunning = false;

// =======================
// Sounds
// =======================
const clickSound = new Audio("sound/click.wav");
const gameOverSound = new Audio("sound/gameover.wav");

// =======================
// iPhone / Mobile sound unlock (VERY IMPORTANT)
// =======================
document.addEventListener(
  "click",
  () => {
    clickSound.play();
    clickSound.pause();
    gameOverSound.play();
    gameOverSound.pause();
  },
  { once: true }
);

// =======================
// Elements
// =======================
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const timeEl = document.getElementById("time");
const box = document.getElementById("box");
const startBtn = document.getElementById("start");

// =======================
// Initial UI
// =======================
scoreEl.textContent = score;
highScoreEl.textContent = highScore;
timeEl.textContent = timeLeft;

// =======================
// Start Game
// =======================
startBtn.addEventListener("click", () => {
  if (gameRunning) return;

  gameRunning = true;
  score = 0;
  timeLeft = 30;

  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      gameRunning = false;

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

// =======================
// Box Click
// =======================
box.addEventListener("click", () => {
  if (!gameRunning) return;

  score++;
  scoreEl.textContent = score;
  localStorage.setItem("score", score);

  clickSound.currentTime = 0;
  clickSound.play();

  moveBox();
});

// =======================
// Move Box Randomly
// =======================
function moveBox() {
  const maxX = window.innerWidth - box.offsetWidth;
  const maxY = window.innerHeight - box.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  box.style.left = x + "px";
  box.style.top = y + "px";
}
