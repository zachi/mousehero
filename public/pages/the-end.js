import utils from "../javascripts/utils.js"

export default (function () {

  return {
    show: function () {

      document.body.innerHTML = utils.compileTemplate("the-end-template");
      document.querySelector('.submit').addEventListener('click', () => {
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