class Menu {
    constructor(group, colour, ...buttons) {
        this.group = group;
        this.colour = colour;
        this.buttons = new Array(buttons.length);
        for (let i = 0; i < buttons.length; i++) {
            this.buttons[i] = new Button(this.colour, this.buttons.length, buttons[i].name, i, 100, group, buttons[i].OnClick);
        }
    }

    DrawMenu() {
        clear();
        noCanvas();
        createCanvas(1500, 750);
        background(200);
        image(menubackground, width / 2, height / 2, width, height);
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].makeButton();
            this.buttons[i].sprite.addToGroup(drawLayer);
            this.buttons[i].DrawSprite();
            this.buttons[i].DrawText();
        }
    }

    ChangeColour(colour) {
        this.colour = colour;
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].colour = this.colour;
        }
    }
}

class Button {
    constructor(colour, max, name, y, size, group, onClick) {
        this.name = name;
        this.y = y;
        this.size = size;
        this.onClick = onClick
        this.sprite;
        this.group = group;
        this.max = max;
        this.colour = colour;
    }

    makeButton() {
        fill(this.colour);
        rectMode(CENTER);
        rect(width / 2,
            (height - this.size) / this.max * (this.y + 1),
            this.size * 3,
            this.size * 1.5);
        this.sprite = createSprite(
            width / 2,
            (height - this.size) / this.max * (this.y + 1),
            this.size * 3,
            this.size * 1.5);
        this.sprite.onMouseReleased = this.onClick;
        this.sprite.addImage(ButtonImage);
        this.sprite.scale = 1;
    }

    DrawText() {
        fill('black')
        textSize(32);
        textAlign(CENTER, CENTER);
        text(this.name, width / 2, (height - this.size) / this.max * (this.y + 1));
    }

    DrawSprite() {
        drawSprite(this.sprite);
    }
}