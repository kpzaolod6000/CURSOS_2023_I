const fs = require("fs");
const readline = require("readline");

const dataStruct = {};

//* Manhattan Distance */
const Manhattan = (x1, x2) => {
  const { user_id: user_idX1, item_id: item_idX1, ratings: ratingsX1 } = x1;
  const { user_id: user_idX2, item_id: item_idX2, ratings: ratingsX2 } = x2;

  const intersection = item_idX1?.filter((element) =>
    item_idX2?.includes(element)
  );

  //verificar si la interseccion solo contiene un valor

  if (intersection.length > 0) {
    const result = intersection.reduce((accumulator, currentValue) => {
      const idxX1 = item_idX1?.findIndex((elem) => elem === currentValue);
      const idxX2 = item_idX2?.findIndex((elem) => elem === currentValue);
      const valueRatingsX1 = ratingsX1[idxX1];
      const valueRatingsX2 = ratingsX2[idxX2];

      // console.log(valueRatingsX1);
      // console.log(valueRatingsX2);
      accumulator += Math.abs(valueRatingsX1 - valueRatingsX2);
      return accumulator;
    }, 0);

    return result;
  }

  // console.log("sin interseccion");

  return NaN;
};

const rl = readline.createInterface({
  input: fs.createReadStream(
    "/home/judal/Desktop/CURSOS_2023_I/DataScience/Clase_2/movie_ratings/assets/Movie_Ratings.csv",
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
        dataStruct[element].push(parseInt(columns[index]));
      }else {
        dataStruct[element] = [parseInt(columns[index])];
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
  // console.log(Object.values(dataStruct));
  // console.log("headers",headers);
  console.log("DATA SCIENCE");

  const data = [...Object.values(dataStruct)];
  // console.log(data);
  console.log(dataStruct);
  // console.log(dataStruct['Patrick C']);
  // console.log(dataStruct['Heather']);
  // console.log("La distancia Manhattan es: ",Manhattan(data['Patrick C'],data['Heather']));
  // console.log("La distancia Euclideana es: ",Euclidean(person[0],person[1]));
  // console.log("La distancia Pearson es: ",  Pearson(person[0],person[1]));  
});
