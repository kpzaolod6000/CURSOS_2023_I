const fs = require('fs');
const readline = require('readline');

const ratingStruct = {};
const moviesStruct = {};
const tagsStruct = {};



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

  const dataRatings = [...Object.values(ratingStruct)];
  const jsonObject = JSON.stringify(dataRatings);


  fs.writeFile('./data/ratings.json', jsonObject, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('The object has been successfully written to the file.');
    }
  });

});

//** Read Movies */
const rl_movies = readline.createInterface({
  input: fs.createReadStream('/home/judal/Documentos/CURSOS_2023_I/DataScience/resources/data-10mb/movies.dat', 'utf8')
});

rl_movies.on('line', (line) => {
  const columns = line.split('::');

  const movie_id = parseInt(columns[0]);
  const name_movie = columns[1];
  const genre_movie = columns[2];

  moviesStruct[movie_id] = {
    title: name_movie,
    genre: genre_movie,
  }

});

rl_movies.on('close', () => {

  const jsonObject = JSON.stringify(moviesStruct);

  fs.writeFile('./data/movies.json', jsonObject, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('The object has been successfully written to the file.');
    }
  });

});

//** Read Tags */
const rl_tags = readline.createInterface({
  input: fs.createReadStream('/home/judal/Documentos/CURSOS_2023_I/DataScience/resources/data-10mb/tags.dat', 'utf8')
});

rl_tags.on('line', (line) => {
  const columns = line.split('::');
  
  const user_id = parseInt(columns[0]);
  const movie_id = parseInt(columns[1]);
  const tag = columns[2];

  if (tagsStruct[user_id]) {
    tagsStruct[user_id]?.movie_id?.push(movie_id);
    tagsStruct[user_id]?.tag?.push(tag);
  }else{
    tagsStruct[user_id] = {
      user_id,
      movie_id: [movie_id],
      tag: [tag]
    }
  }
});

rl_tags.on('close', () => {
  // console.log(tagsStruct);
  // console.log(Object.values(tagsStruct));

  const jsonObject = JSON.stringify(Object.values(tagsStruct));

  fs.writeFile('./data/tags.json', jsonObject, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('The object has been successfully written to the file.');
    }
  });

  
});
