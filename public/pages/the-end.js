import htmlTemplate from "../models/html-template.js"
import db from "../models/db.js"
import task from "../pages/task.js"


export default (function () {

  return {
    show: function () {
      htmlTemplate.compile("/templates/the-end.html", {}, function (html) {

        document.body.innerHTML = html;
        document.querySelector('.submit').addEventListener('click', () => {
          db.addCoordinates(task.getCoordinates())
          axios.post('/coordinates', task.getCoordinates())
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });

        })
      });

    }
  }
})()