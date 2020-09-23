let player;
let shipimg;

let controls;
function preload(){
    shipimg= loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/Ships/Player/Player_Blue_Off.png');
}

function setup(){
    controls = new Controls();
    frameRate(60)
    createCanvas(1000, 1000);
    background(125);
    player = new Player(shipimg);
    player.drawPlayer(width/2, height/2);

}

function draw(){
    let inputV = controls.retInputVector()
    background(125);
    player.movePlayer(inputV, 10);
    drawSprites();
}