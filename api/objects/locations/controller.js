var Location = require('./model');

module.exports = {
  get: function(req, res){

  },

  listForVerse: function(req, res){
    Location.find({
      verses: parseInt(req.params.verse)
    }).exec(function(err, result){
      if(err){
        res.status(500).json(err);
      }else{
        result = result.map(location => location.makePublic());
        //result.sort((a,b) => b.score - a.score);
        res.json(result);
      }
    });
  },

  listForViewport: function(req, res){
    var zoomRequirements = {
      0: 30,
      1: 30,
      2: 30,
      3: 30,
      4: 25,
      5: 10,
      6: 10,
      7: 10,
      8: 5,
      9: 3,
      10: 3,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1
    };

    var viewport = JSON.parse(req.query.viewport);
    Location.find({
      coordinates: {
        $geoWithin: {
          $box: viewport
        }
      }
    }).exec().then(function(locations){
      locations = locations.sort((a, b) => b.verses.length - a.verses.length);
      //locations = locations.filter(loc => loc.verses.length >= zoomRequirements[req.query.zoom]);
      res.json(locations);
    });
    //res.json(viewport);
  },

  listForCoordinates: function(req, res){

    Location.find({
      coordinates: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [req.query.lng, req.query.lat]
          },
          $maxDistance: 50
        }
      }
    }).exec().then(function(locations){
      var locations = locations.map(loc => loc.makePublic());
      locations.sort((a, b) => b.verses.length - a.verses.length);
      locations.sort((a, b) => {
        if(a.root == b.root){
          return 0;
        }else{
          if(a.root && !b.root){
            return 1;
          }else{
            return -1;
          }
        }
      });
      res.json(locations);
    });
    //res.json(viewport);
  }
};
