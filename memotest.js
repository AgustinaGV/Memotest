// DECLARO VARIABLES Y CONSTANTES;
var matrixSize=5; //Dimension de la matriz (5x5, 6x6, etc)
var matrixRows = 5; //Dimension de la matriz (5x5, 6x6, etc)
var matrixColumns = matrixRows;
var matrix=[]; // declaro la matriz
var puntos; //
var tiempo; //declaro variable que guarda el tiempo
let clock; // declaro variable que guarda el setInterval
var jugadores; //variable que guarda los jugadores
var jugadoresTiempo=[]; //declaro un array donde llevo el tiempo de cada jugador.
var jugadoresPuntaje=[]; //declaro un array donde llevo el puntaje de cada jugador.
var baseScore=1000; // puntaje base
const modifier=0.95; // El valor por el cual se divide el puntaje por cada segundo que el jugador tardo.

function generateMatrix () {
    for (let i=0; i<matrixRows; i++) { //recorre la dimension de la matriz
    matrix.push([]);//agrega un array por posicion de matrixSize
    for (let j=0; j<matrixColumns; j++) {
        matrix[i].push(0);//rellena de la cantidad de 0 necesaria
        }
    }
}

function asignateImgs () {
    for (i=0; i=board.length;i++) {
    valueAssigner = dameRandom(maxValue);
    imgPath = i;
    for (x=0;x<2;x++) {
        board[dameRandom(boardCap)][dameRandom(boardCap)] = valueAssigner;
        }
    }
}
//Lógica de jugador - Time Deathmatch
function contraReloj (tiempo) {
       generarJugadores();
       clock=setInterval(raceTime(tiempo),1000); // Comienza la cuenta del reloj
};

function finish() {
   clearInterval(clock); // freno el reloj
   displayScore(/* insertar id del elemento que muestra el puntaje */); // dependiendo de cómo querramos avanzar la parte visual esta funcion va a hacerse un poco mas larga
};
function generarJugadores (id) { // Esta función genera los espacios para asignar los valores dentro del array, ya que sino devolveria error por no tener una posicion en el array.
   jugadores=document.getElementById(id).value;
   for (i=0; i< jugadores; i++) {
       jugadoresPuntaje.push("N/A");
       jugadoresTiempo.push("N/A");
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