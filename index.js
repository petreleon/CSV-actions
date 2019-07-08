const express = require('express');
const mongodb = require('mongodb');
const port = 3001;
// create express app
var app = express();

// register json body parser such that we can parse
// bodies with application/json header
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
// Initialize connection once
MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  if (err) return console.error(err);

  db = client.db("testdb");
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
  // the Mongo driver recommends starting the server here because most apps *should* fail to start if they have no DB.  If yours is the exception, move the server startup elsewhere. 
});

var db;


// init the memory array that will hold the books

// mount get route
app.get('/articles', (req, res) => {
  // respond with a json of books

  db.collection('lines', function (err, collection) {
    let resultArray = [];
    if (err) {
      throw err;
    } else {
      collection.find({}).limit(10).each(function (err, doc) {
        if (doc) {
          resultArray.push(doc)
        } else {
          res.json(resultArray);
        }
      });
    };
  });
})
// mount post route
app.post('/articles', (req, res) => {
  // req body is properly parsed because of bp.json ^
  books.push(req.body);
  res.json(books);
});
