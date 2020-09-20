const SPRITEPIXELSIZE = 32;
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

function DisplayCarSelectMenu() {
    console.log('Car Select');
    ClearDrawLayer();
    background(200);
    carMenu.DrawMenu();
}

let car, map, player;
function StartRace() {
    ClearDrawLayer();
    ingame = true;
    player = new Racer(car, map);
    car.resetCarStart(mapg.getStartpos());
    car.drawCar();
}

class Racer {
    constructor(car, map) {
        this.car = car;
        this.map = map;
        console.log(car);
    }
};
class Car {
    constructor(topSpeed, acceleration, turning, sprite, scale, start) {
        this.topSpeed = topSpeed;
        this.acceleration = acceleration;
        this.turning = turning;
        this.image = sprite;
        this.sprite;
        this.currentSpeed = 0;
        this.start = start;
        this.scale = scale;
    }

    resetCarStart(pos) {
        this.start = pos;
    }

    drawCar() {
        this.currentSpeed = 0;
        this.sprite = createSprite(this.start.x, this.start.y, 0, 0);
        this.sprite.rotation -= 90;
        this.sprite.immovable = true;
        this.sprite.addImage(this.image);
        this.sprite.scale = 2;
        this.sprite.scale = this.scale;
        this.sprite.setCollider('circle', 0, 0, this.scale * 7.5);
        this.sprite.mass = 10;
        this.sprite.friction = 0.1;
    }

    MoveCar() {
        let speed = this.currentSpeed;
        if (this.sprite.overlap(hazards) || this.sprite.collide(barrelEGroup)) {
            let smokeAni = createSprite(this.sprite.position.x, this.sprite.position.y);
            smokeAni.addAnimation('smokeani', smokeAnim);
            smokeAni.looping = false;
            smokeAni.life = 20;
            carcrashsound.play();
            this.sprite.limitSpeed(0);
            this.currentSpeed = 0;
            this.sprite.rotation = -90;
            speed = 0;
            this.sprite.position.x = this.start.x;
            this.sprite.position.y = this.start.y;
            console.log("collided with hazard");
        }
        barrelMGroup.collide(this.sprite);
        barrelEGroup.collide(barrelMGroup);
        barrelMGroup.collide(barrelMGroup);
        barrelEGroup.collide(barrelEGroup);
        hazards.collide(barrelMGroup);
        hazards.collide(barrelEGroup);

        this.sprite.setSpeed(speed, this.sprite.rotation - 90);
        if (keyIsDown(87)) {//W
            this.currentSpeed = constrain(speed + (this.acceleration / 100), -1, this.topSpeed);
        } else {
            this.currentSpeed = constrain(speed - ((this.acceleration / 100)), 0, this.topSpeed);
        }
        if (keyIsDown(83)) {//S
            this.currentSpeed = constrain(speed - (this.acceleration / 100), -1, this.topSpeed);
        }
        if (keyIsDown(65)) {//A
            if (Math.abs(speed) > 0.1)
                this.sprite.rotation -= 1 * speed / (5 / this.turning);
        }
        if (keyIsDown(68)) {//D
            if (Math.abs(speed) > 0.1)
                this.sprite.rotation += 1 * speed / (5 / this.turning);
        }

    }
};
class Map {
    constructor() {
        this.txt;
        this.map2d;
        this.mheight;
        this.mwidth;
        this.startpos;
    }

    getWidth() {
        let maxWidth = 0;
        for (let arr in this.map2d) {
            maxWidth = maxWidth < this.map2d[arr].length ? this.map2d[arr].length : maxWidth;
        }
        return maxWidth > 0 ? maxWidth : 10;
    }

    getHeight() {
        return this.mheight;
    }

    getStartpos() {
        return this.startpos;
    }

    loadTrack() {
        let track = this.txt.map(e => e.split(""));
        track = track.map((a, aindex) => a.map((e, eindex) => this.makeTile(eindex, aindex, e)));
        return track;
    }

    drawMap() {
        if (smokeAnim.playing) {
            clear();
            createCanvas(mapg.getWidth() * SPRITEPIXELSIZE * 2, mapg.getHeight() * SPRITEPIXELSIZE * 2);
            mapGroup = new Group();
            for (let arr of this.map2d) {
                for (let tile of arr) {
                    if (tile.type == 3 && frameCount % 20 == 0) {
                        tile.sprite.animation.nextFrame();
                    }
                    if (tile.type == "E") {
                        tile.sprite.barrel.addImage(barrelexplode);
                        tile.sprite.barrel.addToGroup(barrelEGroup);
                    }
                    if (tile.type == "M") {
                        tile.sprite.barrel.friction = .5;
                        tile.sprite.barrel.mass = 5000;
                        tile.sprite.barrel.addImage(barrelmove);
                        tile.sprite.barrel.addToGroup(barrelMGroup);
                    }
                    tile.sprite.visible = true;
                    tile.sprite.addToGroup(mapGroup);
                }
            }
            drawSprites(mapGroup);
            drawSprites(barrelMGroup);
            drawSprites(barrelEGroup);
            drawSprites();
        }
    }

