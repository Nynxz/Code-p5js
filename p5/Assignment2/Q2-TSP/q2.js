let STRETCHPROBLEM = true;
let loadedTSP, loadedSOL;
//a280 berlin52 ch150
let problem  = 'a280';
let scalex, scaley;
let PADDING = 75;

let moveSpeed = 0.1;
let loadedBOOL = false;

let monoMan;
let probleminput;
let monoManTrail;
let drawMonoManBOOL = true;
function dropdown(){
    if(probleminput === undefined){
    probleminput = createInput(problem);
    probleminput.input(inputChange);
    drawmonomancheckbox = createCheckbox('Draw Monopoly Man', drawMonoManBOOL);
    drawmonomancheckbox.changed(function() {
        drawMonoManBOOL = this.checked() ? true : false;
    });
    animatecheckbox = createCheckbox('Animate', true);
    animatecheckbox.changed(function(){
        if(this.checked() == true){
            drawmonomancheckbox.show();
        } else {
            drawmonomancheckbox.hide();
        }
        loadedBOOL = this.checked() ? true : false;
        if(loadedBOOL){
           
        }
    });
    strechcheckbox = createCheckbox('Strech', STRETCHPROBLEM);
    if(animatecheckbox.value = true){
        
    }
    
    strechcheckbox.changed(function(){
        lerpI = 0;
        targetI = 1;
        monoManTrail = new Array();
        STRETCHPROBLEM = this.checked() ? true : false});
}
}
function inputChange(){
    removeSprite(monoMan);
    clear();
    problem = this.value();
    loadedSOL = new Object();
    setup();
    monoManTrail = new Array();
    lerpI = 0;
    targetI = 1;
}

function preload() {
    monomanimg = loadImage('assets/monoman.png');
}

function setup(){
    frameRate(60);
    noLoop();
    dropdown();
    startTSP(problem);
    startCanvas(1000, 1000);
    loadedBOOL = false;
    //RAWTSP > Object > Display()
}

function draw(){
    if(loadedBOOL){
        background(100);
        showLoadedTSP(loadedTSP);
        showSolutionTSP(loadedSOL, loadedTSP);
        newMoveMan();
        if(drawMonoManBOOL){
            drawSprites();
        }
    }
}
function startTSP(problem){
    loadStrings('TSP_EUC_PROBLEMS/' + problem + '.tsp',
        function(raw){  //SUCCESS - TSP LOADED
            loadedTSP = showLoadedTSP(loadTSP(raw));
            //RAWSOL > Object > Display()
            loadStrings('TSP_EUC_SOLUTIONS/' + problem + '.sol',
                function(rawsol){ //SUCCESS - SOLUTION LOADED
                    loadedSOL = showSolutionTSP(loadSolutionTSP(rawsol), loadedTSP);
                    monoMan = loadMonoMan();
                    loop();
                    loadedBOOL=true;
                },
                function(){ //FAILURE - This is where I would run a solver function.
                    console.warn("UNABLE TO FIND SOLUTION FILE");
                    loop();
                }
            );
        },
        function(){ //FAILURE
            console.warn("UNABLE TO FIND TSP FILE");
        }
    );
}


function startCanvas(x, y){
    createCanvas(x, y);
    background(100);
    imageMode(CENTER)
}

function loadMonoMan(){
    monoMan = createSprite(loadedTSP.coordinates[loadedSOL.IDs[0]-1].x * loadedTSP.scalex + PADDING, 
        loadedTSP.coordinates[loadedSOL.IDs[0]-1].y * loadedTSP.scaley + PADDING);
    
    monoMan.addImage(monomanimg);
    monoMan.scale = .1;
    return monoMan;
}

function newMoveMan(){

    if(typeof monoManTrail == 'undefined' || monoManTrail.length == loadedSOL.IDs.length){
        monoManTrail = new Array();
    }
    if(typeof lerpI == 'undefined'){
        lerpI = 0;
    }
    if(typeof targetI == 'undefined'){
        targetI = 1;
    }

    targetVector = createVector(
        /* xpos*/ loadedTSP.coordinates[loadedSOL.IDs[targetI]-1].x * loadedTSP.scalex + PADDING,
        /* ypos*/ loadedTSP.coordinates[loadedSOL.IDs[targetI]-1].y * loadedTSP.scaley + PADDING);


    if(typeof monomanVector == 'undefined'){
        monomanVector = createVector(monoMan.position.x, monoMan.position.y);
        monoManTrail.push(monomanVector);
    }

    
    if(lerpI >= .1){
        lerpI = 0;
        if(targetI == loadedSOL.IDs.length-1){
            targetI = -1;
        }
        targetI++;
        monoManTrail.push(monomanVector);
        console.log("At location");
    } else {
        lerpI+= 0.005/5;
    }

    monomanVector = p5.Vector.lerp(monomanVector, targetVector, lerpI);

    monoMan.position.x = monomanVector.x;
    monoMan.position.y = monomanVector.y;

   stroke(0,0,0,255);
   
    if(monoManTrail.length >=  1){
        line(monoManTrail[monoManTrail.length-1].x,monoManTrail[monoManTrail.length-1].y, monoMan.position.x,monoMan.position.y)
        for(i = 0; i < monoManTrail.length-1;i++){
            line(monoManTrail[i].x,monoManTrail[i].y, monoManTrail[i+1].x,monoManTrail[i+1].y);
        }
    }
}

