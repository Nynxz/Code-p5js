//STATUS - MEDIUM

//Class for the Sidebar
class Sidebar{


    //Function to Draw The Side Bar
    static drawSideBar(){

        //Draw Background Image
        image(sidebarimg,GameManager.settings.globalSettings.canvasWidth,0, GameManager.settings.globalSettings.sidebarWidth, GameManager.settings.globalSettings.canvasHeighteight+1000);
        
        //Display Points Text and Info
        Sidebar.displayPoints();
    }

    //Function to Display Points and Info
    static displayPoints(){

        //Set Font to Black
        fill('black');

        //Set Font size to 32
        textSize(32);

        //Align Elements
        rectMode(CENTER);
        textAlign(CENTER);

        //Score Header
        text("SCORE", GameManager.settings.globalSettings.canvasWidth + (GameManager.settings.globalSettings.sidebarWidth/2), 150);
        
        //Current Points
        text(GameManager.player.currentPoints, GameManager.settings.globalSettings.canvasWidth + (GameManager.settings.globalSettings.sidebarWidth/2), 200);

        //Money Header
        text("MONEY", GameManager.settings.globalSettings.canvasWidth + (GameManager.settings.globalSettings.sidebarWidth/2), 300);
        
        //Current Money
        text(GameManager.player.currentMoney, GameManager.settings.globalSettings.canvasWidth + (GameManager.settings.globalSettings.sidebarWidth/2), 350);

        //SHIP INFO
        
        //Current HP
        text('HP: ' + constrain(GameManager.player.ship.info.currentHealth, 0,GameManager.player.ship.info.currentHealth) + "/" +GameManager.player.ship.info.maxHealth ,GameManager.settings.globalSettings.canvasWidth + (GameManager.settings.globalSettings.sidebarWidth/2), 500);
        
        //Curent Shield
        text('SHIELD: ' + Math.floor(GameManager.player.ship.info.currentShield) + "/" + GameManager.player.ship.info.maxShield ,GameManager.settings.globalSettings.canvasWidth + (GameManager.settings.globalSettings.sidebarWidth/2), 550);

       
        //If Debug is Enabled
        if(GameManager.settings.debug){
            //Debug Header
            text("DEBUG:",GameManager.settings.globalSettings.canvasWidth + (GameManager.settings.globalSettings.sidebarWidth/2), 800 );
            //Sprite Count
            text('sprites: ' + allSprites.size(),GameManager.settings.globalSettings.canvasWidth + (GameManager.settings.globalSettings.sidebarWidth/2), 825 );
        }
    }
}

//Class for the Loading Screen
class LoadingScreen{

    //Constructor for Loading Screen
    constructor(barWidth, barHeight){
        
        //Propety for Bar Width
        this.barWidth = barWidth;
        
        //Propety for Bar Height
        this.barHeight = barHeight;

        //Propety for waitTime
        this.waitTime = 0;
        
        //Default Wait
        this.currentWait = 1;

        //Propety to hold stroke Weight
        this.strokeWght = 5;

        //Status Booleans
        this.STARTED = false;
        this.COMPLETE = false;

        //Property to Bind Function
        this.functionOnComplete = null;
    }

    //Function to Star the Loading Bar
    startBar(wait, endfunc){

        //If it's not started
        if(!this.STARTED){
            
            //Set WaitTime
            this.waitTime = wait;
            //Bind Function
            this.functionOnComplete = endfunc;
            //Reset the Bar Status
            this.resetBar();
            //Start the Bar
            this.STARTED = true;

            console.log("STARTING");
        }
        //Draw the Loading Bar
        loadScreen.drawBar();
        
    }

    //Function to Reset the Loading Bar
    resetBar(){
        
        //Set Current Wait
        this.currentWait = 1;

        //Set Status of the Bar
        this.STARTED = false;
        this.COMPLETE = false;

        console.log("Resetting Bar");
    }

    //Function to Draw the Loading Bar
    drawBar(){
        
        //If the Bar is Started
        if(this.STARTED){
            //If the Bar is Not Completed
            if(!this.COMPLETE){

                //Handling Time
                if(frameCount % this.waitTime == 0){
                    //Incrementing the Current %
                    this.currentWait = constrain(this.currentWait+1, 0 , 100);
                }

                //Drawing the Outline
                noFill();
                rectMode(CENTER);
                stroke('red');
                rect(width/2, height/3 * 2, 
                    this.barWidth, this.barHeight
                );

                //Drawing the Bar
                fill('white');
                noStroke();
                rectMode(CORNER);
                rect((width/2) - (this.barWidth/2) + (this.strokeWght/2),
                    (height/3 * 2) - (this.barHeight/2 - (this.strokeWght/2 + 1)), 
                    (this.barWidth/100) * this.currentWait - (this.strokeWght),
                    (this.barHeight - this.strokeWght - 2)
                );

                //If Completed
                if(this.currentWait == 100){
                    //Executed Binded Function
                    this.functionOnComplete();
                    //Set Status
                    this.COMPLETE = true;
                }
            }
        }
    }
}

