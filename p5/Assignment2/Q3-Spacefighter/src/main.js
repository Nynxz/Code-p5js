//STATUS - MEDIUM

function preload(){
    //LOAD JSONS
    GameManager.settings = loadJSON("src/json/settings.json");
    GameManager.weapons = loadJSON("src/json/weapons.json", preloadIMAGES);
    GameManager.highscores = loadJSON("src/json/highscores.json");

    //LOAD FONT
    GameManager.settings.font = loadFont('/p5/Assignment2/Q3-Spacefighter/Assets/Fonts/AlienWars-3V3M.ttf');
}

function setup(){
    //useQuadTree(true);

    //Initialise Groups
    GameManager.initGroups();

    //Initialise Difficult
    GameManager.initDifficulty();
    
    //Initialise Shop Items
    GameManager.initShopItems()
    
    //Set Text Font
    textFont(GameManager.settings.font);

    //TODO MAKE STATIC POGU
    sidebarObj = new Sidebar();

    //SETUP IMAGES
    setupIMAGES();

    //SET FRAME RATE
    frameRate(GameManager.settings.globalSettings.FPS);

    //CREATE CANVAS
    createCanvas(GameManager.settings.globalSettings.canvasWidth + GameManager.settings.globalSettings.sidebarWidth, GameManager.settings.globalSettings.canvasHeight);
    
    //CREATE MAINMENU (Menu)
    createMAINMENU();

    //New Loading Screen
    loadScreen = new LoadingScreen(500, 50);

    //Make Star Background
    Background.makeBackground(400);
    
    //TODO DONT INCLUDE? helpers.js
    GameManager.settings.debug ? debugMenu() : 0;
}


//TODO DONT INCLUDE
function mouseClicked(){
   // console.log(allSprites);
    console.log(GameManager);
    //saveJSON(JSON.stringify(GameManager), 'gamemanager.json');
    //DEBUG ENEMY SPAWN ON CLICK
    if(GameManager.currentState ==  GameManager.statesE.PLAYING){
        if(typeof pointerSet != 'undefined')
            pointerSet();
            
    }
}

//TODO MOVE TO CONTROLS
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

