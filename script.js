const snakeBoard = document.querySelector(".snake-board"); // Get the game board element.
const scoreEl=document.getElementById("score");

let snakeX = Math.floor(Math.random() * 21) + 2;
let snakeY = Math.floor(Math.random() * 21) + 2;//so that snake not span on edge points

let foodX=snakeX+1;
let foodY=snakeY;

let speedX = 0;
let speedY = 0;

let snakeSize = [];
let gameover = false;
let intervalId;
let score=0;

const randomFoodPosition = () => {
  // Generate a random position for the food.
  foodX = Math.floor(Math.random() * 24) + 1;
  foodY = Math.floor(Math.random() * 24) + 1;
};

const changeSnakeDirection = (event) => {
  // Change the snake's direction based on keyboard input.
  switch (event.key) {
    case "ArrowUp":
      if (speedY != 1) {//condition to prevent back movement
        speedX = 0;
        speedY = -1;
      }
      break;
    case "ArrowDown":
      if (speedY != 1) {
        speedX = 0;
        speedY = 1;
      }
      break;
    case "ArrowLeft":
      if (speedX != 1) {
        speedX = -1;
        speedY = 0;
      }
      break;
    case "ArrowRight":
      if (speedX != 1) {
        speedX = 1;
        speedY = 0;
      }
      break;
  }
  // Update the game state.
  loadGame();
};

// Alternate buttons for changing direction.
const changeDirectionUsingIcon = (idName) => {
  // Change the snake's direction based on icon clicks.
  switch (idName) {
    case "ArrowUp":
      speedX = 0;
      speedY = -1;
      break;
    case "ArrowDown":
      speedX = 0;
      speedY = 1;
      break;
    case "ArrowLeft":
      speedX = -1;
      speedY = 0;
      break;
    case "ArrowRight":
      speedX = 1;
      speedY = 0;
      break;
  }
  // Update the game state.
  loadGame();
};

//game over function
const gameOver = () => {
  alert("GameOver !!! Press Ok to play Again!");
  clearInterval(intervalId);
  location.reload();
};

const loadGame = () => {
  if (gameover) {
    gameOver();
  }
  let htmlTags = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
  if (snakeX === foodX && snakeY === foodY) {
    // If the snake eats the food, generate a new food position and make the snake longer.
    randomFoodPosition();
    snakeSize.push([foodX, foodY]);
    //boosting the score
    score+=5;
    scoreEl.innerHTML="Score: "+score.toString();
  }
  for (let i = snakeSize.length - 1; i > 0; i--) {
    // Move each segment of the snake's body forward, except the head.
    snakeSize[i] = snakeSize[i - 1];
  }

  snakeSize[0] = [snakeX, snakeY]; // Update the snake's head position.
  // Update the snake's position and draw the game board.
  snakeX += speedX;
  snakeY += speedY;

  //checks if snake collides with block or not
  for (let i = 0; i < snakeSize.length; i++) {
    // Create HTML code for each segment of the snake's body.
    htmlTags += `<div class="snake-head" style="grid-area:${snakeSize[i][1]}/${snakeSize[i][0]}"></div>`;
    //snake eating itself case
    if(i!==0 && snakeSize[0][1]===snakeSize[i][1] && snakeSize[0][0]===snakeSize[i][0]){
        gameover=true;
    }
  }
  // Update the game board with the new HTML representation.
  snakeBoard.innerHTML = htmlTags;
  if (snakeX > 30 || snakeX <= 0 || snakeY > 30 || snakeY <= 0) {
    gameover = true;
  }
};

intervalId = setInterval(loadGame, 180); // Start the game loop.
// Control the snake's direction via icons.
const iconControls = document.getElementsByClassName("icon-control");
for (let index = 0; index < iconControls.length; index++) {
  let idName = iconControls[index].id;
  iconControls[index].addEventListener("click", () => {
    changeDirectionUsingIcon(idName);
  });
}
// Control the snake's direction via keyboard input.
document.addEventListener("keydown", changeSnakeDirection);
