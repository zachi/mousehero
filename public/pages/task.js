//import matrices from "./matrices.js";
import matrix from "../models/matrix.js";
import emotionTypes from "../models/emotionTypes.js"
import matrixCursorEffect from "../models/matrix-cursor-effect.js";
import audio from "../models/audio.js";
import settings from "../models/settings.js";
import htmlTemplate from "../models/html-template.js"
import router from "../models/router.js";


export default (function () {

  const blankStimulus = {
    "name": "blank",
    "type": "blank"
  };

  const outOfMatrixStimulus = {
    "name": "outOfMatrix",
    "stimulusType": "",
    "stimulusGender": ""
  };

  var currentStimulus = blankStimulus;
  var stageDomElement;
  var currentMatrixIndex = -1;

  var stageOffset;
  var coordinates = [];
  var fixationDomElement;
  var cursorOnFixationTimeout;
  var startingTaskTimestamp;
  var matrices = [];

  function handleMouseMoveEvent(e) {
    //console.log('x:' + e.clientX + ' y:' + e.clientY);
    e.preventDefault();
    var xCoordinate = e.clientX - stageOffset.left;
    var yCoordinate = e.clientY - stageOffset.top;
    matrixCursorEffect.updateCursor(xCoordinate, yCoordinate);
    var newStimulus = matrices[currentMatrixIndex].getStimulusByScreenCoordinates(xCoordinate, yCoordinate);
    //console.log(newStimulus.name + '\nx:' + e.clientX + ' y:' + e.clientY);
    handleAudioFollowingMouseMove(currentStimulus, newStimulus);
    currentStimulus = newStimulus;
    registerCoordinates(xCoordinate, yCoordinate, currentStimulus);
  }

  function handleAudioFollowingMouseMove(currentStimulus, newStimulus) {
    if (settings.taskType === 'training' &&
      newStimulus.name !== currentStimulus.name &&
      newStimulus.type !== currentStimulus.type) {
      //console.log('type change');
      if (newStimulus.type === emotionTypes.avarsive)
        audio.startInterrupt();
      else
        audio.stopInterrupt();
    }
  }

  function applyAudioByStimulus(stimulus) {
      if (stimulus.type === emotionTypes.avarsive)
        audioStartInterrupt();
      else
        audioStopInterrupt();
    
  }

  function handleFixationMouseOver(e) {
    //console.log('over');
    cursorOnFixationTimeout = setTimeout(() => {

      //console.log('enough time on fixation');
      mainExecutionLoop();
      //training sessions will run till here only once (only one fixation at the beginning)
      if (settings.taskType == 'training') {
        audio.play();
      }

    }, 2000);

  }

  function handleFixationMouseOut(e) {
    clearTimeout(cursorOnFixationTimeout);
    //console.log('out');
  }

  function registerCoordinates(xCoordinate, yCoordinate, currentStimulus) {

    coordinates.push({
      userId: settings.userId,
      blockNumber: settings.blockNumber,
      sessionDate: settings.sessionDate,
      stimuliSet: settings.stimuliSet,
      taskType: settings.taskType,
      x: xCoordinate,
      y: yCoordinate,
      timestamp: Date.now() - startingTaskTimestamp,
      duration: 0,
      stimulusName: currentStimulus.name,
      stimulusType: currentStimulus.type,
      image: matrices[currentMatrixIndex].imageName
    })

    setDurationOfPreviousCoordinate(coordinates[coordinates.length - 1].timestamp);

    //console.log(matrices[currentMatrixIndex].imageName)
    //console.log(coordinates[coordinates.length - 1].timestamp)

    // console.log('calculating duration: ' + coordinates[coordinates.length - 2].duration + '=' + coordinates[coordinates.length - 1].timestamp + ' - ' +
    //   coordinates[coordinates.length - 2].timestamp
    // )

  }

  function loaAndHideMatrix(matrix) {

    var nextMatrixElement = matrix.getDomElement();
    nextMatrixElement.classList.add('matrix--loaded-hidden');
    stageDomElement.prepend(nextMatrixElement);

  }

  function finalizeDurationOfLastCoordinate() {
    coordinates[coordinates.length - 1].duration =
      Date.now() - startingTaskTimestamp - coordinates[coordinates.length - 1].timestamp;
    //console.log('finalizing duration of ' + coordinates[coordinates.length - 1].duration)
  }


  function removePreviousDisplayedElement() {
    var previousMatrix = document.querySelector('.matrix:not(.matrix--loaded-hidden)');
    if (previousMatrix) {

      stageDomElement.removeChild(previousMatrix);
      finalizeDurationOfLastCoordinate()
    }
    if (fixationDomElement && fixationDomElement.style.display !== 'none')
      fixationDomElement.style.display = 'none';

  }

  function showCurrentMatrix() {

    removePreviousDisplayedElement();
    currentStimulus = blankStimulus; //reset current hovered face
    showMatrix(matrices[currentMatrixIndex]);
    if (currentMatrixIndex < matrices.length - 1) {
      loaAndHideMatrix(matrices[currentMatrixIndex + 1]);
    }
  }

  function showMatrix(matrix) {
    stageDomElement.addEventListener('mousemove', handleMouseMoveEvent);
    stageDomElement.addEventListener('mouseleave', handleCursorOutOfMatrix);

    //we handle cursor position and mouse position separateley cause when mouse is 'outOfMatrix' 
    //they are not them same.

    matrix.getDomElement().classList.remove('matrix--loaded-hidden');
    matrixCursorEffect.init();
    var cursorPosition = getMatrixCursorInitialPosition();
    matrixCursorEffect.updateCursor(cursorPosition.xCoordinate, cursorPosition.yCoordinate);

    var mousePosition = getMatrixMouseInitialPosition();
    currentStimulus = matrices[currentMatrixIndex].getStimulusByScreenCoordinates(mousePosition.xCoordinate, mousePosition.yCoordinate);
    applyAudioByStimulus(currentStimulus);
    var registerStimulus = currentStimulus.name === blankStimulus.name ? outOfMatrixStimulus : currentStimulus;
    registerCoordinates(mousePosition.xCoordinate, mousePosition.yCoordinate, registerStimulus);
  }

  function getMatrixMouseInitialPosition() {

    if (settings.taskType == 'training' && coordinates.length > 0) {
      var lastPosition = coordinates[coordinates.length - 1];
      return {
        xCoordinate: lastPosition.x,
        yCoordinate: lastPosition.y
      };
    }
    return {
      xCoordinate: Math.round(document.body.clientWidth / 2) - stageOffset.left,
      yCoordinate: Math.round(document.body.clientHeight / 2) - stageOffset.top
    };

  }

  function getMatrixCursorInitialPosition() {
    if (settings.taskType == 'training' && coordinates.length > 0) {
      var lastPosition = coordinates[coordinates.length - 1];
      if (lastPosition.stimulusName === "outOfMatrix") {
        lastPosition = coordinates[coordinates.length - 2];
      }
      return {
        xCoordinate: lastPosition.x,
        yCoordinate: lastPosition.y
      };
    }
    return {
      xCoordinate: Math.round(document.body.clientWidth / 2) - stageOffset.left,
      yCoordinate: Math.round(document.body.clientHeight / 2) - stageOffset.top
    };

  }

  function audioStartInterrupt() {
    if (settings.taskType == 'training')
      audio.startInterrupt();
  }

  function audioStopInterrupt() {
    if (settings.taskType == 'training')
      audio.stopInterrupt();
  }

  function handleCursorOutOfMatrix() {
    audioStartInterrupt();
    currentStimulus = blankStimulus;
    registerCoordinates(-1, -1, outOfMatrixStimulus);
  }

  function showFixation() {

    setDurationOfPreviousCoordinate(Date.now() - startingTaskTimestamp);
    stageDomElement.removeEventListener('mousemove', handleMouseMoveEvent);
    stageDomElement.removeEventListener('mouseleave', handleCursorOutOfMatrix);

    fixationDomElement.addEventListener('mouseover', handleFixationMouseOver)
    removePreviousDisplayedElement();
    fixationDomElement.style.display = '';

  }

  function setDurationOfPreviousCoordinate(timestamp) {
    if (coordinates.length < 2 || coordinates[coordinates.length - 2].duration)
      return;
    coordinates[coordinates.length - 2].duration = timestamp - coordinates[coordinates.length - 2].timestamp;

  }

  function isEndOfTask() {
    return currentMatrixIndex == matrices.length - 1;
  }

  function isTimeForFixation() {
    if(fixationDomElement.style.display != 'none')
      return false;
    if(currentMatrixIndex == -1)
      return true;
    return settings.taskType == 'measurement';
  }

  function mainExecutionLoop() {

    if (isEndOfTask()) {
      finalizeDurationOfLastCoordinate();
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

  function loadTemplates(callback) {
    var loadCounter = 0;
    htmlTemplate.compileToDomElement("/templates/task.html", null, function (element) {
      //document.body.innerHTML = html;
      document.body.appendChild(element)

      loadCounter++;
      if (loadCounter == 2)
        callback();
    });
    htmlTemplate.compileToDomElement("/templates/fixation.html", null, function (element) {
      fixationDomElement = element;
      loadCounter++;
      if (loadCounter == 2)
        callback();
    })

  }

  function show() {
    loadTemplates(function () {
      startingTaskTimestamp = Date.now()
      stageDomElement = document.querySelector('.stage');

        stageDomElement.appendChild(fixationDomElement);
        fixationDomElement.addEventListener('mouseover', handleFixationMouseOver)
        fixationDomElement.addEventListener('mouseout', handleFixationMouseOut)

      stageOffset = {
        "left": stageDomElement.offsetLeft,
        "top": stageDomElement.offsetTop
      };
      matrices = settings.matrices;
      //preload first matrix image
      loaAndHideMatrix(matrices[0])
      mainExecutionLoop();

    })
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