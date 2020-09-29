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
            weaponsjson.Type.Basic.StandardShot //Bullet Type
            );
        weaponStaterWeaponR = new WeaponPoint(
            createVector(+(PLAYERSPRITESIZE/2), -(PLAYERSPRITESIZE/8)), //Position Offset
            createVector(0, -10), //Muzzle Direction
            weaponsjson.Type.Basic.StandardShot //Bullet Type
            );
        return [weaponStaterWeaponL, weaponStaterWeaponR];
    }



//ENEMY SHIPS


//ENEMY WEAPONS