/*
Type        Count

Comedy      4
Action      5
Romance     6
Drama       1
SciFi       4

            20
*/

//let dictDa = {'Comedy': 4, 'Action': 5, 'Romance': 6, 'Drama': 1, 'SciFi': 4};

let angles = [4, 5, 6, 1 , 4, 11, 5 , 8];
let annotate;
function data360(data) {
    let total = 0;
    for(let i = 0; i < data.length; i++) {
        total += data[i];
    }
    let multiZ = 360 / total;
    for(let i = 0; i <data.length; i++){
        data[i] = data[i] * multiZ;
    }
    return data;
}

function setup() {
  createCanvas(500, 500);
  annotate = createGraphics(500, 500);
  angles = data360(angles);
}

function draw() {
    background(210);
    pieChart(300, angles);
    image(annotate, 0, 0);
}

function pieChart(diameter, data) {
    let lastAngle = 0;
    textSize(32);
    for(let i = 0; i < data.length; i++) {
        let gray = map(i, 0, data.length, 0 ,255);
        fill(25, 25, 145, gray);
        arc(width /2,
            height / 2,
            diameter,
            diameter,
            lastAngle,
            lastAngle + radians(angles[i])
            );
            lastAngle += radians(angles[i]);
            annotate.text(data[i], i * i, i * i);
    }
}