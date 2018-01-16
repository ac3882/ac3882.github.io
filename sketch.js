function setup() {
  createCanvas(640, 480);
}

function draw() {
  // see https://p5js.org/reference/#/p5/background
  background('green');
  // see https://p5js.org/reference/#/p5/fill
  fill(255, 204, 0);
  rect(20, 20, 60, 60);
  // see https://p5js.org/reference/#/p5/ellipse
  ellipse(56, 46, 55, 55);
  // see https://p5js.org/reference/#/p5/text
  textSize(32);
  fill(0, 102, 153);
  text('Agnes says hi', 10, 60);
}
