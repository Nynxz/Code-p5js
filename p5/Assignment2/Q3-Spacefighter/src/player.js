const playerDEBUG = false;
const PLAYERSPRITESIZE = 64;

//Debug create Player
/*
 mainmenu = new Menu(buttonmainimg,
     {
        name: 'Play', OnClick: function () {
            allSprites.clear();
            player = new Player(shipimg);
            player.setWeapons(1, weaponsjson.Type.Basic.StandardShot);
            player.setWeapons(2, weaponsjson.Type.Lazer.RedBeam);
            player.placePlayer(width/2 - (settingsjson.globalSettings.sidebarWidth/2), height/2)
            currentState = states.PLAYING;
            console.log("PLAY!");
        }},
     {
*/
function createNewDebugPlayer(){

    debugWeaponL = new WeaponPoint(
        createVector(-(PLAYERSPRITESIZE/2), -(PLAYERSPRITESIZE/8)), //Position Offset
        createVector(0, -10), //Muzzle Direction
        weaponsjson.Type.Basic.StandardShot //Bullet Type
        );
    debugWeaponR = new WeaponPoint(
        createVector(+(PLAYERSPRITESIZE/2), -(PLAYERSPRITESIZE/8)), //Position Offset
        createVector(0, -10), //Muzzle Direction
        weaponsjson.Type.Basic.StandardShot //Bullet Type
        )
    playerDebugShip = new Ship(shipimg, 100, createVector(1,1), [debugWeaponL, debugWeaponR]);
    player = new Player(playerDebugShip)
}

class Player{
    constructor(ship){
        
        this.ship = ship;
        this.currentPoints = 0;
        
        this.ship.sprite = (this.turnIntoSprite(this.ship.img));
        this.ship.sprite.image = this.ship.img;
        delete this.ship.img;
        debugWarn(ship);
        debugWarn(this);
        //this.shipInfo = new Object();
        //this.shipInfo.currentSpeed = 0;
        //this.shipInfo.currentAcceleration = 1;d
        //this.shipInfo.maxSpeed = 5;
        //this.shipInfo.weapons1 = null;
        //this.shipInfo.weapons2 = null;

    }
    // constructor(img){
    //     this.currentPoints = 0;
    //     this.rawimg = img;
    //     this.sprite = (this.turnIntoSprite(this.rawimg));
    //     this.shipInfo = new Object();
    //     this.shipInfo.currentSpeed = 0;
    //     this.shipInfo.currentAcceleration = 1;
    //     this.shipInfo.maxSpeed = 5;
    //     this.shipInfo.weapons1 = null;
    //     this.shipInfo.weapons2 = null;
    //     //console.log(this.sprite);
    // }

    // setWeapons(slot, weapon){
    //     this.shipInfo.currentBullets = new Array()
    //     switch(slot){
    //         case 1:
    //             this.shipInfo.weapons1 = weapon;
    //            // this.shipInfo.weapons1.img = loadImage(this.shipInfo.weapons1.img);
    //         break;
         
    //         case 2:
    //             this.shipInfo.weapons2 = weapon;
    //             //this.shipInfo.weapons2.img = loadImage(this.shipInfo.weapons2.img);
                
    //         break       
    //     }
    
    // }

    cleanupBullets(){
        //console.log(allSprites);

       for(let i = 0; i <  this.shipInfo.currentBullets.length; i++){
        if(this.shipInfo.currentBullets.length > 50){
            for(let j = 0; j < this.shipInfo.currentBullets.length  -50 ;j++){
                this.shipInfo.currentBullets.shift();
            }
            
        }
       }

    }

    shoot(shoot1, shoot2){
        //this.cleanupBullets();
        if(frameCount % this.ship.info.weapons[0].bullet.type.cooldown == 0 && shoot1){ //
            console.log(this.ship.info.weapons);
            console.log("PEW PEW");
            new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[0].bullet.type);
            new Bullet(this.ship, this.ship.info.weapons[1], this.ship.info.weapons[1].bullet.type);

            
            
            
            // let bullet1, bullet2;
            // bullet1 = createSprite(this.sprite.position.x + (PLAYERSPRITESIZE/2), this.sprite.position.y - (PLAYERSPRITESIZE/8),10, 10);
            // bullet2 = createSprite(this.sprite.position.x - (PLAYERSPRITESIZE/2), this.sprite.position.y - (PLAYERSPRITESIZE/8),10, 10);
            // bullet1.addImage(weaponsjson.Type.Basic.StandardShot.img);
            // bullet2.addImage(weaponsjson.Type.Basic.StandardShot.img);
            // bullet1.setVelocity(0, -10);
            // bullet2.setVelocity(0, -10);
            // bullet1.life = this.shipInfo.weapons1.range;
            // bullet2.life = this.shipInfo.weapons1.range;
            // bullet1.damage = this.shipInfo.weapons1.damage;
            // bullet2.damage = this.shipInfo.weapons1.damage;
            // bullets.add(bullet1);
            // bullets.add(bullet2);
            // bullet1.draw();
            // bullet2.draw();

            // bullet1.debug = playerDEBUG;
            // bullet2.debug = playerDEBUG;
            // this.shipInfo.currentBullets.push(bullet1,bullet2);

            // console.log("PEW PEW PEW");
        }
        // if(frameCount % this.shipInfo.weapons2.cooldown == 0 && shoot2){
        //     let bullet;
        //     bullet = createSprite(this.sprite.position.x, this.sprite.position.y- (PLAYERSPRITESIZE/2 + 16),10, 10);
        //     bullet.addImage(weaponsjson.Type.Lazer.RedBeam.img);
        //     bullet.setVelocity(0, -5);
        //     bullet.life = this.shipInfo.weapons2.range;
        //     bullet.addToGroup(bullets);
        //     bullet.damage = this.shipInfo.weapons2.damage;
        //     bullet.draw();
        //     bullet.type = this.shipInfo.weapons2.special;
        //     this.shipInfo.currentBullets.push(bullet);
        //     console.log("PEW2 PEW2 PEW2");
        // }
        //this.cleanupBullets();
    }

    turnIntoSprite(img){
        let sprite = createSprite();
        sprite.addImage(img);
        sprite.setCollider ("circle",0,0, 25);
        sprite.debug = true;
        return sprite
    }

    placePlayer(x, y){
        //this.ship.sprite.draw();
        this.ship.sprite.position.x = x;
        this.ship.sprite.position.y = y;
    }

    
    movePlayer(vector, thrust){
        if(playerDEBUG && frameCount% 30 == 0){
            console.log(this.ship.info);
        }

        // if(vector.y == 1){ //GOING BACKWARDS
        //     thrust /= 2;
        // }

        this.ship.sprite.setVelocity(
            vector.x * this.ship.info.vecAcceleration.x * thrust,
            vector.y * this.ship.info.vecAcceleration.y * thrust
        );

        this.constrainPlayer();
    }
    constrainPlayer(){
        this.ship.sprite.position.x = constrain(this.ship.sprite.position.x, 0+(PLAYERSPRITESIZE/2), width-(PLAYERSPRITESIZE/2) - settingsjson.globalSettings.sidebarWidth - 5);
        this.ship.sprite.position.y = constrain(this.ship.sprite.position.y, 0+(PLAYERSPRITESIZE/2), height-(PLAYERSPRITESIZE/2));
    }

}


