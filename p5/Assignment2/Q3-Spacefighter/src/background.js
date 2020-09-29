let stars = new Array();

function backgroundMake(){
    for(let i = 0; i < 400; i++){
        console.log("YES");
        stars.push(new Star());
    }
    rectMode(CENTER);
}
function backgroundDraw(){


    background("#000000");
    //console.log("YES");

    stars.forEach(e => {
        e.drawStar();
        //e.moveStar();
    });
}

class Star{
    constructor(){
        this.size;
        this.speed;
        this.pos = new Object();
        this.pos.x;
        this.pos.y;
        this.makeStar();
        this.brightness = 0;
        this.blinkincr = 0;
    }

    makeStar(){
        this.pos.x = random(1, width);
        this.pos.y = random(-500, 0);
        this.size = random(1, 6)
        this.blinkincr = random(0, TWO_PI);
    }

    drawStar(){
        this.brightness = sin(this.blinkincr);
        fill(map(this.brightness, -1, 1, 0, 255));
        circle(this.pos.x, this.pos.y, this.size);
        this.moveStar();
    }

    moveStar(){
        this.blinkincr = this.blinkincr < TWO_PI ? this.blinkincr+=TWO_PI/255*this.size : this.blinkincr = 0;
        this.pos.y += this.size/2;
        if(this.pos.y > height){
            //console.log("DELETING");
            this.makeStar()
        }
    }
}