const path = require('path');
const fs = require('fs');

exports.generate = function () {

  var publicFolder = path.join(__dirname, '../../public');

  function walk(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {
      file = dir + '/' + file;
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        /* Recurse into a subdirectory */
        results = results.concat(walk(file));
      } else {
        /* Is a file */
        if (file.indexOf('DS_Store') !== -1)
          return;
        file = file.replace(/\s+/g, '%20');
        file = file.replace(publicFolder, '');
        results.push(file);
      }
    });
    return results;
  }

  var files = walk(publicFolder);
  return [
          'CACHE MANIFEST ',
          '# v1.0.1',
          'NETWORK: ',
          '*',
          'CACHE:'
        ].concat(
          files
        ).join("\r\n");
}