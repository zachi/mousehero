import htmlTemplate from "../models/html-template.js"
import router from "../models/router.js";
import settings from "../models/settings.js";
import matrix from "../models/matrix.js";
import texts from "../models/texts.js"

export default (function () {
  function error(msg) {
    document.body.querySelector('.session-form__error').innerText = msg;

  }

  function validate() {
    error('');
    if (!settings.stimuliSet || !settings.userId || !settings.blockNumber || !settings.measurementTiming) {
      error('please fill all fields');
      return false;
    }

    if (settings.taskType === "training") {
      if (settings.blockNumber > 12) {
        error('timing and block number don\'t match.');
        return false;
      }
    }
    if (settings.measurementTiming === "pre") {
      if (settings.blockNumber > 14 || settings.blockNumber < 13) {
        error('timing and block number don\'t match.');
        return false;
      }
    }

    if (settings.measurementTiming === "post") {
      if (settings.blockNumber < 15) {
        error('timing and block number don\'t match.');
        return false;
      }
    }

    return true;
  }

  function handleContinueClick(e) {

    settings.userId = document.body.querySelector('.session-form__subject-id').value;

    //settings.stimuliSet = 'A';
    settings.stimuliSet = document.body.querySelector('.session-form__set').value;

    //settings.measurementTiming = 'post';
    settings.measurementTiming = document.body.querySelector('select.session-form__measurement-timing').value

    settings.taskType = settings.measurementTiming == 'training' ? 'training' : 'measurement';

    //settings.blockNumber = '15';
    settings.blockNumber = document.body.querySelector('select.session-form__block-number').value

    if (!validate())
      return false;

    settings.imageFolderPath = `images/Set ${settings.stimuliSet}/result/${settings.measurementTiming}/block ${settings.blockNumber}/`;
    //var mapUrl = __dirname + '/../public/images/Set A/result/post/block 15/map.xml';

    settings.sessionDate = new Date();
    settings.matrixDisplayDuration = settings.taskType == 'training' ? settings.matrixDisplayDurationTraining : settings.matrixDisplayDurationMeasurement;

    var mapUrl = settings.imageFolderPath + `map.xml`;
    document.documentElement.webkitRequestFullscreen();
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      //dump(xhr.responseXML.documentElement.nodeName);
      var rows = xhr.responseXML.documentElement.getElementsByTagName('Row');
      var matrices = [];
      var numberOfTrials = rows.length;
      if(settings.numberOfTrialsOverride)
        numberOfTrials = settings.numberOfTrialsOverride;
      for (let imageIndex = 1; imageIndex < numberOfTrials; imageIndex++) {
        matrices.push(
          new matrix(rows[imageIndex].children)
        )
      }

      settings.matrices = matrices;
      router.navigate(settings.taskType == 'training' ? '/music-selection' : '/instructions');
    }
    xhr.onerror = function () {
      dump("Error while getting XML.");
    }
    xhr.open("GET", mapUrl);
    xhr.responseType = "document";
    xhr.send();

  }

  return {
    show: function () {

      htmlTemplate.compileToDomElement("/templates/session-form.html", texts, function (html) {
        document.body.appendChild(html);
        document.body.querySelector('.session-form__continue-button').addEventListener('click', handleContinueClick)

      });

    },
    hide: function () {
      document.body.querySelector('.session-form__continue-button').removeEventListener('click', handleContinueClick)
      var elem = document.querySelector('.session-form');
      elem.parentNode.removeChild(elem);
    }
  }
})()