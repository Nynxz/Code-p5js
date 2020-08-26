let canvasSize =  800;
let trail;
let sliderlength, sliderspeed;

let debug = false;

function setup() {
    createCanvas(canvasSize, canvasSize);
    background('black');

    drawGrid();

    trail = new Trail(200, 0.02);

    sliderlength = createSlider(0, 200, 175, 1);
    sliderspeed = createSlider(0, 0.2, .02, .005);
    sliderX = createSlider(1, 16, 2, 1);
    sliderY = createSlider(1, 16, 6, 1);
}

function draw() {
    drawGrid();
    trail.UpdateInfo(sliderlength.value(), sliderspeed.value(), sliderX.value(), sliderY.value());
    trail.Next();
    trail.Draw();
}

function drawGrid(){
    strokeWeight(canvasSize/200);
    stroke('black');
    rectMode(CENTER);
    fill('grey');
    square(canvasSize/2, canvasSize/2, canvasSize * .9231, 60);
    fill('rgba(0,0,255, 0.4)');
    square(canvasSize/2, canvasSize/2, canvasSize * .8462, 30);
    
    for(x = 0; x <= 10; x++){
        for(y = 0; y <= 10; y++){
            line((x + 1.5) * (canvasSize * .07692), canvasSize * .1154, (x + 1.5) * (canvasSize * .07692),canvasSize - canvasSize * .1154);
            line(canvasSize * .1154, (y + 1.5) * (canvasSize * .07692), canvasSize - canvasSize * .1154, (y + 1.5) * (canvasSize * .07692));
        }
    }
}

class Trail {
    constructor(length, speed){
        this.x;
        this.y;
        this.length = length;
        this.speed = speed;

        this.sinX = x;
        this.cosY = y;

        this.inc = 0;
        this.history = [];
    }

    Next(){ 
        this.x = sin(this.inc*this.sinX) * (canvasSize * .3846) + canvasSize/2
        this.y = cos(this.inc*this.cosY) * (canvasSize * .3846) + canvasSize/2

        if(debug){
            console.log(this.x, this.y);
            console.log(this.history.length);
        }
        
        this.history.push({x: this.x, y:this.y});
        this.inc += this.speed;

        if(this.history.length > this.length){
            for(let i = this.history.length; i > this.length; i--){
                this.history.shift();
            }
        }
    }

    Draw(){
        for(let i = 0; i < this.history.length-1; i++){
            stroke(255,0,0, (255 / this.length) * i);
            point(this.history[i].x, this.history[i].y);
            line(this.history[i].x, this.history[i].y, this.history[i+1].x, this.history[i+1].y,);
        }
    }

    UpdateInfo(length, speed, sinX, cosY){
        this.length = length;
        this.speed = speed;
        if(this.sinX != sinX || this.cosY != cosY){
            this.history.splice(0, this.history.length);
            this.sinX = sinX;
            this.cosY = cosY;
        }
    }
}