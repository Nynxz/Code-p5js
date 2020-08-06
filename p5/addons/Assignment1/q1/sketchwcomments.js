let numSquares, slider;

function setup() {
  //Creates a slider with a min value of 1, max of 16, starting 5 and step 1
  slider = createSlider(1,16,5,1);

	//Movement and Size
	slider.position(0,250);
	slider.style('width', '250px');
}

function draw() {
	//Sets numSquares = to the current slider value
	let numSquares = slider.value();
	//Efficiency check..
	if(numSquares != slider.value()){
    numSquares = slider.value();
		createCanvas(numSquares * 100, 250);
		//Each square gets a 100x250 box, Canvas grows/shrinks to amount of squares
		//Note: creating a canvas every draw loop is probably extremely inefficient
		background("#6569fb");

		//Itteratting through every square
		for(i = 0; i < numSquares; i++) {

			//Set the colour to a green, with a change to the alpha based on the current iteration of the for loop
			//(255/numSquares) to 'map' squares to alpha values,
			fill(color(0, 225, 175,(255/numSquares * (i + 1))));

			//Make a square, at position x = (100 * (0 - 4) + 12.5) & y = 75.
			//  With a h = 75 & w = 75 with a corner radi of 15
			square(100 * i + 12.5, 87.5, 75, 75 , 15);
		}    
		//console.log("looped");
	}
}


//Things to improve
    //Ability to manipulate the actual square size based on numSquares instead of canvas size
        //How? Work out the correct formula
    //Animations?
        //Growing Cubes
        //Moving gradient