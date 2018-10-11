
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

  

  return self;
})();