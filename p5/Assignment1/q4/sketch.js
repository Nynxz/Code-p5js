function setup() {
  createCanvas(525,550);
  background(115);
  slider = createSlider(-0.5, 0.5, 0.05, 0.01);
  slider.position(390, height - 20);

  slSize = createSlider(0, 200, 100, 10);
  slSize.position(260, height- 20);
  
  slX = createSlider(0, height, height/2, 10);
  slX.position(0, height- 20);
  slY = createSlider(0, width, width/2, 10);
  slY.position(130, height- 20);
}

function draw() {
  if(mouseIsPressed) {
    moveYingYang();
  }
  background(115); 
  drawYingYang(slider.value(), slX.value(), slY.value(), slSize.value());
  drawInformation();
}

function moveYingYang() {
  if(mouseY < 500){
  slX.value(mouseX);
  slY.value(mouseY);
  }
}
let movementTop = Math.PI;
let movementBottom = 0;
function drawYingYang(speed, posX, posY, size) {
  noStroke();
  fill('white');
  arc(posX,posY, size * 4,size * 4,HALF_PI - movementTop, PI - movementTop - HALF_PI);
  fill('black');
  arc(posX,posY, size * 4,size * 4,HALF_PI - movementBottom, PI - movementBottom + HALF_PI);
  circle(posX + sin(movementBottom) * size, posY + cos(movementBottom) * size, size * 2);
  fill('white');
  circle(posX + sin(movementTop) * size, posY + cos(movementTop) * size, size * 2);
  circle(posX + sin(movementBottom) * size, posY + cos(movementBottom) * size, size * .75);
  fill('black');
  circle(posX + sin(movementTop) * size, posY + cos(movementTop) * size, size * .75);
  movementTop += speed;
  movementBottom += speed;
}

function drawInformation() {
  text("X Position", 40, height - 20);
  text("Y Position", 170, height - 20);
  text("Size", 315, height - 20);
  text("Rotation Speed", 415, height - 20);
}