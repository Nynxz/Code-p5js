let ButtonGroup, ButtonImage;
let drawLayer;
let groups;
let mainMenu, raceMenu;
let menuEnum = {mainMenu: 'mainMenu', raceMenu: 'raceMenu'}
function preload(){
    
    drawLayer = new Group();
    
    ButtonImage = loadImage('Button.png');
}

function setup() {
    createCanvas(1000, 500);
    background(200);
    
    mainMenu = new Menu('mainMenu',
        {name: 'Race', OnClick: ChangeDrawLayer.bind(null, menuEnum.raceMenu)},
        {name:'Options',  OnClick: function(){
            console.log("Options");
        }},
        {name:'Quit', OnClick: function(){
            console.log("Quit");
        }});
    
        raceMenu = new Menu('raceMenu',
            {name: 'Car Select', OnClick: function(){
                console.log('Car Select');
            }},
            {name: 'Map Select'},
            {name: 'Race!'},
            {name: 'Return', OnClick: ChangeDrawLayer.bind(null, menuEnum.mainMenu)}
        );

    //frameRate(5);
    ChangeDrawLayer(mainMenu);
    console.log('d layer ' ,drawLayer)
    console.log(mainMenu)
    console.log(raceMenu);
}
function draw(){

}

function ChangeDrawLayer(group){
    group = eval(group);
    allSprites.clear();
    drawLayer.clear();
    group.DrawMenu(drawLayer);
    
}



class Menu{
    constructor(group, ...buttons){
        this.group = group;
        this.buttons = new Array(buttons.length);
        for(let i = 0; i < buttons.length; i++){
            this.buttons[i] = new Button(this.buttons.length, buttons[i].name, i, i, 100, group ,buttons[i].OnClick);
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
    constructor(max, name, x, y, size, group, onClick, branches){
        this.name = name;
        //Button x y to use in positioning, based on iterator when made in Menu
        this.x = x;
        this.y = y;
        this.size = size;
        this.onClick = onClick
        this.sprite;
        this.branches = branches;
        this.group = group;
        this.DrawText = this.DrawText;
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
        this.sprite.Button = this;
        this.sprite.ButtonName = this.name;
        this.sprite.onMousePressed = this.onClick;
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