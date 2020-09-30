//STATUS - MEDIUM

class Enemy{

    constructor(ship, size, points, x, y){
        this.ship = ship;
        this.size = size;
        this.points = points; 
        this.createEnemy(x, y);
        
    }

    shoot(){
        if(this.ship.sprite.position.y > 0 && this.ship.sprite.position.y < GameManager.player.ship.sprite.position.y && frameCount % this.ship.info.weapons[0].bullet.type.cooldown == 0 && random(0,1) < .1){
            
            if(this.ship.info.weapons[0].weapontype == WeaponTypes.Straight)
                new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[0].bullet.type, 1);

            else if(this.ship.info.weapons[0].weapontype == WeaponTypes.spread360){
                for(let i = 0; i < 18; i++){
                    let bullet = new Bullet(this.ship, this.ship.info.weapons[0], this.ship.info.weapons[0].bullet.type, 1);
                    bullet.sprite.setSpeed(2, ((i+1) * 20));
                    bullet.sprite.life = 1000;
                    bullet.sprite.scale = 1
                }
            }
        }
    }

    createEnemy(x, y){
        this.ship.sprite = createSprite(x, y);
        this.ship.sprite.velocity.y = 1;
        this.ship.sprite.life =  5000;
        
        //console.log(this.sprite);
        
        
        //this.ship.sprite.debug = true;
        this.ship.sprite.debug = GameManager.settings.debug;
        this.ship.sprite.self = this;
        this.ship.sprite.addImage(this.ship.img);
        this.ship.sprite.setCollider("circle");
        this.ship.sprite.immovable = true;
        this.ship.sprite.scale = this.size/100;
        this.ship.sprite.draw();
        //this.ship.sprite.OBJ = this;
        this.ship.sprite.maxSpeed = map(this.size, 1, 64, 25, 2, true);
        this.ship.sprite.rotateToDirection = true;
        //this.attractTo();
        //console.log("Spawned: size:" + this.size);
        
        GameManager.Groups.enemySprites.add(this.ship.sprite);

        GameManager.enemyShipsArray.push(this);
    }

    pauseEnemy(){ //MINIMAL NUMBER BECAUSE ROTATETODIRECTION = TRUE //TODO FIX?
        this.ship.sprite.velocity.y = 0.00000000001;
    }

    unpauseEnemy(){
        this.ship.sprite.velocity.y = 1;
    }

    damage(bullet){

        this.ship.info.currentHealth -= bullet.damageAmount;
        
        if(this.ship.info.currentHealth <= 0){
            this.dropItem();
            //SMOKE CLOUD
            for(let i = 0, smoke; i < Math.floor(random(2,7)); i ++){
                smoke = createSprite(this.ship.sprite.position.x + random(-50,50), this.ship.sprite.position.y + random(-50,50));
                smoke.addAnimation('smoke', basicgreenexplosion);
                smoke.looping = true;
                smoke.life = 25;
                smoke.scale = this.ship.sprite.scale;
            }

            GameManager.player.currentPoints += this.ship.info.maxHealth;

            this.ship.sprite.life = 1;
        }
    }

    dropItem(){
        let dice = random(0,1);
        if(dice < .3){
            new Pickup(PickupTypes.Health, this.ship.sprite.position);
        } else if (dice < .6){
            new Pickup(PickupTypes.Money, this.ship.sprite.position);
        }
    }

    healthbar(){
        let valx;
        valx = map(this.ship.info.currentHealth, 0,  this.ship.info.maxHealth, 0, this.ship.info.maxHealth/10);
        rectMode(CENTER);
        fill('red');
        rect(this.ship.sprite.position.x, this.ship.sprite.position.y-50, valx, this.ship.info.maxHealth/25);
    }

    attractTo(){
        this.sprite.attractionPoint(this.size, GameManager.player.sprite.position.x, GameManager.player.sprite.position.y);
    }

    cleanup(){
        if(this.ship.sprite.position.y > height+25){
            this.ship.sprite.life = 0;
        }
    }

    
}