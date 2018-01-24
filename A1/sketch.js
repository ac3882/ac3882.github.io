function setup() {
  createCanvas(640, 480);
}

function draw() {
  background('green');
  fill(255, 204, 0);

  // Map the function second() to values from 0~400
  rect(20, 20, 60, map(second(), 0, 60, 0, 400));

  push(); // Start a new drawing state
  scale(11, 11); // Use function hour() directly to apply scale
  ellipse(56, 46, 55, 55);
  pop(); // Restore original state (scale, specifically)


  // First change the mode to degrees (default is radians)
  angleMode(DEGREES);
  // Map the function minute() to values from 0~360
  rotate(map(minute(), 0, 60, 0, 360));
  textSize(32);
  fill(0, 102, 153);
  text('Agnes says hi', 10, 60);
}
