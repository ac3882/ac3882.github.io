var hour_xs = [], hour_ys = [];
var minute_xs = [], minute_ys = [];
var second_xs = [], second_ys = [];

function setup(){
  createCanvas(600,600);
  frameRate(1); //1 FPS, since nothing needs to change between seconds
  noStroke();

  // Set the random positions for this session (so balls merely show/hide,
  // they don't actually move in this clock.)
  for (var i = 0; i < 24; i++){
    hour_xs.push(random(width));
    hour_ys.push(random(height));
  }

  for (var i = 0; i < 60; i++){
    minute_xs.push(random(width));
    minute_ys.push(random(height));
  }

  for (var i = 0; i < 60; i++){
    second_xs.push(random(width));
    second_ys.push(random(height));
  }
}

function draw(){
  background(255);
  fill(0);

  for (var i = 0; i < second(); i++){
    drawBall(second_xs[i], second_ys[i], 10, 190);
  }

  for (var i = 0; i < minute(); i++){
    drawBall(minute_xs[i], minute_ys[i], 40, 150);
  }

  for (var i = 0; i < hour(); i++){
    drawBall(hour_xs[i], hour_ys[i], 90, 80);
  }

}

function drawBall(x, y, dia, k) {
  fill(k, 150); // grayscale with 150/255 transparency
  ellipse(x, y, dia, dia);
}