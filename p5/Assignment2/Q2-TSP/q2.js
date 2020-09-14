let loadedTSP;
let scalex, scaley;
let PADDING = 75;
let problem  = 'berlin52';
function preload() {
    //a280 berlin52 ch150
    loadedTSP = new loadTSP(problem);
        

}

function setup(){
    startCanvas(1000, 1000);
    console.log(loadedTSP);
    showLoadedTSP(loadedTSP);
    //a280new berlin52new ch150new
    console.log(showSolutionTSP(problem));
    rectMode(CORNER);
    testErr();
}

function DisplayTSP(){

}

function draw(){


}

function startCanvas(x, y){
    createCanvas(x, y);
    background(100);
}

function loadTSP(filename){
    let TSPobj = new Object();
    let rawTSP = loadStrings('TSP_EUC_PROBLEMS/' + filename + '.tsp',
        function(){
            console.log("LOADING TSP FILE : " + filename) 
            
            //NAME
            TSPobj.name = rawTSP[0].slice(rawTSP[0].search(/(?<=NAME ?: ).*/), rawTSP[0].length);
            //TOTAL NUMBER OF CITIES
            TSPobj.dimension = rawTSP[3].slice(rawTSP[3].search(/(?<=DIMENSION ?: ).*/), rawTSP[3].length);
            //COORDINATES
            rawTSP = rawTSP.map(e => e.trim());
            
            rawTSP = rawTSP.map(e => e.split(/ +/));
            console.log(rawTSP);
            TSPobj.coordinates = new Array();
            for(i = 0; i < TSPobj.dimension; i++){
                TSPobj.coordinates.push({
                    x: Number(rawTSP[6 + i][1]),
                    y: Number(rawTSP[6 + i][2])
                });
            }

            TSPobj.minmax = new Object();
            TSPobj.minmax.xmax = TSPobj.coordinates.reduce((temp, coord) => Math.max(temp, coord.x), 0);
            TSPobj.minmax.ymax = TSPobj.coordinates.reduce((temp, coord) => Math.max(temp, coord.y), 0);
            TSPobj.minmax.xmin = TSPobj.coordinates.reduce((temp, coord) => Math.min(temp, coord.x), TSPobj.coordinates[0].x);
            TSPobj.minmax.ymin = TSPobj.coordinates.reduce((temp, coord) => Math.min(temp, coord.y), TSPobj.coordinates[0].y);

            // for(coords of TSPobj.coordinates){
            //     console.log("Loop ", coords.x, " ",coords.y)
            //     TSPobj.minmax.xmax = TSPobj.minmax.xmax >= coords.x ? TSPobj.minmax.xmax : coords.x;
            //     TSPobj.minmax.ymax = TSPobj.minmax.ymax >= coords.y ? TSPobj.minmax.ymax : coords.y;
            //     TSPobj.minmax.xmin = TSPobj.minmax.xmin <= coords.x ? TSPobj.minmax.xmin : coords.x;
            //     TSPobj.minmax.ymin = TSPobj.minmax.ymin <= coords.y ? TSPobj.minmax.ymin : coords.y;
            // }

        },
        function(){ //ON FAIL
            console.warn("FILE (" + filename + ".tsp) NOT DETECTED IN loadTSP()")
        });
    
    return TSPobj;
}

function showLoadedTSP(TSP){


    // let scalexmax = dist(width, 0, TSP.minmax.xmax, 0);
    // let scaleymax = dist(0, height, 0, TSP.minmax.ymax);

    // let scalex = dist(0,0,TSP.minmax.xmin,0);
    // let scaley = dist(0,0,0,TSP.minmax.ymin);

    // let scalm = (scalex + scaley)/2
    
    scalex = (width-PADDING*2)/TSP.minmax.xmax;
    scaley = (height-PADDING*2)/TSP.minmax.ymax;
    
    //let circlescale = (scalex+scaley)/2
    //console.log(scale);

    //#region DEBUG
    beginShape(LINES);
    vertex(PADDING, PADDING);
    vertex(width - PADDING, PADDING);
    vertex(width - PADDING, PADDING);
    vertex(width - PADDING, height - PADDING);
    vertex(width - PADDING, height - PADDING);
    vertex(PADDING, height - PADDING);
    vertex(PADDING, height - PADDING);
    vertex(PADDING, PADDING);
    endShape();
    //#endregion

    for(coords of TSP.coordinates){
        //console.log("X: " + (coords.x+PADDING) + " Y: " + (coords.y+PADDING));
        circle(
            ((coords.x) * scalex) + PADDING, 
            ((coords.y) * scaley) + PADDING,
            10); //SIZE
    }

    textSize(25)
    text("Travelling Salesperson", 5, 25);
    text(("Problem Name: " + TSP.name), 35 , 50);
    text(("Locations: " + TSP.dimension), 350 , 50);
    text(("X - min: " + TSP.minmax.xmin.toFixed(2) + " max: " + TSP.minmax.xmax.toFixed(2)), 555, 25);
    text(("Y - min: " + TSP.minmax.ymin.toFixed(2) + " max: " + TSP.minmax.ymax.toFixed(2)), 555, 55);
    console.log(TSP);
}


// function loadSolution(solutionfile){

// }


function showSolutionTSP(solutionfile){
    let solObj = new Object();
    console.log("Showing Solution: " + solutionfile);
    let rawSol = loadStrings('TSP_EUC_SOLUTIONS/' + solutionfile + '.solu', function(){
        console.log(rawSol);
        solObj.name = rawSol[0];
        solObj.distance = rawSol[1];
        if(solObj.name == loadedTSP.name){
            solObj.IDs = new Array();
            for(i = 0; i < loadedTSP.dimension;i++){
                solObj.IDs.push(rawSol[2+i]);
            }
            
            for(i = 0; i < loadedTSP.dimension-1;i++){
                console.log(i + " " + solObj.IDs[i]);
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
        }

    },
    function(){ //ON FAIL
        console.warn("FILE (" + filename + ".solu) NOT DETECTED IN showSolutionTSP()")
    });
    console.log(solObj);
    
    //return solObj;
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