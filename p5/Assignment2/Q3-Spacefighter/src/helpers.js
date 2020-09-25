function debugWarn(value){
    let capName;
    if(typeof value === 'undefined'){
        val = "(BAD)";
    } else {
        capName = value.constructor.name.toUpperCase()
        val = "(GOOD)";
    }
    //let val = typeof value !== undefined ? "(GOOD)" : "(BAD)";
    
    console.warn("LOGGING ", capName, val);
    console.log(value);
    console.warn("END LOGGING ", capName, val);
}