    setMap(txt) {
        clear();
        hazards = new Group();
        mapGroup = new Group();
        barrelMGroup = new Group();
        barrelEGroup = new Group();

        ClearDrawLayer();
        this.txt = txt;
        this.map2d = this.loadTrack(txt);
        this.mheight = this.txt.length < 0 ? 0 : this.txt.length;
        this.mwidth = this.getWidth();
    }

    makeTile(row, col, type) {
        function createTileSprite() {
            let ss = createSprite(
                (((row) * (SPRITEPIXELSIZE * 2)) + (SPRITEPIXELSIZE)),
                ((col) * SPRITEPIXELSIZE * 2) + (SPRITEPIXELSIZE),
                0, 0);
            return ss;
        }
        let newSprite = createTileSprite();
        newSprite.setCollider('rectangle', 0, 0, (SPRITEPIXELSIZE * 2), (SPRITEPIXELSIZE * 2))
        newSprite.visible = false;
        switch (type) {
            case "0":
                newSprite.addImage(grass);
                newSprite.addToGroup(drawLayer);
                newSprite.addToGroup(hazards);
                break;
            case "1":
                newSprite.addImage(road);
                newSprite.addToGroup(drawLayer);
                break;
            case "2":
                newSprite.addImage(finish);
                console.log("MAKING START POSITION");
                console.log(this.startpos);
                this.startpos = newSprite.position;
                break;
            case "3":
                newSprite.addAnimation('flaganim', 'Assets/FlagAnim/grassflaganimrows_1.png', 'Assets/FlagAnim/grassflaganimrows_2.png', 'Assets/FlagAnim/grassflaganimrows_3.png', 'Assets/FlagAnim/grassflaganimrows_4.png', 'Assets/FlagAnim/grassflaganimrows_5.png', 'Assets/FlagAnim/grassflaganimrows_6.png', 'Assets/FlagAnim/grassflaganimrows_7.png', 'Assets/FlagAnim/grassflaganimrows_8.png');
                break;
            default:
                newSprite.addImage(road);
                newSprite.addToGroup(drawLayer);
                console.log("TYPE E");
                let barrelS = createTileSprite();
                barrelS.scale = SPRITEPIXELSIZE / 32 * 2;
                barrelS.mass = 1;
                barrelS.setCollider('circle', 0, 0, SPRITEPIXELSIZE / 2);
                newSprite.barrel = barrelS;
                console.log(newSprite);
        }
        newSprite.scale = SPRITEPIXELSIZE / 32 * 2;
        newSprite.immovable = true;
        return {
            type: type,
            sprite: newSprite
        };
    }
}


class Menu {
    constructor(group, colour, ...buttons) {
        this.group = group;
        this.colour = colour;
        this.buttons = new Array(buttons.length);
        for (let i = 0; i < buttons.length; i++) {
            this.buttons[i] = new Button(this.colour, this.buttons.length, buttons[i].name, i, 100, group, buttons[i].OnClick);
        }
    }

    DrawMenu() {
        clear();
        noCanvas();
        createCanvas(1500, 750);
        background(200);
        image(menubackground, width / 2, height / 2, width, height);
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].makeButton();
            this.buttons[i].sprite.addToGroup(drawLayer);
            this.buttons[i].DrawSprite();
            this.buttons[i].DrawText();
        }
    }

    ChangeColour(colour) {
        this.colour = colour;
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].colour = this.colour;
        }
    }
}

class Button {
    constructor(colour, max, name, y, size, group, onClick) {
        this.name = name;
        this.y = y;
        this.size = size;
        this.onClick = onClick
        this.sprite;
        this.group = group;
        this.max = max;
        this.colour = colour;
    }

    makeButton() {
        fill(this.colour);
        rectMode(CENTER);
        rect(width / 2,
            (height - this.size) / this.max * (this.y + 1),
            this.size * 3,
            this.size * 1.5);
        this.sprite = createSprite(
            width / 2,
            (height - this.size) / this.max * (this.y + 1),
            this.size * 3,
            this.size * 1.5);
        this.sprite.onMouseReleased = this.onClick;
        this.sprite.addImage(ButtonImage);
        this.sprite.scale = 1;
    }

    DrawText() {
        fill('black')
        textSize(32);
        textAlign(CENTER, CENTER);
        text(this.name, width / 2, (height - this.size) / this.max * (this.y + 1));
    }

    DrawSprite() {
        drawSprite(this.sprite);
    }
}