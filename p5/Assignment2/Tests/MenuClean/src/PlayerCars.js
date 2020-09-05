let CarEnum = {
    Red: new Car(5,3,4, '/Assets/Car/redcar.png'),
    Blue: new Car(3,4,5, '/Assets/Car/bluecar.png')
};
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
        this.image = loadImage(sprite, console.log("Loaded: ", sprite));
        this.sprite; 
    }

    drawCar(){
        this.sprite = createSprite();
    }
};