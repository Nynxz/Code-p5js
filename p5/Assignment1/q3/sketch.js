/*
NOTES -- 
    THIS ISNT 'REAL' in the ways blue should be overlapping red at the same speed
    mapping 0 - 1 where 1 is no real value - map to something real
*/

let sliderBlue, sliderRed, currentBlue = 0, currentRed = 0;
function setup() {

    //Creating the ground
    createCanvas(500, 500);

    sliderRed = createSlider(0, 0.25, .05, .005);
    sliderRed.position(25,0);
    sliderBlue = createSlider(0, 0.25, .05, .005);
    sliderBlue.position(25,25);
}

function draw() {
    drawRaceTrack();
    drawPlayerRed(111 , 61);
    drawPlayerBlue(90, 40);
    sliderExtras();
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

function drawRaceTrack() {
    //Resetting the grass
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

function drawPlayerBlue(x, y, speed) {
    fill('blue');
    noStroke();
    circle(width/2 + x * cos(currentBlue),height/2 + y * sin(currentBlue), 18);
    currentBlue += sliderBlue.value();
}

function drawPlayerRed(x, y, speed) {
    fill('red');
    noStroke();
    circle(width/2 + x * cos(currentRed),height/2 + y * sin(currentRed), 18);
    currentRed += sliderRed.value();
}
