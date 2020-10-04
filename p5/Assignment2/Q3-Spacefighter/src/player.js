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
*/
//Class for a new Player
class Player{

    //Player Constructor
    constructor(ship){

        //Propety to hold the Ship Object
        this.ship = ship;

        //Property for Current Points
        this.currentPoints = 0;
        
        //Property for Life Count
        this.currentLifes = 0;

        //Property for Current Money
        this.currentMoney = 1000;

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


                case WeaponPoint.WeaponTypes.StraightSpread:
    
                    //Corner Up (North)
                    let bNE = new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[0].bullet.type);
                    bNE.sprite.setSpeed(this.ship.info.weapons[0].basevecDirection.y, 45);
                    let bNW = new Bullet(this.ship, this.ship.info.weapons[1], this.ship.info.weapons[1].bullet.type);
                    bNW.sprite.setSpeed(this.ship.info.weapons[0].basevecDirection.y, 135);                    
                    
                    //Corners Down (South)
                    let bSE = new Bullet(this.ship, this.ship.info.weapons[1], this.ship.info.weapons[0].bullet.type);
                    bSE.sprite.setSpeed(this.ship.info.weapons[0].basevecDirection.y, 225);
                    let bSW = new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[1].bullet.type);
                    bSW.sprite.setSpeed(this.ship.info.weapons[0].basevecDirection.y, 315);

                case WeaponPoint.WeaponTypes.StraightX:

                    //Downwards
                    let bS1 = new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[0].bullet.type);
                    bS1.sprite.setSpeed(this.ship.info.weapons[0].basevecDirection.y, 270);
                    let bS2 = new Bullet(this.ship, this.ship.info.weapons[1], this.ship.info.weapons[1].bullet.type);
                    bS2.sprite.setSpeed(this.ship.info.weapons[0].basevecDirection.y, 270);

                case WeaponPoint.WeaponTypes.StraightL:

                    //Sideways
                    let bE = new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[0].bullet.type);
                    bE.sprite.setSpeed(this.ship.info.weapons[0].basevecDirection.y, 0);
                    let bW = new Bullet(this.ship, this.ship.info.weapons[1], this.ship.info.weapons[1].bullet.type);
                    bW.sprite.setSpeed(this.ship.info.weapons[0].basevecDirection.y, 180);

                case WeaponPoint.WeaponTypes.Straight: 

                    //Up
                    new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[0].bullet.type);
                    new Bullet(this.ship, this.ship.info.weapons[1], this.ship.info.weapons[1].bullet.type);
                break;
            }
            random(0,1) > .5 ? playershoot1sound.play() : playershoot2sound.play();
        }
    }

    //Function to Draw Player Health Bar
    healthbar(){
        
        //Align Rectangle
        rectMode(CENTER);
        
        //Set Outline to Red
        stroke('red');
        
        //Draw Outline
        rect(this.ship.sprite.position.x, this.ship.sprite.position.y+55, map(this.ship.info.maxHealth, 0, this.ship.info.maxHealth, 0, 200, true), 15);
        
        //Set Bar to Red
        fill('#00FF00');
        noStroke();
        
        //Draw HealthBar
        rect(this.ship.sprite.position.x, this.ship.sprite.position.y+55, map(this.ship.info.currentHealth, 0, this.ship.info.maxHealth, 0, 200, true), 15);
       
        //If Hit Screen Counter is not 0, draw Hit Screen
        this.info.redHitScreen == 0 ? 0 : this.displayRedHitScreen();
    }

    //Function to Draw Player Shield Bar
    shieldbar(){
        
        //Align Rectangle
        rectMode(CENTER);
        
        //If Current Shield > 10 (min to be active)
        if(this.ship.info.currentShield <= 10){
            fill(0,0,155,125)
        } else {
            fill(0,0,255,125);
        }
        noStroke();
        
        //Draw Rectangle
        rect(this.ship.sprite.position.x, this.ship.sprite.position.y+55, (constrain(this.ship.info.currentShield, 0, this.ship.info.currentShield)), 15);
    }

    //Function to Recharge The Shield
    shieldRecharge(amount){
            this.ship.info.currentShield = constrain(this.ship.info.currentShield += amount, 0 , this.ship.info.maxShield)
    }

    //Function To Handle Player Sheields and Damage
    damage(bullet){

        //If Shield is Less Than Minimum
        if(this.ship.info.currentShield <= 10){
            
            //Deal Direct Damage
            this.dealDamage(bullet.damageAmount);

        } else{

            //Create a Sprite at Ship Position    
            let shieldhit = createSprite(this.ship.sprite.position.x, this.ship.sprite.position.y);

            //Check which side is being Collided with
            if(this.ship.sprite.touching.top){
                shieldhit.addAnimation("top", shieldhittop);
            } 
            else if(this.ship.sprite.touching.bottom){
                shieldhit.addAnimation("bottom", shieldhitbottom);
            }
            else if(this.ship.sprite.touching.left){
                shieldhit.addAnimation("left", shieldhitleft);
            }
            else if(this.ship.sprite.touching.right){
                shieldhit.addAnimation("right", shieldhitright);
            }

            //Push the Srite into shield array
            this.ship.sprite.shield.push(shieldhit);

            //Set Shield Scale
            shieldhit.scale = 3;

            //Set Shield Life
            shieldhit.life = 50;

            //Damage Shield
            this.ship.info.currentShield -= bullet.damageAmount;

            ;
        }
    }

    //Function to Handle Damage and Death
    dealDamage(amount){
        //Increase Hit Screen Counter
        this.info.redHitScreen = 25;
        //Take Health Away
        this.ship.info.currentHealth -= amount;
        //Check for Death
        if(this.ship.info.currentHealth <= 0){
            
            this.currentLifes--;

            if(this.currentLifes<0){
                //Exectue Death
                this.die();
                let enter = createSprite(width/2 - (GameManager.settings.globalSettings.sidebarWidth/2), 800);
                enter.addImage(enterbuttonimg);
                enter.scale = 3;
                enter.onMousePressed = () => {

                    GameManager.playername = GameManager.nameinput.value();

                    let date = new Date();
                    //Push Into HighScores JSON
                    GameManager.highscores.highscores.push({name: GameManager.playername, score: GameManager.player.currentPoints, 'date': date.toDateString()});
                
                    //Save JSON
                    saveJSON(GameManager.highscores, 'highscores.json');

                    location.reload();
                };
            } else {
                this.respawn();
            }
        }
    }

    //Function to display Hit Feedback
    displayRedHitScreen(){
        //Draw Image to Screen
        image(redhittedimg,-100,-100, GameManager.settings.globalSettings.canvasWidth +200 , height +200);
        //Take from Counter
        this.info.redHitScreen--;
    }

    respawn(){
        this.ship.info.currentHealth = this.ship.info.maxHealth;
        this.ship.info.currentShield = this.ship.info.maxShield;
        GameManager.player.placePlayer(width/2 - ( GameManager.settings.globalSettings.sidebarWidth/2), height/2);
    }

    //Function to handle Death of Player
    die(){

        //SMOKE CLOUD
        for(let i = 0, smoke; i < Math.floor(random(2,7)); i ++){
            //Create Base Sprite
            smoke = createSprite(this.ship.sprite.position.x + random(-50,50), this.ship.sprite.position.y + random(-50,50));
            //Add Animation to SPrite
            smoke.addAnimation('smoke', basicgreenexplosion);
            //Set Looping
            smoke.looping = true;
            //Set Short Life
            smoke.life = 25;
            //Set Sprite Scale
            smoke.scale = this.ship.sprite.scale;
        }

        //Disable Collider (backup)
        this.ship.sprite.setCollider("circle",0,0,0);

        //Set Minimal Life for Cleanup
        this.ship.sprite.life = 1;
        createNameInput();
    }

    //Function to turn img into a Sprite
    turnIntoSprite(img){
        let sprite = createSprite();
        sprite.addImage('baseimg', img);
        sprite.setCollider ("circle");
        sprite.addAnimation('forward', shipmovebase);
        sprite.addAnimation('left', shipmoveleft);
        sprite.addAnimation('right', shipmoveright);
        return sprite
    }

    //Function to manually Place Player
    placePlayer(x, y){
        this.ship.sprite.position.x = x;
        this.ship.sprite.position.y = y;
    }

    
    //Function to Handle Movements
    movePlayer(vector, thrust){

        //TODO ADD ANIMATION
        // if(vector.y == 1){ //GOING BACKWARDS
        //     thrust /= 2;
        // }


        //Set The Velocity based on Input Vector and Thrust
        this.ship.sprite.setVelocity(
            vector.x * this.ship.info.vecAcceleration.x * thrust,
            vector.y * this.ship.info.vecAcceleration.y * thrust
        );

        this.ship.sprite.changeImage('baseimg');
        if(this.ship.sprite.velocity.y != 0){
            this.ship.sprite.changeAnimation('forward');
        }
        if(this.ship.sprite.velocity.x < 0){
            this.ship.sprite.changeAnimation('left');
            this.ship.sprite.animation.looping = false;
        }
        if(this.ship.sprite.velocity.x > 0){
            this.ship.sprite.changeAnimation('right');
            this.ship.sprite.animation.looping = false;
        }
 

        //Constrain Player
        this.constrainPlayer();
    }

    //Function to keep Player in Bounds of Screen
    constrainPlayer(){
        this.ship.sprite.position.x = constrain(this.ship.sprite.position.x, 0+(PLAYERSPRITESIZE/2) + 35, width-(PLAYERSPRITESIZE/2) - GameManager.settings.globalSettings.sidebarWidth - 35);
        this.ship.sprite.position.y = constrain(this.ship.sprite.position.y, 0+(PLAYERSPRITESIZE/2) + 35, height-(PLAYERSPRITESIZE/2)-45);
    }

    //Function to Zero Player Velocity
    zero(){
        this.ship.sprite.setVelocity(0,0);
    }

}


