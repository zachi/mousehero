import router from "./router.js"

import task from "../pages/task.js"
import sessionForm from "../pages/session-form.js";
import instructions from "../pages/instructions.js";
import theEnd from "../pages/the-end.js";
import musicSelection from "../pages/music-selection.js";
import loading from "../pages/loading.js";


onload = function () {

  router.init({
    '/session-form': sessionForm,
    '/instructions': instructions,
    '/task': task,    
    '/the-end': theEnd,
    '/music-selection':musicSelection,
    '/loading': loading
  })
  router.navigate('/loading');
}

window.applicationCache.addEventListener('noupdate', gotoSessionForm, false);
window.applicationCache.addEventListener('cached', gotoSessionForm, false);

function gotoSessionForm(){
  
  router.navigate('/session-form');
}