//STATUS - GOOD


//Class for handling the Controls
class Controls {

    //Input Enum
    static Inputs = {
            W : 87,
            S : 83,
            D : 68,
            A : 65,
            Space : 32,
            E : 69,
            LShift : 16,
            ESC : 27,
            ENTER: 13
        }


    //Vector for Movement
    static vector = new p5.Vector();

    //Shoot1 Boolean
    static shoot1 = 0;
    
    //Shoot2 Boolean
    static shoot2 = 0;
    
    static enter = 0;

    //Force Vector to 0
    static zero(){
        this.vector.x = 0;
        this.vector.y = 0;
    }

    //Function to refresh current inputs
    static refresh(){
        
        //Reset
        Controls.zero();

        //Set Vector Based on Inputs. X & Y = (-1 - 1)
        if(keyIsDown(Controls.Inputs.W)){
            this.vector.y = constrain(this.vector.y-=1, -1, 1); 
        } 
        if(keyIsDown(Controls.Inputs.S)){
            this.vector.y = constrain(this.vector.y+=1, -1, 1); 
        }
        if(keyIsDown(Controls.Inputs.D)){
            this.vector.x = constrain(this.vector.x+=1, -1, 1); 
        } 
        if(keyIsDown(Controls.Inputs.A)){
            this.vector.x = constrain(this.vector.x-=1, -1, 1); 
        }

        //Set Shoot Boolean Based on Inputs
        this.shoot1 = keyIsDown(Controls.Inputs.Space) ? 1 : 0;
        this.shoot2 = keyIsDown(Controls.Inputs.E) ? 1 : 0;

        this.enter = keyIsDown(Controls.Inputs.ENTER) ? 1 : 0;
    }
}