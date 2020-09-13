let testTSP
function preload() {
    testTSP = new loadTSP('pr76');
}

function setup(){
    startCanvas(1000, 1000);
    console.log(testTSP);
    showLoadedTSP(testTSP);
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
            
            //NAME - WORKING
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
    let PADDING = 15;

    // let scalexmax = dist(width, 0, TSP.minmax.xmax, 0);
    // let scaleymax = dist(0, height, 0, TSP.minmax.ymax);

    // let scalex = dist(0,0,TSP.minmax.xmin,0);
    // let scaley = dist(0,0,0,TSP.minmax.ymin);

    // let scalm = (scalex + scaley)/2
    
    let scalex = (width-PADDING*2)/TSP.minmax.xmax;
    let scaley = (height-PADDING*2)/TSP.minmax.ymax;
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
            ((coords.x) * scalex) + PADDING/2, 
            ((coords.y) * scaley) + PADDING/2,
            15); //SIZE
    }
    console.log(TSP);
}


