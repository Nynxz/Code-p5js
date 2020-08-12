function shapeDrawer(x, y) {
    let para = new Shape(x,y, 'parallelogram');
    noStroke();
    //#region CIRCLE
    if ((x % 2 == 0 && y % 3 == 0)) {
      let cir = new Shape(x,y, 'circle', 'red', 'yellow');
      cir.drawShape(x,y);
      // fill(255, 0, 0);
      // drawCircle(x, y);
      // stroke(255, 255, 0);
      
      // for (i = 0, a = 7; i < 15; i++) {
      //   if (i > 15 / 2) { a-- } else { a++ }
      //   line(
      //     //START POINT     JANK CODE - TRIAL AND ERROR
      //     ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,     //X1  GOOD 
      //     (boxLength * y) + ((boxLength + padding * (2 * y + 1)) / 2) - (boxLength * a / 36),                  //Y1  GOOD      
  
      //     //END POINT
      //     ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,     //X2  GOOD
      //     (boxLength * y) + ((boxLength + padding * (2 * y + 1)) / 2) + (boxLength * a / 36)                   //Y2  GOOD
      //   );
      // }
      // //CIRCLE OUTLINE
      // noFill();
      // stroke(255, 0, 0);
      // strokeWeight(boxLength / 15);
      // drawCircle(x, y);
    }
    //#endregion
    //#region SQUARE
    if ((x % 2 == 0 && y % 3 == 1)) {
  
      let sq = new Shape(x,y, 'square', 'yellow', 'blue');
      sq.drawShape(x,y);
      // fill(255, 255, 0);
      // rectMode(CENTER);
      // drawSquare(x, y);
      // stroke(0, 0, 255);
      // for (i = 0; i < 15; i++) {
      //   line(
      //     //START POINT     JANK CODE - TRIAL AND ERROR
      //     ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,     //X1  GOOD
      //     (boxLength * (y)) + (halfPadding) * (2 * y + 1) + boxLength / 2 - (boxLength * .4),           //Y1  GOOD
  
      //     //END POINT
      //     ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,     //X2  GOOD
      //     (boxLength * (y + 1)) + (halfPadding) * (2 * y + 1) - boxLength / 2 + (boxLength * .4)        //Y2  GOOD
      //   );
      // }
    }
    //#endregion
    //#region TRIANGLE
    if ((x % 2 == 0 && y % 3 == 2)) {
      let tri = new Shape(x,y, 'triangle', 'blue', 'red');
      
      tri.drawShape(x,y);
      // fill(0, 0, 255);
      // drawTriangle(x, y);
      // stroke(255, 0, 0);
      // for (i = 0, a = 1; i < 15; i++) {
      //   if (i > 15 / 2) { a -= 25 } else { a += 25 }
      //   line(
      //     //START POINT     JANK CODE - TRIAL AND ERROR
      //     ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,     //X1  GOOD
      //     (boxLength * (y)) + (halfPadding) * (2 * y + 1) + boxLength * .9 - a * (boxLength / 250),     //Y1  GOOD
  
      //     //END POINT
      //     ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,     //X2  GOOD
      //     (boxLength * (y + 1)) + (halfPadding) * (2 * y + 1) - boxLength / 2 + 15 * (boxLength / 40)       //Y2  GOOD
      //   );
      // }
  
      // //TRIANGLE OUTLINE
      // noFill();
      // stroke(0, 0, 255);
      // strokeWeight(boxLength * .035);
      // drawTriangle(x, y);
    }
    //#endregion
    //#region RECTANGLE
    if ((x % 2 == 1 && y % 3 == 0)) {
      let rec = new Shape(x,y, 'rectangle', 'red', 'blue');
      rec.drawShape(x,y,'rectangle', 'red', 'blue');
      // fill(255, 0, 0);
      // rectMode(CENTER);
      // drawRectangle(x, y);
      // stroke(0, 0, 255);
      // for (i = 0; i < 15; i++) {
      //   line(
      //     //START POINT     JANK CODE - TRIAL AND ERROR
      //     ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,     //X1  GOOD
      //     (boxLength * (y)) + (halfPadding) * (2 * y + 1) + boxLength / 2 - (boxLength * .2),           //Y1  GOOD
  
      //     //END POINT
      //     ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,     //X2  GOOD
      //     (boxLength * (y + 1)) + (halfPadding) * (2 * y + 1) - boxLength / 2 + (boxLength * .2)        //Y2  GOOD
      //   );
      // }
    }
    //#endregion
    //#region TRAPEZOID
    if ((x % 2 == 1 && y % 3 == 1)) {
      let trap = new Shape(x,y, 'trapezoid', 'yellow', 'red');
      trap.drawShape();
      // fill(255, 255, 0);
      // drawTrapezoid(x, y);
      // stroke(255, 0, 0);
      // for (i = 0, a = 25; i < 15; i++) {
      //   if (i > 10) { a -= 26 } else if (i < 5) { a += 26 }
      //   line(
      //     //START POINT     JANK CODE - TRIAL AND ERROR
      //     ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,     //X1  GOOD
      //     (boxLength * (y)) + (halfPadding) * (2 * y + 1) + boxLength * .9 - a * (boxLength / 250),     //Y1  GOOD
  
      //     //END POINT
      //     ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,     //X2  GOOD
      //     (boxLength * (y + 1)) + (halfPadding) * (2 * y + 1) - boxLength / 2 + 15 * (boxLength / 70)       //Y2  GOOD
      //   );
      // }
  
      // noFill();
      // stroke(255, 255, 0);
      // strokeWeight(boxLength * .036);
      // drawTrapezoid(x, y);
    }
    //#endregion
    //#region PARALLELOGRAM
    if ((x % 2 == 1 && y % 3 == 2)) {
      let para = new Shape(x,y, 'parallelogram', 'blue', 'yellow');
      //fill(0, 0, 255);
      //drawParallelogram(x, y);
      //stroke(255, 0, 0);
      // for (i = 0, t = boxLength / 2.7, b = 0; i < 15; i++) {
      //   if (i < 4) { (t -= i * boxLength / 18) } else { t = 0 }
      //   if (i > 10) { b += i * boxLength / 125 }
        // line(
        //   //START POINT     JANK CODE - TRIAL AND ERROR
        //   ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,      //X1  GOOD
        //   (boxLength * (y)) + (halfPadding) * (2 * y + 1) + boxLength * .7 - b,                                 //Y1  GOOD
  
        //   //END POINT
        //   ((boxLength * x) + (boxLength * 0.15) + (x * padding + 0.5 * padding)) + (0.05 * boxLength) * i,     //X2  GOOD
        //   (boxLength * (y + 1)) + (halfPadding) * (2 * y + 1) - boxLength * .7 + t                //Y2  GOOD
        // );
        //}
  
      // strokeWeight(boxLength / 20);
      // noFill();
      // stroke(0, 0, 255);
      para.drawShape();
      
    }
    //#endregion
  }
  
  //#region  SHAPE FUNCTIONS
  function drawCircle(x, y) {
    let circleSize = boxLength * .78;
    let xOff = 2 * x + 1;
    let yOff = 2 * y + 1;
  
    circle(
      boxLength * (x + .5) + (halfPadding) * (xOff),
      boxLength * (y + .5) + (halfPadding) * (yOff),
      circleSize
    );
  }
  
  function drawTriangle(x, y) {
    let xOff = 2 * x + 1;
    let yOff = 2 * y + 1;
  
    triangle(
      (boxLength * (x + .50)) + (halfPadding) * (xOff),  //X1  TOP    GOOD
      (boxLength * (y + .10)) + (halfPadding) * (yOff),  //Y1  TOP    GOOD
      (boxLength * (x + .13)) + (halfPadding) * (xOff),  //X2  BOTTOMLEFT
      (boxLength * (y + .86)) + (halfPadding) * (yOff),  //Y2  BOTTOMLEFT
      (boxLength * (x + .87)) + (halfPadding) * (xOff),  //X3  BOTTOMRIGHT
      (boxLength * (y + .86)) + (halfPadding) * (yOff)   //Y3  BOTTOMRIGHT
    );
  }
  
  function drawSquare(x, y) {
    let xOff = 2 * x + 1;
    let yOff = 2 * y + 1;
    square(
      (boxLength * (x + .5)) + (halfPadding) * (2 * x + 1),          //CENTERX
      (boxLength * (y + .5)) + (halfPadding) * (2 * y + 1),          //CENTERY
      boxLength * .83);                                         //SIZE
  
  }
  
  function drawRectangle(x, y) {
    rect(
      (boxLength * (x + .5)) + (halfPadding) * (2 * x + 1),          //CENTERX
      (boxLength * (y + .5)) + (halfPadding) * (2 * y + 1),          //CENTERY
      boxLength * .83,                                               //WIDTH
      boxLength * .5);                                               //HEIGHT
  
  }
  
  function drawTrapezoid(x, y) {
    quad(
      (boxLength * (x + .35)) + (halfPadding) * (2 * x + 1),            //X1  TOP     LEFT
      (boxLength * (y + .27)) + (halfPadding) * (2 * y + 1),            //Y1  TOP     LEFT
      (boxLength * (x + .65)) + (halfPadding) * (2 * x + 1),            //X2  TOP     RIGHT
      (boxLength * (y + .27)) + (halfPadding) * (2 * y + 1),            //Y2  TOP     RIGHT
      (boxLength * (x + .87)) + (halfPadding) * (2 * x + 1),            //X3  BOTTOM  RIGHT
      (boxLength * (y + .72)) + (halfPadding) * (2 * y + 1),            //Y3  BOTTOM  RIGHT
      (boxLength * (x + .13)) + (halfPadding) * (2 * x + 1),            //X4  BOTTOM  LEFT
      (boxLength * (y + .72)) + (halfPadding) * (2 * y + 1));           //Y4  BOTTOM  LEFT
  }
  
  function drawParallelogram(x, y) {
    quad(
      (boxLength * (x + .35)) + (halfPadding) * (2 * x + 1),            //X1  TOP     LEFT
      (boxLength * (y + .27)) + (halfPadding) * (2 * y + 1),            //Y1  TOP     LEFT
      (boxLength * (x + .87)) + (halfPadding) * (2 * x + 1),            //X2  TOP     RIGHT
      (boxLength * (y + .27)) + (halfPadding) * (2 * y + 1),            //Y2  TOP     RIGHT
      (boxLength * (x + .65)) + (halfPadding) * (2 * x + 1),            //X3  BOTTOM  RIGHT
      (boxLength * (y + .73)) + (halfPadding) * (2 * y + 1),            //Y3  BOTTOM  RIGHT
      (boxLength * (x + .13)) + (halfPadding) * (2 * x + 1),            //X4  BOTTOM  LEFT
      (boxLength * (y + .73)) + (halfPadding) * (2 * y + 1));           //Y4  BOTTOM  LEFT
  }
  //#endregion