//STATUS - MEDIUM

class Ship{
    constructor(img, health, vecAcceleration, arrWeaponPoints){
        this.img = img;
        this.info = new Object();
        this.info.vecAcceleration = vecAcceleration;this.info.vecAcceleration = vecAcceleration;
        this.info.maxHealth = health;
        this.info.currentHealth = health;
        this.info.weapons = new Array();//new Array();
        //console.log(...arrWeaponPoints);
        this.info.weapons.push(...arrWeaponPoints);
        this.info.weapons.map((weapon) => {weapon.ship = this;})
        this.currentBullets = new Array();
        
        // for(let weaponPoint in arrWeaponPoints){
        //     console.log(weaponPoint);
        //     this.info.weapons.push({weaponPoint});
        // }
    }
}

let WeaponTypes = {Straight : 0, spread360 : 1};

class WeaponPoint{
    constructor(vecOffset, vecDirection, bulletType, weapontype){
        this.vecOffset = new p5.Vector(0,0);
        this.vecOffset.x = vecOffset.x;
        this.vecOffset.y = vecOffset.y;

        this.vecDirection = new p5.Vector(0,0);
        this.basevecDirection = new p5.Vector(0,0);
        this.basevecDirection.x = vecDirection.x;
        this.basevecDirection.y = vecDirection.y * bulletType.force;
        this.vecDirection.x = vecDirection.x;
        this.vecDirection.y = vecDirection.y * bulletType.force;

        this.bullet = new Object();
        this.bullet.type = bulletType;
        //debugWarn(this);

        this.weapontype = weapontype;

        return this;
    }

    pointAt(target){
       
        //console.log(this.vecDirection.sub(target));
        //let dir = this.vecDirection.sub(target);
        let vec = this.vecDirection;
        vec = p5.Vector.sub(target, this.ship.sprite.position);
        // if(frameCount % 60){
        //     console.log(this.bullet.type.force);
        // }
        vec = p5.Vector.mult(vec.normalize(), this.basevecDirection.mag());
        
        stroke('#00FF00');
        
        inDebug ? line(this.ship.sprite.position.x, this.ship.sprite.position.y, target.x, target.y) : 0;
        stroke('black');
        this.vecDirection = vec;
    }

}

//TODO player weapon slots.. allow for multiple weapon points to 1 slot.

class Bullet{
    constructor(ship, shooter, bulletType, enemyBool){
        //console.log(ship);
        this.owner = shooter;
        this.shooterX = ship.sprite.position.x + shooter.vecOffset.x;
        this.shooterY = ship.sprite.position.y;
        this.sprite = createSprite(this.shooterX, this.shooterY);
        this.sprite.addImage(bulletType.img);
        this.sprite.setCollider("circle",0,0 ,5)
        this.sprite.scale = 2;
        this.sprite.life = bulletType.range;
        this.sprite.damageAmount = bulletType.damage;
        this.sprite.setVelocity(shooter.vecDirection.x , shooter.vecDirection.y);
        this.sprite.damage = this.damage.bind();
        this.sprite.debug = inDebug;
        if(enemyBool){
            enemybullets.add(this.sprite);
        }else{
            bullets.add(this.sprite);
        }
        this.sprite.addAnimation("hitmarker", hitmarkeranim);
        //ship.currentBullets.push(this);
    }

    damage(bullet, target){
        //console.log('Damaging ');
        target.damage(bullet);
        bullet.setCollider("circle", 0 , 0, 0);
        bullet.setVelocity(0,0);
        bullet.changeAnimation("hitmarker");
        bullet.scale = bullet.damage;
        bullet.life = 25;
    }

}