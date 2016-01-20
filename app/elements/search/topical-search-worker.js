//importScripts('../../bower_components/whenever.js/whenever.js');
importScripts('lib/lancaster.js');
importScripts('lib/smartStemmer.js');
importScripts('./data/topical.js');
importScripts('lib/stringDistance.js');

onmessage = function(ev){
  search(ev.data).then(function(result){
    postMessage(result);
    close();
  });
};

var search = function(query){
  return new Promise(function(resolve, reject){
    var words = query.split(/\s+/);
    var stemmedWords = words.map(smartStemmer);

    var result = Object.keys(topics).filter(function(topic){
      var topicWords = topic.split(/\s+/).map(smartStemmer);
      return stemmedWords.every((word) => topicWords.indexOf(word) > -1);
    }).map(function(topic){
      //string distance, 1 = perfect, 0 = crap
      var averageStringDistance = 0;
      var topicWords = topic.split(/\s+/);
      var stemmedTopicWords = topicWords.map(smartStemmer);
      words.forEach(function(word){
        var index = stemmedTopicWords.indexOf(smartStemmer(word));
        var originalTopicWord = topicWords[index];
        averageStringDistance += stringDistance(word, originalTopicWord);
      });
      averageStringDistance /= words.length;

      //portion of words used, 1 = perfect, 0 = crap
      var percentageWordsUsed = words.length / topicWords.length;

      return {
        score: percentageWordsUsed * averageStringDistance,
        title: topic,
        texts: topics[topic]
      };
    });

    result = result.sort(function(a,b){
      return b.score - a.score;
    });

    resolve(result);
  });
};
