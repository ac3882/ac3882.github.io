var table;
var bldgCounts = [];
var maxFloors, minFloors, maxCount, minCount;

// Display "Loading..." on the screen so we see something's happening
function preload(){
	table = loadTable('PLUTODD16v1-Manhattan-min.csv', 'csv', 'header');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  loadData();
  noLoop();
}

function loadData() {
    var numFloors = table.getColumn("NumFloors");
    maxFloors = max(numFloors);
    minFloors = min(numFloors);

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
  // console.log(bldgCounts);
}

function draw(){
  var margin = 20;
  fill(0,250,100);
  noStroke();
  // go through building count array
  // map the x value to floor height
  // map the y value to # of buildings
  for(var i = 1; i < bldgCounts.length; i++){
      if(bldgCounts[i] > 0){
        var x = map(i, 0, bldgCounts.length, margin, width-margin*2);
        var y = map(bldgCounts[i], min(bldgCounts), max(bldgCounts), height-margin*2, margin);
        ellipse(x,y,5,5);
        // print("x="+x+" y="+y);
        var textDisplay = bldgCounts[i] + " buildings with " + i + " floors.";
      }
  }
}