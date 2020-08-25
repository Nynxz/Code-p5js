let canvasSize = 1300;

function setup() {
    createCanvas(canvasSize, canvasSize);
    background('black');

    drawGrid();
    
}

let inc = 0;

function draw() {
    drawGrid();
    strokeWeight(10);
    point(sin(inc*2) * 500 + canvasSize/2, cos(inc*6) * 500 + canvasSize/2);
    inc += 0.002;
}

function drawGrid(){
    rectMode(CENTER);
    fill('grey');
    square(canvasSize/2, canvasSize/2, 1200, 60);
    fill('rgba(0,255,0, 0.1)');
    square(canvasSize/2, canvasSize/2, 1100, 30);
    
    for(x = 0; x <= 10; x++){
        for(y = 0; y <= 10; y++){
            line((x + 1.5) * 100, 150, (x + 1.5) * 100, canvasSize-150);
            line(150, (y + 1.5) * 100, canvasSize - 150, (y + 1.5) * 100);
        }
    }
}