//STATUS - MEDIUM

function preloadIMAGES(inputJson){
    shipimg= loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/Ships/Player/Player_Blue_Off.png');
    stdredenemy = loadImage("/p5/Assignment2/Q3-Spacefighter/Assets/Ships/stdredenemy.png")
    alientent = loadImage("/p5/Assignment2/Q3-Spacefighter/Assets/Ships/aliententacle.png");
    buttonmainimg = loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/Menu/buttonbase.png');
    sidebarimg = loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/Menu/sidebarbluenew.png');
    redhittedimg = loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/screen-red-vignette.png')
 
    healthPickupimg = loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/pickups/healthpickup.png');
    moneyPickupimg = loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/pickups/moneypickup.png');

    shoppageimg = loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/Menu/shoppage.png');
    shopbuttonimg = loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/Menu/shopbutton.png');
    tooltipimg = loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/ShopItems/tooltipimg.png');


    stdShotShopImg = loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/ShopItems/stdShot.png');
    LShotShopImg = loadImage('/p5/Assignment2/Q3-Spacefighter/Assets/ShopItems/LShot.png');

    //console.log(Object.entries(inputJson));

    GameManager.weapons.Type.Basic.StandardShot.img = loadImage( GameManager.weapons.Type.Basic.StandardShot.img);
    GameManager.weapons.Type.Lazer.RedBeam.img = loadImage( GameManager.weapons.Type.Lazer.RedBeam.img);
    
    //standardshotimg = weaponsjson.Type.Basic.StandardShot.img
    //redbeamimg = weaponsjson.Type.Lazer.RedBeam.img

    //ANIMATIONS

    //EXPLOSIONS 
    basicgreenexplosion = loadAnimation('/p5/Assignment2/Q3-Spacefighter/Assets/Animations/Explosions/BasicGreenish/basicgreenexplosion_1.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/Explosions/BasicGreenish/basicgreenexplosion_2.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/Explosions/BasicGreenish/basicgreenexplosion_3.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/Explosions/BasicGreenish/basicgreenexplosion_4.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/Explosions/BasicGreenish/basicgreenexplosion_5.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/Explosions/BasicGreenish/basicgreenexplosion_6.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/Explosions/BasicGreenish/basicgreenexplosion_7.png',)
    warningnotificationanim = loadAnimation('/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning01.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning02.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning03.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning04.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning05.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning06.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning07.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning08.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning09.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning10.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning11.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning12.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning13.png','/p5/Assignment2/Q3-Spacefighter/Assets/Animations/WarningAnim/Warning14.png');
    shopnotifcationanim = loadAnimation('/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim01.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim02.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim03.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim04.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim05.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim06.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim07.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim08.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim09.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim10.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim11.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim12.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim13.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/ShopAnim/moneyanim14.png', )
    
    hitmarkeranim = loadAnimation('/p5/Assignment2/Q3-Spacefighter/Assets/Animations/Explosions/hitmarker/hitmarker01.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/Explosions/hitmarker/hitmarker02.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/Explosions/hitmarker/hitmarker03.png', '/p5/Assignment2/Q3-Spacefighter/Assets/Animations/Explosions/hitmarker/hitmarker04.png')
    hitmarkeranim.looping = false;


    //SHIELD HIT
    shieldhittop = loadAnimation('/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/tophit01.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/tophit02.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/tophit03.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/tophit04.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/tophit05.png');
    shieldhitbottom = loadAnimation('/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/bottomhit01.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/bottomhit02.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/bottomhit03.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/bottomhit04.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/bottomhit05.png')
    shieldhitleft = loadAnimation('/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/lefthit01.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/lefthit02.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/lefthit03.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/lefthit04.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/lefthit05.png')
    shieldhitright = loadAnimation('/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/righthit01.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/righthit02.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/righthit03.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/righthit04.png','/p5/Assignment2/Q3-Spacefighter/Assets/ShieldHit/righthit05.png')


    //basicgreenexplosion.looping = false;
}


function setupIMAGES(){
    shipimg.resize(PLAYERSPRITESIZE,PLAYERSPRITESIZE);
    buttonmainimg.resize(400,200);
    sidebarimg.resize(500,1000);
    tooltipimg.resize(200,100);
}