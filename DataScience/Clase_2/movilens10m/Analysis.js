
const fs = require('fs');
const readline = require('readline');

var movieStruct = {};

document.addEventListener('DOMContentLoaded', function() {


    try {
    const jsonData = fs.readFileSync('./data/ratings.json', 'utf8');
    const ratingsArray = JSON.parse(jsonData);
    
    const dataRatings = [...Object.values(ratingsArray)];
    const person = dataRatings.filter((element) => element.user_id == 1);
    console.log(person[0]);

    } catch (err) {
        console.error('Error reading file:', err);
    }

    // Datos del gráfico
    var data = [
      {
        x: ['Manzanas', 'Plátanos', 'Naranjas'],
        y: [12, 18, 9],
        type: 'bar'
      }
    ];
  
    // Configuración del diseño del gráfico
    var layout = {
      title: 'Ejemplo de gráfico de barras',
      xaxis: { title: 'Frutas' },
      yaxis: { title: 'Cantidad' }
    };
  
    // Crea el gráfico
    Plotly.newPlot('chart', data, layout);
  });