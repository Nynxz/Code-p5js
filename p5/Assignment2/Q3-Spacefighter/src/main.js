//STATUS - MEDIUM

//IMAGES
let shipimg, standardshotimg;

function preload(){
    GameManager.settings = loadJSON("src/json/settings.json");
    GameManager.weapons = loadJSON("src/json/weapons.json", preloadIMAGES);
}


let DEBUGspawner;
function setup(){
    //useQuadTree(true);
    GameManager.initGroups();
    GameManager.initDifficulty();
    GameManager.initShopItems()

    //MAKE STATIC POGU
    sidebarObj = new Sidebar();

    setupIMAGES();
    frameRate(GameManager.settings.globalSettings.FPS)
    createCanvas(GameManager.settings.globalSettings.canvasWidth + GameManager.settings.globalSettings.sidebarWidth, GameManager.settings.globalSettings.canvasHeight);
    createMAINMENU();

    //controls = new Controls();
    loadScreen = new LoadingScreen(500, 50);
    GameManager.settings.debug ? debugMenu() : 0;
    Background.makeBackground(400);
}


function mouseClicked(){
   // console.log(allSprites);
    console.log(GameManager);
    //DEBUG ENEMY SPAWN ON CLICK
    if(GameManager.currentState ==  GameManager.statesE.PLAYING){
        if(typeof pointerSet != 'undefined')
            pointerSet();
            
    }
}

function keyPressed(){
    if(keyCode == 27){
        console.dir(allSprites.length);
        if(GameManager.paused){
            unpauseGame();
        } else {
            GameManager.currentPauseState = GameManager.pauseStatesE.PAUSE;
            pauseGame();
        }
    }
}

function unpauseGame(){
    GameManager.paused = !GameManager.paused;
    GameManager.Groups.spaceEvents.removeSprites();
    GameManager.Groups.pickups.forEach((pickup) => {pickup.self.unpausePickup()});
    GameManager.Groups.enemySprites.forEach((enemy) => {enemy.self.unpauseEnemy()});
    GameManager.Groups.enemybullets.forEach((bullet) => {bullet.self.unpauseBullet()});
    GameManager.Groups.friendlybullets.forEach((bullet) => {bullet.self.unpauseBullet()});
    GameManager.Groups.pauseMenu.removeSprites();
    GameManager.Groups.ShopItems.removeSprites();
    GameManager.Groups.hoverToolTip.removeSprites();
}

function pauseGame(){
    GameManager.paused = true;
    GameManager.player.zero();
    GameManager.Groups.pickups.forEach((pickup) => {pickup.self.pausePickup()});
    GameManager.Groups.enemySprites.forEach((enemy) => {enemy.self.pauseEnemy()});
    GameManager.Groups.enemybullets.forEach((bullet) => {bullet.self.pauseBullet()});
    GameManager.Groups.friendlybullets.forEach((bullet) => {bullet.self.pauseBullet()});
    
    switch(GameManager.currentPauseState){
        case GameManager.pauseStatesE.PAUSE:
            createPAUSEMENU();
        break;

        case GameManager.currentPauseState.SHOP:

        break;
    }
    
}

function draw(){
    gameLogic();
}

