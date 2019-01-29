import router from "./router.js"
import task from "../pages/task.js"
import sessionForm from "../pages/session-form.js";
import instructions from "../pages/instructions.js";
import theEnd from "../pages/the-end.js";
import musicSelection from "../pages/music-selection.js";
import loading from "../pages/loading.js";
import admin from "../pages/admin.js";
import db from "./db.js";
import settings from "./settings.js";

onload = function () {

    router.init({
      '/session-form': sessionForm,
      '/instructions': instructions,
      '/task': task,
      '/the-end': theEnd,
      '/music-selection': musicSelection,
      '/loading': loading,
      '/admin': admin
    })
    router.navigate('/loading');

    db.init();
    //window.db = db;
    settings.initDBFields();
    //   //for debugging cached is cancelled
    //   if (window.applicationCache.status === window.applicationCache.UNCACHED) {
    //     gotoSessionForm();
    //   }
    // }

    // window.applicationCache.addEventListener('noupdate', gotoSessionForm, false);
    // window.applicationCache.addEventListener('cached', gotoSessionForm, false);
    // window.applicationCache.addEventListener('updateready', gotoSessionForm, false);

    // //when offline, browser still trying to fetch manifest file and throws an error.
    // //http://www.kaspertidemann.com/regarding-the-manifest-fetch-failed-error-in-chrome/
    // window.applicationCache.onerror = function (e) {
    //   gotoSessionForm();
    // }

    function gotoSessionForm() {
      router.navigate('/session-form');
    }

    document.addEventListener("keydown", function (zEvent) {
      if (zEvent.ctrlKey && zEvent.altKey && zEvent.code === "KeyL") {
        router.navigate('/admin');
      }
    });

    if (!navigator.onLine) {
      gotoSessionForm();
      return;
    }
    if ('serviceWorker' in navigator) {
      console.log('Site caching started.');
      navigator.serviceWorker.register('/service-worker.js')
        .then(function (registration) {

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // At this point, the old content will have been purged and
                  // the fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in your web app.
                  console.log('New content is available; please refresh.');
                } else {
                  // At this point, everything has been precached.
                  // It's the perfect time to display a
                  // "Content is cached for offline use." message.
                  console.log('Site is cached for offline use.');
                  gotoSessionForm();
                }
              }
            };
          }
        })
        .catch(function (error) {
          console.log('Service worker registration failed, error:', error);
        });
    }
  }