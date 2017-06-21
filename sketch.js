var cmScale = 37.795275591;
var data = [];
var possibilities = [];

var maxX;
var maxY;

var m = 1;
var b = 0;

var reset;

function setup() {
  var canvas = createCanvas(480, 300);
  canvas.elt.style.border = "1px solid gray";
  makePossibilities();
  newPoints();
  reset = select("#reset");
  reset.mousePressed(newPoints);
}

function newPoints() {
  maxX = width/2/cmScale;
  maxY = height/2/cmScale;
  for (var i = 0; i < 11; i++) {
    var x = random(-maxX, maxX);
    var y = random(-maxY, maxY);
    var pt = {
      pos: createVector(x, y),
      index: i
    };

    data[i] = pt;
  }

  linearRegression();
}

function makePossibilities() {
  possibilities.push(color(255, 0, 0));
  possibilities.push(color(0, 255, 0));
  possibilities.push(color(0, 0, 255));
  possibilities.push(color(128, 128, 128));
  possibilities.push(color(255, 255, 0));
  possibilities.push(color(255, 0, 255));
  possibilities.push(color(0, 255, 255));
  possibilities.push(color(255, 255, 255));
  possibilities.push(color(150, 255, 150));
  possibilities.push(color(255, 150, 150));
  possibilities.push(color(150, 150, 255));
}

function linearRegression() {
  var totalX = 0;
  var totalY = 0;
  var totalPoints = 0;
  for (var i = 0; i < data.length; i++) {
    totalX += data[i].pos.x;
    totalY += data[i].pos.y;
    totalPoints++;
  }
  var avgX = totalX / totalPoints;
  var avgY = totalY / totalPoints;

  var numerator = 0;
  var denomenator = 0;
  for (var i = 0; i < data.length; i++) {
    var x = data[i].pos.x;
    var y = data[i].pos.y;
    numerator +=   (x - avgX) * (y - avgY);
    denomenator += (x - avgX) * (x - avgX);
  }

  m = numerator / denomenator;
  b = avgY - m * avgX;
}

function drawLine() {
  var x1 = -maxX;
  var y1 = m * x1 + b;
  var x2 = maxX;
  var y2 = m * x2 + b;

  x1 = map(x1, -maxX, maxX, 0, width);
  y1 = map(y1, -maxY, maxY, height, 0);
  x2 = map(x2, -maxX, maxX, 0, width);
  y2 = map(y2, -maxY, maxY, height, 0);

  strokeWeight(1);
  stroke(255, 0, 255);
  line(x1, y1, x2, y2);
}

function draw() {
  background(255);
  for (var i = 0; i < data.length; i++) {
    strokeWeight(8);
    stroke(possibilities[data[i].index]);
    var x = map(data[i].pos.x, -maxX, maxX, 0, width);
    var y = map(data[i].pos.y, -maxY, maxY, height, 0);
    point(x, y);
    if (data[i].index == 6) {
      strokeWeight(1);
      stroke(0);
      fill(255);
      ellipse(x, y, 8, 8);
    }
  }
  drawLine();
}
