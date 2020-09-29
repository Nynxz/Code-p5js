//STATUS - MEDIUM
let inDebug = false;
let bullets, enemybullets, pickups;
let enemies;

//OBJECTS
let player, controls;
//IMAGES
let shipimg, standardshotimg;
//STATES
let states = {LOADING: -1, MAINMENU: 0, PLAYING: 1, LEADERBOARD: 2};
let currentState = states.MAINMENU;
let PausedBOOL = false;
let pauseGROUP;

let enemyArray = [];
function preload(){
    settingsjson = loadJSON("src/json/settings.json", (lines) => {
        //console.log(lines);
    });
    weaponsjson = loadJSON("src/json/weapons.json", preloadIMAGES);

}
let DEBUGspawner;
function setup(){
    bullets = new Group();
    enemybullets = new Group();
    enemies = new Group();
    pickups = new Group();
    
    console.log(weaponsjson);
    pauseGROUP = new Group();
    sidebarObj = new Sidebar();
    setupIMAGES();
    frameRate(settingsjson.globalSettings.FPS)
    createCanvas(settingsjson.globalSettings.canvasWidth + settingsjson.globalSettings.sidebarWidth, settingsjson.globalSettings.canvasHeight);
    background(125);
    createMAINMENU();

    controls = new Controls();
    loadScreen = new LoadingScreen(500, 50);
    inDebug ? debugMenu() : 0;
    backgroundMake();
    
}


function mouseClicked(){
   // console.log(allSprites);

    //DEBUG ENEMY SPAWN ON CLICK
    if(currentState == states.PLAYING){

        if(typeof pointerSet != 'undefined')
            pointerSet();

        // let warninganim = createSprite(mouseX, mouseY);
        // warninganim.scale = 3;
        // if(random(0,1) > .5){
        //     warninganim.addAnimation('warning', shopnotifcationanim);
        // } else {
        //     warninganim.addAnimation('warning', warningnotificationanim);
        // }
        // warninganim.life = 300;

        //DEBUGspawner.spawnEnemy(6);
        //player.dealDamage(20);
        //new Enemy(createDebugShip(), Math.floor(random(64, 256)), 2000, random(30, settingsjson.globalSettings.canvasWidth - 30), random(-500, -50));
    }
}

function keyPressed(){
    if(keyCode == 27){
        console.log(allSprites.length);
        if(PausedBOOL){
            PausedBOOL = !PausedBOOL;
            pauseGROUP.removeSprites();
        } else {
            createPAUSEMENU();
            PausedBOOL = true;
        }
    }
}
function draw(){
    gameLogic();
}

function gameLogic(){
    switch(currentState){
        case states.LOADING:
            background(125);
            loadScreen.startBar(1 , () => {
                currentState = states.MAINMENU;
                loadScreen.resetBar();
                console.log("COMPLETED IN LAMBDA")
                clear();
            });
        break;

        case states.MAINMENU:
            backgroundDraw();
            mainmenu.drawMenu();
            
        break;

        case states.PLAYING:
            backgroundDraw();
            controls.refresh()
            enemies.collide(player.ship.sprite) ? player.dealDamage(1) : 0;
            //background(125);
            loadScreen.startBar(1, () => {
                console.log("DONE LOADING PLAYING")});
            if(loadScreen.COMPLETE){
                //background(125);
                
                drawSprites();
                if(frameCount % 60 == 0){
                    //console.log(player.ship.sprite);
                }
                bullets.overlap(enemies, (bullet,enemy) => {bullet.damage(bullet, enemy.self);});
                enemybullets.overlap(player.ship.sprite, (bullet,player) => {bullet.damage(bullet, player.self); });
                pickups.overlap(player.ship.sprite, (pickup, player) => pickup.self.effect(player, 100))
                //bullets.collide(enemybullets, (bullet, enemybullet) => {bullet.life = 1; enemybullet.life = 0;});
                //bullets.overlap(enemies, (bullet, enemy) => {dealDamage(bullet, enemy)})
                bullets.map((bullet) => {
                    if(bullet.position.y < 0 || bullet.position.x < 0 || bullet.position.y > settingsjson.globalSettings.canvasWidth){
                        bullet.remove();
                    }
                });
                enemybullets.map((bullet) => {
                    if(bullet.position.y < 0 || bullet.position.x < 0 || bullet.position.y > settingsjson.globalSettings.canvasWidth){
                        bullet.remove();
                    }
                });
                //enemies.collide(bullets, dealDamage);
                
                
                if(!PausedBOOL){
                                //DEBUG
                    cleanEnemyArr();
                    
                    for(enemy of enemyArr){
                        //console.log(enemy);
                        enemy.cleanup()
                        enemy.healthbar();
                    }
                    if(player.ship.info.currentHealth > 0){
                        DEBUGspawner.spawnEnemy(2);
                        player.shoot(controls.shoot1, controls.shoot2);
                        player.healthbar();
                        enemyArrShootAll();
                    }
                    player.movePlayer(controls.vector, 4 );
                    // for(enemy of enemies){
                    //     enemy.OBJ.cleanup();
                    //     enemy.OBJ.healthbar();
                    //     // if(enemy.position.y < player.sprite.position.y){
                    //     //     enemy.OBJ.attractTo(player.sprite.position.x, player.sprite.position.y);
                    //     // } else {
                    //     //     //enemy.OBJ.attractTo(width/2 - (settingsjson.globalSettings.sidebarWidth/2), height*2);
                    //     // }
                    // }
                    // for(enemy of enemies){
                    // if(enemy.friction){
                    //     enemy.friction = 0;
                    // }
                    // }
                } else{
                    // for(enemy of enemies){
                    // enemy.friction = 1;
                    
                    // }
                    controls.zero();
                    pausemenu.drawMenu();
                }
                
                //checkCollisions();
                
            } else {
                loadScreen.drawBar();
            }
            fill('blue');
            rectMode(CORNER)
            sidebar = image(sidebarimg,settingsjson.globalSettings.canvasWidth - 1,0, settingsjson.globalSettings.sidebarWidth, settingsjson.globalSettings.canvasHeighteight+1000)
            //sidebar = rect(settingsjson.globalSettings.canvasWidth - 1, 0, settingsjson.globalSettings.sidebarWidth, settingsjson.globalSettings.canvasHeight);
            sidebarObj.displayPoints();



        break;
        case states.LEADERBOARD:

        break;
    }
}

