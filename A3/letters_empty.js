// Adapted from https://processing.org/examples/letters.html

var myFont;
function preload() {
  myFont = loadFont('SourceCodePro-Regular.ttf');
}

function setup() {
  createCanvas(640, 360);
  background(0);

  textSize(24);
  textFont(myFont);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  // Set the left and top margin
  var margin = 10;
  translate(margin*4, margin*4);

  var gap = 46; // in pixels
  var counter = 35; // start at ASCII code 35

  for (var y = 0; y < height-gap; y += gap) {
    for (var x = 0; x < width-gap; x += gap) {

      var letter = char(counter);

      if (letter == 'A' || letter == 'E' || letter == 'I' || letter == 'O' || letter == 'U') {
        fill(255, 204, 0);
      }
      else {
        fill(255);
      }

      // Draw the letter to the screen
      text(letter, x, y);

      // Increment the counter
      counter++;
    }
  }
}