let canvasSize = 250;

let cWidth = canvasSize*2, cHeight = canvasSize;
let rainbowColours = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let randomColours = ['red', 'blue', 'aqua', 'green', 'orange', 'purple', 'pink', 'yellow', 'fuchsia', 'lightblue'];
let christmasColours = ['red', 'red', 'green', 'green', 'white'];
let australianColours = ['green', 'green', 'yellow', 'yellow', 'white'];


function setup() {
    createCanvas(cWidth, cHeight);
    //background('grey');
}

function draw() {
    frameRate(0);
    
    drawLines(5, 5, randomColours, 5, 4, randomColours.length*3);
}

function drawLines(passes,segmentMax, colourPreset, thicknessModifer, amplitude, lineCount){
    noFill();
    strokeWeight(canvasSize / 250 * thicknessModifer);
    amplitude = canvasSize / 50 * amplitude;
    for (pass = 0; pass < passes; pass++) {
        for (y = 0, col = 0; y < height; y += canvasSize / lineCount, col++) {
            let randomNumber = Math.random();
            let randomNeg = randomNumber * 2 > 1 ? -1 : 1;
            stroke(colourPreset[col % colourPreset.length]);
            beginShape();
            curveVertex(-25, y);
            curveVertex(-25, y+ canvasSize/100);
            for(segment = 1; segment < segmentMax; segment++){
                curveVertex(width / segmentMax * segment, y + Math.random() * amplitude * randomNeg);
            }
            curveVertex(width +25, y + canvasSize /100);
            curveVertex(width +25, y);
            endShape();
            console.log('line');
        }
    }
}