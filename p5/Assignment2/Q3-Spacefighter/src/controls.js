class Controls {
    constructor(){
        this.vector = new p5.Vector();
        this.shoot1 = 0;
        this.shoot2 = 0;
    }

    zero(){
        this.vector.x = 0;
        this.vector.y = 0;

    }

    refresh(){
        this.vector.x = 0;
        this.vector.y = 0;

        if(keyIsDown(87)){ //W
            this.vector.y = constrain(this.vector.y-=1, -1, 1); 
        } 
        if(keyIsDown(83)){ //S
            this.vector.y = constrain(this.vector.y+=1, -1, 1); 
        }
        if(keyIsDown(68)){ //D
            this.vector.x = constrain(this.vector.x+=1, -1, 1); 
        } 
        if(keyIsDown(65)){ //S
            this.vector.x = constrain(this.vector.x-=1, -1, 1); 
        }

        this.shoot1 = keyIsDown(32) ? 1 : 0;
        this.shoot2 = keyIsDown(69) ? 1 : 0;
        
        if(playerDEBUG && frameCount % 30 == 0){

            console.log(this.vector);
        }

    }
}