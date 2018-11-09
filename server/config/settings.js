require('dotenv').config();

module.exports = (function () {

  var self = {};
  var _rootFolderAbsolutePath = __dirname.replace(/^(.*\/mousehero)(.*)$/, '$1');
  Object.defineProperty(self, 'rootFolderAbsolutePath', {
    get() { return _rootFolderAbsolutePath; }
  });

  var _port = process.env.PORT || '80';
  Object.defineProperty(self, 'port', {
    get() { return _port; }
  });

  var _db = {
    connection:process.env.DB_CONNECTION,
    name:process.env.DB_NAME
  };
  Object.defineProperty(self, 'db', {
    get() { return _db; }
  });

  return self;
})();