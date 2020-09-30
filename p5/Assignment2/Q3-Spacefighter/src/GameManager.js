class GameManager{
    static player;


    //ARRAYS
    static enemyShipsArray = new Array();

    
    //GROUPS
    static Groups = new Object();
    static initGroups(){

        //GAME SPRITES
        GameManager.Groups.enemybullets = new Group();
        GameManager.Groups.friendlybullets = new Group();
        GameManager.Groups.pickups = new Group();
        GameManager.Groups.spaceEvents = new Group();
        GameManager.Groups.enemySprites = new Group();

        //UI
        GameManager.Groups.pauseMenu = new Group();
    }

    static removeAllSprites(){
        GameManager.player.ship.sprite.remove();
        GameManager.Groups.enemybullets.removeSprites()
        GameManager.Groups.friendlybullets.removeSprites()
        GameManager.Groups.pickups.removeSprites()
        GameManager.Groups.spaceEvents.removeSprites()
        GameManager.Groups.enemySprites.removeSprites()
    }


    //DIFFICULTY
    static Difficulty = new Object();
    static initDifficulty(){
        GameManager.Difficulty.maxEnemies = 5;
    }



    //SETTINGS
    static settings;
    static paused = false;
    static weapons;
    

    //STATES
    static statesE = {LOADING: 'loading', MAINMENU: 'mainmenu', PLAYING: 'playing', LEADERBOARD: 'leaderboard'};
    static currentState = this.statesE.LOADING;

    

    static enemyShipsCleanArray(){
        GameManager.enemyShipsHPChecks();
        GameManager.enemyShipsArray = GameManager.enemyShipsArray.filter(e => e.ship.sprite.life > 0);
        // array = array
        // return array;
    }


    static enemyShipsShootAll(array, targetShip){
        array.map(e => {
            e.ship.info.weapons[0].pointAt(createVector(targetShip.sprite.position.x,targetShip.sprite.position.y));
            e.shoot();
        });
    }

    static enemyShipsHPChecks(){
        //GameManager.enemyShipsArray = GameManager.cleanShipsArray(GameManager.enemyShipsArray);
        //GameManager.enemyShipsArray = 
        for(let enemy of GameManager.enemyShipsArray){
            enemy.cleanup()
            enemy.healthbar();
        }
    }

    static cleanBulletGroups(){

        GameManager.Groups.friendlybullets.map((bullet) => {
            if(bullet.position.y < 0 || bullet.position.x < 0 || bullet.position.y > GameManager.settings.globalSettings.canvasWidth){
                bullet.remove();
            }
        });

        GameManager.Groups.enemybullets.map((bullet) => {
            if(bullet.position.y < 0 || bullet.position.x < 0 || bullet.position.y > GameManager.settings.globalSettings.canvasWidth){
                bullet.remove();
            }
        });
    }

   
}