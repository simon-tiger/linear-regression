var cmScale = 37.795275591;
var data = [];

var maxX;
var maxY;

var m = 1;
var b = 0;

var learning_rate = 0.05;

function setup() {
  var canvas = createCanvas(480, 300);
  canvas.elt.style.border = "1px solid gray";
  maxX = width/2/cmScale;
  maxY = height/2/cmScale;
}

function linearRegression() {
  for (var i = 0; i < data.length; i++) {
    var x = data[i].x;
    var y = data[i].y;

    var guess = m * x + b;
    var error = y - guess;

    m += (error * x) * learning_rate;
    b += (error) * learning_rate;
  }

  learning_rate *= 0.98;
  learning_rate = max(learning_rate, 0.0007);
}

function draw() {
  background(255);

  for (var i = 0; i < data.length; i++) {
    var x = map(data[i].x, -maxX, maxX, 0, width);
    var y = map(data[i].y, -maxY, maxY, height, 0);
    fill(0);
    stroke(0);
    ellipse(x, y, 8, 8);
  }
  if (data.length > 1) {
    linearRegression();
    drawLine();
  }
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

function mousePressed() {
  var x = map(mouseX, 0, width, -maxX, maxX);
  var y = map(mouseY, 0, height, maxY, -maxY);
  var pt = createVector(x, y);

  data.push(pt);
}
