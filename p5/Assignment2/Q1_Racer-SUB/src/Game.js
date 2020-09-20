let ButtonImage;
let drawLayer, hazards, barrelEGroup, barrelMGroup;
let menuEnum = { mainMenu: 'mainMenu', raceMenu: 'raceMenu', emptyCustomMenu: 'emptyCustomMenu' };
let ingame = false;
let uiColour, menubackground;
function preload() {
    LoadImages();
    drawLayer = new Group();
    mapGroup = new Group();
    barrelEGroup = new Group();
    barrelMGroup = new Group();

    daytonaMap = loadStrings('Maps/grass10.txt');
    weirdmap = loadStrings('Maps/weirdo.txt');
    playground = loadStrings('Maps/playground.txt');

}
function setup() {
    uiColour = color(255, 0, 0);
    createCanvas(1500, 750);
    imageMode(CENTER);
    background(200);
    mapg = new Map();
    car = new Car(7, 4, 3, redCarpng, 1, mapg.getStartpos());
    mainMenu = new Menu('mainMenu', uiColour,
        {
            name: 'Race', OnClick: function () {
                DrawMenu(menuEnum.raceMenu);
                console.log("Race Menu");
            }
        },
        {
            name: 'Options', OnClick: function () {
                console.log("Options");
            }
        },
        {
            name: 'Quit', OnClick: function () {
                console.log("Quit");
            }
        });

    raceMenu = new Menu('raceMenu', uiColour,
        {
            name: 'Car Select', OnClick: function () {
                DisplayCarSelectMenu();
            }
        },
        {
            name: 'Map Select', OnClick: function () {
                DisplayMapSelectMenu();
            }
        },
        {
            name: 'Race!', OnClick: function () {
                if (mapg.getStartpos() == undefined) {
                    mapg.setMap(weirdmap);
                }
                car.resetCarStart(mapg.getStartpos());
                StartRace();
            }
        },
        {
            name: 'Return', OnClick: function () {
                DrawMenu(menuEnum.mainMenu);
            }
        });

    mapMenu = new Menu('mapMenu', uiColour,
        {
            name: "Daytona", OnClick: function () {
                mapg.setMap(daytonaMap);
                car.resetCarStart(mapg.getStartpos());
                DrawMenu(menuEnum.raceMenu);
            }
        },
        {
            name: "Weird", OnClick: function () {
                mapg.setMap(weirdmap);
                car.resetCarStart(mapg.getStartpos());
                DrawMenu(menuEnum.raceMenu);
            }
        },
        {
            name: "Playground", OnClick: function () {
                mapg.setMap(playground);
                car.resetCarStart(mapg.getStartpos());
                DrawMenu(menuEnum.raceMenu);
            }
        },
        {
            name: 'Return', OnClick: function () {
                print("MAPMENU RETURN");
                DrawMenu(menuEnum.raceMenu);
            }
        });

    carMenu = new Menu('carMenu', mainMenu.colour,
        {
            name: 'Red Car', OnClick: function () {
                car = new Car(5, 4, 3, redCarpng, 1, mapg.getStartpos());
                mainMenu.ChangeColour('red');
                carMenu.ChangeColour('red');
                raceMenu.ChangeColour('red');
                mapMenu.ChangeColour('red');
                carMenu.DrawMenu();
            }
        },
        {
            name: 'Blue Car', OnClick: function () {
                car = new Car(4, 5, 4, blueCarpng, .9, mapg.getStartpos());
                mainMenu.ChangeColour('lightblue');
                carMenu.ChangeColour('lightblue');
                raceMenu.ChangeColour('lightblue');
                mapMenu.ChangeColour('lightblue');
                carMenu.DrawMenu();
            }
        },
        {
            name: 'Yellow Car', OnClick: function () {
                car = new Car(3, 4, 6, yellowCarpng, .8, mapg.getStartpos());
                mainMenu.ChangeColour('yellow');
                carMenu.ChangeColour('yellow');
                raceMenu.ChangeColour('yellow');
                mapMenu.ChangeColour('yellow');
                carMenu.DrawMenu();
            }
        },
        {
            name: 'Return', OnClick: function () {
                print("CARMENU RETURN");
                DrawMenu(menuEnum.raceMenu);
            }
        });

    frameRate(60);
    DrawMenu(mainMenu);
    drawLogo();
}

function draw() {
    if (ingame) {
        mapg.drawMap();
        drawSprites();
        car.MoveCar();
    }

}

function keyPressed() {

    if (keyCode == 27) { //ESC
        ingame = false;
        DrawMenu(menuEnum.mainMenu);
        drawLogo();
    }//DEBUG STUFF
    if (keyCode == 69) {
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

function DisplayMapSelectMenu() {
    ClearDrawLayer();
    background(200);
    mapMenu.DrawMenu();
}

function drawLogo() {
    imageMode(CENTER)
    image(speedracerlogo, width / 2, 75, 640, 320);
}

function DrawMenu(group) {
    group = eval(group);
    ClearDrawLayer();
    group.DrawMenu(drawLayer);

}

function ClearDrawLayer() {
    allSprites.clear();
    drawLayer.clear();
}

function LoadImages() {

    //TILES
    road = loadImage('Assets/Ground/Road_Base.png');
    grass = loadImage('Assets/Ground/Grass_Base.png')
    finish = loadImage('Assets/Ground/Finish_Base.png');

    //CARS
    redCarpng = loadImage('Assets/Car/redcar.png');
    blueCarpng = loadImage('Assets/Car/bluecar.png');
    yellowCarpng = loadImage('Assets/Car/yellowcar.png');

    //MENU
    ButtonImage = loadImage('Button.png');
    speedracerlogo = loadImage('speedracer.png');

    menubackground = loadImage('Assets/menubg.png');

    //BARRELS
    // barrelboost   = loadImage('Assets/barrelboost.png'); //UNSUSED
    barrelexplode = loadImage('Assets/barrelexplode.png');
    barrelmove = loadImage('Assets/barrelmove.png');

    //ANIMATION
    smokeAnim = loadAnimation('Assets/SmokeAnim/smokeanim_1.png', 'Assets/SmokeAnim/smokeanim_2.png', 'Assets/SmokeAnim/smokeanim_3.png', 'Assets/SmokeAnim/smokeanim_4.png', 'Assets/SmokeAnim/smokeanim_5.png');


    //SOUND
    carcrashsound = loadSound('Assets/carcrash.mp3');

    //UNUSED
    //starting = loadImage('Assets/Ground/Starting_Base.png');
}