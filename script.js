// Elements
const gameArea = document.getElementById("gameArea");
const box = document.getElementById("box");
const startBtn = document.getElementById("startBtn");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

// Game state
let score = 0;
let timeLeft = 30;
let gameRunning = false;
let timer = null;

// Move box randomly
function moveBox() {
  if (!gameRunning) return;

  const areaWidth = gameArea.clientWidth;
  const areaHeight = gameArea.clientHeight;

  const boxSize = 80;

  const maxX = areaWidth - boxSize;
  const maxY = areaHeight - boxSize;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  box.style.left = x + "px";
  box.style.top = y + "px";
  box.style.display = "block";
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

  score = 0;
  timeLeft = 30;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;

  gameRunning = true;
  box.style.display = "block";

  moveBox();

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      gameRunning = false;
      box.style.display = "none";
      alert("Game Over! Score: " + score);
    }
  }, 1000);
});

