let slidertest;

function setup() {
  createCanvas(800, 800);
  background('red');
  frameRate(30);
let slidertest = createSlider(0, 255, 100);
slidertest.style('height', '100px');
slidertest.style('background', '#ff0000');
  spriteTest = createSprite(400, 400);
  spriteTest.addAnimation("test", 'FlagAnim/grassflaganim_1.png', 'FlagAnim/grassflaganim_2.png', 'FlagAnim/grassflaganim_3.png', 'FlagAnim/grassflaganim_4.png', 'FlagAnim/grassflaganim_5.png', 'FlagAnim/grassflaganim_6.png', 'FlagAnim/grassflaganim_7.png', 'FlagAnim/grassflaganim_8.png');
}

function draw() {
  clear();
  drawSprites();
  if(keyIsDown('KeyD')){
    console.log('D');
  }
}