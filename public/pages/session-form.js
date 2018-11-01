import utils from "../models/utils.js"
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
    if (!settings.stimuliSet || !settings.userId || !settings.imagesBlock || !settings.measurementTiming) {
      error('please fill all fields');
      return false;
    }

    if (settings.taskType === "training") {
      if (settings.imagesBlock > 12) {
        error('timing and block number don\'t match.');
        return false;
      }
    }
    if (settings.measurementTiming === "pre") {
      if (settings.imagesBlock > 14 || settings.imagesBlock < 13) {
        error('timing and block number don\'t match.');
        return false;
      }
    }

    if (settings.measurementTiming === "post") {
      if (settings.imagesBlock < 15) {
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

    //settings.imagesBlock = '15';
    settings.imagesBlock = document.body.querySelector('select.session-form__block-number').value

    if (!validate())
      return false;

    settings.imageFolderPath = `images/Set ${settings.stimuliSet}/result/${settings.measurementTiming}/block ${settings.imagesBlock}/`;
    //var mapUrl = __dirname + '/../public/images/Set A/result/post/block 15/map.xml';

    settings.sessionDate = new Date();
    //settings.matrixDisplayDuration = 20000;
    settings.matrixDisplayDuration = settings.taskType == 'training' ? 24000 : 6000;

    var mapUrl = settings.imageFolderPath + `map.xml`;
    document.documentElement.webkitRequestFullscreen();
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      //dump(xhr.responseXML.documentElement.nodeName);
      var rows = xhr.responseXML.documentElement.getElementsByTagName('Row');
      var faceIndex = 5;
      var imageIndex = 4;
      var matrices = [];
      for (let imageIndex = 1; imageIndex < rows.length; imageIndex++) {
        //result.Workbook.Worksheet[0].Table[0].Row[imageIndex].Cell[faceIndex].Data[0]
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

      document.body.appendChild( utils.compileTemplateToDomElement("session-form", texts));
      document.body.querySelector('.session-form__continue-button').addEventListener('click', handleContinueClick)

    },
    hide:function(){
      document.body.querySelector('.session-form__continue-button').removeEventListener('click', handleContinueClick)
      var elem = document.querySelector('.session-form');
      elem.parentNode.removeChild(elem);     
    }
  }
})()