import htmlTemplate from "../models/html-template.js"
import router from "../models/router.js";
import settings from "../models/settings.js";


export default (function () {
  var rootElement;

  function handleSpacebarClick(e) {
    if (e.key !== ' ')
      return;
    if (rootElement.classList.contains('instructions--matrix-first') && settings.taskType === 'training') {   
      rootElement.classList.remove('instructions--matrix-first');
      rootElement.classList.add('instructions--matrix-second');
      return;
    }
    if (rootElement.classList.contains('instructions--matrix-first') && settings.taskType === 'measurement') {   
      rootElement.classList.remove('instructions--matrix-first');
      rootElement.classList.add('instructions--fixation');
      return;
    }
    if (rootElement.classList.contains('instructions--fixation') ) {   
      rootElement.classList.remove('instructions--fixation');
      rootElement.classList.add('instructions--matrix-second');
      return;
    }
    if (rootElement.classList.contains('instructions--matrix-second')) {
      rootElement.classList.remove('instructions--matrix-second');
      document.body.removeEventListener('keydown', handleSpacebarClick)
      router.navigate('/task');
    }

  }

  return {
    show: function () {
      (htmlTemplate.compileToDomElement("/templates/instructions.html", {}, function(html){
        document.body.appendChild(html)
        rootElement = document.querySelector('.instructions');
        rootElement.classList.add('instructions--matrix-first');
        document.body.addEventListener('keydown', handleSpacebarClick)
      }));
      

    },
    hide: function () {
      document.body.removeEventListener('keydown', handleSpacebarClick)
      var elem = document.querySelector('.instructions');
      elem.parentNode.removeChild(elem);
    }
  }
})()