const form = document.querySelector("form");
var myTableDiv = document.getElementById("monTheatre");

let place = null
let rangee = null
let value = '_'; 
let position = [...Array(8)].map(e => Array(9).fill(value));

console.log(position)

form.addEventListener("submit", (event) => {
    myTableDiv.innerHTML =''
    event.preventDefault()
    
    const formData = new FormData(form)
    place = formData.get("placeTotal")
    rangee = formData.get("rangee")

    console.log(" Vous souhaitez "+ place +" place(s) , au  rang "+ rangee)
    let placeVide
    if(place > 0){
        placeOccupe = placeDejaRempli(rangee)
        placeVide = 9 - placeOccupe
        if(placeVide >= place){
            position = remplirPlace(placeOccupe, rangee, place, position)
            
        }
        else{
            alert ("désolé, il n' y a pas assez de places dans cette rangee!")
        }
    }
    console.log(position) 
    addTable(myTableDiv)  
  });

//rempli la "place" a partir de la position "occupee" dans la "rangee" du "tableau" 
var remplirPlace = (occupee, rangee, place, tableau) => {
    while(place > 0){
        tableau[rangee][occupee] = 'O'
        occupee++
        place--
    }
    return tableau
}

//return le nombre de places remplies dans la rangee 
var placeDejaRempli = (rangee) =>{
    rangeeChoisi = position[rangee]
    dejaOccupeDansRangee = dejaOccupe(rangeeChoisi)
    return dejaOccupeDansRangee
}

//compte le nombre de 'O' present dans le tableau position
var dejaOccupe = (tab)=>{
    let occupe = 0
    for (let x of tab){
        if( x == 'O'){
            occupe++
        }
    }
    console.log('places deja occupees dans cette rangee '+occupe)
    return occupe;
}

function addTable(myTableDiv) {
    
    var table = document.createElement('TABLE');
    table.border = '1';
  
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
  
    for (var i = 0; i < 8; i++) {
      var tr = document.createElement('TR');
      tableBody.appendChild(tr);
  
      for (var j = 0; j < 9; j++) {
        var td = document.createElement('TD');
        td.width = '75';
        //td.appendChild(document.createTextNode("Cell " + i + "," + j));
        td.appendChild(document.createTextNode("[ " + position[i][j] + " ]"));
        tr.appendChild(td);
      }
    }
    myTableDiv.appendChild(table);
  }

