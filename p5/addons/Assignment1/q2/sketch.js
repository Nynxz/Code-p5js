let DATA = {'Comedy': 4, 'Action': 5, 'Romance': 6, 'Drama': 1, 'SciFi': 4};

let angles360 = dictData360(DATA);
let names = nameGrabber(DATA);
let counts = countGrabber(DATA);
let percent100 = percentageData(angles360);
let button;

function setup() {
    buttond = createButton('New Colours');
    buttond.position(15, 465);
    buttond.mousePressed(setup);
    createCanvas(500, 500);
    background(45);
    fill(200);
    textSize(20);
    text("Favorite Type of Movie", 280, 25);
    //text("Refresh for Different Colours", 5, 490);
    showPie(angles360, 350);

    //Draws labels
    labelDraw();
}
function dictData360(dict) {
    let data360 = [];
    let total = 0;

    for(let key in dict) {
        total += dict[key];
    }
    for(let key in dict) {
       let value = dict[key];
       data360.push([value * 360 / total]);
    }

    return data360;
}
function percentageData(dict) {
    let percents = [];
    for(i = 0; i < dict.length; i++) {
        percents.push(dict[i] / 360 * 100); 
    }
    return percents;
}
function nameGrabber(dict) {
    let names = [];
    for(let key in dict){
        names.push(key);
    }
    return names;
}
function countGrabber(dict) {
    let counts = [];
    for(let key in dict){
        counts.push(dict[key]);
    }
    return counts;
}
function showPie(data, size) {
    let angle = 0;
    for(let i = 0; i < data.length; i++) 
    {
        fill(random(55,255),random(55,255),random(55,255));
        arc(height/2, width/2, size, size, angle, angle + radians(angles360[i]));
        angle += radians(angles360[i]);
        
        //Legend Draw
        square(0, 25 * (i), 25);
        textSize(15);
        text("[" + counts[i] + "]" + names[i] + " " + Math.round(percent100[i]) + "%", 25 , (25 * (i + .75)));
    }
}

function labelDraw() { 
    fill(0);
    translate(width/2, height/2);
    for(let i = 0; i < names.length; i++) {   
        rotate(radians(angles360[i]));
        text(names[i] + " " + Math.round(percent100[i]) + "%", 55, 0)
    }
}

