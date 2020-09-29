let sprite, vid;
function setup(){
   
    noCanvas();
    
    vid = createVideo(["/p5/Assignment2/funcbind/BigSchnozer.mp4"], playVideo);
    //vid.size(100,100);
    radio = createRadio();
    
  radio.option('black');
  radio.option('white');
  radio.option('gray');
  radio.style('width', '60px');
  textAlign(CENTER);
  //text(0,0,0);
  
  radio.position(0,0);
}

function draw(){

}

function playVideo(){
    vid.volume(0);
    vid.autoplay();
    //vid.loop();
    
}


// function ultraSickOneLiner(sprite, speed){
//     sprite.setVelocity(keyDown(65) ? -speed : keyDown(68) ? speed : 0,keyDown(87) ? -speed : keyDown(83) ? speed : 0 );
// }