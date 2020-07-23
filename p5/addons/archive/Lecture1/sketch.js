function createBox(x, y, size, colour) {
  color(colour)
  square(x, y, size)
  
}

function setup() {

  createCanvas(400,400);
  background(200);

  createBox(mouseX,mouseY,100,'blue');


}

function draw() {
  ellipse(mouseX, mouseY, 20, 20);

  console.log(mouseX + " " + mouseY)

}


function clickInteract(mouseX, mouseY, buttonTopLeft, buttonTopRight){

}