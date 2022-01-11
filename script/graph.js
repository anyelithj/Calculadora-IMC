google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
let data = google.visualization.arrayToDataTable([
  ['IMC', 'Mhl'],
  ['Delgadez',54.8],
  ['Normal',23.9],
  ['Normal',48.6],
  ['Sobrepeso',44.4],
  ['Obesidad',14.5]
]);
let options = {
  title:'Resultado: Indice de masa corporal',
  is3D:true
};

let chart = new google.visualization.PieChart(document.getElementById('myChart'));
  chart.draw(data, options);
} 

