var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.API_PORT || 5478;
var cors = require('cors');
var mongo = require('mongodb').MongoClient;

app.use(cors());
app.use(bodyParser.json());

var dbName = 'goatspresso';
var mongoUrl = (process.env.MONGOURL || 'mongodb://localhost:27017/') + dbName;

app.get('/', function(req, res) {

  // Use connect method to connect to the Server 
  mongo.connect(mongoUrl, function(err, db) {

    var connected = false;

    if (err === null) {
      connected = true;
    }

    res.status(connected ? 200 : 400).json(connected);

    // var collection = db.collection('distances');

    // collection.find({}).toArray(function(err, docs) {
    //   res.status(connected ? 200 : 400).json(docs);
    //   db.close();
    // });

  });

});

app.listen( port, function() {
  console.log('api listening on port: ' + port);
});
