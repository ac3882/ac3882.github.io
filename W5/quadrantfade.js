// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Squares fade from white to black
// when the mouse leaves their area.

// Four variables, one for each square's brightness level
var bright0 = 0;
var bright1 = 0;
var bright2 = 0;
var bright3 = 0;

function setup() {
  createCanvas(320, 240);
}

function draw() {
  // Draw the background
  background(0);

  // Depending on the mouse location, a
  // different rectangle is set to brightness 255
  if (mouseX < 160 && mouseY < 120) {
    bright0 = 255;
  } else if (mouseX > 160 && mouseY < 120) {
    bright1 = 255;
  } else if (mouseX < 160 && mouseY > 120) {
    bright2 = 255;
  } else if (mouseX > 160 && mouseY > 120) {
    bright3 = 255;
  }

  // All rectangles always fade
  bright0 = bright0 - 2;
  bright1 = bright1 - 2;
  bright2 = bright2 - 2;
  bright3 = bright3 - 2;

  // Fill color and draw each rectangle
  noStroke();
  fill(bright0);
  rect(0, 0, 160, 120);
  fill(bright1);
  rect(160, 0, 160, 120);
  fill(bright2);
  rect(0, 120, 160, 120);
  fill(bright3);
  rect(160, 120, 160, 120);

  // Draw grid lines
  stroke(255);
  line(160, 0, 160, 120);
  line(0, 120, 160, 120);

}