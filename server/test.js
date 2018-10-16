var fs = require('fs');
xml2js = require('xml2js');
//var matrix = require('../public/models/matrix.js')

var stimuliSet = 'A';
var taskType = 'post';
var block = '15';
//var mapUrl = __dirname + '/../public/images/Set A/result/post/block 15/map.xml';
var mapUrl = `${__dirname}/../public/images/Set ${stimuliSet}/result/${taskType}/block ${block}/map.xml`;

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/../public/images/Set A/result/post/block 15/map.xml', function (err, data) {
  parser.parseString(data, function (err, result) {
    var faceIndex = 5;
    var imageIndex = 4;
    var matrices = [];
    var rows = result.Workbook.Worksheet[0].Table[0].Row;
    for (let imageIndex = 1; imageIndex < rows.length; imageIndex++) {
        //result.Workbook.Worksheet[0].Table[0].Row[imageIndex].Cell[faceIndex].Data[0]
        matrices.push(
            new matrix(rows[imageIndex])
        )

    }
   
    result.Workbook.Worksheet[0].Table[0].Row[imageIndex].Cell[faceIndex].Data[0]

    console.dir(result);
    console.log('Done');

    });
});