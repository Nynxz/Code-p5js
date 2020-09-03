// for (let x = cstart; x <= rend; x += box) {
//     stroke(0);
//     strokeWeight(2);
//     line(x, cstart, x, cend);
//   }

//   angleMode(DEGREES);
//   strokeWeight(5);
//   stroke(255);

//   let curve = []

//   curve.push({xPos: 5 * box * cos(1 * angle), yPos: 5 * box * sin(3 * angle)})
 
//   if ((curvex.length > 100)) {
//     curvex.shift();
//   } else if (curve.length > 2) {
//     for (i = 0; i < curve.length; i++) {
//         line(
//             width / 2 + curvex[i].x,
//             height / 2 + curvey[i].y,
//             width / 2 + curvex[i + 1].x,
//             height / 2 + curvey[i + 1].y
//           );
//     }
//     angle += 0.1;
//   }

let y1 = 10;
var pos = {
    x:100,
    y:50
};
var col = {
    r:220,
    g:0,
    b:0
};
let img;
function preload(){
    img = loadImage('https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_310/https://www.aeccglobal.my/wp-content/uploads/2020/05/griffith-logo.png');
}
function setup(){
    createCanvas(650,250);
    background(222)
    x1 = width / 3;
    y1 = 260
}

function draw(){

 
    noStroke();
    pos.x = random(0,width);
    pos.y = random(0, 50);
    fill(col.r,col.g,col.b);
    ellipse(pos.x,pos.y,30,30,100);

    pos.y = random(200,250)
    fill(col.r,col.g,col.b);
    ellipse(pos.x,pos.y,30,30,100);

    rectMode(CENTER);
    fill(222);
    rect(width/2,height/2,650,140);
    moveImage()
    textAlign(CENTER);
    textSize(50);
    fill(222);
    text('Creative Coding',width/2, 40);
    text('1071 ICT',width/2,240);
    textSize(10);
    text('Powered by P5.JS',width/2,52);
  
    

    }

    function moveImage(){
    imageMode(CENTER);

    if(y1<0){
      image(img,width/2, y1);
    }else (y1>0)
      image(img,width/2, y1);
      y1=y1-10
}