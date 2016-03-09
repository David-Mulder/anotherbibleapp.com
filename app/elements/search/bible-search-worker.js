importScripts('../../bower_components/whenever.js/whenever.js');
importScripts('lib/lancaster.js');
importScripts('lib/smartStemmer.js');
importScripts('lib/stringDistance.js');
importScripts('data/stopWords.js');

importScripts('../utils/utils-books/books.js');
/*importScripts('../utils/utils-books/bibleReferenceParser.js');*/

onmessage = function(ev){
  console.info('search for', ev.data);
  search(ev.data).then(function(result){
    postMessage(result);
    close();
  });
};

//adapted from http://stackoverflow.com/a/14853974/1266242
var arrayEquals = function (arr1, arr2) {
  // compare lengths - can save a lot of time
  if (arr1.length != arr2.length)
    return false;

  for (var i = 0, l=arr1.length; i < l; i++) {
    // Check if we have nested arrays
    if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
      // recurse into the nested arrays
      if (!arrayEquals(arr1[i], arr2[i]))
        return false;
    }
    else if (arr1[i] != arr2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
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

var calculateWordDistances = function(item, text, enteredWords){
  var bestWordDistances = [];

  item.forEach(function (wordIndexes, i) {
    var wordDistances = [];
    wordIndexes.forEach(function (index) {
      var foundString = substrUpTo(text, index + 1, " ").split("=");
      var word, stemmedWord;
      stemmedWord = foundString[0];
      if (foundString.length == 1) {
        word = foundString[0];
      } else {
        word = foundString[1].replace('$', stemmedWord);
        if (word == '^') {
          word = stemmedWord.charAt(0).toUpperCase() + stemmedWord.slice(1)
        }
      }
      wordDistances.push(stringDistance(enteredWords[i], word));
    });
    bestWordDistances.push(Math.max.apply(Math, wordDistances));
    //console.groupEnd();
  });

  return bestWordDistances;
};

var calculateWeights = function(item, text, enteredWords, NTIndex, length){
  var weights = {};
  var wordDistances = calculateWordDistances(item, text, enteredWords);
  weights.wordDistance = wordDistances.reduce(function(a, b) { return a + b; }) / wordDistances.length;

  weights.popularity = item.lines.reduce(function(total, line){
    return total + parseInt(line.split('|')[1]);
  },0) / item.lines.length / 10;

  weights.length = item.matchLength/length;
  weights.numberOfMatches = item.allIndexes.length;
  weights.lengthPercentagePerMatch = weights.length / weights.numberOfMatches;
  weights.NT = item.allIndexes[0] > NTIndex;
  return weights;
};

var getLines = function(text, indexes){
  return text.substring(getStartOfLine(text, indexes[0]), getEndOfWord(text, indexes[indexes.length-1])).split('\n');
};

var getVerses = function(item){
  return item.lines.map(function(line){
    return line.split('|')[0];
  });
};

var getMatchLength = function(indexes){
  return (indexes[indexes.length - 1] - (indexes[0]-1));
};

var deduplicateResults = function(results){
  //we put the shortest matches first, so that when deduplicating we keep the highest quality matches
  var results = results.sort(function(a,b){
    return b.matchLength - a.matchLength;
  });

  var uniqueResults = [];
  results.forEach(function(result) {
    if(!uniqueResults.some(item => arrayEquals(result.verses, item.verses))){
      uniqueResults.push(result);
    }
  });
  return uniqueResults;
};

var search = function(searchString){

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
        if(adjuster[0].length && adjuster[1]){
          adjusters[adjuster[0]] = adjuster[1];
        }else{
          return true;
        }
        return false;
      }else{
        return word.length;
      }
    });

    var range = adjusters.range || 300;

    fetch('data/stemmedBible.txt').then(function(response){
      return response.text();
    }).then(function(text){
      var NTIndex = text.indexOf('Mt 1:1|');
      if(adjusters.in) {

        adjusters.in = adjusters.in.toLowerCase();

        if(adjusters.in == 'nt') {
          text = text.substring(NTIndex, text.length);
        }else if(adjusters.in == 'ot') {
          text = text.substring(0, NTIndex);
        }else{

          var book = bibleBooks.findBook(adjusters.in);
          var bookLineRegex = new RegExp("^" + book.name + " .*?$", "gm")
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

      console.log('RANGE', range);
      var results = getIntersectingRanges(indexes, range);
      //console.log("number of results:", results.length, indexes);

      results.forEach(function(result) {
        result.allIndexes = result.reduce((arr, wordIndexes) => arr.concat(wordIndexes), []).sort();
        result.matchLength = getMatchLength(result.allIndexes);
        result.lines = getLines(text, result.allIndexes);
        //todo: use result.lines instead of text
        result.verses = getVerses(result);
        //result.weights = {};
      });

      results = deduplicateResults(results);

      results.forEach(function(result) {
        result.weights = calculateWeights(result, text, enteredWords, NTIndex, range);
        result.score = (1-result.weights.lengthPercentagePerMatch) * result.weights.wordDistance + (result.weights.NT ? 0.001 : 0) + result.weights.popularity/2.5;
      });

      var results = results.sort(function(a,b){
        return b.score - a.score;
      });

      //todo: add option to increase number of results
      console.log(adjusters);
      if(adjusters.results){
        if(adjusters.results != 'all'){
          results.splice(adjusters.results);
        }
      }else{
        results.splice(25);
      }

      results = results.filter(function(result){
        //console.log('start', result.verses[0].split(' ')[0]);
        //console.log('end', result.verses[result.verses.length - 1].split(' ')[0]);

        //filtering out stuff that passes book borders I think?
        return result.verses[0].split(' ')[0] === result.verses[result.verses.length - 1].split(' ')[0];
      });

      resolve({
        results: results,
        ignoredWords: ignoredWords
      });

    });

  });

};
