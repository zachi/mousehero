
const path = require('path');
const testFolder = path.join(__dirname, '../../public/music');
const fs = require('fs');

exports.all = function(){
  var res = [];
  fs.readdirSync(testFolder).forEach(file => {
    if(file.indexOf('.DS_Store') == -1)
      res.push(file);
  })
  return res;
}