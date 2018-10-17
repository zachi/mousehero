import task from "../pages/task.js"
import sessionForm from "../pages/session-form.js";
import instructions from "../pages/instructions.js";
import theEnd from "../pages/the-end.js";
import settings from "./settings.js";
import router from "./router.js"


onload = function () {

  router.init({
    '/session-form': sessionForm,
    '/instructions': instructions,
    '/task': task,    
    '/the-end': theEnd
  })
  router.navigate('/session-form');
  
}
window.task = task;