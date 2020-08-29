let canvasSize = 500;

let cWidth = canvasSize*2, cHeight = canvasSize;
let rainbowColours = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let randomColours = ['red', 'blue', 'aqua', 'green', 'orange', 'purple', 'pink', 'yellow', 'fuchsia', 'lightblue'];
let christmasColours = ['red', 'red', 'green', 'green', 'white'];
let australianColours = ['green', 'green', 'yellow', 'yellow', 'white'];

function setup() {
    createCanvas(cWidth, cHeight);
    SLIDERS();
}

function draw() {   
    frameRate(sliderFPS.value());
    clear();
    background('black');
    drawLines(sliderPasses.value(), sliderSegments.value(), dropdownOptions(dropdownColours.value()), sliderThickness.value(), sliderAmplitude.value(),sliderLines.value());
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
        }
    }
}

function dropdownOptions(dropdown){
    switch(dropdown){
        case 'Rainbow':
            return rainbowColours;
        case 'Random':
            return randomColours;
        case 'Christmas':
            return christmasColours;
        case 'Australian':
            return australianColours;
    }
}


function SLIDERS(){
        //#region SLIDERS
        sliderPasses = createSlider(1, 50, 10, 1);
        sliderPasses.style('width', '100px');
        sliderPasses.position(100,500);
        PassesText = createP('Passes');
        PassesText.position(25,485);
        sliderSegments = createSlider(0, 100, 10, 1);
        sliderSegments.style('width', '100px');
        sliderSegments.position(100,525);
        SegmentsText = createP('Segments');
        SegmentsText.position(25,510);
        sliderThickness = createSlider(1, 25, 20, 1);
        sliderThickness.style('width', '50px');
        sliderThickness.position(100,550);
        ThicknessText = createP('Thickness');
        ThicknessText.position(25,535);
        sliderAmplitude = createSlider(0, 25, 15, 1);
        sliderAmplitude.style('width', '100px');
        sliderAmplitude.position(100,575);
        AmplitudeText = createP('Amplitude');
        AmplitudeText.position(25,560);
        sliderLines = createSlider(0, 100, 25, 1);
        sliderLines.style('width', '100px');
        sliderLines.position(100,600);
        LinesText = createP('Lines');
        LinesText.position(25,585);
        sliderFPS = createSlider(.5, 30, 0  , .5);
        sliderFPS.style('width', '30px');
        sliderFPS.position(100,625);
        FPSText = createP('FPS');
        FPSText.position(25,610);
    
        dropdownColours = createSelect();
        dropdownColours.position(220,500);
        dropdownColours.option('Rainbow');
        dropdownColours.option('Random');
        dropdownColours.option('Christmas');
        dropdownColours.option('Australian');
        //#endregion
}