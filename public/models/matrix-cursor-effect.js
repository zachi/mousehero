import settings from "./settings.js";

export default (function () {

  var magnifierLayers = [];

  function updateCursor(upX, upY, e) {

    for (let index = 0; index < magnifierLayers.length; index++) {
      var layer = magnifierLayers[index];
      layer.element.style.left = (upX - layer.radius) + 'px';
      layer.element.style.top = (upY - layer.radius) + 'px';
      layer.element.style.backgroundPositionX = (settings.imageSideLength + layer.radius - upX) + 'px';
      layer.element.style.backgroundPositionY = (settings.imageSideLength + layer.radius - upY) + 'px';
    }
  }
  return {

    init: function () {
      magnifierLayers = [];
      var elements = document.querySelectorAll('.stage .cursor-circle');
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        magnifierLayers.push({
          element: element,
          radius: parseInt(element.style.width, 10) / 2
        })
      }
    },
    updateCursor: updateCursor
  }
})();