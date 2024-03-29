const fs = require('fs');
const readline = require('readline');
const csv = require('csv-parser');

const ratingStruct = {};
const moviesStruct = {};
const tagsStruct = {};



//** Read Ratings */

// console.time("Execution time");
// const rl_ratings = readline.createInterface({
//   input: fs.createReadStream('/home/judal/Documentos/CURSOS_2023_I/DataScience/resources/ml-25m/ratings.csv', 'utf8')
// });

// let firstLine = true;

// rl_ratings.on('line', (line) => {
//   if (firstLine) {
//     firstLine = false;
//   }else{

//     const columns = line.split(',');
    
//       const user_id = parseInt(columns[0]);
//       const item_id = parseInt(columns[1]);
//       const rating = parseFloat(columns[2]);

//       if (ratingStruct[user_id]) {
//         ratingStruct[user_id].item_id.push(item_id);
//         ratingStruct[user_id].ratings.push(rating);
//       } else {
//         ratingStruct[user_id] = {
//           user_id,
//           item_id: [item_id],
//           ratings: [rating]
//         };
//       }
//   }



// });

// rl_ratings.on('close', () => {
//   // console.log(Object.values(dataStruct));

//   const dataRatings = [...Object.values(ratingStruct)];
//   // console.log(dataRatings);
//   const jsonObject = JSON.stringify(dataRatings);
//   fs.writeFile('./data/ratings.json', jsonObject, 'utf8', (err) => {
//     if (err) {
//       console.error('Error writing to file:', err);
//     } else {
//       console.log('The object has been successfully written to the file.');
//     }
//   });

// });
// console.timeEnd("Execution time");


//** Read Movies */
console.time("Execution time");

const filePath = '/home/judal/Desktop/CURSOS_2023_I/DataScience/resources/ml-25m/movies.csv';

fs.createReadStream(filePath)
.pipe(csv())
.on('headers', (headers) => {
  console.log('Encabezados:', headers);
})
.on('data', (data) => {

  const movie_id = data['movieId']
  const name_movie = data['title'];
  const genre_movie = data['genres'];

  moviesStruct[movie_id] = {
    title: name_movie,
    genre: genre_movie,
  }
})
.on('end', () => {
  
  const jsonObject = JSON.stringify(moviesStruct);

  fs.writeFile('./data/movies.json', jsonObject, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('The object has been successfully written to the file.');
    }
  });
});

// const rl_movies = readline.createInterface({
//   input: fs.createReadStream('/home/judal/Documentos/CURSOS_2023_I/DataScience/resources/ml-25m/movies.csv', 'utf8')
// });

// let firstLine2 = true;
// rl_movies.on('line', (line) => {

//   if (firstLine2) {
//     firstLine2 = false;
//   }else{
//     const columns = line.split(',');

//     const movie_id = parseInt(columns[0]);
//     const name_movie = columns[1];
//     const genre_movie = columns[2];

//     moviesStruct[movie_id] = {
//       title: name_movie,
//       genre: genre_movie,
//     }
//   }

// });

// rl_movies.on('close', () => {

//   const jsonObject = JSON.stringify(moviesStruct);

//   fs.writeFile('./data/movies.json', jsonObject, 'utf8', (err) => {
//     if (err) {
//       console.error('Error writing to file:', err);
//     } else {
//       console.log('The object has been successfully written to the file.');
//     }
//   });

// });
// console.timeEnd("Execution time");

// //** Read Tags */
// console.time("Execution time");
// const rl_tags = readline.createInterface({
//   input: fs.createReadStream('/home/judal/Documentos/CURSOS_2023_I/DataScience/resources/ml-25m/tags.csv', 'utf8')
// });

// let firstLine3 = true;

// rl_tags.on('line', (line) => {
//   const columns = line.split(',');
  
//   if (firstLine3) {
//     firstLine3 = false;
//   }else{
//     const user_id = parseInt(columns[0]);
//     const movie_id = parseInt(columns[1]);
//     const tag = columns[2];

//     if (tagsStruct[user_id]) {
//       tagsStruct[user_id]?.movie_id?.push(movie_id);
//       tagsStruct[user_id]?.tag?.push(tag);
//     }else{
//       tagsStruct[user_id] = {
//         user_id,
//         movie_id: [movie_id],
//         tag: [tag]
//       }
//     }
//   }
// });

// rl_tags.on('close', () => {
//   // console.log(tagsStruct);
//   // console.log(Object.values(tagsStruct));

//   const jsonObject = JSON.stringify(Object.values(tagsStruct));

//   fs.writeFile('./data/tags.json', jsonObject, 'utf8', (err) => {
//     if (err) {
//       console.error('Error writing to file:', err);
//     } else {
//       console.log('The object has been successfully written to the file.');
//     }
//   });
// });
// console.timeEnd("Execution time");
