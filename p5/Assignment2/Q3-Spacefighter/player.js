const playerDEBUG = true;

class Player{
    constructor(img){
        this.rawimg = img;
        this.sprite = (this.turnIntoSprite(this.rawimg));
        this.ShipInfo = {
            maxSpeed = 5,
            currentSpeed: 0
        }
        //console.log(this.sprite);
    }

    turnIntoSprite(img){
        let sprite = createSprite();
        sprite.addImage(img);
        return sprite
    }

    drawPlayer(x, y){
        this.sprite.position.x = x;
        this.sprite.position.y = y;
    }

    
    movePlayer(vector, thrust){
        currentSpeed = (constrain(currentSpeed+=(thrust*vector.y), -1, maxSpeed));
        this.sprite.rotation += (thrust*vector.x);
        this.sprite.setSpeed(currentSpeed, this.sprite.rotation);
        // //console.log(vector);
        // this.sprite.setS//TODO += vector.x * speed;
        // this.sprite.position.y += vector.y * speed;
    }


}


class Controls {
    constructor(){

    }

    retInputVector(){
        let x= 0, y = 0;
        if(keyIsDown(87)){ //W
            y = constrain(y+=1, -1, 1); 
        }
        if(keyIsDown(83)){ //S
            y = constrain(y-=1, -1, 1); 
        }
        if(keyIsDown(68)){ //D
            x = constrain(x+=1, -1, 1); 
        }
        if(keyIsDown(65)){ //S
            x = constrain(x-=1, -1, 1); 
        }
        let vector = new p5.Vector();

        vector.x = x;
        vector.y = y;
        if(playerDEBUG && frameCount % 30 == 0){

            console.log(vector);
        }
        return vector
    }
}