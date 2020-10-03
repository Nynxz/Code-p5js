//Class for the Shop
class ShopButton{
    constructor(GMShotItem, x, y){
        this.item = GMShotItem;
        this.image = GMShotItem.img;
        this.textlines = new Array();
        this.textlines = Object.keys(GMShotItem);
        this.textlinesvals = new Array();
        this.textlinesvals = Object.values(GMShotItem);
        this.textlines = this.textlines.map((e,i) => e.concat(": " + this.textlinesvals[i]));
        this.sprite = createSprite(x, y);
        this.sprite.addImage(this.image);
        this.sprite.setDefaultCollider();
        this.sprite.mouseActive = true;
        this.sprite.onMouseOver = () => {
            new ToolTip(this.textlines);
        }
        this.sprite.onMouseOut = () =>{
            GameManager.Groups.hoverToolTip.removeSprites();
        }
       

        GameManager.Groups.ShopItems.add(this.sprite);
        //If Item is Locked
        if(this.textlinesvals[0] == false){
            this.lockedsprite = createSprite(x,y);
            this.lockedsprite.addImage(shopLockedImg);
            this.lockedsprite.scale = .5;
            GameManager.Groups.ShopItems.add(this.lockedsprite)
        }

    }

    addEffect(func){
        this.sprite.onMousePressed = () =>{
            if(GameManager.player.currentMoney >= this.textlinesvals[1] || this.textlinesvals[0] == true){
                this.item.bought = true;
                this.textlinesvals[0] == false ? GameManager.player.currentMoney -= this.textlinesvals[1] : 0;
                this.textlinesvals[0] = true;
                GameManager.Groups.friendlybullets.removeSprites();
                GameManager.Groups.enemybullets.removeSprites();
                GameManager.player.ship.info.weapons = new func();
                
                if(this.lockedsprite)
                    this.lockedsprite.remove();

                //GameManager.Groups.ShopItems.remove(this.lockedsprite);
                //TODO func;
                console.log("YEH BOIS");
            } else {
                Shop.showNotEnoughMoney();
                console.warn("NOT ENOUGH CASH BOI");
            }
        };
    }

    addPowerUp(func){
        if(this.lockedsprite)
            this.lockedsprite.remove();

        this.sprite.onMousePressed = () =>{
            if(GameManager.player.currentMoney >= this.textlinesvals[1]){
                GameManager.player.currentMoney -= this.textlinesvals[1];
                func();
                console.log("YEH BOIS");
            } else {
                Shop.showNotEnoughMoney();
                console.warn("NOT ENOUGH CASH BOI");
            }
        };
    }
}
function DEFAULTSHOP(){
    return weaponStaterWeaponLR();
}
class Shop{

    static showNotEnoughMoney(){
        let notenough = createSprite(width/2 - (GameManager.settings.globalSettings.sidebarWidth/2), height/2)
                notenough.addImage(notenoughmoneyimg);
                notenough.life = 25;
                notenough.scale = 3;
                GameManager.Groups.ShopItems.add(notenough);
                console.warn("NOT ENOUGH CASH BOI");
    }
    //Function to Draw Shop Page
    static createShopPage(){
        image(shoppageimg, width/2, height/2);
    }
    //static Items = new Array();

    //Function to Draw Shop Items
    static drawStdWeaponItems(){

        //OUTLINES
        for(let i = 0; i < 4; i++){
            switch(i){
                case 0:
                    let STDShot = new ShopButton(GameManager.shopItems.StdShot, 300, (400) + (i* 100));
                    STDShot.addEffect(weaponStaterWeaponLR);
                break;
            
                case 1:
                    let LShot = new ShopButton(GameManager.shopItems.LShot, 300, (400) + (i * 100));
                    LShot.addEffect(weaponSpreadLR);
                break;
                case 2:
                    let XShot = new ShopButton(GameManager.shopItems.XShot, 300, (400) + (i * 100));
                    XShot.addEffect(weaponXLR);
                break;
                case 3:
                    let SpreadShot = new ShopButton(GameManager.shopItems.SpreadShot, 300, (400) + (i * 100));
                    SpreadShot.addEffect(weaponAllSpreadLR);
                break;

                default: 
                    //timage = shopbuttonimg;
            }
                
        }

        let HealthUp = new ShopButton(GameManager.shopItems.HEALTHUP, 800, 400);
        HealthUp.addPowerUp(Shop.PlayerIncreaseHealth)
        let ShieldUp = new ShopButton(GameManager.shopItems.SHIELDUP, 800, 600);
        ShieldUp.addPowerUp(Shop.PlayerIncreaseShield)
        for(let i = 0; i < 4; i++){
            image(shopbuttonimg, 400, (400) + (i * 100));
        }

    }

    static PlayerIncreaseHealth(){
        GameManager.player.ship.info.maxHealth += 100;
        GameManager.player.ship.info.currentHealth = GameManager.player.ship.info.maxHealth;
    }
    static PlayerIncreaseShield(){
        GameManager.player.ship.info.maxShield += 100;
        GameManager.player.ship.info.currentShield = GameManager.player.ship.info.maxShield;
    }
}



class ToolTip{
    constructor(infoArray){
        this.sprite = createSprite(mouseX+150, mouseY+25);
        this.sprite.addImage(tooltipimg);
        this.sprite.self = this;
        GameManager.Groups.hoverToolTip.add(this.sprite);
        this.info = new Array();

        for(let textline of infoArray){
            this.info.push(textline);
        }
    }

    drawInfo(){
        this.sprite.position = {x: mouseX+125 , y:mouseY+25};
        fill('white');
        
        this.info.map((e, i) => {
            textSize(28/i);
            i < 3 && i > 0? text(e, mouseX + 35, mouseY + (i * 15)) : 0;
        });
        // for(let txt of this.info){
        //     text(txt, mouseX+75, mouseY+25);
        // }
    }
}

function createSHOPMENU(){
    Shop.drawStdWeaponItems();
}