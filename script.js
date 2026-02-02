// ===== GAME VARIABLES =====
let level = 1;
let score = 0;
let timeLeft = 20;
let timer;
let boxCount = 1;

// ===== ELEMENTS =====
const gameArea = document.getElementById("game");
const levelText = document.getElementById("level");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");

// ===== START GAME =====
startLevel();

// ===== FUNCTIONS =====
function startLevel() {
  clearInterval(timer);
  gameArea.innerHTML = "";

  timeLeft = 20;
  levelText.innerText = level;
  scoreText.innerText = score;
  timeText.innerText = timeLeft;

  boxCount = level;
  createBoxes(boxCount);
  startTimer();
}

// ===== TIMER =====
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeText.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextLevel();
    }
  }, 1000);
}

// ===== NEXT LEVEL =====
function nextLevel() {
  level++;
  startLevel();
}

// ===== CREATE BOXES =====
function createBoxes(count) {
  for (let i = 0; i < count; i++) {
    const box = document.createElement("div");
    box.className = "box";

    box.style.left = Math.random() * 80 + "%";
    box.style.top = Math.random() * 80 + "%";

    box.onclick = () => {
      score++;
      scoreText.innerText = score;
      box.remove();
    };

    gameArea.appendChild(box);
  }
}

