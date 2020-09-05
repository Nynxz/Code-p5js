let ButtonImage;
let drawLayer;
let mainMenu, raceMenu, emptyCustomMenu;
let menuEnum = {mainMenu: 'mainMenu', raceMenu: 'raceMenu', emptyCustomMenu: 'emptyCustomMenu'};
let RacerPlayerOne;

function preload(){
    drawLayer = new Group();
    emptyCustomMenu = new Menu();
    ButtonImage = loadImage('Button.png');
    speedracerlogo = loadImage('speedracer.png');
    
}

function setup() {
    createCanvas(1000, 500);
    background(200);
    
    mainMenu = new Menu('mainMenu',
        {name: 'Race', OnClick: function(){
            //ChangeDrawLayer.bind(null, menuEnum.raceMenu)
            DrawMenu(menuEnum.raceMenu);
            console.log("Test");   
        }},
        {name:'Options',  OnClick: function(){
            console.log("Options");
        }},
        {name:'Quit', OnClick: function(){
            console.log("Quit");
        }});

    raceMenu = new Menu('raceMenu',
        {name: 'Car Select', OnClick: function(){
            DisplayCarSelectMenu();
        }},
        {name: 'Map Select'},
        {name: 'Race!', OnClick: function(){
            StartRace();
        }},
        {name: 'Return', OnClick: function(){
            //ChangeDrawLayer.bind(null, menuEnum.mainMenu)
            DrawMenu(menuEnum.mainMenu);
            drawLogo();
        }}
    );


    frameRate(15);
    DrawMenu(mainMenu);
    console.log('d layer ' ,drawLayer)
    console.log(mainMenu)
    console.log(raceMenu);
    drawLogo();
}

function draw(){
    
}

function keyPressed() {
    if(keyCode == 27){
        console.log('ESC');
        DrawMenu(menuEnum.mainMenu);
        drawLogo();
    }
}



function drawLogo(){
    imageMode(CENTER)
    image(speedracerlogo, width/2, 75, 640, 320);
}

function DrawMenu(group){
    group = eval(group);
    allSprites.clear();
    drawLayer.clear();
    group.DrawMenu(drawLayer);
    
}

function ClearDrawLayer(){
    allSprites.clear();
    drawLayer.clear();
    createCanvas(1000, 500);
    background(200);
}
