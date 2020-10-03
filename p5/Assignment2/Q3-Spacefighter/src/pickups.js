//let PickupTypes = {Health:1, Money:2};

//Class for Pickup Items
class Pickup{

    //Enum for Types
    static Types = {Health: 1, Money:2};

    //Constructor for Pickup Item
    constructor(type, pos){
        //Property to store the Pickup Type
        this.type = type;

        //Propety to store the image
        this.img;

        //Properties to store the Position
        this.x = pos.x;
        this.y = pos.y;

        //Property to bind a function for Effect
        this.effect;

        //Property to hold the Sprite
        this.sprite;

        //Populate the Properties
        this.loadType();
       
    }

    //Function to Load Image
    loadType(){
        //Switch for Pickup Type
        switch(this.type){
            case Pickup.Types.Health:
                this.img = healthPickupimg;
            break;
            case Pickup.Types.Money:
                this.img = moneyPickupimg;
            break;
        }
        this.makeSprite(this.x, this.y);
    }

    //Function to Create the Pickup Sprite
    makeSprite(x , y){
        
        //Create the Sprite
        this.sprite = createSprite(x, y);
        
        //Add the Image
        this.sprite.addImage(this.img);
        
        //Set Default Collider
        this.sprite.setDefaultCollider();
        
        //Set a Life Time
        this.sprite.life = 1000;
        
        //Set the Scale
        this.sprite.scale = 2;
        
        //Add to Pickup Group
        this.sprite.addToGroup(GameManager.Groups.pickups);
        
        //Add a reference back to the Sprites Parent Object
        this.sprite.self = this;

        //Set Velocity (downwards)
        this.sprite.velocity.y = 1;
    }

    //Function for 'doing' the Effect
    effect(sprite, amount){

        //Switch for Pickup Type
        switch(this.type){
            case Pickup.Types.Health:
                this.giveHealth(sprite, amount);
            break;
            case Pickup.Types.Money:
                this.giveMoney(sprite, amount);
            break;
        }

    }

    //Function to Give Money
    giveMoney(re, amount){
        
        //Add Money to the Player
        GameManager.player.currentMoney += amount;
        
        //Remove the Pickup Sprite
        this.sprite.life = 0;
    }
    //Function to Give HEalth
    giveHealth(re, amount){
        
        //Add Health to the Player
        re.self.ship.info.currentHealth = constrain(re.self.ship.info.currentHealth+amount, 0, re.self.ship.info.maxHealth);
        
        //Remove the Pickup Sprite
        this.sprite.life = 0;
    }

    //Function to Pause the Pickup from Moving
    pausePickup(){
        
        //Create a Propety to hold Old velocity
        this.sprite.oldVelocityY
        
        //Set the Property to Current Velocity
        this.sprite.oldVelocityY = this.sprite.velocity.y;
        
        //Set Current Velocity to 0
        this.sprite.velocity.y = 0;
    }

    //Function to Unpause the Pickup
    unpausePickup(){
        //Set the Velocity to the Saved Velocity
        this.sprite.velocity.y = this.sprite.oldVelocityY;
    }
}