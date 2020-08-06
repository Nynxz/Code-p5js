
//Data given
let DATA = {'Comedy': 4, 'Action': 5, 'Romance': 6, 'Drama': 1, 'SciFi': 4};

//Saves the returned array to be accessed.
let angles360 = dictData360(DATA);
let names = nameGrabber(DATA);
let counts = countGrabber(DATA);
let percent100 = percentageData(angles360);
//Init a var for annotation canvas
//let annotate;


function setup() {
    createCanvas(500, 500);
    background(45);
    fill(200);
    textSize(20);
    text("Favorite Type of Movie", 280, 25);
    text("Refresh for Different Colours", 5, 490);
    pieInfo(angles360);
}

//Transform data to be used for 360 degrees
//Sort of a 'map dictionary' to 360
function dictData360(dict) {
    //Array to be returned
    let data360 = [];

    //Getting the total of all values from a key:value dictionary
    let total = 0;
    for(let key in dict) {
        total += dict[key];
    }

    //<<<<<<< This does a thing that works
    let mapZ = 360 / total;

    //Pushing a modified value to the new array to be returned
    for(let key in dict) {
       let value = dict[key];
       data360.push([value * mapZ]);
    }
    //Returning modified array
    return data360;
}
function percentageData(dict) {
    let percents = [];
    for(i = 0; i < angles360.length; i++) {
        percents.push(angles360[i] / 360 * 100); 
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
//Modified (p5.js example 'Pie Chart')
function pieInfo(data) {
    let angle = 0;
    for(let i = 0; i < data.length; i++) 
    {
        fill(random(55,255),random(55,255),random(55,255));
        /*
            Setting the arc to be in the center of the canvas,
         with a size of 300x300px, angle is setting the start of
         the arc to 0 on the first angle and setting the end of the
         arc to 'angle + radian(angles360[i])' where angles360 is the
         converted value of the data given, mapped to 360 to get the angle
         we use radians because the reference says 
         
        */
        arc(height/2, width/2, 300, 300, angle, angle + radians(angles360[i]));
        //We need to keep track of where we are up to
        angle += radians(angles360[i]);
        
        //For generating the legend square and info
        square(0, 25 * (i), 25);
        textSize(15);
        text("[" + counts[i] + "]" + names[i] + " " + Math.round(percent100[i]) + "%", 25 , (25 * (i + .75)));
    }
}


//Notes
//NEED TO DO
    //ROTATE TEXT ONTO SLICES?
    //NO IDEA HOW
