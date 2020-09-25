class Ship{
    constructor(img, health, vecAcceleration, arrWeaponPoints){
        this.img = img;
        this.info = new Object();
        this.info.vecAcceleration = vecAcceleration;this.info.vecAcceleration = vecAcceleration;
        this.info.maxHealth = health;
        this.info.currentHealth = health;
        this.info.weapons = new Array();//new Array();
        console.log(...arrWeaponPoints);
        this.info.weapons.push(...arrWeaponPoints);

        this.currentBullets = new Array();
        
        // for(let weaponPoint in arrWeaponPoints){
        //     console.log(weaponPoint);
        //     this.info.weapons.push({weaponPoint});
        // }
    }
}