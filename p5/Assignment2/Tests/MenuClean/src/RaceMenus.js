function DisplayCarSelectMenu(){
    console.log('Car Select');
    ClearDrawLayer();
}

function StartRace(){
    
    let car = new Car(4,4,4, redCarpng);
    car.drawCar();
}