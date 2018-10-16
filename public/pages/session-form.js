import utils from "../javascripts/utils.js"
import router from "../javascripts/router.js";
import settings from "../javascripts/settings.js";
import matrix from "../javascripts/matrix.js";


export default (function () {
  function handleContinueClick(e) {
    


    settings.stimuliSet = 'A';
    settings.taskType = 'post';
    settings.imagesBlock = '15';
    settings.imageFolderPath = `images/Set ${settings.stimuliSet}/result/${settings.taskType}/block ${settings.imagesBlock}/`;
    //var mapUrl = __dirname + '/../public/images/Set A/result/post/block 15/map.xml';
    var mapUrl = settings.imageFolderPath + `/map.xml`;
  
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

      router.navigate('/instructions');

  
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

      document.body.innerHTML = utils.compileTemplate("session-form", {});
      document.body.querySelector('.session-form__continue-button').addEventListener('click', handleContinueClick)

    }
  }
})()