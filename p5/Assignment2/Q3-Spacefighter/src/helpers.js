//STATUS - GOOD

function debugWarn(value){
    let capName;
    if(typeof value === 'undefined'){
        val = "(BAD)";
    } else {
        capName = value.constructor.name.toUpperCase()
        val = "(GOOD)";
    }
    //let val = typeof value !== undefined ? "(GOOD)" : "(BAD)";
    
    console.warn("LOGGING ", capName, val);
    console.log(value);
    console.warn("END LOGGING ", capName, val);
}


//DEBUG MENU STUFF
let pointerSet;
let debugMenuDrawBOOL = 0, debugSpawnerDrawBOOL = 0, debugSpawnerSubDrawBOOL = 0, debugSpawnereventDrawBOOL = 0;
function debugMenu(){

    let debugToggle = createButton("Debug Menu");
    debugToggle.position(20,20);
    debugToggle.mousePressed(() => {
        if(debugMenuDrawBOOL){
            debugMenuDrawBOOL = 0;

            debugSpawnerDrawBOOL = 0;
            debugspawnenemyToggle.hide();
            debugoptionsToggle.hide();

            debugSpawnerSubDrawBOOL = 0;
            spawnDefaultRedEnemy.hide();
            spawnAlienRedEnemy.hide();
            debugspawneventToggle.hide();
            debugStartHazard.hide();
            debugStartShop.hide();
        } else {
            debugMenuDrawBOOL = 1;
            debugoptionsToggle.show();
        }
    });
    
        let debugoptionsToggle = createButton("Options Menu");
        debugoptionsToggle.position(140,20);
        debugoptionsToggle.hide()
        debugoptionsToggle.mousePressed(() => {
            if(debugSpawnerDrawBOOL){
                debugSpawnerDrawBOOL = 0;
                debugspawnenemyToggle.hide();

                debugSpawnerSubDrawBOOL = 0;
                spawnDefaultRedEnemy.hide();
                spawnAlienRedEnemy.hide();
                debugspawneventToggle.hide();
                debugStartHazard.hide();
                debugStartShop.hide();

            } else {
                debugSpawnerDrawBOOL = 1;
                debugspawnenemyToggle.show();
                debugSpawnereventDrawBOOL = 1;
                debugspawneventToggle.show();
            }
        });

            let debugspawnenemyToggle = createButton("Spawner");
            debugspawnenemyToggle.position(260,20);
            debugspawnenemyToggle.hide();
            debugspawnenemyToggle.mousePressed(() => {
                if(debugSpawnerSubDrawBOOL){
                    debugSpawnerSubDrawBOOL = 0;
                    spawnAlienRedEnemy.hide();
                    spawnDefaultRedEnemy.hide();

                    debugspawneventToggle.show();
                } else {
                    debugSpawnerSubDrawBOOL = 1;
                    spawnAlienRedEnemy.show();
                    spawnDefaultRedEnemy.show();

                    debugStartHazard.hide();
                    debugStartShop.hide();
                    debugspawneventToggle.hide();
                }
            });

                let spawnDefaultRedEnemy = createButton("Default Normal");
                spawnDefaultRedEnemy.position(380,20);
                spawnDefaultRedEnemy.hide();
                spawnDefaultRedEnemy.mousePressed(() => {
                    if(typeof pointerSet == 'undefined'){
                        pointerSet = createDebugEnemyN.bind();
                    } else {
                        pointerSet = undefined;
                    }
                });
                let spawnAlienRedEnemy = createButton("Default Alien");
                spawnAlienRedEnemy.position(380,50);
                spawnAlienRedEnemy.hide();
                spawnAlienRedEnemy.mousePressed(() => {
                    if(typeof pointerSet == 'undefined'){
                        pointerSet = createDebugEnemyA.bind();
                    } else {
                        pointerSet = undefined;
                    }
                });

            let debugspawneventToggle = createButton("Events");
            debugspawneventToggle.position(260,50);
            debugspawneventToggle.hide();
            debugspawneventToggle.mousePressed(() => {
                if(debugSpawnereventDrawBOOL){
                    debugSpawnereventDrawBOOL = 0;
                    debugspawnenemyToggle.hide();
                    debugStartHazard.show();
                    debugStartShop.show();
                } else {
                    debugSpawnereventDrawBOOL = 1;
                    debugspawnenemyToggle.show();
                    debugStartHazard.hide();
                    debugStartShop.hide();
                }
            });
                let debugStartHazard = createButton("Hazard");
                debugStartHazard.position(380,20);
                debugStartHazard.hide();
                debugStartHazard.mousePressed(() => {
                    if(typeof pointerSet == 'undefined'){
                        pointerSet = startHazardEventDEBUG.bind();
                    } else {
                        pointerSet = undefined;
                    }
                });
                let debugStartShop = createButton("Shop");
                debugStartShop.position(380,50);
                debugStartShop.hide();
                debugStartShop.mousePressed(() => {
                    if(typeof pointerSet == 'undefined'){
                        pointerSet = startShopEventDEBUG.bind();
                    } else {
                        pointerSet = undefined;
                    }
                });

        
    


    
    //debugoptionsToggle.hide();
    
}

function createDebugEnemyN(){
    new Enemy(createDebugShip(), Math.floor(random(84, 256)), 2000, mouseX, mouseY);
}
function createDebugEnemyA(){
    new Enemy(createAlienShip(), Math.floor(random(84, 256)), 2000, mouseX, mouseY);
}

function startHazardEventDEBUG(){
    new SpaceEvent(SpaceEvents.Hazard, 300, Math.floor(random(5,25)));
    console.log("Starting Hazard!");
}
function startShopEventDEBUG(){
    new SpaceEvent(SpaceEvents.Shop, 500, 5);
    console.log("Starting Shop!");
}