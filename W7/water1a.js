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
var labelTextSize = 18;

// state variables
var state = 0; // sums = 0, avgs = 1

function preload(){
  table = loadTable('2015-2016 NYC Water Use - SUMAVG per boro.csv', 'csv', 'header');
}

function setup() {
  button = createButton('toggle');
  button.mousePressed(toggleState);

  createCanvas(600, 400);
  loadData();

  textSize(labelTextSize);
  noStroke();
}

function draw() {
  background(255);
  var startX = margin;

  for (var boro in waterData) {

    startX = margin;

    var i = state;
    var firstY = map(waterData[boro][i], minWater[i], maxWater[i], height-margin, margin);
    var secondY = map(waterData[boro][i+2], minWater[i+2], maxWater[i+2], height-margin, margin);

    stroke("orange");
    line(startX, firstY, startX+dotXSpacing, secondY)
    noStroke();

    fill(colors[boro]);
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

function loadData() {
  // convert to format { borough: [ 99, 99, 99, 99 ]}
  var boros = table.getColumn("Borough");
  var sum2016 = table.getColumn("2016 SUM of Water Use (kgal)");
  var avg2016 = table.getColumn("2016 Avg per boro (gal/sqft)");
  var sum2015 = table.getColumn("2015 SUM of Water Use (kgal)");
  var avg2015 = table.getColumn("2015 Avg per boro (gal/sqft)");

  // loadTable automatically ignores header row so we can start index at 0
  for (var i=0; i<boros.length; i++) {
    waterData[boros[i]] = [ sum2015[i], avg2015[i], sum2016[i], avg2016[i] ];
  }

  maxWater = [ max(sum2015), max(avg2015), max(sum2016), max(avg2016) ];
  minWater = [ min(sum2015), min(avg2015), min(sum2016), min(avg2016) ];
}