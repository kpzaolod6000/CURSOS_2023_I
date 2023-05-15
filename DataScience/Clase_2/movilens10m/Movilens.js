const fs = require('fs');
const prompt = require('prompt-sync')();
const readline = require('readline');

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

//* Euclidean Distance */

const Euclidean = (x1,x2) => {
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
      accumulator += ((valueRatingsX1 - valueRatingsX2)**2);
      return accumulator;
    }, 0);
    return Math.sqrt(result);
  }

  // console.log("sin interseccion");

  return NaN;
}

//* Pearson Distance */

const Pearson = (x1,x2) => {
  const { user_id: user_idX1, item_id: item_idX1, ratings: ratingsX1 } = x1;
  const { user_id: user_idX2, item_id: item_idX2, ratings: ratingsX2 } = x2;

  const intersection = item_idX1?.filter((element) =>
    item_idX2?.includes(element)
  );


  //verificar si la interseccion solo contiene un valor

  if (intersection.length > 0) {
    let x_y = 0; //x*y
    let s_x = 0; // sumatoria(x)
    let s_y = 0; // sumatoria(y)
    let s_x2 = 0; // sumatoria de cuadrados(x)
    let s_y2 = 0; // sumatoria de cuadrados(x)
    intersection.forEach(element => {
      const idxX1 = item_idX1?.findIndex((elem) => elem === element);
      const idxX2 = item_idX2?.findIndex((elem) => elem === element);
      const valueRatingsX1 = ratingsX1[idxX1];
      const valueRatingsX2 = ratingsX2[idxX2];

      // console.log(valueRatingsX1);
      // console.log(valueRatingsX2);

      x_y += (valueRatingsX1 * valueRatingsX2);
      s_x += valueRatingsX1;
      s_y += valueRatingsX2;
      s_x2 += valueRatingsX1**2;
      s_y2 += valueRatingsX2**2;
    });
    const n = intersection.length;

    const s_x_s_y = (s_x * s_y)/n; // sumatoria(x*y)/n
    const s_x2N = (s_x**2)/n; // sumatoria de X al cuadrado sobre n
    const s_y2N = (s_y**2)/n; // sumatoria de Y al cuadrado sobre n

    const numerator = (x_y - s_x_s_y);
    const denominator = (Math.sqrt(s_x2 - s_x2N) * Math.sqrt(s_y2 - s_y2N));
    // console.log(Math.sqrt(s_x2 - s_x2N));
    // console.log(Math.sqrt(s_y2 - s_y2N));
    // console.log("--- ",x_y);
    // console.log("****",s_x_s_y);
    
    if (denominator == 0) return 0;
    
    const r = numerator/denominator;

    return r;
  }

  // console.log("-------------------------------sin interseccion-------------------------------");

  return NaN;
}

//* Cosine Similarity Distance */
const cosineSimilarity = (x1,x2) => {

  const { user_id: user_idX1, item_id: item_idX1, ratings: ratingsX1 } = x1;
  const { user_id: user_idX2, item_id: item_idX2, ratings: ratingsX2 } = x2;

  const intersection = item_idX1?.filter((element) =>
    item_idX2?.includes(element)
  );


  //verificar si la interseccion solo contiene un valor

  if (intersection.length > 0) {
    
    let x_y = 0;
    let x2 = 0;
    let y2 = 0;
    
    intersection.forEach(element => {
      const idxX1 = item_idX1?.findIndex((elem) => elem === element);
      const idxX2 = item_idX2?.findIndex((elem) => elem === element);
      const valueRatingsX1 = ratingsX1[idxX1];
      const valueRatingsX2 = ratingsX2[idxX2];

      x_y += (valueRatingsX1 * valueRatingsX2);
      x2 += valueRatingsX1**2;
      y2 += valueRatingsX2**2;
      
    });
    const numerator = (x_y);
    const denominator = (Math.sqrt(x2) * Math.sqrt(y2));
    
    if (denominator == 0) return 0;
  
    const cos_ = numerator/denominator;
    return cos_;
  }

  // console.log("-------------------------------sin interseccion-------------------------------");

  return NaN;

}




