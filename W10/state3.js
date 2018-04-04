//
// Example: State 3
// by Agnes Chang. 2018.
// http://agneschang.net/gsapp-dataviz-archhum/
//
// Basic three-state application.
//

// state variable
var state = 0;

// drawing constants
var x = 300;
var y = 200;
var d = 50;
var colors = ["#4169e1", "#1e90ff", "#87cefa"];


function setup() {
  button = createButton('next');
  button.mousePressed(nextState);

  createCanvas(600, 400);
}


function draw() {
  background(255);

  // You can sometimes take advantage of the fact that state is
  // represented as a shortcut; in this case, I map state directly
  // to my ordered color swatches.
  fill(colors[state]);

  // Or simply control what to draw for each state using if-statements.
  if (state == 0) {
    ellipse(x, y, d, d);
  } else if (state == 1) {
    triangle(x, y, x+40, y, x+20, y-40);
  } else if (state == 2) {
    rect(x, y, d*2, d);
  }
}


function nextState() {
  // When button is clicked, go to the next state.
  state = state + 1;
  // If we exceed the valid number of states, loop
  // around to start at the beginning.
  if (state == 3) {
    state = 0;
  }
}