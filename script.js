// elements
const box = document.getElementById("box");
const gameArea = document.getElementById("gameArea");
const startBtn = document.getElementById("startBtn");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

let score = 0;
let timeLeft = 30;
let moveInterval = null;
let timerInterval = null;

// box random move
function moveBox() {
  const areaSize = 300;
  const boxSize = 80;

  const maxX = areaSize - boxSize;
  const maxY = areaSize - boxSize;

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  box.style.left = x + "px";
  box.style.top = y + "px";
  box.style.display = "block";
}

// box click
box.addEventListener("click", () => {
  score++;
  scoreEl.innerText = score;
  moveBox();
});

// start game
startBtn.addEventListener("click", () => {
  // reset
  score = 0;
  timeLeft = 30;
  scoreEl.innerText = score;
  timeEl.innerText = timeLeft;

  clearInterval(moveInterval);
  clearInterval(timerInterval);

  moveBox();

  // MOVE EVERY 1 SECOND ✅
  moveInterval = setInterval(moveBox, 1000);

  // TIMER
  timerInterval = setInterval(() => {
    timeLeft--;
    timeEl.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(moveInterval);
      clearInterval(timerInterval);
      box.style.display = "none";
      alert("Game Over! Score: " + score);
    }
  }, 1000);
});

