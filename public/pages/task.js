//import matrices from "./matrices.js";
import matrix from "../javascripts/matrix.js";
import matrixCursorEffect from "../javascripts/matrix-cursor-effect.js";
import audio from "../javascripts/audio.js";
import settings from "../javascripts/settings.js";
import utils from "../javascripts/utils.js";
import router from "../javascripts/router.js";

export default (function () {

  var currentStimulus = {
    "name": "fake name",
    "type": "fake type"
  };
  var stageDomElement;
  var currentMatrixIndex = -1;
  var stageOffset;
  var coordinates = [];
  var fixationDomElement;

  var matrices = [
    new matrix('matrix.png'),
    new matrix('matrix.png'),
    // new matrix('matrix.png'),  
    // new matrix('matrix.png'),
    // new matrix('matrix.png'),
    // new matrix('matrix.png'),
    // new matrix('matrix.png'),
    // new matrix('matrix.png'),
    // new matrix('matrix.png'),
    // new matrix('matrix.png')
  ];

  function handleMatrixCursorEffect(e) {

    e.preventDefault();
    var xCoordinate = e.clientX - stageOffset.left;
    var yCoordinate = e.clientY - stageOffset.top;

    matrixCursorEffect.updateCursor(xCoordinate, yCoordinate, e);
    var newStimulus = matrices[currentMatrixIndex].getStimulusByScreenCoordinates(xCoordinate, yCoordinate);
    //console.log(newStimulus.name);
    //console.log('x:' + e.clientX + ' y:' + e.clientY);
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
  
  function handleFixationMouseOver(e) {
    setTimeout(mainExecutionLoop, 500);
  }

  function registerCoordinates(e, xCoordinate, yCoordinate, currentStimulus) {

    coordinates.push({
      userId: settings.userId,
      sessionNumber: settings.sessionNumner,
      sessionDate: settings.sessionDate,
      stimuliSet: settings.stimuliSet,
      taskType: settings.taskType,
      x: xCoordinate,
      y: yCoordinate,
      timestamp: e.timeStamp,
      duration: 0,
      //location:  { type: 'Point', coordinates: [xCoordinate, yCoordinate] },
      stimulusName: currentStimulus.name,
      stimulusType: currentStimulus.type,
      stimulusGender: currentStimulus.gender
    })
    if (coordinates.length == 1)
      return;

    coordinates[coordinates.length - 2].duration =
      coordinates[coordinates.length - 1].timestamp - coordinates[coordinates.length - 2].timestamp;

    // console.log('calculating duration: ' + coordinates[coordinates.length - 2].duration + '=' + coordinates[coordinates.length - 1].timestamp + ' - ' +
    //   coordinates[coordinates.length - 2].timestamp
    // )

  }

  function showMatrix(matrix) {
    //stageDomElement.removeEventListener('mouseover', handleFixationMouseOver)
    stageDomElement.addEventListener('mousemove', handleMatrixCursorEffect)
    fixationDomElement.style.display = 'none';
    stageDomElement.appendChild(matrix.getDomElement());
    matrixCursorEffect.init();

  }

  function showFixation() {
    stageDomElement.removeEventListener('mousemove', handleMatrixCursorEffect)
    //fixationDomElement.addEventListener('mouseover', handleFixationMouseOver)

    fixationDomElement.style.display = '';
    stageDomElement.removeChild(matrices[currentMatrixIndex].getDomElement());
  }

  function istaskEnded(){
    return currentMatrixIndex == matrices.length -1;
  }

  function isTimeForFixation(){
    return stageDomElement.querySelector('.matrix') !== null;
  }

  function mainExecutionLoop() {
    if (istaskEnded()) {
      router.navigate("/theend");
      return;
    }
    if(isTimeForFixation())
    {
      fixationDomElement.style.display = '';
      showFixation();
      //setTimeout(mainExecutionLoop, 1112000);
      return;
    }
    
    currentMatrixIndex++;
    showMatrix(matrices[currentMatrixIndex]);
    setTimeout(mainExecutionLoop, settings.matrixDisplayDuration);
  
  }

  function start() {
    document.body.innerHTML = utils.compileTemplate("task-template");
    fixationDomElement = utils.compileTemplateToDomElement("fixation-template")
    stageDomElement = document.querySelector('.stage');
    stageDomElement.appendChild(fixationDomElement);
    fixationDomElement.addEventListener('mouseover', handleFixationMouseOver)
    stageOffset = {
      "left": stageDomElement.offsetLeft,
      "top": stageDomElement.offsetTop
    };

    mainExecutionLoop();

    //currentMatrix = matrices[0];
    //showMatrix(currentMatrix);
    
    audio.init('audio/chopin-6-2-alianello.mp3');

    audio.play();
    

   
  }

  return {
    start: start,
    getCoordinates: function () {
      return coordinates;
    },
    show: start


  };
}());