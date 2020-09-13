class Menu{
    constructor(group,colour, ...buttons){
        this.group = group;
        this.colour = colour;
        this.buttons = new Array(buttons.length);
        for(let i = 0; i < buttons.length; i++){
            this.buttons[i] = new Button(this.colour, this.buttons.length, buttons[i].name, i, 100, group ,buttons[i].OnClick);
        }
        print(this.colour);
    }
    
    DrawMenu(){
        background(200);
        for(let i = 0; i < this.buttons.length; i++){
            this.buttons[i].makeButton();
            this.buttons[i].sprite.addToGroup(drawLayer);
            this.buttons[i].DrawSprite();
            this.buttons[i].DrawText();
        }
    }

    ChangeColour(colour){
        this.colour = colour;
        for(let i = 0; i < this.buttons.length; i++){
            this.buttons[i].colour = this.colour;
        }
    }
}
//Button Class
class Button{
    constructor(colour, max, name, y, size, group, onClick){
        this.name = name;
        //Button x y to use in positioning, based on iterator when made in Menu
        this.y = y;
        this.size = size;
        this.onClick = onClick
        this.sprite;
        this.group = group;
        this.max = max;
        this.colour = colour;
    }

    //Construct this button ?
    makeButton(){
        fill(this.colour);
        rectMode(CENTER);
        rect(width/2,
            (height - this.size) / this.max * (this.y+1),
            this.size*3,
            this.size*1.5);
        this.sprite = createSprite(
            width/2,
            (height - this.size) / this.max * (this.y+1),
            this.size*3,
            this.size * 1.5);
        this.sprite.debug = true;
        this.sprite.onMouseReleased = this.onClick;
        this.sprite.addImage(ButtonImage);
        this.sprite.scale = 1;
    }

    //Draw this buttons text
    DrawText(){
        //console.log('Drawing text');
        fill('black')
        textSize(32);
        textAlign(CENTER, CENTER);
        text(this.name, width/2,  (height- this.size) / this.max * (this.y+1) );
    }

    //Draw this buttons sprite
    DrawSprite(){
        drawSprite(this.sprite);
    }
}