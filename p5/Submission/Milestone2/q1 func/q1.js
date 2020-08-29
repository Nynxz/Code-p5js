let boxLength = 500 , boxAmountWidth = 2, boxAmountHeight = 3;   // <---- SCALE

const padding = boxLength / 10;
const halfPadding = padding / 2;

function setup() {
  createCanvas((boxLength + padding) * boxAmountWidth, (boxLength + padding) * boxAmountHeight);
  background("#585858");
  strokeCap(SQUARE);

  for (x = 0; x < boxAmountWidth; x++) {
    for (y = 0; y < boxAmountHeight; y++) {
      assignmentDraw(x,y);
    }
  }
}

function assignmentDraw(x, y) {
  if ((x % 2 == 0 && y % 3 == 0)) {
    DrawSection(x, y, 'circle', 'red', 'yellow', 'blue');  //1ST PART
  }
  else if ((x % 2 == 0 && y % 3 == 1)) {
    DrawSection(x, y, 'square', 'yellow', 'blue', 'red'); //2ND PART
  }
  else if ((x % 2 == 0 && y % 3 == 2)) {
    DrawSection(x, y, 'triangle', 'blue', 'red', 'yellow'); //3RD PART
  }
  else if ((x % 2 == 1 && y % 3 == 0)) {
    DrawSection(x, y, 'rectangle', 'red', 'blue', 'yellow');  //4TH PART
  }
  else if ((x % 2 == 1 && y % 3 == 1)) {
    DrawSection(x, y, 'trapezoid', 'yellow', 'red', 'blue');  //5TH PART
  }
  else if ((x % 2 == 1 && y % 3 == 2)) {
    DrawSection(x, y, 'parallelogram', 'blue', 'yellow', 'red');  //6TH PART
  }
}

