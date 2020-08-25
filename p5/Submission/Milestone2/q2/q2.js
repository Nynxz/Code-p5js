let canvasSize = 500;

let cWidth = canvasSize*2, cHeight = canvasSize;
let rainbowColours = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let randomColours = ['red', 'blue', 'aqua', 'green', 'orange', 'purple', 'pink', 'yellow', 'fuchsia', 'lightblue'];
let christmasColours = ['red', 'red', 'green', 'green', 'white'];
let australianColours = ['green', 'green', 'yellow', 'yellow', 'white'];
let sliderPasses, sliderSegments, sliderThickness, sliderAmplitude, sliderLines, sliderOffset, sliderFPS;

function setup() {
    createCanvas(cWidth, cHeight);
    //#region SLIDERS
    sliderPasses = createSlider(1, 50, 10, 1);
    sliderPasses.style('width', '100px');
    sliderSegments = createSlider(0, 100, 10, 1);
    sliderSegments.style('width', '100px');
    sliderThickness = createSlider(1, 25, 5, 1);
    sliderThickness.style('width', '50px');
    sliderAmplitude = createSlider(0, 25, 15, 1);
    sliderAmplitude.style('width', '100px');
    sliderLines = createSlider(0, 100, 25, 1);
    sliderLines.style('width', '100px');
    sliderFPS = createSlider(.5, 30, 15, .5);
    sliderFPS.style('width', '30px');
    //#endregion
}

function draw() {   
    frameRate(sliderFPS.value());
    clear();
    background('black');
    drawLines(sliderPasses.value(), sliderSegments.value(), rainbowColours, sliderThickness.value(), sliderAmplitude.value(),sliderLines.value());
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
            curveVertex(-canvasSize/10, y);
            curveVertex(-canvasSize/10, y+ canvasSize/100);
            for(segment = 1; segment < segmentMax; segment++){
                curveVertex((width / segmentMax) * segment, y + Math.random() * amplitude * randomNeg);
            }
            curveVertex((width + canvasSize/10), y + canvasSize /100);
            curveVertex(width + canvasSize/10, y);
            endShape();
            console.log('line');
        }
    }
}