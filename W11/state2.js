//
// Example: State 2
// by Agnes Chang. 2018.
// http://agneschang.net/gsapp-dataviz-archhum/
//
// Basic binary (two) state application. (Compare to NYC H2O consumption demos.)
//

// state variable
var state = 0;

// drawing constants
var x = 300;
var y = 200;
var d = 50;

function setup() {
  button = createButton('toggle');
  button.mousePressed(toggleState);

  createCanvas(600, 400);
}

function draw() {

  if (state == 0) {
    background("#3cb371");
  } else {
    background("#98fb98");
  }

  ellipse(x, y, d, d);
}

function toggleState() {
  if (state == 0) {
    state = 1;
  } else {
    state = 0;
  }
}