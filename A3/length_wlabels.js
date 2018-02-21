// This example uses NYT's Top Stories API and visualizes the relative
// length of story headlines.
// ---

var myFont;
var headlines = [];
var maxHeadLen, minHeadLen;
var abstracts = [];

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
  frameRate(30);

  textFont(myFont);
  textAlign(LEFT);

  //noLoop(); // since we're not animating, one frame is sufficient: run draw() just once

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
    var rectwidth = map(headlines[i].length,minHeadLen, maxHeadLen, margin, width-margin*2);
    if (mouseX > margin
      && mouseX < rectwidth+margin
      && mouseY > i*lineheight-rectheight+margin
      && mouseY < i*lineheight+margin) {
      fill('orange');
    } else {
      fill(120);
    }
    rect(0, i*lineheight, rectwidth, -1*rectheight)

    // draw headline
    fill(255);
    textSize(7);
    text(headlines[i], 0, i*lineheight);
  }

  translate(-1*margin, -1*margin);
  for (var i = 0; i < abstracts.length; i++) {
    var rectwidth = map(headlines[i].length,minHeadLen, maxHeadLen, margin, width-margin*2);
    // draw abstract
    if (mouseX > margin
      && mouseX < rectwidth+margin
      && mouseY > i*lineheight-rectheight+margin
      && mouseY < i*lineheight+margin) {
      fill('orange');
      rect(mouseX, mouseY, 400, 180);
      textSize(20);
      fill(255);
      text(abstracts[i], mouseX+10, mouseY+10, 400-20, 180-20);
    }
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
    append(abstracts, nytResponse.results[i].abstract)
  }

  // console.log(headlines); // make sure counted data looks as expected
  // console.log(maxHeadLen);
  // console.log(minHeadLen);
}