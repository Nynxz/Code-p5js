const SPRITEPIXELSIZE = 64;
let cHeight = 0, cWidth = 0;
let car;
const CarTypes = {Red: 'red', Blue: 'blue', Yellow: 'yellow'};
const TileTypes = {Grass: 'grass', Road: 'road', Finish: 'finishline', StartPos: 'startpos'};
let inmenu = true;
let InputJSON = {
  x: 0,
  y: 0,
  enter: 0,
  esc:0
};

let PlayerInfo = {
  CarType : CarTypes.Red,
  Track : 0
}

let CarInfo = {
  Red: {
    TopSpeed: 4,
    Acceleration: 3,
    Turning: 3,
  },
  Blue: {
    TopSpeed: 3,
    Acceleration: 4,
    Turning: 3,
  },
  Yellow: {
    TopSpeed: 3,
    Acceleration: 3,
    Turning: 4,
  }
}

//Groups

function preload() {
  groundtxt = loadStrings('roadtest.txt');
  LoadImages()
  InitGroups()
}

function setup() {
  //currentLoadedMap = loadTrack(groundtxt);
 // console.log(groundtxt);
  //console.log(currentLoadedMap);
  //StartRace(currentLoadedMap);
  createCanvas(640,320);
  Inputs();
  MainMenuSelect();
  //redcar.debug=true;
  //console.log(car);
}

function draw() {
  Inputs();
  if(inmenu){ 
    MainMenuSelect();
  }
  else{
    MoveCar(car, currentLoadedMap);
  }
 //e background(100,255,255);  
 drawSprites();
  
}

function loadTrack(track, scale){
  //Splitting
  track = track.map(e => e.split(''));
  
  for(arr in track){
    for(row in arr){
      cWidth = track[arr].length > cWidth ? track[arr].length : cWidth;
    }
  }
  //Mutating
  track = track.map((a, aindex) => a.map((e, eindex) => makeTile(eindex,aindex, e)));
  //Do the things
  function makeTile(row, col, type){
    let sprite = createSprite(
      ((row * (SPRITEPIXELSIZE)) + (SPRITEPIXELSIZE/2) - 200) ,
      ((col * SPRITEPIXELSIZE) - 100) ,
      SPRITEPIXELSIZE,SPRITEPIXELSIZE);
      switch(type){
        case "3":
          type = TileTypes.StartPos;
          sprite.addToGroup(GroupRoads);
          sprite.addImage(starting);
          break;
        case "2":
          type = TileTypes.Finish;
          sprite.addToGroup(GroupRoads);
          sprite.addImage(finish);
          break;
        case "1":
          type = TileTypes.Road;
          sprite.addToGroup(GroupRoads);
          sprite.addImage(road);
          break;
        case "0":
          type = TileTypes.Grass;
          sprite.addImage(grass);
          sprite.addToGroup(GroupHazard);
          break;
          default:
            type = 'missing';

      }
      sprite.scale = SPRITEPIXELSIZE/32
    return {type:type, sprite:sprite};
  }
  
  return track;
}
function StartRace(track){
  frameRate(60);
  for(let i = 0; i < track.length; i++){
    for(let j = 0; j < track[i].length;j++){
      if(track[i][j].type == TileTypes.StartPos){
        console.log(track[i][j].sprite.position.x);
        car = createSprite(
          track[i][j].sprite.position.x,
          track[i][j].sprite.position.y,
          SPRITEPIXELSIZE/2, SPRITEPIXELSIZE/2);
          console.log(car)
          if(PlayerInfo.CarType == CarTypes.Red){
            car.addImage(redcar);
          }
          if(PlayerInfo.CarType == CarTypes.Blue){
            car.addImage(bluecar);
          }
          if(PlayerInfo.CarType == CarTypes.Yellow){
            car.addImage(yellowcar);
          }
        car.scale = SPRITEPIXELSIZE/32*.75;
        car.debug = true;
        car.setCollider('circle', 0, 0, SPRITEPIXELSIZE/10)
        car.rotation -= 90;
      }
    }
  }
}

function MoveCar(car){
  if(typeof speed === "undefined"){
    speed = 0
  }
  
  if(GroupHazard.collide(car)){
    speed = 0;
    StartRace(currentLoadedMap);
    console.log("restart");
    
  }

  car.setSpeed(speed, car._rotation - 90);
 if(keyIsDown(87)){//W
   speed = constrain(speed+0.1,-1,3);
 }
 if(keyIsDown(83)){//S
  speed = constrain(speed-0.1,-1,3);
 }
 if(keyIsDown(65)){//A
   if(Math.abs(speed)>0.1)
   car.rotation-=1*speed;
}
if(keyIsDown(68)){//D
  if(Math.abs(speed)>0.1)
  car.rotation+=1*speed;
}
}


