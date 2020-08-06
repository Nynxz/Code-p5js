let gX = 600;
let gY = 600;

function setup() {
    noStroke();
  createCanvas(gX, gY); 
  background(200);

  rectMode(CORNER);
}

function draw() {
    firstPart();
}

function firstPart(){ 
    fill('red');
   rect(0,0,gX, gY / 6 * 1);
    hLines = 10;

    fill('blue');
    let rY = 0;
    for(i = 0; i < hLines; i ++) {
    rect(0, rY, gX, rY + ((gY / 6) / hLines));
   // rY += ;
   }
   /*
   rect(0, 0, 600, 200);
   fill('red');
   rect(0, 10, 600, 10);
    */
}