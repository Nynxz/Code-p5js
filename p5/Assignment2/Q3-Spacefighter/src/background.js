//STATUS - GOOD

class Background{
    
    static stars = new Array();

    static makeBackground(amount){
        for(let i = 0; i < amount; i++){
            this.stars.push(new Star());
        }
    }

    static backgroundDraw(){
        background("#000000");
        this.stars.forEach(star => {
            star.draw();
        });
    }
}

class Star{
    constructor(){
        this.size;
        this.speed;
        this.pos = new p5.Vector();

        this.brightness = 0;
        this.blinkincr = 0;
        this.make();
    }

    make(){
        this.pos = {x: random(1, width), y: random(-500, 0)};
        this.size = random(1, 6)
        this.blinkincr = random(0, TWO_PI);
    }

    draw(){
        this.brightness = sin(this.blinkincr);
        fill(map(this.brightness, -1, 1, 0, 255));
        circle(this.pos.x, this.pos.y, this.size);
        this.move();
    }

    move(){
        this.blinkincr = this.blinkincr < TWO_PI ? this.blinkincr+=TWO_PI/255*this.size/2 : this.blinkincr = 0;
        this.pos.y += this.size/2;
        if(this.pos.y > height){
            this.make() //RESET
        }
    }
}