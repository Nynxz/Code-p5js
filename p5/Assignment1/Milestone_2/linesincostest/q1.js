let canvasSize = 500
let centerX = 500/2;
let centerY = 500/2;
let lineCount = 15;
let boxHeight = 250;
let value;

function setup() {
  angleMode(DEGREES);
  slider = createSlider(0, 3600, 10, 1 );
  slider.position(width*5,0);
  slider.style('width', '250px');

    createCanvas(canvasSize,canvasSize);
    background("#555555");

}

function draw(){
  
  value = slider.value();
  fill(255,value % 255 ,value % 255);
  let center = width/2;
  //background("#555555");
  for(i = 0; i < 2; i++){
    //angleMode(DEGREES);
    circle(250 + sin(value) * 200, 250 + cos(value * i) * 200, 50);
  }
  
}