function LoadImages(){
  road = loadImage('Assets/Ground/Road_Base.png');
  grass = loadImage('Assets/Ground/Grass_Base.png')
  finish = loadImage('Assets/Ground/Finish_Base.png');
  starting = loadImage('Assets/Ground/Starting_Base.png');

  //Cars
  redcar = loadImage('Assets/Car/redcar.png');
  bluecar = loadImage('Assets/Car/bluecar.png');
  yellowcar = loadImage('Assets/Car/yellowcar.png'); 

  //Menu
  Menu_Start_Empty = loadImage('Assets/Menu/Start/Menu-Start-Blank.png');
  Menu_Start_Play = loadImage('Assets/Menu/Start/Menu-Start-Play.png');
  Menu_Start_Quit = loadImage('Assets/Menu/Start/Menu-Start-Quit.png');
  Menu_Car_Select = loadImage('Assets/Menu/Start/Menu-CarSelect.png');
  Menu_Map_Select = loadImage('Assets/Menu/Start/Menu-MapSelect.png')
}

function InitGroups(){
  GroupRoads = new Group();
  GroupHazard = new Group();
}

function InitGame(){

}

function MainMenuSelect(){
  frameRate(10);
  if(typeof option === "undefined"){
    option = 4
    option2nd = 0;
  }
  if(option != option+InputJSON.x && option <= 2){
    option = constrain(option+InputJSON.x,1,2);
  }

  //console.log(option);
  switch(option){

    case 1:
      image(Menu_Start_Quit,0,0);
      if(InputJSON.enter == 1){
        //QUIT
        //setup();
      }
      break;
    case 2:
      image(Menu_Start_Play,0,0);
      if(InputJSON.enter == 1){
        InputJSON.enter = 0;
        option = 3;
      }
      if(InputJSON.esc == 1){
        InputJSON.esc = 0;
        option = 2;
      }
      break;
    case 3:
      image(Menu_Car_Select,0,0);
      if(InputJSON.esc == 1){
        InputJSON.esc = 0;
        option = 2;
      }
      if(option2nd != option2nd+InputJSON.y && option2nd <= 2){
        
        option2nd = constrain(option2nd+InputJSON.y,0,2);
        InputJSON.y = 0;
      }
      if(InputJSON.enter == 1){
        InputJSON.enter = 0;
        option = 4;
      }
      //console.log(option2nd);
      switch(option2nd){
        case 0:
          PlayerInfo.CarType =CarTypes.Red;
          image(redcar,width/2-5,height/2-25);
          //console.log(PlayerInfo.CarType);
          break;
        case 1:
          PlayerInfo.CarType = CarTypes.Blue;
          image(bluecar,width/2-5,height/2-25);
          console.log(PlayerInfo.CarType);
          break;
        case 2:
          PlayerInfo.CarType = CarTypes.Yellow;
          image(yellowcar,width/2-5,height/2-25);
          console.log(PlayerInfo.CarType);
          break;
      }
      DisplayCarStats(PlayerInfo.CarType);
      break;
    case 4:
      if(InputJSON.esc == 1){
        InputJSON.esc = 0;
        option = 3;
      }
      image(Menu_Map_Select,0,0);
      //DisplayMaps();
      if(InputJSON.enter == 1){
        inmenu = false;
        InputJSON.enter = 0;
        clear();
        

        currentLoadedMap = loadTrack(groundtxt);
        createCanvas(16*SPRITEPIXELSIZE,9*SPRITEPIXELSIZE);

        StartRace(currentLoadedMap);;
        option = -1;
      }
      break;
      case -1:
        drawSprites();

      break;
    default:
      image(Menu_Start_Empty,0,0);
  }

  function DisplayCarStats(cartype){
    text("Top Speed", width*.33, height*.80);
    text("Acceleration", width*.47, height*.80);
    text("Turning", width*.62, height*.80);
    textSize(32)
    switch(cartype){
      case CarTypes.Red:
        text(CarInfo.Red.TopSpeed + "        " + CarInfo.Red.Acceleration + "        " + CarInfo.Red.Turning, width*.36, height*.89);
        break;
      case CarTypes.Blue:
        text(CarInfo.Blue.TopSpeed + "        " + CarInfo.Blue.Acceleration + "        " + CarInfo.Blue.Turning, width*.36, height*.89);
        break;
      case CarTypes.Yellow:
        text(CarInfo.Yellow.TopSpeed + "        " + CarInfo.Yellow.Acceleration + "        " + CarInfo.Yellow.Turning, width*.36, height*.89);
      break;
    }
  }

  function DisplayMaps(){
    //loadTrack(groundtxt, 3);
  }

  //console.log(InputJSON.x, InputJSON.y);
}



function Inputs(){
  InputJSON.x = 0;
  InputJSON.y = 0;
  InputJSON.enter = 0;
  InputJSON.esc = 0;
  if(keyIsDown(87)){// W
    InputJSON.x = 1;
  }
  if(keyIsDown(83)){// S
    InputJSON.x = -1;
  }
  if(keyIsDown(68)){// D
    InputJSON.y = 1;
  }
  if(keyIsDown(65)){// A
    InputJSON.y= -1;
  }
  if(keyIsDown(13) || keyIsDown(69)){// ENTER | E
    InputJSON.enter = 1;
  }
  if(keyIsDown(27)){//ESC
    InputJSON.esc = 1;
  }
} 