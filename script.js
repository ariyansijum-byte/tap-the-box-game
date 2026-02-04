// ===== VARIABLES =====
let level = 1;
let score = 0;
let timeLeft = 30;
let timer;
let moveTimer;

// ===== ELEMENTS =====
const game = document.getElementById("game");
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

  game.innerHTML = "";

  // level 1 = 30 sec, next levels = 20 sec
  timeLeft = level === 1 ? 30 : 20;

  levelText.innerText = level;
  scoreText.innerText = score;
  timeText.innerText = timeLeft;

  createBox(); // only 1 box
  startTimer();
  startMove();
}
// ===== MOVE BOX =====
function startMove() {
  moveTimer = setInterval(() => {
    const box = document.querySelector(".box");
    if (!box) return;

    // force repaint for mobile
    box.style.left = box.offsetLeft + "px";
    box.style.top = box.offsetTop + "px";

    requestAnimationFrame(() => {
      randomPosition(box);
    });
  }, 700);
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

// ===== CREATE ONE BOX =====
function createBox() {
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

  game.appendChild(box);
}

// ===== MOVE BOX =====
function startMove() {
  moveTimer = setInterval(() => {
    const box = document.querySelector(".box");
    if (box) randomPosition(box);
  }, 700); // move speed
}

// ===== RANDOM POSITION =====
function randomPosition(box) {
  const size = 55;
  const maxX = game.clientWidth - size;
  const maxY = game.clientHeight - size;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  box.style.left = x + "px";
  box.style.top = y + "px";
}