function loadTSP(rawTSP){
    let TSPobj = new Object({
        name: null,
        dimension: null,
        coordinates: new Array(),
        minmax: new Object()
    });
    console.log("LOADING TSP FILE : " + rawTSP[0]);
    
    //NAME
    TSPobj.name = rawTSP[0].slice(rawTSP[0].search(/(?<=NAME ?: ).*/), rawTSP[0].length);
    //TOTAL NUMBER OF CITIES
    TSPobj.dimension = rawTSP[3].slice(rawTSP[3].search(/(?<=DIMENSION ?: ).*/), rawTSP[3].length);
    //COORDINATES
    rawTSP = rawTSP.map(e => e.trim());
    rawTSP = rawTSP.map(e => e.split(/ +/));
    for(i = 0; i < TSPobj.dimension; i++){
        TSPobj.coordinates.push({
            x: Number(rawTSP[6 + i][1]),
            y: Number(rawTSP[6 + i][2])
        });
    }
    TSPobj.minmax.xmax = TSPobj.coordinates.reduce((temp, coord) => Math.max(temp, coord.x), 0);
    TSPobj.minmax.ymax = TSPobj.coordinates.reduce((temp, coord) => Math.max(temp, coord.y), 0);
    TSPobj.minmax.xmin = TSPobj.coordinates.reduce((temp, coord) => Math.min(temp, coord.x), TSPobj.coordinates[0].x);
    TSPobj.minmax.ymin = TSPobj.coordinates.reduce((temp, coord) => Math.min(temp, coord.y), TSPobj.coordinates[0].y);
    console.log(TSPobj);
    return TSPobj;
}
function showLoadedTSP(TSP){
    stroke(0,0,0,75);
       
        TSP.scalex = (width-PADDING*2)/TSP.minmax.xmax;
        TSP.scaley = (height-PADDING*2)/TSP.minmax.ymax;
        TSP.scalemin = TSP.scalex < TSP.scaley ? TSP.scalex : TSP.scaley;
        if(!STRETCHPROBLEM){
            TSP.scalex = TSP.scalemin;
            TSP.scaley = TSP.scalemin;
        }
 
    beginShape(LINES);
    vertex(PADDING          , PADDING);
    vertex(width - PADDING  , PADDING);
    vertex(width - PADDING  , PADDING);
    vertex(width - PADDING  , height - PADDING);
    vertex(width - PADDING  , height - PADDING);
    vertex(PADDING          , height - PADDING);
    vertex(PADDING          , height - PADDING);
    vertex(PADDING          , PADDING);
    endShape();

    for(coords of TSP.coordinates){
        circle(
            ((coords.x) * TSP.scalex) + PADDING, 
            ((coords.y) * TSP.scaley) + PADDING,
            10);
        
    }

    textSize(25)
    text("Travelling Salesperson", 5, 25);
    text(("Problem Name: " + TSP.name), 35 , 50);
    text(("Locations: " + TSP.dimension), 350 , 50);
    
    text(("X - min: " + TSP.minmax.xmin.toFixed(2) + " max: " + TSP.minmax.xmax.toFixed(2)), 555, 25);
    text(("Y - min: " + TSP.minmax.ymin.toFixed(2) + " max: " + TSP.minmax.ymax.toFixed(2)), 555, 55);
    text("Streched: " + STRETCHPROBLEM, 5, height-25);
    return TSP;
}

function loadSolutionTSP(rawSol){
    let solObj = new Object({
        name: null,
        distance: null,
        IDs: new Array()
    });

    if(rawSol.length){
        solObj.name = rawSol[0];
        solObj.distance = rawSol[1];
        solObj.IDs = [];
        for(i = 0; i < rawSol.length-2;i++){
            solObj.IDs.push(rawSol[2+i]);
        }
    }
    console.log("Loaded Solution: ");
    console.log(solObj);
    return solObj;
}

function showSolutionTSP(solObj, loadedTSP){

    if(solObj.IDs){
        for(i = 0; i < solObj.IDs.length-1;i++){
            line((loadedTSP.coordinates[solObj.IDs[i]-1].x * loadedTSP.scalex) + PADDING,
                (loadedTSP.coordinates[solObj.IDs[i]-1].y * loadedTSP.scaley) + PADDING,
                (loadedTSP.coordinates[solObj.IDs[i+1]-1].x * loadedTSP.scalex) + PADDING,
                (loadedTSP.coordinates[solObj.IDs[i+1]-1].y * loadedTSP.scaley) + PADDING
            );
        }
        line((loadedTSP.coordinates[solObj.IDs[0]-1].x * loadedTSP.scalex) + PADDING,
            (loadedTSP.coordinates[solObj.IDs[0]-1].y * loadedTSP.scaley) + PADDING,
            (loadedTSP.coordinates[solObj.IDs[loadedTSP.dimension-1]-1].x * loadedTSP.scalex) + PADDING,
            (loadedTSP.coordinates[solObj.IDs[loadedTSP.dimension-1]-1].y * loadedTSP.scaley) + PADDING
            );
        text(("Distance: " + solObj.distance), 350 , 25);

    return solObj;
    }
    
}