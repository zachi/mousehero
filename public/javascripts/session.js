//import matrices from "./matrices.js";
import matrix from "./matrix.js";
import mouse from "./mouse.js";
import audio from "./audio.js";
import settings from "./settings.js";

export default (function () {

  var currentStimulus = {
    "name": "fake name",
    "type": "fake type"
  };
  var matrixDomElement;
  var currentMatrix;
  var matrixOffset;
  var coordinates = [];

  function handleMouseMovement(e) {

    e.preventDefault();
    var xCoordinate = e.clientX - matrixOffset.left;
    var yCoordinate = e.clientY - matrixOffset.top;

    mouse.updateCursor(xCoordinate, yCoordinate, e);
    var newStimulus = currentMatrix.getStimulusByScreenCoordinates(xCoordinate, yCoordinate);
    console.log(newStimulus.name);
    console.log('x:' + e.clientX + ' y:' + e.clientY);
    if (newStimulus.name !== currentStimulus.name) {
      if (newStimulus.type !== currentStimulus.type) {

        console.log('type change');
        if (newStimulus.type === 'aversive')
          audio.startInterrupt();
        else
          audio.stopInterrupt();
      }

    }
    currentStimulus = newStimulus;
    registerCoordinates(e, xCoordinate, yCoordinate, currentStimulus);
  }

  function registerCoordinates(e, xCoordinate, yCoordinate, currentStimulus){
    
    coordinates.push({
      userId: settings.userId,
      sessionNumber: settings.sessionNumner,
      sessionDate: settings.sessionDate,
      stimuliSet: settings.stimuliSet,
      sessionType: settings.sessionType,
      x: xCoordinate,
      y: yCoordinate,
      timestamp: e.timeStamp,
      duration: 0, 
      //location:  { type: 'Point', coordinates: [xCoordinate, yCoordinate] },
      stimulusName: currentStimulus.name,
      stimulusType: currentStimulus.type,
      stimulusGender: currentStimulus.gender
    })
    if(coordinates.length == 1)
      return;

    coordinates[coordinates.length - 2].duration = 
      coordinates[coordinates.length - 1].timestamp - coordinates[coordinates.length - 2].timestamp;
      
      console.log('calculating duration: ' + coordinates[coordinates.length - 2].duration + '='      + coordinates[coordinates.length - 1].timestamp +' - ' + 
      coordinates[coordinates.length - 2].timestamp
      )

  }

  function renderMatrix() {
    
    matrixDomElement.innerHTML =
      '<div class="background-image"></div>' +
      '<div class="cursor-circle cursor-circle__inner"></div>' +
      '<div class="cursor-circle cursor-circle__middle"></div>' +
      '<div class="cursor-circle cursor-circle__outer"></div>';
  }

  return {
    start: function () {
      matrixDomElement = document.querySelector('.matrix');
      matrixOffset = {
        "left": matrixDomElement.offsetLeft,
        "top": matrixDomElement.offsetTop
      };
      currentMatrix = new matrix();
      renderMatrix(currentMatrix);
      mouse.init();
      //audio.play();
      //mask2 = document.querySelector('#mask2 circle');
      //document.body.onmousemove = handleMouseMovement;
      matrixDomElement.addEventListener('mousemove', handleMouseMovement)

      // for (let index = 0; index < matrices.length; index++) {
      //   hideMarix(matrix);
      //   matrix = matrices[index];
      //   showMatrix(matrix);         
      // }

    },
    getCoordinates: function () {
      return coordinates;
    }

  };
}());