
module.exports = (function () {

  var self = {};
  var _rootFolderAbsolutePath = __dirname.replace(/^(.*\/mousehero)(.*)$/, '$1');
  Object.defineProperty(self, 'rootFolderAbsolutePath', {
    get() { return _rootFolderAbsolutePath; }
  });
  return self;
})();