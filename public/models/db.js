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
      var objectStore = db.createObjectStore("coordinates", {
        autoIncrement: true
      }); //, {        keyPath: "userId"      });


    };
  }

  function addCoordinates(coordinates) {
    var transaction = db.transaction(["coordinates"], "readwrite");
    // Do something when all the data is added to the database.
    transaction.oncomplete = function (event) {
      console.log("coordinates added successfully!");
    };

    transaction.onerror = function (event) {};
    var objectStore = transaction.objectStore("coordinates");
    coordinates.forEach(function (coordinate) {
      var request = objectStore.add(coordinate);
    });
  }

  function getCoordinates(callback) {
    var transaction = db.transaction(["coordinates"]);
    var objectStore = transaction.objectStore("coordinates");
    objectStore.getAll().onsuccess = function (event) {
      callback(event.target.result);
    };
  }

  function getNumberOfCoordinates() {
    var transaction = db.transaction(["coordinates"]);
    var objectStore = transaction.objectStore("coordinates");
    var countRequest = objectStore.count();
    countRequest.onsuccess = function () {
      console.log(countRequest.result);
    }
  }

  function removeAllCoordinates() {
    // open a read/write db transaction, ready for clearing the data
    var transaction = db.transaction(["coordinates"], "readwrite");
  
    // create an object store on the transaction
    var objectStore = transaction.objectStore("coordinates");
  
    // Make a request to clear all the data out of the object store
    var objectStoreRequest = objectStore.clear();
  
    objectStoreRequest.onsuccess = function(event) {
      // report the success of our request
      console.log('all coordinates cleared sxuccessfully.')
    };
  }

  return {
    init: init,
    addCoordinates,
    addCoordinates,
    getCoordinates: getCoordinates,
    getNumberOfCoordinates: getNumberOfCoordinates,
    removeAllCoordinates:removeAllCoordinates
    // setPlaylist: setPlaylist,
    // play: play,
    // startInterrupt: startInterrupt,
    // stopInterrupt: stopInterrupt
  }
})();