// Daniel Shiffman
// https://github.com/shiffman

// https://api.mapbox.com/styles/v1/mapbox/streets-v8/static/0,0,2/600x600?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MDJ0Mjk5MDQ1dzJ3bzRiM29zaW16ayJ9.guiqnHMGUq196Zxa1d3UPg

var mapimg;
var zoom = 1;
var data;
var ww = 900;
var hh = 900;
var clat = 0; //37.7749;
var clon = 0; //-122.4194;
var ACCESS_TOKEN = "pk.eyJ1Ijoia3JhZGVraSIsImEiOiJjamZsYWtxdjEwZzRxMnFtc3c2MXl3bjJkIn0.YSEJcffdjYWcwOU4lEQ2YQ";

function preload() {
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' + clon + ',' + clat + ',' + zoom + '/' + ww + 'x' + hh + '?access_token=' + ACCESS_TOKEN);
  data = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

// Web Mercator Math
// https://en.wikipedia.org/wiki/Web_Mercator
function mercX(lon) {
  lon = radians(lon);
  return (256 / PI) * pow(2, zoom) * (lon + PI);
}

function mercY(lat) {
  lat = radians(lat);
  return (256 / PI) * pow(2, zoom) * (PI - log(tan((PI / 4.0) + (lat / 2.0))));
}

function webMercX(lon, zoom) {
  lon = radians(lon);
  var w = 256; //width / 2;
  var a = (w / PI) * pow(2, zoom);
  var b = (lon + PI);
  return a * b;
}

function webMercY(lat, zoom) {
  lat = radians(lat);
  var w = 256; //height / 2;
  var a = (w / PI) * pow(2, zoom);
  var c = tan(PI / 4 + lat / 2);
  var b = PI - log(c)
  return a * b;
}


function setup() {
  createCanvas(ww, hh);
  angleMode(RADIANS);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  var cx = webMercX(clon, zoom);
  var cy = webMercY(clat, zoom);

  //37.7749° N, 122.4194° W


  var lat = 40.7128;
  var lon = -74.0059;
  var x = webMercX(lon, zoom) - cx;
  var y = webMercY(lat, zoom) - cy;
  noStroke();
  fill(255, 0, 0, 200);
  ellipse(x, y, 32, 32);

  fill(255, 0, 0, 200);
  ellipse(cx - cx, cy - cy, 32, 32);


  for (var i = 1; i < data.length; i++) {
    var stuff = data[i].split(/,/);
    console.log(stuff[1], stuff[2]);
    var lat = Number(stuff[1]);
    var lon = Number(stuff[2]);
    var x = webMercX(lon, zoom) - cx;
    var y = webMercY(lat, zoom) - cy;
    noStroke();
    fill(255, 0, 0, 200);
    ellipse(x, y, 4, 4);
  }
}