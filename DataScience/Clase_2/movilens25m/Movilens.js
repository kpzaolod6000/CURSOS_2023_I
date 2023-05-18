const fs = require('fs');
const prompt = require('prompt-sync')();
const readline = require('readline');

//* Manhattan Distance */
const Manhattan = (x1, x2,inCommon) => {
  const { user_id: user_idX1, item_id: item_idX1, ratings: ratingsX1 } = x1;
  const { user_id: user_idX2, item_id: item_idX2, ratings: ratingsX2 } = x2;

  const intersection = item_idX1?.filter((element) =>
    item_idX2?.includes(element)
  );
  // console.log("intersecciones: ", intersection);

  //verificar si la interseccion solo contiene un valor

  if (intersection.length >= inCommon) {
    const result = intersection.reduce((accumulator, currentValue) => {
      const idxX1 = item_idX1?.findIndex((elem) => elem === currentValue);
      const idxX2 = item_idX2?.findIndex((elem) => elem === currentValue);
      const valueRatingsX1 = ratingsX1[idxX1];
      const valueRatingsX2 = ratingsX2[idxX2];

      accumulator += Math.abs(valueRatingsX1 - valueRatingsX2);
  
      return accumulator;
    }, 0);

    return result;
  }

  // console.log("sin interseccion");

  return NaN;
};

