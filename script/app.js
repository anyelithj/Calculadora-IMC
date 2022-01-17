import {persons} from '../data/data.js';

let age = document.getElementById("age");
let height = document.getElementById("height"); 
let weight = document.getElementById("weight"); 
let gender = document.getElementById("gender");
let tableBody = document.querySelector(".table__body");
let button = document.getElementById("submit");
let fragment = document.createDocumentFragment();
// let persons = [];
let result = "";
let resulImc = "";
let resultObs = "";




button.addEventListener("click", validadeForm);

function validadeForm(e){ 
    if(age.value == '' || height.value == '' || weight.value == ''){
        showMessage("Todos los campos son Obligatorios!");
    } else{
        calculateIMC();
    }
}

let showMessage = (mens) => {
    const Message = document.createElement('div');
    Message.setAttribute('class', 'error');
    Message.textContent = mens;
    form.appendChild(Message);
    setTimeout( () => {
        Message.remove();
    }, 5000);
}

let addPerson = ( age, gender,  height,  resulImc, resultObs, weight) => {
     let  person = {
                 age : age,
                 gender : gender,
                 height : height,
                 resulImc : resulImc,
                 result: resultObs,
                 weight : weight,
                }
    
    console.log(person)
   persons.push(person);
   saveData(persons); 
} 
console.log(persons)
let calculateIMC = (item) => {

	let imc = Number(weight.value ) /  Number(Math.pow(height.value,2));

    if(imc < 18.5){
        result = "delgadez";
    }else if(imc >= 18.5 && imc <= 24.9){
        result = "normal";
    }else if(imc >= 25.0  && imc <= 29.9) {
        result = "sobrepeso";
    }else if(imc >= 30.0   && imc <= 39.9) {
        result = "obesidad";
    } else if(imc >=  40.0 ) {
        result = "obesidad extrema o de alto riesgo";
    } else {
        result = "Ingrese los datos";
    }
     resultObs = document.createElement('h1');
     resultObs.textContent = result;
     resulImc = document.createElement('h2');
     resulImc.textContent = parseFloat(imc).toFixed(2) + "kg/m²";  
     document.getElementById("result").appendChild(resultObs);
     document.getElementById("imc").appendChild(resulImc); 
     addPerson(age.value, gender.value, height.value, resulImc.textContent, resultObs.textContent, weight.value);
     form.reset();
     setTimeout( () => {
        resultObs.remove();
        resulImc.remove();
    }, 1500);   
}


let saveData = (persons) => {
    localStorage.setItem('person', JSON.stringify(persons));
}

let showData = () => {
    let pers = JSON.parse(localStorage.getItem("person"));
    showTable(pers);
    // grafica(pers);
}

let showTable = ( persons) => {
    tableBody.innerHTML = "";
    persons.forEach( item => {
        const {age, height, weight, gender, resulImc,result } = item;
        let row = document.createElement('tr');
        tableBody.appendChild(row)
        row.innerHTML += `      
                    <td>${gender}</td>
                    <td>${age}</td>       
                    <td>${weight}</td>       
                    <td>${height}</td>
                    <td>${resulImc}</td> 
                    <td>${result}</td>    
                     `;     
    let cloneRow = row.cloneNode(true);
    fragment.appendChild(cloneRow);
    }); 
}

document.addEventListener('DOMContentLoaded',showData);

// function grafica (pers) {
//     console.log(pers)
    // let count = (item) => {
	// let resultdelgadez = persons.filter(item => {
	// 	if(item.result == 'delgadez') {
	// 		delgadez = delgadez + 1;
	// 		return console.log(delgadez);
	// 	} 
	// });
	// let resultsobrepeso = persons.filter(item => {
	// 	if (item.result == 'sobrepeso') {
	// 		sobrepeso = sobrepeso + 1;
	// 		return console.log(sobrepeso);
	// 	}
	// });
	// let resultsnormal = persons.filter(item => {
	// 	if (item.result == 'normal') {
	// 		normal = normal + 1;
	// 		return console.log(normal);
	// 	}
	// });
	// let resultsobesidad = persons.filter(item => {
	// 	if (item.result == 'obesidad') {
	// 		obesidad = obesidad + 1;
	// 		return console.log(obesidad);
	// 	}
	// });
	// let resultsobesidadExtrema = persons.filter(item => {
	// 	if (item.result == 'obesidad extrema o de alto riesgo') {
	// 		obesidadExtrema = obesidadExtrema + 1;
	// 	  return console.log(obesidadExtrema);
	// 	}
	// });



    // let total = resultdelgadez + resultsobrepeso +  resultsnormal + resultsobesidad + resultsobesidadExtrema;
    // let porcdelgadez = `${resultdelgadez * 100 / total} %`;
    // let porcresultsobrepeso = `${resultsobrepeso * 100 / total}%`;
    // let porcnormal = `${resultsnormal * 100 / total}%`;
    // let porobesidad = `${resultsobesidad * 100 / total}%`;
    // let porobesidadExtrema = `${resultsobesidadExtrema * 100 / total}%`;
//         const chart = document.getElementById('myChart').getContext('2d');
//         const labels = [
//             'Delgadez', 
//             'Normal',
//             'Sobrepeso',
//             'Obesidad',
//             'Obesidad extrema o de alto riesgo'
//         ];
//         let data = {
//             labels,
//             dataset: [{
//                 label: 'Resultado: Indice de masa corporal',
//                 data: [ delgadez, normal, sobrepeso, obesidad, obesidadExtrema],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         };
//         //options block
//         const options = {
//             plugins: {
//             length: {
//                 display: false
//             }
//             }
//         };
//         //config block
//         const config = {
//             type: 'bar',
//             data, 
//             options
//         }
        
//         //   //render block
//         const myChart = new Chart(chart, config);
        
//         });
// }
