let sliderBlue, sliderRed;
let playerRed, playerBlue;

function setup() {

    playerRed = new Player(110, 60, color('red'));
    playerBlue = new Player(-90, -40, color('blue'))
    
    
    createCanvas(500, 500);

    //#region Sliders
    sliderRed = createSlider(-0.25, 0.25, 0.05, 0.005);
    sliderRed.position(25,0);
    sliderBlue = createSlider(-0.25, 0.25, 0.075, 0.005);
    sliderBlue.position(25,25);
    //#endregion
}

function draw() {
    drawRaceTrack();
    playerBlue.drawPlayer(sliderBlue.value());
    playerRed.drawPlayer(sliderRed.value());
    sliderExtras();
}


function drawRaceTrack() {
    background('green');
    //Setting stroke to grey with a weight of 40, no fill so its 'hollow'
    stroke('#757575');
    strokeWeight(40);
    noFill();
    //Drawing the main track
    ellipse(height/2, width/2, 200, 100);
    //Setting stroke to yellow and weight to 1, to draw the track markings
    stroke('yellow');
    strokeWeight(1);
    //Drawing 2 ellipses
    ellipse(height/2, width/2, 205, 100);
    ellipse(height/2, width/2, 200, 95);
}

function sliderExtras() {
    fill('red');
    square(5,2.5,15)
    fill('blue');
    square(5,25,15);
    fill('black');
    text(map(sliderRed.value(),0,0.25,0,1), 160, 12.5);
    text(map(sliderBlue.value(),0,0.25,0,1), 160, 35);
}


class Player {
    constructor(x, y, color){
        this.xVar = x;
        this.yVar = y;
        this.colorVar = color;
        this.current = 0;
        this.incr = 0;
    }

    drawPlayer(slider){
        this.incr = slider;
        fill(this.colorVar);
        noStroke();
        circle(width/2 + this.xVar * cos(this.current),height/2 + this.yVar * sin(this.current), 18);
        this.current += this.incr;
    }
}
