let boxLength = 100 , boxAmountWidth = 9, boxAmountHeight = 3;   // <---- SCALE

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
    new Section(x, y, 'circle', 'red', 'yellow', 'blue');
  }
  else if ((x % 2 == 0 && y % 3 == 1)) {
    new Section(x, y, 'square', 'yellow', 'blue', 'red');
  }
  else if ((x % 2 == 0 && y % 3 == 2)) {
    new Section(x, y, 'triangle', 'blue', 'red', 'yellow');
  }
  else if ((x % 2 == 1 && y % 3 == 0)) {
    new Section(x, y, 'rectangle', 'red', 'blue', 'yellow');
  }
  else if ((x % 2 == 1 && y % 3 == 1)) {
    new Section(x, y, 'trapezoid', 'yellow', 'red', 'blue');
  }
  else if ((x % 2 == 1 && y % 3 == 2)) {
    new Section(x, y, 'parallelogram', 'blue', 'yellow', 'red');
  }
}

class Section {
  constructor(x, y, shape, shapeFillColour, strokeColour, horizontalLineColour) {
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.shapeFillColour = shapeFillColour
    this.strokeColour = strokeColour;
    this.horizontalLineColour = horizontalLineColour;
    this.xOff = 2 * x + 1;
    this.yOff = 2 * y + 1;
    this.drawoutline = false;
    this.drawBase();
    this.drawShape();
  }

  drawBase(){
    noStroke();
    rectMode(CORNER);
    fill(this.shapeFillColour);
    square(this.x * boxLength + (this.x + 0.5) * padding, this.y * boxLength + (this.y + 0.5) * padding, boxLength);
    this.drawHorizontalLines();
  }

