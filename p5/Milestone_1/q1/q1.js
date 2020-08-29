// function setup() {
//   let arrayCLEAN = [1,2,3,4,5];       //ARRAY U WANT TO RANDOMISE
//   let arrayCHANGE = arrayCLEAN.slice();  //DUPLICATE OF ARRAY U WANT TO RANDOMISE SO YOU DONT BREAK STUFF
//   let arrayNEW = new Array();                    //NEW ARRAY 
 
//   for(i = 0; i < arrayCLEAN.length; i++){     //ITERATING THROUGH YOUR ARRAY
//     let randomIndex = Math.floor(Math.random() * arrayCHANGE.length);     //GETTING A RANDOM INDEX FROM THE ARRAY                               
//     arrayNEW.push(arrayCHANGE.splice(randomIndex, 1));                    //PUSHING THE RANDOMLY RETRIEVED INDEX, DELETING IT FROM CHANGE AND ADDING IT TO NEW
//   }
//   console.log(arrayNEW);
// }


// function setup() {
//   const baseArr = [ [ 1, 2 ], [ 3, 4, 5 ], [ 6, 7 ], [ 8 ], [ 9 ] ]
//   const desiredArr = [].concat.apply([], baseArr)
//   console.log(baseArr);
//   console.log(desiredArr);
// }

function setup() {
  let oldArr = [1,2,3,4,5,6,7,8,9,10];
  console.log(oldArr);
  let randArr = ShuffleArray(oldArr);
  console.log(randArr);
}

function ShuffleArray(array){
  let arr = array.slice();
  let retArr = new Array();
  for(i = 0; i < array.length; i++){
      retArr.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
  }
  return retArr;
}
