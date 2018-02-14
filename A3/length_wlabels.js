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

  textSize(7);
  textFont(myFont);
  textAlign(LEFT);

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
    // on mouseover rectangle, make it brighter
    var rectwidth = map(headlines[i].length,minHeadLen, maxHeadLen, margin, width-margin*2);
    if (mouseX > margin && mouseX < margin+rectwidth && mouseY < margin+i*lineheight && mouseY > margin+i*lineheight+(-1*rectheight)) {
      fill(255, 204, 0); // orange
    } else {
      fill(120);
    }
    rect(0, i*lineheight, rectwidth, -1*rectheight)

    // draw headline
    fill(255);
    textSize(7);
    text(headlines[i], 0, i*lineheight);
  }

  // use a separate loop so it draws on top of everything else
  for (var i = 0; i < headlines.length; i++) {
    var rectwidth = map(headlines[i].length,minHeadLen, maxHeadLen, margin, width-margin*2);
    // show abstract on mouseover
    if (mouseX > margin && mouseX < margin+rectwidth && mouseY < margin+i*lineheight && mouseY > margin+i*lineheight+(-1*rectheight)) {
      fill(255, 204, 0); // orange
      rect(mouseX, mouseY, 400, 200);
      fill(0);
      textSize(20);
      text(abstracts[i], mouseX+10, mouseY+10, 400-20, 200-20); // 10px label padding
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

    append(abstracts, nytResponse.results[i].abstract);
  }

  // console.log(headlines); // make sure counted data looks as expected
  // console.log(maxHeadLen);
  // console.log(minHeadLen);
}