var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
const mdbclient = require('mongodb').MongoClient;
var instream = fs.createReadStream('your/file');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
var collumns;
var linefunction = function(line){
  collumns = line.split(',');
  linefunction = function(line){
    var object;
    var row = line.split(',');
    for (var i in collumns){
      object[collumns[i]]=row[i];
    }
  }
}

rl.on('line', linefunction);

rl.on('pause', function() {
  // do something on finish here
});
rl.on('close', function() {
  // do something on finish here
});

