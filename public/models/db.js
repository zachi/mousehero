export default (function () {
  var db;

  function init() {
    if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
    var request = window.indexedDB.open("mousehero", 1);

    request.onerror = function (event) {
      alert("Why didn't you allow my web app to use IndexedDB?!");
    };
    request.onsuccess = function (event) {
      db = event.target.result;
    };
    request.onupgradeneeded = function (event) {

      db = event.target.result;
      db.onerror = function (event) {
        alert("Database error: " + event.target.errorCode);
      };
      var objectStore = db.createObjectStore("coordinates",{autoIncrement:true});//, {        keyPath: "userId"      });


    };
  }

  function addCoordinates(coordinates) {
    var transaction = db.transaction(["coordinates"], "readwrite");
    // Do something when all the data is added to the database.
    transaction.oncomplete = function (event) {
      alert("All done!");
    };

    transaction.onerror = function (event) {
      // Don't forget to handle errors!
    };
    var t;
    var objectStore = transaction.objectStore("coordinates");
    coordinates.forEach(function (coordinate) {
      var request = objectStore.add(coordinate);
      request.onsuccess = function (event) {
        t = 0; // event.target.result === customer.ssn;
      };
    });
  }

  function getCoordinates() {
    var transaction = db.transaction(["coordinates"]);
    var objectStore = transaction.objectStore("coordinates");
    var request = objectStore.get("ddd");
    request.onerror = function (event) {
      // Handle errors!
    };
    request.onsuccess = function (event) {
      // Do something with the request.result!
      console.log(request.result);
    };
  }
  return {
    init: init,
    addCoordinates,
    addCoordinates,
    getCoordinates: getCoordinates
    // setPlaylist: setPlaylist,
    // play: play,
    // startInterrupt: startInterrupt,
    // stopInterrupt: stopInterrupt
  }
})();