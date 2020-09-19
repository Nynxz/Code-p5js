let s1 = ['a', 'd', 'g', 'j', 'm', 'p', 't', 'w'];
let s2 = ['b', 'e', 'h', 'k', 'n', 'q', 'u', 'x'];
let s3 = ['c', 'f', 'i', 'l', 'o', 'r', 'v', 'y'];
let s4 = ['s', 'z'];

let combo = ['T', 3, 3, 2, 2, 1];

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

