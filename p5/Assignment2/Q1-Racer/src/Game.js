//TODO play sound on ""collision, laps?, on overlap, countup, wait, repeat, if lap == maxlap, display win screen, display time, save time

let ButtonImage;
let drawLayer, hazards, barrelEGroup, barrelMGroup; //GROUPS
//let mainMenu, raceMenu, emptyCustomMenu; 
let menuEnum = {mainMenu: 'mainMenu', raceMenu: 'raceMenu', emptyCustomMenu: 'emptyCustomMenu'};
let ingame = false;
let uiColour, menubackground;
function preload(){
    LoadImages();
    drawLayer = new Group();
    mapGroup = new Group();
    barrelEGroup = new Group();
    barrelMGroup = new Group();
    //emptyCustomMenu = new Menu();
  
    daytonaMap = loadStrings('Maps/grass10.txt');
    weirdmap = loadStrings('Maps/weirdo.txt');
    playground = loadStrings('Maps/playground.txt');
    
}
//TODO clean all of this up, remove unneeded comments, check for anything unused
function setup() {
    uiColour = color(255,0,0);
    createCanvas(1500,750);
    imageMode(CENTER);
    background(200);
    mapg = new Map();
    car = new Car(7,4,3, redCarpng, 1, mapg.getStartpos());
    //DEFAULTS
        mainMenu = new Menu('mainMenu', uiColour,
        {name: 'Race', OnClick: function(){
            //ChangeDrawLayer.bind(null, menuEnum.raceMenu)
            DrawMenu(menuEnum.raceMenu);
            // car.resetCarStart(mapg.getStartpos());
            console.log("Test");   
            //makeHUD();
            //drawHUD();
            
            // carStats = new HUD(500,600, 50,50, 'red');
            // carStats.drawHUD();
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
            DisplayMapSelectMenu();
        }},
        {name: 'Race!', OnClick: function(){
            if(mapg.getStartpos() == undefined){
                mapg.setMap(daytonaMap);
                car.resetCarStart(mapg.getStartpos());
            }
            car.resetCarStart(mapg.getStartpos());
            StartRace();
            //console.log()
        }},
        {name: 'Return', OnClick: function(){
            //ChangeDrawLayer.bind(null, menuEnum.mainMenu)
            DrawMenu(menuEnum.mainMenu);
        }});

    mapMenu = new Menu('mapMenu', uiColour,
        {name: "Daytona", OnClick: function(){
            mapg.setMap(daytonaMap);
            car.resetCarStart(mapg.getStartpos());
            DrawMenu(menuEnum.raceMenu);
        }},
        {name: "Weird", OnClick: function(){
            mapg.setMap(weirdmap);
            car.resetCarStart(mapg.getStartpos());
            DrawMenu(menuEnum.raceMenu);
        }},
        {name: "Playground", OnClick: function(){
            mapg.setMap(playground);
            car.resetCarStart(mapg.getStartpos());
            DrawMenu(menuEnum.raceMenu);
        }},
        {name: 'Return', OnClick: function(){
            print("MAPMENU RETURN");
            DrawMenu(menuEnum.raceMenu);
        }});

        //TODO maybe factor a way to change all menu colours at the same time
    carMenu = new Menu('carMenu',mainMenu.colour,
        {name: 'Red Car', OnClick: function(){
            car = new Car(5,4,3, redCarpng, 1, mapg.getStartpos());
            mainMenu.ChangeColour('red');
            carMenu.ChangeColour('red');
            raceMenu.ChangeColour('red');
            mapMenu.ChangeColour('red');
            carMenu.DrawMenu();
        }},
        {name: 'Blue Car', OnClick: function(){
            car = new Car(4,5,4, blueCarpng,  .9, mapg.getStartpos());
            mainMenu.ChangeColour('lightblue');
            carMenu.ChangeColour('lightblue');
            raceMenu.ChangeColour('lightblue');
            mapMenu.ChangeColour('lightblue');
            carMenu.DrawMenu();
        }},
        {name: 'Yellow Car', OnClick: function(){
            car = new Car(3,4,6, yellowCarpng, .8, mapg.getStartpos());
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
    //console.log('d layer ' ,drawLayer)
    //console.log(mainMenu)
    //console.log(raceMenu);
    drawLogo();
    
    
    // car = new Car(4,4,4, redCarpng, 1, mapg.getStartpos());


  
}
//TODO CLEAN THIS
function draw(){
    if(ingame){
        //console.log("Re")
        mapg.drawMap();
        drawSprites();
        car.MoveCar();
        DEBUGmousepos();
    }

}

function DEBUGmousepos(){
    textAlign(CENTER, CENTER);
    textSize(16);
    //text("X: " + mouseX + " Y: "+ mouseY, mouseX+50, mouseY);
}

function keyPressed() {
    if(keyCode == 27){
        // console.log('ESC');
        ingame = false;
        DrawMenu(menuEnum.mainMenu);
        drawLogo();
    }
    if(keyCode == 69){
        console.log('mapg---');
        console.log(mapg);
        console.log("mapGroup-");
        console.log(mapGroup);
        console.log("allsprites--");
        console.log(allSprites);
        console.log('car..');
        console.log(car)
        car.resetCarStart(mapg.getStartpos());
        console.log("START POS--");
        console.log(mapg.getStartpos());
    }
}

function DisplayMapSelectMenu(){
    ClearDrawLayer();
    background(200);
    mapMenu.DrawMenu();
}

function drawLogo(){
    imageMode(CENTER)
    image(speedracerlogo, width/2, 75, 640, 320);
}

function DrawMenu(group){
    group = eval(group);
    ClearDrawLayer();
    group.DrawMenu(drawLayer);
    
}

function ClearDrawLayer(){
    allSprites.clear();
    drawLayer.clear();
    // createCanvas(1000, 500);
    // background(200);
}

//TODO CLEAN THIS
function LoadImages(){
    //TILES
    road = loadImage('Assets/Ground/Road_Base.png');
    grass = loadImage('Assets/Ground/Grass_Base.png')
    finish = loadImage('Assets/Ground/Finish_Base.png');
    // grassflag = loadImage('Assets/grassflaganimrows.png');
    // grassflaganim = loadAnimation(grassflag);
    //CARS
    redCarpng = loadImage('Assets/Car/redcar.png');
    blueCarpng = loadImage('Assets/Car/bluecar.png');
    yellowCarpng = loadImage('Assets/Car/yellowcar.png');
    //MENU
    ButtonImage = loadImage('Button.png');
    speedracerlogo = loadImage('speedracer.png');
   
    menubackground = loadImage('Assets/menubg.png');


    //BARRELS
    barrelboost   = loadImage('Assets/barrelboost.png');
    barrelexplode = loadImage('Assets/barrelexplode.png');
    barrelmove =    loadImage('Assets/barrelmove.png');

    //ANIMATION
    smokeAnim = loadAnimation('Assets/SmokeAnim/smokeanim_1.png', 'Assets/SmokeAnim/smokeanim_2.png', 'Assets/SmokeAnim/smokeanim_3.png', 'Assets/SmokeAnim/smokeanim_4.png', 'Assets/SmokeAnim/smokeanim_5.png');


    //SOUND
    carcrashsound = loadSound('Assets/carcrash.mp3');
    //UNUSED
    //starting = loadImage('Assets/Ground/Starting_Base.png');
}