function gameLogic(){
    switch(GameManager.currentState){

        case  GameManager.statesE.LOADING:

            Background.backgroundDraw();
            loadScreen.startBar(1 , () => {
                GameManager.currentState = GameManager.statesE.MAINMENU;
                loadScreen.resetBar();
                clear();
            });

        break;

        case GameManager.statesE.MAINMENU:

            Background.backgroundDraw();
            mainmenu.drawMenu();

        break;

        case GameManager.statesE.PLAYING:

            Background.backgroundDraw();
            Controls.refresh();
            
            loadScreen.startBar(1, () => {
                console.log("DONE LOADING PLAYING")
            });

            if(loadScreen.COMPLETE){
                drawSprites();

                if(!GameManager.paused){


                    
                    //#region CLEANUP 

                    GameManager.cleanBulletGroups();
                    GameManager.enemyShipsCleanArray();
                    //#endregion
                   
                    //#region PLAYER ALIVE
                    if(GameManager.player.ship.info.currentHealth > 0){

                        //#region COLLISIONS

                        //BULLETS > ENEMIES
                        GameManager.Groups.friendlybullets.collide(GameManager.Groups.enemySprites, (bullet,enemy) => {bullet.damage(bullet, enemy.self);});
                        
                        //ENEMIES > PLAYER
                        GameManager.Groups.enemySprites.collide(GameManager.player.ship.sprite) ? GameManager.player.dealDamage(1) : 0;
                        //PLAYER > BULLETS
                        GameManager.player.ship.sprite.collide(GameManager.Groups.enemybullets, (player, bullet) => {
                            bullet.damage(bullet, player.self);
                        });
                        //PLAYER > PICKUPS
                        GameManager.player.ship.sprite.overlap(GameManager.Groups.pickups, (player, pickup) => pickup.self.effect(player, 100));
                        //PLAYER > EVENTS
                        GameManager.player.ship.sprite.overlap(GameManager.Groups.spaceEvents, () =>{
                            
                            GameManager.currentPauseState = GameManager.pauseStatesE.SHOP;
                            pauseGame(GameManager.currentPauseState);
                            createShopPage()
                            createSHOPMENU();
                            console.log("IN SHOP");
                        })
                        //#endregion 

                        //SPAWN ENEMIES FROM SPAWNER
                        DEBUGspawner.spawnEnemy(GameManager.Difficulty.maxEnemies);

                        //ALLOW PLAYER TO SHOOT
                        GameManager.player.shoot(Controls.shoot1, Controls.shoot2);

                        //DRAW PLAYER HEALTHBAR
                        GameManager.player.healthbar();
                        GameManager.player.shieldbar();
                        GameManager.player.shieldRecharge(.05);
                        //REPOSITION SHIELD TO PLAYER
                        GameManager.player.ship.sprite.shield.map(e => e.position = GameManager.player.ship.sprite.position);

                        //ALLOW ENEMIES TO SHOOT
                        GameManager.enemyShipsShootAll(GameManager.enemyShipsArray, GameManager.player.ship);

                    } 
                    //#endregion

                    //MOVE PLAYER BASED ON CONTROLS VECTOR
                    GameManager.player.movePlayer(Controls.vector, 4 );

                   
                    
                } else{ 

                    //PAUSED
                    Controls.zero();
                    GameManager.player.movePlayer(Controls.vector, 0 );


                    switch(GameManager.currentPauseState){

                        case GameManager.pauseStatesE.PAUSE:
                            pausemenu.drawMenu();
                        break;

                        case GameManager.pauseStatesE.SHOP:
                            imageMode(CENTER);
                            image(shoppageimg, width/2 - GameManager.settings.globalSettings.sidebarWidth/2, height/2);
                            drawSprites(GameManager.Groups.ShopItems);
                            drawSprites(GameManager.Groups.hoverToolTip);
                            GameManager.Groups.hoverToolTip.forEach(e => e.self.drawInfo());
                            //shopmenu.drawMenu();
                        break;

                    }
                    
                }       
                //DRAW SIDEBAR
                imageMode(CORNER);
                Sidebar.drawSideBar();
            } else {
                loadScreen.drawBar();
            }
            // fill('blue');
            // rectMode(CORNER)
        break;


        case GameManager.statesE.LEADERBOARD:

        break;
    }
}


function createShopPage(){
    image(shoppageimg, width/2, height/2);
}


function createMAINMENU(){

    mainmenu = new Menu(buttonmainimg,
     {
        name: 'Play', OnClick: function () {
            console.log("PLAY!");
            //CLEAR
            allSprites.clear();
            //INIT PLAYER
            GameManager.player = new Player(shipStarterShip());
            GameManager.player.placePlayer(width/2 - ( GameManager.settings.globalSettings.sidebarWidth/2), height/2);

            //INIT SPAWNER
            DEBUGspawner = new enemySpawner(stdredenemy);
            
            //CHANGE STATE
            GameManager.currentState = GameManager.statesE.PLAYING;
            
        }},
     {
        name: 'Options', OnClick: function () {
            console.log("OPTIONS!");

            allSprites.clear();

            GameManager.player = new Player(shipimg);
            GameManager.player.placePlayer(width/2 - (GameManager.settings.globalSettings.sidebarWidth/2), height/2)

            GameManager.currentState = GameManager.statesE.PLAYING;
        }});
    //MANUAL SETTING PLAY BUTTON POSITION
    mainmenu.buttons[0].sprite.position.y = 650;
}

function createPAUSEMENU() {
    pausemenu = new Menu(buttonmainimg,
        {
            name: 'Resume', OnClick: function () {
                console.log("RESUME!");
                unpauseGame()
                GameManager.currentState = GameManager.statesE.PLAYING;
                GameManager.Groups.pauseMenu.removeSprites();
            }},
            {
            name: 'Restart', OnClick: function () {
                console.log("RESTART!");
                GameManager.Groups.pauseMenu.removeSprites();
                GameManager.removeAllSprites();

                GameManager.player = new Player(shipStarterShip());
                GameManager.player.placePlayer(width/2 - (GameManager.settings.globalSettings.sidebarWidth/2), height/2);
                GameManager.enemyShipsArray = new Array();
                GameManager.currentState = GameManager.statesE.PLAYING;
                GameManager.paused = false;
            }},
            {
             name: 'Exit', OnClick: function () {
                location.reload();
            }});
    pausemenu.buttons.map(spr => spr.sprite.position.x-=GameManager.settings.globalSettings.sidebarWidth/2);
    pausemenu.addToAGroup(GameManager.Groups.pauseMenu);
}

function createSHOPMENU(){
    Shop.drawStdWeaponItems();
}