function DrawSection(x, y, shape, shapeFillColour, verticalLineColour, horizontalLineColour){

  xOff = 2 * x + 1;
  yOff = 2 * y + 1;
  drawoutline = false;
  
  strokeWeight(boxLength / 50);
  drawBase();
  drawShape();

 function drawBase(){
    noStroke();
    rectMode(CORNER);
    fill(shapeFillColour);
    square(x * boxLength + (x + 0.5) * padding, y * boxLength + (y + 0.5) * padding, boxLength);
    drawHorizontalLines();
  }

  function drawHorizontalLines() {
    let lineCount = 14
    stroke(horizontalLineColour);
    for (let i = 0; i < lineCount; i++) {
      line(
        boxLength * x + (padding * (2 * x + 1)) * 0.5,                                                           //X1
        ((boxLength * y) + (boxLength * 0.05) + (y * padding + 0.5 * padding)) + (0.07 * boxLength) * i,         //Y1
        boxLength * (x + 1) + (padding * (2 * x + 1)) * 0.5,                                                     //X2
        ((boxLength * y) + (boxLength * 0.05) + (y * padding + 0.5 * padding)) + (0.07 * boxLength) * i          //Y2
      );
    }
  }

  function drawShape() {
    rectMode(CENTER);
    if (!drawoutline) {
      stroke(verticalLineColour);
      fill(shapeFillColour);
    } else {
      strokeWeight(boxLength / 11);
      stroke(shapeFillColour);
      noFill();
    }

    switch (shape) {
      /*                                                   CIRCLE                                                         */
      case 'circle':
        let circleSize = boxLength * 0.78;
        circle(
          boxLength * (x + 0.5) + (halfPadding) * (xOff),                                                        //CENTERX
          boxLength * (y + 0.5) + (halfPadding) * (yOff),                                                        //CENTERY
          circleSize                                                                                                       //SIZE
        );
        if (!drawoutline) {
          for (let i = 0, a = 7; i < 15; i++) {
            if (i > 15 / 2) { a-- } else { a++ }
            line(
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,  //X1
              (boxLength * y) + ((boxLength + padding * (yOff)) / 2) - (boxLength * a / 37),                    //Y1    
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,  //X2
              (boxLength * y) + ((boxLength + padding * (yOff)) / 2) + (boxLength * a / 37)                     //Y2
            );
          }
        }
        break;
      /*                                                   RECTANGLE                                                      */
      case 'rectangle':
        rect(
          (boxLength * (x + 0.5)) + (halfPadding) * (xOff),                                                      //CENTERX
          (boxLength * (y + 0.5)) + (halfPadding) * (yOff),                                                      //CENTERY
          boxLength * 0.8,                                                                                       //WIDTH
          boxLength * 0.45);                                                                                     //HEIGHT
        if (!drawoutline) {
          for (let i = 0; i < 15; i++) {
            line(
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X1
              (boxLength * (y)) + (halfPadding) * (yOff) + boxLength / 2 - (boxLength * 0.2),                    //Y1 
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X2
              (boxLength * (y + 1)) + (halfPadding) * (yOff) - boxLength / 2 + (boxLength * 0.2));               //Y2 
          }
        }
        break;
      /*                                                   SQUARE                                                         */
      case 'square':
        square(
          (boxLength * (x + 0.5)) + (halfPadding) * (xOff),                                                      //CENTERX
          (boxLength * (y + 0.502)) + (halfPadding) * (yOff),                                                    //CENTERY
          boxLength * 0.71);                                                                                               //SIZE
        if (!drawoutline) {
          for (let i = 0; i < 15; i++) {
            line(
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X1
              (boxLength * (y)) + (halfPadding) * (yOff) + boxLength / 2 - (boxLength * 0.35),                   //Y1
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X2
              (boxLength * (y + 1)) + (halfPadding) * (yOff) - boxLength / 2 + (boxLength * 0.35)                //Y2
            );
          }
        }
        break;
      /*                                                   TRAPEZOID                                                      */
      case 'trapezoid':
        quad(
          (boxLength * (x + 0.35)) + (halfPadding) * (xOff),                                                     //X1  TOP      LEFT
          (boxLength * (y + 0.27)) + (halfPadding) * (yOff),                                                     //Y1  TOP      LEFT
          (boxLength * (x + 0.65)) + (halfPadding) * (xOff),                                                     //X2  TOP      RIGHT
          (boxLength * (y + 0.27)) + (halfPadding) * (yOff),                                                     //Y2  TOP      RIGHT
          (boxLength * (x + 0.87)) + (halfPadding) * (xOff),                                                     //X3  BOTTOM   RIGHT
          (boxLength * (y + 0.74)) + (halfPadding) * (yOff),                                                     //Y3  BOTTOM   RIGHT
          (boxLength * (x + 0.13)) + (halfPadding) * (xOff),                                                     //X4  BOTTOM   LEFT
          (boxLength * (y + 0.74)) + (halfPadding) * (yOff));                                                    //Y4  BOTTOM   LEFT
        if (!drawoutline) {
          for (let i = 0, a = 25; i < 15; i++) {
            if (i > 10) { a -= 26 } else if (i < 5) { a += 26 }
            line(
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X1
              (boxLength * (y)) + (halfPadding) * (yOff) + boxLength * 0.9 - a * (boxLength / 250),              //Y1
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X2
              (boxLength * (y + 1)) + (halfPadding) * (yOff) - boxLength / 2 + 15 * (boxLength / 70)             //Y2
            );
          }
        }
        break;
      /*                                                    TRIANGLE                                                      */
      case 'triangle':
        triangle(
          (boxLength * (x + 0.50)) + (halfPadding) * (xOff),                                                     //X1  TOP      MIDDLE
          (boxLength * (y + 0.17)) + (halfPadding) * (yOff),                                                     //Y1  TOP      MIDDLE
          (boxLength * (x + 0.13)) + (halfPadding) * (xOff),                                                     //X2  BOTTOM   LEFT
          (boxLength * (y + 0.83)) + (halfPadding) * (yOff),                                                     //Y2  BOTTOM   LEFT
          (boxLength * (x + 0.87)) + (halfPadding) * (xOff),                                                     //X3  BOTTOM   RIGHT
          (boxLength * (y + 0.83)) + (halfPadding) * (yOff));                                                    //Y3  BOTTOM   RIGHT
        if (!drawoutline) {
          for (let i = 0, a = 1; i < 15; i++) {
            if (i > 15 / 2) { a -= 25 } else { a += 25 }
            line(
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X1 
              (boxLength * (y)) + (halfPadding) * (yOff) + boxLength * 0.9 - a * (boxLength / 250),              //Y1 
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X2 
              (boxLength * (y + 1)) + (halfPadding) * (yOff) - boxLength / 2 + 15 * (boxLength / 40)             //Y2
            );
          }
        }
        break;
      /*                                                  PARALLELOGRAM                                                   */
      case 'parallelogram':
        quad(
          (boxLength * (x + 0.35)) + (halfPadding) * (xOff),                                                     //X1  TOP      LEFT
          (boxLength * (y + 0.27)) + (halfPadding) * (yOff),                                                     //Y1  TOP      LEFT
          (boxLength * (x + 0.87)) + (halfPadding) * (xOff),                                                     //X2  TOP      RIGHT
          (boxLength * (y + 0.27)) + (halfPadding) * (yOff),                                                     //Y2  TOP      RIGHT
          (boxLength * (x + 0.65)) + (halfPadding) * (xOff),                                                     //X3  BOTTOM   RIGHT
          (boxLength * (y + 0.73)) + (halfPadding) * (yOff),                                                     //Y3  BOTTOM   RIGHT
          (boxLength * (x + 0.13)) + (halfPadding) * (xOff),                                                     //X4  BOTTOM   LEFT
          (boxLength * (y + 0.73)) + (halfPadding) * (yOff));                                                    //Y4  BOTTOM   LEFT
        if (!drawoutline) {
          for (let i = 0, t = boxLength / 2.7, b = 0; i < 15; i++) {
            if (i < 4) { (t -= i * boxLength / 18) } else { t = 0 }
            if (i > 10) { b += i * boxLength / 125 }
            line(
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X1
              (boxLength * (y)) + (halfPadding) * (yOff) + boxLength * 0.7 - b,                                  //Y1 
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X2  
              (boxLength * (y + 1)) + (halfPadding) * (yOff) - boxLength * 0.7 + t                               //Y2  
            );
          }
        }
        break;
      default:
        console.log('INCORRECT SPELLING ON SHAPE TYPE DECLARATION');
        break;
    }
    if (!drawoutline) {
      drawoutline++;
      drawShape();
    }
  }
}