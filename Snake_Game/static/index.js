const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let gameOver = false;
let speed = 7;
let speedVariable = 0;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
let snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;
let odd = true;

const gulpSound = new Audio("gulp.mp3");

// game loop
function drawGame(){
    changeSnakePosition();

    let result = isGameOver();
    if (result){
        button = document.querySelector('#startgame');
        button.style.display = "block";
        button.onclick = () => {
            location.reload();
        };
        return;
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    setTimeout(drawGame, 1000/speed);
}

function isGameOver(){
    gameOver = false;
    // collision with walls
    if (headX < 0){
        gameOver = true;
    }
    else if (headX >= tileCount){
        gameOver = true;
    }
    else if (headY < 0){
        gameOver = true;
    }
    else if (headY >= tileCount){
        gameOver = true;
    }

    // collision with own body
    if (xVelocity != 0 || yVelocity != 0){
        for (let i = 0; i < snakeParts.length; i++){
            part = snakeParts[i];
            if (part.x == headX && part.y == headY){
                gameOver = true;
                break;
            }
        }
    }
    // show game over text
    if (gameOver){
        ctx.font = '50px Verdena';

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop('0', 'magenta');
        gradient.addColorStop('0.5', 'blue');
        gradient.addColorStop('1.0', 'red');
        ctx.fillStyle = gradient;

        ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2)
    }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = '10px Verdana';
    ctx.fillText("Score " + score, canvas.width - 50, 10);

    if (score % 2 == 1){
        odd = false;
    }
    else if (score % 2 == 0 && score > 0 && odd == false){
        odd = true;
        speed++;
    }
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake(){
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    // add item at end of list (position of head)
    snakeParts.push(new SnakePart(headX, headY));
    // remove item at start of list if snakeparts > tailLength
    while (snakeParts.length > tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision(){
    // if snake ate the apple
    if (appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);

        // sound effect
        gulpSound.play();

        // increase tail length
        tailLength++;

        //increase score
        score++;
    }
}

document.addEventListener('keydown', keyDown);

function keyDown(event){
    // up
    if (event.keyCode == 38){
        // prevent moving in opposite direction
        if (yVelocity == 1){
            return;
        }
        yVelocity = -1;
        xVelocity = 0;
    }
    // down
    if (event.keyCode == 40){
        // prevent moving in opposite direction
        if (yVelocity == -1){
            return;
        }
        yVelocity = 1;
        xVelocity = 0;
    }
    // left
    if (event.keyCode == 37){
        // prevent moving in opposite direction
        if (xVelocity == 1){
            return;
        }
        yVelocity = 0;
        xVelocity = -1;
    }
    if (event.keyCode == 39){
        // prevent moving in opposite direction
        if (xVelocity == -1){
            return;
        }
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();