
export default (function () {

  var audioDomElement;

  function startInterrupt() {

    audioDomElement.volume = 0.1;
  }

  function stopInterrupt() {
    audioDomElement.volume = 0.4;
  }
  function init(playlistName) {

    audioDomElement = document.getElementById("audio");
    if(playlistName)
      setPlaylist(playlistName);

   }
   function setPlaylist(playlistName){
     audioDomElement.src = playlistName;
   }
   function play() {
     audioDomElement.play();
   }
  return {
    init: init,
    setPlaylist:setPlaylist,
    play: play,
    startInterrupt: startInterrupt,
    stopInterrupt: stopInterrupt
  }
})();