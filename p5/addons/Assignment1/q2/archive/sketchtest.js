let dictDa = {'Comedy': 4, 'Action': 5, 'Romance': 6, 'Drama': 1, 'SciFi': 4};

function dictData360(dict) {
    let total = 0;
    let data360 = [];
    for(let key in dict) {
        total += dict[key];
    }

    let multiZ = 360 / total;

    for(let key in dict) {
       let value = dict[key];
       data360.push([value * multiZ]);
    }
    return data360;
}

let angles360 = dictData360(dictDa);



function setup() {
  createCanvas(500, 500);
}

function draw() {
    background(210);
    pieChart(300, angles360);
}

function pieChart(diameter, data) {
    let lastAngle = 0;
    for(let i = 0; i < data.length; i++) {
        let gray = map(i, 0, data.length, 0 ,255);
        fill(25, 25, 145, gray);
        arc(width /2,
            height / 2,
            diameter,
            diameter,
            lastAngle,
            lastAngle + radians(angles360[i])
            );
            lastAngle += radians(angles360[i]);
        }
}