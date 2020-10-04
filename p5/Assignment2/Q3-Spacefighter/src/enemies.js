//STATUS - MEDIUM


//Class for Enemies
class Enemy{


    //Constructor for Enemy
    constructor(ship, size, points, x, y){

        //Propety to hold a Ship Class
        this.ship = ship;

        //This Enemies Size
        this.size = size;

        //How many points this enemy is worth on kill
        this.points = points; 

        //Create this Enemy
        this.createEnemy(x, y);

        console.log("SPAWNING ENEMY");
    }

    //Function to Create Enemy
    createEnemy(x, y){

        //Create the Sprite
        this.ship.sprite = createSprite(x, y);

        //Set the ships Velocity 'down'
        this.ship.sprite.velocity.y = 1;

        //Set a life time just incase issues they enemy remain forever.
        this.ship.sprite.life =  5000;

        //Set the Debug if Enabled in settings
        this.ship.sprite.debug = GameManager.settings.debug;

        //Reference back to this Enemy Class from the Sprite
        this.ship.sprite.self = this;

        //Add the Ship Image to the Sprite
        this.ship.sprite.addImage(this.ship.img);

        //Sets the collider to a Circle
        this.ship.sprite.setCollider("circle");

        //Immovable (from bullets)
        this.ship.sprite.immovable = true;

        //Set the sprites scale
        this.ship.sprite.scale = this.size/100;

        //Rotate Sprite from facing "Right" to "Down"
        this.ship.sprite.rotation += 90;
        
        //Add this sprite to enemySprites Group
        GameManager.Groups.enemySprites.add(this.ship.sprite);

        //Add this Enemy to EnemyShips Array
        GameManager.enemyShipsArray.push(this);

        //TODO DELETE
        //Draw this Sprite 
        //this.ship.sprite.draw();
         //this.attractTo();
        //console.log("Spawned: size:" + this.size);
        //this.ship.sprite.maxSpeed = map(this.size, 1, 64, 25, 2, true);
        //this.ship.sprite.rotateToDirection = true;
    }

    //Function for Enemy to Shoot
    shoot(){

        //If Enemy Able to Shoot Checks
        if(
            //Enemy is on the Canvas
            this.ship.sprite.position.y > 0 &&
            //Enemy is Above the Player
            this.ship.sprite.position.y < GameManager.player.ship.sprite.position.y &&
            //FrameCount Check for Bullet Type CoolDown Property
            frameCount % this.ship.info.weapons[0].bullet.type.cooldown == 0 &&
            //Random Chance of Shooting
            random(0,1) > .9 //TODO DIFFICULT SCALE
        ){

            //Weapon Type Checks

            //Standard Shot
            if(this.ship.info.weapons[0].weapontype == WeaponPoint.WeaponTypes.Straight){
                //Spawn a New Bullet
                let bullet = new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[0].bullet.type, 1);
                bullet.sprite.maxSpeed = 5;
            }
            //Spread 360 Shot
            else if(this.ship.info.weapons[0].weapontype == WeaponPoint.WeaponTypes.spread360){
                //18 Shots
                for(let i = 0; i < 18; i++){

                    //Spawn a New Bullet
                    let bullet = new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[0].bullet.type, 1);

                    //Spread Direction - 18 * 20 = 360degs
                    bullet.sprite.setSpeed(2, ((i+1) * 20));

                    //Set a life time just incase issues they bullet remain forever.
                    bullet.sprite.life = 1000;
                    
                    //Set Standard Scale (backup)
                    bullet.sprite.scale = 1
                }
                enemyspreadsound.play();
            }
        }
    }

    resetEnemy(){
        this.ship.sprite.life =  5000;
        this.ship.sprite.position.x = Math.floor(random(15, GameManager.settings.globalSettings.canvasWidth - 15));
        this.ship.sprite.position.y = Math.floor(random(-15, -500));
        this.ship.info.currentHealth = this.ship.info.maxHealth;

    }

    //Function to Pause the Enemy
    pauseEnemy(){
        this.ship.sprite.velocity.y = 0;
    }

    //Function to Unpause the Enemy
    unpauseEnemy(){
        this.ship.sprite.velocity.y = 1;
    }

    dealDamage(amount){
        
        //Take Bullet Damage away from Ship Health
        this.ship.info.currentHealth -= amount;
        
        //If this Enemy is 'Dead'
        if(this.ship.info.currentHealth <= 0){

            //Drop Item
            this.dropItem();

            //Death Animation - SMOKE CLOUD
            //Random Amount of Clouds (2-7)
            for(let i = 0, smoke; i < Math.floor(random(2,7)); i++){

                //Create a New Sprite at this Enemy Ships Position + random offsets 
                smoke = createSprite(this.ship.sprite.position.x + random(-50,50), this.ship.sprite.position.y + random(-50,50));

                //Add an Animation to the Sprite
                smoke.addAnimation('smoke', basicgreenexplosion);

                //Loop the "Animation"
                smoke.looping = true;

                //Set the Life
                smoke.life = 25;

                //Scale based on Ship Scale
                smoke.scale = this.ship.sprite.scale;
            }

            //Add Points to the Player
            GameManager.player.currentPoints += this.ship.info.maxHealth;
            
            //Set the Ship Sprite Life to virtually nothing for 'p5play' cleanup
            //this.ship.sprite.life = 1;
            explosionsound.play();
            GameManager.addKill();
            this.resetEnemy();
        }
    }
    //Function to Damage the Enemy
    damage(bullet){
        this.dealDamage(bullet.damageAmount)
    }

    //Function to drop an Item
    dropItem(){

        //Random Chance
        let dice = random(0,1);
        
        //New Pickups at Sprite Position
        if(dice < .3){
            new Pickup(Pickup.Types.Health, this.ship.sprite.position);
        } else if (dice < .6){
            new Pickup(Pickup.Types.Money, this.ship.sprite.position);
        }
    }

    //Function to Draw Health Bar
    healthbar(){

        //Variable to set
        let valx;
        
        //Map the Current Health between the Max Health and Current Health
        valx = map(this.ship.info.currentHealth, 0,  this.ship.info.maxHealth, 0, this.ship.info.maxHealth/10);
        
        //Set Rect Mode
        rectMode(CENTER);
        
        //Fill Red
        fill('red');

        //Draw the "Bar" at an offset using the "Map()'d Variable"
        rect(this.ship.sprite.position.x, this.ship.sprite.position.y-50, valx, this.ship.info.maxHealth/25);
    }

    //Function to Attract Enemy to Player Position
    attractTo(){
        this.sprite.attractionPoint(this.size, GameManager.player.sprite.position.x, GameManager.player.sprite.position.y);
    }

    //Function to Cleanup the Enemy
    cleanup(){

        //If the Enemy Ship is Lower then the canvas 
        if(this.ship.sprite.position.y > height+25){
            //Lose Points for Letting Enemy Reach Bottom
            GameManager.player.currentPoints = constrain(GameManager.player.currentPoints-(this.points/2), 0, GameManager.player.currentPoints);
            //Set the Ship Sprite Life to virtually nothing for 'p5play' cleanup
            this.resetEnemy();
        }
    }

    
}