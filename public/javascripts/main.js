import session from "./session.js"
import audio from "./audio.js"
import settings from "./settings.js";

onload = function () {

  setEventsHandling();
  settings.sessionDate = new Date();
  settings.userId = 'hardcoded id';
  settings.sessionNumber = '112233';
  settings.stimuliSet = 'A';
  settings.sessionType = 'test';

}
window.session = session;

function setEventsHandling() {
  audio.init('audio/chopin-6-2-alianello.mp3');
  session.start();
  document.querySelector('.submit').addEventListener('click', () => {
    axios.post('/coordinates', session.getCoordinates())
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  })
}