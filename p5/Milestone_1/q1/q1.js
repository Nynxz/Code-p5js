let numSquares, slider;

function setup() {

    let hun = 100;
    let top = 300;

    for(let i = 0; i < 10; i++){
      print(top - hun + (top-hun/10*i));
    }
  

  slider = createSlider(0, 16, 5, 1);
  slider.position(0, 250);
  slider.style('width', '250px');
}

function draw() {
    numSquares = slider.value();
    createCanvas(numSquares * 100, 250);
    background("#6569fb");
    for(i = 0; i < numSquares; i++) {
      fill(color(0, 225, 175, (255/numSquares * (i + 1))));
      square(100 * i + 12.5, 87.5, 75, 15);
    }
}