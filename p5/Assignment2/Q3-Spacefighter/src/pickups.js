let PickupTypes = {}

class PickupType {
  constructor(logic, sprite) {
    this.logic = logic;
    this.sprite = sprite;
  }
}

const initPickupTypes = () => {
  console.log("Pickups -> Init PickupTypes")
  const createPickupType = (logic, sprite) => ({ logic, sprite })

  PickupTypes = {
    Money: new PickupType(
      (player, amount, pickup) => {
        console.log(player.self.ship.info)
        player.currentMoney += amount;
        pickup.sprite.life = 0
      },
      moneyPickupimg
    ),

    Health: createPickupType(
      (player, amount, pickup) => {
        player.self.ship.info.currentHealth = constrain(player.self.ship.info.currentHealth + amount, 0, player.self.ship.info.maxHealth);
        pickup.sprite.life = 0
      },
      moneyPickupimg
    ),
  };
}

class Pickup {
      constructor(type, pos){
      /**
       * @type {PickupType}
       */
        this.type = type;
        this.img = type.sprite;
        this.x = pos.x;
        this.y = pos.y;
        this.pickupEffect = type.logic;
        this.sprite = null;
        this.makeSprite(this.x, this.y);
    }

    static Types = {}

    static InitTypes = () => {
      initPickupTypes()
      this.Types = PickupTypes
    }

    makeSprite(x , y){
        this.sprite = createSprite(x, y);
        this.sprite.addImage(this.img);
        this.sprite.setDefaultCollider();
        this.sprite.life = 500;
        this.sprite.scale = 2;
        this.sprite.addToGroup(pickups);
        this.sprite.self = this;
    }

    effect(sprite, amount) {
        this.pickupEffect(sprite, amount, this)
    }
}
