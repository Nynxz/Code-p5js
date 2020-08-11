let boxLength = 250, padding = boxLength/10, boxAmountWidth = 6, boxAmountHeight = 6;

function setup() {

  createCanvas((boxLength + padding) * boxAmountWidth, (boxLength + padding) * boxAmountHeight);
  background("#a1a1a1");

  strokeCap(SQUARE);
  for(y = 0;y < boxAmountHeight;y++){
    for(x = 0;x < boxAmountWidth;x++){
      backgroundChanger(y);

      noStroke();
      square((x * boxLength) + ((x + .5) * padding), (y * boxLength) + ((y + .5) * padding), boxLength);
      parallelLines(x, y, 15);
      shapeDrawer(x,y, 5);
    }
  }
}

function backgroundChanger(y){
  strokeWeight(5);
  if(y % 3 == 0){
    fill('#FF0000'); //1ST PART - 'On Red'
  }
  if(y % 3 == 1){
    fill('#FFFF00'); //2ND PART - 'On Yellow
  }
  if(y % 3 == 2){
    fill('#0000FF'); //3RD PART - 'On Blue'
  }
}

//TODO  -- Wave opacity ;) D:
function strokeChanger(x, y){
  if(        (x % 2 == 0 && y % 3 == 0) || (x % 2 == 1 && y % 3 == 1)){
    stroke(0,0, 255);     //BLUE
  } else if ((x % 2 == 0 && y % 3 == 1) || (x % 2 == 1 && y % 3 == 2)){
    stroke(255,0,0);     //RED
  } else if ((x % 2 == 0 && y % 3 == 2) || (x % 2 == 1 && y % 3 == 0)){
    stroke(255,255,0);   //YELLOW
  }else {
    stroke(0,0,0);
  }
}

function parallelLines(x, y, lineCount){
      strokeChanger(x, y);
      for(i = 0; i < lineCount; i++){
        let lineThickness = boxLength / 50;
        strokeWeight(lineThickness);
          line( 
            (boxLength * (x)) + (padding / 2) * ((x * 1) + (x + 1)),                      //X1
            (boxLength * y) + ((boxLength / lineCount) * i) + (((y+.825) * padding)),     //Y1
            (boxLength * (x+1)) + (padding/2) * ((x * 1) + (x + 1)),                      //X2
            (boxLength * y) + ((boxLength / lineCount) * i) + (((y+.825) * padding)));    //Y2
            //console.log('line');
      }
}

function shapeDrawer(x, y, lineCount) {
  noStroke();
  //CIRCLE
  if((x % 2 == 0 && y % 3 == 0)){
    fill(255,0,0);
    circle(
      (boxLength * (x+.5)) + (padding / 2) * ((x * 1) + (x + 1)),
      (boxLength * (y+.5)) + (padding / 2) * ((y * 1) + (y + 1)),
      boxLength * .75);
   //console.log('circle');

    stroke(255,255,255);
    for(i = 0; i < 5 ; i++){
      console.log('line');

      line(
        sin(x) * (boxLength * (x+.5)) + (padding / 2) * ((x * 1) + (x + 1)),
        cos(y) *(boxLength * (y+.5)) + (padding / 2) * ((y * 1) + (y + 1)),
        boxLength + (padding/2),
        boxLength + (padding/2)
      );
    }

  }
}
