let canvasSize = 1000

let cWidth = canvasSize, cHeight = canvasSize;
let colours = ['red','blue','aqua','green','orange','purple','pink','yellow'];
let time = 0;

let ColourObject = {
    Red: 'red',
    Blue: 'blue',
    Aqua: 'aqua',
    Green: 'green',
    Orange: 'orange',
    Purple: 'purple',
    Pink: 'pink',
    yellow: 'yellow'
}

function setup() {
    createCanvas(cWidth, cHeight);
    background('grey');
    for(i in colours){
        console.log(colours[i]);
    }
    
    

}

function draw(){
    frameRate(0);
    strokeWeight(canvasSize/25);
    noFill();
    for(y = 0, col = 0, sinInc = 0; y < 1; y+= 25, col++, time++){
        stroke
        stroke(colours[col % colours.length]);
        beginShape();
        curveVertex(-10,map(noise(time), 0, 1, y-1000, y+1000));
        curveVertex(0, map(noise(time), 0, 1, y-10, y+10));
        curveVertex(map(noise(mouseX),0,1,cWidth/2+cWidth/10, cWidth/2-cWidth/10),map(noise(time*4), 0, 1, y-100, y+100));
        curveVertex(cWidth, map(noise(time*2), 0, 1, y-100, y+100));
        curveVertex(cWidth, map(noise(time*3), 0, 1, y-10, y+10));
        endShape();
    }
}