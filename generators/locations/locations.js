var fs = require('fs');
var requirejs = require('node-requirejs').requirejs();
var BibleReference = requirejs('./bible-reference-parser.lib.js');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var getLocations = function(){
  return new Promise(function(resolve, reject){
    fs.readFile('./locations.csv', 'utf8', function (err,text) {
      var lines = text.split('\n');
      lines = lines.map(line => line.split('\t'));
      var locations = [];
      lines.forEach(line => {
        if(line[0]) {
          var location = {
            title: line[0],
            coordinates: [line[3], line[2]],
            verses: line[4].split(',').map(v => new BibleReference(v.trim()).split().map(v => v.toNumeric())).reduce((prev, cur) => prev.concat(cur), []),
            precision: -1
          };
          if(line[1] && line[1].length > 0){
            location.root = line[1];
          }
          if(!isNaN(parseInt(location.title.split('').pop()))){
            location.title = location.title.substring(0, location.title.length - 2);
          }
          if(location.root && !isNaN(parseInt(location.root.split('').pop()))){
            location.root = location.root.substring(0, location.root.length - 2);
          }
          var firstChar = location.coordinates[1].substr(0, 1)
          if (location.coordinates[1] == '?' || location.coordinates[1] == '-') {
            location.precision = -1;
            //console.log(location.title, 'unknown location', line);
          } else if (parseFloat(location.coordinates[1])) {
            var latAsString = parseFloat(location.coordinates[1]).toString().split('.');
            //console.log(location.title, location.coordinates[1], latAsString, latAsString[1] ? latAsString[1].length : -1)
            location.precision = latAsString.length == 2 ? latAsString[1].length : 0;
            var lastChar = location.coordinates[1].substr(location.coordinates[1].length - 1, 1)
            if (lastChar == '?') {
              location.precision -= 3;
              //console.log(location.title, 'unsure', line);
            }
            location.coordinates[1] = parseFloat(location.coordinates[1]);
            location.coordinates[0] = parseFloat(location.coordinates[0]);
            //console.log(location.coordinates[1], lastChar);
          } else if (firstChar == '~' || firstChar == '>' || firstChar == '<') {
            location.precision = 3;
            location.coordinates[1] = parseFloat(location.coordinates[1].replace(/[^0-9.]+/i, ''));
            location.coordinates[0] = parseFloat(location.coordinates[0].replace(/[^0-9.]+/i, ''));
          } else {

            console.warn(line);
          }
          if (location.precision >= 0) {
            locations.push(location);
          }
        }
      });
      //locations.sort((a,b) => b.precision - a.precision);
      resolve(locations);
    });

  });
};
//getLocations();

// Connection URL
var url = 'mongodb://localhost:27017/test';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  var collection = db.collection('locations');
  collection.remove({}, function(err, result){
    getLocations().then(function(locations){
      collection.insert(locations, {w:1}, function(err, result){
        console.log(err, result);
        db.close();
      });
    });
  });
});
