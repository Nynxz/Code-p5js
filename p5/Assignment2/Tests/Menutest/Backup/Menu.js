let ButtonGroup, ButtonImage;
let drawLayer;
let groups;
let mainMenu, raceMenu;
function preload(){
    
    groups = {
        StartGroup: StartGroup = new Array(),
        PreRaceGroup: PreRaceGroup = new Array()
    };
    drawLayer = new Group();
    
    ButtonImage = loadImage('Button.png');
}

function setup() {
    createCanvas(1000, 500);
    background(200);
    //menu = new Menu('Start', 'Quit', 'Options', 'Test'); , onClick: Button.OnClick(this.name)
    mainMenu = new Menu(StartGroup,
        {name: 'Race', OnClick: ChangeDrawLayer.bind(null, raceMenu)},
        {name:'Options',  OnClick: function(){
            console.log("Options");
        }},
        {name:'Quit', onClick: function(){
            //console.log("Quit");
        }});
    
        raceMenu = new Menu(PreRaceGroup,
            {name: 'Car Select', OnClick: function(){
                console.log('Car Select');
            }},
            {name: 'Map Select'},
            {name: 'Race!'},
            {name: 'Return', OnClick: ChangeDrawLayer.bind(null, mainMenu)}
        );
    //frameRate(5);
    console.log('sgroup:' , raceMenu);
    ChangeDrawLayer(mainMenu)
}

// function keyPressed() {
//     if(keyCode == 27){
//         console.log('ESC');
//         ChangeDrawLayer(groups.StartGroup);
//     }
// }
function ChangeDrawLayer(group){
    console.log('CDL: ', group);
    for(i = 0; i < group.buttons.length; i++){
        console.log('re', group.buttons[i].sprite);
        group.buttons[i].sprite.addToGroup(drawLayer);
    }
    // for(button in group){
    //     console.log(button.sprite);
    //     //button.sprite.addToGroup(drawLayer);
    // }
    console.log(group);
    console.log('dlayer ', drawLayer);
    ShowButtons(drawLayer);
}

function draw() {
    //console.log(allSprites);
    //console.log(drawLayer);
    //ShowButtons(drawLayer);
    //ShowButtons(StartGroup);
    //drawSprites();
    //console.log(menu)
}

function StartGame() { 
    //StartGroup = ClearButtons(StartGroup);
    clear();
    console.log("GAME HAS STARTED");
    loop();
}

// function ClearButtons(group){
    
//     draw();
//     let temp = group.slice(0, group.length);
//     for(sprite of group){
        
//         sprite.mouseActive = false;
//         sprite.remove();
//     }
//     //group.removeSprites();
//     group = temp;
//     console.log(groups);
// }

function ShowButtons(group){
    createCanvas(1000, 500);
    background(200);
    group.draw();
    //console.log(group.toArray())
    for(sprite of group.toArray()){
        //console.log(sprite.Button.name);
        sprite.Button.DrawText();
        //console.log(sprite.Button.DrawText)
    }

}

function mouseClicked() {
    console.log('CLICK');
    for(button in ButtonGroup){
       // button.mouseUpdate();
        if(button.mouseIsOver){
            console.log("Mouse is over", button.ButtonName);
        }
    }
}


class Menu{
    constructor(){
        this.buttons = new Array(arguments.length-1);
        for(let i = 1; i < arguments.length; i++){
            this.buttons[i-1] = new Button(this.buttons.length, arguments[i].name, i-1, i-1, 100, arguments[0] ,arguments[i].OnClick);
            this.buttons[i-1].makeButton(arguments.length, 100);
        }
        console.log(this.buttons);

    }    
}


class Button{
    constructor(max, name, x, y, size, group, onClick, branches){
        this.name = name;
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

//width / segmentMax * segment,
    makeButton(max){
        fill('red');
        rectMode(CENTER);
        this.sprite = createSprite(width/2 ,
            //height/ max *( this.y+1) - (this.size/2 + this.size/8) ,
            (height - this.size/2) / this.max * (this.y+1),
            this.size*3,
            this.size);
        
        //this.sprite.debug = true;
        this.sprite.Button = this;
        this.sprite.ButtonName = this.name;
        this.sprite.onMousePressed = this.onClick;
        this.sprite.addImage(ButtonImage);
        this.sprite.scale = 1.5;
        //this.sprite.addToGroup(this.group);
        
        // rect(width/2 ,
        //     //height/ max *( this.y+1) - (this.size/2 + this.size/8) ,
        //     (height- this.size/2) / max * (this.y+1) ,
        //     this.size*2,
        //     this.size);

    }

    DrawText(){
        console.log('DRawing text');
        fill('black')
        textSize(32);
        textAlign(CENTER, CENTER);
        text(this.name, width/2,  (height- this.size/2) / this.max * (this.y+1) );
        //text(this.name, width/2,  (height - this.size/2) / );
    }

    DrawSprite(){
        drawSprite(this.sprite);
    }
}