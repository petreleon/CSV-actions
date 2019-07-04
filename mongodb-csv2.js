var mongoDb = require('mongodb');
var mongoClient = mongoDb.MongoClient;
var dbname = 'testdb';
var collectionName = 'lines';
var url = 'mongodb://localhost:27017/' + dbname;
var filename = 'checkouts-by-title.csv';
console.log('***************Process started');

mongoClient.connect(url, (err, client) => {
  if (err) {
    console.log('error on connection ' + err);
  } else {
    var db = client.db(dbname);
    console.log('***************Successfully connected to mongodb');
    var collection = db.collection(collectionName);
    var fs = require('fs');
    var readline = require('readline');
    var stream = require('stream');
    var instream = fs.createReadStream(filename);
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    var rows = [];
    var k = 0;
    var interNumber = 10000;
    var totalNumber = 1000000;
    console.log('***************Parsing, please wait ...');
    function linefunction(line) {
      ++k;
      if (k == 1)
        return collumns = line.split(',');
      if (k % totalNumber == 0) {
        rl.close();
      } else if (k % interNumber == 0) {
        rl.pause();
      }
      var object = {};
      var row = line.split(',');
      for (var i in collumns) {
        object[collumns[i]] = row[i];
      }
      rows.push(object);
    }

    rl.on('line', linefunction);
    rl.on('pause', function () {
      console.log("db insert");
      collection.insertMany(rows, () => {
        rows = [];
        rl.resume();
      });
      
    })
    rl.on('close', function () {
      collection.insertMany(rows);
      rows = [];
      client.close();
      console.log('***************completed');
    });
  }
});