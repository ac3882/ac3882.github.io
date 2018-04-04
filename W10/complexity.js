//
// Example: Complexity: NYC H2O Consumption
// by Agnes Chang. 2018.
// http://agneschang.net/gsapp-dataviz-archhum/
//
// Example of conveying complexity and designing for aesthetics rather
// than scientific readability.
//

// data variables
var waterPerBoro = {}; // use as object; see https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects
var waterNYCSum = 0;

// detail view data variables
var waterPerPropType;
var waterBoroSum; // total H2O consumption of whichever boro is active

// state variables
var state; // name of actively selected boro

// drawing constants
var colors = [ "#8E9E82", "#CACCB6", "#F2F0DF", "#A9C1D9", "#607890" ];
var colorsDark = [ "#535f4a", "#979b70", "#d0c88a", "#5786b5", "#303d49" ];
var colors2 = [ "#09436a", "#0c5789", "#0d6099", "#117ec8", "#2099ec", "#4faff0", "#7ec4f4", "#addaf8", "#dceffc"];
var colors2Hilite = "yellow";
var margin = 20;
var rectHeight = 20;
var labelTextSize = 18;
var trapezoidColor = "#eee";

// drawing variables
var trapX1, trapX2; // depends on which boro is active
var topBarBounds = {}; // maps boro name to [x1, y1, x2, y2] coordinates,
                       // so we know what was clicked on mousePress


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

  // --- top-level bar ---
  var startX = margin;
  var startY = margin*5;
  var boros = Object.keys(waterPerBoro);
  for (var i=0; i<boros.length; i++) {

    // math first
    var percentWater = waterPerBoro[boros[i]]/waterNYCSum;
    var rectWidth = map(percentWater, 0, 1, 0, width-margin*2);

    // define topBarBounds if it wasn't defined already (only need to do it once)
    if (!topBarBounds[boros[i]]) {
      topBarBounds[boros[i]] = [startX, startY, startX+rectWidth, startY+rectHeight];
    }

    if (state == boros[i] || mouseInBounds(startX, startY, startX+rectWidth, startY+rectHeight)) {
      // draw label
      fill(0);
      textSize(labelTextSize);
      text(boros[i], startX, startY - labelTextSize);

      // setup for trapezoid
      if (state && !mouseInBounds(startX, startY, startX+rectWidth, startY+rectHeight)) {
        trapX1 = startX;
        trapX2 = startX + rectWidth;
      }

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

  // --- detail-level bars ---
  if (state) {
    loadDetailData(state);

    var nycStartY = startY+rectHeight;
    var startX = margin;
    var startY = margin*5*2;

    // draw trapezoid connecting top-level to detail view
    fill(trapezoidColor);
    quad(trapX1, nycStartY, trapX2, nycStartY, width-margin, startY, startX, startY);

    // start drawing detail bar
    var propType = Object.keys(waterPerPropType);
    for (var i=0; i<propType.length; i++) {

      // math first
      var percentWater = waterPerPropType[propType[i]]/waterBoroSum;
      var rectWidth = map(percentWater, 0, 1, 0, width-margin*2);

      if (mouseInBounds(startX, startY, startX+rectWidth, startY+rectHeight)) {
        // draw label
        fill(0);
        textSize(propType);
        text(propType[i], startX, startY - labelTextSize);

        // setup for hover rectangle
        fill(colors2Hilite);
      } else {
        // normal rectangles with no mouse
        fill(colors2[i]);
      }
      rect(startX, startY, rectWidth, rectHeight);

      // setup for next rectangle
      startX += rectWidth;
    }
  }
}


function mouseInBounds(x1, y1, x2, y2) {
  return (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2);
}


function mousePressed() {
  for (var boro in topBarBounds) {
    var b = topBarBounds[boro];
    if (mouseInBounds(b[0], b[1], b[2], b[3])) {
      state = boro;
      break; // forces loop to stop even if not finished
    }
  }
  // prevent browser default
  return false;
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


function loadDetailData(selectedBoro) {
  // note: unlike for the top-level bar, we handle detail bar data "on the fly"
  // thus, first reset all detail data variables to handle whichever boro is selected
  waterPerPropType = {};
  waterBoroSum = 0;

  // go through the CSV again, this time also get property type and ignore
  // any rows that don't match our `selectedBoro` parameter
  var waterUse = table.getColumn("SUM of Water Use (All Water Sources) (kgal)");
  var boros = table.getColumn("Borough");
  var propTypes = table.getColumn("Converted Property Type");

  for (var i=0; i<waterUse.length; i++) {
    // only do something with the row if it's in the boro we want
    if (boros[i] == selectedBoro) {

      // we don't need to calculate running total here since we
      // know the CSV only contains one row per unique combination
      // of propertyType-borough
      waterPerPropType[propTypes[i]] = int(waterUse[i]);

      // also sum # gallons to total NYC count
      waterBoroSum += int(waterUse[i]);
    }
  } // end for-loop
}
