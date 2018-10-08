import utils from "../javascripts/utils.js"

export default (function () {

  return {
    show: function () {

      document.body.innerHTML = utils.compileTemplate("the-end-template");

    }
  }
})()