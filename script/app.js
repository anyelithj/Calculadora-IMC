import {persons} from '../data/data.js';

let age = document.getElementById("age");
let height = document.getElementById("height"); 
let weight = document.getElementById("weight"); 
let gender = document.getElementById("gender");
let tableBody = document.querySelector(".table__body");
let button = document.getElementById("submit");
// let form = document.getElementById("form");
let fragment = document.createDocumentFragment();
// let persons = [];
let result = "";
let resulImc = "";
let resultObs = "";
//let person = {};



button.addEventListener("click", validadeForm);

function validadeForm(e){ 
    if(age.value == '' || height.value == '' || weight.value == ''){
        showMessage("Todos los campos son Obligatorios!");
        // button.removeEventListener("click", calculateIMC);
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
    
   persons.push(person);
   saveData(persons); 
} 

let calculateIMC = (item) => {
    let imc = Number(weight.value ) / ( Number(height.value )/100 * Number(height.value)/100 );
			
    if(imc < 18.5){
        result = "delgadez";
    } else if(18.5 <= imc && imc <= 24.9){
        result = "normal";
    } else if(25.9 <= imc && imc <= 29.9) {
        result = "sobrepeso";
    } else if(30.0 <= imc && imc <= 39.9) {
        result = "obesidad";
    } else if(40.0 <= imc) {
        result = "obesidad extrema o de alto riesgo";
    }
     resulImc = parseFloat(imc).toFixed(2) + "kg/m²";

     resultObs = document.createElement('h1');
     resultObs.textContent = result;
     resulImc = document.createElement('h2');
     resulImc.textContent = parseFloat(imc).toFixed(2) + "kg/m²";  
     console.log(resultObs , resulImc);
     document.getElementById("result").appendChild(resultObs);
     document.getElementById("imc").appendChild(resulImc);
    //  button.removeEventListener("click", calculateIMC);
    //  button.removeEventListener("click", validadeForm); 
     addPerson(age.value, gender.value, height.value, resulImc.textContent, resultObs.textContent, weight.value);
     form.reset();
     setTimeout( () => {
        resultObs.remove();
        resulImc.remove();
    }, 1500);   
}


// button.addEventListener("click",calculateIMC);

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
// button.addEventListener('click',showData);
document.addEventListener('DOMContentLoaded',showData);

function grafica (pers) {
    console.log(pers)
    pers.forEach(p => {
        const {resulImc , result } = p;
        let accountant = 0;	
        let delgadez, normal, sobrepeso, obesidad, obesidadExtrema;	
  	 
    if(result === 'delgadez' ){
        delgadez = accountant++;
    } else if(result === 'normal'){
       normal = accountant++;
    } else if(result === 'sobrepeso') {
        sobrepeso = accountant++;
    } else if(result === 'obesidad') {
        obesidad = accountant++;
    } else if(result === 'obesidad extrema o de alto riesgo') {
        obesidadExtrema = accountant++;
    }

    const chart = document.getElementById('myChart').getContext('2d');
    const labels = [
         'Delgadez', 
         'Normal',
         'Sobrepeso',
         'Obesidad',
         'Obesidad extrema o de alto riesgo'
     ];
    let data = {
        labels,
        dataset: [{
            label: 'Resultado: Indice de masa corporal',
            data: [ delgadez, normal, sobrepeso, obesidad, obesidadExtrema],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      };
      //options block
      const options = {
        plugins: {
          length: {
              display: false
          }
        }
      };
      //config block
      const config = {
        type: 'bar',
        data, 
        options
      }
      
    //   //render block
      const myChart = new Chart(chart, config);
    
    });
}
