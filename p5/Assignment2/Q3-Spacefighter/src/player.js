//STATUS - MEDIUM

//const playerDEBUG = false;
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
//Function to Create 
// function createNewDebugPlayer(){

//     debugWeaponL = new WeaponPoint(
//         createVector(-(PLAYERSPRITESIZE/2), -(PLAYERSPRITESIZE/8)), //Position Offset
//         createVector(0, -1), //Muzzle Direction
//         GameManager.weapons.Type.Basic.StandardShot //Bullet Type
//         );
//     debugWeaponR = new WeaponPoint(
//         createVector(+(PLAYERSPRITESIZE/2), -(PLAYERSPRITESIZE/8)), //Position Offset
//         createVector(0, -1), //Muzzle Direction
//         GameManager.weapons.Type.Basic.StandardShot //Bullet Type
//         )
//     playerDebugShip = new Ship(shipimg, 100, createVector(3,3), [debugWeaponL, debugWeaponR]);
    
// }

//Class for a new Player
class Player{

    //Player Constructor
    constructor(ship){

        //Propety to hold the Ship Object
        this.ship = ship;

        //Property for Current Points
        this.currentPoints = 0;
        //Property for Current Money
        this.currentMoney = 10000;

        //Populate The Ships Sprite
        this.ship.sprite = (this.turnIntoSprite(this.ship.img));

        //Set Ship Sprite to Immovable
        this.ship.sprite.immovable = true;
        //Set Reference Back to Sprites Parent Object
        this.ship.sprite.self = this;
        //Enable Sprite Debug if Enabled in Settings
        this.ship.sprite.debug = GameManager.settings.debug;
        //Set Default Max Shield
        this.ship.info.maxShield = 100;
        //Set Current Shield
        this.ship.info.currentShield = this.ship.info.maxShield;
        
        //Array Hold Shield "sides"
        this.ship.sprite.shield = new Array();

        //Objec to hold Information
        this.info = new Object();
        //Red Hit Screen Cooldown Property
        this.info.redHitScreen = 0;

    }


    // //Function to Cleanup Player Bullets
    // cleanupBullets(){
    //     this.shipInfo.currentBullets = this.shipInfo.currentBullets.filter()
    //     for(let i = 0; i <  this.shipInfo.currentBullets.length; i++){
    //         if(this.shipInfo.currentBullets.length > 50){
    //             for(let j = 0; j < this.shipInfo.currentBullets.length  -50 ;j++){
    //                 this.shipInfo.currentBullets.shift();
    //             }
    //         }
    //     }
    // }

    //Function for the Player to Shoot
    shoot(shoot1, shoot2){

        //SHOOT 1
        //Handling Weapon Cooldown
        if(frameCount % this.ship.info.weapons[0].bullet.type.cooldown == 0 && shoot1){
            //Weapon Type
            switch(this.ship.info.weapons[0].weapontype){
                //Straight
                case WeaponTypes.Straight: 
                    //Two Standard Bullets
                    new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[0].bullet.type);
                    new Bullet(this.ship, this.ship.info.weapons[1], this.ship.info.weapons[1].bullet.type);
                break;

                //Straight L
                case WeaponTypes.StraightL:
                    //Two Standard Bullets
                    new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[0].bullet.type);
                    new Bullet(this.ship, this.ship.info.weapons[1], this.ship.info.weapons[1].bullet.type);

                    //Two Side Ways Bullets
                    let bL = new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[0].bullet.type);
                    bL.sprite.setSpeed(this.ship.info.weapons[0].basevecDirection.y, 0);
                    bL.sprite.position.y-=15;
                    let bR = new Bullet(this.ship, this.ship.info.weapons[1], this.ship.info.weapons[1].bullet.type);
                    bR.sprite.setSpeed(this.ship.info.weapons[0].basevecDirection.y, 180);
                    bR.sprite.position.y-=15;
                break;
            }
        }
    }

    //Function to Draw Player Health Bar
    healthbar(){
        //Align Rectangle
        rectMode(CENTER);
        //Set Outline to Red
        stroke('red');
        //Draw Outline
        rect(this.ship.sprite.position.x, this.ship.sprite.position.y+55, this.ship.info.maxHealth, 15);
        //Set Bar to Red
        fill('#00FF00');
        noStroke();
        //Draw HealthBar
        rect(this.ship.sprite.position.x, this.ship.sprite.position.y+55, (constrain(this.ship.info.currentHealth, 0, this.ship.info.currentHealth)), 15);
        //If Hit Screen Counter is not 0, draw Hit Screen
        this.info.redHitScreen == 0 ? 0 : this.displayRedHitScreen();
    }

    //Function to Draw Player Shield Bar
    shieldbar(){
        //Align Rectangle
        rectMode(CENTER);
        //If Current Shield > 10 (min to be active)
        if(this.ship.info.currentShield <= 10){
            fill('lightblue')
        } else {
            fill('blue');
        }
        noStroke();
        //Draw Rectangle
        rect(this.ship.sprite.position.x, this.ship.sprite.position.y+55, (constrain(this.ship.info.currentShield, 0, this.ship.info.currentShield)), 15);
    }

    //Function to Recharge The Shield
    shieldRecharge(amount){
            this.ship.info.currentShield = constrain(this.ship.info.currentShield += amount, 0 , this.ship.info.maxShield)
    }

    damage(bullet){

        if(this.ship.info.currentShield <= 10){
            this.dealDamage(bullet.damageAmount);
        } else{
                
            let shieldhit = createSprite(this.ship.sprite.position.x, this.ship.sprite.position.y);

            
            if(this.ship.sprite.touching.top){
                shieldhit.addAnimation("top", shieldhittop);
            } else if(this.ship.sprite.touching.bottom){
                shieldhit.addAnimation("bottom", shieldhitbottom);
            }
            else if(this.ship.sprite.touching.left){
                shieldhit.addAnimation("left", shieldhitleft);
            }
            else if(this.ship.sprite.touching.right){
                shieldhit.addAnimation("right", shieldhitright);
            }
            this.ship.sprite.shield.push(shieldhit);
            shieldhit.scale = 3;
            shieldhit.life = 50;

            this.ship.info.currentShield -= bullet.damageAmount;
        }
    }

    dealDamage(amount){
        this.info.redHitScreen = 25;
        this.ship.info.currentHealth -= amount;
        if(this.ship.info.currentHealth <= 0){
            this.die();
            let date = new Date();
            GameManager.highscores.highscores.push({name: "PlayerName", score: GameManager.player.currentPoints, 'date': date.toDateString()});
            saveJSON(GameManager.highscores, 'highscores.json');
            //animation(basicgreenexplosion, );
            //console.log("DEAD");
            //this.ship.sprite.life = 1;
        
        }
    }

    displayRedHitScreen(){
        image(redhittedimg,-100,-100, GameManager.settings.globalSettings.canvasWidth +200 , height +200);
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
        this.ship.sprite.position.x = constrain(this.ship.sprite.position.x, 0+(PLAYERSPRITESIZE/2) + 35, width-(PLAYERSPRITESIZE/2) - GameManager.settings.globalSettings.sidebarWidth - 35);
        this.ship.sprite.position.y = constrain(this.ship.sprite.position.y, 0+(PLAYERSPRITESIZE/2) + 35, height-(PLAYERSPRITESIZE/2)-45);
    }

    zero(){
        this.ship.sprite.setVelocity(0,0);
    }

}


