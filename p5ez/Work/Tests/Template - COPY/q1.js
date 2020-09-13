const WIDTH = 500, HEIGHT = 500;
var grass, road, finishline;
var car, carIMG
let TILESIZE;
let tileSplit;

function preload() { //Preload all our assets so that they are ready.
    track = loadStrings('assets/track.txt'); //Load our single track.txt
    grass = loadImage('assets/grass.png');
    road = loadImage('assets/road.png');
    finishline = loadImage('assets/finishline.png');
    carIMG = loadImage('assets/car.png');
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    responsiveSpriteSize(50, 50, 40, 40); // #1
    createMap();

    let tileSplit = track.map(line => line.split('')); //currentValue = array[index]
    console.log(tileSplit);

    car = createSprite(250, 150);
    car.addImage(carIMG);
}

//Resizing all sprites made easy, customizable and can be responsive. They need to be SQUARE (e.g 32x32) #1
function responsiveSpriteSize(tileSize, carSizeX, carSizeY) {
    carIMG.resize(carSizeX, carSizeY);
    grass.resize(tileSize, tileSize);
    road.resize(tileSize, tileSize);
    finishline.resize(tileSize, tileSize);

    TILESIZE = tileSize;
}

function createMap() {
    for(y = 0; y < tileSplit.length; y++) {
        for(x = 0; x < tileSplit[y].length; x++) {
        makeTile(x, y, tileSplit[y][x]);
        }
    }
}

function makeTile(xPos, yPos, tileID) {
    newTile = createSprite((xPos * TILESIZE) + (TILESIZE / 2), (yPos * TILESIZE) + (TILESIZE / 2))
        switch(tileID){
            case "0":
                newSprite.addImage(grass);
            break;
            case "1":
                newSprite.addImage(road);
            break;
            case "2":
                newSprite.addImage(finishline);
            break;
        }
}

function gameLogic () {
    if(keyWentDown('x') || (keyWentDown('s'))){
        car.velocity .y = 0.5;
    }
    /*
    The program should allow for 4 inputs – up/down and left/right on the keyboard. Up
    and down should modify the velocity of the car (you should impose limits so it
    cannot go too fast or backwards). Left and right should rotate the angle it is facing
    and moving. This should be done in a smooth way so the car cannot execute instant
    90 degree turns.

    If the car leaves the track and hits the grass, the game should reset to the start
    position (simply move the car back to its initial position)
    */
}

function raceCar () {
    /*
    The program should draw a car as a sprite on the start finish line, facing one of the
    adjacent road tiles. You could draw or find a suitable image to use. The car size
    should be controlled by a variable (but always smaller than the tile size) and be
    placed in the middle of the road
    */
}

function extraMarks () { //3 Marks probs = 3 features
    /*
    Add additional features to your mini-game – car physics, animation,
    sound, gameplay mechanics, track features, or other
    */
}

function draw() {
    background(200);
    gameLogic();
    raceCar();
    drawSprites();
}