
class Racer{
    constructor(car){
        this.car = car;
        console.log(car);
    }
};
class Car{
    constructor(topSpeed, acceleration, turning, sprite){
        this.topSpeed = topSpeed;
        this.acceleration = acceleration;
        this.turning = turning;
        this.image = sprite;
        this.sprite;
        console.log('tes');
    }

    drawCar(){
        ClearDrawLayer();
        this.sprite = createSprite(width/2, height/2, 100, 100);
        this.sprite.addImage(this.image);
        console.log(this.sprite);
        this.sprite.scale = 1.5;
        this.sprite.debug = true;
        this.sprite.addToGroup(drawLayer);
        //drawSprites();
        drawLayer.draw();
        console.log('dlL: ', drawLayer);
        console.log(this.sprite, this.image ,'te');
    }
};