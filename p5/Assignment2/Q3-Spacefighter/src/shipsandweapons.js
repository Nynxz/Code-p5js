//STATUS - MEDIUM
//WEAPON AND SHIP SPAWNING LIBRARY
//PLAYER SHIPS
function shipStarterShip(){
    return new Ship(shipimg,
        200,
        createVector(2,2),
        [...weaponStaterWeaponLR()]);
        //[...weaponSPREADLR()]);
}

//PLAYER WEAPONS

    //CENTER


    //L / R COMBOS

    //Description : Standard 1 shot for both cannons
    function weaponStaterWeaponLR(){
        weaponStaterWeaponL = new WeaponPoint(
            createVector(-(PLAYERSPRITESIZE/2), -(PLAYERSPRITESIZE/8)), //Position Offset
            createVector(0, -10), //Muzzle Direction
            GameManager.weapons.Type.Basic.StandardShot, //Bullet Type
            WeaponTypes.Straight
            );
        weaponStaterWeaponR = new WeaponPoint(
            createVector(+(PLAYERSPRITESIZE/2), -(PLAYERSPRITESIZE/8)), //Position Offset
            createVector(0, -10), //Muzzle Direction
            GameManager.weapons.Type.Basic.StandardShot, //Bullet Type
            WeaponTypes.Straight
            );
        return [weaponStaterWeaponL, weaponStaterWeaponR];
    }

    //Description : L-Type shot... (straight and 90'degs)s
    function weaponSpreadLR(){
        weaponSpread_LL = new WeaponPoint(
            createVector(-(PLAYERSPRITESIZE/2), -(PLAYERSPRITESIZE)), //Position Offset
            createVector(0, -10), //Muzzle Direction
            GameManager.weapons.Type.Basic.StandardShot, //Bullet Type
            WeaponTypes.StraightL //Weapon Type
            );
        weaponSpread_LR = new WeaponPoint(
            createVector(+(PLAYERSPRITESIZE/2), -(PLAYERSPRITESIZE)), //Position Offset
            createVector(0, -10), //Muzzle Direction
            GameManager.weapons.Type.Basic.StandardShot, //Bullet Type
            WeaponTypes.StraightL //Weapon Type
            );
        return [weaponSpread_LL, weaponSpread_LR];
    }



//ENEMY SHIPS


//ENEMY WEAPONS
function createAlienShip(){
    let debugEnemyWeapon1 = new WeaponPoint(
        createVector(0, -(PLAYERSPRITESIZE/8)), //Position Offset
        createVector(-5, 5), //Muzzle Direction
        GameManager.weapons.Type.Basic.StandardShot, //Bullet Type
        WeaponTypes.Straight //Weapon Type
        );
    return new Ship(alientent, 250, createVector(1,1), [debugEnemyWeapon1]);
}
function createDebugShip(){
    let debugEnemyWeapon1 = new WeaponPoint(
        createVector(0, -(PLAYERSPRITESIZE/8)), //Position Offset
        createVector(random(-4,2), 5), //Muzzle Direction
        GameManager.weapons.Type.Basic.StandardShot, //Bullet Type
        WeaponTypes.spread360 //Weapon Type
        );
    return new Ship(stdredenemy, 250, createVector(1,1), [debugEnemyWeapon1]);
}



function createDebugEnemyN(){
    new Enemy(createDebugShip(), Math.floor(random(84, 256)), 2000, mouseX, mouseY);
}
function createDebugEnemyA(){
    new Enemy(createAlienShip(), Math.floor(random(84, 256)), 2000, mouseX, mouseY);
}