let boxLength = 250 , boxAmountWidth = 9, boxAmountHeight = 3;   // <---- SCALE


const padding = boxLength / 10;
const halfPadding = padding / 2;

function setup() {

  createCanvas((boxLength + padding) * boxAmountWidth, (boxLength + padding) * boxAmountHeight);
  background("#585858");

  strokeCap(SQUARE);
  for (y = 0; y < boxAmountHeight; y++) {
    for (x = 0; x < boxAmountWidth; x++) {

      backgroundChanger(y);
      noStroke();
      rectMode(CORNER);
      square(x * boxLength + (x + .5) * padding, y * boxLength + (y + .5) * padding, boxLength);
      parallelLines(x, y);
      
      shapeDrawer(x, y);
    }
  }
}

function backgroundChanger(y) {
  strokeWeight(5);
  if (y % 3 == 0) {
    fill('#FF0000'); //1ST PART - 'On Red'
  }
  if (y % 3 == 1) {
    fill('#FFFF00'); //2ND PART - 'On Yellow
  }
  if (y % 3 == 2) {
    fill('#0000FF'); //3RD PART - 'On Blue'
  }
}

function strokeChanger(x, y) {
  if ((x % 2 == 0 && y % 3 == 0) || (x % 2 == 1 && y % 3 == 1)) {
    stroke(0, 0, 255);     //BLUE
  } else if ((x % 2 == 0 && y % 3 == 1) || (x % 2 == 1 && y % 3 == 2)) {
    stroke(255, 0, 0);     //RED
  } else if ((x % 2 == 0 && y % 3 == 2) || (x % 2 == 1 && y % 3 == 0)) {
    stroke(255, 255, 0);   //YELLOW
  } else {
    stroke(0, 0, 0);
  }
}

function parallelLines(x, y) {
  let lineCount = 14
  strokeChanger(x, y);
  let lineThickness = boxLength / 50;
  for (i = 0; i < lineCount; i++) {
    strokeWeight(lineThickness);
    line(
      boxLength * x + (padding * (2 * x + 1)) * .5,                                       //X1
      ((boxLength * y) + (boxLength * 0.05) + (y * padding + 0.5 * padding)) + (0.07 * boxLength) * i,        //Y1
      boxLength * (x + 1) + (padding * (2 * x + 1)) * .5,                                 //X2
      ((boxLength * y) + (boxLength * 0.05) + (y * padding + 0.5 * padding)) + (0.07 * boxLength) * i         //Y2
    );
  }
}

function shapeDrawer(x, y) {

  if ((x % 2 == 0 && y % 3 == 0)) {
    new Shape(x, y, 'circle', 'red', 'yellow');
  }

  else if ((x % 2 == 0 && y % 3 == 1)) {
    new Shape(x, y, 'square', 'yellow', 'blue');
  }

  else if ((x % 2 == 0 && y % 3 == 2)) {
    new Shape(x, y, 'triangle', 'blue', 'red');
  }

  else if ((x % 2 == 1 && y % 3 == 0)) {
    new Shape(x, y, 'rectangle', 'red', 'blue');
  }

  else if ((x % 2 == 1 && y % 3 == 1)) {
    new Shape(x, y, 'trapezoid', 'yellow', 'red');
  }

  else if ((x % 2 == 1 && y % 3 == 2)) {
    new Shape(x, y, 'parallelogram', 'blue', 'yellow');
  }

}

class Shape {
  constructor(x, y, shape, shapeFillColour, strokeColour) {
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.shapeFillColour = shapeFillColour
    this.strokeColour = strokeColour;
    this.xOff = 2 * x + 1;
    this.yOff = 2 * y + 1;
    this.drawoutline = false;
    this.drawShape();
  }

