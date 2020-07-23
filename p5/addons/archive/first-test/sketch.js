function setup() {
  createCanvas(400,400);
}

function draw() {
  background(220);
  for(i = 0; i < 400; i++) {
    for(x = 0; x < 400; x++)
    if(i % 2 == 0 ) {
      // stroke(x * i)
      stroke(x * i * 5 / mouseX, i * x / i * mouseY, i * mouseY * x / 22)
      point(x, i);
    }
  }
}