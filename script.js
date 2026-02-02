// ===== GAME VARIABLES =====
let level = 1;
let score = 0;
let timeLeft = 20;
let timer;
let moveTimer;

// ===== ELEMENTS =====
const gameArea = document.getElementById("game");
const levelText = document.getElementById("level");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const highText = document.getElementById("high");

// ===== HIGH SCORE =====
let highScore = localStorage.getItem("highScore") || 0;
highText.innerText = highScore;

// ===== START GAME =====
startLevel();

// ===== START LEVEL =====
function startLevel() {
  clearInterval(timer);
  clearInterval(moveTimer);

  gameArea.innerHTML = "";
  timeLeft = 20;

  levelText.innerText = level;
  scoreText.innerText = score;
  timeText.innerText = timeLeft;

  createBoxes(level + 1);
  startTimer();
  startMove();
}

// ===== TIMER =====
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeText.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      level++;
      startLevel();
    }
  }, 1000);
}

// ===== CREATE BOXES =====
function createBoxes(count) {
  for (let i = 0; i < count; i++) {
    const box = document.createElement("div");
    box.className = "box";

    randomPosition(box);

    box.onclick = () => {
      score++;
      scoreText.innerText = score;

      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highText.innerText = highScore;
      }

      randomPosition(box);
    };

    gameArea.appendChild(box);
  }
}

// ===== MOVE BOXES =====
function startMove() {
  moveTimer = setInterval(() => {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
      randomPosition(box);
    });
  }, 800); // speed (lower = faster)
}

// ===== RANDOM POSITION =====
function randomPosition(box) {
  const boxSize = 55;

  const maxX = gameArea.clientWidth - boxSize;
  const maxY = gameArea.clientHeight - boxSize;

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  box.style.left = x + "px";
  box.style.top = y + "px";
}

