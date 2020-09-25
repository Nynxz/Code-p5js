class Ship{
    constructor(img, health, arrWeaponPoints){
        this.img = img;
        this.info.maxHealth = health;
        this.info.currentHealth = health;
        this.info.weapons = new Array();
        for(weaponPoint in arrWeaponPoints){
            this.info.push(weaponPoint);
        }
    }
}