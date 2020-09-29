//STATUS - MEDIUM

class Sidebar{

    displayPoints(){
        fill('black');
        textSize(32);
        rectMode(CENTER);
        textAlign(CENTER);
        text("SCORE", settingsjson.globalSettings.canvasWidth + (settingsjson.globalSettings.sidebarWidth/2), 300);
        text(player.currentPoints, settingsjson.globalSettings.canvasWidth + (settingsjson.globalSettings.sidebarWidth/2), 350);

        text("$$MONEY$$", settingsjson.globalSettings.canvasWidth + (settingsjson.globalSettings.sidebarWidth/2), 400);
        text(player.currentMoney, settingsjson.globalSettings.canvasWidth + (settingsjson.globalSettings.sidebarWidth/2), 450);

        text("DEBUG:",settingsjson.globalSettings.canvasWidth + (settingsjson.globalSettings.sidebarWidth/2), 800 )
        text('sprites: ' + allSprites.length,settingsjson.globalSettings.canvasWidth + (settingsjson.globalSettings.sidebarWidth/2), 825 )
    }
}

class LoadingBar {
    static barWidth = 500;
    static barHeight = 50;
    static waitTime = 0;
    static currentWait = 1;
    static strokeWght = 5;
    static STARTED = false;
    static COMPLETE = false;
    static functionOnComplete = null;

    static startBar(wait, endfunc){
        if(!this.STARTED){
            console.log("LoadingBar -> Starting...")
            this.waitTime = wait;
            this.functionOnComplete = endfunc;
            this.resetBar()
            this.STARTED = true;
        }
        this.drawBar();
    }

    static resetBar(){
        console.log("LoadingBar -> Resetting Bar");
        this.currentWait = 1;
        this.STARTED = false;
        this.COMPLETE = false;
    }

    static drawBar() {
        if(this.STARTED && !this.COMPLETE){
            if(frameCount % this.waitTime == 0)
                this.currentWait = constrain(this.currentWait+1, 0 , 100);

            noFill();
            strokeWeight(this.strokeWght);
            rectMode(CENTER);
            rect(width/2, height/3 * 2,
              this.barWidth, this.barHeight
            )
            fill('white');
            noStroke();
            rectMode(CORNER);
            rect((width/2) - (this.barWidth/2) + (this.strokeWght/2),
              (height/3 * 2) - (this.barHeight/2 - (this.strokeWght/2 + 1)),
              (this.barWidth/100) * this.currentWait - (this.strokeWght),
              (this.barHeight - this.strokeWght - 2)
            )
            if(this.currentWait == 100){
                this.functionOnComplete();
                this.COMPLETE = true;
                console.log("LoadingBar -> COMPLETED LOAD");
            }
        }
    }
}


class Menu {
    constructor(img, ...buttons) {
        this.img = img;

        this.buttons = new Array(buttons.length);
        for (let i = 0; i < buttons.length; i++) {
            console.log("Buttons")
            this.buttons[i] = new Button(this.colour, this.buttons.length, buttons[i].name, i, 100, buttons[i].OnClick, this.img);
            this.buttons[i].makeButton();
        }
    }

    drawMenu() {
  //      console.log(this.buttons);
        for (let i = 0; i < this.buttons.length; i++) {
            //console.log("Drawing button")
            //this.buttons[i].sprite.addToGroup(drawLayer);
            this.buttons[i].DrawSprite();
            this.buttons[i].DrawText();
        }
    }

    addToAGroup(group){
        this.buttons.map(e => e.sprite.addToGroup(group));
    }

}

class Button {
    constructor(colour, max, name, y, size, onClick, img) {
        this.name = name;
        this.y = y;
        this.size = size;
        this.onClick = onClick
        this.sprite;
        this.max = max;
        this.colour = colour;
        this.img = img
    }

    makeButton() {
        rectMode(CENTER);
        this.sprite = createSprite(
            width / 2,
            (height - this.size) / this.max * (this.y + 1),
            this.size * 3,
            this.size * 1.5);
        this.sprite.onMouseReleased = this.onClick;
        this.sprite.addImage(this.img);
        this.sprite.scale = 1;
        this.sprite.debug = true;
        return this.sprite;
    }

    DrawText() {
        fill('black')
        textSize(32);
        textAlign(CENTER, CENTER);
        text(this.name, this.sprite.position.x, this.sprite.position.y);
    }

    DrawSprite() {
        drawSprite(this.sprite);
    }
}
