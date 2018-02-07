// This example uses NYT's Top Stories API and visualizes the relative
// length of story headlines.
// ---

var myFont;
var headlines = [];
var maxHeadLen, minHeadLen;

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
  createCanvas(640, 800);
  background(0);

  textSize(7);
  textFont(myFont);
  textAlign(LEFT);

  noLoop(); // since we're not animating, one frame is sufficient: run draw() just once

  extractHeadlines();
}

function draw() {
  background(0);

  // Set the left and top margin
  var margin = 40;
  translate(margin, margin);

  var lineheight = 15;
  var rectheight = 8;

  for (var i = 0; i < headlines.length; i++) {

    // draw rectangle
    fill(120);
    var rectwidth = map(headlines[i].length,minHeadLen, maxHeadLen, margin, width-margin*2);
    rect(0, i*lineheight, rectwidth, -1*rectheight)

    // draw headline
    fill(255);
    text(headlines[i], 0, i*lineheight);
  }
}

function extractHeadlines() {

  // console.log(nytResponse); // take a look at the full API response structure

  for (var i = 0; i < nytResponse.results.length; i++) {
    var h = nytResponse.results[i].title;
    // besides .title, other text data available to you include:
    // .abstract, .byline, .section, etc. etc.

    if (!maxHeadLen) {
      maxHeadLen = h.length;
    } else if (h.length > maxHeadLen) {
      maxHeadLen = h.length;
    }

    if (!minHeadLen) {
      minHeadLen = h.length;
    } else if (h.length < minHeadLen) {
      minHeadLen = h.length;
    }
    append(headlines, h);
  }

  // console.log(headlines); // make sure counted data looks as expected
  // console.log(maxHeadLen);
  // console.log(minHeadLen);
}