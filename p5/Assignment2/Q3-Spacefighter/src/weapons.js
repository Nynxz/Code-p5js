class WeaponPoint{
    constructor(vecOffset, vecDirection, bulletType){
        this.vecOffset.x = vecOffset.x;
        this.vecOffset.y = vecOffset.y;

        this.vecDirection.x = vecDirection.x;
        this.vecDirection.y = vecDirection.y;

        this.bullet.type = bulletType;
        
    }
}

//TODO player weapon slots.. allow for multiple weapon points to 1 slot.

class Bullet{
    constructor(shooter, bulletType){
        this.owner = shooter;
        this.shooterX = this.owner.sprite.position.x;
        this.shooterY = this.owner.sprite.position.y;
        this.sprite = createSprite(shooterX, shooterY )
    }


}