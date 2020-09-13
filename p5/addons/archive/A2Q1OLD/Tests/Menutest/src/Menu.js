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

function StartGame() { 
    //StartGroup = ClearButtons(StartGroup);
    clear();
    console.log("GAME HAS STARTED");
    loop();
}


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
}


class Menu{
    constructor(group){
        this.buttons = new Array(arguments.length-1);
        for(let i = 1; i < arguments.length; i++){
            this.buttons[i-1] = new Button(this.buttons.length, arguments[i].name, i-1, i-1, 100, group,arguments[i].OnClick);
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
        this.sprite = createSprite(
            width/2,
            (height - this.size/2) / this.max * (this.y+1),
            this.size*3,
            this.size);
        
        //this.sprite.debug = true;
        this.sprite.Button = this;
        this.sprite.ButtonName = this.name;
        this.sprite.onMousePressed = this.onClick;
        this.sprite.addImage(ButtonImage);
        this.sprite.scale = 1.5;

    }

    DrawText(){
        console.log('DRawing text');
        fill('black')
        textSize(32);
        textAlign(CENTER, CENTER);
        text(this.name, width/2,  (height- this.size/2) / this.max * (this.y+1) );
    }

    DrawSprite(){
        drawSprite(this.sprite);
    }
}