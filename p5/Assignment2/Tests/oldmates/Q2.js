//Isaac Pollack - S5049397 - Q1 - Travelling Salesperson

const WIDTH = 400, HEIGHT = 400;
let problem, dataset;
let problemName, cityAmount, posX, posY;
let resultArray = [];

//PRELOAD
function preload() {
  problem = loadStrings('Problems/A280.tsp'); // A280 - Berlin52 - Bier127 - Brd14051 - Ch130     # Some datasets to test
}

//SETUP
function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(100);
  loadTSP();
  showLoadedTSP()

  //DEBUG
  //console.log(problem);
  console.log(resultArray);
  //console.log(problemName);
  //console.log(cityAmount);
  
}

//LOAD TSP DATA
function loadTSP() {

  for(let k = 0; k < problem.length; k++) {
    if(k < 6) {
      problem[k] = problem[k].trim();
      problem[k] = problem[k].split(": "); //If it was the same you could just do - problem[k] = problem[k].trim();.split(" ")
    }
    else {
      problem[k] = problem[k].trim(); //But it's not the same, so use Regexr values to cut out all spaces.
      problem[k] = problem[k].split(/ +/);
    }
  }

  //Shorthand creation of an array of objects
  for(let item of problem) {
    resultArray.push({
      id: item[0],
      posX: item[1],
      posY: item[2],
    });
  }
  console.log("ree");
console.log(resultArray);
//MaxX
maxX = 0
for(let i = 6; i < resultArray.length-1; i++){
  console.log(maxX);
    if(parseInt(resultArray[i].posX)> maxX) {
        maxX = parseInt(resultArray[i].posX)
    }
}

//MaxY
maxY = 0
for(let i = 6; i < resultArray.length-1; i++){
    if(parseInt(resultArray[i].posY) > maxY) {
        maxY = parseInt(resultArray[i].posY)
    }
}

  problemName = "Problem: " + problem[0][1]; //Points to array 0, second element
  cityAmount = "Cities: " + problem[3][1]; //Grabs dimensions second [1] array value, which is the amount of cities, as per TSLIB.
  console.log("MAXX: ", maxX, "| MAXY: ", maxY);
}

//SHOW LOADED TSP
function showLoadedTSP() {


fill(0);
rect(-10, -10, WIDTH + 20, HEIGHT / 10 + 20, 20);
textSize(WIDTH / 40);
fill(255);
text(problemName + "    " + cityAmount + "    ", WIDTH / 3.5, HEIGHT / 16); //Easier than multiple lines

  //City Visulisation
  for(i = 0; i < resultArray.length; i++) {
    if( i != resultArray.length - 1) {
      stroke(255);
      ellipse(resultArray[i].posX * 0.8, resultArray[i].posY, 2, 2); //x, y, w, h, curve radi
      //stroke('red');
      //line(resultArray[i].posX, resultArray[i].posY, resultArray[i + 1].posX, resultArray[i + 1].posY,)
    }
    else {
      stroke('lightblue');
      line(resultArray[i].posX, resultArray[i].posY, resultArray[0].posX, resultArray[0].posY,)
    }
  }

  /* Write this function that will visualise a loaded problem.
You will need to find a way to scale the loaded problem to fit correctly on the canvas.
You may choose what shapes/colours to use to visualise the problem. You should
make sure you display the problem name and number of cities somewhere on the
canvas */

}

//SHOW SOLUTION
function showSolution() {

  /*Write this function that will visualise a solution
to a loaded problem from a file. You may assume that this function will only be used
AFTER showLoadedTSP() has already been run. The first line of a .sol file contains the
problem file name (you should check this matches the loaded TSP). The second line
contains the tour length, and the rest of the file contains a list of ID’s (one on each
line) that represents the order that the cities should be connected to form the shortest
tour. You should display the solution tour distance on the canvas. Some sample .sol
files have been provided on the course website*/

}

//DRAW
function draw() {
  showSolution();
}


/* Challenge (3 marks): Make the program animate the tour. The program should show the
salesman starting from the first city and smoothly moving between all the cities leaving
the tour as a trail behind them until they reach the last city and return back to the first
one. You can loop this animation if you wish. */