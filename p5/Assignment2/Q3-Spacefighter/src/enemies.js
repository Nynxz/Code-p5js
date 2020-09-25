class Enemy{
    constructor(img, size){
        this.img = img;
        this.size = size;
        this.health = (size*10) * 1.2;
        this.maxHealth = this.health;
        this.sprite = null;
        this.createEnemy(mouseX, mouseY);
    }

    createEnemy(x, y){
        this.sprite = createSprite(x, y);
        
        this.sprite.velocity.y = 1;
        this.sprite.life = 5000;
        
        //console.log(this.sprite);
        this.sprite.scale = this.size/100;
        
        this.sprite.debug = true;
        enemies.add(this.sprite)
        this.sprite.addImage(this.img);
        this.sprite.setCollider("circle",0,0,this.sprite.scale*10);
        this.sprite.draw();
        this.sprite.OBJ = this;
        this.sprite.maxSpeed = map(this.size, 1, 64, 25, 2, true);
        this.sprite.rotateToDirection = true;
        this.attractTo();
        console.log("Spawned: size:" + this.size);
    }

    healthbar(){
        let valx;
        valx = map(this.health, 0,  this.maxHealth, 0,  this.maxHealth/10);
        rectMode(CENTER);
        fill('red');
        rect(this.sprite.position.x, this.sprite.position.y-50, valx, this.maxHealth/50);
    }

    attractTo(){
        this.sprite.attractionPoint(this.size, player.sprite.position.x, player.sprite.position.y);
    }

    cleanup(){
        if(this.sprite.position.y > height+25){
            this.sprite.remove();
        }
    }

    shoot(){}

    spawnEnemy(){
        
    }
    
}