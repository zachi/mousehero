import utils from "../models/utils.js"
import router from "../models/router.js";


export default (function () {
  function handleSpacebarClick(e) {
    if (e.key === ' ') {
      document.body.removeEventListener('keydown', handleSpacebarClick)
      router.navigate('/task');
    }
  }
  return {
    show: function () {
      document.body.appendChild( utils.compileTemplateToDomElement("instructions-template", {}));
      document.body.addEventListener('keydown', handleSpacebarClick)

    },
    hide:function(){
      document.body.removeEventListener('keydown', handleSpacebarClick)
      var elem = document.querySelector('.instructions');
      elem.parentNode.removeChild(elem);     
    }
  }
})()