const { Console } = require("console");
const fs = require("fs");
const readline = require("readline");

const dataStruct = {};

//* Manhattan Distance */
const Manhattan = (x1, x2) => {

  const result = x1.reduce((accumulator, currentValue, currentIndex) => {
    
    if (!isNaN(currentValue) && !isNaN(x2[currentIndex])) {
      accumulator += Math.abs(currentValue - x2[currentIndex]);
    }
    return accumulator;
  },0)
  
  // console.log("sin interseccion");

  return result;
};

//* Euclidean Distance */
const Euclidean = (x1, x2) => {

  const result = x1.reduce((accumulator, currentValue, currentIndex) => {
    
    if (!isNaN(currentValue) && !isNaN(x2[currentIndex])) {
      accumulator += (currentValue - x2[currentIndex])**2;
    }
    return accumulator;
  },0)
  
  // console.log("sin interseccion");

  return Math.sqrt(result);
};


//* Pearson Distance */

const Pearson = (x1,x2) => {
  
  let x_y = 0; //x*y
  let s_x = 0; // sumatoria(x)
  let s_y = 0; // sumatoria(y)
  let s_x2 = 0; // sumatoria de cuadrados(x)
  let s_y2 = 0; // sumatoria de cuadrados(x)
  let n = 0;

  for (let index = 0; index < x1.length; index++) {
    if (!isNaN(x1[index]) && !isNaN(x2[index])) {
      x_y += (x1[index] * x2[index]);
      s_x += x1[index];
      s_y += x2[index];
      s_x2 += x1[index]**2;
      s_y2 += x2[index]**2;
      n++;
    }
  }
  if (n == 0) return 0;

  const s_x_s_y = (s_x * s_y)/n; // sumatoria(x*y)/n
  const s_x2N = (s_x**2)/n; // sumatoria de X al cuadrado sobre n
  const s_y2N = (s_y**2)/n; // sumatoria de Y al cuadrado sobre n

  const numerator = (x_y - s_x_s_y);
  const denominator = (Math.sqrt(s_x2 - s_x2N) * Math.sqrt(s_y2 - s_y2N));
  
  if (denominator == 0) return 0;
  
  const r = numerator/denominator;

  return r;
}


//* Cosine Similarity Distance */
const cosineSimilarity = (x1,x2) => {

  let x_y = 0;
  let x_2 = 0;
  let y_2 = 0;

  for (let index = 0; index < x1.length; index++) {
    if (!isNaN(x1[index]) && !isNaN(x2[index])) {
      x_y += (x1[index] * x2[index]);
      x_2 += x1[index]**2;
      y_2 += x2[index]**2;
    }
    
  }
  const numerator = (x_y);
  const denominator = (Math.sqrt(x_2) * Math.sqrt(y_2));
  
  if (denominator == 0) return 0;

  const cos_ = numerator/denominator;
  return cos_;
}


//* KNN */
const knn = (data,username,k,__callback__,inverse) => {

  const columnsName = Object.keys(data);

  const result = columnsName.reduce((accumulator,currentValue) => {
    let distance = 0;
    if (currentValue != username) {
      distance = __callback__(data[currentValue],data[username]);
      accumulator.push([distance,currentValue]);
    }
    return accumulator;
  },[]);
  
  inverse ? result.sort((a,b) => a[0] - b[0]) : result.sort((a,b) => b[0] - a[0])

  return result;

}

const rl = readline.createInterface({
  input: fs.createReadStream(
    "/home/judal/Documentos/CURSOS_2023_I/DataScience/Clase_2/movie_ratings/assets/Movie_Ratings.csv",
    "utf8"
  ),
});

let idx = 1;
var headers = null;
rl.on("line", (line) => {
  

  if (!headers) {
    headers = line.split(",");
  }else {
    const columns = line.split(",");
    
    // console.log(columns);
    // console.log(headers[idx++]);
    for (let index = 1; index < headers.length; index++) {

      const element = headers[index].replace(/^"(.*)"$/, '$1');

      if (dataStruct[element]) {
        dataStruct[element].push(parseFloat(columns[index]));
      }else {
        dataStruct[element] = [parseFloat(columns[index])];
      }
    }
  }

//   const user_id = parseInt(columns[0]);
//   const item_id = parseInt(columns[1]);
//   const rating = parseFloat(columns[2]);

//   if (dataStruct[user_id]) {
//     dataStruct[user_id].item_id.push(item_id);
//     dataStruct[user_id].ratings.push(rating);
//   } else {
//     dataStruct[user_id] = {
//       user_id,
//       item_id: [item_id],
//       ratings: [rating],
//     };
//   }
});

rl.on("close", () => {

  console.log("DATA SCIENCE");

  // const data = [...Object.values(dataStruct)];
  // console.log(dataStruct['ben']);
  // console.log(dataStruct['Gary']);
  console.log("La distancia Manhattan es: ",Manhattan(dataStruct['ben'],dataStruct['Gary']));

  let reNeighbors = knn(dataStruct,"ben",5,Manhattan,true)
  console.log("Los vecinos mas cercanos de K usando la distancia manhattan: ",reNeighbors);


  console.log("La distancia Euclideana es: ",Euclidean(dataStruct['Erin'],dataStruct['Patrick T']));

  reNeighbors = knn(dataStruct,"Erin",5,Euclidean,true)
  console.log("Los vecinos mas cercanos de K usando la distancia Euclideana: ",reNeighbors);

  console.log("La distancia Pearson es: ",Pearson(dataStruct['Jessica'],dataStruct['Josh']));

  reNeighbors = knn(dataStruct,"Jessica",5,Pearson,false)
  console.log("Los vecinos mas cercanos de K usando la distancia Pearson: ",reNeighbors);

  console.log("La distancia Similitud del Coseno es: ",cosineSimilarity(dataStruct['Jessica'],dataStruct['Jeff']));

  reNeighbors = knn(dataStruct,"Jessica",5,cosineSimilarity,false)
  console.log("Los vecinos mas cercanos de K usando la distancia Similitud del Coseno: ",reNeighbors);


});
