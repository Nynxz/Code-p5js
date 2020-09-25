function preloadIMAGES(inputJson){
    shipimg= loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/Ships/Player/Player_Blue_Off.png');
    stdredenemy = loadImage("/p5/Assignment2/Q3-Spacefighter/Assets/Ships/stdredenemy.png")
    buttonmainimg = loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/Menu/buttonbase.png');
    sidebarimg = loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/Menu/sidebarbluenew.png');
    console.log(Object.entries(inputJson));

    weaponsjson.Type.Basic.StandardShot.img = loadImage(weaponsjson.Type.Basic.StandardShot.img);
    weaponsjson.Type.Lazer.RedBeam.img = loadImage(weaponsjson.Type.Lazer.RedBeam.img);
    //standardshotimg = weaponsjson.Type.Basic.StandardShot.img
    //redbeamimg = weaponsjson.Type.Lazer.RedBeam.img
}


function setupIMAGES(){
    shipimg.resize(PLAYERSPRITESIZE,PLAYERSPRITESIZE);
    buttonmainimg.resize(400,200);
    sidebarimg.resize(500,1000);
}