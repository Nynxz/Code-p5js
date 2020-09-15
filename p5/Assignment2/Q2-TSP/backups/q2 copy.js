let loadedTSP;
let scalex, scaley;
let PADDING = 75;
let problem  = 'a280';

function preload() {
    //a280 berlin52 ch150
    loadedTSP =  loadTSP(problem);
    loadedSol =  loadSolutionTSP(problem);


    monomanimg = loadImage('assets/monoman.png');

}

function setup(){
    startCanvas(1000, 1000);
    showLoadedTSP(loadedTSP);
    //showSolutionTSP(loadedSol);

    //rectMode(CENTER);
    //imageMode(CENTER);
    //image(monomanimg, loadedTSP.coordinates[loadedsol.IDs[2]-1].x,loadedTSP.coordinates[loadedsol.IDs[1-1]-1].y , 64, 64);
}

function DisplayTSP(){

}

function draw(){
    // console.log("loadedsol");
    // console.log(loadedsol);

}

function startCanvas(x, y){
    createCanvas(x, y);
    background(100);
}

function loadTSP(filename){
    let TSPobj = new Object({
        name: null,
        dimension: null,
        coordinates: new Array(),
        minmax: new Object()
    });
    let rawTSP = loadStrings('TSP_EUC_PROBLEMS/' + filename + '.tsp',
        function(){
            console.log("LOADING TSP FILE : " + filename);

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
        },
        function(){ //ON FAIL
            console.warn("FILE (" + filename + ".tsp) NOT DETECTED IN loadTSP()")
        });
        console.log(TSPobj);
        return TSPobj;
}

function showLoadedTSP(TSP){
    stroke(0,0,0,75);

    scalex = (width-PADDING*2)/TSP.minmax.xmax;
    scaley = (height-PADDING*2)/TSP.minmax.ymax;

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
            ((coords.x) * scalex) + PADDING, 
            ((coords.y) * scaley) + PADDING,
            10);
    }

    textSize(25)
    text("Travelling Salesperson", 5, 25);
    text(("Problem Name: " + TSP.name), 35 , 50);
    text(("Locations: " + TSP.dimension), 350 , 50);
    
    text(("X - min: " + TSP.minmax.xmin.toFixed(2) + " max: " + TSP.minmax.xmax.toFixed(2)), 555, 25);
    text(("Y - min: " + TSP.minmax.ymin.toFixed(2) + " max: " + TSP.minmax.ymax.toFixed(2)), 555, 55);
    console.log(TSP);
}



function loadSolutionTSP(filename){
    let solObj = new Object({
        name: null,
        distance: null,
        IDs: new Array()
    });
    console.log("Loading Solution: " + filename);
    loadStrings('TSP_EUC_SOLUTIONS/' + filename + '.solu',
    function(){
        solObj.name = rawSol[0];
        solObj.distance = rawSol[1];
        if(solObj.name == loadedTSP.name){
            solObj.IDs = [];
            for(i = 0; i < loadedTSP.dimension;i++){
                solObj.IDs.push(rawSol[2+i]);
            }
        }
    },
    function(){ //ON FAIL
        console.warn("FILE (" + filename + ".solu) NOT DETECTED IN loadSolutionTSP()");
    });
    return solObj;
}

function showSolutionTSP(solutionfile){
    console.log("Showing Solution: " + solutionfile);
    if(solutionfile.IDs){
    // let rawSol = loadStrings('TSP_EUC_SOLUTIONS/' + solutionfile + '.solu',
    //     function(){
    //         console.log(rawSol);
    //         solObj.name = rawSol[0];
    //         solObj.distance = rawSol[1];
    //         if(solObj.name == loadedTSP.name){
    //             solObj.IDs = [];
    //             for(i = 0; i < loadedTSP.dimension;i++){
    //                 solObj.IDs.push(rawSol[2+i]);
    //             }
                
    for(i = 0; i < loadedTSP.dimension-1;i++){
        //console.log(i + " " + solObj.IDs[i]);
        line((loadedTSP.coordinates[solObj.IDs[i]-1].x * scalex) + PADDING,
            (loadedTSP.coordinates[solObj.IDs[i]-1].y * scaley) + PADDING,
            (loadedTSP.coordinates[solObj.IDs[i+1]-1].x * scalex) + PADDING,
            (loadedTSP.coordinates[solObj.IDs[i+1]-1].y * scaley) + PADDING
        );
    }
    line((loadedTSP.coordinates[solObj.IDs[0]-1].x * scalex) + PADDING,
        (loadedTSP.coordinates[solObj.IDs[0]-1].y * scaley) + PADDING,
        (loadedTSP.coordinates[solObj.IDs[loadedTSP.dimension-1]-1].x * scalex) + PADDING,
        (loadedTSP.coordinates[solObj.IDs[loadedTSP.dimension-1]-1].y * scaley) + PADDING
        );
    text(("Distance: " + solObj.distance), 350 , 25);
    console.log(solObj);
            
    //     },
    //     function(){ //ON FAIL
    //         console.warn("FILE (" + solutionfile + ".solu) NOT DETECTED IN showSolutionTSP()");
    // });
    console.log("end sol func");
    console.log(solObj);
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