const { randomInt } = require('crypto');
const fs = require('fs');
const readline = require('readline');

const manhattan = (x1,x2) => {
  
  const {user_id:user_idX1 ,item_id: item_idX1, ratings: ratingsX1} = x1;
  const {user_id:user_idX2 ,item_id: item_idX2, ratings: ratingsX2} = x2;

  const intersection =  item_idX1?.filter(element => item_idX2?.includes(element));

  //verificar si la interseccion solo contiene un valor

  if (intersection) {
    const result = intersection.reduce((accumulator, currentValue) => {
      const idxX1 = item_idX1?.findIndex((elem) => elem === currentValue);
      const idxX2 = item_idX2?.findIndex((elem) => elem === currentValue);
      const valueRatingsX1 = ratingsX1[idxX1];
      const valueRatingsX2 = ratingsX2[idxX2];
  
      // console.log(valueRatingsX1);
      // console.log(valueRatingsX2);
      accumulator += Math.abs(valueRatingsX1 - valueRatingsX2);
      return accumulator
    },0)
    return result;
  }
  
  console.log("sin interseccion");

  return NaN;

}

const knn = (data,username,k,__callback__,inverse) => {

  const result = data.reduce((accumulator,currentValue) => {
    let distance = 0
    if (currentValue.user_id != username.user_id) {
      distance = __callback__(username,currentValue);
      accumulator.push([distance,currentValue.user_id]);
    }
    
    return accumulator
  }, [])

  inverse ? result.sort((a,b) => a[0] - b[0]) : result.sort((a,b) => b[0] - a[0])

  return result.slice(0, k);
}

const dataStruct = {};

const rl = readline.createInterface({
  input: fs.createReadStream('/home/judal/Documentos/CURSOS_2023_I/DataScience/resources/data-10mb/ratings.dat', 'utf8')
});

rl.on('line', (line) => {
  const columns = line.split('::');

  const user_id = parseInt(columns[0]);
  const item_id = parseInt(columns[1]);
  const ratings = parseInt(columns[2]);

  if (dataStruct[user_id]) {
    dataStruct[user_id].item_id.push(item_id);
    dataStruct[user_id].ratings.push(ratings);
  } else {
    dataStruct[user_id] = {
      user_id,
      item_id: [item_id],
      ratings: [ratings]
    };
  }
});

rl.on('close', () => {
  // console.log(Object.values(dataStruct));

  console.log("DATA SCIENCE");

  const data = [...Object.values(dataStruct)];
  console.log("data",data[0]);
  console.log("data",data[16]);

  const person = data.filter((element) => element.user_id == 1 || element.user_id == 18);

  console.log("La distancia manhattan es: ",manhattan(person[0],person[1]));

  const personTest = data.filter((element) => element.user_id == 50);
  const reNeighbors = knn(data,personTest[0],10,manhattan,true)

  console.log("Los vecinos mas cercanos de K: ",reNeighbors);

});