// window.onload = () => {
document.getElementById("start-button").onclick = () => {
  startGame();
};

let int;
let score = 0;
function startGame() {
  int = setInterval(addObstacle, 700);
  animate();
}
// };

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.w = 500;
canvas.h = 700;

let img = new Image();
img.src = "../images/car.png";

class Car {
  constructor() {
    this.w = 40;
    this.h = 80;
    this.x = canvas.w / 2;
    this.y = canvas.h - this.h * 1.25;
    this.img = img;
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}

//Obstacle class
class Obstacle {
  constructor() {
    this.w = Math.random() * 180 + 40;
    this.h = 20;
    this.x = Math.random() * (canvas.w - this.w) + this.w;
    this.y = 0;
  }

  draw() {
    ctx.fillStyle = "maroon";
    this.y += 4;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

//Create array of obstacles
let obstacleArr = [];
function addObstacle() {
  obstacleArr.push(new Obstacle());
  console.log(obstacleArr);
}

let player = new Car();
//create one obs
// let obs = new Obstacle();

// img.onload = function () {
//   ctx.drawImage(img, canvas.w / 2, canvas.h - 100, 40, 80);
// };

//game engine
let game;
function animate() {
  game = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.w, canvas.h);
  ctx.font = "24px Ariel";
  ctx.fillText(`Score: ${score}`, 10, 20);
  player.draw();
  // obs.draw();
  for (let i = 0; i < obstacleArr.length; i++) {
    obstacleArr[i].draw();
    let didCollide = detectCollision(player, obstacleArr[i]);
    if (didCollide) {
      gameOver();
      break;
    }
    let objectPassed = checkLocation(obstacleArr[i]);
    if (objectPassed) {
      score += 10;
      obstacleArr.splice(i, 1);
      // obstacleArr.shift();
    }
  }
}

window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowLeft":
      player.x -= 15;
      break;
    case "ArrowRight":
      player.x += 15;
      break;
  }
});

function detectCollision(player, obj) {
  if (
    player.x < obj.x + obj.w &&
    player.x + player.w > obj.x &&
    player.y < obj.y + obj.h &&
    player.y + player.h > obj.y
  ) {
    return true;
  } else {
    return false;
  }
}

function checkLocation(obj) {
  if (obj.y >= canvas.h) {
    return true;
  } else {
    return false;
  }
}

function gameOver() {
  //end game loop
  window.cancelAnimationFrame(game);
  //end obstacle interval
  clearInterval(int);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.w, canvas.h);
  ctx.fillStyle = "red";
  ctx.font = "64px Ariel";
  ctx.fillText("GAME OVER", 60, 350);
}
