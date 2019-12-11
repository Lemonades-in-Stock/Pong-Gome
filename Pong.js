let canvas;
let ctx;
let ballX = 343;
let ballY = 130;
let ballSpeedX = 5;
let ballSpeedY = 4;

let player1Score = 0;
let player2Score = 0;
const winScore = 10;

let startScreen = true;
let winScreen = false;

let paddle1Y = 107;
let paddle2Y = 107;
const paddleY = 50;
const paddleX = 10;


 //This function makes everything inside it work only if the page has loaded fully
     window.onload = function(){
 //Setup for the the graphics of the game
canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

 //How much the game updates per second
const fps = 60;
setInterval(function(){
    moveE();
    drawE();
}, 1000/fps);

 //Makes the paddle move
addEventListener("click", function(event) {

        if(startScreen){
            return;
        }
        if(winScreen){
            return;
        }
    paddle1Y = event.y - paddleY/2;
});

 //Runs restrictions aswell as other features
const resSys = 80;
setInterval(function(){
    restrictions();
}, 1000/resSys);


 //This restarts the game to play again when you click
    addEventListener('click', function (){
      if(winScreen){
        player1Score = 0;
        player2Score = 0;
        winScreen = false;
        ballSpeedY--;
       }
    });
       
 //This starts the game when you click
    addEventListener('click', function(){
        if(startScreen){
            startScreen = false;
        }
    });
    
}


 //Self explainatry
function restrictions(){
    
    if(paddle1Y + paddleY >= canvas.height){
        paddle1Y = canvas.height - paddleY;
    }
    if(paddle1Y <= 0){
        paddle1Y = 0;
    }
        if(paddle2Y + paddleY >= canvas.height){
        paddle2Y = canvas.height - paddleY;
    }
    if(paddle2Y <= 0){
        paddle2Y = 0;
    }
}

function drawE(){

 //Background   
ctx.fillStyle = 'grey';
ctx.fillRect(0, 0, canvas.width, canvas.height);
 //Background detail
ctx.beginPath();
ctx.arc(canvas.width/2, canvas.height/2, 90, 0, 2 * Math.PI);
ctx.lineWidth = '5';
ctx.strokeStyle = 'black';
ctx.stroke();
 //Line in the middle
ctx.fillStyle = 'black';
ctx.fillRect(canvas.width/2, 0, 5, canvas.height);
     //Adds text when someone wins or looses
    if(winScreen){
        ctx.fillStyle = 'white';
        ctx.font = '30px Ariel';
        ctx.fillText('Tap To Play', canvas.width/2.35, canvas.height/2);
    }
 //This says if you won
if(player1Score == 10){
    ctx.fillStyle = 'white';
    ctx.font = '35px Ariel';
    ctx.fillText('You Win', canvas.width/2.3, canvas.height/3);
}
 //This says if the ai won
if(player2Score == 10){
    ctx.fillStyle = 'white';
    ctx.font = '35px Ariel';
    ctx.fillText('You lose', canvas.width/2.3, canvas.height/3);
}
 //Start screen
if(startScreen){
        ctx.fillStyle = 'white';
        ctx.font = '30px Ariel';
        ctx.fillText('Tap To Play', canvas.width/2.35, canvas.height/2);
}
 //Ball
ctx.fillStyle = 'white';
ctx.fillRect(ballX, ballY , 5, 5);
 //User paddle
ctx.fillStyle = 'white';
ctx.fillRect(0, paddle1Y, 10, paddleY);
 //Comp paddle
ctx.fillStyle = 'white';
ctx.fillRect(canvas.width-paddleX, paddle2Y, paddleX, paddleY);
 //Player 1 score
ctx.font = '20px Ariel';
ctx.fillText(player1Score, 30, 30);
 //Player 2 score
ctx.font = '20px Ariel';
ctx.fillText(player2Score, canvas.width-30, 30);
}

 //Pretty self explainatry
function ballReset(){
        if(player1Score >= winScore || player2Score >= winScore){
            winScreen = true;
        }
        ballSpeedX = -ballSpeedX;
        ballX = canvas.width/2;
        ballY = canvas.height/2;
}

 //So the computer can move
function compMovement(){
    
    const paddle2YCenter = (paddle2Y + paddleY/2);
    if(paddle2YCenter < ballY - 10){
        paddle2Y += 4.5;}
    else if(paddle2YCenter > ballY - 10){
        paddle2Y -= 4.5;
    }
}

function moveE(){

     //Starts the game when someone click
    if(startScreen){
        return;
    }
     //Stops game when someone wins
    if(winScreen){
        return;
    }
 //Computer movement
compMovement();
 //Movement
ballX = ballX + ballSpeedX;
ballY = ballY + ballSpeedY;
 //What makes the ball bounce off the walls and a paddle feature
if(ballX >= canvas.width){
    
    if(ballY > paddle2Y && ballY < paddle2Y + paddleY){
        ballSpeedX = -ballSpeedX;
        
        let ballCtrl = ballY - (paddle2Y + paddleY/2);
        ballSpeedY = ballCtrl * 0.30;
    } else {
            player1Score++; //Player score must be put before ballReset()
            ballReset(); 
    }
}
 //What makes the ball bounce off the walls and a paddle feature
if(ballX <= 0){
    
    if(ballY >= paddle1Y && ballY <= paddle1Y + paddleY){
        ballSpeedX = -ballSpeedX;
        
        let ballCtrl = ballY - (paddle1Y + paddleY/2);
        ballSpeedY = ballCtrl * 0.30;
    } else {
            player2Score++; //Player score must be put before ballReset()
            ballReset();
    }
 }
if(ballY >= canvas.height){
    
    ballSpeedY = -ballSpeedY;
  }
if(ballY <= 0){
    
    ballSpeedY = -ballSpeedY;
    }
}
