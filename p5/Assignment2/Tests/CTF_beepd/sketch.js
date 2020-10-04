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
let button;
function setup() {  
    button = createButton('button');
}

function draw() {
    if(typeof(button) != 'undefined'){
        button.remove();
    }
}

