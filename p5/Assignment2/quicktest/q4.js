let vid;
function setup(){
    createCanvas(500,500);
    
    vid = createVideo(["/p5/Assignment2/quicktest/BigSchnozer.mp4"], playVideo);

}
function draw(){
    background(155);
}

function playVideo(){
    vid.volume(0);
    vid.autoplay();
    vid.hide();
}

function keyPressed(){
    vid.stop()
    vid.play();
    vid.show();
}


// function ultraSickOneLiner(sprite, speed){
//     sprite.setVelocity(keyDown(65) ? -speed : keyDown(68) ? speed : 0,keyDown(87) ? -speed : keyDown(83) ? speed : 0 );
// }