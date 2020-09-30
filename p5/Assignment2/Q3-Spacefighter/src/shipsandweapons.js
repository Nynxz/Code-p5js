//STATUS - MEDIUM
//WEAPON AND SHIP SPAWNING LIBRARY
//PLAYER SHIPS
function shipStarterShip(){
    return new Ship(shipimg,
        200,
        createVector(2,2),
        [...weaponStaterWeaponLR()]);
}

//PLAYER WEAPONS

    //CENTER


    //L / R COMBOS
    function weaponStaterWeaponLR(){
        weaponStaterWeaponL = new WeaponPoint(
            createVector(-(PLAYERSPRITESIZE/2), -(PLAYERSPRITESIZE/8)), //Position Offset
            createVector(0, -10), //Muzzle Direction
            GameManager.weapons.Type.Basic.StandardShot //Bullet Type
            );
        weaponStaterWeaponR = new WeaponPoint(
            createVector(+(PLAYERSPRITESIZE/2), -(PLAYERSPRITESIZE/8)), //Position Offset
            createVector(0, -10), //Muzzle Direction
            GameManager.weapons.Type.Basic.StandardShot //Bullet Type
            );
        return [weaponStaterWeaponL, weaponStaterWeaponR];
    }



//ENEMY SHIPS


//ENEMY WEAPONS
function createAlienShip(){
    let debugEnemyWeapon1 = new WeaponPoint(
        createVector(0, -(PLAYERSPRITESIZE/8)), //Position Offset
        createVector(-5, 5), //Muzzle Direction
        GameManager.weapons.Type.Basic.StandardShot, //Bullet Type
        WeaponTypes.Straight
        );
    return new Ship(alientent, 250, createVector(1,1), [debugEnemyWeapon1]);
}
function createDebugShip(){
    let debugEnemyWeapon1 = new WeaponPoint(
        createVector(0, -(PLAYERSPRITESIZE/8)), //Position Offset
        createVector(random(-4,2), 5), //Muzzle Direction
        GameManager.weapons.Type.Basic.StandardShot, //Bullet Type
        WeaponTypes.spread360
        );
    return new Ship(stdredenemy, 250, createVector(1,1), [debugEnemyWeapon1]);
}