import task from "../pages/task.js"
import instructions from "../pages/instructions.js";
import theend from "../pages/the-end.js";
import audio from "./audio.js"
import settings from "./settings.js";
import router from "./router.js"

onload = function () {

  settings.sessionDate = new Date();
  settings.userId = 'hardcoded id';
  settings.sessionNumber = '112233';
  settings.stimuliSet = 'A';
  settings.taskType = 'test';

  router.init({
    '/task':task,
    '/instructions':instructions,
    '/theend':theend
  })
  router.navigate('/instructions');

}
window.task = task;

