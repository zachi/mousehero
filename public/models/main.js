import task from "../pages/task.js"
import sessionForm from "../pages/session-form.js";
import instructions from "../pages/instructions.js";
import theEnd from "../pages/the-end.js";
import settings from "./settings.js";
import router from "./router.js"


onload = function () {

  settings.sessionDate = new Date();
  settings.userId = 'hardcoded id';
  settings.sessionNumber = '112233';
  settings.stimuliSet = 'A';
  settings.taskType = 'test';
  settings.matrixDisplayDuration = 3000;
  settings.imagesFolderPath = `images/Set ${settings.stimuliSet}/result/${settings.taskType}/block ${settings.imagesBlock}/`;
  router.init({
    '/session-form': sessionForm,
    '/instructions': instructions,
    '/task': task,    
    '/the-end': theEnd
  })
  //router.navigate('/session-form');
  router.navigate('/session-form');


}
window.task = task;