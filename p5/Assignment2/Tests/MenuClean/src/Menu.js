class Menu{
    constructor(group, ...buttons){
        this.group = group;
        this.buttons = new Array(buttons.length);
        for(let i = 0; i < buttons.length; i++){
            this.buttons[i] = new Button(this.buttons.length, buttons[i].name, i, 100, group ,buttons[i].OnClick);
        }
    }
    
    DrawMenu(){
        createCanvas(1000, 500);
        background(200);
        for(let i = 0; i < this.buttons.length; i++){
            this.buttons[i].makeButton();
            this.buttons[i].sprite.addToGroup(drawLayer);
            this.buttons[i].DrawSprite();
            this.buttons[i].DrawText();
        }
    }
}

//Button Class
class Button{
    constructor(max, name, y, size, group, onClick){
        this.name = name;
        //Button x y to use in positioning, based on iterator when made in Menu
        this.y = y;
        this.size = size;
        this.onClick = onClick
        this.sprite;
        this.group = group;
        this.max = max;
    }

    //Construct this button ?
    makeButton(){
        fill('red');
        rectMode(CENTER);
        this.sprite = createSprite(
            width/2,
            (height - this.size/2) / this.max * (this.y+1),
            this.size*3,
            this.size);
        this.sprite.debug = true;
        this.sprite.onMouseReleased = this.onClick;
        this.sprite.addImage(ButtonImage);
        this.sprite.scale = 1.5;
    }

    //Draw this buttons text
    DrawText(){
        //console.log('Drawing text');
        fill('black')
        textSize(32);
        textAlign(CENTER, CENTER);
        text(this.name, width/2,  (height- this.size/2) / this.max * (this.y+1) );
    }

    //Draw this buttons sprite
    DrawSprite(){
        drawSprite(this.sprite);
    }
}