// Example of Google Sheet Data restructuring:
// https://docs.google.com/spreadsheets/d/1A_FmxvY46SKQPS1rcxgacKdTWWmETXXX4NM1ItBHFxc/edit?usp=sharing

// data variables
var waterPerBoro = {}; // use as object; see https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects
var waterNYCSum = 0;

// drawing constants
var colors = [ "#8E9E82", "#CACCB6", "#F2F0DF", "#A9C1D9", "#607890" ];
var colorsDark = [ "#535f4a", "#979b70", "#d0c88a", "#5786b5", "#303d49" ];
var margin = 20;
var rectHeight = 20;
var labelTextSize = 18;

function preload(){
  table = loadTable('2016 NYC Water Use - SUM per boro per proptype.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 400);
  loadData();
  noStroke();
}

function draw() {
  background(255);
  var startX = margin;
  var startY = margin*5;

  var boros = Object.keys(waterPerBoro);
  for (var i=0; i<boros.length; i++) {
  // javascript objects offer a handy for-loop like `for (var boro in waterPerBoro) {`
  // but I choose a classic for-loop here to use the index i for colors

    // math first
    var percentWater = waterPerBoro[boros[i]]/waterNYCSum;
    var rectWidth = map(percentWater, 0, 1, 0, width-margin*2);

    if (mouseInBounds(startX, startY, startX+rectWidth, startY+rectHeight)) {
      // draw label
      fill(0);
      textSize(labelTextSize);
      text(boros[i], startX, startY - labelTextSize);

      // setup for hover rectangle
      fill(colorsDark[i]);
    } else {
      // normal rectangles with no mouse
      fill(colors[i]);
    }
    rect(startX, startY, rectWidth, rectHeight);

    // setup for next rectangle
    startX += rectWidth;
  }
}

function mouseInBounds(x1, y1, x2, y2) {
  return (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2);
}

function loadData() {
  var waterUse = table.getColumn("SUM of Water Use (All Water Sources) (kgal)");
  var boros = table.getColumn("Borough");

  // loadTable automatically ignores header row so we can start index at 0
  for (var i=0; i<waterUse.length; i++) {

    // for sake of demo, ignore "total" rows in csv and do the math
    if (!boros[i].includes("Total")) {

      // if running total already exists in data object
      if (waterPerBoro[boros[i]]) {
        prevSum = waterPerBoro[boros[i]];
      } else {
        prevSum = 0;
      }
      waterPerBoro[boros[i]] = int(prevSum) + int(waterUse[i]);

      // also sum # gallons to total NYC count
      waterNYCSum += int(waterUse[i]);
    }
  } // end for-loop
}