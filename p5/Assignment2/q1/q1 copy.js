const SPRITEPIXELSIZE = 32;
let currentLoadedMap = [];
let road;
let groundtxt;
let cHeight = 0, cWidth = 0;
function preload() {
  groundtxt = loadStrings('roadtest.txt', loadTrack);
  road = loadImage('Assets/Road/Road_Base.png');
  grass = loadImage('Assets/Road/Grass_Base.png')

}

function setup() {
  console.log('cheight' + cHeight);
  createCanvas(SPRITEPIXELSIZE*cWidth,SPRITEPIXELSIZE*cHeight);
}

function draw() {
  background(100,255,255);  
  drawSprites();
}

function loadTrack(track){
  currentLoadedMap = new Array();
  
  for(row in track) {
    cHeight+=1;
    console.log(track[row]);
    let tempWidth = 0;
    for(c in track[row]){
     switch(track[row][c]){
       case '1': 
       console.log('drawing road');
       currentLoadedMap.push({
         type: 'road',
         road : createSprite(
           (c * SPRITEPIXELSIZE) + (SPRITEPIXELSIZE/2),
           (row * SPRITEPIXELSIZE) + (SPRITEPIXELSIZE/2),
           SPRITEPIXELSIZE,SPRITEPIXELSIZE)});
        break;
      default:
        currentLoadedMap.push({
          type: 'grass',
          road : createSprite((c * SPRITEPIXELSIZE) + (SPRITEPIXELSIZE/2),
          (row * SPRITEPIXELSIZE) + (SPRITEPIXELSIZE/2),
          SPRITEPIXELSIZE,SPRITEPIXELSIZE)});
        console.log('drawing grass');
     }
     tempWidth++;
      }
      cWidth = tempWidth > cWidth ? tempWidth : cWidth;
      for(tile of currentLoadedMap) {
        switch(tile.type){
          case 'road':
            tile.road.addImage(road);
            break;
          default:
            tile.road.addImage(grass);
        }
        
        tile.road.scale = (SPRITEPIXELSIZE/32);
      }
    }
    console.log(currentLoadedMap);
    console.log(track);

  

}

function StartRace(){

}