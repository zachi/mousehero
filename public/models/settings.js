
export default (function () {
  var self = {};
  
  var _userId;
  Object.defineProperty(self,"userId",{
    get: function() { return _userId; },
    set: function(value) { _userId = value;  }
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
  
  var _blockNumber;
  Object.defineProperty(self,"blockNumber",{
    get: function() { return _blockNumber; },
    set: function(value) { _blockNumber = value;  }
  });

  var _imagesFolderPath;
  Object.defineProperty(self,"imagesFolderPath",{
    get: function() { return _imagesFolderPath; },
    set: function(value) { _imagesFolderPath = value;  }
  });

  var _measurementTyming;
  Object.defineProperty(self,"measurementTyming",{
    get: function() { return _measurementTyming; },
    set: function(value) { _measurementTyming = value;  }
  });

  var _imageSideLength;
  Object.defineProperty(self,"imageSideLength",{
    get: function() { return _imageSideLength; },
    set: function(value) { _imageSideLength = value;  }
  });

  self.initDBFields = function(){
    axios.get('/settings')
    .then(function (response) {
      delete response.data[0]._id;
      Object.assign(self, response.data[0]);
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  
  return self;
})(); 