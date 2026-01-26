// Tap The Box Game – Simple & Working JS

document.addEventListener("DOMContentLoaded", () => {

  const gameArea = document.getElementById("gameArea");
  const box = document.getElementById("box");
  const startBtn = document.getElementById("startBtn");
  const scoreEl = document.getElementById("score");
  const timeEl = document.getElementById("time");
  const highScoreEl = document.getElementById("highScore");

  let score = 0;
  let timeLeft = 30;
  let timer = null;
  let gameRunning = false;

  // Load high score
  let highScore = localStorage.getItem("highScore") || 0;
  highScoreEl.textContent = highScore;

  // Move box randomly
  function moveBox() {
    const maxX = gameArea.clientWidth - box.offsetWidth;
    const maxY = gameArea.clientHeight - box.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    box.style.left = x + "px";
    box.style.top = y + "px";
  }

  // Start game
  startBtn.addEventListener("click", () => {
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

        if (score > highScore) {
          highScore = score;
          localStorage.setItem("highScore", highScore);
          highScoreEl.textContent = highScore;
        }

        alert("Game Over! Score: " + score);
      }
    }, 1000);
  });

  // Box click
  box.addEventListener("click", () => {
    if (!gameRunning) return;
    score++;
    scoreEl.textContent = score;
    moveBox();
  });

});

