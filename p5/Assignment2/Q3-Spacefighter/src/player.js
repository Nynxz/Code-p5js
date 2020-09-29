//STATUS - MEDIUM

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
        createVector(0, -1), //Muzzle Direction
        weaponsjson.Type.Basic.StandardShot //Bullet Type
        );
    debugWeaponR = new WeaponPoint(
        createVector(+(PLAYERSPRITESIZE/2), -(PLAYERSPRITESIZE/8)), //Position Offset
        createVector(0, -1), //Muzzle Direction
        weaponsjson.Type.Basic.StandardShot //Bullet Type
        )
    playerDebugShip = new Ship(shipimg, 100, createVector(3,3), [debugWeaponL, debugWeaponR]);
    
}

class Player{
    constructor(ship){
        this.ship = ship;

        this.currentPoints = 0;
        this.currentMoney = 0;
        this.ship.sprite = (this.turnIntoSprite(this.ship.img));
        this.ship.sprite.image = this.ship.img;
        this.ship.sprite.immovable = true;
        this.ship.sprite.self = this;
        this.ship.sprite.debug = inDebug;
        this.ship.sprite.shield = new Array();
        delete this.ship.img;
        this.info = new Object();
        this.info.redHitScreen = 0;
        //debugWarn(ship);
        //debugWarn(this);

    }

    cleanupBullets(){
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
            //console.log(this.ship.info.weapons);
            //console.log("PEW PEW");
            //console.log(this.ship.info.weapons[0].bullet.type.force);
            new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[0].bullet.type);
            new Bullet(this.ship, this.ship.info.weapons[1], this.ship.info.weapons[1].bullet.type);
        }
    }

    healthbar(){
        fill('#00FF00');
        rectMode(CENTER);
        noStroke();
        rect(this.ship.sprite.position.x, this.ship.sprite.position.y+55, (constrain(this.ship.info.currentHealth, 0, this.ship.info.currentHealth)), 15);
        this.info.redHitScreen == 0 ? 0 : this.displayRedHitScreen();
    }

    damage(bullet){

        this.dealDamage(bullet.damageAmount);
        
    }

    dealDamage(amount){
        this.info.redHitScreen = 25;
        this.ship.info.currentHealth -= amount;
        if(this.ship.info.currentHealth <= 0){
            this.die();

            //animation(basicgreenexplosion, );
            //console.log("DEAD");
            //this.ship.sprite.life = 1;
        
        }
    }

    displayRedHitScreen(){
        image(redhittedimg,-100,-100, settingsjson.globalSettings.canvasWidth +200 , height +200);
        this.info.redHitScreen--;
    }

    die(){
        //SMOKE CLOUD
        for(let i = 0, smoke; i < Math.floor(random(2,7)); i ++){
            smoke = createSprite(this.ship.sprite.position.x + random(-50,50), this.ship.sprite.position.y + random(-50,50));
            smoke.addAnimation('smoke', basicgreenexplosion);
            smoke.looping = true;
            smoke.life = 25;
            smoke.scale = this.ship.sprite.scale;
        }
        this.ship.sprite.setCollider("circle",0,0,0);
        this.ship.sprite.life = 0;
    }

    turnIntoSprite(img){
        let sprite = createSprite();
        sprite.addImage(img);
        sprite.setCollider ("circle");
        //sprite.debug = true;
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
        this.ship.sprite.position.x = constrain(this.ship.sprite.position.x, 0+(PLAYERSPRITESIZE/2) + 35, width-(PLAYERSPRITESIZE/2) - settingsjson.globalSettings.sidebarWidth - 35);
        this.ship.sprite.position.y = constrain(this.ship.sprite.position.y, 0+(PLAYERSPRITESIZE/2), height-(PLAYERSPRITESIZE/2));
    }

}


