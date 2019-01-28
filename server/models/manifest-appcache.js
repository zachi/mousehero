const path = require('path');
const fs = require('fs');
const config = require('../config/config');

exports.generate = function () {

  var publicFolder = config.rootFolderAbsolutePath + '/public';

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
        if (file.indexOf('manifest.appcache') !== -1)
          return;
        if (file.indexOf('900X900') !== -1)
          return;
        file = file.replace(/\s+/g, '%20');
        file = file.replace(publicFolder, '');
        results.push(file);
      }
    });
    return results;
  }

  var files = walk(publicFolder);
  
  files.push('/music2');
  files.push('/settings');

  return [
          'CACHE MANIFEST ',
          '# v1.0.5',
          'NETWORK: ',
          '*',
          'CACHE:'
        ].concat(
          files
        ).join("',\r\n'");
}