//STATUS - GOOD

//Class for handling the background (of Stars)
class Background{
    
    //Array to hold the Stars
    static stars = new Array();

    //Generate Stars into an array
    static makeBackground(amount){
        for(let i = 0; i < amount; i++){
            this.stars.push(new Star());
        }
    }

    //Draw Black Background and each Star in the Array 
    static backgroundDraw(){
        background("#000000");
        this.stars.forEach(star => {
            star.draw();
        });
    }
}


//Class for Stars
class Star{
    constructor(){

        //Size of the Star
        this.size;
        //Speed of the Star
        this.speed;
        //Position of the Star
        this.pos = new p5.Vector();
        //Brightness(-1 - 1)
        this.brightness = 0;
        //Increment (0 - TWO_PI)
        this.blinkincr = 0;

        //Populate the properties of this Star
        this.make();
    }

    //Function to make the Star
    make(){

        //Position above the visible screen
        this.pos = {x: random(1, width), y: random(-500, 0)};
        //Random Size
        this.size = random(1, 6);
        //Random Blink "Stage"
        this.blinkincr = random(0, TWO_PI);
    }

    //Function to draw the Star
    draw(){

        //Brightness (-1 - 1) from (0 - TWO_PI)
        this.brightness = sin(this.blinkincr);
        //Fill the Star (black - white) "Smoothly"
        fill(map(this.brightness, -1, 1, 0, 255));
        //Draw the Star on the canvas
        circle(this.pos.x, this.pos.y, this.size);
        //Move the Star
        this.move();
    }

    //Function to move the Star
    move(){
        
        //Increment blinkincr if less than TWO_PI. else set to 0
        this.blinkincr = this.blinkincr < TWO_PI ? this.blinkincr+=TWO_PI/255*this.size/2 : this.blinkincr = 0;

        //Move Star based on size of the star
        this.pos.y += this.size/2;
        //If the Star is below the canvas, remake it
        if(this.pos.y > height){
            this.make(); //RESET STAR
        }
    }
}