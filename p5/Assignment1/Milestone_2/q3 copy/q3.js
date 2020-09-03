// let angle = 0;
// let points = [];;

// function setup(){
//     createCanvas(1000,1000);
//     angleMode(DEGREES);
// }


// function draw(){
//     background('black');

//     let centreX = height/2;
//     let centreY = width/2;
//     let radius = 368;
//     let x = radius * cos(angle);
//     let y = radius * sin(angle*3);

    
//     if(points.length > 50){
//         points.shift()
//     } else {
//         points.push({x: centreX+x,y:centreY+y})
//         angle+= 1;
//     }
//     console.log(points)
//     strokeWeight(5)
//     stroke('red');
//     for(i=0; i<points.length; i++){
//         point(points[i].x, points[i].y); 
//     }    
// }
const width = 1000, height = 1000

function setup(){
    createCanvas(height,height);
    background('black');
    //A grey square
    let grey_rect_wdith = 900;
    let grey_rect_height = 900;
    let grey_rect_roundcourners = 50;

    fill(187,192,192);
    stroke(0,0,0);
    rect(height/20,height/20,grey_rect_wdith,grey_rect_height,grey_rect_roundcourners);

    //A smaller blue square on top of the grey square
    let blue_rect_wdith = 800;
    let blue_rect_height = 800;
    let blue_rect_roundcourners = 20;

    fill(88,139,174);
    noStroke();
    rect(height/10,height/10,blue_rect_wdith,blue_rect_height,blue_rect_roundcourners);

    let black_rect_wdith = 750;
    let black_rect_height = 750;

    let horizontal_spacing = (black_rect_wdith)/9;

    let vertical_spacing =(black_rect_height)/9;
    let horizontal_grid_offset = (height/8) + (horizontal_spacing);
    let vertical_grid_offset = (height/8) + (vertical_spacing);

    let grid_y = 125;
    let grid_bottom_y = 874;

    let grid_2_x = 125;
    let grid_2_bottom_x = 874;

    //1 black square with black outline and nofill for the grid
    noFill();
    stroke(0,0,0);
    strokeWeight(2);
    rect(height/8, height/8, black_rect_wdith,black_rect_height);

    // black grid
    for(i=0; i<8; i++){
        let grid_x = horizontal_spacing+horizontal_grid_offset;
        strokeWeight(2);
        line(grid_x, grid_y ,grid_x,grid_bottom_y);
    }

    for(u=0; u<8; u++){
       let grid_y = vertical_spacing+vertical_grid_offset;
       strokeWeight(2);
       line(grid_2_x,grid_y, grid_2_bottom_x, grid_y);
    }
}