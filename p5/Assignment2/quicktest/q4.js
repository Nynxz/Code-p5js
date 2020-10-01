let vid;

function setup(){
    vid = createVideo(["/p5/Assignment2/quicktest/BigSchnozer.mp4"], playVideo);
}


function playVideo(){
    //vid.volume(0);
    vid.autoplay();
}



// function ultraSickOneLiner(sprite, speed){
//     sprite.setVelocity(keyDown(65) ? -speed : keyDown(68) ? speed : 0,keyDown(87) ? -speed : keyDown(83) ? speed : 0 );
// }