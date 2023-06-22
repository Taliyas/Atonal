//הפוסטר הוא לפסטיבל מוזיקה ואומנות אוטונלית אשר מתקיים בברלין.
// לחיצה של העכבר עוצר את הפוסטר, לחיצה של רווח משנה את הצבע של התמונה, לחיצה על אנטר מחזיר הכל להתחלה.

let img;
let originalImg;
let imgSquares = [];
const horizontalSquareCount = 20;
const verticalSquareCount = 10;
let squareWidth;
let squareHeight;
let music;
let amplitude;
let isPaused = false;
let filterColor;
let font;
let countdownDate;

function preload() {
  img = loadImage('berlin-960x500 1.png');
  music = loadSound('שאםמשך צודןב.mp4');
  font = loadFont('RotontoTrial-Bold.ttf');
}

function setup() {
  createCanvas(600, 850);
  img.resize(width, height);
  originalImg = img.get();
  squareWidth = width / horizontalSquareCount;
  squareHeight = height / verticalSquareCount;
  img.loadPixels();
  for (let y = 0; y < height; y += squareHeight) {
    for (let x = 0; x < width; x += squareWidth) {
      imgSquares.push({
        image: img.get(x, y, squareWidth, squareHeight),
        x: x,
        y: y,
        dx: random(-2, 2), // Horizontal movement speed
        dy: random(-2, 2), // Vertical movement speed
      });
    }
  }
  
  music.loop();
  amplitude = new p5.Amplitude();
  filterColor = color(255);
  textFont(font); // Set the loaded font as the current font
  textAlign(CENTER, CENTER); // Align the text to the center of the canvas
  
  countdownDate = new Date(2023, 9, 18); // Month is zero-based (0-11)
}

function mouseClicked() {
  if (isPaused) {
    music.loop();
    loop();
  } else {
    music.stop();
    noLoop();
  }
  isPaused = !isPaused;
}

function keyPressed() {
  if (keyCode === 32) {
    filterColor = color(random(255), random(255), random(255));
  } else if (keyCode === 13) {
    filterColor = color(255);
    img = originalImg;
    img.resize(width, height);
    img.loadPixels();
    imgSquares = [];
    for (let y = 0; y < height; y += squareHeight) {
      for (let x = 0; x < width; x += squareWidth) {
        imgSquares.push({
          image: img.get(x, y, squareWidth, squareHeight),
          x: x,
          y: y,
          dx: random(-2, 2), // Horizontal movement speed
          dy: random(-2, 2), // Vertical movement speed
        });
      }
    }
  }
}

function draw() {
  if (isPaused) {
    return;
  }
  
  background(0);
  const level = amplitude.getLevel();
  
  for (const square of imgSquares) {
    // Move the squares to the rhythm of the music
    square.x += square.dx * level * 10;
    square.y += square.dy * level * 10;
    
    // Apply the filter color to the square image
    tint(filterColor);
    
    // Draw this square.
    image(square.image, square.x, square.y);
    
    // Reset square position if it goes off-screen
    if (square.x > width) {
      square.x = -squareWidth;
    } else if (square.x < -squareWidth) {
      square.x = width;
    }
    if (square.y > height) {
      square.y = -squareHeight;
    } else if (square.y < -squareHeight) {
      square.y = height;
    }
  }
  
  fill(235, 255, 40);
     textSize(200);
    text("Berlin\nAtonal", width / 2, height /5);
  textSize(30);
  text("A Laboratory for Future \n Art and Music", width/1.7 , height / 4);
  // Countdown Timer
  let currentDate = new Date();
  let timeRemaining = countdownDate - currentDate;
  
  if (timeRemaining > 0) {
    let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    textSize(24);
    fill(235, 255, 40);
    text(`The Countdown Starts N O W \n ${129}d ${15}h ${3}m ${seconds}s`, width / 2, height - 50);
  }
}
