const SPRITEPIXELSIZE = 32;

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