//* KNN */
const knn = (data,username,k,__callback__,inverse) => {

  const maybeNeighbors = data.reduce((accumulator,currentValue) => {
    let distance = 0
    if (currentValue.user_id != username.user_id) {
      distance = __callback__(username,currentValue);
      accumulator.push([distance,currentValue.user_id]);
    }
    
    return accumulator
  }, [])

  const result = maybeNeighbors.filter((neighbors) => !isNaN(neighbors[0])) // filtrar los que no tienen interseccion NaN

  inverse ? result.sort((a,b) => a[0] - b[0]) : result.sort((a,b) => b[0] - a[0])

  // return result.slice(0, k);
  return result;
}

const ratingStruct = {};

//** Read Ratings */

const rl_ratings = readline.createInterface({
  input: fs.createReadStream('/home/judal/Documentos/CURSOS_2023_I/DataScience/resources/data-10mb/ratings.dat', 'utf8')
});

rl_ratings.on('line', (line) => {
  const columns = line.split('::');

  const user_id = parseInt(columns[0]);
  const item_id = parseInt(columns[1]);
  const rating = parseFloat(columns[2]);

  if (ratingStruct[user_id]) {
    ratingStruct[user_id].item_id.push(item_id);
    ratingStruct[user_id].ratings.push(rating);
  } else {
    ratingStruct[user_id] = {
      user_id,
      item_id: [item_id],
      ratings: [rating]
    };
  }
});

