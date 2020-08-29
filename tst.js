function setup() {
    let oldArr = [1,2,3,4,5,6,7,8,9,10];
    console.log(oldArr);
    let randArr = ShuffleArray(oldArr);
    console.log(randArr);
  }

  function ShuffleArray(array){
      let arr = array.slice();
      let retArr = [];
      for(i = 0; i < arr.length; i++){
          retArr.push(arr.splice(Math.floor(Math.random() * arr.length), 1));
      }
      return retArr;
  }