document.addEventListener("DOMContentLoaded", () => {

  const gameArea = document.getElementById("gameArea");
  const box = document.getElementById("box");
  const startBtn = document.getElementById("startBtn");
  const scoreEl = document.getElementById("score");
  const timeEl = document.getElementById("time");

  let score = 0;
  let timeLeft = 30;
  let gameRunning = false;
  let timer = null;

  function moveBox() {
    if (!gameRunning) return;

    const maxX = gameArea.clientWidth - box.offsetWidth;
    const maxY = gameArea.clientHeight - box.offsetHeight;

    box.style.left = Math.random() * maxX + "px";
    box.style.top = Math.random() * maxY + "px";
  }

  box.addEventListener("click", () => {
    if (!gameRunning) return;
    score++;
    scoreEl.textContent = score;
    moveBox();
  });

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
        alert("Game Over! Score: " + score);
      }
    }, 1000);
  });

});

