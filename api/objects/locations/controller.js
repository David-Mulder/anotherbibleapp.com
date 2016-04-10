var Location = require('./model');

module.exports = {
  get: function(req, res){
    Location.findOne({
      _id: req.params.id
    })
      .populate('revisionAuthor', 'displayName _id')
      .exec(function(err, location){
        if(err){
          res.status(500).json(err);
        }else if(!location) {
          res.status(404).json('Not found');
        }else{
          if(req.query.history) {
            location.history().then(function(history){
              history = history.map(rev => rev.populate('revisionAuthor', 'displayName _id').execPopulate());
              Promise.all(history).then((revisions) => {
                var obj = location.makePublic();
                obj.revisions = revisions;
                res.json(obj);
              });
            });
          }else{
            res.json(location.makePublic())
          }
        }
      });
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
    })
      .exec().then(function(locations){
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
  },

  update: function(req, res){
    Location
      .findOne({_id: req.params.id})
      .exec(function(err, location){
        location.title = req.body.location.title;
        location.description = req.body.location.description;
        location.wiki = req.body.location.wiki;
        location.markModified('timespan');
        location.timespan.start = parseInt(req.body.location.timespan.start);
        location.timespan.end = parseInt(req.body.location.timespan.end);
        location.coordinates = [parseFloat(req.body.location.coordinates[0]), parseFloat(req.body.location.coordinates[1])];
        location.polygon = req.body.location.polygon;

        location.revisionAuthor = req.user._id;

        location.save(function(err, location){
          if(err){
            res.status(400).json(err);
          }else{
            res.json(location);
          }
        });
      });
  }
};
