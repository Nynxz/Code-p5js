let bullets;
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

function setup(){
    bullets = new Group();
    enemies = new Group();
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

    
}

function mouseClicked(){
    console.log(allSprites);

    //DEBUG ENEMY SPAWN ON CLICK
    if(currentState == states.PLAYING){
        new Enemy(stdredenemy, Math.floor(random(64, 256)), 2000);
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
            background('red');
            mainmenu.drawMenu();
            
        break;

        case states.PLAYING:
            
            background(125);
            loadScreen.startBar(1, () => {
                console.log("DONE LOADING PLAYING")});
            if(loadScreen.COMPLETE){
                background(125);
                drawSprites();
                if(frameCount % 60 == 0){
                    console.log(allSprites.length);
                }

                bullets.collide(enemies, (bullet,enemy) => {console.log(enemy); bullet.damage(bullet, enemy.self);});
                //bullets.overlap(enemies, (bullet, enemy) => {dealDamage(bullet, enemy)})
                bullets.map((bullet, i) => {
                    if(bullet.position.y < 0 || bullet.position.x < 0 || bullet.position.y > settingsjson.globalSettings.canvasWidth){
                        bullet.remove();
                    }
                });
                //enemies.collide(bullets, dealDamage);
                
                
                if(!PausedBOOL){
                    controls.refresh();
                    
                    player.shoot(controls.shoot1, controls.shoot2);
                    for(enemy of enemies){
                        enemy.OBJ.cleanup();
                        enemy.OBJ.healthbar();
                        // if(enemy.position.y < player.sprite.position.y){
                        //     enemy.OBJ.attractTo(player.sprite.position.x, player.sprite.position.y);
                        // } else {
                        //     //enemy.OBJ.attractTo(width/2 - (settingsjson.globalSettings.sidebarWidth/2), height*2);
                        // }
                    }
                } else{
                    for(enemy of enemies){
                    enemy.friction = 1;
                    
                    }
                    controls.zero();
                    pausemenu.drawMenu();
                }
                
                //checkCollisions();
                player.movePlayer(controls.vector, 4 );
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

function createMAINMENU(){

    mainmenu = new Menu(buttonmainimg,
     {
        name: 'Play', OnClick: function () {
            allSprites.clear();
            //TODO
            createNewDebugPlayer();
            
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
               //allSprites.clear();
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
                //player = new Player(shipimg);
                player.placePlayer(width/2 - (settingsjson.globalSettings.sidebarWidth/2), height/2)
    
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


