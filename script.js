var canvas;
var canvasContext;
var ballX = 400;
var ballSpeedX = 5;
var ballY = 300;
var ballSpeedY = 3;
var p1 = 0;
var p2 = 0;
var winScreen = false;
var paddle1Y = 250;
var paddle2Y = 250;
const WIN = 100;
const PADDLE_HEIGHT = 100;
const THICKNESS = 20;
var one = 1;
var oneClone = -1;

function calculateMousePos(evt) {
   var rect = canvas.getBoundingClientRect();
   var root = document.documentElement;
   var mouseX = evt.clientX - rect.left - root.scrollLeft;
   var mouseY = evt.clientY - rect.top - root.scrollTop;
   return {
      x: mouseX,
      y: mouseY
   };
}

function showGame() {
   function loadTwitterTimeline() {
      const twitterTimelineContainer = document.querySelector('.twitter-timeline-container');
      if (twitterTimelineContainer) {
          // Remove any existing content in the container (optional)
          twitterTimelineContainer.innerHTML = '';
  
          // Create the Twitter embed iframe
          const twitterEmbed = document.createElement('iframe');
          twitterEmbed.setAttribute('src', 'https://platform.twitter.com/widgets/tweet_embed.html?screen_name=pranavbol');
          twitterEmbed.setAttribute('width', '100%');
          twitterEmbed.setAttribute('height', '800'); // Adjust the height as needed
          twitterEmbed.setAttribute('frameborder', '0');
          twitterEmbed.setAttribute('scrolling', 'no');
  
          // Append the Twitter embed iframe to the container
          twitterTimelineContainer.appendChild(twitterEmbed);
      }
  }
   document.getElementById('gameCanvas').style.display = 'block';
   canvas = document.getElementById('gameCanvas');
   canvasContext = canvas.getContext('2d');
   drawArena();
   var framesPerSecond = 60;
   setInterval(function () {
      drawArena();
      movement();
   }, 1000 / framesPerSecond);

   document.addEventListener('keydown', function (event) {
      //top
      if ((event.keyCode == 38 || event.keyCode == 87) && paddle1Y >= 5) {
         paddle1Y -= 30;
      }
      //bottom
      if ((event.keyCode == 40 || event.keyCode == 83) && paddle1Y <= canvas.height - 105) {
         paddle1Y += 30;
      }
   });

   document.addEventListener('mousemove',
      function (evt) {
         var mousePos = calculateMousePos(evt);
         paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
      });
}

function ballReset() {
   if (p1 >= WIN || p2 >= WIN) {
      p1 = 0;
      p2 = 0;
      winScreen = true;
   }
   one *= -1;
   oneClone *= -1;
   ballSpeedX = 5 * one;
   ballSpeedY = 3 * oneClone;
   ballX = canvas.width / 2;
   ballY = canvas.height / 2;
}

function aiMove() {
   if (ballX > canvas.width / 2) {
      if (paddle2Y + (PADDLE_HEIGHT / 2) < ballY) {
         paddle2Y += 10;
      }
      if (paddle2Y + (PADDLE_HEIGHT / 2) > ballY) {
         paddle2Y -= 10;
      }
   }
}

function movement() {
   aiMove();
   ballX += ballSpeedX;
   if (ballX >= canvas.width - 5) {
      if (ballY >= paddle2Y && ballY <= paddle2Y + PADDLE_HEIGHT) {
         ballSpeedX *= -1;
         ballSpeedX -= .5;
         ballSpeedY += .8;
      } else {
         p1++;
         ballReset();

      }
   }

   if (ballX <= 5) {
      if (ballY >= paddle1Y && ballY <= paddle1Y + PADDLE_HEIGHT) {
         ballSpeedX *= -1;
         ballSpeedX += .5;
         ballSpeedY += .5;
      } else {
         p2++;
         ballReset();

      }
   }
   ballY += ballSpeedY;
   if (ballY >= canvas.height - 5 || ballY <= 5) {
      ballSpeedY *= -1;
   }
}

function drawArena() {
   //border
   colorRect(0, 0, canvas.width, canvas.height, "white");
   colorRect(0, 5, canvas.width - 5, canvas.height - 10, "#cfe1ff")
   colorRect((canvas.width / 2 - 2.5), 0, 5, canvas.height, "white");
   colorRect(canvas.width - 5, 0, 5, canvas.height, "white");
   colorRect(0, 0, 5, canvas.height, "white");
   //paddles
   colorRect(canvas.width - THICKNESS, paddle2Y, THICKNESS, PADDLE_HEIGHT, "white");
   colorRect(0, paddle1Y, THICKNESS, PADDLE_HEIGHT, "white");
   //ball
   drawBall(ballX, ballY, 10, "red");
   //score
   canvasContext.font = "30px Times New Roman";
   canvasContext.fillText(p1, 100, 100);
   canvasContext.fillText(p2, canvas.width - 100, 100);
}

function colorRect(X, Y, W, H, color) {
   canvasContext.fillStyle = color;
   canvasContext.fillRect(X, Y, W, H);
}

function drawBall(X, Y, R, color) {
   canvasContext.fillStyle = color;
   canvasContext.beginPath();
   canvasContext.arc(X, Y, R, 0, Math.PI * 2, true);
   canvasContext.fill();
}
