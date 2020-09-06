const SPRITEPIXELSIZE = 32;
function DisplayCarSelectMenu(){
    console.log('Car Select');
    ClearDrawLayer();
    //clear();
    background(200);
    carMenu.DrawMenu();
}
function DisplayMapSelectMenu(){
    ClearDrawLayer();
    background(200);
    mapMenu.DrawMenu();
}

let car, map, player;
function StartRace(){
    ClearDrawLayer();
    
    clear();
    ingame = true;
    
    
    print(mapg.getWidth() + " " + mapg.getHeight() + "map hw");
    player = new Racer(car, map);
    //resizeCanvas(map.getWidth() * SPRITEPIXELSIZE * 3, map.getHeight() * SPRITEPIXELSIZE * 3);
    canvas.position(0,0);
    mapg.drawMap();
    car.drawCar();
    //
    
}



class Racer{
    constructor(car, map){
        this.car = car;
        this.map = map;
        console.log(car);
    }
};
class Car{
    constructor(topSpeed, acceleration, turning, sprite, start){
        this.topSpeed = topSpeed;
        this.acceleration = acceleration;
        this.turning = turning;
        this.image = sprite;
        this.sprite;
        this.currentSpeed = 0;
        this.start = start;
        //console.log('tes');
    }

    drawCar(){
        this.sprite = createSprite(this.start.x, this.start.y, 0, 0);
        this.sprite.rotation-=90;
        this.sprite.immovable = true;
        this.sprite.addImage(this.image);
        console.log(this.sprite);
        //this.sprite.scale = 1.5;
        this.sprite.debug = true;
        this.sprite.setCollider('circle', 0, 0, SPRITEPIXELSIZE/10)
       // this.sprite.addToGroup(drawLayer);
        //drawLayer.draw();
    }

    MoveCar(){        
        let speed = this.currentSpeed;
        if(this.sprite.overlap(hazards)){
            speed *= 0.5;
          //StartRace(currentLoadedMap);
          console.log("collided with hazard");
        } 
      this.sprite.setSpeed(speed, this.sprite.rotation - 90);
       // this.sprite.setSpeed(this.currentSpeed, car._rotation - 90);
       if(keyIsDown(87)){//W
        this.currentSpeed = constrain(speed+(this.acceleration/100),-1,this.topSpeed);
       } else {
        this.currentSpeed = constrain(speed-((this.acceleration/100)/2),0,this.topSpeed);
       }
       if(keyIsDown(83)){//S
        this.currentSpeed = constrain(speed-(this.acceleration/100),-1,this.topSpeed);
       }
       if(keyIsDown(65)){//A
         if(Math.abs(speed)>0.1)
         this.sprite.rotation-=1*speed / (5/this.turning);
      }
      if(keyIsDown(68)){//D
        if(Math.abs(speed)>0.1)
        this.sprite.rotation+=1*speed / (5/this.turning);
      }
      
}
};
class Map{
    constructor(){
        this.txt;
        this.map2d;
        this.mheight;
        this.mwidth;
        this.startpos;
    }

    getWidth(){
        let maxWidth = 0;
        for(let arr in this.map2d){
            print(this.map2d[arr].length);
            maxWidth =  maxWidth < this.map2d[arr].length ? this.map2d[arr].length : maxWidth;
        }
        return maxWidth > 0 ? maxWidth : 10;
    }

    getHeight(){
        return this.mheight;
    }

    getStartpos(){
        return this.startpos;
    }

    loadTrack() {
        let track = this.txt.map(e => e.split(''));
        track = track.map((a, aindex) => a.map((e, eindex) => this.makeTile(eindex,aindex, e)));
        return track;
    }

    drawMap(){
        mapGroup = new Group();
        for(let arr of this.map2d){
            for(let tile of arr){
                tile.sprite.addToGroup(mapGroup);
                tile.sprite.draw();
                //console.log(tile.sprite);
            }
        }
        drawSprites(mapGroup);
    }

    setMap(txt){
        clear();
        hazards = new Group();
        console.log('map2d')
        console.log(this.map2d);
        ClearDrawLayer();
        this.txt = txt;
        this.map2d = this.loadTrack(txt);
        this.mheight = this.txt.length < 0 ? this.txt.length : 10;
        this.mwidth = this.getWidth();
        this.startpos;
    }


    makeTile(row, col, type){
        let newSprite = createSprite(
            (((row) * (SPRITEPIXELSIZE*2)) + (SPRITEPIXELSIZE)),
            ((col) * SPRITEPIXELSIZE*2)  + (SPRITEPIXELSIZE),
            SPRITEPIXELSIZE,SPRITEPIXELSIZE);
        //newSprite.debug = true;
        
        switch(type){
            case "0":
                newSprite.addImage(grass);
                newSprite.addToGroup(drawLayer);
                newSprite.addToGroup(hazards);
            break;
            case "1":
                newSprite.addImage(road);
                newSprite.addToGroup(drawLayer);
            break;
            case "2":
                newSprite.addImage(finish);
                this.startpos = newSprite.position;
            break;
        }
        newSprite.scale = SPRITEPIXELSIZE/32*2;
        newSprite.immovable = true;
        return {
            type:type,
            sprite:newSprite
        };
    }
}