//* Euclidean Distance */
const Euclidean = (x1,x2,inCommon) => {
  const { user_id: user_idX1, item_id: item_idX1, ratings: ratingsX1 } = x1;
  const { user_id: user_idX2, item_id: item_idX2, ratings: ratingsX2 } = x2;

  const intersection = item_idX1?.filter((element) =>
    item_idX2?.includes(element)
  );

  //verificar si la interseccion solo contiene un valor

  if (intersection.length >= inCommon) {
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
const Pearson = (x1,x2,inCommon) => {
  const { user_id: user_idX1, item_id: item_idX1, ratings: ratingsX1 } = x1;
  const { user_id: user_idX2, item_id: item_idX2, ratings: ratingsX2 } = x2;

  const intersection = item_idX1?.filter((element) =>
    item_idX2?.includes(element)
  );


  //verificar si la interseccion solo contiene un valor

  if (intersection.length >= inCommon) {
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
    
    if (r>1) return 1.0

    return r;
  }

  // console.log("-------------------------------sin interseccion-------------------------------");

  return NaN;
}

//* Cosine Similarity Distance */
const cosineSimilarity = (x1,x2,inCommon) => {

  const { user_id: user_idX1, item_id: item_idX1, ratings: ratingsX1 } = x1;
  const { user_id: user_idX2, item_id: item_idX2, ratings: ratingsX2 } = x2;

  const intersection = item_idX1?.filter((element) =>
    item_idX2?.includes(element)
  );


  //verificar si la interseccion solo contiene un valor

  if (intersection.length >= inCommon) {
    
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

    if (cos_>1.0) return 1.0;
    return cos_;
  }

  // console.log("-------------------------------sin interseccion-------------------------------");

  return NaN;

}


//* KNN */
const knn = (data,username,k,__callback__,inCommon,inverse) => {

  const maybeNeighbors = data.reduce((accumulator,currentValue) => {
    let distance = 0
    if (currentValue.user_id != username.user_id) {
      distance = __callback__(username,currentValue,inCommon);
      accumulator.push([distance,currentValue.user_id]);
    }
    
    return accumulator
  }, [])

  const result = maybeNeighbors.filter((neighbors) => !isNaN(neighbors[0])) // filtrar los que no tienen interseccion NaN

  inverse ? result.sort((a,b) => a[0] - b[0]) : result.sort((a,b) => b[0] - a[0])

  return result.slice(0, k);
  // return result;
}

//** MovieId to Name */
const convertProductID2name = (id) =>{
  // console.log(movieStruct);
  return [movieStruct[id].title,movieStruct[id].genre];
  // if id in self.productid2name:
  //   return self.productid2name[id]
  // else:
  //   return id

}

//* Recommend */

const recommend = (dataRatings,user,k,n_,__callback__,inCommon,genresQuanity,inverse) => {
  
  const recommendations = {};
  
  const nearest = knn(dataRatings,user,k,__callback__,inCommon,inverse);

  const userRatings = user.ratings;
  const userItem = user.item_id;

  const totalDistance = nearest.reduce((accumulator,currentValue) => {
    accumulator += currentValue[0];
    return accumulator;
  },0.0);

  let totalGenre = 0;
  for (const valor of Object.values(genresQuanity)) {
    totalGenre += valor;
  }

  nearest.forEach((neighbor) => {
    const weight = neighbor[0] / totalDistance;
    const neighbor_id = neighbor[1];

    const neighbor_data = dataRatings.filter((elem) => elem.user_id == neighbor_id);

    const neighborRatings = neighbor_data[0]?.ratings;
    const neighborItem = neighbor_data[0]?.item_id;

    // console.log(userItem);
    // console.log(neighborItem);
    // console.log(neighborRatings);
    // console.log(weight);

    const not_intersection = neighborItem?.filter((item) => !userItem?.includes(item));
    // console.log(not_intersection);
    
    not_intersection.forEach((currentValue) => {
      const idx = neighborItem.findIndex((item) => item === currentValue);

      const genreData = movieStruct[currentValue].genre.split("|");
      // console.log(genreData);
      
      const weightGenre = genreData.reduce((accumulator, currentValue) => {
        // if(genresQuanity[currentValue])
        //   accumulator *= (genresQuanity[currentValue] / totalGenre);
        // else
        //   accumulator *= (0.5 / totalGenre);

        if(genresQuanity[currentValue])
          accumulator += (genresQuanity[currentValue] / totalGenre);
        else
          accumulator += (0.5 / totalGenre);
        return accumulator;
      },1)
      
      if (recommendations.hasOwnProperty(currentValue)) {
        recommendations[currentValue] = recommendations[currentValue] + (neighborRatings[idx] * weight * weightGenre);
      }else{
        recommendations[currentValue] = (neighborRatings[idx] * weight * weightGenre);
      }
    });
  })

  const id_movies = Object.keys(recommendations);
  const recommendMovies = id_movies.map((id_movie) => {
    return [convertProductID2name(id_movie),recommendations[id_movie]];
  })

  inverse ? recommendMovies.sort((a,b) => a[1] - b[1]) : recommendMovies.sort((a,b) => b[1] - a[1])

  // console.log(nearest);
  // console.log(totalDistance);
  // console.log(recommendations);
  // console.log(recommendations);
  const userItemName = user.item_id.map((item) => {
    return convertProductID2name(item);
  });

  // console.log(userItemName);
  return recommendMovies.slice(0,n_);
}




//** Read Ratings */
const ratingStruct = {};
var movieStruct = {};

try {
  const jsonData = fs.readFileSync('./data/movies.json', 'utf8');
  const moviesArray = JSON.parse(jsonData);
  movieStruct={...moviesArray}
  // for (const movie of moviesArray) {
  //   movieStruct[movie.name] = movie.value;
  // }
} catch (err) {
  console.error('Error reading file:', err);
}

const rl_ratings = readline.createInterface({
  input: fs.createReadStream('/home/judal/Documentos/CURSOS_2023_I/DataScience/resources/ml-25m/ratings.csv', 'utf8')
});

let firstLine = true;

rl_ratings.on('line', (line) => {
  if (firstLine) {
    firstLine = false;
  }else{

    const columns = line.split(',');
    
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
  console.log("3) Recomendar");
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
            let inCommon = prompt('Escriba cuantos peliculas en comun deben tener: ');
            
            const personTest = dataRatings.filter((element) => element.user_id == user_1);

            if (inputDist == 1) {
              console.time("Execution time");
              let reNeighbors = knn(dataRatings,personTest[0],5,Manhattan,inCommon,true);
              console.timeEnd("Execution time");
              console.log("Los vecinos mas cercanos de ",user_1," usando la distancia manhattan: ",reNeighbors);
            }else if (inputDist == 2) {
              console.time("Execution time");
              let reNeighbors = knn(dataRatings,personTest[0],5,Euclidean,inCommon,true);
              console.timeEnd("Execution time");
              console.log("Los vecinos mas cercanos de ",user_1," usando la distancia euclideana: ",reNeighbors);
            }else if (inputDist == 3) {
              
              console.time("Execution time");
              let reNeighbors = knn(dataRatings,personTest[0],5,Pearson,inCommon,false);
              console.timeEnd("Execution time");
              console.log("Los vecinos mas cercanos de ",user_1," usando la distancia Pearson: ",reNeighbors);
            }else if (inputDist == 4) {
              
              console.time("Execution time");
              let reNeighbors = knn(dataRatings,personTest[0],5,cosineSimilarity,inCommon,false);
              console.timeEnd("Execution time");
              console.log("Los vecinos mas cercanos de ",user_1," usando la distancia Cosine Similarity: ",reNeighbors);
            }else{
              console.log("Error no existe dicha opcion");
            }
            continue_ = prompt('Desea continuar escriba "yes" sino "no": ');
          }
          continue_dist = prompt('Desea hallar mas knn escriba "yes" sino "no": ');
        }
      } else if(input == 3){

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
            let inCommon = prompt('Escriba cuantos peliculas en comun deben tener: ');
            let k_ = prompt('Escriba cuantos k nearest neighbor: ');
            let n_ = prompt('Escriba cuantos numeros como maximo se hara las recomendaciones: ');
            
            const personTest = dataRatings.filter((element) => element.user_id == user_1);
            
            //** Data de Generos por usuario */
            const genresQuanity = personTest[0]?.item_id?.reduce((accumulator, currentValue ,currentIndex) => {
              const movie_data = movieStruct[currentValue];
              const genre = movie_data?.genre?.split("|");
              genre.forEach((gen) => {
                if (accumulator[gen]) {
                  accumulator[gen] +=1;
                }else{
                  accumulator[gen] = 1; 
                }
              })
              return accumulator;

            },{});

            const arrayGenre = Object.entries(genresQuanity);
            arrayGenre.sort((a, b) => b[1] - a[1]);
            console.log("Generos que el usuario gusta: ",arrayGenre);
            

            if (inputDist == 1) {

              console.time("Execution time");
              let recommend_result = recommend(dataRatings,personTest[0],k_,n_,Manhattan,inCommon,genresQuanity,false);
              console.timeEnd("Execution time");
              console.log("Las peliculas recomendados son: ",recommend_result);

            }else if (inputDist == 2) {
              
              console.time("Execution time");
              let recommend_result = recommend(dataRatings,personTest[0],k_,n_,Euclidean,inCommon,genresQuanity,false);
              console.timeEnd("Execution time");
              console.log("Las peliculas recomendados son: ",recommend_result);

            }else if (inputDist == 3) {
              
              console.time("Execution time");
              let recommend_result = recommend(dataRatings,personTest[0],k_,n_,Pearson,inCommon,genresQuanity,false);
              console.timeEnd("Execution time");
              console.log("Las peliculas recomendados son: ",recommend_result);
            }else if (inputDist == 4) {
              
              console.time("Execution time");
              let recommend_result = recommend(dataRatings,personTest[0],k_,n_,cosineSimilarity,inCommon,genresQuanity,false);
              console.timeEnd("Execution time");
              console.log("Las peliculas recomendados son: ",recommend_result);
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
    console.log("3) Recomendar");
    console.log("Pulse q para salir");
    input = prompt('Selecciona la opcion que desea procesar: ');
  }

});