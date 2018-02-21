var table;
var bldgCounts = [];
var maxFloors, minFloors, maxCount, minCount;

// Display "Loading..." on the screen so we see something's happening
function preload(){
  table = loadTable('PLUTODD16v1-Manhattan-min.csv', 'csv', 'header');
}

// In this sketch everything happens in setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  loadData();
}

function loadData() {
    var numFloors = table.getColumn("NumFloors");
    maxFloors = max(numFloors);
    minFloors = min(numFloors);

  // console.log("Max # of floors in all bldgs: " + maxFloors);
  // console.log("Min # of floors in all bldgs: " + minFloors);

  // create array with size of all possible floor counts
  // each starting at value 0
  for(var i = 0; i < maxFloors + 1; i++) {
    append(bldgCounts, 0);
  }

  // iterate through all floor counts and
  // count how many of each building type there are
  for(var i = 0; i < numFloors.length; i++){
    bldgCounts[numFloors[i]]++;
  }
  mostCommonFloorFreq = max(bldgCounts)

  // You could do drawing inside setup() like this, but this is
  // like noLoop() in that everything you write here goes on one frame.
  textSize(40);
  textStyle(BOLD);
  text("There are " + numFloors.length + " buildings in Manhattan.", 20,40);
  text("The lowest floor count is " + minFloors + ", the highest is " + maxFloors + ".", 20,85);
  text("The most common floor count is " + bldgCounts.indexOf(mostCommonFloorFreq) + ",\n  with " + mostCommonFloorFreq + " occurrences", 20,130);
}
