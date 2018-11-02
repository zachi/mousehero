//import matrices from "./matrices.js";
import matrix from "../models/matrix.js";
import emotionTypes from "../models/emotionTypes.js"
import matrixCursorEffect from "../models/matrix-cursor-effect.js";
import audio from "../models/audio.js";
import settings from "../models/settings.js";
import utils from "../models/utils.js";
import router from "../models/router.js";


export default (function () {

  const blankStimulus = {
    "name": "fake name",
    "type": "fake type"
  };
  var currentStimulus = blankStimulus;
  var stageDomElement;
  var currentMatrixIndex = -1;
  var nextMatrixElement;
  var stageOffset;
  var coordinates = [];
  var fixationDomElement;
  var cursorOnFixationTimeout;

  var matrices = [
    // new matrix('matrix.png'),
    // new matrix('matrix.png'),
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
    //console.log('x:' + e.clientX + ' y:' + e.clientY);
    e.preventDefault();
    var xCoordinate = e.clientX - stageOffset.left;
    var yCoordinate = e.clientY - stageOffset.top;

    matrixCursorEffect.updateCursor(xCoordinate, yCoordinate, e);
    var newStimulus = matrices[currentMatrixIndex].getStimulusByScreenCoordinates(xCoordinate, yCoordinate);
    //console.log(newStimulus.name);
    //console.log('x:' + e.clientX + ' y:' + e.clientY);
    if (settings.taskType === 'training' &&
      newStimulus.name !== currentStimulus.name &&
      newStimulus.type !== currentStimulus.type) {
      console.log('type change');
      if (newStimulus.type === emotionTypes.avarsive)
        audio.startInterrupt();
      else
        audio.stopInterrupt();
    }
    currentStimulus = newStimulus;
    registerCoordinates(e, xCoordinate, yCoordinate, currentStimulus);
  }

  function handleFixationMouseOver(e) {
    //console.log('over');
    cursorOnFixationTimeout = setTimeout(() => {

      console.log('enough time on fixation');
      mainExecutionLoop();

    }, 2000);

  }

  function handleFixationMouseOut(e) {
    clearTimeout(cursorOnFixationTimeout);
    //console.log('out');
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

  function loaAndHideMatrix(matrix) {

    nextMatrixElement = matrix.getDomElement();
    nextMatrixElement.classList.add('matrix--loaded-hidden');
    stageDomElement.prepend(nextMatrixElement);

  }

  function removePreviousDisplayedElement(){
    var previousMatrix = document.querySelector('.matrix:not(.matrix--loaded-hidden)');
    if(previousMatrix)
      stageDomElement.removeChild(previousMatrix);
    if(fixationDomElement && fixationDomElement.style.display !== 'none')
      fixationDomElement.style.display = 'none';
    
  }

  function showCurrentMatrix() {

    removePreviousDisplayedElement();
    currentStimulus = blankStimulus;
    showMatrix(matrices[currentMatrixIndex]);
    if (currentMatrixIndex < matrices.length - 1) {
      loaAndHideMatrix(matrices[currentMatrixIndex + 1]);
    }
  }

  function showMatrix(matrix) {
    stageDomElement.addEventListener('mousemove', handleMatrixCursorEffect)
    nextMatrixElement.classList.remove('matrix--loaded-hidden');
    matrixCursorEffect.init();
    handleMatrixCursorEffect(getMatrixCursorInitialPosition())
  }

  function getMatrixCursorInitialPosition() {
    if (settings.taskType == 'training' && coordinates.length > 0) {
      var lastPosition = coordinates[coordinates.length - 1];
      return {
        clientX: lastPosition.x + stageOffset.left,
        clientY: lastPosition.y + stageOffset.top,
        preventDefault: function () {}
      };
    }
    return {
      clientX: document.body.clientWidth / 2,
      clientY: document.body.clientHeight / 2,
      preventDefault: function () {}
    };

  }

  function showFixation() {

    stageDomElement.removeEventListener('mousemove', handleMatrixCursorEffect)
    fixationDomElement.addEventListener('mouseover', handleFixationMouseOver)
    removePreviousDisplayedElement();
    fixationDomElement.style.display = '';
    
  }

  function isEndOfTask() {
    return currentMatrixIndex == matrices.length - 1;
  }

  function isTimeForFixation() {
    return settings.taskType == 'measurement' && fixationDomElement.style.display == 'none';
  }

  function mainExecutionLoop() {

    if (isEndOfTask()) {
      router.navigate("/the-end");
      return;
    }
    if (isTimeForFixation()) {
      showFixation();
      return;
    }

    currentMatrixIndex++;
    showCurrentMatrix();
    setTimeout(mainExecutionLoop, settings.matrixDisplayDuration);

  }

  function show() {
    document.body.innerHTML = utils.compileTemplate("task-template");
    stageDomElement = document.querySelector('.stage');

    if(settings.taskType == 'measurement')
    {
      fixationDomElement = utils.compileTemplateToDomElement("fixation-template")
      stageDomElement.appendChild(fixationDomElement);
      fixationDomElement.addEventListener('mouseover', handleFixationMouseOver)
      fixationDomElement.addEventListener('mouseout', handleFixationMouseOut)
    }

    stageOffset = {
      "left": stageDomElement.offsetLeft,
      "top": stageDomElement.offsetTop
    };
    matrices = settings.matrices;
    //preload first matrix image
    loaAndHideMatrix(matrices[0])
    mainExecutionLoop();

    if (settings.taskType == 'training') {
      audio.play();
    }

  }

  return {

    getCoordinates: function () {
      return coordinates;
    },
    show: show,
    hide: function () {
      var elem = document.querySelector('.task');
      elem.parentNode.removeChild(elem);
    }

  };
}());