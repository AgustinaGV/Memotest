// DECLARO VARIABLES Y CONSTANTES;

var matrixSize = 4; // Establezco el tamaño que va a tener la matrix;
var matrix = []; // Genero la matriz que va a ser bidimensional;
var counter; // Counter me va a servir para poder recorrer matrix en relacion a los distintos tamaños que va a elegir el usuario;
var imgPath = [];


// FUNCIONES; 

// generateArrays() le agrega arrays anidados a matrix [], y le agrega posiciones a cada uno en la misma cantidad y valor;
function generateArrays () {
    
    for (let i=0; i<matrixSize; i++) { // Recorre la dimension de la matriz;
        matrix.push([]); // Agrega un array por posicion de matrixSize;
        for (let x=0; x<i ; x++) {
            matrix[i].push(0); // Agrega posiciones a los arrays anidados, dandoles valor 0;
    }
}
}

// assigner() toma dos posiciones random dentro de matrix [] y les asigna valor de a pares. El valor se va a asignar en funcion a un array de strings que va a tener las src de los distintos pares del memotest;
function assigner () {

    counter = (matrixSize * matrixSize)/2; //matrixSize al cuadrado, se divide x2 porque en esta funcion asignamos valores de a pares;
    for (let i=0; i=counter; i++) { // 
        valueAssigner = imgPath[i]; // randomValue va a asignar a los pares la posicion [i] dentro del array imgPath (array de strings con la SRC de las imagenes del memotest);
        for (let x=0; x<2; x++) {
            matrix[randomValue(matrixSize)][randomValue(matrixSize)] = i; // este for anidado va a "elegir" dos posiciones de matrix [] en base a random, y les va a asignar imgPath [i];
    }
}
}

function randomValue (max) {

    return Math.floor (Math.random () * max);
    
}
