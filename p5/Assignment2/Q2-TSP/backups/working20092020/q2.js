let STRETCHPROBLEM = true;

let loadedTSP, loadedSOL;
//a280 berlin52 ch150
let problem  = 'a280';

let scalex, scaley;
let PADDING = 75;


let loadedBOOL = false;

let monoMan;
let probleminput;
function dropdown(){
    if(probleminput === undefined){
    probleminput = createInput(problem);
    probleminput.input(inputChange);
    strechcheckbox = createCheckbox('Strech', STRETCHPROBLEM);
    strechcheckbox.changed(function(){
        monomantrail = new Array();
        STRETCHPROBLEM = this.checked() ? true : false});
    }
}
function inputChange(input){
    removeSprite(monoMan);
    monomantrail = new Array();
    clear();
    problem = this.value();
    loadedSOL = new Object();
    setup();
}

function preload() {
    
    monomanimg = loadImage('assets/monoman.png');
}

function setup(){
    frameRate(15);
    noLoop();
    dropdown();
    startTSP(problem);
    startCanvas(1000, 1000);
    loadedBOOL = false;
    //RAWTSP > Object > Display()
}
let incrementor = 0;
function draw(){
    //console.log("DRAW LOOP");
    if(keyIsPressed){
        loadedBOOL = true;
    }
    if(loadedBOOL){
        background(100);
        showLoadedTSP(loadedTSP);
        showSolutionTSP(loadedSOL, loadedTSP);
        //console.log(incrementor);
        if(incrementor < loadedTSP.dimension-1){
            incrementor++
        } else {
            incrementor = 0;
            monomantrail = new Array();
        }
        //moveMan(incrementor);
        drawSprites();
        
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
                    //loadedBOOL=true;
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
//TODO p5.vector.lerp  TODODODODO
let monomantrail = new Array();
function moveMan(i){
        stroke(0,0,0,255);
        let xpos = loadedTSP.coordinates[loadedSOL.IDs[i]-1].x * loadedTSP.scalex + PADDING
        let ypos = loadedTSP.coordinates[loadedSOL.IDs[i]-1].y * loadedTSP.scaley + PADDING
        
        monoMan.position.x = xpos
        monoMan.position.y = ypos
        monomantrail.push({x: xpos, y: ypos}) ;
        //console.log(monomantrail);
        if(monomantrail.length > 2){
        for(t = 1; t < monomantrail.length-1;t++){
            line(monomantrail[t].x, monomantrail[t].y, monomantrail[t-1].x, monomantrail[t-1].y)
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
 
    //#region DEBUG
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
    //#endregion

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
    return solObj;
}

function showSolutionTSP(solObj, loadedTSP){
    // console.log("Showing Solution: ");
    // console.log(solObj)
    if(solObj.IDs){
        for(i = 0; i < solObj.IDs.length-1;i++){
            //console.log(i + " " + solObj.IDs[i]);
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

function testErr(){
    let errsol = loadStrings('TSP_EUC_SOLUTIONS/OLD/a280.sol');
    console.log(errsol);
}

/*

Object{
    Name: name,
    Dimension: dimension,
    Coords: [
        {x: xpos, y: ypos},
        {x: xpos, y: ypos},
        {x: xpos, y: ypos},
        {x: xpos, y: ypos},
        {x: xpos, y: ypos},
        {x: xpos, y: ypos},
    ]
}


*/