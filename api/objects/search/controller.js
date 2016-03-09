var Wordnet = require('node-wordnet');


module.exports = {
  synonyms: function(req, res){
    var wordnet = new Wordnet();

    wordnet.lookup(req.params.word, function(err, results) {
      console.log(err);
      var synonyms = [];
      results.forEach(function(result) {

        /*
        console.log('------------------------------------');
        console.log(result.synsetOffset);
        console.log(result.pos);
        console.log(result.lemma);
        console.log(result.synonyms);
        console.log(result.pos);
        console.log(result.gloss);
        */

        console.log(result.synonyms);
        result.synonyms.forEach(s => {
          if(synonyms.indexOf(s) == -1 && s.indexOf('_') == -1){
            synonyms.push(s);
          }
        });
      });
      res.json(synonyms);
    });
  }
};
