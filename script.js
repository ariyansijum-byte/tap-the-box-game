let score = parseInt(localStorage.getItem("score")) || 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let timeLeft = 30;
let timer;
let gameRunning = false;
// 🔊 Game Over Sound
let gameOverSound = new Audio("sound/gameover.wav");

// 📱 iPhone / Mobile unlock (VERY IMPORTANT)
document.addEventListener("click", () => {
  gameOverSound.play();
  gameOverSound.pause();
}, { once: true });
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const timeEl = document.getElementById("time");
const box = document.getElementById("box");

scoreEl.innerText = score;
highScoreEl.innerText = highScore;

// Start Game
document.getElementById("start").addEventListener("click", () => {
  if (gameRunning) return;

  gameRunning = true;
  timeLeft = 30;
  timeEl.innerText = timeLeft;
  box.style.display = "block";

  timer = setInterval(() => {
    timeLeft--;
    timeEl.innerText = timeLeft;

    if (timeLeft === 0) {
      endGame();
    }
  }, 1000);
});

// Box Click
box.addEventListener("click", () => {
  if (!gameRunning) return;

  score++;
  scoreEl.innerText = score;
  localStorage.setItem("score", score);

  moveBox();
});

// Restart
document.getElementById("reset").addEventListener("click", () => {
  score = 0;
  timeLeft = 30;
  scoreEl.innerText = score;
  timeEl.innerText = timeLeft;
  localStorage.setItem("score", score);
});

// End Game
function endGame() {
  clearInterval(timer);
  gameRunning = false;
  box.style.display = "none";
// 🔊 Game Over Sound
gameOverSound.currentTime = 0;
gameOverSound.play();
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreEl.innerText = highScore;
  

  
}

// Move box randomly
function moveBox() {
  const maxX = window.innerWidth - 100;
  const maxY = window.innerHeight - 200;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  box.style.position = "absolute";
  box.style.left = x + "px";
  box.style.top = y + "px";
}
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  box.style.transform = `translate(${x}px, ${y}px)`;
}
