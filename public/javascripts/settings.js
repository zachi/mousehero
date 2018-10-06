
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

  var _sessionType;
  Object.defineProperty(self,"sessionType",{
    get: function() { return _sessionType; },
    set: function(value) { _sessionType = value;  }
  });

  return self;
})();