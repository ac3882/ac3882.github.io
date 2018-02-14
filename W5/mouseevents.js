var x = 300;
var y = 200;
var d = 100;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // // Part 2 demo: quads + mouse press
  // stroke(0);
  // line(320, 0, 320, 360);
  // line(0, 180, 640, 180);
  // noStroke();
  // fill(0);

  if (dist(mouseX, mouseY, x, y) < d/2) {
    background(0);
  } else {
    background(255);
  }
  ellipse(x, y, d, d);
}