/*
  Adapted from https://gist.github.com/brysonian/235705

  VARIATIONS:
    Draw lines between all circles
    Draw lines between new circle and closest neighboor
    Move new circle to exactly touch closest neighboor
    Change fill or stroke depending on circle size
    Change overlap threshold (slight overlap ok / large margin)

*/

var circles = new Array();
var count = 0;
var maxDiameter = 100;
var minDiameter = 10;
var lastAdded = 0;
var lastAddedTimeout = 100;

function setup() {
  createCanvas(500, 500);
  smooth();
  background(255);
  noFill();

  // Initialize circles
  for (var i=0; i < 1000; i++) {
    circles.push(new Circle());
  };
}


function draw() {
  //background(255);
  if (count < circles.length) {
    circles[count] = new Circle(5, maxDiameter);
    for (var i=0; i<count; i++) {
      if (circles[count].intersects(circles[i])) {
        circles[count] = null;
        break;
      }
    }

    if (circles[count] != null) {
      circles[count].draw();

      if (count > 1) {
        var nearest = 100000;
        var current = 0;
        var nearestIndex = -1;
        for (var i=0; i<count; i++) {
          current = dist(circles[i].x, circles[i].y, circles[count].x, circles[count].y);
          if (current < nearest) {
            nearest = current;
            nearestIndex = i;
          }
        }

        stroke(255, 255, 0);
        line(circles[nearestIndex].x, circles[nearestIndex].y, circles[count].x, circles[count].y);
        stroke(0);
      }

      count++;
      lastAdded = 0;
    } else {
      if (lastAdded > lastAddedTimeout && maxDiameter > minDiameter) {
         maxDiameter--;
         lastAdded = 0;
       }
      lastAdded++;
     }
  }
}


function Circle(minDiameter, maxDiameter) {
  this.radius = random(minDiameter, maxDiameter) / 2.0;
  this.x = random(this.radius, width - this.radius);
  this.y = random(this.radius, height - this.radius);

  this.intersects = function(c) {
    return dist(c.x, c.y, this.x, this.y) < c.radius + this.radius;
  }

  this.draw = function() {
    var c = lerpColor(color(255), color(0), this.radius/50.0);
    fill(c);
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
  }

}