//import matrix from "./matrix.js";

export default (function () {
  var cursorCircleInner;
  var cursorCircleOuter;
  var cursorCircleMiddle;

  var cursorInnerRadius = 50;
  var cursorOuterRadius = 100;
  var cursorMiddleRadius = 60;

  var imageSide = 900;
function updateCursor(upX, upY, e){

  cursorCircleInner.style.left = (upX - cursorInnerRadius) + 'px';
    cursorCircleInner.style.top = (upY - cursorInnerRadius) + 'px';
    cursorCircleInner.style.backgroundPositionX = (imageSide + cursorInnerRadius - upX) + 'px';
    cursorCircleInner.style.backgroundPositionY = (imageSide + cursorInnerRadius - upY) + 'px';

    cursorCircleOuter.style.left = (upX - cursorOuterRadius) + 'px';
    cursorCircleOuter.style.top = (upY - cursorOuterRadius) + 'px';
    cursorCircleOuter.style.backgroundPositionX = (imageSide + cursorOuterRadius - upX) + 'px';
    cursorCircleOuter.style.backgroundPositionY = (imageSide + cursorOuterRadius - upY) + 'px';
    
    cursorCircleMiddle.style.left = (upX - cursorMiddleRadius) + 'px';
    cursorCircleMiddle.style.top = (upY - cursorMiddleRadius) + 'px';
    cursorCircleMiddle.style.backgroundPositionX = (imageSide + cursorMiddleRadius - upX) + 'px';
    cursorCircleMiddle.style.backgroundPositionY = (imageSide + cursorMiddleRadius - upY) + 'px';


}
  return{

    init:function(){
      cursorCircleInner = document.querySelector('.stage .cursor-circle__inner');
      cursorCircleOuter = document.querySelector('.stage .cursor-circle__outer');
      cursorCircleMiddle = document.querySelector('.stage .cursor-circle__middle');

    },
    updateCursor:updateCursor
  }
})();