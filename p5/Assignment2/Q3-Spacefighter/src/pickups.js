let PickupTypes = {Health:1, Money:2};
class Pickup{
    constructor(type, pos){
        this.type = type;
        this.img;
        this.x = pos.x;
        this.y = pos.y;
        this.effect;
        this.sprite;
        this.loadType();
        this.makeSprite(this.x, this.y);
    }

    loadType(){
        switch(this.type){
            case PickupTypes.Health:
                this.img = healthPickupimg;
                //this.effect = this.giveHealth();
            break;
            case PickupTypes.Money:
                this.img = moneyPickupimg;
            break;
        }
    }

    makeSprite(x , y){
        this.sprite = createSprite(x, y);
        this.sprite.addImage(this.img);
        this.sprite.setDefaultCollider();
        this.sprite.life = 1000;
        this.sprite.scale = 2;
        this.sprite.addToGroup(GameManager.Groups.pickups);
        this.sprite.self = this;
        this.sprite.velocity.y = 1;
    }

    effect(sprite, amount){
        switch(this.type){
            case PickupTypes.Health:
                this.giveHealth(sprite, amount);
            break;
            case PickupTypes.Money:
                this.giveMoney(sprite, amount);
            break;
        }

    }

    giveMoney(re, amount){
        //console.log(re.self.ship.info)
        GameManager.player.currentMoney += amount;
        this.sprite.life = 0;
    }
    giveHealth(re, amount){
        //console.log(re.self.ship.info)
        re.self.ship.info.currentHealth = constrain(re.self.ship.info.currentHealth+amount, 0, re.self.ship.info.maxHealth);
        this.sprite.life = 0;
    }

    pausePickup(){
        this.sprite.oldVelocityY
        this.sprite.oldVelocityY = this.sprite.velocity.y;
        this.sprite.velocity.y = 0;
    }

    unpausePickup(){
        this.sprite.velocity.y = this.sprite.oldVelocityY;
    }
}