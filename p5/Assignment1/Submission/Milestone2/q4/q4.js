function preload() {
    Cloud = new NodeCloud(8, 6, 0.8, 50);
    smallCloud = new NodeCloud(6, 3, 2, 25);
    GriffithLogo = loadImage('https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_310/https://www.aeccglobal.my/wp-content/uploads/2020/05/griffith-logo.png');
    p5Logo = loadImage('https://hello.p5js.org/assets/p5-sq-reverse.svg');
}

function setup() {
    createCanvas(1000, 500);
    background(200);
    Cloud.generateNodes();
    smallCloud.generateNodes();
    //#region SLIDERS
    dropdownMode = createSelect();
    dropdownMode.position(100, height + 50);
    dropdownMode.option('closest');
    dropdownMode.option('segments');

    maxDistselect = createSlider(0, 1000, 175, 1);
    maxDistselect.hide();
    DDmaxDisSpawned = false;
    //#endregion
}

function draw() {
    clear();
    background(200);
    
    smallCloud.connectNodes('white', 0.5, dropdownMode.value(), maxDistselect.value() * 2);
    smallCloud.drawNodes('white', 1);
    smallCloud.moveNodes();
    Cloud.connectNodes('black', 1, dropdownMode.value(), maxDistselect.value());
    Cloud.drawNodes('LightCoral', 5);
    Cloud.moveNodes();

    GrowLogoAndText();

    //#region SLIDERS
    if (dropdownMode.value() == 'closest' && !DDmaxDisSpawned) {
        maxDistselect.show();
        maxDistselect.position(200, height + 45);
        DDmaxDisSpawned = true;
    } else if (dropdownMode.value() != 'closest' && DDmaxDisSpawned) {
        maxDistselect.hide();
        DDmaxDisSpawned = false;
    }
    //#endregion
}

let scaleIncr = 0;
function GrowLogoAndText(){
    fill('rgba(25,25,25, 0.5)');
    rect(0, 330, 620 * scaleIncr, 200);
    textStyle(BOLD);
    fill('Red');
    textSize(64 * scaleIncr);
    text('1701ICT', 10, 400);
    text('CREATIVE CODING', 10, 464);
    image(GriffithLogo, width - (320*scaleIncr), 190);
    scale(1/6,1/6);
    image(p5Logo, -200 + (220 * scaleIncr), 468*6);
    scaleIncr < 1 ? scaleIncr+=.005 : 1;
}


class NodeCloud {
    constructor(segmentCount, segmentMax, maxSpeed, maxSize) {
        this.nodes = [];
        this.segmentCount = segmentCount;
        this.segmentMax = segmentMax
        this.maxSpeed = maxSpeed
        this.maxSize = maxSize
    }

    generateNodes() {
        this.nodes.splice(0, this.nodes.length);
        for (let segments = 0; segments < this.segmentCount; segments++) {
            let nodesInSegment = Math.floor(Math.random() * this.segmentMax + 1);
            for (let i = 0; i < nodesInSegment; i++) {
                this.nodes.push({
                    segment: segments,
                    node: new Node(
                        width / this.segmentCount * segments + (width / this.segmentCount / 2),
                        height / nodesInSegment * i + (height / nodesInSegment / 2),
                        this.maxSpeed,
                        Math.random() * this.maxSize + 10)
                });
            }
        }
        console.log('generating nodes.. ', this.nodes);
    }

    drawNodes(colour) {
        fill(colour);
        noStroke();
        for (let i = 0; i < this.nodes.length; i++) {
            circle(this.nodes[i].node.x, this.nodes[i].node.y, this.nodes[i].node.size);
        }
    }

    connectNodes(strokeColour, strokeWeightVal, mode, maxDist) {
        strokeWeight(strokeWeightVal);
        stroke(strokeColour);
        if (mode == 'segments') {
            for (let i = 0, q = 0; i < this.nodes.length - 1;) {
                if (this.nodes[i].segment + 1 == this.nodes[q].segment) {
                    this.drawLine(i, q);
                    if (q == this.nodes.length - 1) {
                        q = 0;
                        i++;
                    } else { q++; }
                } else if (this.nodes[i].segment + 2 == this.nodes[q].segment || q == this.nodes.length - 1) {
                    q = 0;
                    i++;
                } else { q++; }
            }
        } else if (mode == 'closest') {
            for (let i = 0; i < this.nodes.length; i++) {
                for (let j = 0; j < this.nodes.length; j++) {
                    if (dist(this.nodes[i].node.x, this.nodes[i].node.y, this.nodes[j].node.x, this.nodes[j].node.y) < maxDist) {
                        this.drawLine(i, j);
                    }
                }
            }
        }
    }

    moveNodes() {
        for (let i = 0; i < this.nodes.length; i++) {
            for(let j = 0; j < this.nodes.length; j++){
                if(i != j && dist(this.nodes[i].node.x,this.nodes[i].node.y,this.nodes[j].node.x,this.nodes[j].node.y ) <= this.nodes[i].node.size/2 + this.nodes[j].node.size/2 ){
                    this.nodes[i].node.motion.x *= -1;
                    this.nodes[i].node.motion.y *= -1;
                }
            }
            this.nodes[i].node.moveNode();
        }
    }

    drawLine(i, q) {
        noFill();
        beginShape();
        vertex(this.nodes[i].node.x, this.nodes[i].node.y);
        vertex(this.nodes[q].node.x, this.nodes[q].node.y);
        endShape();
    }
}

class Node {
    constructor(x, y, speed, size) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;

        this.motion = createVector((Math.random() * 2 - 1) * speed, (Math.random() * 2 - 1) * speed);
    }

    moveNode() {
        this.x += this.motion.x;
        this.y += this.motion.y;
        if (this.x > width - (this.size/2) || this.x < 0 + (this.size/2)) {
            this.motion.x *= -1;
        }
        if (this.y > height - (this.size/2) || this.y < 0 + (this.size/2)) {
            this.motion.y *= -1;
        }
    }
}