class Shop{

    //static Items = new Array();

    static drawStdWeaponItems(){

        //OUTLINES
        for(let i = 0; i < 4; i++){
            let timage;
            let textlines = new Array();
            let textlinesvals = new Array();
            let spr = createSprite(300, (400) + (i * 100));
            switch(i){
                case 0:
                    timage = GameManager.shopItems.StdShot.img;
                    textlines = Object.keys(GameManager.shopItems.StdShot);
                    textlinesvals = Object.values(GameManager.shopItems.StdShot);
                    textlines = textlines.map((e,i) => e.concat(": " + textlinesvals[i]));
                    spr.onMousePressed = () => {
                        GameManager.Groups.friendlybullets.removeSprites();
                        GameManager.Groups.enemybullets.removeSprites();

                        GameManager.player.ship.info.weapons = new weaponStaterWeaponLR();
                    };
                    GameManager.Groups.hoverToolTip.removeSprites();
                break;
            
                case 1:
                    timage = GameManager.shopItems.LShot.img;
                    textlines = Object.keys(GameManager.shopItems.LShot);
                    textlinesvals = Object.values(GameManager.shopItems.LShot);
                    textlines = textlines.map((e,i) => e.concat(": " + textlinesvals[i]))
                    spr.onMousePressed = () => {
                        if(GameManager.player.currentMoney >= textlinesvals[1] || textlinesvals[0] == true){
                            GameManager.shopItems.LShot.bought = true;
                            textlinesvals[0] == false ? GameManager.player.currentMoney -= textlinesvals[1] : 0;
                            textlinesvals[0] = true;
                            GameManager.Groups.friendlybullets.removeSprites();
                            GameManager.Groups.enemybullets.removeSprites();
                            GameManager.player.ship.info.weapons =  weaponSpreadLR();
                        } else {
                            console.log("NOT ENOUGH MONEY");
                        }
                    }

                break;
                default: 
                    timage = shopbuttonimg;
            }
                
                spr.addImage(timage);
                spr.setDefaultCollider();
                spr.mouseActive = true; 
                spr.onMouseOver = function(){
                    imageMode(CORNER);
                    new ToolTip(textlines);

                };
                spr.onMouseOut = function(){

                    GameManager.Groups.hoverToolTip.removeSprites();
                    
                };
                //ITEM
                GameManager.Groups.ShopItems.add(spr)
                //Shop.Items.push(spr);
        }
        for(let i = 0; i < 4; i++){
            image(shopbuttonimg, 400, (400) + (i * 100));
        }

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
            i < 3 ? text(e, mouseX + 35, mouseY + (i * 10)) : 0;
        });
        // for(let txt of this.info){
        //     text(txt, mouseX+75, mouseY+25);
        // }
    }
}