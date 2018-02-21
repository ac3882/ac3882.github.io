var x = 300;
var y = 200;
var d = 100;

function setup() {
  createCanvas(600, 400);
}

var color;

function draw() {

  // Part 2 demo: quads + mouse press
  background(255);
  stroke(0);
  line(320, 0, 320, 360);
  line(0, 180, 640, 180);

  noStroke();
  fill(0);
  if (mouseX > 0 && mouseX < 320 && mouseY > 0 && mouseY < 180) {
    fill('green');
    rect(0,0, 320, 180);
  } else if (mouseX > 320 && mouseX < width && mouseY > 0 && mouseY < 180) {
    fill('orange');
    rect(320,0, width-320, 180);
  } else if (mouseX > 320 && mouseX < width && mouseY > 180 && mouseY < height) {
    fill(color);
    rect(320,180, width-320, height-180);
  } else if (mouseX > 0 && mouseX < 320 && mouseY > 180 && mouseY < height) {
    // if (mouseIsPressed) {
    //   fill('purple');
    // }
    rect(0,180, 320, height-180);
  }

}

function mousePressed() {
  console.log("mousePressed function");
  color = "yellow";
}