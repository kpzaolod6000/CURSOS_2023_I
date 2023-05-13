const fs = require('fs');
const readline = require('readline');

const dataStruct = {};

const rl = readline.createInterface({
  input: fs.createReadStream('/home/judal/Documentos/Curso_2023_II/Ciencia_de_Datos/resources/data/ml-10M100K/ratings.dat', 'utf8')
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
  console.log(Object.values(dataStruct));
});