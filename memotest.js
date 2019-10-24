// DECLARO VARIABLES Y CONSTANTES;
var content = document.querySelector("table tbody"); /*le asigno a la variable content la tabla que está vacía para después poder modificarla con la funcion generateTable, pasandola como parámetro. También al tenerla en una variable agilizamos su manipulación, tanto para llenarla como para vaciar el contenido*/
var tableSize = document.getElementById("pick");
var matrixSize = 4; //Dimension de la matriz (5x5, 6x6, etc)
var matrixRows = 4; //Dimension de la matriz (5x5, 6x6, etc)
var matrixColumns = matrixRows;
var checker=[]; // este array guarda los 2 valores para comparar si son los mismos
var matrix=[]; // declaro la matriz
var imgArray=["img/0.png", "img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png", "img/7.png", "img/8.png", "img/9.png", "img/10.png", "img/11.png", "img/12.png", "img/13.png", "img/14.png", "img/15.png", "img/16.png", "img/17.png"]; // declaro el array que va a contener los objetos.
var shuffleArray=[]; // declaro el array que va a mezclar las posiciones.
var score=1000; //
var mod=0.98;
var pairCount=0;
var jugadores; //variable que guarda los jugadores
var idHolder=[];

/*---------------------- FUNCIONES ----------------------*/

/*function generateTable () {
    generateMatrix();
    valueAssigner();
    shuffler(shuffleArray);
    //metodo para limpiar la tabla 
    document.getElementById("tablero").innerHTML = "";
    for (let j=0; j < tableSize.value; j++) {
        document.getElementById("tablero").innerHTML+= '<tr id="row'+j+'"></tr>'
        for (let i=0; i < tableSize.value; i++) {
            document.getElementById("row"+j).innerHTML+= '<td onclick="check(matrix['+j+']['+i+'],'+returnString(j,i)+')"><img src="img/default.png" id="'+j+''+i+'"></td>'
            }
        }
 }*/

 /* funcion para generar la tabla. Dentro de las filas y columnas que se van agregando introducimos la imagen default, con las funciones onclick */ 
 function generateTable () {
  
    generateMatrix ();
    valueAssigner();
    //shuffleArray=shuffler(shuffleArray);

    content.innerHTML = null;
    for (let j=0; j<matrixRows; j++) {
        let row = content.insertRow (j)
        row.setAttribute("id", "row "+j);
        for (let i=0; i<matrixColumns; i++) {
            let cell = row.insertCell(i);
            cell.innerHTML = "<img src=img/default.png id="+j+""+i+" onclick=check(id)>";
            //cell.setAttribute ("id", j+""+i);
            //cell.setAttribute ("onclick", "check(id)");
        };
    }
}


generateTable ();


/* funcion para modificar el tamaño de la tabla, una vez que el usuario modifica el value, se reinicia generateTable() */
function getMatrixSize() {
    matrixSize=parseInt(document.getElementById("pick").value);
    matrixRows=parseInt(document.getElementById("pick").value);
    matrixColumns=parseInt(document.getElementById("pick").value);
    generateTable();
} 


/* generateMatrix() crea el array bidimensional, dandole por default el valor 0 a cada elemento (filas y columnas) */
function generateMatrix () {
    matrix=[];
    shuffleArray=[];
    for (let i=0; i<matrixRows; i++) { //recorre la dimension de la matriz
        matrix.push([]);//agrega un array por posicion de matrixSize
        
        for (let j=0; j<matrixColumns; j++) {
            matrix[i].push(0);//rellena de la cantidad de 0 necesaria
            shuffleArray.push({Row:i, Col:j});
            };
};

    //shuffleArray=shuffler(shuffleArray);
}

function valueAssigner() {
    for (let i=0; i<(Math.floor((matrixRows*matrixColumns)/2)*2); i=i+2) { // Cuenta hasta la mitad del total de posiciones en la matriz. Omite numeros impares (5x5, 7x7, 9x9)
        matrix[shuffleArray[i].Row][shuffleArray[i].Col]=i/2;
        matrix[shuffleArray[i+1].Row][shuffleArray[i+1].Col]=i/2;
    }
    if ((matrixSize^2)%2 !== 0) {
        matrix[shuffleArray[(matrixSize**2)-1].Row][shuffleArray[(matrixSize**2)-1].Col]=((matrixSize**2)+1)/2;
        console.log("funciono")
    } 
}

function shuffler (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};


function parser (id) {

    let tenedor = id;
    let guardarPrimerNumero = tenedor.substr(0,1);
    let guardarSegundoNumero = tenedor.substr(1,1);
    guardarPrimerNumero = parseInt(guardarPrimerNumero);
    guardarSegundoNumero = parseInt (guardarSegundoNumero);
    let valorMatriz = matrix[guardarPrimerNumero][guardarSegundoNumero];

    return valorMatriz;

}

function check(id) {
      
    let value = parser (id);
    console.log(value);
    console.log(typeof(value));
    checker.push(value);
    idHolder.push(id);
    scoreMaker();

    //console.log(id);
    document.getElementById(id).setAttribute("onclick","")


    if (checker.length===2) {
        showCard(id,value);
        if (checker[0]==checker[1]) {
            /* lo que queremos que pase cuando se cumpla la condicion */;
            setTimeout(correctPair(idHolder[0],idHolder[1]),2000);
            checker=[];
            idHolder=[];
            pairCount=pairCount+1;
        }
        else {
            setTimeout(flip(idHolder[0],idHolder[1]),2000);
            checker=[];
            idHolder=[];
        }
    }
    else {
        showCard(id,value)
    }
    if (pairCount===Math.floor((matrixSize**2)/2)) { //condición ganadora
        displayScore();
        console.log ("sos vos");
    }
}

function correctPair(id1,id2) {
    document.getElementById(id1).setAttribute("class","correct");
    document.getElementById(id2).setAttribute("class","correct");
}

function showCard (id,value) {
    document.getElementById(id).setAttribute("src",imgArray[value]) /*en realidad acá me parece que tendríamos que modificar las clases del elemento html, osea que tenga un display none o visibility hidden y en el onclick se haga visible*/
}

function flip(id1,id2) {
    document.getElementById(id1).setAttribute("src","img/default.png");
    document.getElementById(id2).setAttribute("src","img/default.png");
    document.getElementById(id1).setAttribute("onclick","check(id)");
    document.getElementById(id2).setAttribute("onclick","check(id)");
}


function generarJugadores (id) { // Esta función genera los espacios para asignar los valores dentro del array, ya que sino devolveria error por no tener una posicion en el array.
   jugadores=document.getElementById(id).value;
   for (i=0; i< jugadores; i++) {
       jugadoresPuntaje.push(null);
       jugadoresTiempo.push(null);
   }
}

function scoreMaker() {
    score= Math.floor(score*mod);
}

function displayScore() {
   document.getElementById("scorer").innerHTML=score; // Imprime el puntaje final.
}