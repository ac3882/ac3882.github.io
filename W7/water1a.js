//
// Example: NYC H2O Consumption
// by Agnes Chang. 2018.
// http://agneschang.net/gsapp-dataviz-archhum/
//
// This example uses NYC Open Data 2017 Water consumption (2016 data)
// per borough to demonstrate highlighting lines on mouseover.
//

// data variables
var waterData = {}; // use as object; see https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects
var maxWater = [];
var minWater = [];

// drawing constants
var dotW = 8;
var dotXSpacing = 50;
var colors = { Manhattan: "#535f4a", Brooklyn: "#979b70", Queens: "#d0c88a", Bronx: "#5786b5", "Staten Island": "#303d49" };
var margin = 50;

// state variables
var state = 0; // sums = 0, avgs = 1


function preload(){
  // For demo simplicity, pretend we have data already
  // Columns are: 2016 SUM of Water Use (kgal), 2016 Avg per boro (gal/sqft), 2015 SUM of Water Use (kgal), 2015 Avg per boro (gal/sqft)
  waterData = {
    Bronx: [18330191.90,96.61532239,24947198.3,215.4413723],
    Brooklyn: [19924482.60,78.01407125,15404123.4,102.2014835],
    Manhattan: [50193792.40,99.24226829,115699050.5,186.1773144],
    Queens: [25124717.00,91.95155296,27509480.9,154.8134593],
    "Staten Island:": [1964000.60,112.0289317,3849989.2,321.9575139] // this line needs to have quotes; do you know why?
  };
  maxWater = [ max(sum2015), max(avg2015), max(sum2016), max(avg2016) ];
  minWater = [ min(sum2015), min(avg2015), min(sum2016), min(avg2016) ];
}

function setup() {
  button = createButton('toggle');
  button.mousePressed(toggleState);

  createCanvas(600, 400);
  textSize(18);
  noStroke();
}

function draw() {
  background(255);
  var startX = margin;

  for (var boro in waterData) {
    console.log("start boro loop");
    startX = margin;
    console.log("startX ="+startX);

    var i = state;
    var firstY = map(waterData[boro][i], minWater[i], maxWater[i], height-margin, margin);
    var secondY = map(waterData[boro][i+2], minWater[i+2], maxWater[i+2], height-margin, margin);
    console.log("i="+state+" firstY="+firstY+" secondY="+secondY);

    stroke("orange");
    line(startX, firstY, startX+dotXSpacing, secondY)
    noStroke();
    console.log("line=== "+startX+","+firstY+","+startX+dotXSpacing+","+secondY);

    fill(colors[boro]);
    console.log("first ellipse=== "+startX+","+firstY+","+startX+dotXSpacing+","+secondY);
    ellipse(startX, firstY, dotW, dotW);
    startX += dotXSpacing;
    ellipse(startX, secondY, dotW, dotW);

    fill(0);
    startX += dotXSpacing;
    text(boro, startX, secondY+textDescent());
  }
}

function toggleState() {
  state = (state == 0) ? 1 : 0; // shorthand if-statement, aka "inline if"
}