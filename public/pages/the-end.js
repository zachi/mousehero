import utils from "../models/utils.js"
import db from "../models/db.js"
import task from "../pages/task.js"


export default (function () {

  return {
    show: function () {

      document.body.innerHTML = utils.compileTemplate("the-end-template");
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

    }
  }
})()