function DisplayCarSelectMenu(){
    console.log('Car Select');
    ClearDrawLayer();
}

function StartRace(){
    ClearDrawLayer();
    console.log(new Car(4,4,4,'Assets/Car/redcar.png'));
}