//PAUSE THE GAME
function pauseGame(){
    GameManager.paused = true;
    GameManager.player.zero();
    GameManager.Groups.spaceEventsShop.forEach((shop) => {shop.oldlife = shop.life ; shop.life = -1})
    GameManager.Groups.spaceEventsHazards.forEach((haz) => {haz.oldlife = haz.life ; haz.life = -1})
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

//UNPAUSE THE GAME
function unpauseGame(){
    GameManager.paused = !GameManager.paused;
    GameManager.Groups.spaceEventsShop.removeSprites();
    GameManager.Groups.spaceEventsShop.forEach((shop) => {shop.life = shop.oldlife})
    GameManager.Groups.spaceEventsHazards.forEach((haz) => {haz.life = haz.oldlife})
    GameManager.Groups.pickups.forEach((pickup) => {pickup.self.unpausePickup()});
    GameManager.Groups.enemySprites.forEach((enemy) => {enemy.self.unpauseEnemy()});
    GameManager.Groups.enemybullets.forEach((bullet) => {bullet.self.unpauseBullet()});
    GameManager.Groups.friendlybullets.forEach((bullet) => {bullet.self.unpauseBullet()});
    GameManager.Groups.pauseMenu.removeSprites();
    GameManager.Groups.ShopItems.removeSprites();
    GameManager.Groups.hoverToolTip.removeSprites();
}


//Draw Loop
function draw(){
    gameLogic();
}


//Function to Handle Game Logic
function gameLogic(){

    //Switch for Current State
    switch(GameManager.currentState){

        //If Currently in Loading
        case  GameManager.statesE.LOADING:

            //Draw Star Background
            Background.backgroundDraw();

            //Start LoadScreen Bar
            loadScreen.startBar(1 , () => {
                //Change State
                GameManager.currentState = GameManager.statesE.MAINMENU;
                //Reset Bar for later use
                loadScreen.resetBar();
                //Clear screen
                clear();
            });
        break;

        //If Currently in Main Menu
        case GameManager.statesE.MAINMENU:

            //Draw Star Background
            Background.backgroundDraw();
            //Draw Main Menu
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
                    GameManager.enemyShipsRefresh();
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
                        GameManager.player.ship.sprite.overlap(GameManager.Groups.spaceEventsShop, () =>{
                            
                            GameManager.currentPauseState = GameManager.pauseStatesE.SHOP;
                            pauseGame(GameManager.currentPauseState);
                            createShopPage()
                            createSHOPMENU();
                            console.log("IN SHOP");
                        })
                        GameManager.player.ship.sprite.overlap(GameManager.Groups.spaceEventsHazards)  ? GameManager.player.dealDamage(1) : 0;
                        
                        //#endregion 

                        //SPAWN ENEMIES FROM SPAWNER
                        GameManager.EnemyAndEventSpawner.refresh(GameManager.Difficulty.maxEnemies);

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
            Background.backgroundDraw();
            //createLEADERBOARD();
            drawSprites();
            drawLEADERBOARDSCORES();

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
            frameCount = 0;
            console.log("PLAY!");
            //CLEAR
            allSprites.clear();
            //INIT PLAYER
            GameManager.player = new Player(shipStarterShip());
            GameManager.player.placePlayer(width/2 - ( GameManager.settings.globalSettings.sidebarWidth/2), height/2);

            //INIT SPAWNER
            GameManager.EnemyAndEventSpawner = new Spawner(stdredenemy);
            
            //CHANGE STATE
            GameManager.currentState = GameManager.statesE.PLAYING;
            
        }},
        {
            name: 'Leaderboard', OnClick: function () {
                console.log("LEADERBOARD!");
                // //CLEAR
                allSprites.clear();
                createLEADERBOARD();
                
                // //INIT PLAYER
                // GameManager.player = new Player(shipStarterShip());
                // GameManager.player.placePlayer(width/2 - ( GameManager.settings.globalSettings.sidebarWidth/2), height/2);
    
                // //INIT SPAWNER
                // DEBUGspawner = new enemySpawner(stdredenemy);
                
                // //CHANGE STATE
                GameManager.currentState = GameManager.statesE.LEADERBOARD;
                
            }},
     {
        name: 'Options', OnClick: function () {
            console.log("OPTIONS!");

            // allSprites.clear();

            // GameManager.player = new Player(shipimg);
            // GameManager.player.placePlayer(width/2 - (GameManager.settings.globalSettings.sidebarWidth/2), height/2)

            // GameManager.currentState = GameManager.statesE.PLAYING;
        }});
    //MANUAL SETTING BUTTON POSITION
    mainmenu.buttons[0].sprite.position.y = 650;
    mainmenu.buttons[1].sprite.position.y = 900;
    mainmenu.buttons[1].sprite.position.x = 1200;
    mainmenu.buttons[1].sprite.scale = .75;
    mainmenu.buttons[2].sprite.scale = .75;
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
                GameManager.initShopItems()
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

function createLEADERBOARD(){
    let leaderboard = createSprite(width/2, height/2);
    leaderboard.addImage(leaderboardimg);    
    leaderboard.scale = 1.4;
    let backButton = createSprite(width - 200, height - 80, 300, 100);
                backButton.onMousePressed = () => {
                    allSprites.clear();
                    createMAINMENU();
                    GameManager.currentState = GameManager.statesE.MAINMENU;
                };
    backButton.addImage(backbuttonimg);
}

function drawLEADERBOARDSCORES(){

    //console.log(GameManager.highscores.highscores);
    fill('black');
   textAlign(LEFT, CENTER)
    textSize(32);
    GameManager.highscores.highscores.forEach((e, i) => {
        text("NAME: " + GameManager.highscores.highscores[i].name + " |  " + GameManager.highscores.highscores[i].score + "  | " + GameManager.highscores.highscores[i].date, width/2 - 345, 250 + (i * 30)) ;
    })
    

    // GameManager.highscores.highscores.map((e, i) => {
    //     let keys = Object.keys(e);
    //     let vals = Object.values(e);
    //     fill('black');
    //     keys.map((ee, ii) => text("Name :" + keys[ii] + " | Score : "  + vals[ii], width/2, 500 + (i * 30) ))
    //     console.log(keys + " " + vals)

    // })
    // let names = Object.keys(GameManager.highscores.highscores);
    // let scores = Object.values(GameManager.highscores.highscores);
    // names.map((e, i) => text("Name :" + names[i] + " | Score : "  + scores[i], width/2, 500 + (i * 30) ));
}

function createSHOPMENU(){
    Shop.drawStdWeaponItems();
}


