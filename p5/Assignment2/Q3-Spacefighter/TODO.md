# TODO

## Actual Things I Need to Do
 - Add animation for ship movement, sprites somewhat done
 - New Enemy Types
 - Enemy Shooting
 - Background
 - Main Menu
 - On Hover Buttons LEL
 - Propr Weapon Cooldowns (not frameCount bound)
 - HP BAR OUTLINE
 - HP BAR FADE TO RED ON HIT
 - ITEM DROPS GO DOWN
## Ideas
 - Bullet Damage On Hit - Fade Out
 - Side Zones which alert then become a hazard area for a time - sorta visuallyu done
 - Side Zone which periodically becomes a shop zone, while enemies pause spawning.
    - Change Weapons
    - Change Ships
    - Save?

1. Outline HP bar to give point of reference between full and current
2. Make the current health turn red when you take a hit and quickly fade back to green
3. Clamp the angle from straight down that enemies can potential fire to
4. Let power ups continue floating down-screen

//Function to check Spawns
    refresh(count, seconds){
        
        let secs = seconds*GameManager.settings.globalSettings.FPS

       

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
            if(frameCount % secs == 0){

                let rand = random(0,1);
                rand < 1 ? startShopEventDEBUG() : 0;
        }
    }
}