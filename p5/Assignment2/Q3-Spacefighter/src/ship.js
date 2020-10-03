//STATUS - MEDIUM

//Class for a Ship
class Ship{
    
    //Constructor for the Ship
    constructor(img, health, vecAcceleration, arrWeaponPoints){

        //Property to hold the image
        this.img = img;

        //Object to hold information
        this.info = new Object();

        //Propety for Ship Speed
        this.info.vecAcceleration = vecAcceleration;

        //Property for Ship Max Health
        this.info.maxHealth = health;

        //Property for Ship Current Health
        this.info.currentHealth = health;

        //Property to hold an Array of Weapons
        this.info.weapons = new Array();//new Array();

        //Push each Weapon into the Ship's Weapons Array
        this.info.weapons.push(...arrWeaponPoints);

        //Reference the Ship in each Weapon
        this.info.weapons.map((weapon) => weapon.ship = this)

    }
}

//Class for Weapon 'Turrets'
class WeaponPoint{
    
    //Enum for Weapon Types
    static WeaponTypes = {Straight : 'straight', spread360 : 'spread360', StraightL : "straightL", StraightX : "straightX", StraightSpread: 'straightSpread'};

    //Weapon Constructor
    constructor(vecOffset, vecDirection, bulletType, weapontype){
        
        //New Vector Instance for 'offset'
        this.vecOffset = new p5.Vector(0,0);
        //Adding the turret offset from the ship
        this.vecOffset.x = vecOffset.x;
        this.vecOffset.y = vecOffset.y;

        //New Vector Instances for 'Turret Direction'
        this.vecDirection = new p5.Vector(0,0);
        this.basevecDirection = new p5.Vector(0,0);
        this.basevecDirection.x = vecDirection.x;
        this.basevecDirection.y = vecDirection.y * bulletType.force;
        this.vecDirection.x = vecDirection.x;
        this.vecDirection.y = vecDirection.y * bulletType.force;

        //Object for New Bullet Information
        this.bullet = new Object();
        this.bullet.type = bulletType;
        
        //Property for Weapon Type
        this.weapontype = weapontype;

    }

    //Function to Aim the Weapon
    pointAt(target){
       
        //New Vector
        let vec = new p5.Vector();;

        //Minus Target Direction
        vec = p5.Vector.sub(target, this.ship.sprite.position);
        //Normalize and Multiply by Bullet Force
        vec = p5.Vector.mult(vec.normalize(), this.bullet.type.force);
        
        //Debug Line
        stroke('#00FF00');
        GameManager.settings.debug ? line(this.ship.sprite.position.x, this.ship.sprite.position.y, target.x, target.y) : 0;
        stroke('black');

        //Set Vector
        this.vecDirection = vec;
    }

}

//TODO player weapon slots.. allow for multiple weapon points to 1 slot.

//Class for a Bullet
class Bullet{
    //Constructor for a Bullet
    constructor(ship, shooter, bulletType, enemyBool){
        
        //Owner of Bullet
        this.owner = shooter;
        
        //Position of Shooter Ship
        this.shooterX = ship.sprite.position.x + shooter.vecOffset.x;
        this.shooterY = ship.sprite.position.y;
        
        //Create Bullet Sprite
        this.sprite = createSprite(this.shooterX, this.shooterY);
        
        //Add Image to Bullet
        this.sprite.addImage(bulletType.img);
        
        //Set Default Collider
        this.sprite.setCollider("circle",0,0 ,5)
        
        //Set Sprite Scale
        this.sprite.scale = 2;
        
        //Set Sprite Life
        this.sprite.life = bulletType.range;
        
        //Set Damage Amount
        this.sprite.damageAmount = bulletType.damage;
        
        //Set Force based on Weapon Point Vector
        this.sprite.setVelocity(shooter.vecDirection.x , shooter.vecDirection.y);
        
        //Set Max Speed
        this.sprite.maxSpeed = bulletType.force;
        
        //Bind Damage Function
        this.sprite.damage = this.damage.bind();
        
        //Enable Sprite Debug if in Enabled Settings
        this.sprite.debug =  GameManager.settings.debug;

        //Reference instance of Bullet in Bullet Sprite
        this.sprite.self = this;
        
        //Depending on Shooter, Add to Different Group
        if(enemyBool){
            GameManager.Groups.enemybullets.add(this.sprite);
        }else{
            GameManager.Groups.friendlybullets.add(this.sprite);
        }
        
        //Add animation for the Bullet to Switch to
        this.sprite.addAnimation("hitmarker", hitmarkeranim);

    }

    //Function to Damage
    damage(bullet, target){

        //Call Damage on the Target <Player|Enemy>
        target.damage(bullet);
        
        //Set Bullet Collider to Nothing (backup)
        bullet.setCollider("circle", 0 , 0, 0);
        
        //Disable Velocity (backup)
        bullet.setVelocity(0,0);
        
        //Change Animation
        bullet.changeAnimation("hitmarker");

        //Scale Depending on Damage
        bullet.scale = bullet.damage;
        
        //"Animations" Life
        bullet.life = 25;
    }
    
    //Function to Pause the Bullet
    pauseBullet(){
        
        //Property to Hold Old Vector
        this.sprite.oldVelocity = new p5.Vector();
        
        //Set Old Vector
        this.sprite.oldVelocity = this.sprite.velocity;
        
        //Set Current Vector to 0
        this.sprite.velocity = createVector(0,0); 
    }

    //Function to Unpause the Bullet
    unpauseBullet(){
        
        //Set Current Vector to Old Vector
        this.sprite.velocity = this.sprite.oldVelocity;
    }

}