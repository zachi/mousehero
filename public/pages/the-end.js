import htmlTemplate from "../models/html-template.js"
import db from "../models/db.js"
import task from "../pages/task.js"
import audio from "../models/audio.js"



export default (function () {

  return {
    show: function () {
      htmlTemplate.compile("/templates/the-end.html", {}, function (html) {
        document.body.innerHTML = html;
        audio.stop();
        db.addCoordinates(task.getCoordinates())
      });

    },
    hide: function () {
      var elem = document.querySelector('.the-end');
      elem.parentNode.removeChild(elem);
    }
  }
})()