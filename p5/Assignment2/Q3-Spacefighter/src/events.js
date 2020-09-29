//STATUS - MEDIUM

let difficulty = {EASY: 1, NORMAL: 2, HARD: 3};
class Game{
    constructor(){
        this.difficulty = difficulty.EASY;
        this.totalLifes = 3;
        this.currentLifes = this.totalLifes;
    }

}


class enemySpawner{
    constructor(enemyType){
        this.enemyType = enemyType;
    }

    spawnEnemy(count, randomCount){
        if(frameCount % 320 == 0){
            for(let i = 0; i < count; i++){
                let type = random(0,1);
                let enemy;
                if(type > .5){
                    enemy = createAlienShip()
                } else 
                {
                    enemy = createDebugShip();
                }
                new Enemy(enemy, Math.floor(random(84, 256)), 2000, random(30, settingsjson.globalSettings.canvasWidth - 30), random(-500, -50));
            }
        }
        if(frameCount % 600 == 0){
            let rand = random(0,1);
            rand > .8 ? startShopEventDEBUG() : 0;
        }
    }
}

let SpaceEvents = {Shop: 0, Hazard: 1};
let SpaceEventSides = {Left: 0, Right: 1};
class SpaceEvent{
    constructor(event, duration, width){
        this.event = event;
        this.width = width;
        this.maxDuration = duration;
        this.pickSide();
        this.setEvent();
        this.announceEvent();
    }

    pickSide(){
        if(random(0,1) >= .5){
            this.side = SpaceEventSides.Left;
        } else {
            this.side = SpaceEventSides.Right;
        }
    }

    setEvent(){
        switch(this.event){
            case SpaceEvents.Shop:
                this.anim = shopnotifcationanim;
            break;
            case SpaceEvents.Hazard:
                this.anim = warningnotificationanim
            break;
        }
    }

    announceEvent(){
        if(this.side == SpaceEventSides.Left){
            for(let i = 0; i < this.width; i++){
                for(let j = 0; j < height; j+=100){
                    let notif = createSprite((i+1) * 25, j + (50));
                    notif.addAnimation('spin', this.anim);
                    notif.life = this.maxDuration;
                }
            }
        } else {
            for(let i = 0; i < this.width; i++){
                for(let j = 0; j < height; j+=100){
                    let notif = createSprite(settingsjson.globalSettings.canvasWidth - ((i+1) * 25), j + 50);
                    notif.addAnimation('spin', this.anim);
                    notif.life = this.maxDuration;
                }

            }


        }

    }
}



