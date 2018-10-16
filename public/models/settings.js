
export default (function () {
  var self = {};
  
  var _userId;
  Object.defineProperty(self,"userId",{
    get: function() { return _userId; },
    set: function(value) { _userId = value;  }
  });

  var _sessionNumber;
  Object.defineProperty(self,"sessionNumber",{
    get: function() { return _sessionNumber; },
    set: function(value) { _sessionNumber = value;  }
  });
  
  var _sessionDate;
  Object.defineProperty(self,"sessionDate",{
    get: function() { return _sessionDate; },
    set: function(value) { _sessionDate = value;  }
  });

  var _stimuliSet;
  Object.defineProperty(self,"stimuliSet",{
    get: function() { return _stimuliSet; },
    set: function(value) { _stimuliSet = value;  }
  });

  var _taskType;
  Object.defineProperty(self,"taskType",{
    get: function() { return _taskType; },
    set: function(value) { _taskType = value;  }
  });

  var _matrixDisplayDuration;
  Object.defineProperty(self,"matrixDisplayDuration",{
    get: function() { return _matrixDisplayDuration; },
    set: function(value) { _matrixDisplayDuration = value;  }
  });

  var _matrices;
  Object.defineProperty(self,"matrices",{
    get: function() { return _matrices; },
    set: function(value) { _matrices = value;  }
  });
  
  var _imagesBlock;
  Object.defineProperty(self,"imagesBlock",{
    get: function() { return _imagesBlock; },
    set: function(value) { _imagesBlock = value;  }
  });

  var _imagesFolderPath;
  Object.defineProperty(self,"imagesFolderPath",{
    get: function() { return _imagesFolderPath; },
    set: function(value) { _imagesFolderPath = value;  }
  });


  return self;
})();