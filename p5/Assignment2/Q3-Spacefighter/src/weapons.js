class WeaponPoint{
    constructor(vecOffset, vecDirection, bulletType){
        this.vecOffset = new p5.Vector(0,0);
        this.vecOffset.x = vecOffset.x;
        this.vecOffset.y = vecOffset.y;

        this.vecDirection = new p5.Vector(0,0);
        this.vecDirection.x = vecDirection.x;
        this.vecDirection.y = vecDirection.y;

        this.bullet = new Object();
        this.bullet.type = bulletType;
        debugWarn(this);

        return this;
    }
}

//TODO player weapon slots.. allow for multiple weapon points to 1 slot.

class Bullet{
    constructor(ship, shooter, bulletType){
        console.log(ship);
        this.owner = shooter;
        this.shooterX = ship.sprite.position.x + shooter.vecOffset.x;
        this.shooterY = ship.sprite.position.y;
        this.sprite = createSprite(this.shooterX, this.shooterY);
        this.sprite.addImage(bulletType.img);
        this.sprite.life = bulletType.range;
        this.sprite.damageAmount = bulletType.damage;
        this.sprite.setVelocity(shooter.vecDirection.x , shooter.vecDirection.y);
        this.sprite.damage = this.damage.bind();
        bullets.add(this.sprite);
        ship.currentBullets.push(this);
    }

    damage(bullet, enemy){
        console.log('Damaging ');
        enemy.damage(bullet, enemy);
        bullet.life = 0;
    }

}