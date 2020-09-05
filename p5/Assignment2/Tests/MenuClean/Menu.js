let ButtonGroup, ButtonImage;
let drawLayer;
let groups;
let mainMenu, raceMenu;
function preload(){
    
    drawLayer = new Group();
    
    ButtonImage = loadImage('Button.png');
}

function setup() {
    createCanvas(1000, 500);
    background(200);

    mainMenu = new Menu('mainMenu',
        {name: 'Race', OnClick: ChangeDrawLayer.bind(null, raceMenu)},
        {name:'Options',  OnClick: function(){
            console.log("Options");
        }},
        {name:'Quit', onClick: function(){
            //console.log("Quit");
        }});
    
        raceMenu = new Menu('raceMenu',
            {name: 'Car Select', OnClick: function(){
                console.log('Car Select');
            }},
            {name: 'Map Select'},
            {name: 'Race!'},
            {name: 'Return', OnClick: ChangeDrawLayer.bind(null, raceMenu)}
        );

    //frameRate(5);
    ChangeDrawLayer(mainMenu);
    console.log(drawLayer)
    console.log(mainMenu)
    console.log(raceMenu);
}
function draw(){
    drawLayer.draw();

}

function ShowButtons(group){
    createCanvas(1000, 500);
    background(200);
    //group.draw();
    for(sprite of group.toArray()){
        sprite.Button.DrawText();
    }
}

function ChangeDrawLayer(group){
    for(i = 0; i < group.buttons.length; i++){
        group.buttons[i].makeButton(group.buttons.length, 100);
        group.buttons[i].sprite.addToGroup(drawLayer);  //<--  INTO HERE     V
    }
    ShowButtons(drawLayer);
}



class Menu{
    constructor(group, ...buttons){
        this.group = group;
        this.buttons = new Array(buttons.length);
        for(let i = 0; i < buttons.length; i++){
            this.buttons[i] = new Button(this.buttons.length, buttons[i].name, i, i, 100, group ,buttons[i].OnClick);
            //this.buttons[i].makeButton(arguments.length, 100);  <- MOVED THIS OUT ^
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