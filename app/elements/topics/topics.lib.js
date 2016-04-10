define(function(){

  var topics = new Promise(function(resolve, reject){
    fetch('/elements/topics/data/topical.js').then(function(response){
      return response.text();
    }).then(function(topicString){
      var topics = JSON.parse(topicString);
      resolve(topics);
    });
  });

  var parseVerses = function(topic){
    return topic.map(function(text){
      var parts = text.split(' ');
      return {
        start: parts[0],
        end: parts[1].length > 0 ? parts[1] : parts[0],
        votes: parts[2]
      };
    });
  };

  return {

    getRaw: function(){
      return topics;
    },

    getVersesByTopic: function(name){
      return new Promise(function(resolve, reject){
        topics.then(function(topics){
          resolve(parseVerses(topics[name]));
        });
      });
    },

    getTopicsByVerse: function(verseAsNumber){
      return new Promise(function(resolve, reject){
        topics.then(function(topics){
          var relevantTopics = Object.keys(topics).map(function(topicName){
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

          resolve(relevantTopics);
        });
      });
    },

    getTopicsStartingWith: function(start, count){
      return new Promise(function(resolve, reject) {
        start = start.toLowerCase();

        topics.then(function (topics) {
          var matchedTopics = Object.keys(topics).filter(function (topic) {
            return topic.substring(0, start.length) === start;
          });

          if(matchedTopics.length == 0 && start.indexOf(' ') == -1){
            matchedTopics = Object.keys(topics).filter(function (topic) {
              var words = topic.split(' ');
              return words.some(function(word){
                return word.substring(0, start.length) === start;
              });
            });
          }

          matchedTopics = matchedTopics.map(function(name){
            return {
              name: name,
              popularity: topics[name].length
            }
          }).sort(function(a, b){
            return b.popularity - a.popularity;
          }).map(function(topic){
            return topic.name
          }).splice(0, count);

          resolve(matchedTopics);
        });
      });
    }

  };
});
