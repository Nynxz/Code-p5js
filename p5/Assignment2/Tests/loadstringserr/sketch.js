let rawtext;

function preload(){
}

function errorre(){
    console.log("error")
}

function setup() {
    loadStrings('hmere.txt', function(raw){rawtext = raw;console.log('retur' + rawtext);}, errorre);

   
    createCanvas(500, 500);
    background(100);
    
}

function draw() {
}


/*
    createCanvas(500, 500);
    loadStrings('here.txt', function(yes){
        console.log(yes)
        background('red');
    },
    function(no){
        background('blue');
        console.log("error");
    })
    //console.log(here);
    
*/