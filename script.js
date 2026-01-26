const gameArea = document.getElementById("gameArea");
const box = document.getElementById("box");
const startBtn = document.getElementById("startBtn");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

let score = 0;
let timeLeft = 30;
let gameRunning = false;
let timer;

// Move box randomly
function moveBox() {
  const maxX = gameArea.clientWidth - box.offsetWidth;
  const maxY = gameArea.clientHeight - box.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  box.style.left = x + "px";
  box.style.top = y + "px";
}

// Box click
box.onclick = () => {
  if (!gameRunning) return;

  score++;
  scoreEl.textContent = score;
  moveBox();
};

// Start game
startBtn.onclick = () => {
  score = 0;
  timeLeft = 30;
  gameRunning = true;

  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;

  box.style.display = "block";
  moveBox();

  clearInterval(timer);
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
};

