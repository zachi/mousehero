import "stimulusType";
import "matrix";
var matrices = (function(){
// var matrixCoordinates = [
//     [{"x":0,"y":0},{"x":225,"y":0},{"x":450,"y":0},{"x":675,"y":0}],
//     [{"x":0,"y":225},{"x":225,"y":225},{"x":450,"y":225},{"x":675,"y":225}],
//     [{"x":0,"y":450},{"x":225,"y":450},{"x":450,"y":450},{"x":675,"y":450}],
//     [{"x":0,"y":675},{"x":225,"y":675},{"x":450,"y":675},{"x":675,"y":675}]
// ];

// for (let i = 0; i < 4; i++) {
//     for (let j = 0; j < 4; j++) {
//         matrixCoordinates[i].push({"x":(j* 225), "y":(i*225)});
        
//     }
    
// }


function getCoordinatesInfo(coordinates){
       
    currentMatrix = new matrix();
    matrixIndexX = Math.floor(coordinates.x / 225);
    matrixIndexY = Math.floor(coordinates.y / 225);

    return currentMatrix.stimuli[matrixIndexX, matrixIndexY];
}
    return{
        getCoordinatesInfo:getCoordinatesInfo

    }


})();