//Class for a Menu
class Menu {
    //Constructor, takes in 'as many Butttons' as an array
    constructor(img, ...buttons) {
        //Property for Image Type
        this.img = img;

        //Array to Hold the Buttons for This Menu
        this.buttons = new Array(buttons.length);

        //For Each Button
        for (let i = 0; i < buttons.length; i++) {
            //Make A new Button
            this.buttons[i] = new Button(this.buttons.length, buttons[i].name, i, 100, buttons[i].OnClick, this.img);
        }
    }

    //Function to Draw the Menu
    drawMenu() {

        //For Each Button
        for (let i = 0; i < this.buttons.length; i++) {

            //Draw the Sprite
            this.buttons[i].DrawSprite();
            
            //Draw the Text
            this.buttons[i].DrawText();
        }
    }

    //Function to Add each Button to a Group
    addToAGroup(group){
        this.buttons.map(e => e.sprite.addToGroup(group));
    }

}


//Class for a Single Button
class Button {
    //Constructor for Button
    constructor(max, name, y, size, onClick, img) {
        //Propety for Label
        this.name = name;
        //Propety for Y position
        this.y = y;
        //Property for Size
        this.size = size;
        //Property to bind Funnction
        this.onClick = onClick
        //Property to hold Sprite Object
        this.sprite;
        //Property for Amount of Buttons in the 'group' of Buttons
        this.max = max;
        //Propety for Image
        this.img = img
        //Make the Button (populate this.sprite)
        this.makeButton();
    }

    //Function to make the Button Sprite
    makeButton() {
        //Align Sprite
        rectMode(CENTER);
        //Create Button Sprite At Position
        this.sprite = createSprite(
            width / 2,
            (height - this.size) / this.max * (this.y + 1),
            this.size * 3,
            this.size * 1.5);
        //Bind Sprite onMouseReleased to Function
        this.sprite.onMouseReleased = this.onClick;
        //Add Image to Sprite
        this.sprite.addImage(this.img);
        //Set Default Scale (backup)
        this.sprite.scale = 1;
        //Debug if Enabled
        this.sprite.debug = GameManager.settings.debug;
    }

    //Draw Button Label
    DrawText() {
        fill('black');
        textSize(32);
        textAlign(CENTER, CENTER);
        text(this.name, this.sprite.position.x, this.sprite.position.y);
    }

    //Draw Button Sprite
    DrawSprite() {
        drawSprite(this.sprite);
    }
} 

//Funnction to Create Main Menu
function createMAINMENU(){

    //Creating Instance of Menu
    mainmenu = new Menu(buttonmainimg,
        
        //Button 1[0] - Play
        {
        name: 'Play', OnClick: function () {
            //Reset Frame Count for Timers
            frameCount = 0;
        
            //CLEAR
            allSprites.clear();

            //INIT PLAYER
            GameManager.player = new Player(shipStarterShip());
            GameManager.player.placePlayer(width/2 - ( GameManager.settings.globalSettings.sidebarWidth/2), height/2);

            //INIT SPAWNER
            GameManager.EnemyAndEventSpawner = new Spawner(stdredenemy);
            
            //CHANGE STATE
            GameManager.currentState = GameManager.statesE.PLAYING;

            GameManager.video.hide();

            console.log("PLAY!");
            uiClicksound.play();
        }},
        //Button 2[1] - Leaderboard
        {
            name: 'Leaderboard', OnClick: function () {
                
                //CLEAR
                allSprites.clear();

                //Create Leaderboard Menu
                createLEADERBOARD();
                
                //CHANGE STATE
                GameManager.currentState = GameManager.statesE.LEADERBOARD;

                GameManager.video.hide();

                console.log("LEADERBOARD!");
                uiClicksound.play();
            }},
        //Button 3[2] - Options //TODO UNUSED
        {
        name: 'Options', OnClick: function () {
            console.log("OPTIONS!");
            uiClicksound.play();

        }});

    //MANUAL SETTING BUTTONS
    //Play Button
    mainmenu.buttons[0].sprite.position.y = 650;
    //Leaderboard Button
    mainmenu.buttons[1].sprite.position.y = 900;
    mainmenu.buttons[1].sprite.position.x = width-200;
    mainmenu.buttons[1].sprite.scale = .75;
    //Options Button
    mainmenu.buttons[2].sprite.x = width-400;
    mainmenu.buttons[2].sprite.scale = .75;
}


