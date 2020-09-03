function setup() {
  createCanvas(500, 500);
  background(75);
  stroke('white');

}

function draw() {
   // background(75);
    line(width/2, 0, width/2, height);
    line(0, height/2, width, height/2);

    drawCircle();
}

let angle = 0;
function drawCircle() {
    fill(angle / angle % 255);

    angleMode(DEGREES);
    let centerX = width/2;
    let centerY = height/2;
    let radius = 150;

    let x = radius * sin(angle);
    let y = radius * tan(angle);

    ellipse(centerX + x, centerY + y, 20, 20);
    angle++;
}