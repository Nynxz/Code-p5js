let canvasSize = 1300;
let trail;
function setup() {
    trail = new Array();
    createCanvas(canvasSize, canvasSize);
    background('black');

    drawGrid();
    
}

let inc = 0;
let i = 0;
function draw() {
    //frameRate(1);
    drawGrid();
    strokeWeight(10);
    stroke('red');

    if(i > 50){ trail.shift();}
    trail[i] = {x: sin(inc*2) * 500 + canvasSize/2, y: cos(inc*6) * 500 + canvasSize/2};


    for(q = 0;q < trail.legnth-1; q++){
        point(trail[q].x, trail[q].y);
    }

    trail.forEach(dot => {
        point(dot.x, dot.y);
    });
    trail.length = 50
    console.log(trail.length);
    //point(sin(inc*2) * 500 + canvasSize/2, cos(inc*6) * 500 + canvasSize/2);
    inc += 0.01;
    i <= 50 ? i++ : i=0;
}

function drawGrid(){
    stroke('black');
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

class TrailPoint{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}