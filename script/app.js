let age = document.getElementById("age");
let height = document.getElementById("height"); 
let weight = document.getElementById("weight"); 
let gender = document.getElementById("gender");
/* let sex = document.querySelectorAll(".opcionS");
let women = document.getElementById("women");
let man = document.getElementById("man"); */
let tableBody = document.querySelector(".table__body");
let button = document.getElementById("submit");
let form = document.getElementById("form");
let result = document.getElementById("result");
let fragment = document.createDocumentFragment();
let persons = [];
let resulImc = "";
let resultObs = "";


button.addEventListener("click", validadeForm);

let addPerson = (gender, age, height, weight, resulImc, resultObs ) => {
    let person = {
                 gender : gender,
                 age : age,
                 height : height,
                 weight : weight,
                 resulImc : resulImc,
                 result: resultObs
                }

   persons.push(person);
   //saveData(persons); 
} 

addPerson(gender.value, age.value, height.value, weight.value, resulImc, resultObs )

function validadeForm(){
    if(age.value == '' || height.value == '' || weight.value == ''){
        alert("Todos los campos son Obligatorios!");
        button.removeEventListener("click", calculateIMC);
    } else{
        calculateIMC();
    }
}


let calculateIMC = (item) => {
    persons.forEach( value => {
		let person = value;
		for(let i in person) {
			const {age, height, weight} = person;
			// if(age == '' || height == '' || weight == '') {
			//    console.log("Todos los campos son Obligatorios!");
			// } else{
                let imc = Number(weight ) / ( Number(height )/100 * Number(height)/100 );
                let result = '';
                    
                if(imc < 18.5){
                    result = 'delgadez';
                } else if(18.5 <= imc && imc <= 24.9){
                    result = 'Normal';
                } else if(25.9 <= imc && imc <= 29.9) {
                    result = 'Sobrepeso';
                } else if(30.0 <= imc && imc <= 39.9) {
                    result = 'Obesidad';
                } else if(40.0 <= imc) {
                    result = 'Obesidad extrema o de alto riesgo';
                }
                // let r = 'IMC:' + parseFloat(imc).toFixed(2) + ' kg/m²';
                // console.log(result);
                // console.log(r);
				let h1 = document.createElement('h1');
                let h2 = document.createElement('h2');
                resultObs = h1.textContent = result;
                resulImc = h2.textContent = 'IMC:' + parseFloat(imc).toFixed(2) + ' kg/m²';   
                console.log(resultObs);
                document.body.appendChild(h1);
                document.body.appendChild(h2);
				
			// }  
		}
    })
    // addPerson(gender.value, age.value, height.value, weight.value, resulImc, resultObs )
    //form.reset()
}
	
button.addEventListener("click",calculateIMC);
console.log(persons);
  
let saveData = () => {
    localStorage.setItem('person', JSON.stringify(persons))
}


let showData = () => {
    tableBody.innerHTML = "";
    persons = JSON.parse(localStorage.getItem("person"));
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
// showData();
document.addEventListener('DOMContentLoaded',showData);