function createAlienShip(){
    let debugEnemyWeapon1 = new WeaponPoint(
        createVector(0, -(PLAYERSPRITESIZE/8)), //Position Offset
        createVector(random(-4,2), 5), //Muzzle Direction
        weaponsjson.Type.Basic.StandardShot //Bullet Type
        );
    return new Ship(alientent, 1000, createVector(1,1), [debugEnemyWeapon1]);
}
function createDebugShip(){
    let debugEnemyWeapon1 = new WeaponPoint(
        createVector(0, -(PLAYERSPRITESIZE/8)), //Position Offset
        createVector(random(-4,2), 5), //Muzzle Direction
        weaponsjson.Type.Basic.StandardShot //Bullet Type
        );
    return new Ship(stdredenemy, 1000, createVector(1,1), [debugEnemyWeapon1]);
}

function createMAINMENU(){

    mainmenu = new Menu(buttonmainimg,
     {
        name: 'Play', OnClick: function () {
            allSprites.clear();
            //TODO
            //createNewDebugPlayer();
            player = new Player(shipStarterShip());
            
            DEBUGspawner = new enemySpawner(stdredenemy);
            
            player.placePlayer(width/2 - (settingsjson.globalSettings.sidebarWidth/2), height/2)
            currentState = states.PLAYING;
            console.log("PLAY!");
        }},
     {
        name: 'Options', OnClick: function () {
            allSprites.clear();
            player = new Player(shipimg);
            player.placePlayer(width/2 - (settingsjson.globalSettings.sidebarWidth/2), height/2)

            currentState = states.PLAYING;
            console.log("PLAY!");
        }});
    //MANUAL SETTING
    mainmenu.buttons[0].sprite.position.y = 650;
}

function createPAUSEMENU() {
    pausemenu = new Menu(buttonmainimg,
        {
           name: 'Resume', OnClick: function () {
               console.log("PRESSINGG");
                //menuBUFFERGROUP.clear();
               // menuBUFFERGROUP.removeSprites()
               
               PausedBOOL = false;
               //
               currentState = states.PLAYING;
               console.log("PLAY!");
               pauseGROUP.removeSprites();
               for(enemy of enemies){
                enemy.friction = 0;
                }
           }},
           {
            name: 'Restart', OnClick: function () {
                pauseGROUP.removeSprites();
                enemies.removeSprites();
                player.ship.sprite.remove();
                //player = new Player(shipimg);
                player = new Player(shipStarterShip());
                player.placePlayer(width/2 - (settingsjson.globalSettings.sidebarWidth/2), height/2)
                enemyArr = [];
                currentState = states.PLAYING;
                PausedBOOL = false;
                console.log("RESTART!");
            }},
            {
             name: 'Exit', OnClick: function () {
                location.reload();
             }});
    pausemenu.addToAGroup(pauseGROUP);
}


