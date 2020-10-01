//Class to Handle the Game
class GameManager{

    //Property for the Player
    static player;


    //ARRAYS
    static enemyShipsArray = new Array();

    
    //GROUPS
    static Groups = new Object();
    static initGroups(){

        //GAME SPRITES
        GameManager.Groups.enemybullets = new Group();
        GameManager.Groups.friendlybullets = new Group();

        GameManager.Groups.pickups =  new Group();
        GameManager.Groups.enemySprites = new Group();

        //EVENTS
        GameManager.Groups.spaceEventsShop =  new Group();
        GameManager.Groups.spaceEventsHazards = new Group();

        //UI
        GameManager.Groups.pauseMenu = new Group();
        GameManager.Groups.ShopItems = new Group();
        GameManager.Groups.hoverToolTip = new Group();
    }

    //Function to Remove All Sprites from Groups
    static removeAllSprites(){
        GameManager.player.ship.sprite.remove();
        GameManager.Groups.enemybullets.removeSprites()
        GameManager.Groups.friendlybullets.removeSprites()
        GameManager.Groups.pickups.removeSprites()
        GameManager.Groups.spaceEventsShop.removeSprites()
        GameManager.Groups.spaceEventsHazards.removeSprites()
        GameManager.Groups.enemySprites.removeSprites()
    }

    //DIFFICULTY
    static Difficulty = new Object();
    static initDifficulty(){
        GameManager.Difficulty.maxEnemies = 5;
    }


    //SETTINGS

    //Propety for Settings JSON
    static settings;

    //Propety for Weapons JSON
    static weapons;
    
    //Default - Not Paused
    static paused = false;

    //STATE ENUMS
    static statesE = {LOADING: 'loading', MAINMENU: 'mainmenu', PLAYING: 'playing', LEADERBOARD: 'leaderboard'};
    static currentState = this.statesE.LOADING;

    static pauseStatesE = {PAUSE: 'pause', SHOP: 'shop'};
    static currentPauseState = this.pauseStatesE.PAUSE;


    //Function for all Enemy Functions
    static enemyShipsRefresh(){
        GameManager.enemyShipsHPChecks();
        GameManager.enemyShipsArray = GameManager.enemyShipsArray.filter(e => e.ship.sprite.life > 1);
    }

    //Function for all Enemys to Shoot 'at Player'
    static enemyShipsShootAll(array, targetShip){
        array.map(e => {
            e.ship.info.weapons[0].pointAt(createVector(targetShip.sprite.position.x,targetShip.sprite.position.y));
            e.shoot();
        });
    }


    //Function to Check enemy HP and Cleanup or Draw Health Bar if not removed
    static enemyShipsHPChecks(){
        for(let enemy of GameManager.enemyShipsArray){
            enemy.cleanup()
            enemy.healthbar();
        }
    }

    //Function to Clean Bullets if OUT OF BOUNDS (off canvas)
    static cleanBulletGroups(){
        GameManager.Groups.friendlybullets.map((bullet) => {
            if(bullet.position.y < 0 || bullet.position.x < 0 || bullet.position.x > GameManager.settings.globalSettings.canvasWidth){
                bullet.remove();
            }
        });

        GameManager.Groups.enemybullets.map((bullet) => {
            if(bullet.position.y < 0 || bullet.position.y > height || bullet.position.x < 0 || bullet.position.x > GameManager.settings.globalSettings.canvasWidth){
                bullet.remove();
            }
        });
    }

    //SHOP

    //Object to handle Shop Items
    static shopItems = new Object();
    
    //Function to Init the Shop Items
    static initShopItems(){
        //Standard Shot
        GameManager.shopItems.StdShot = {
            bought: true,
            cost: 0,
            description: "\nThe Standard Bullet!",
            img: stdShotShopImg
        },

        //L-Shot
        GameManager.shopItems.LShot = {
            bought: false,
            cost: 200,
            description: "\nShoots 90 degrees each ways,\naswell as up!",
            img: LShotShopImg
        }
    }

    static EnemyAndEventSpawner;
}