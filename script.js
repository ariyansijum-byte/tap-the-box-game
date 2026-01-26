alert("JS Loaded");
const box = document.getElementById("box");
const gameArea = document.getElementById("gameArea");
const startBtn = document.getElementById("startBtn");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

let score = 0;
let timeLeft = 30;
let gameInterval = null;
let timerInterval = null;

// random position function
function moveBox() {
  const areaRect = gameArea.getBoundingClientRect();
  const boxSize = 80;

  const maxX = areaRect.width - boxSize;
  const maxY = areaRect.height - boxSize;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  box.style.left = randomX + "px";
  box.style.top = randomY + "px";
}

// start game
startBtn.addEventListener("click", () => {
  score = 0;
  timeLeft = 30;

  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;

  box.style.display = "block";
  moveBox();

  clearInterval(gameInterval);
  clearInterval(timerInterval);

  // 🔥 THIS LINE MAKES BOX MOVE
  gameInterval = setInterval(moveBox, 800);

  timerInterval = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      alert("Game Over! Score: " + score);
    }
  }, 1000);
});

// click box
box.addEventListener("click", () => {
  score++;
  scoreEl.textContent = score;
  moveBox();
});

