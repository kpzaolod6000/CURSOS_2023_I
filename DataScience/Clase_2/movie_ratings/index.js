const fs = require("fs");
const readline = require("readline");

const dataStruct = {};

const rl = readline.createInterface({
  input: fs.createReadStream(
    "/home/judal/Documentos/CURSOS_2023_I/DataScience/resources/Movie_Ratings.csv",
    "utf8"
  ),
});

let kk = 0;
var headers = null;
rl.on("line", (line) => {
  

  if (!headers) {
    headers = line.split(",");
  }else {
    const columns = line.split(",");
    console.log(columns);
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
  console.log("headers",headers);
  console.log("DATA SCIENCE");

  const data = [...Object.values(dataStruct)];
  console.log(data);
});
