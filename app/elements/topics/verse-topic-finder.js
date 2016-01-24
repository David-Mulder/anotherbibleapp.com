importScripts('./data/topical.js');
//importScripts('../../bower_components/whenever.js/whenever.js');

onmessage = function(ev){
  search(ev.data.verseAsNumber, function(topics){
    postMessage(topics);
  });
};

var search = function(verseAsNumber, cb){
  var relatedTopics = Object.keys(topics).map(function(topicName){
    var topic = topics[topicName];
    var match = topic.find(function(verseRangeString){
      var verseRange = verseRangeString.split(' ');
      return verseAsNumber >= verseRange[0] && verseAsNumber <= verseRange[1];
    });
    if(match){
      var parsedMatch = match.split(' ');
      return {
        title: topicName,
        match: match,
        specifity: parsedMatch[1] - parsedMatch[0],
        votes: parsedMatch[2]*1
      };
    }else{
      return;
    }
  }).filter(m => m)
  .map(t => {
    t.score = 1/t.specifity * t.votes;
    return t;
  })
  .filter(m => m.score > 5)
  .sort((a, b) => b.score - a.score);
  cb(relatedTopics);
};
