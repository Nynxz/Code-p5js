const SPRITEPIXELSIZE = 64;

function DisplayCarSelectMenu(){
    console.log('Car Select');
    ClearDrawLayer();
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
    resizeCanvas(mapg.getWidth() * SPRITEPIXELSIZE*2, mapg.getHeight() * SPRITEPIXELSIZE*2);
    ClearDrawLayer();
    
    //clear();
    ingame = true;
    
    
    print(mapg.getWidth() + " " + mapg.getHeight() + "map hw");
    player = new Racer(car, map);
    
    canvas.position(0,0);
    //mapg.drawMap();
    car.resetCarStart(mapg.getStartpos());
    car.drawCar();
    //
    
}

function makeHUD(){
    

    hud = createGraphics(500, 600)
    hud.background(100, 200);
    hud.rectMode(CENTER);
    hud.textSize(32);
    hud.fill('black');
    hud.text("Current Select Car:", 0, 32);
    
}
function drawHUD(){
    let carImage = car.image;
    imageMode(CORNER);
    image(hud, 100,100);

    hud.image(carImage, 50,50, 200, 200);
}

function updateHUD(){

}

class HUD{
    constuctor(width, height, posx, posy, colour, ...contents){
        this.graphics = createGraphics(width, height);
        this.graphics.background(colour);
        this.posx = posx;
        this.posy = posy;
        this.contents = contents;
        image(this.graphics,this.posx,this.posy);
    }

    drawHUD(){
        
    }

}

class Racer{
    constructor(car, map){
        this.car = car;
        this.map = map;
        console.log(car);
    }
};
class Car{
    constructor(topSpeed, acceleration, turning, sprite, scale, start ){
        this.topSpeed = topSpeed;
        this.acceleration = acceleration;
        this.turning = turning;
        this.image = sprite;
        this.sprite;
        this.currentSpeed = 0;
        this.start = start;
        this.scale = scale;
        //console.log('tes');
    }

    resetCarStart(pos){
        this.start = pos;
    }

    drawCar(){
        this.currentSpeed = 0;
        this.sprite = createSprite(this.start.x, this.start.y, 0, 0);
        this.sprite.rotation-=90;
        this.sprite.immovable = true;
        this.sprite.addImage(this.image);
        this.sprite.scale = 2;
        console.log(this.sprite);
        this.sprite.scale = this.scale;
        this.sprite.debug = true;
        this.sprite.setCollider('circle', 0, 0, this.scale * 5)
       // this.sprite.addToGroup(drawLayer);
        //drawLayer.draw();
    }

    MoveCar(){        
        let speed = this.currentSpeed;
        if(this.sprite.overlap(hazards)){
            this.sprite.limitSpeed(0);
            this.currentSpeed = 0;
            speed = 0;
            StartRace();
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
                tile.sprite.visible = true;
                tile.sprite.addToGroup(mapGroup);
                //tile.sprite.draw();
                //console.log(tile.sprite);
            }
        }
        drawSprites(mapGroup);
    }

    setMap(txt){
        clear();
        hazards = new Group();
        mapGroup = new Group();
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
            newSprite.visible = false;
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

/*
let rawmap = loadStrings('track.txt');   

*/