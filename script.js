// =====================
// Variables
// =====================
let score = 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let timeLeft = 30;
let timer = null;
let gameRunning = false;

// =====================
// Elements
// =====================
const box = document.getElementById("box");
const gameArea = document.getElementById("gameArea");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");

// =====================
// Sounds
// =====================
const clickSound = new Audio("sound/click.mp3");
const gameOverSound = new Audio("sound/gameover.mp3");

// Mobile sound unlock
document.addEventListener(
  "click",
  () => {
    clickSound.play().then(() => (clickSound.pause(), (clickSound.currentTime = 0)));
    gameOverSound.play().then(() => (gameOverSound.pause(), (gameOverSound.currentTime = 0)));
  },
  { once: true }
);

// =====================
// Initial UI
// =====================
scoreEl.textContent = score;
highScoreEl.textContent = highScore;
timeEl.textContent = timeLeft;
box.style.display = "none";

// =====================
// Move Box Function
// =====================
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

// =====================
// Box Click
// =====================
box.addEventListener("click", () => {
  if (!gameRunning) return;

  score++;
  scoreEl.textContent = score;

  clickSound.currentTime = 0;
  clickSound.play();

  moveBox();
});

// =====================
// Start Game Button
// =====================
startBtn.addEventListener("click", () => {
  if (gameRunning) return;

  clearInterval(timer);

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

      gameOverSound.play();

      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreEl.textContent = highScore;
      }
    }
  }, 1000);
});
