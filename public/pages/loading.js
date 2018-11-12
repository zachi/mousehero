import htmlTemplate from "../models/html-template.js"

export default (function () {
  var hided = false;

  function show() {
    
    htmlTemplate.compileToDomElement("/templates/loading.html", {}, function (element) {
      if (hided) {
        hided = false
        return;
      }
      document.body.appendChild(element);
    });
  }

  function hide() {
    hided = true;
    var elem = document.querySelector('.loading');
    if (elem)
      elem.parentNode.removeChild(elem);
  }

  return {
    show: show,
    hide: hide
  }
})()