// Letters adapted from https://processing.org/examples/letters.html
// ---
// This example uses NYT's Top Stories API and visualizes the relative
// frequency of letters occurring in story headlines.

// Declare global variables that we'll want to access throughout program.
var myFont;
var nytResponse;
var letterCounts;

var maxTextSize = 250;
var defaultTextSize = 24;

function preload() {
  myFont = loadFont('SourceCodePro-Regular.ttf');

  // Assemble url for API call
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  var apikey = "436e4c0731324a5faa7741a58ba6adec"; // see: https://developer.nytimes.com
  url += "?api-key=" + apikey;

  nytResponse = loadJSON(url);
  // loadJSON() is asynchronous, but calling it inside preload() guarantees
  // we'll have a response before setup() and draw() is run.
}

function setup() {
  console.log(nytResponse); // check to see response looks right

  createCanvas(640, 360);
  background(0);

  textSize(defaultTextSize);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  noLoop(); // since we're not animating, one frame is sufficient: run draw() just once

  setupLettersCountData();
}

function draw() {
  background(0);

  // Set the left and top margin
  var margin = 10;
  translate(margin*4, margin*4);

  var gap = 46; // in pixels
  var counter = 35; // start at ASCII code 35

  for (var y = 0; y < height-gap; y += gap) {
    for (var x = 0; x < width-gap; x += gap) {

      var letter = char(counter);

      if (letter == 'A' || letter == 'E' || letter == 'I' || letter == 'O' || letter == 'U') {
        fill(255, 204, 0);
      }
      else {
        fill(255);
      }

      // Draw the letter to the screen
      setTextSizeByLetterCount(letter);
      text(letter, x, y);

      // Increment the counter
      counter++;
    }
  }
}

function setupLettersCountData() {

  // console.log("setupLettersCountData"); // make sure this function is called when we expect

  for (var i = 0; i < nytResponse.results.length; i++) {
    // Get the headline and take out all whitespace characters because
    // whitespace will always have the highest count and distort our scale.
    // We do this by splitting and rejoining the string:
    // https://p5js.org/reference/#/p5/split
    // https://p5js.org/reference/#/p5/join
    var headline = join(split(nytResponse.results[i].title, ' '), '');
    // console.log(headline); // make sure headline strings look right

    for (var j = 0; j < headline.length; j++) {
      var letter = headline[j];

      // Our letterCounts var is a NumberDict type
      // see https://p5js.org/reference/#/p5.NumberDict
      if (!letterCounts) {
        letterCounts = createNumberDict(letter, 1);
      } else if (!letterCounts.hasKey(letter)){
        letterCounts.create(letter, 1);
      } else {
        letterCounts.add(letter, 1);
      }
    }
  }

  // console.log(letterCounts); // make sure counted data looks as expected
  // console.log(letterCounts.maxValue());
}

function setTextSizeByLetterCount(letter) {
  // map letter count values to our desired min / max text sizes
  if (letterCounts.hasKey(letter)) {
    textSize(map(letterCounts.get(letter),
                  0, letterCounts.maxValue(),
                  defaultTextSize, maxTextSize));
  } else {
    textSize(defaultTextSize);
  }
}