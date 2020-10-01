//STATUS - MEDIUM

// let difficulty = {EASY: 1, NORMAL: 2, HARD: 3};
// class Game{
//     constructor(){
//         this.difficulty = difficulty.EASY;
//         this.totalLifes = 3;
//         this.currentLifes = this.totalLifes;
//     }

// }


//Class for Spawners
class Spawner{

    //Constructor for Enemy Type
    constructor(enemyType){
        this.enemyType = enemyType;
    }

    //Function to Spawn Enemies
    refresh(count){
        //If there is not too many Enemies
        if(GameManager.Groups.enemySprites.length < GameManager.Difficulty.maxEnemies){
            //Spawn As Many Enemies as Needed
            for(let i = 0; i <= count-GameManager.Groups.enemySprites.length; i++){
                //Random Type Chance
                let type = random(0,1);

                //Variable for Enemy Ship Type
                let enemy;
                if(type > .5){
                    //Ship = from shipandweapons.js
                    enemy =  createAlienShip();
                } else 
                {
                    //Ship = from shipandweapons.js
                    enemy = createDebugShip();
                }
                //If Debug Enabled Log "SPAWNING"
                GameManager.settings.debug ? console.log("SPAWNING") : 0;

                //Spawn A new Enemy (Ship, Size, Points, xPos, yPos)
                new Enemy(enemy, Math.floor(random(84, 256)), 2000, random(30, GameManager.settings.globalSettings.canvasWidth - 30), random(-500, -50));
            }
        }

        //EVERY 10 Seconds
        if(frameCount % (GameManager.settings.globalSettings.FPS*10) == 0){
            //Random Chance
            let rand = random(0,1);
            //Spawn Shop or Hazard
            rand > .75? SpaceEvent.startShopEvent() : rand < .6 ? SpaceEvent.startHazardEvent() : 0;
            
        }
    }
}

//Class for Space Events
class SpaceEvent{

    //Space Event Types Enum
    static SpaceEvents = {Shop: 0, Hazard: 1};
    //Space Event Sides Enum
    static SpaceEventSides = {Left: 0, Right: 1};

    //Constructor for SpaceEvent
    constructor(event, duration, width){

        //Event Type
        this.event = event;
        
        //Event Width (In Sprites(25px))
        this.width = width;
        //Event Duration
        this.maxDuration = duration;

        //Init Event
        this.pickSide();
        this.setEvent();
        this.announceEvent();
    }

    //Function to start a New Hazard Event
    static startHazardEvent(){
        new SpaceEvent(SpaceEvent.SpaceEvents.Hazard, 300, Math.floor(random(10,27)));
        console.log("Starting Hazard!");
    }
    //Function to start a New Shop Event
    static startShopEvent(){
        new SpaceEvent(SpaceEvent.SpaceEvents.Shop, 500, 5);
        console.log("Starting Shop!");
    }

    //Function to Pick Which Side of the Screen
    pickSide(){
        if(random(0,1) >= .5){
            this.side = SpaceEvent.SpaceEventSides.Left;
        } else {
            this.side = SpaceEvent.SpaceEventSides.Right;
        }
    }

    //Function to Set the Event Type 'animation'
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

    //Function to Announce or 'draw' the Event
    announceEvent(){
        //If Event is on LEft Side
        if(this.side == SpaceEvent.SpaceEventSides.Left){
            //For Each 'width'
            for(let i = 0; i < this.width; i++){
                //For the Height of the screen
                for(let j = 0; j < height; j+=100){
                    //Create the Notification Sprite in a Grid LEFT SIDE
                    let notif = createSprite((i+1) * 25, j + (50));
                    //Add Animation to the Sprite
                    notif.addAnimation('spin', this.anim);
                    //If the Event is a Shop, add it to Shop Group, else Add it to Hazard Group
                    this.event == SpaceEvent.SpaceEvents.Shop ? notif.addToGroup(GameManager.Groups.spaceEventsShop) : notif.addToGroup(GameManager.Groups.spaceEventsHazards);
                    //Set Sprite Life
                    notif.life = this.maxDuration;
                }
            }
        } else {
            //For Each 'width'
            for(let i = 0; i < this.width; i++){
                 //For the Height of the screen
                for(let j = 0; j < height; j+=100){
                    //Create the Notification Sprite in a Grid RIGHT SIDE
                    let notif = createSprite(GameManager.settings.globalSettings.canvasWidth - ((i+1) * 25), j + 50);
                    //Add Animation to the Sprite
                    notif.addAnimation('spin', this.anim);
                    //If the Event is a Shop, add it to Shop Group, else Add it to Hazard Group
                    this.event == SpaceEvent.SpaceEvents.Shop ? notif.addToGroup(GameManager.Groups.spaceEventsShop) : notif.addToGroup(GameManager.Groups.spaceEventsHazards);
                    //Set Sprite Life
                    notif.life = this.maxDuration;
                }
            }
        }
    }
}