  drawHorizontalLines() {
    let lineCount = 14
    stroke(this.horizontalLineColour);
    let lineThickness = boxLength / 50;
    for (let i = 0; i < lineCount; i++) {
      strokeWeight(lineThickness);
      line(
        boxLength * this.x + (padding * (2 * this.x + 1)) * 0.5,                                                           //X1
        ((boxLength * this.y) + (boxLength * 0.05) + (this.y * padding + 0.5 * padding)) + (0.07 * boxLength) * i,         //Y1
        boxLength * (this.x + 1) + (padding * (2 * this.x + 1)) * 0.5,                                                     //X2
        ((boxLength * this.y) + (boxLength * 0.05) + (this.y * padding + 0.5 * padding)) + (0.07 * boxLength) * i          //Y2
      );
    }
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
      /*                                                   CIRCLE                                                         */
      case 'circle':
        let circleSize = boxLength * 0.78;
        circle(
          boxLength * (this.x + 0.5) + (halfPadding) * (this.xOff),                                                        //CENTERX
          boxLength * (this.y + 0.5) + (halfPadding) * (this.yOff),                                                        //CENTERY
          circleSize                                                                                                       //SIZE
        );
        if (!this.drawoutline) {
          for (let i = 0, a = 7; i < 15; i++) {
            if (i > 15 / 2) { a-- } else { a++ }
            line(
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,  //X1
              (boxLength * this.y) + ((boxLength + padding * (this.yOff)) / 2) - (boxLength * a / 37),                    //Y1    
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,  //X2
              (boxLength * this.y) + ((boxLength + padding * (this.yOff)) / 2) + (boxLength * a / 37)                     //Y2
            );
          }
        }
        break;
      /*                                                   RECTANGLE                                                      */
      case 'rectangle':
        rect(
          (boxLength * (this.x + 0.5)) + (halfPadding) * (this.xOff),                                                      //CENTERX
          (boxLength * (this.y + 0.5)) + (halfPadding) * (this.yOff),                                                      //CENTERY
          boxLength * 0.8,                                                                                                 //WIDTH
          boxLength * 0.45);                                                                                               //HEIGHT
        if (!this.drawoutline) {
          for (let i = 0; i < 15; i++) {
            line(
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X1
              (boxLength * (this.y)) + (halfPadding) * (this.yOff) + boxLength / 2 - (boxLength * 0.2),                    //Y1 
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X2
              (boxLength * (this.y + 1)) + (halfPadding) * (this.yOff) - boxLength / 2 + (boxLength * 0.2));               //Y2 
          }
        }
        break;
      /*                                                   SQUARE                                                         */
      case 'square':
        square(
          (boxLength * (this.x + 0.5)) + (halfPadding) * (this.xOff),                                                      //CENTERX
          (boxLength * (this.y + 0.502)) + (halfPadding) * (this.yOff),                                                    //CENTERY
          boxLength * 0.71);                                                                                               //SIZE
        if (!this.drawoutline) {
          for (let i = 0; i < 15; i++) {
            line(
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X1
              (boxLength * (this.y)) + (halfPadding) * (this.yOff) + boxLength / 2 - (boxLength * 0.35),                   //Y1
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X2
              (boxLength * (this.y + 1)) + (halfPadding) * (this.yOff) - boxLength / 2 + (boxLength * 0.35)                //Y2
            );
          }
        }
        break;
      /*                                                   TRAPEZOID                                                      */
      case 'trapezoid':
        quad(
          (boxLength * (this.x + 0.35)) + (halfPadding) * (this.xOff),                                                     //X1  TOP      LEFT
          (boxLength * (this.y + 0.27)) + (halfPadding) * (this.yOff),                                                     //Y1  TOP      LEFT
          (boxLength * (this.x + 0.65)) + (halfPadding) * (this.xOff),                                                     //X2  TOP      RIGHT
          (boxLength * (this.y + 0.27)) + (halfPadding) * (this.yOff),                                                     //Y2  TOP      RIGHT
          (boxLength * (this.x + 0.87)) + (halfPadding) * (this.xOff),                                                     //X3  BOTTOM   RIGHT
          (boxLength * (this.y + 0.74)) + (halfPadding) * (this.yOff),                                                     //Y3  BOTTOM   RIGHT
          (boxLength * (this.x + 0.13)) + (halfPadding) * (this.xOff),                                                     //X4  BOTTOM   LEFT
          (boxLength * (this.y + 0.74)) + (halfPadding) * (this.yOff));                                                    //Y4  BOTTOM   LEFT
        if (!this.drawoutline) {
          for (let i = 0, a = 25; i < 15; i++) {
            if (i > 10) { a -= 26 } else if (i < 5) { a += 26 }
            line(
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X1
              (boxLength * (this.y)) + (halfPadding) * (this.yOff) + boxLength * 0.9 - a * (boxLength / 250),              //Y1
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X2
              (boxLength * (this.y + 1)) + (halfPadding) * (this.yOff) - boxLength / 2 + 15 * (boxLength / 70)             //Y2
            );
          }
        }
        break;
      /*                                                    TRIANGLE                                                      */
      case 'triangle':
        triangle(
          (boxLength * (this.x + 0.50)) + (halfPadding) * (this.xOff),                                                     //X1  TOP      MIDDLE
          (boxLength * (this.y + 0.17)) + (halfPadding) * (this.yOff),                                                     //Y1  TOP      MIDDLE
          (boxLength * (this.x + 0.13)) + (halfPadding) * (this.xOff),                                                     //X2  BOTTOM   LEFT
          (boxLength * (this.y + 0.83)) + (halfPadding) * (this.yOff),                                                     //Y2  BOTTOM   LEFT
          (boxLength * (this.x + 0.87)) + (halfPadding) * (this.xOff),                                                     //X3  BOTTOM   RIGHT
          (boxLength * (this.y + 0.83)) + (halfPadding) * (this.yOff));                                                    //Y3  BOTTOM   RIGHT
        if (!this.drawoutline) {
          for (let i = 0, a = 1; i < 15; i++) {
            if (i > 15 / 2) { a -= 25 } else { a += 25 }
            line(
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X1 
              (boxLength * (this.y)) + (halfPadding) * (this.yOff) + boxLength * 0.9 - a * (boxLength / 250),              //Y1 
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X2 
              (boxLength * (this.y + 1)) + (halfPadding) * (this.yOff) - boxLength / 2 + 15 * (boxLength / 40)             //Y2
            );
          }
        }
        break;
      /*                                                  PARALLELOGRAM                                                   */
      case 'parallelogram':
        quad(
          (boxLength * (this.x + 0.35)) + (halfPadding) * (this.xOff),                                                     //X1  TOP      LEFT
          (boxLength * (this.y + 0.27)) + (halfPadding) * (this.yOff),                                                     //Y1  TOP      LEFT
          (boxLength * (this.x + 0.87)) + (halfPadding) * (this.xOff),                                                     //X2  TOP      RIGHT
          (boxLength * (this.y + 0.27)) + (halfPadding) * (this.yOff),                                                     //Y2  TOP      RIGHT
          (boxLength * (this.x + 0.65)) + (halfPadding) * (this.xOff),                                                     //X3  BOTTOM   RIGHT
          (boxLength * (this.y + 0.73)) + (halfPadding) * (this.yOff),                                                     //Y3  BOTTOM   RIGHT
          (boxLength * (this.x + 0.13)) + (halfPadding) * (this.xOff),                                                     //X4  BOTTOM   LEFT
          (boxLength * (this.y + 0.73)) + (halfPadding) * (this.yOff));                                                    //Y4  BOTTOM   LEFT
        if (!this.drawoutline) {
          for (let i = 0, t = boxLength / 2.7, b = 0; i < 15; i++) {
            if (i < 4) { (t -= i * boxLength / 18) } else { t = 0 }
            if (i > 10) { b += i * boxLength / 125 }
            line(
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X1
              (boxLength * (this.y)) + (halfPadding) * (this.yOff) + boxLength * 0.7 - b,                                  //Y1 
              ((boxLength * this.x) + (boxLength * 0.15) + (this.x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,   //X2  
              (boxLength * (this.y + 1)) + (halfPadding) * (this.yOff) - boxLength * 0.7 + t                               //Y2  
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