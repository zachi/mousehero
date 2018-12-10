export default (function () {

  var audioDomElement;

  function startInterrupt() {

    audioDomElement.volume = 0.0;
  }

  function stopInterrupt() {
    audioDomElement.volume = 0.4;
  }

  function init(playlistName) {
    if (!audioDomElement) {
      audioDomElement = document.createElement('audio');
      audioDomElement.id = 'audio';
      audioDomElement.controls = 'controls';
      audioDomElement.type = 'audio/mpeg';
      document.body.appendChild(audioDomElement);
    }
    if (playlistName)
      setPlaylist(playlistName);

  }

  function setPlaylist(playlistName) {
    audioDomElement.src = playlistName;
  }

  function stop(audio) {
    audioDomElement.pause();
    audioDomElement.currentTime = 0;
  }

  function play() {
    audioDomElement.play();
  }
  return {
    init: init,
    setPlaylist: setPlaylist,
    play: play,
    stop, stop,
    startInterrupt: startInterrupt,
    stopInterrupt: stopInterrupt
  }
})();