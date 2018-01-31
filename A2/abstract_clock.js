var x1 = 150;
var y1 = 0;
var x2 = 350;
var y2 = 0

function setup(){
  createCanvas(500,500);
}

function draw(){
  noStroke();
  background(200);

  // Put time in variables for easy testing
  var s = second();
  var m = minute();
  var h = hour();
  // Testing min state
  // var s = 0;
  // var m = 0;
  // var h = 0;
  // Testing max state
  // var s = 60;
  // var m = 60;
  // var h = 24;

  fill(255,0,0,150) // red
  triangle(x1,y1,x2,y2,map(s, 0, 60, 0, width), height);
  fill(255,255,0,150) // yellow
  triangle(x1,y1,x2,y2,map(m, 0, 60, x1, 0), map(m, 0, 60, y1+(x2-x1), height));
  fill(0,0,255,150) // blue
  triangle(x1,y1,x2,y2,x2,map(h, 0, 24, y2, height));

  // Example print statements (they do exactly the same thing, use 1 at a time)
  // console.log(map(s, 0, 60, 0, width), height);
  // print(map(s, 0, 60, 0, width), height);
}