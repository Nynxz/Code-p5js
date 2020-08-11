//let DATA = {'Comedy': 4, 'Action': 5, 'Romance': 6, 'Drama': 1, 'SciFi': 4};

function setup() {
    FavoriteMovies = new PieChart({'Comedy': 4, 'Action': 5, 'Romance': 6, 'Drama': 1, 'SciFi': 4});


    let legend = true;
    let label = true;
    let greyscale = false;

    createCanvas(500, 500);
    background(15);

    fill(200);
    textSize(20);
    text("Favorite Type of Movie", 280, 25);

    FavoriteMovies.drawPieChart(300, legend, label, greyscale);

    if(!greyscale){
        colourbutton = createButton('New Colours');
        colourbutton.position(15, 465);
        colourbutton.mousePressed(setup);
    }
}

class PieChart  {

    constructor(dataInput) {
        this.data = dataInput;
        this.length = Object.keys(dataInput).length;
        this.names = Object.keys(dataInput); 
        this.counts = Object.values(dataInput);  
        this.data360 = this.dataMap360();
        this.percent100 = this.dataPercents();
        console.log(this);
    }

    drawPieChart(size, drawLegend, drawLabels, greyscale) {
        let angle = 0;
        for(let i = 0; i < this.length; i++) 
        {
            if(!greyscale){
                fill(random(55,255),random(55,255),random(55,255));
            } else {
                fill(255/this.length * i + 50);
            }

            arc(height/2, width/2, size, size, angle, angle + radians(this.data360[i]));
            angle += radians(this.data360[i]);
            
            if(drawLegend){
                //Legend Draw
                square(0, 25 * (i), 25);
                textSize(15);
                text("[" + this.counts[i] + "]" + this.names[i] + " " + Math.round(this.data360[i] /360 * 100) + "%", 25 , (25 * (i + 0.75)));
            }
        }

        if(drawLabels) {
            fill(0);
            textSize(15);
            translate(width/2, height/2);
            for(let i = 0; i < this.length; i++) {   
                rotate(radians(this.data360[i]));
                text(this.names[i] + " " + Math.round(this.percent100[i]) + "%", 45, 0)
            }
        }
    }


    /* Utility Funtions */
    dataMap360() {
        let data360 = [];
        let total = 0;
    
        //Getting the total 'count'/participants
        for(let key in this.data) {
            total += this.data[key];
        }

        //eg total = 20 scifi = 4.. 4 * 360 / 20 = 72 degrees
        for(let key in this.data) {
           let value = this.data[key];
           data360.push([value * 360 / total]);
        }
        return data360;
    }

    dataPercents() {
        let percents = [];

        //eg scifi = 72 degrees.. 4 * 360 / 100 = 20%
        for(let i = 0; i < this.length; i++) {
            percents.push(this.data360[i] / 360 * 100); 
        }
        return percents;
    }
}