rl_ratings.on('close', () => {
  // console.log(Object.values(dataStruct));

  console.log("DATA MOVILENS 10M");

  const dataRatings = [...Object.values(ratingStruct)];
  // data.forEach(element => { // codigo que demuestra si existen calificacion con 0
  //   const boolss = element.ratings.every(elem => elem != 0);
  //   console.log(element.ratings);
  //   if(!boolss) {
  //     console.log(element.ratings);
  //     // console.log("hay ceros");
  //   }
  // });

  console.log("1) Hallar Distancias entre Usuarios");
  console.log("2) Hallar KNN");
  console.log("3) Ver nombre de las peliculas");
  console.log("Pulse q para salir");
  let input = prompt('Selecciona la opcion que desea procesar: ');

  while (input != "q") {
    try {
      if (input == 1) {

        let continue_dist = "yes" ;
        while (continue_dist == "yes") {
          console.log("1) Distancia Manhattan");
          console.log("2) Distancia Euclideana");
          console.log("3) Distancia Aproximcion de la Correlacion de Pearson");
          console.log("4) Distancia Similitud del Coseno");
          console.log("Pulse q para salir");
          let inputDist = prompt('Selecciona la opcion que desea procesar: ');
          let continue_ = "yes";

          while (inputDist != "q" && continue_ == "yes") {
            
            let user_1 = prompt('Escriba el id del usuario 1: ');
            let user_2 = prompt('Escriba el id del usuario 2: ');
            const person = dataRatings.filter((element) => element.user_id == parseInt(user_1) || element.user_id == parseInt(user_2));

            if (inputDist == 1) {
              console.log("La distancia Manhattan entre los usuarios ",user_1,"y",user_2,"es: ",Manhattan(person[0],person[1]));
            }else if (inputDist == 2) {
              console.log("La distancia Eclidean entre los usuarios ",user_1,"y",user_2,"es: ",Euclidean(person[0],person[1]));
            }else if (inputDist == 3) {
              console.log("La distancia Pearson entre los usuarios ",user_1,"y",user_2,"es: ",Pearson(person[0],person[1]));
            }else if (inputDist == 4) {
              console.log("La distancia Cosine Similarity entre los usuarios ",user_1,"y",user_2,"es: ",cosineSimilarity(person[0],person[1]));
            }else{
              console.log("Error no existe dicha opcion");
            }
            continue_ = prompt('Desea continuar escriba "yes" sino "no": ');
          }
          continue_dist = prompt('Desea hallar mas distancias escriba "yes" sino "no": ');
        }
        
        
      }else if (input == 2){

        let continue_dist = "yes" ;
        while (continue_dist == "yes") {
          console.log("1) Usando la Distancia Manhattan");
          console.log("2) Usando la Distancia Euclideana");
          console.log("3) Usando la Distancia Aproximcion de la Correlacion de Pearson");
          console.log("4) Usando la Distancia Similitud del Coseno");
          console.log("Pulse q para salir");
          let inputDist = prompt('Selecciona la distancia que desea procesar: ');
          let continue_ = "yes";

          while (inputDist != "q" && continue_ == "yes") {
            
            let user_1 = prompt('Escriba el id del usuario: ');
            
            const personTest = dataRatings.filter((element) => element.user_id == user_1);

            if (inputDist == 1) {
              console.time("Execution time");
              let reNeighbors = knn(dataRatings,personTest[0],5,Manhattan,true);
              console.timeEnd("Execution time");
              console.log("Los vecinos mas cercanos de ",user_1," usando la distancia manhattan: ",reNeighbors);
            }else if (inputDist == 2) {
              console.time("Execution time");
              let reNeighbors = knn(dataRatings,personTest[0],5,Euclidean,true);
              console.timeEnd("Execution time");
              console.log("Los vecinos mas cercanos de ",user_1," usando la distancia euclideana: ",reNeighbors);
            }else if (inputDist == 3) {
              
              console.time("Execution time");
              let reNeighbors = knn(dataRatings,personTest[0],5,Pearson,false);
              console.timeEnd("Execution time");
              console.log("Los vecinos mas cercanos de ",user_1," usando la distancia Pearson: ",reNeighbors);
            }else if (inputDist == 4) {
              
              console.time("Execution time");
              let reNeighbors = knn(dataRatings,personTest[0],5,cosineSimilarity,false);
              console.timeEnd("Execution time");
              console.log("Los vecinos mas cercanos de ",user_1," usando la distancia Cosine Similarity: ",reNeighbors);
            }else{
              console.log("Error no existe dicha opcion");
            }
            continue_ = prompt('Desea continuar escriba "yes" sino "no": ');
          }
          continue_dist = prompt('Desea hallar mas knn escriba "yes" sino "no": ');
        }
        

      }
      // const data = fs.readFileSync('./data/movies.json', 'utf8');
      // const jsonObject = JSON.parse(data);
      // console.log('JSON file contents:', jsonObject);
  
      // const input = prompt('Enter a number:');
      // console.log(jsonObject[input]);
  
    } catch (err) {
      console.error('Error reading file:', err);
    }

    console.log("1) Hallar Distancias entre Usuarios");
    console.log("2) Hallar KNN");
    console.log("3) Ver nombre de las peliculas");
    console.log("Pulse q para salir");
    input = prompt('Selecciona la opcion que desea procesar: ');
  }

 


  // console.log("data",dataRatings[0]);
  // console.log("data",dataRatings[1]);

  // const person = dataRatings.filter((element) => element.user_id == 1 || element.user_id == 2);

  // console.log("La distancia Manhattan es: ",Manhattan(person[0],person[1]));
  // console.log("La distancia Euclideana es: ",Euclidean(person[0],person[1]));
  // console.log("La distancia Pearson es: ",  Pearson(person[0],person[1]));
  // console.log("La distancia similitud del coseno es: ",  cosineSimilarity(person[0],person[1]));


  // const personTest = dataRatings.filter((element) => element.user_id == 50);
  // console.time("Execution time");
  // let reNeighbors = knn(dataRatings,personTest[0],5,Manhattan,true);
  // console.timeEnd("Execution time");
  // console.log("Los vecinos mas cercanos de K usando la distancia manhattan: ",reNeighbors);
  
  // console.time("Execution time");
  // reNeighbors = knn(dataRatings,personTest[0],10,Euclidean,true);
  // console.timeEnd("Execution time");
  // console.log("Los vecinos mas cercanos de K usando la distancia euclideana: ",reNeighbors);
  
  // console.time("Execution time");
  // reNeighbors = knn(dataRatings,personTest[0],10,Pearson,false);
  // console.timeEnd("Execution time");
  // console.log("Los vecinos mas cercanos de K usando la distancia Pearson: ",reNeighbors);
  
  // console.time("Execution time");
  // reNeighbors = knn(dataRatings,personTest[0],10,cosineSimilarity,false);
  // console.timeEnd("Execution time");
  // console.log("Los vecinos mas cercanos de K usando la distancia similitud del coseno: ",reNeighbors);
  


});