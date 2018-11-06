import utils from "../models/utils.js"
import router from "../models/router.js";
import settings from "../models/settings.js";


export default (function () {


  return {
    show: function () {
      document.body.appendChild(utils.compileTemplateToDomElement("loading-template", {}));
    },
    hide: function () {
      var elem = document.querySelector('.preloader');
      elem.parentNode.removeChild(elem);
    }
  }
})()