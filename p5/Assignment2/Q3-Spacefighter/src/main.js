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
let currentState = states.LOADING;
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
    useQuadTree(true);
    bullets = new Group();
    enemybullets = new Group();
    enemies = new Group();
    pickups = new Group();
    events = new Group();

    console.log(weaponsjson);
    pauseGROUP = new Group();
    sidebarObj = new Sidebar();
    setupIMAGES();
    frameRate(settingsjson.globalSettings.FPS)
    createCanvas(settingsjson.globalSettings.canvasWidth + settingsjson.globalSettings.sidebarWidth, settingsjson.globalSettings.canvasHeight);
    background(125);
    createMAINMENU();

    //controls = new Controls();
    loadScreen = new LoadingScreen(500, 50);
    inDebug ? debugMenu() : 0;
    Background.makeBackground(400);
    
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
            Background.backgroundDraw();
            loadScreen.startBar(1 , () => {
                currentState = states.MAINMENU;
                loadScreen.resetBar();
                console.log("COMPLETED IN LAMBDA")
                clear();
            });
        break;

        case states.MAINMENU:
            Background.backgroundDraw();
            mainmenu.drawMenu();
            
        break;

        case states.PLAYING:
            Background.backgroundDraw();
            Controls.refresh()
            enemies.collide(player.ship.sprite) ? player.dealDamage(1) : 0;

            loadScreen.startBar(1, () => {
                console.log("DONE LOADING PLAYING")});

            if(loadScreen.COMPLETE){               
                drawSprites();
                if(frameCount % 60 == 0){
                    //console.log(player.ship.sprite);
                }
               
                
                
                if(!PausedBOOL){
                    enemies.map((enemy) => {enemy.velocity.y = 2});
                    //console.log(player.ship.sprite.touching.bottom);
                    bullets.overlap(enemies, (bullet,enemy) => {bullet.damage(bullet, enemy.self);});

                    player.ship.sprite.collide(enemybullets, (player, bullet) => {
                        bullet.damage(bullet, player.self);
                        let shieldhit = createSprite(player.position.x, player.position.y);
                        if(player.touching.top){
                            shieldhit.addAnimation("top", shieldhittop);
                        } else if(player.touching.bottom){
                            shieldhit.addAnimation("bottom", shieldhitbottom);
                        }
                        else if(player.touching.left){
                            shieldhit.addAnimation("left", shieldhitleft);
                        }
                        else if(player.touching.right){
                            shieldhit.addAnimation("right", shieldhitright);
                        }
                        player.shield.push(shieldhit);
                        shieldhit.scale = 3;
                        shieldhit.life = 50;
                        
                        console.log(player.touching)
                    })

                    events.overlap(player.ship.sprite, () => {
                    if(PausedBOOL){
                        PausedBOOL = !PausedBOOL;
                        pauseGROUP.removeSprites();
                    } else {
                        createPAUSEMENU();
                        PausedBOOL = true;
                    }});


                    player.ship.sprite.shield.map(e => e.position = player.ship.sprite.position)

                    pickups.overlap(player.ship.sprite, (pickup, player) => pickup.self.effect(player, 100))
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
                                //DEBUG
                    cleanEnemyArr();
                    
                    for(enemy of enemyArr){
                        //console.log(enemy);
                        enemy.cleanup()
                        enemy.healthbar();
                    }
                    if(player.ship.info.currentHealth > 0){
                        DEBUGspawner.spawnEnemy(2);
                        player.shoot(Controls.shoot1, Controls.shoot2);
                        player.healthbar();
                        enemyArrShootAll();
                    }
                    player.movePlayer(Controls.vector, 4 );
  
                    sidebar = image(sidebarimg,settingsjson.globalSettings.canvasWidth - 1,0, settingsjson.globalSettings.sidebarWidth, settingsjson.globalSettings.canvasHeighteight+1000)
                    //sidebar = rect(settingsjson.globalSettings.canvasWidth - 1, 0, settingsjson.globalSettings.sidebarWidth, settingsjson.globalSettings.canvasHeight);
                    sidebarObj.displayPoints();
                } else{
                    // for(enemy of enemies){
                    // enemy.friction = 1;
                    
                    // }
                    enemies.forEach((enemy) => {enemy.friction = 1});
                    Controls.zero();
                    pausemenu.drawMenu();
                }
                
                //checkCollisions();
                
            } else {
                loadScreen.drawBar();
            }
            fill('blue');
            rectMode(CORNER)




        break;
        case states.LEADERBOARD:

        break;
    }
}

function createAlienShip(){
    let debugEnemyWeapon1 = new WeaponPoint(
        createVector(0, -(PLAYERSPRITESIZE/8)), //Position Offset
        createVector(random(-4,2), 5), //Muzzle Direction
        weaponsjson.Type.Basic.StandardShot, //Bullet Type
        WeaponTypes.Straight
        );
    return new Ship(alientent, 250, createVector(1,1), [debugEnemyWeapon1]);
}
function createDebugShip(){
    let debugEnemyWeapon1 = new WeaponPoint(
        createVector(0, -(PLAYERSPRITESIZE/8)), //Position Offset
        createVector(random(-4,2), 5), //Muzzle Direction
        weaponsjson.Type.Basic.StandardShot, //Bullet Type
        WeaponTypes.spread360
        );
    return new Ship(stdredenemy, 250, createVector(1,1), [debugEnemyWeapon1]);
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


