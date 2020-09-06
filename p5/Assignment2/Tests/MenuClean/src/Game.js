let ButtonImage;
let drawLayer, hazards;
let mainMenu, raceMenu, emptyCustomMenu;
let menuEnum = {mainMenu: 'mainMenu', raceMenu: 'raceMenu', emptyCustomMenu: 'emptyCustomMenu'};
let ingame = false;
let uiColour;
function preload(){
    drawLayer = new Group();
    
    mapGroup = new Group();

    emptyCustomMenu = new Menu();

    daytonaMap = loadStrings('Maps/grass10.txt');
    weirdmap = loadStrings('Maps/weirdo.txt');
    LoadImages();
}

function setup() {
    uiColour = color(255,0,0);
    canvas = createCanvas(2000,1000);

    background(200);
    mapg = new Map();
    //DEFAULTS

    mapg.setMap(weirdmap);
    car = new Car(4,4,4, redCarpng, mapg.getStartpos());

    mainMenu = new Menu('mainMenu', uiColour,
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

    raceMenu = new Menu('raceMenu', uiColour,
        {name: 'Car Select', OnClick: function(){
            DisplayCarSelectMenu();
        }},
        {name: 'Map Select', OnClick: function(){
            DisplayMapSelectMenu()
        }},
        {name: 'Race!', OnClick: function(){
            StartRace();
        }},
        {name: 'Return', OnClick: function(){
            //ChangeDrawLayer.bind(null, menuEnum.mainMenu)
            print("FQQQ")
            DrawMenu(menuEnum.mainMenu);
            drawLogo();
        }}
    );
    mapMenu = new Menu('mapMenu', uiColour,
    {name: "Daytona", OnClick: function(){mapg.setMap(daytonaMap); DrawMenu(menuEnum.raceMenu);}},
    {name: "Weird", OnClick: function(){mapg.setMap(weirdmap); DrawMenu(menuEnum.raceMenu);}},
    {name: 'Return', OnClick: function(){
        print("MAPMENU RETURN");
        DrawMenu(menuEnum.raceMenu);
    }});
    carMenu = new Menu('carMenu',mainMenu.colour,
    {name: 'Red Car', OnClick: function(){
        car = new Car(7,4,3, redCarpng, mapg.getStartpos());
        mainMenu.ChangeColour('red');
        carMenu.ChangeColour('red');
        raceMenu.ChangeColour('red');
        mapMenu.ChangeColour('red');
        carMenu.DrawMenu();
    }},
    {name: 'Blue Car', OnClick: function(){
        car = new Car(6,5,4, blueCarpng, mapg.getStartpos());
        mainMenu.ChangeColour('lightblue');
        carMenu.ChangeColour('lightblue');
        raceMenu.ChangeColour('lightblue');
        mapMenu.ChangeColour('lightblue');
        carMenu.DrawMenu();
    }},
    {name: 'Yellow Car', OnClick: function(){
        car = new Car(3,4,6, yellowCarpng, mapg.getStartpos());
        mainMenu.ChangeColour('yellow');
        carMenu.ChangeColour('yellow');
        raceMenu.ChangeColour('yellow');
        mapMenu.ChangeColour('yellow');
        carMenu.DrawMenu();
    }},
    {name: 'Return', OnClick: function(){
        print("CARMENU RETURN");
        DrawMenu(menuEnum.raceMenu);
    }});

    frameRate(60);
    DrawMenu(mainMenu);
    console.log('d layer ' ,drawLayer)
    console.log(mainMenu)
    console.log(raceMenu);
    drawLogo();
}

function draw(){
    if(ingame){
        //clear();
        mapg.drawMap();
        drawSprites();
        car.MoveCar();
    }
}

function keyPressed() {
    if(keyCode == 27){
        console.log('ESC');
        ingame = false;
        DrawMenu(menuEnum.mainMenu);
        drawLogo();
    }
    if(keyCode == 69){
        console.log('test---');
        console.log(mapg);
        console.log(mapGroup);
        console.log(allSprites);
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
    
    // createCanvas(1000, 500);
    // background(200);
}


function LoadImages(){
    road = loadImage('Assets/Ground/Road_Base.png');
    grass = loadImage('Assets/Ground/Grass_Base.png')
    finish = loadImage('Assets/Ground/Finish_Base.png');
    starting = loadImage('Assets/Ground/Starting_Base.png');

    ButtonImage = loadImage('Button.png');
    speedracerlogo = loadImage('speedracer.png');
    
    redCarpng = loadImage('Assets/Car/redcar.png');
    blueCarpng = loadImage('Assets/Car/bluecar.png');
    yellowCarpng = loadImage('Assets/Car/yellowcar.png');
}