function setup() {
  createCanvas(525,550);
  background(115);

  //#region Sliders
  slSpeed = createSlider(-0.5, 0.5, 0.05, 0.01);
  slSpeed.position(390, height - 20);

  slSize = createSlider(0, 200, 100, 1);
  slSize.position(260, height- 20);
  
  slX = createSlider(0, width, width/2, 1);
  slX.position(0, height- 20);
  slY = createSlider(0, height, height/2 - 25, 1);
  slY.position(130, height- 20);

  //#endregion
}

function draw() {
 if(mouseIsPressed) {
    moveYingYang();
  }
  background(115); 
  drawInformation();

  drawYingYang(slSpeed.value(), slX.value(), slY.value(), slSize.value());

}

function moveYingYang() {
  if(mouseY < 500){
    slX.value(mouseX);
    slY.value(mouseY);
  }
}

let angleTop = Math.PI;
let angleBottom = 0;
function drawYingYang(speed, posX, posY, size) {
  noStroke();
  fill('white');

  //X, Y, Radius, Start, End
  arc(posX,posY, size * 4,size * 4,HALF_PI - angleTop, PI - angleTop + HALF_PI);
  fill('black');
  arc(posX,posY, size * 4,size * 4,HALF_PI - angleBottom, PI - angleBottom + HALF_PI);
  
  circle(posX + sin(angleBottom) * size, posY + cos(angleBottom) * size, size * 2);
  fill('white');
  circle(posX + sin(angleTop) * size, posY + cos(angleTop) * size, size * 2);
  circle(posX + sin(angleBottom) * size, posY + cos(angleBottom) * size, size * 0.75);
  fill('black');
  circle(posX + sin(angleTop) * size, posY + cos(angleTop) * size, size * 0.75);
  
  angleTop += speed;
  angleBottom += speed;
}

function drawInformation() {
  text("X Position", 40, height - 20);
  text("Y Position", 170, height - 20);
  text("Size", 315, height - 20);
  text("Rotation Speed", 415, height - 20);
}