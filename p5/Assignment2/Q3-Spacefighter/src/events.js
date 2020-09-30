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
        if(GameManager.Groups.enemySprites.length < GameManager.Difficulty.maxEnemies){
            for(let i = 0; i <= count-GameManager.Groups.enemySprites.length; i++){
                let type = random(0,1);
                let enemy;
                if(type > .5){
                    enemy = createAlienShip()
                } else 
                {
                    enemy = createDebugShip();
                }
                console.log("SPAWNING");
                new Enemy(enemy, Math.floor(random(84, 256)), 2000, random(30, GameManager.settings.globalSettings.canvasWidth - 30), random(-500, -50));
            }
        }
        if(frameCount % 600 == 0){
            let rand = random(0,1);
            rand > .9 ? startShopEventDEBUG() : 0;
        }
    }
}

class SpaceEvent{

    static SpaceEvents = {Shop: 0, Hazard: 1};
    static SpaceEventSides = {Left: 0, Right: 1};
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
            this.side = SpaceEvent.SpaceEventSides.Left;
        } else {
            this.side = SpaceEvent.SpaceEventSides.Right;
        }
    }

    setEvent(){
        switch(this.event){
            case SpaceEvent.SpaceEvents.Shop:
                this.anim = shopnotifcationanim;
            break;
            case SpaceEvent.SpaceEvents.Hazard:
                this.anim = warningnotificationanim
            break;
        }
    }

    announceEvent(){
        if(this.side == SpaceEvent.SpaceEventSides.Left){
            for(let i = 0; i < this.width; i++){
                for(let j = 0; j < height; j+=100){
                    let notif = createSprite((i+1) * 25, j + (50));
                    notif.addAnimation('spin', this.anim);
                    notif.addToGroup(GameManager.Groups.spaceEvents);
                    notif.life = this.maxDuration;
                }
            }
        } else {
            for(let i = 0; i < this.width; i++){
                for(let j = 0; j < height; j+=100){
                    let notif = createSprite(GameManager.settings.globalSettings.canvasWidth - ((i+1) * 25), j + 50);
                    notif.addAnimation('spin', this.anim);
                    notif.addToGroup(GameManager.Groups.spaceEvents);
                    notif.life = this.maxDuration;
                }

            }


        }

    }
}



