importScripts('../../bower_components/whenever.js/whenever.js');
importScripts('lib/lancaster.js');
importScripts('lib/smartStemmer.js');
importScripts('lib/stringDistance.js');
importScripts('data/stopWords.js');

onmessage = function(ev){
  console.info('search for', ev.data);
  search(ev.data, 300).then(function(result){
    postMessage(result);
    close();
  });
};

var getIntersectingRanges = function(arrays, range) {
  return arrays
  // build one array with all values
    .reduce(function (r, a) {
      return r.concat(a);
    }, [])

    // sort all values ascending
    .sort(function (a, b) {
      return a - b;
    })

    // take only unique values
    .reduce(function (r, a) {
      a !== r[r.length - 1] && r.push(a);
      return r;
    }, [])

    // here is where the magic takes place ...
    // iterate over all values
    .reduce(function (result, value) {
      var found = [],
        isInAll = 0;

      // iterate over arrays
      arrays.forEach(function (a, i) {
        // if the array element is in the range of value, then push to found
        found.push(a.reduce(function (r, aa) {
          if (aa - value <= range && aa >= value) {
            r.push(aa);
            // set indicator for the inserted array element
            isInAll |= 1 << i;
          }
          return r;
        }, []));
      });

      // if indicator was set for taking at least one element from every array
      // and the found array is not included in result array, push found array
      // to result
      isInAll + 1 >> arrays.length && !result.some(function (a) {
        return JSON.stringify(a) === JSON.stringify(found);
      }) && result.push(found);
      return result;
    }, []);
}

var substrUpTo = function(text, index, char){
  var foundChar = true;
  var searchIndex = index;
  while(foundChar && foundChar !== char){
    searchIndex++;
    foundChar = text.substr(searchIndex, 1);
  }
  searchIndex--;
  return text.substring(index, searchIndex+1);
}

var getStartOfLine = function(text, point){
  var char = " ";
  while(char && char !== "\n"){
    point--;
    char = text.charAt(point);
  }
  return point + 1;
};

var getEndOfWord = function(text, point){
  var char = "x";
  while(char && char !== "\n" && char !== " "){
    point++;
    char = text.charAt(point);
  }
  return point;
};

var search = function(searchString, length){

  return new Promise(function(resolve, reject){

    var enteredWords = searchString.split(/\s/g);
    var ignoredWords = [];
    var adjusters = {};

    enteredWords = enteredWords.filter(function(word){
      if(stopWords.indexOf(word.toLowerCase()) > -1){
        ignoredWords.push(word);
        return false;
      }else if(word.indexOf(":") > -1){
        var adjuster = word.split(":");
        if(adjuster[0] == "in" && adjuster[1]){
          adjusters.in = adjuster[1];
        }else{
          return true;
        }
        return false;
      }else{
        return word.length;
      }
    });

    fetch('data/stemmedBible.txt').then(function(response){
      return response.text();
    }).then(function(text){
      var NTIndex = text.indexOf('Mt 1:1| ');
      if(adjusters.in) {
        adjusters.in = adjusters.in.toLowerCase();
        if(adjusters.in == 'nt') {
          text = text.substring(NTIndex, text.length);
        }else if(adjusters.in == 'ot') {
          text = text.substring(0, NTIndex);
        }else{

          var book = adjusters.in;
          book = book.charAt(0).toUpperCase() + book.slice(1);

          var bookLineRegex = new RegExp("^" + book + " .*?$", "gm")

          var bookOnly = text.match(bookLineRegex);
          if (bookOnly) {
            text = bookOnly.join('\n');
          } else {
            text = '';
          }
        }
      }
      //console.log(text.length, text.split("\n").length);

      var words = enteredWords.map(smartStemmer);
      //console.log(words);
      var indexes = words.map(function(word){
        var indexes = [];
        var start = 0;
        var location = 1;
        while(location > -1){
          location = text.indexOf(" "+word, start);
          if(location > -1){
            var nextChar = text.substr(location + 1 + word.length, 1);
            if(nextChar == " " || nextChar == "="){
              indexes.push(location);
            }
            start = location + 1;
          }
        }
        return indexes;
      });
      var results = getIntersectingRanges(indexes, length);
      //console.log("number of results:", results.length, indexes);
      results.forEach(function(result){
        //result = result.sort();
        result.allIndexes = [];
        result.weights = {};

        var bestWordDistances = [];
        result.forEach(function(wordIndexes, i){
          var wordDistances = [];
          wordIndexes.forEach(function(index){
            var foundString = substrUpTo(text,index+1," ").split("=");
            var word, stemmedWord;
            stemmedWord = foundString[0];
            if(foundString.length == 1){
              word = foundString[0];
            }else{
              word = foundString[1].replace('$', stemmedWord);
              if(word == '^'){
                word = stemmedWord.charAt(0).toUpperCase() + stemmedWord.slice(1)
              }
            }
            wordDistances.push(stringDistance(enteredWords[i], word))
            result.allIndexes.push(index);
          });
          bestWordDistances.push(Math.max.apply(Math, wordDistances));
          //console.groupEnd();
        });

        result.weights.wordDistance = bestWordDistances.reduce(function(a, b) { return a + b; }) / bestWordDistances.length;
        result.allIndexes.sort();

        result.weights.length = (result.allIndexes[result.allIndexes.length - 1] - (result.allIndexes[0]-1))/length;
        result.weights.numberOfMatches = result.allIndexes.length;
        result.weights.lengthPercentagePerMatch = result.weights.length / result.weights.numberOfMatches;
        result.weights.NT = result.allIndexes[0] > NTIndex;

        result.score = (1-result.weights.lengthPercentagePerMatch) * result.weights.wordDistance + (result.weights.NT ? 0.001 : 0);

      });

      var results = results.sort(function(a,b){
        return b.score - a.score;
      });

      results.splice(101);

      results.forEach(function(result) {
        var line = text.substring(getStartOfLine(text, result.allIndexes[0]), getEndOfWord(text, result.allIndexes[result.allIndexes.length-1]));
        //todo: remove duplicate verse ranges from results
        result.verses = line.split('\n').map(function(line){
          return line.split('| ')[0];
        });
      });

      results = results.filter(function(result){
        //console.log('start', result.verses[0].split(' ')[0]);
        //console.log('end', result.verses[result.verses.length - 1].split(' ')[0]);
        return result.verses[0].split(' ')[0] === result.verses[result.verses.length - 1].split(' ')[0];
      });

      resolve({
        results: results,
        ignoredWords: ignoredWords
      });

    });

  });

};
