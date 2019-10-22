// DECLARO VARIABLES Y CONSTANTES;
var content = document.querySelector("table tbody"); /*le asigno a la variable content la tabla que está vacía para después poder modificarla con la funcion generateTable, pasandola como parámetro. También al tenerla en una variable agilizamos su manipulación, tanto para llenarla como para vaciar el contenido*/
var matrixSize=5; //Dimension de la matriz (5x5, 6x6, etc)
var matrixRows = 5; //Dimension de la matriz (5x5, 6x6, etc)
var matrixColumns = matrixRows;
var checker=[]; // este array guarda los 2 valores para comparar si son los mismos
var matrix=[]; // declaro la matriz
var imgArray=["img/0.jpg", "img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.png", "img/5.png", "img/6.png", "img/7.jpg", "img/8.jpg", "img/9.jpg", "img/10.jpg", "img/11.jpg", "img/12.jpg", "img/13.jpg", "img/14.jpg", "img/15.png", "img/16.png", "img/17.jpg", "img/18.jpg"]; // declaro el array que va a contener los objetos.
var shuffleArray=[]; // declaro el array que va a mezclar las posiciones.
var puntos; //
var pairCount=0;
var tiempo; //declaro variable que guarda el tiempo
let clock; // declaro variable que guarda el setInterval
var jugadores; //variable que guarda los jugadores
var jugadoresTiempo=[]; //declaro un array donde llevo el tiempo de cada jugador.
var jugadoresPuntaje=[]; //declaro un array donde llevo el puntaje de cada jugador.
var baseScore=1000; // puntaje base
var idHolder=[];
const modifier=0.95; // El valor por el cual se divide el puntaje por cada segundo que el jugador tardo.

function generateMatrix () {
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
    for (let i=0; i<(Math.floor(((matrixSize*matrixSize)/2))*2); i=i+2) { // Cuenta hasta la mitad del total de posiciones en la matriz. Omite numeros impares (5x5, 7x7, 9x9)
        for(let j=0; j<2; j++) { // Generar de a pares
            matrix[shuffleArray[i+j].Row][shuffleArray[i+j].Col]=i/2;   // Asigna a las posiciones de la matriz dos posiciones iguales cada vez que se recorre el primer for        
        }
    }
}

function check(value,id) {
    
    checker.push(value);
    idHolder.push(id);

    console.log(id);

    if (checker.length===2) {
        showCard(id,value);
        if (checker[0]==checker[1]) {
            /* lo que queremos que pase cuando se cumpla la condicion */;
            setTimeout(correctPair(idHolder[0],idHolder[1]),2000)
            checker=[];
            idHolder=[];
            pairCount=pairCount+1;
        }
        else {
            var fillerVar=setTimeout(flip(idHolder[0],idHolder[1]),2000);
            checker=[];
            idHolder=[];
        }
    }
    else {
        showCard(id,value)
    }
    if (pairCount=Math.floor((matrixSize*matrixSize)/2)) { //condición ganadora
        gameEnd();
    }
}

function correctPair(id1,id2) {
    document.getElementById(id1).setAttribute("class","correct");
    document.getElementById(id2).setAttribute("class","correct");
}

function gameEnd () {
    finish();
    /* aca hay que modificar el html del onclick para que deje de ejecutar logica */
}

function showCard (id,value) {
    document.getElementById(id).setAttribute("src",imgArray[value]) /*en realidad acá me parece que tendríamos que modificar las clases del elemento html, osea que tenga un display none o visibility hidden y en el onclick se haga visible*/
}

function flip(id1,id2) {
    document.getElementById(id1).setAttribute("src","img/default.png");
    document.getElementById(id2).setAttribute("src","img/default.png")
}

//Lógica de jugador - Time Deathmatch
function contraReloj (tiempo) {
       generarJugadores();
       clock=setInterval(raceTime(tiempo),1000); // Comienza la cuenta del reloj
};

function raceTime(tiempo) {
    tiempo=tiempo+1;
}

function finish() {
   clearInterval(clock); // freno el reloj
   //displayScore(/* insertar id del elemento que muestra el puntaje */); // dependiendo de cómo querramos avanzar la parte visual esta funcion va a hacerse un poco mas larga
};

function generarJugadores (id) { // Esta función genera los espacios para asignar los valores dentro del array, ya que sino devolveria error por no tener una posicion en el array.
   jugadores=document.getElementById(id).value;
   for (i=0; i< jugadores; i++) {
       jugadoresPuntaje.push(null);
       jugadoresTiempo.push(null);
   }
}

function keepTrackOfPlayer(playerNumber) {
   jugadoresPuntaje[playerNumber]=puntos;
   jugadoresTiempo[playerNumber]=tiempo; // ARRAYS! YES! aca mantengo el tiempo y el puntaje, despues decidimos si mostrar ambas o una sola.
};

function scoreMaker (tiempo) {
   score=baseScore;
   for (i=0; i<tiempo; i++) {
       score= score*modifier; // esto baja el puntaje cada segundo que pasa.
   };
   return score // devuelvo el puntaje final.
};

function displayScore(id) {
   score= scoreMaker()
   document.getElementById(id).innerHTML=score; // Imprime el puntaje final.
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

var tableSize = document.getElementById("pick");

function returnString(a,b) {
    var stringA=a.toString();
    var stringB=b.toString();
    var finalString=stringA+stringB;
    finalString=finalString.toString();

    return finalString;
}

function generateTable () {
    generateMatrix();
    valueAssigner();
    shuffler(shuffleArray);
    /* metodo para limpiar la tabla */
    document.getElementById("tablero").innerHTML = "";
    for (let j=0; j < tableSize.value; j++) {
        document.getElementById("tablero").innerHTML+= '<tr id="row'+j+'"></tr>'
        for (let i=0; i < tableSize.value; i++) {
            document.getElementById("row"+j).innerHTML+= '<td onclick="check(matrix['+j+']['+i+'],'+returnString(j,i)+')"><img src="img/default.png" id="'+j+''+i+'"></td>'
            }
        }
 }

generateTable();

function gameStart() {
    contraReloj(tiempo);
}

getMatrixSize();

function getMatrixSize() {
    matrixSize=document.getElementById("pick").value;
    matrixRows=document.getElementById("pick").value;
    matrixColumns=document.getElementById("pick").value;
    generateTable();
} 
