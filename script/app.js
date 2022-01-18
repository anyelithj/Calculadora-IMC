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
     resulImc.textContent = parseFloat(imc).toFixed(2);  
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
    grafica(pers);
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

function grafica (item) {
   
    let delgadez = 0;     
    let normal = 0;
    let sobrepeso = 0; 
    let obesidad = 0;
    let obesidadExtrema = 0;
    let resultcount = persons.filter(item => { 
        const {result} = item; 
		if(result == 'delgadez') return delgadez = delgadez + 1; 
        if (result == 'sobrepeso') return  sobrepeso = sobrepeso + 1;
        if (result == 'normal') return normal = normal + 1;
        if (result == 'obesidad') return obesidad = obesidad + 1;
        if (result == 'obesidad extrema o de alto riesgo') return obesidadExtrema = obesidadExtrema + 1;
	});
    
    let total = delgadez + sobrepeso +  normal  + obesidad + obesidadExtrema;
   
    let porcentDelgadez = `${(delgadez * 100 / total).toFixed(2)}`;
    let porcentSobrepeso = `${(sobrepeso * 100 / total).toFixed(2)}`;
    let porcentNormal = `${(normal  * 100 / total).toFixed(2)}`;
    let porcentObesidad = `${(obesidad  * 100 / total).toFixed(2)}`;
    let porcentObesidadExtrema = `${(obesidadExtrema * 100 / total).toFixed(2)}`;
    console.log(porcentDelgadez, porcentSobrepeso, porcentNormal, porcentObesidad, porcentObesidadExtrema);

    const chart = document.getElementById('myChart').getContext('2d');
    let data = {
        labels: ['Delgadez', 'Normal','Sobrepeso','Obesidad','Obesidad extrema o de alto riesgo'],
        datasets: [{
            backgroundColor: [
                            'rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(255, 215, 0)',
                            'rgb(255, 165, 0)','rgb(220, 20, 60)','rgb(255, 159, 64)'
                             ],
            borderColor: [
                        'rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 215, 0, 1)',
                        'rgba(255, 165, 0, 1)','rgba(220, 20, 60 1)','rgba(255, 159, 64, 1)'
                        ],
            borderWidth: 1,
            data: [porcentDelgadez,  porcentNormal, porcentSobrepeso, porcentObesidad, porcentObesidadExtrema]
        }]
    };
    let config = {
        type: 'bar',
        data, 
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Indice de Masa Corporal"
            }
       }
    }
    
    const myChart = new Chart(chart, config);
    
}
