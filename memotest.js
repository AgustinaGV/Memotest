// DECLARO VARIABLES Y CONSTANTES;

var matrixSize=5; //Dimension de la matriz (5x5, 6x6, etc)
var matrix=[]; // declaro la matriz

for (i=0; i<matrixSize, i++) { //recorre la dimension de la matriz
    matrix.push([]);//agrega un array por posicion de matrixSize
    for (x=0;x<i;x++) {
        matrix[i].push(0);//rellena de la cantidad de 0 necesaria
    }
}

for (i=0; i=board.length;i++) {
    valueAssigner = dameRandom(maxValue);
    imgPath = i;
    for (x=0;x<2;x++) {
        board[dameRandom(boardCap)][dameRandom(boardCap)] = valueAssigner;        
    }
}