//Function to Create Pause Menu
function createPAUSEMENU() {
    
    //Creating Instance of Menu
    pausemenu = new Menu(buttonmainimg, 
        //Button 1[0] - Resume
        {
        name: 'Resume', OnClick: function () {
            //Unpause The Game
            unpauseGame();

            //CHANGE STATE
            GameManager.currentState = GameManager.statesE.PLAYING;
            
            //Remove Sprites
            GameManager.Groups.pauseMenu.removeSprites();

            console.log("RESUME!");
            uiClicksound.play();
        }},
        //Button 2[1] - Restart
        {
        name: 'Restart', OnClick: function () {
            
            //Remove Sprites
            GameManager.Groups.pauseMenu.removeSprites();
            GameManager.removeAllSprites();

            //Reset Difficulty
            GameManager.initDifficulty();

            //Reinit Shop
            GameManager.initShopItems();

            //Recreate and Replace Player
            GameManager.player = new Player(shipStarterShip());
            GameManager.player.placePlayer(width/2 - (GameManager.settings.globalSettings.sidebarWidth/2), height/2);
            
            //Clean Enemy Array
            GameManager.enemyShipsArray = new Array();
            
            //CHANGE STATE
            GameManager.currentState = GameManager.statesE.PLAYING;
           
            //Unpause Status
            GameManager.paused = false;

            console.log("RESTART!");
            uiClicksound.play();
        }},
        //Button 3[2] - Exit
        {
        name: 'Exit', OnClick: function () {
            uiClicksound.play();
            //RELOAD THE SCREEN
            location.reload();
            
        }}
    );

    //SHIFT ALL BUTTONS OVER
    pausemenu.buttons.map(spr => spr.sprite.position.x-=GameManager.settings.globalSettings.sidebarWidth/2);
    //ADD BUTTONS TO A GROUP
    pausemenu.addToAGroup(GameManager.Groups.pauseMenu);
}


//Function to Create Leader Board
function createLEADERBOARD(){

    //Create Base Sprite in Center
    let leaderboard = createSprite(width/2, height/2);
    //Add Image to Sprite
    leaderboardimg.resize(700, 700);
    leaderboard.addImage(leaderboardimg);    
    //Scale Sprite
    leaderboard.scale = 1.4;
    //Add Back Button
    let backButton = createSprite(width - 200, height - 80, 300, 100);

    //Bind Anonymous Function to onMousePressed
    backButton.onMouseReleased = () => {
        allSprites.clear();
        createMAINMENU();
        GameManager.currentState = GameManager.statesE.MAINMENU;
        uiClicksound.play();
        GameManager.video.show();
    };
    //Add Image to Back Button
    backButton.addImage(backbuttonimg);
}

//Function to Draw Leader Board 
function drawLEADERBOARDSCORES(){

    

    //Change Font Colour to Black
    fill('black');
    //Align Text
    textAlign(LEFT, CENTER);
    //Font Size
    textSize(32);
    GameManager.highscores.highscores = GameManager.highscores.highscores.sort((a, b) => b.score - a.score);
    //For Each Score in HighScore
    GameManager.highscores.highscores.forEach((e, i) => {
        //Format and Draw Text
        //If less than 20, draw the score, else if 20, draw ..., then nothing else.
        i < 20 ? text(
            "NAME: " + GameManager.highscores.highscores[i].name + " |  " + GameManager.highscores.highscores[i].score + "  | " + GameManager.highscores.highscores[i].date,
            width/2 - 325, 
            250 + (i * 35) ) : i == 20 ? text("......", width/2 - 325, 250 + (i * 35)) : 0;
    });
}

function createNameInput(){
    GameManager.nameinput = createInput('PlayerName');
    GameManager.nameinput.size(200, 30);
    GameManager.nameinput.position(width/2 - (GameManager.settings.globalSettings.sidebarWidth/2) - 100, height/2 + 132)
    
}


//Function to Draw Name Input Field at Game Over
function drawGameOver(){
    imageMode(CENTER);
    image(namefieldimg, width/2 - (GameManager.settings.globalSettings.sidebarWidth/2), height/2 + 100, 500, 200);
    image(gameoverimg, width/2 - (GameManager.settings.globalSettings.sidebarWidth/2), 200, 600,300);
}

function startMainVideo(){
    GameManager.video = createVideo('/p5/Assignment2/Q3-Spacefighter/Assets/spinngvideo.mp4');
    GameManager.video.position(0, 600);
    GameManager.video.size(600, AUTO);
    GameManager.video.volume(0);
    GameManager.video.loop();
}