  drawShape() {
    rectMode(CENTER);
    if (this.drawoutline) {
      strokeWeight(boxLength / 11);
      stroke(this.shapeFillColour);
      noFill();
    } else {
      strokeWeight(boxLength / 50);
      stroke(this.strokeColour);
      fill(this.shapeFillColour);
    }

    switch (this.shape) {
      /*                                                   CIRCLE                                                                     */
      case 'circle':
        let circleSize = boxLength * .78;
        circle(
          boxLength * (this.x + .5) + (halfPadding) * (this.xOff),                                                        //CENTERX
          boxLength * (this.y + .5) + (halfPadding) * (this.yOff),                                                        //CENTERY
          circleSize                                                                                                      //SIZE
        );
        if (!this.drawoutline) {
          for (i = 0, this.a = 7; i < 15; i++) {
            if (i > 15 / 2) { this.a-- } else { this.a++ }
            line(
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,            //X1
              (boxLength * y) + ((boxLength + padding * (this.yOff)) / 2) - (boxLength * this.a / 37),                    //Y1    
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,            //X2
              (boxLength * y) + ((boxLength + padding * (this.yOff)) / 2) + (boxLength * this.a / 37)                     //Y2
            );
          }
        }
        break;
      /*                                                   RECTANGLE                                                                  */
      case 'rectangle':
        rect(
          (boxLength * (this.x + .5)) + (halfPadding) * (this.xOff),                                                      //CENTERX
          (boxLength * (this.y + .5)) + (halfPadding) * (this.yOff),                                                      //CENTERY
          boxLength * .8,                                                                                                 //WIDTH
          boxLength * .45);                                                                                                //HEIGHT
        if (!this.drawoutline) {
          for (i = 0; i < 15; i++) {
            line(
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,            //X1
              (boxLength * (y)) + (halfPadding) * (this.yOff) + boxLength / 2 - (boxLength * .2),                         //Y1 
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,            //X2
              (boxLength * (y + 1)) + (halfPadding) * (this.yOff) - boxLength / 2 + (boxLength * .2));                    //Y2 
          }
        }
        break;
      /*                                                   SQUARE                                                                     */
      case 'square':
        square(
          (boxLength * (this.x + .5)) + (halfPadding) * (this.xOff),                                                      //CENTERX
          (boxLength * (this.y + .505)) + (halfPadding) * (this.yOff),                                                      //CENTERY
          boxLength * .70);                                                                                               //SIZE
        if (!this.drawoutline) {
          for (i = 0; i < 15; i++) {
            line(
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,            //X1
              (boxLength * (y)) + (halfPadding) * (this.yOff) + boxLength / 2 - (boxLength * .35),                        //Y1
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,            //X2
              (boxLength * (y + 1)) + (halfPadding) * (this.yOff) - boxLength / 2 + (boxLength * .35)                     //Y2
            );
          }
        }
        break;
      /*                                                   TRAPEZOID                                                                  */
      case 'trapezoid':
        quad(
          (boxLength * (this.x + .35)) + (halfPadding) * (this.xOff),                                                     //X1  TOP      LEFT
          (boxLength * (this.y + .27)) + (halfPadding) * (this.yOff),                                                     //Y1  TOP      LEFT
          (boxLength * (this.x + .65)) + (halfPadding) * (this.xOff),                                                     //X2  TOP      RIGHT
          (boxLength * (this.y + .27)) + (halfPadding) * (this.yOff),                                                     //Y2  TOP      RIGHT
          (boxLength * (this.x + .87)) + (halfPadding) * (this.xOff),                                                     //X3  BOTTOM   RIGHT
          (boxLength * (this.y + .74)) + (halfPadding) * (this.yOff),                                                     //Y3  BOTTOM   RIGHT
          (boxLength * (this.x + .13)) + (halfPadding) * (this.xOff),                                                     //X4  BOTTOM   LEFT
          (boxLength * (this.y + .74)) + (halfPadding) * (this.yOff));                                                    //Y4  BOTTOM   LEFT
        if (!this.drawoutline) {
          for (i = 0, this.a = 25; i < 15; i++) {
            if (i > 10) { this.a -= 26 } else if (i < 5) { this.a += 26 }
            line(
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,            //X1
              (boxLength * (y)) + (halfPadding) * (this.yOff) + boxLength * .9 - this.a * (boxLength / 250),              //Y1
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,            //X2
              (boxLength * (y + 1)) + (halfPadding) * (this.yOff) - boxLength / 2 + 15 * (boxLength / 70)                 //Y2
            );
          }
        }
        break;
      /*                                                    TRIANGLE                                                                  */
      case 'triangle':
        triangle(
          (boxLength * (this.x + .50)) + (halfPadding) * (this.xOff),                                                     //X1  TOP      MIDDLE
          (boxLength * (this.y + .17)) + (halfPadding) * (this.yOff),                                                     //Y1  TOP      MIDDLE
          (boxLength * (this.x + .13)) + (halfPadding) * (this.xOff),                                                     //X2  BOTTOM   LEFT
          (boxLength * (this.y + .83)) + (halfPadding) * (this.yOff),                                                     //Y2  BOTTOM   LEFT
          (boxLength * (this.x + .87)) + (halfPadding) * (this.xOff),                                                     //X3  BOTTOM   RIGHT
          (boxLength * (this.y + .83)) + (halfPadding) * (this.yOff));                                                    //Y3  BOTTOM   RIGHT
        if (!this.drawoutline) {
          for (i = 0, this.a = 1; i < 15; i++) {
            if (i > 15 / 2) { this.a -= 25 } else { this.a += 25 }
            line(
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,            //X1 
              (boxLength * (y)) + (halfPadding) * (this.yOff) + boxLength * .9 - this.a * (boxLength / 250),              //Y1 
              ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,            //X2 
              (boxLength * (y + 1)) + (halfPadding) * (this.yOff) - boxLength / 2 + 15 * (boxLength / 40)                 //Y2
            );
          }
        }
        break;
      /*                                                  PARALLELOGRAM                                                               */
      case 'parallelogram':
        quad(
          (boxLength * (this.x + .35)) + (halfPadding) * (this.xOff),                                                     //X1  TOP      LEFT
          (boxLength * (this.y + .27)) + (halfPadding) * (this.yOff),                                                     //Y1  TOP      LEFT
          (boxLength * (this.x + .87)) + (halfPadding) * (this.xOff),                                                     //X2  TOP      RIGHT
          (boxLength * (this.y + .27)) + (halfPadding) * (this.yOff),                                                     //Y2  TOP      RIGHT
          (boxLength * (this.x + .65)) + (halfPadding) * (this.xOff),                                                     //X3  BOTTOM   RIGHT
          (boxLength * (this.y + .73)) + (halfPadding) * (this.yOff),                                                     //Y3  BOTTOM   RIGHT
          (boxLength * (this.x + .13)) + (halfPadding) * (this.xOff),                                                     //X4  BOTTOM   LEFT
          (boxLength * (this.y + .73)) + (halfPadding) * (this.yOff));                                                    //Y4  BOTTOM   LEFT
        if (!this.drawoutline) {
          for (i = 0, this.t = boxLength / 2.7, this.b = 0; i < 15; i++) {
            if (i < 4) { (this.t -= i * boxLength / 18) } else { this.t = 0 }
            if (i > 10) { this.b += i * boxLength / 125 }
            line(
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,  //X1
              (boxLength * (this.y)) + (halfPadding) * (this.yOff) + boxLength * .7 - this.b,                             //Y1 
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,  //X2  
              (boxLength * (this.y + 1)) + (halfPadding) * (this.yOff) - boxLength * .7 + this.t                          //Y2  
            );
          }
        }
        break;
      default:
        console.log('INCORRECT SPELLING ON SHAPE TYPE DECLARATION');
        break;
    }
    if (!this.drawoutline) {
      this.drawoutline++;
      this.drawShape();
    }
  }
}